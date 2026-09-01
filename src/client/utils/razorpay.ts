import type { PaymentMethod } from "../types/Order.types";

let razorpayPromise: Promise<void> | null = null;

export const loadRazorpay = (): Promise<void> => {
    if (window.Razorpay) {
        return Promise.resolve();
    }

    if (razorpayPromise) {
        return razorpayPromise;
    }

    razorpayPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        script.onload = () => resolve();
        script.onerror = () => {
            razorpayPromise = null;
            reject(new Error("Failed to load Razorpay Checkout."));
        };

        document.body.appendChild(script);
    });

    return razorpayPromise;
};

export interface RazorpayPaymentData {
    paymentId: string;
    razorpayOrderId: string;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    paymentStatus: string;
}

export interface OpenRazorpayCheckoutOptions {
    payment: RazorpayPaymentData;
    name?: string;
    email?: string;
    phoneNumber?: string;
    onSuccess: (response: RazorpayPaymentResponse) => void;
    onDismiss?: () => void;
}

export const openRazorpayCheckout = async ({ payment, name, email, phoneNumber, onSuccess }: OpenRazorpayCheckoutOptions) => {
    await loadRazorpay();

    const razorpay = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round(payment.amount * 100),
        currency: payment.currency,
        name: "SameerCart",
        description: "SameerCart Order",
        order_id: payment.razorpayOrderId,
        prefill: {
            name,
            email,
            contact: phoneNumber,
        },
        theme: {
            color: "#7c3aed",
        },
        handler: response => {
            onSuccess(response);
        },
    });

    razorpay.open();
};
