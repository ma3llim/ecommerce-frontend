import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import { registerSchema, type RegisterUserFormValues } from "@/client/validation/Auth.schema";
import { AuthApi } from "@/client/api/auth.api";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterUserFormValues>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    const { mutate: registerUserMutation, isPending } = useMutation({
        mutationFn: AuthApi.registerUser,
        onSuccess: response => {
            ToastService.success(response.message || "Account created successfully.");
            navigate(`/verify-email/${response.data.id}`);
        },

        onError: error => {
            ToastService.error(error.message || "Failed to create account.");
        },
    });

    const onSubmit = (values: RegisterUserFormValues) => {
        registerUserMutation(values);
    };

    return (
        <>
            <Helmet>
                <title>Create Account | ecommerce</title>
                <meta name="description" content="Create an account to shop and manage your ecommerce account." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <section className="flex min-h-[70vh] w-full items-center justify-center px-4 py-12">
                <div className="w-full max-w-lg rounded-lg bg-card p-6 shadow-lg md:p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold">Create Account</h1>
                        <p className="mt-2 text-muted-foreground">Create your E-Commerce account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="w-full space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" disabled={isPending} placeholder="Enter first name" {...register("firstName")} />
                                <FormError message={errors.firstName?.message} />
                            </div>

                            <div className="w-full space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" disabled={isPending} placeholder="Enter last name" {...register("lastName")} />
                                <FormError message={errors.lastName?.message} />
                            </div>
                        </div>

                        <div className="w-full space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" disabled={isPending} placeholder="Enter your email" {...register("email")} />
                            <FormError message={errors.email?.message} />
                        </div>

                        <div className="w-full space-y-2">
                            <Label htmlFor="password">Password</Label>

                            <Input id="password" type="password" disabled={isPending} placeholder="Enter your password" {...register("password")} />

                            <FormError message={errors.password?.message} />
                        </div>

                        <div className="border-t pt-6">
                            <Button type="submit" disabled={isPending} className="w-full">
                                {isPending ? "Creating Account..." : "Create Account"}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 border-t pt-6 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-primary hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
