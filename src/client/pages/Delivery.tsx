import { Helmet } from "react-helmet-async";
import bannerImage from "@/assets/banners/delivery.webp";
import Banner from "../components/Banner";
import Container from "../components/Container";
import ShippingMethods from "../components/delivery/ShippingMethods";
import OrderProcessingTime from "../components/delivery/OrderProcessingTime";
import FAQsSection from "../components/delivery/FaqSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const Delivery = () => {
    return (
        <>
            <Helmet>
                <title>Legal Notice - Ecommerce</title>
                <meta
                    name="description"
                    content="Learn about Ecommerce's legal information, intellectual property, liability, privacy, and other important legal details."
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://ecommerce.mohdsameer.info/legal-notice" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Legal Notice - Ecommerce" />
                <meta
                    property="og:description"
                    content="View Ecommerce's legal information, including intellectual property, liability, privacy, and other important legal details."
                />
                <meta property="og:url" content="https://ecommerce.mohdsameer.info/legal-notice" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Legal Notice - Ecommerce" />
                <meta
                    name="twitter:description"
                    content="View Ecommerce's legal information, including intellectual property, liability, privacy, and other important legal details."
                />
            </Helmet>
            <Banner image={bannerImage} title={"Delivery Information"}>
                <Breadcrumb>
                    <BreadcrumbList className="text-lg">
                        <BreadcrumbItem>
                            <Link to="/" className="text-white/70 transition-colors hover:text-white dark:text-white/80 dark:hover:text-white">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">Delivery</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Banner>
            <Container>
                <ShippingMethods />
                <OrderProcessingTime />
                <FAQsSection />
            </Container>
        </>
    );
};

export default Delivery;
