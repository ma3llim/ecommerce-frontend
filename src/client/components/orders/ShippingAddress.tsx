import type { ShippingAddress as ShippingAddressType } from "@/client/types/Order.types";

interface ShippingAddressProps {
    address: ShippingAddressType;
}

const ShippingAddress = ({ address }: ShippingAddressProps) => {
    return (
        <section className="rounded-xl border bg-card p-5">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>
                    {address.city}, {address.state}
                </p>
                <p>
                    {address.postalCode}, {address.country}
                </p>
            </div>
        </section>
    );
};

export default ShippingAddress;
