import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, Mail, Phone, UserRound } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateUserSchema, type UpdateUserFormValues } from "@/client/validation/User.schema";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import { UserApi } from "@/client/api/User.api";
import type { UpdateUserRequest } from "@/admin/types/users/User.types";

const Profile = () => {
    const queryClient = useQueryClient();

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

    const { data, isLoading, isFetching } = useQuery({
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

    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: UserApi.updateUser,

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });

            ToastService.success(response.message || "Profile updated successfully.");
        },

        onError: error => {
            ToastService.error(error?.message || "Failed to update profile.");
        },
    });

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

    const onSubmit = (values: UpdateUserRequest) => {
        updateUser(values);
    };

    const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            ToastService.error("Profile image must not exceed 5MB.");

            event.target.value = "";
            return;
        }

        updateProfileImage(file);
    };

    if (isLoading || isFetching) {
        return (
            <div className="flex min-h-80 items-center justify-center">
                <p className="text-muted-foreground">Loading profile...</p>
            </div>
        );
    }

    return (
        <section className="w-full space-y-8">
            <div>
                <h1 className="text-3xl font-bold">My Profile</h1>

                <p className="mt-2 text-muted-foreground">Manage your personal information and account settings.</p>
            </div>

            {/* Profile Summary */}
            <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="relative h-28 w-28 shrink-0">
                        <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-primary/20 bg-muted">
                            {user?.profileImageUrl ? (
                                <img src={user.profileImageUrl} alt={`${user.firstName} profile`} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-muted-foreground">
                                    {user?.firstName?.charAt(0)}
                                    {user?.lastName?.charAt(0)}
                                </div>
                            )}
                        </div>

                        <label
                            htmlFor="profileImage"
                            className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-opacity hover:opacity-90"
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

                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">
                            {user?.firstName} {user?.lastName}
                        </h2>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>{user?.email}</span>
                        </div>

                        {user?.phoneNumber && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>{user.phoneNumber}</span>
                            </div>
                        )}
                    </div>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">JPG, PNG or WebP. Maximum size 5MB.</p>
            </div>

            {/* Personal Information */}
            <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <UserRound className="h-5 w-5" />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">Personal Information</h2>

                        <p className="text-sm text-muted-foreground">Update your personal information.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="w-full space-y-2">
                            <Label htmlFor="firstName">First Name</Label>

                            <Input id="firstName" disabled={isUpdating} placeholder="Enter first name" {...register("firstName")} />

                            <FormError message={errors.firstName?.message} />
                        </div>

                        <div className="w-full space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>

                            <Input id="lastName" disabled={isUpdating} placeholder="Enter last name" {...register("lastName")} />

                            <FormError message={errors.lastName?.message} />
                        </div>
                    </div>

                    <div className="w-full space-y-2">
                        <Label htmlFor="email">Email Address</Label>

                        <Input id="email" type="email" value={user?.email ?? ""} disabled />
                    </div>

                    <div className="w-full space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>

                        <Input id="phoneNumber" type="tel" disabled={isUpdating} placeholder="Enter phone number" {...register("phoneNumber")} />

                        <FormError message={errors.phoneNumber?.message} />
                    </div>

                    <div className="grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-2">
                        <div className="rounded-lg bg-muted p-4">
                            <p className="text-sm text-muted-foreground">Account Status</p>

                            <p className="mt-1 font-semibold">{user?.accountStatus}</p>
                        </div>

                        <div className="rounded-lg bg-muted p-4">
                            <p className="text-sm text-muted-foreground">Email Verification</p>

                            <p className="mt-1 font-semibold">{user?.emailVerified ? "Verified" : "Not Verified"}</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isUpdating}
                            onClick={() =>
                                reset({
                                    firstName: user?.firstName ?? "",
                                    lastName: user?.lastName ?? "",
                                    phoneNumber: user?.phoneNumber ?? "",
                                })
                            }
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isUpdating}>
                            {isUpdating ? "Updating..." : "Update Profile"}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Profile;
