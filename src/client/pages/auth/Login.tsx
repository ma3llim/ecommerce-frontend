import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Lock, Mail } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/client/validation/Auth.schema";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ToastService from "@/services/ToastService";
import { AuthApi } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "@/client/store/slice/UserAuth.slice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: AuthApi.loginUser,
        onSuccess: response => {
            ToastService.success(response.message || "Login successful.");
            const { accessToken, user } = response.data;
            dispatch(setUser({ accessToken, user }));
            navigate("/");
        },

        onError: error => {
            ToastService.error(error.message || "Unable to login.");
        },
    });

    const onSubmit = (values: LoginFormValues) => {
        mutate(values);
    };

    return (
        <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md rounded-xl bg-card p-6 shadow-lg md:p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>

                    <p className="mt-2 text-sm text-muted-foreground">Login to your SameerCart account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input id="email" type="email" disabled={isPending} placeholder="Enter your email" className="pl-10" {...register("email")} />
                        </div>

                        <FormError message={errors.email?.message} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="password"
                                type="password"
                                disabled={isPending}
                                placeholder="Enter your password"
                                className="pl-10"
                                {...register("password")}
                            />
                        </div>

                        <FormError message={errors.password?.message} />
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <Button type="submit" disabled={isPending} className="w-full">
                        {isPending ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <div className="mt-6 border-t pt-6 text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold text-primary hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Login;
