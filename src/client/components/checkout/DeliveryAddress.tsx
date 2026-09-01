import type { Address } from "@/client/types/Address.types";
import { Button } from "@/components/ui/button";

interface DeliveryAddressProps {
    addresses: Address[];
    selectedAddressId: string | null;
    isLoading: boolean;
    isError: boolean;
    onSelect: (addressId: string) => void;
    onAddAddress: () => void;
}

const DeliveryAddress = ({ addresses, selectedAddressId, isLoading, isError, onSelect, onAddAddress }: DeliveryAddressProps) => {
    return (
        <section className="rounded-xl border bg-card p-5">
            <h2 className="text-xl font-semibold">Delivery Address</h2>
            <p className="mt-1 text-sm text-muted-foreground">Select an address for delivery.</p>
            {isLoading ? (
                <div className="py-8 text-center text-sm text-muted-foreground">Loading addresses...</div>
            ) : isError ? (
                <div className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-5">
                    <p className="text-sm text-destructive">Unable to load your addresses.</p>
                </div>
            ) : addresses.length === 0 ? (
                <div className="mt-5 rounded-lg border border-dashed p-6 text-center">
                    <p className="font-medium">No saved addresses</p>
                    <p className="mt-1 text-sm text-muted-foreground">Add a delivery address to continue.</p>
                    <Button type="button" className="mt-4" onClick={onAddAddress}>
                        Add Address
                    </Button>
                </div>
            ) : (
                <div className="mt-5 grid gap-4">
                    {addresses.map(address => {
                        const isSelected = selectedAddressId === address.id;
                        return (
                            <button
                                key={address.id}
                                type="button"
                                onClick={() => onSelect(address.id)}
                                className={`w-full rounded-xl border p-4 text-left transition-colors duration-200 ${
                                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                            isSelected ? "border-primary" : "border-muted-foreground"
                                        }`}
                                    >
                                        {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="font-semibold">{address.fullName}</p>

                                            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">{address.addressType}</span>

                                            {address.defaultShipping && (
                                                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">Default</span>
                                            )}
                                        </div>

                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                            {address.addressLineOne}
                                            {address.addressLineTwo && `, ${address.addressLineTwo}`}
                                            <br />
                                            {address.city}, {address.state} {address.postalCode}
                                            <br />
                                            {address.country}
                                        </p>

                                        <p className="mt-2 text-sm font-medium">{address.phoneNumber}</p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default DeliveryAddress;
