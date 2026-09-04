import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MailCheck } from "lucide-react";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import { otpSchema, type VerifyEmailFormValues } from "@/client/validation/Auth.schema";
import { AuthApi } from "@/client/api/auth.api";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useDispatch } from "react-redux";
import { setUser } from "@/client/store/slice/UserAuth.slice";
import { Helmet } from "react-helmet-async";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useParams<{ userId: string }>();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<VerifyEmailFormValues>({
        resolver: yupResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const { mutate: verify, isPending: isVerifying } = useMutation({
        mutationFn: AuthApi.verifyEmail,

        onSuccess: response => {
            ToastService.success(response.message || "Email verified successfully.");
            const { accessToken, user } = response.data;
            dispatch(setUser({ accessToken, user }));
            navigate("/account/dashboard");
        },

        onError: error => {
            ToastService.error(error.message || "Invalid or expired verification code.");
        },
    });

    const { mutate: resend, isPending: isResending } = useMutation({
        mutationFn: AuthApi.resendVerification,

        onSuccess: response => {
            ToastService.success(response.message || "Verification code sent successfully.");
        },
        onError: error => {
            ToastService.error(error.message || "Failed to resend verification code.");
        },
    });

    const onSubmit = (values: VerifyEmailFormValues) => {
        if (!userId) {
            ToastService.error("Invalid verification request.");
            return;
        }

        verify({ userId, otp: values.otp });
    };

    const handleResend = () => {
        if (!userId) {
            ToastService.error("Invalid verification request.");
            return;
        }

        resend({ userId });
    };

    const isPending = isVerifying || isResending;

    return (
        <>
            <Helmet>
                <title>Verify Email - Ecommerce</title>
                <meta name="description" content="Verify your email address to activate your Ecommerce account." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <section className="flex min-h-[70vh] w-full items-center justify-center px-4 py-12">
                <div className="w-full max-w-md rounded-xl bg-card p-6 shadow-lg md:p-8">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <MailCheck className="h-7 w-7" />
                        </div>

                        <h1 className="text-3xl font-bold">Verify Your Email</h1>

                        <p className="mt-3 text-sm leading-6 text-muted-foreground">We've sent a 6-digit verification code to your registered email address.</p>
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

                        <Button type="submit" disabled={isPending} className="w-full">
                            {isVerifying ? "Verifying..." : "Verify Email"}
                        </Button>
                    </form>

                    <div className="mt-6 border-t pt-6 text-center">
                        <p className="text-sm text-muted-foreground">Didn't receive the code?</p>

                        <Button type="button" variant="link" disabled={isPending} onClick={handleResend} className="mt-1">
                            {isResending ? "Sending..." : "Resend Verification Code"}
                        </Button>
                    </div>

                    <div className="mt-4 text-center">
                        <Link to="/login" className="text-sm font-semibold text-primary hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default VerifyEmail;
