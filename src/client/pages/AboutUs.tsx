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
                <title>About Us - ecommerce</title>
                <meta name="description" content="Learn about ecommerce, our mission, and our commitment to providing quality products online." />
                <meta name="keywords" content="ecommerce, about us, ecommerce story, best shopping platform" />
                <meta property="og:title" content="About Us - ecommerce" />
                <meta property="og:description" content="ecommerce is dedicated to bringing you the best shopping experience." />
                <meta property="og:url" content="https://ecommerce.com/about-us" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <Banner image={aboutBanner} title={"About Us"}>
                <Breadcrumb>
                    <BreadcrumbList className="text-lg">
                        <BreadcrumbItem>
                            <Link to="/">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>About Us</BreadcrumbPage>
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
