import { FaHandshake, FaHandsHelping, FaLightbulb, FaStar } from "react-icons/fa";
import type { IconType } from "react-icons";

interface ValueItem {
    id: number;
    icon: IconType;
    title: string;
    description: string;
}

const valuesData: ValueItem[] = [
    {
        id: 1,
        icon: FaHandshake,
        title: "Integrity",
        description: "We believe in honest and transparent communication.",
    },
    {
        id: 2,
        icon: FaLightbulb,
        title: "Innovation",
        description: "We foster creativity and innovation in everything we do.",
    },
    {
        id: 3,
        icon: FaHandsHelping,
        title: "Partnership",
        description: "We value collaboration and long-term partnerships.",
    },
    {
        id: 4,
        icon: FaStar,
        title: "Excellence",
        description: "We strive for excellence in every aspect of our work.",
    },
];

const OurValues = () => {
    return (
        <section className="my-20 w-full">
            <div className="w-full text-center">
                <h2 className="text-3xl font-bold underline decoration-2">Our Values</h2>
            </div>

            <div className="grid grid-cols-1 place-content-center items-center gap-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
                {valuesData.map(value => {
                    const Icon = value.icon;
                    return (
                        <div
                            key={value.id}
                            className="group flex cursor-default flex-col items-center justify-center space-y-3 rounded-lg p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-card"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-colors duration-300 ease-in-out">
                                <Icon className="text-3xl" />
                            </div>

                            <h3 className="text-lg font-semibold">{value.title}</h3>

                            <p className="text-center text-sm text-light-textDarkGray dark:text-dark-textWhite">{value.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default OurValues;
