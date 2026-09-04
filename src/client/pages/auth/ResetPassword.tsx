import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AuthApi } from "@/client/api/auth.api";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/client/validation/Auth.schema";

import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import { Helmet } from "react-helmet-async";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ResetPasswordFormValues>({
        resolver: yupResolver(resetPasswordSchema),
        defaultValues: {
            otp: "",
            password: "",
        },
    });

    const { mutate: resetPassword, isPending } = useMutation({
        mutationFn: AuthApi.resetPassword,

        onSuccess: response => {
            reset();
            ToastService.success(response.message || "Password reset successfully.");
            navigate("/login");
        },

        onError: error => {
            ToastService.error(error?.message || "Failed to reset password.");
        },
    });

    const onSubmit = (values: ResetPasswordFormValues) => {
        if (!userId) {
            ToastService.error("Invalid password reset request.");
            return;
        }

        resetPassword({ userId, otp: values.otp, password: values.password });
    };

    return (
        <>
            <Helmet>
                <title>Reset Password - Ecommerce</title>
                <meta name="description" content="Set a new password for your Ecommerce account securely." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <section className="flex min-h-[70vh] w-full items-center justify-center px-4 py-12">
                <div className="w-full max-w-md rounded-xl bg-card p-6 shadow-lg md:p-8">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <KeyRound className="h-7 w-7" />
                        </div>

                        <h1 className="text-3xl font-bold">Reset Password</h1>

                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            Enter the verification code sent to your email and create your new password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="w-full space-y-2">
                            <Label htmlFor="otp">Verification Code</Label>
                            <InputOTP
                                maxLength={6}
                                {...register("otp")}
                                disabled={isPending}
                                onChange={value => setValue("otp", value, { shouldValidate: true })}
                            >
                                <InputOTPGroup className="w-full justify-center">
                                    <InputOTPSlot className="h-15 w-15 text-xl" index={0} />
                                    <InputOTPSlot className="h-15 w-15 text-xl" index={1} />
                                    <InputOTPSlot className="h-15 w-15 text-xl" index={2} />
                                    <InputOTPSlot className="h-15 w-15 text-xl" index={3} />
                                    <InputOTPSlot className="h-15 w-15 text-xl" index={4} />
                                    <InputOTPSlot className="h-15 w-15 text-xl" index={5} />
                                </InputOTPGroup>
                            </InputOTP>

                            <FormError message={errors.otp?.message} />
                        </div>

                        <div className="w-full space-y-2">
                            <Label htmlFor="password">New Password</Label>

                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    disabled={isPending}
                                    placeholder="Enter new password"
                                    className="pr-10"
                                    {...register("password")}
                                />

                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => setShowPassword(previous => !previous)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            <FormError message={errors.password?.message} />
                        </div>

                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
