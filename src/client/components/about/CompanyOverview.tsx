import companyOverviewImage from "@/assets/aboutus/company_overview.webp";

interface Statistic {
    label: string;
    value: string;
}

interface CompanyOverviewContent {
    title: string;
    description: string;
    statistics: Statistic[];
    image: string;
}

const content: CompanyOverviewContent = {
    title: "Who We Are",
    description: `Founded in 2024, our company has grown to become a leader in the industry, driven by our passion for innovation and customer satisfaction. Our mission is to deliver quality products that enrich the lives of our customers, while our vision is to expand our reach globally and continue setting benchmarks in service and product excellence.`,
    statistics: [
        { label: "Products Sold", value: "Over 10,000 products sold" },
        { label: "Global Presence", value: "Operating in 15 countries" },
        { label: "Customer Satisfaction", value: "98% customer satisfaction rate" },
    ],
    image: companyOverviewImage,
};

const CompanyOverview = () => {
    return (
        <section className="my-20 grid w-full grid-cols-1 items-center gap-8 px-4 py-8 md:grid-cols-2">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-light-textDarkGray dark:text-dark-textWhite">{content.title}</h2>

                <p className="text-lg leading-relaxed text-light-textGray dark:text-dark-textLightGray">{content.description}</p>

                <ul className="space-y-3">
                    {content.statistics.map(stat => (
                        <li key={stat.label} className="flex items-center space-x-2 text-light-textGray dark:text-dark-textWhite">
                            <span className="font-semibold">{stat.label}</span>
                            <span>{stat.value}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-center">
                <img src={content.image} loading="lazy" alt="Company Overview" className="h-auto w-full rounded-lg object-cover shadow-lg md:w-87.5" />
            </div>
        </section>
    );
};

export default CompanyOverview;
