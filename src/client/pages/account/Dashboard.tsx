import { UserApi } from "@/client/api/User.api";
import PageLoader from "@/components/common/PageLoader";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/query/queryClient";
import ToastService from "@/services/ToastService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Camera, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";

const Dashboard = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: UserApi.getCurrentUser,
    });

    const user = data?.data;

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

        event.target.value = "";
    };

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <section className="w-full space-y-8 overflow-hidden rounded-2xl border bg-card p-5 shadow-sm md:p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.firstName}!</h1>
                <p className="mt-2 text-muted-foreground">Manage your account and profile information.</p>
            </div>
            <div className="rounded-xl border bg-muted/20">
                <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-5">
                        <div className="relative">
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
                                className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:opacity-90"
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

                        {/* Basic Info */}
                        <div className="min-w-0">
                            <h2 className="text-2xl font-semibold">
                                {user?.firstName} {user?.lastName}
                            </h2>

                            <p className="mt-1 break-all text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>

                    {/* Account Status */}
                    <div className="flex items-center gap-2 self-start sm:self-center">
                        <span className="text-sm text-muted-foreground">Status</span>

                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{user?.accountStatus}</span>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div>
                <div className="mb-5">
                    <h2 className="text-xl font-semibold">Contact Information</h2>

                    <p className="mt-1 text-sm text-muted-foreground">Your current contact details.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Email */}
                    <div className="flex items-center gap-4 rounded-xl border p-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Mail className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm text-muted-foreground">Email Address</p>

                            <p className="mt-1 break-all font-medium">{user?.email}</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-4 rounded-xl border p-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Phone className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Phone Number</p>

                            <p className="mt-1 font-medium">{user?.phoneNumber || "Not provided"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Information */}
            <div>
                <div className="mb-5">
                    <h2 className="text-xl font-semibold">Account Information</h2>

                    <p className="mt-1 text-sm text-muted-foreground">Overview of your account.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Email Verification */}
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

                    {/* Role */}
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

                    {/* Member Since */}
                    <div className="rounded-xl border p-5">
                        <p className="text-sm text-muted-foreground">Member Since</p>

                        <p className="mt-1 font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</p>
                    </div>

                    {/* Last Login */}
                    <div className="rounded-xl border p-5">
                        <p className="text-sm text-muted-foreground">Last Login</p>

                        <p className="mt-1 font-medium">{user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "—"}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
