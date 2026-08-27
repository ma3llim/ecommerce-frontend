import { PaymentApi } from "@/admin/api/PaymentApi";
import { AdminButton } from "@/components/common/AdminButton";
import PageLoader from "@/components/common/PageLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentDetailsPage = () => {
    const { paymentId } = useParams<{ paymentId: string }>();
    const navigate = useNavigate();

    const {
        data: payment,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["payment", paymentId],
        queryFn: () => PaymentApi.getPayment(paymentId!),
        enabled: !!paymentId,
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (isError || !payment) {
        return (
            <div className="space-y-4">
                <AdminButton variant="secondary" onClick={() => navigate("/admin/payments")}>
                    <ArrowLeft className="size-4" />
                    Back
                </AdminButton>
                <p className="text-destructive">Failed to load payment details.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <AdminButton variant="secondary" onClick={() => navigate("/admin/payments")}>
                    <ArrowLeft className="size-4" />
                    Back
                </AdminButton>

                <div>
                    <h1 className="text-2xl font-bold">Payment Details</h1>

                    <p className="text-muted-foreground">View payment information.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-muted-foreground">Payment ID</p>

                            <p className="font-medium break-all">{payment.paymentId}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Razorpay Order ID</p>

                            <p className="font-medium break-all">{payment.razorpayOrderId}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Amount</p>

                            <p className="font-medium">
                                {payment.currency} {payment.amount.toFixed(2)}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Currency</p>

                            <p className="font-medium">{payment.currency}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Payment Method</p>

                            <p className="font-medium">{payment.paymentMethod}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Payment Status</p>

                            <p className="font-medium">{payment.paymentStatus}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentDetailsPage;
