import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { updatePasswordSchema, type UpdatePasswordFormValues } from "@/client/validation/User.schema";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import { UserApi } from "@/client/api/User.api";

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdatePasswordFormValues>({
        resolver: yupResolver(updatePasswordSchema),
        defaultValues: {
            currentPassword: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { mutate: updatePassword, isPending } = useMutation({
        mutationFn: UserApi.changePassword,

        onSuccess: response => {
            reset();
            ToastService.success(response.message || "Password updated successfully.");
        },

        onError: error => {
            ToastService.error(error?.message || "Failed to update password.");
        },
    });

    const onSubmit = (values: UpdatePasswordFormValues) => {
        updatePassword({
            currentPassword: values.currentPassword,
            newPassword: values.password,
        });
    };

    return (
        <section className="mx-auto w-full max-w-2xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Change Password</h1>
                <p className="mt-2 text-muted-foreground">Update your password to keep your account secure.</p>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <KeyRound className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Password Security</h2>
                        <p className="text-sm text-muted-foreground">Enter your current password and choose a new one.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="w-full space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            disabled={isPending}
                            placeholder="Enter current password"
                            {...register("currentPassword")}
                        />
                        <FormError message={errors.currentPassword?.message} />
                    </div>
                    <div className="w-full space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input id="password" type="password" disabled={isPending} placeholder="Enter new password" {...register("password")} />
                        <FormError message={errors.password?.message} />
                    </div>
                    <div className="w-full space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" disabled={isPending} placeholder="Confirm new password" {...register("confirmPassword")} />
                        <FormError message={errors.confirmPassword?.message} />
                    </div>
                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Button type="button" variant="outline" disabled={isPending} onClick={() => reset()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Password"}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ChangePassword;
