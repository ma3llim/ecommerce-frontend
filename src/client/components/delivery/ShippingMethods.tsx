import { FaClock, FaGlobe, FaShippingFast, FaTruck } from "react-icons/fa";
import type { IconType } from "react-icons";

interface ShippingCard {
    title: string;
    description: string;
    cost: string;
    icon: IconType;
}

const shippingCard: ShippingCard[] = [
    {
        title: "Standard Shipping",
        description: "Delivery in 5-7 business days",
        cost: "Free",
        icon: FaTruck,
    },
    {
        title: "Express Shipping",
        description: "Delivery in 2-3 business days",
        cost: "$10.00",
        icon: FaShippingFast,
    },
    {
        title: "Same-Day Delivery",
        description: "Delivery in a few hours",
        cost: "$20.00",
        icon: FaClock,
    },
    {
        title: "International Shipping",
        description: "Delivery in 7-14 business days",
        cost: "$30.00",
        icon: FaGlobe,
    },
];

const ShippingMethods = () => {
    return (
        <section className="my-20 w-full">
            <div className="w-full text-center">
                <h2 className="text-3xl font-bold underline decoration-2">Available Shipping Methods</h2>
            </div>

            <div className="grid grid-cols-1 place-content-center items-center gap-4 py-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {shippingCard.map(card => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="group bg-card flex flex-col items-center justify-center space-y-3 rounded-lg p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-default hover:shadow-2xl"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-colors duration-300 ease-in-out">
                                <Icon className="text-3xl" />
                            </div>

                            <h3 className="text-lg font-semibold">{card.title}</h3>
                            <p className="text-center text-sm text-light-textDarkGray dark:text-dark-textWhite">{card.description}</p>
                            <p className="text-base">
                                <strong>Cost:</strong> {card.cost}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ShippingMethods;
