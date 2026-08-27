import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import { UserApi } from "@/admin/api/User.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";

const UserDetailsPage = () => {
    const { userId } = useParams<{ userId: string }>();

    const navigate = useNavigate();
    const { data, isLoading, error } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => UserApi.getUserDetails(userId!),
        enabled: !!userId,
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return <ErrorState message={error.message} />;
    }

    const user = data?.data;

    if (!user) {
        return <ErrorState message="User not found." />;
    }

    return (
        <div className="mx-auto w-full space-y-6">
            <div className="flex items-center gap-3">
                <Button type="button" variant="outline" size="icon" onClick={() => navigate("/admin/users")}>
                    <ArrowLeft className="size-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">User Details</h1>
                    <p className="text-sm text-muted-foreground">View user information and addresses.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-muted-foreground">First Name</p>

                            <p className="font-medium">{user.firstName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Last Name</p>
                            <p className="font-medium">{user.lastName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Phone Number</p>
                            <p className="font-medium">{user.phoneNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Account Status</p>
                            <Badge variant={user.accountStatus === "ACTIVE" ? "default" : user.accountStatus === "LOCKED" ? "destructive" : "secondary"}>
                                {user.accountStatus}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Role</p>
                            <Badge variant="outline">{user.role}</Badge>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Email Verified</p>
                            <div className="flex items-center gap-2">
                                {user.emailVerified ? (
                                    <>
                                        <Check className="size-4 text-green-600" />

                                        <span className="font-medium">Verified</span>
                                    </>
                                ) : (
                                    <>
                                        <X className="size-4 text-destructive" />

                                        <span className="font-medium">Not Verified</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Last Login</p>
                            <p className="font-medium">{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "Never"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Created At</p>
                            <p className="font-medium">{new Date(user.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Updated At</p>
                            <p className="font-medium">{new Date(user.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Addresses ({user.addresses.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {user.addresses.length === 0 ? (
                        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">No addresses available.</div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {user.addresses.map(address => (
                                <Card key={address.id}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-base">{address.addressType}</CardTitle>

                                            <div className="flex gap-2">
                                                {address.defaultShipping && <Badge variant="secondary">Shipping</Badge>}

                                                {address.defaultBilling && <Badge variant="secondary">Billing</Badge>}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                        <p className="font-medium">{address.fullName}</p>
                                        <p>{address.phoneNumber}</p>
                                        <p>{address.addressLineOne}</p>
                                        {address.addressLineTwo && <p>{address.addressLineTwo}</p>}
                                        <p>
                                            {" "}
                                            {address.city}, {address.state}, {address.country}{" "}
                                        </p>
                                        <p>{address.postalCode}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default UserDetailsPage;
