import FormInput from "@/components/forms/FormInput";
import FormPassword from "@/components/forms/FormPassword";
import { Button } from "@/components/ui/button";
import { AdminLoginScheme, type AdminLoginFormValues } from "@/validation/admin/auth/AdminLoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AdminAuthApi } from "../api/AdminAuth.api";
import ToastService from "@/services/ToastService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin } from "@/admin/store/slice/AdminAuth.slice";

const AdminLoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AdminLoginFormValues>({
        resolver: yupResolver(AdminLoginScheme),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: AdminLoginFormValues) =>
            AdminAuthApi.login({
                email: data.email!,
                password: data.password!,
            }),

        onSuccess: response => {
            const { user: admin, accessToken } = response.data;

            if (!admin.emailVerified) {
                ToastService.error("Please verify your email.");
                return;
            }

            if (admin.role !== "ADMIN") {
                ToastService.error("You are not allowed to access the admin panel.");
                return;
            }

            ToastService.success(response.message);
            dispatch(setAdmin({ accessToken, admin }));
            navigate("/admin/dashboard");
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    return (
        <form onSubmit={handleSubmit(e => mutate(e))} className="space-y-3">
            <FormInput
                id="email"
                disabled={isPending}
                label="Email"
                type="email"
                placeholder="Enter your email"
                registration={register("email")}
                error={errors.email?.message}
            />
            <FormPassword
                id="password"
                label="Password"
                disabled={isPending}
                placeholder="Enter your password"
                registration={register("password")}
                error={errors.password?.message}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
                Sign In
            </Button>
        </form>
    );
};

export default AdminLoginForm;
