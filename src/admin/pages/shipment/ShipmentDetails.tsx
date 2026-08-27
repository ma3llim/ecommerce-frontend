import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ShipmentApi } from "@/admin/api/Shipment.api";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UpdateShipmentStatus from "@/admin/components/UpdateShipmentStatus";
import { Helmet } from "react-helmet-async";

const ShipmentDetails = () => {
    const { shipmentId } = useParams<{ shipmentId: string }>();
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ["shipment", shipmentId],
        queryFn: () => ShipmentApi.getShipmentById(shipmentId!),
        enabled: !!shipmentId,
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return <ErrorState message={error.message} />;
    }

    const shipment = data?.data;

    if (!shipment) {
        return <ErrorState message="Shipment not found." />;
    }

    return (
        <>
            <Helmet>
                <title>Shipment Details | Admin</title>
                <meta
                    name="description"
                    content="View detailed shipment information, tracking details, shipment status, delivery information, and shipment timeline."
                />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Shipment Details</h1>

                        <p className="text-sm text-muted-foreground">View shipment tracking and delivery information.</p>
                    </div>

                    <Button type="button" variant="outline" onClick={() => navigate("/admin/shipments")}>
                        <ArrowLeft className="mr-2 size-4" />
                        Back
                    </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipment Information</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Shipment ID</p>

                                <p className="font-medium">{shipment.shipmentId}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Order ID</p>

                                <p className="font-medium">{shipment.orderId}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Courier</p>

                                <p className="font-medium">{shipment.courierName}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Tracking Number</p>

                                <p className="font-medium">{shipment.trackingNumber}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>

                                <Badge variant="outline">{shipment.shipmentStatus.replaceAll("_", " ")}</Badge>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Shipped At</p>

                                <p>{shipment.shippedAt ? new Date(shipment.shippedAt).toLocaleString() : "-"}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Delivered At</p>

                                <p>{shipment.deliveredAt ? new Date(shipment.deliveredAt).toLocaleString() : "-"}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Update Shipment Status</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <UpdateShipmentStatus shipmentId={shipment.shipmentId} currentStatus={shipment.shipmentStatus} />
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Shipment Timeline</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {shipment.timeline.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No tracking events available.</p>
                        ) : (
                            <div className="space-y-6">
                                {shipment.timeline.map(event => (
                                    <div key={event.eventId} className="relative border-l pl-6">
                                        <div className="absolute -left-1.5 top-1.5 size-3 rounded-full border bg-background" />

                                        <div className="flex items-center justify-between gap-4">
                                            <Badge variant="outline">{event.status.replaceAll("_", " ")}</Badge>

                                            <span className="text-xs text-muted-foreground">{new Date(event.eventTime).toLocaleString()}</span>
                                        </div>

                                        <p className="mt-2 font-medium">{event.location}</p>

                                        <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ShipmentDetails;
