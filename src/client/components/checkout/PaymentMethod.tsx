import type { PaymentMethod as PaymentMethodType } from "@/client/types/Order.types";

interface PaymentMethodProps {
    value: PaymentMethodType;
    onChange: (value: PaymentMethodType) => void;
}

const PaymentMethod = ({ value, onChange }: PaymentMethodProps) => {
    const methods: {
        value: PaymentMethodType;
        title: string;
        description: string;
    }[] = [
        {
            value: "COD",
            title: "Cash On Delivery",
            description: "Pay with cash when you receive the order",
        },
        {
            value: "RAZORPAY",
            title: "Pay Now",
            description: "Secure online payment using a credit/debit card",
        },
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold">Select Payment Method</h2>
            <div className="mt-4 space-y-4">
                {methods.map(method => {
                    const isSelected = value === method.value;
                    return (
                        <button
                            key={method.value}
                            type="button"
                            onClick={() => onChange(method.value)}
                            className={`flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-all duration-200 ${
                                isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                            }`}
                        >
                            <div
                                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                                    isSelected ? "border-primary" : "border-muted-foreground"
                                }`}
                            >
                                {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                            </div>

                            <div>
                                <p className="font-semibold">{method.title}</p>
                                <p className="mt-1 text-sm text-muted-foreground">{method.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PaymentMethod;
