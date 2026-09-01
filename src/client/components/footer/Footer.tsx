import { useMemo } from "react";
import { Copyright, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { currentYear } from "@/utils/Time";
import Container from "@/client/components/Container";
import { SOCIAL_LINKS } from "@/constants/Social.constants";
import { useForm } from "react-hook-form";
import { newsletterSchema, type NewsletterFormValues } from "@/client/validation/Newsletter.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { NewsletterApi } from "@/client/api/Newsletter.api";
import ToastService from "@/services/ToastService";
import FormError from "@/components/forms/FormError";

const Footer = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NewsletterFormValues>({
        resolver: yupResolver(newsletterSchema),
        defaultValues: {
            email: "",
        },
    });

    const { mutate: subscribe, isPending } = useMutation({
        mutationFn: NewsletterApi.subscribe,

        onSuccess: response => {
            ToastService.success(response.message || "Subscribed successfully.");
            reset();
        },

        onError: error => {
            ToastService.error(error instanceof Error ? error.message : "Failed to subscribe.");
        },
    });

    const onSubmit = (values: NewsletterFormValues) => {
        subscribe(values);
    };

    const year = useMemo(() => currentYear(), []);

    return (
        <footer className="w-full border-t border-primary bg-primary text-white">
            <Container>
                <div className="grid grid-cols-1 gap-5 pb-10 pt-8 md:grid-cols-2 md:gap-16 lg:grid-cols-4 lg:gap-8">
                    <div className="w-full">
                        <h4 className="mb-2 text-xl font-bold uppercase lg:text-base">About Us</h4>
                        <p className="mb-4 leading-7 text-white/60">
                            We provide top-quality services with a focus on customer satisfaction. Your trust is our priority.
                        </p>
                        <div className="flex items-start gap-2">
                            <PhoneCall className="h-9 w-9 shrink-0 text-white/60 lg:h-7 lg:w-7" />
                            <div className="flex flex-col gap-1">
                                <h4 className="text-base uppercase">Need Help?</h4>
                                <p className="text-xl font-semibold lg:text-lg">+91 12345 67894</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-2 text-xl font-bold uppercase lg:text-base">Information</h4>
                        <ul className="flex flex-col gap-2 font-medium">
                            <li>
                                <Link to="/" className="transition-colors hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/delivery" className="transition-colors hover:text-white">
                                    Delivery
                                </Link>
                            </li>
                            <li>
                                <Link to="/about-us" className="transition-colors hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/secure-payment" className="transition-colors hover:text-white">
                                    Secure Payment
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact-us" className="transition-colors hover:text-white">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-2 text-xl font-bold uppercase lg:text-base">Custom Links</h4>
                        <ul className="flex flex-col gap-2 font-medium">
                            <li>
                                <Link to="/legal-notice" className="transition-colors hover:text-white">
                                    Legal Notice
                                </Link>
                            </li>
                            <li>
                                <Link to="/return-policy" className="transition-colors hover:text-white">
                                    Return Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/category" className="transition-colors hover:text-white">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-and-conditions" className="transition-colors hover:text-white">
                                    Terms &amp; Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="transition-colors hover:text-white">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/account/dashboard" className="transition-colors hover:text-white">
                                    My Account
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-2 text-xl font-bold uppercase lg:text-base">Newsletter</h4>
                        <p className="leading-7 text-white/80">
                            You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="relative mt-3 mb-2 w-full overflow-hidden rounded-lg">
                            <input
                                type="email"
                                id="newsletter"
                                placeholder="Enter Your Email Here"
                                {...register("email")}
                                className="block w-full rounded-lg border border-white bg-primary-foreground/10 p-3 pr-24 text-sm text-white outline-none placeholder:text-white/60 focus:border-white focus:ring-0"
                            />
                            <button
                                type="submit"
                                disabled={isPending}
                                className="absolute inset-e-0 top-0 h-full rounded-e-lg bg-white px-4 font-medium text-primary transition-opacity hover:opacity-90"
                            >
                                {isPending ? "Subscribing" : "Subscribe"}
                            </button>
                        </form>
                        {errors.email && <FormError message={errors.email?.message} />}
                    </div>
                </div>

                <div className="border-t border-white/20" />

                <div className="flex flex-col items-center justify-between gap-4 py-5 md:flex-row">
                    <div className="text-sm text-white">
                        <p className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                            <Copyright className="h-4 w-4" />

                            <span>{year}</span>

                            <span className="font-medium text-white">Mohd Sameer</span>
                        </p>
                    </div>

                    <div>
                        <ul className="flex flex-wrap items-center gap-3">
                            {SOCIAL_LINKS.map(({ name, url, icon: Icon }) => (
                                <li key={name}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visit ${name}`}
                                        className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-white transition-colors hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
