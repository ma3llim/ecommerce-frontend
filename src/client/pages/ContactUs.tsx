import contactBanner from "@/assets/banners/contact_us.webp";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Container from "../components/Container";
import { Helmet } from "react-helmet-async";
import GetInTouch from "../components/contact/GetInTouch";

const ContactUs = () => {
    return (
        <>
            <Helmet>
                <title>Contact Us - Ecommerce</title>
                <meta
                    name="description"
                    content="Contact Ecommerce for customer support, product inquiries, order assistance, and other questions about our online shopping services."
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://ecommerce.mohdsameer.info/contact-us" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Contact Us - Ecommerce" />
                <meta
                    property="og:description"
                    content="Contact Ecommerce for customer support, product inquiries, order assistance, and other questions about our online shopping services."
                />
                <meta property="og:url" content="https://ecommerce.mohdsameer.info/contact-us" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us - Ecommerce" />
                <meta
                    name="twitter:description"
                    content="Contact Ecommerce for customer support, product inquiries, order assistance, and other questions about our online shopping services."
                />
            </Helmet>
            <Banner image={contactBanner} title="Contact Us">
                <Breadcrumb>
                    <BreadcrumbList className="text-lg">
                        <BreadcrumbItem>
                            <Link to="/" className="text-white/70 transition-colors hover:text-white dark:text-white/80 dark:hover:text-white">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">Contact Us</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Banner>
            <Container>
                <GetInTouch />
                <section className="my-5 w-full">
                    <iframe
                        className="h-96 w-full border-none"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.90509334358!2d78.24322983008491!3d17.412608644350257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1728716312679!5m2!1sen!2sin"
                        title="E-Commerce Location"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </section>
            </Container>
        </>
    );
};

export default ContactUs;
