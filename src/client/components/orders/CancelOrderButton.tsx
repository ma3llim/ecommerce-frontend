import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderApi } from "@/client/api/Order.api";
import ToastService from "@/services/ToastService";
import ButtonWithAlert from "@/admin/components/ButtonWithAlert";

interface CancelOrderButtonProps {
    orderId: string;
}

const CancelOrderButton = ({ orderId }: CancelOrderButtonProps) => {
    const queryClient = useQueryClient();

    const { mutate: cancelOrder, isPending } = useMutation({
        mutationFn: () => OrderApi.cancelOrder(orderId),

        onSuccess: response => {
            ToastService.success(response.message || "Order cancelled successfully.");

            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });

            queryClient.invalidateQueries({
                queryKey: ["order", orderId],
            });
        },

        onError: error => {
            ToastService.error(error instanceof Error ? error.message : "Failed to cancel order.");
        },
    });

    return (
        <ButtonWithAlert
            dialogTitle={isPending ? "Cancelling..." : "Cancel Order"}
            dialogDesc={`Are you sure you want to cancel order "${orderId}"? This action cannot be undone.`}
            dialogActionTitle="Cancel"
            dialogActionfn={() => cancelOrder()}
            aria-label={`Cancel Order ${orderId}`}
            disabled={isPending}
        />
    );
};

export default CancelOrderButton;
