import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { AuthApi } from "@/client/api/auth.api";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "../../validation/Auth.schema";
import { Helmet } from "react-helmet-async";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
        resolver: yupResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const { mutate: forgotPassword, isPending } = useMutation({
        mutationFn: AuthApi.forgotPassword,

        onSuccess: response => {
            reset();
            ToastService.success(response.message || "Password reset OTP sent successfully.");
            navigate(`/reset-password/${response.data}`);
        },

        onError: error => {
            ToastService.error(error?.message || "Failed to send password reset OTP.");
        },
    });

    const onSubmit = (values: ForgotPasswordFormValues) => {
        forgotPassword(values);
    };

    return (
        <>
            <Helmet>
                <title>Forgot Password - Ecommerce</title>
                <meta name="description" content="Reset your Ecommerce account password securely and regain access to your account." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <section className="flex min-h-[70vh] w-full items-center justify-center px-4 py-12">
                <div className="w-full max-w-md rounded-xl bg-card p-6 shadow-lg md:p-8">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Mail className="h-7 w-7" />
                        </div>

                        <h1 className="text-3xl font-bold">Forgot Password?</h1>

                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            Enter your registered email address and we'll send you a password reset OTP.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="w-full space-y-2">
                            <Label htmlFor="email">Email</Label>

                            <Input id="email" type="email" disabled={isPending} placeholder="Enter your email" {...register("email")} />

                            <FormError message={errors.email?.message} />
                        </div>

                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? "Sending..." : "Send Reset Code"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login" className="text-sm font-semibold text-primary hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ForgotPassword;
