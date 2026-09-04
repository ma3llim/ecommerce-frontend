import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import aboutBanner from "@/assets/banners/about_us.webp";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Container from "../components/Container";
import CompanyOverview from "../components/about/CompanyOverview";
import OurStory from "../components/about/OurStory";
import OurValues from "../components/about/OurValues";
import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <>
            <Helmet>
                <title>About Us - Ecommerce</title>
                <meta
                    name="description"
                    content="Learn about Ecommerce, our mission, and our commitment to providing quality products and a reliable online shopping experience."
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://ecommerce.mohdsameer.info/about-us" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="About Us - Ecommerce" />
                <meta
                    property="og:description"
                    content="Learn about Ecommerce, our mission, and our commitment to providing quality products and a reliable online shopping experience."
                />
                <meta property="og:url" content="https://ecommerce.mohdsameer.info/about-us" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Us - Ecommerce" />
                <meta
                    name="twitter:description"
                    content="Learn about Ecommerce, our mission, and our commitment to providing quality products and a reliable online shopping experience."
                />
            </Helmet>
            <Banner image={aboutBanner} title={"About Us"}>
                <Breadcrumb>
                    <BreadcrumbList className="text-lg">
                        <BreadcrumbItem>
                            <Link to="/" className="text-white/70 transition-colors hover:text-white dark:text-white/80 dark:hover:text-white">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">About Us</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Banner>
            <Container>
                <CompanyOverview />
                <OurStory />
                <OurValues />
            </Container>
        </>
    );
};

export default AboutUs;
