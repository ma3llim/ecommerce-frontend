import { Check, Edit, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AddressCardProps } from "@/client/types/Address.types";
import ButtonWithAlert from "@/admin/components/ButtonWithAlert";

const AddressCard = ({ address, isPending, onEdit, onDelete, onDefaultShipping, onDefaultBilling }: AddressCardProps) => {
    return (
        <div className="flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold">{address.addressType}</h3>
                        <p className="text-sm text-muted-foreground">{address.fullName}</p>
                    </div>
                </div>

                <div className="flex gap-1">
                    {address.defaultShipping && <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">Shipping</span>}
                    {address.defaultBilling && <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">Billing</span>}
                </div>
            </div>

            <div className="mt-5 space-y-1 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{address.phoneNumber}</p>
                <p>{address.addressLineOne}</p>
                {address.addressLineTwo && <p>{address.addressLineTwo}</p>}
                <p>
                    {address.city}, {address.state}
                </p>
                <p>
                    {address.country} - {address.postalCode}
                </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
                {!address.defaultShipping && (
                    <Button type="button" size="sm" variant="outline" disabled={isPending} onClick={() => onDefaultShipping(address)}>
                        <Check className="mr-2 h-4 w-4" />
                        Set Shipping
                    </Button>
                )}

                {!address.defaultBilling && (
                    <Button type="button" size="sm" variant="outline" disabled={isPending} onClick={() => onDefaultBilling(address)}>
                        <Check className="mr-2 h-4 w-4" />
                        Set Billing
                    </Button>
                )}
            </div>
            <div className="mt-auto flex gap-2 border-t pt-5 justify-center items-center">
                <Button type="button" variant="outline" disabled={isPending} onClick={() => onEdit(address)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </Button>
                <ButtonWithAlert
                    title="Delete Address"
                    disabled={isPending}
                    dialogTitle={`Are you sure you want to delete this ${address.addressType.toLowerCase()} address?`}
                    dialogActionfn={() => onDelete(address)}
                    buttonTitle="Delete"
                />
            </div>
        </div>
    );
};

export default AddressCard;
