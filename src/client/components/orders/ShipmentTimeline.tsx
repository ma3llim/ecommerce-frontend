import type { UserShipmentResponse } from "@/client/types/Order.types";

interface ShipmentTimelineProps {
    shipment?: UserShipmentResponse | null;
}

const ShipmentTimeline = ({ shipment }: ShipmentTimelineProps) => {
    if (!shipment) {
        return null;
    }

    return (
        <section className="rounded-xl border bg-card p-5">
            <h2 className="text-xl font-semibold">Shipment Tracking</h2>
            <div className="mt-4 space-y-1 text-sm">
                <p>
                    Courier: <span className="font-medium">{shipment.courierName}</span>
                </p>

                <p>
                    Tracking Number: <span className="font-medium">{shipment.trackingNumber}</span>
                </p>
            </div>

            <div className="mt-6 space-y-5">
                {shipment.timeline.map(event => (
                    <div key={event.eventId} className="border-l-2 border-primary pl-4">
                        <p className="font-medium">{event.status}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                        {event.location && <p className="mt-1 text-xs text-muted-foreground">{event.location}</p>}
                        <p className="mt-1 text-xs text-muted-foreground">{new Date(event.eventTime).toLocaleString("en-IN")}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShipmentTimeline;
