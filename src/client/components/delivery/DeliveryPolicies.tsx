import Faq from "../Faq";

interface DeliveryPolicyItem {
    id: string;
    title: string;
    description: string;
}

const deliveryPoliciesItems: DeliveryPolicyItem[] = [
    {
        id: "1",
        title: "Undelivered Packages",
        description:
            "If your package was not delivered, please contact our support team to investigate and resolve the issue promptly. Undelivered packages may be due to incorrect addresses, failed delivery attempts, or carrier issues.",
    },
    {
        id: "2",
        title: "Address Changes",
        description:
            "Once an order has been placed, changes to the delivery address can only be made within the first 24 hours. After this period, we cannot guarantee that address changes will be possible.",
    },
    {
        id: "3",
        title: "Failed Delivery Attempts",
        description:
            "Our delivery partners will make up to 3 attempts to deliver your package. If all attempts fail, the package will be returned to our warehouse, and additional fees may apply for re-delivery.",
    },
];

const DeliveryPolicies = () => {
    return (
        <section className="my-20 w-full">
            <div className="w-full text-center">
                <h2 className="mb-4 text-3xl font-bold underline decoration-2">Delivery Policies</h2>
            </div>

            <div className="w-full">
                <Faq lists={deliveryPoliciesItems} />
            </div>
        </section>
    );
};

export default DeliveryPolicies;
