import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateUserSchema, type UpdateUserFormValues } from "@/client/validation/User.schema";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import { UserApi } from "@/client/api/User.api";

const Dashboard = () => {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateUserFormValues>({
        resolver: yupResolver(updateUserSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
        },
    });

    const { data, isLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: UserApi.getCurrentUser,
    });

    const user = data?.data;

    useEffect(() => {
        if (!user) {
            return;
        }

        reset({
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber ?? "",
        });
    }, [user, reset]);

    /*
     * Update profile
     */
    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: UserApi.updateUser,

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });

            setIsEditing(false);

            ToastService.success(response.message || "Profile updated successfully.");
        },

        onError: error => {
            ToastService.error(error?.message || "Failed to update profile.");
        },
    });

    /*
     * Update profile image
     */
    const { mutate: updateProfileImage, isPending: isUpdatingImage } = useMutation({
        mutationFn: UserApi.updateProfileImage,

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });

            ToastService.success(response.message || "Profile image updated successfully.");
        },

        onError: error => {
            ToastService.error(error?.message || "Failed to update profile image.");
        },
    });

    /*
     * Profile submit
     */
    const onSubmit = (values: UpdateUserFormValues) => {
        updateUser(values);
    };

    /*
     * Profile image
     */
    const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedTypes.includes(file.type)) {
            ToastService.error("Only JPG, PNG, and WebP images are allowed.");

            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            ToastService.error("Profile image must not exceed 5MB.");

            event.target.value = "";
            return;
        }

        updateProfileImage(file);

        event.target.value = "";
    };

    /*
     * Cancel editing
     */
    const handleCancelEdit = () => {
        reset({
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            phoneNumber: user?.phoneNumber ?? "",
        });

        setIsEditing(false);
    };

    if (isLoading) {
        return (
            <div className="flex min-h-96 items-center justify-center">
                <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <section className="w-full space-y-6 overflow-hidden rounded-2xl border bg-card p-4 shadow-sm sm:space-y-8 sm:p-5 md:p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.firstName}!</h1>

                <p className="mt-2 text-muted-foreground">Manage your account and profile information.</p>
            </div>

            <div className="rounded-xl border bg-muted/20">
                <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-5">
                        <div className="relative shrink-0">
                            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-muted">
                                {user?.profileImageUrl ? (
                                    <img src={user.profileImageUrl} alt={`${user.firstName} ${user.lastName}`} className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-2xl font-bold text-muted-foreground">
                                        {user?.firstName?.charAt(0)}
                                        {user?.lastName?.charAt(0)}
                                    </span>
                                )}
                            </div>

                            <label
                                htmlFor="profileImage"
                                title="Replace profile image"
                                className={`absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:opacity-90 ${
                                    isUpdatingImage ? "pointer-events-none opacity-50" : ""
                                }`}
                            >
                                <Camera className="h-4 w-4" />

                                <Input
                                    id="profileImage"
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.webp"
                                    disabled={isUpdatingImage}
                                    onChange={handleProfileImage}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="min-w-0">
                            <h2 className="text-2xl font-semibold">
                                {user?.firstName} {user?.lastName}
                            </h2>

                            <p className="mt-1 break-all text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start lg:self-center">
                        <span className="text-sm text-muted-foreground">Status</span>

                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{user?.accountStatus}</span>
                    </div>
                </div>
            </div>

            <div>
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Personal Information</h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {isEditing ? "Update your personal information." : "Your current profile information."}
                        </p>
                    </div>

                    {!isEditing && (
                        <Button type="button" variant="outline" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </Button>
                    )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>

                            <Input id="firstName" disabled={!isEditing || isUpdating} placeholder="Enter first name" {...register("firstName")} />

                            {isEditing && <FormError message={errors.firstName?.message} />}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>

                            <Input id="lastName" disabled={!isEditing || isUpdating} placeholder="Enter last name" {...register("lastName")} />

                            {isEditing && <FormError message={errors.lastName?.message} />}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input id="email" type="email" value={user?.email ?? ""} disabled className="pl-10" />
                        </div>

                        <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>

                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="phoneNumber"
                                type="tel"
                                disabled={!isEditing || isUpdating}
                                placeholder="Enter phone number"
                                className="pl-10"
                                {...register("phoneNumber")}
                            />
                        </div>

                        {isEditing && <FormError message={errors.phoneNumber?.message} />}
                    </div>

                    <div className="border-t pt-6">
                        <div className="mb-5">
                            <h2 className="text-xl font-semibold">Account Information</h2>

                            <p className="mt-1 text-sm text-muted-foreground">Overview of your account.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-xl border p-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email Verification</p>

                                        <p className="mt-1 font-medium">{user?.emailVerified ? "Verified" : "Not Verified"}</p>
                                    </div>

                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                            user?.emailVerified ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                                        }`}
                                    >
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border p-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Account Role</p>

                                        <p className="mt-1 font-medium">{user?.role}</p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <UserRound className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border p-5">
                                <p className="text-sm text-muted-foreground">Member Since</p>

                                <p className="mt-1 font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</p>
                            </div>

                            <div className="rounded-xl border p-5">
                                <p className="text-sm text-muted-foreground">Last Login</p>

                                <p className="mt-1 font-medium">{user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "—"}</p>
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                            <Button type="button" variant="outline" disabled={isUpdating} onClick={handleCancelEdit}>
                                Cancel
                            </Button>

                            <Button type="submit" disabled={isUpdating}>
                                {isUpdating ? "Updating..." : "Update Profile"}
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Dashboard;
