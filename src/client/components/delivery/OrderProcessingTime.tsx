import { FaBox, FaCheck, FaCogs, FaTruck } from "react-icons/fa";
import type { IconType } from "react-icons";
import { Fragment } from "react";

interface OrderProcessCard {
    icon: IconType;
    title: string;
    description: string;
}

const OrderProcessCardList: OrderProcessCard[] = [
    {
        icon: FaCheck,
        title: "Order Received",
        description: "Your order has been successfully placed and received by our system.",
    },
    {
        icon: FaCogs,
        title: "Processing",
        description: "Your order is being prepared and packed for shipment.",
    },
    {
        icon: FaTruck,
        title: "Dispatched",
        description: "Your order has been dispatched and is on its way to you.",
    },
    {
        icon: FaBox,
        title: "Delivered",
        description: "Your order has been delivered to the specified address.",
    },
];

const OrderProcessingTime = () => {
    return (
        <section className="my-20 w-full">
            <div className="w-full text-center">
                <h2 className="text-3xl font-bold underline decoration-2">Our Order Processing Stages</h2>
            </div>

            <div className="flex flex-col flex-wrap items-center justify-center lg:flex-row">
                {OrderProcessCardList.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <Fragment key={card.title}>
                            <div className="relative mx-4 max-w-62.5 items-center p-5 text-center xl:max-w-75 2xl:max-w-70">
                                <Icon className="mb-4 inline-flex text-5xl text-light-blue dark:text-dark-light" />

                                <h2 className="mb-3 text-xl font-bold">{card.title}</h2>

                                <p className="text-base leading-6">{card.description}</p>
                            </div>

                            {index < OrderProcessCardList.length - 1 && <div className="my-4 h-12 w-1 shrink-0 bg-primary lg:h-1 lg:w-12" />}
                        </Fragment>
                    );
                })}
            </div>
        </section>
    );
};

export default OrderProcessingTime;
