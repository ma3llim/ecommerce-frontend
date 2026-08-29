import { addContact } from "@/client/api/Contact.api";
import { contactUsSchema, type ContactUsFormValues } from "@/client/validation/Contact.schema";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ToastService from "@/services/ToastService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";

const GetInTouch = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactUsFormValues>({
        resolver: yupResolver(contactUsSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (values: ContactUsFormValues) => addContact(values),
        onSuccess: () => {
            reset();
            ToastService.success("Message sent successfully.");
        },
        onError: error => {
            const message = error?.message || error?.message || "Failed to send message.";

            ToastService.error(message);
        },
    });

    return (
        <section className="my-20 w-full">
            <div className="mb-10 w-full text-center">
                <h2 className="text-3xl font-bold underline decoration-2 underline-offset-4 md:text-4xl">Get In Touch</h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                    Have a question, feedback, or need assistance? Send us a message and our team will get back to you as soon as possible.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="rounded-lg bg-card p-6 shadow-lg md:p-8">
                    <h3 className="mb-6 text-2xl font-semibold">Contact Information</h3>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold">Address</h4>
                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                    Hyderabad, Telangana
                                    <br />
                                    India
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Phone className="h-5 w-5" />
                            </div>

                            <div>
                                <h4 className="font-semibold">Phone</h4>
                                <p className="mt-1 text-sm text-muted-foreground">+91 98851 91161</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Mail className="h-5 w-5" />
                            </div>

                            <div>
                                <h4 className="font-semibold">Email</h4>
                                <p className="mt-1 break-all text-sm text-muted-foreground">sameer.d3v@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg bg-card p-6 shadow-lg md:p-8 lg:col-span-2">
                    <h3 className="mb-6 text-2xl font-semibold">Send Us a Message</h3>
                    <form onSubmit={handleSubmit(value => mutate(value))} method="POST" className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="w-full space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input disabled={isPending} id="firstName" placeholder="Enter your First Name" {...register("firstName")} />
                                <FormError message={errors.firstName?.message} />
                            </div>
                            <div className="w-full space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input disabled={isPending} id="lastName" type="text" placeholder="Enter your Last Name" {...register("lastName")} />
                                <FormError message={errors.lastName?.message} />
                            </div>
                        </div>
                        <div className="w-full space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input disabled={isPending} id="email" type="email" placeholder="Enter your email" {...register("email")} />
                            <FormError message={errors.email?.message} />
                        </div>
                        <div className="w-full space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input disabled={isPending} id="subject" placeholder="Enter subject" {...register("subject")} />
                            <FormError message={errors.subject?.message} />
                        </div>
                        <div className="w-full space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                disabled={isPending}
                                id="message"
                                placeholder="Write your message..."
                                className="min-h-40 resize-none"
                                {...register("message")}
                            />
                            <FormError message={errors.message?.message} />
                        </div>
                        <div className="flex justify-end gap-3 border-t pt-6">
                            <Button disabled={isPending} type="button" variant="outline" onClick={() => reset()}>
                                Cancel
                            </Button>

                            <Button disabled={isPending} type="submit">
                                <Send className="mr-2 h-4 w-4" />
                                {isPending ? "Sending..." : "Send Message"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default GetInTouch;
