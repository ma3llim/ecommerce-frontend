import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, CheckCircle2, CircleDollarSign, Ticket, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CouponApi } from "@/admin/api/Coupon.api";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";

const ViewCoupon = () => {
    const { codeId } = useParams<{ codeId: string }>();
    const navigate = useNavigate();

    const { data: coupon, isLoading } = useQuery({
        queryKey: ["coupon", codeId],
        queryFn: () => CouponApi.getCoupon(codeId!),
        enabled: !!codeId,
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (!coupon) {
        return <ErrorState message="Coupon is not found" />;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Coupon Details</h1>
                    <p className="text-sm text-muted-foreground">View coupon configuration, discount, usage, and validity details.</p>
                </div>

                <Button type="button" variant="outline" onClick={() => navigate("/admin/coupons")}>
                    <ArrowLeft className="mr-2 size-4" />
                    Back to Coupons
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Coupon Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Coupon Code</p>
                            <p className="font-medium">{coupon.code}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p className="font-medium">{coupon.name}</p>
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <p className="text-sm text-muted-foreground">Description</p>
                            <p className="font-medium">{coupon.description || "No description provided"}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Status</p>
                            <Badge variant={coupon.active ? "default" : "secondary"}>{coupon.active ? "ACTIVE" : "INACTIVE"}</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Discount Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-start gap-3">
                            <CircleDollarSign className="mt-1 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Discount Type</p>
                                <p className="font-medium">{coupon.discountType}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Ticket className="mt-1 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Discount Value</p>
                                <p className="font-medium">{coupon.discountType === "PERCENTAGE" ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Minimum Order Amount</p>
                            <p className="font-medium">₹{coupon.minimumOrderAmount}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Maximum Discount Amount</p>
                            <p className="font-medium">₹{coupon.maximumDiscountAmount}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Usage Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="flex items-start gap-3">
                            <Users className="mt-1 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Usage Limit</p>
                                <p className="font-medium">{coupon.usageLimit}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Used Count</p>
                            <p className="font-medium">{coupon.usedCount}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Remaining Usage</p>
                            <p className="font-medium">{Math.max(coupon.usageLimit - coupon.usedCount, 0)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Validity</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="flex items-start gap-3">
                            <Calendar className="mt-1 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Valid From</p>
                                <p className="font-medium">{new Date(coupon.validFrom).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="mt-1 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Valid Until</p>
                                <p className="font-medium">{new Date(coupon.validUntil).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Audit Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-1 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Created At</p>
                                <p className="font-medium">{new Date(coupon.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-1 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Updated At</p>
                                <p className="font-medium">{new Date(coupon.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ViewCoupon;
