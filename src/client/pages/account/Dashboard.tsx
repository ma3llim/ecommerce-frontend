import { UserApi } from "@/client/api/User.api";
import Container from "@/client/components/Container";
import PageLoader from "@/components/common/PageLoader";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, ShieldCheck, UserRound } from "lucide-react";

const Dashboard = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: UserApi.getCurrentUser,
    });

    const user = data?.data;

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <Container>
            <section className="w-full space-y-8 my-5">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.firstName}!</h1>
                    <p className="mt-2 text-muted-foreground">Manage your account, profile information, and security settings from here.</p>
                </div>
                <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                    <div className="border-b bg-muted/30 px-6 py-6 md:px-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-5">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
                                    {user?.profileImageUrl ? (
                                        <img src={user.profileImageUrl} alt={`${user.firstName} ${user.lastName}`} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-2xl font-bold text-muted-foreground">
                                            {user?.firstName?.charAt(0)}
                                            {user?.lastName?.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        {user?.firstName} {user?.lastName}
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Account</span>
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{user?.accountStatus}</span>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-6 md:px-8">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold">Contact Information</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Your current account contact details.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm text-muted-foreground">Email Address</p>
                                    <p className="mt-1 break-all font-medium">{user?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
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

                    <div className="px-6 py-6 md:px-8">
                        <div className="mb-5">
                            <h2 className="text-xl font-semibold">Account Details</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Overview of your account status and security.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border bg-card p-5 shadow-sm">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email Verification</p>
                                        <p className="mt-2 font-semibold">{user?.emailVerified ? "Verified" : "Not Verified"}</p>
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
                            <div className="rounded-xl border bg-card p-5 shadow-sm">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Account Role</p>
                                        <p className="mt-2 font-semibold">{user?.role}</p>
                                    </div>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <UserRound className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-6 md:px-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Account Activity</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Important dates associated with your account.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border bg-card p-5 shadow-sm">
                                <p className="text-sm text-muted-foreground">Member Since</p>
                                <p className="mt-1 font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</p>
                            </div>
                            <div className="rounded-xl border bg-card p-5 shadow-sm">
                                <p className="text-sm text-muted-foreground">Last Login</p>
                                <p className="mt-1 font-medium">{user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "—"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default Dashboard;
