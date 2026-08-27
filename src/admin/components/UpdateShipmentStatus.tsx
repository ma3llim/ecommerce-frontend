import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ShipmentApi } from "@/admin/api/Shipment.api";
import ToastService from "@/services/ToastService";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { ShipmentStatus, UpdateShipmentStatusRequest } from "../types/Shipment.types";

interface UpdateShipmentStatusProps {
    shipmentId: string;
    currentStatus: ShipmentStatus;
}

const UpdateShipmentStatus = ({ shipmentId, currentStatus }: UpdateShipmentStatusProps) => {
    const queryClient = useQueryClient();
    const [status, setStatus] = useState<ShipmentStatus>(currentStatus);
    const [currentLocation, setCurrentLocation] = useState("");
    const [description, setDescription] = useState("");

    const { mutate: updateStatus, isPending } = useMutation({
        mutationFn: (data: UpdateShipmentStatusRequest) => ShipmentApi.updateShipmentStatus(shipmentId, data),

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["shipment", shipmentId],
            });

            queryClient.invalidateQueries({
                queryKey: ["shipments"],
            });

            ToastService.success(response.message);

            setCurrentLocation("");
            setDescription("");
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateStatus({
            status,
            currentLocation,
            description,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="status">Shipment Status</Label>

                <select
                    id="status"
                    value={status}
                    onChange={event => setStatus(event.target.value as ShipmentStatus)}
                    disabled={isPending}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                    <option value="PENDING">Pending</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                </select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="currentLocation">Current Location</Label>

                <input
                    id="currentLocation"
                    value={currentLocation}
                    onChange={event => setCurrentLocation(event.target.value)}
                    disabled={isPending}
                    placeholder="Enter current location"
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>

                <textarea
                    id="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    disabled={isPending}
                    placeholder="Enter tracking event description"
                    required
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Status"}
            </Button>
        </form>
    );
};

export default UpdateShipmentStatus;
