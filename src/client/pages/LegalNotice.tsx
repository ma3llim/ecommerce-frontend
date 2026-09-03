import legalNoticeBanner from "@/assets/banners/legal_notice.webp";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Container from "../components/Container";
import { Helmet } from "react-helmet-async";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const LegalNotice = () => {
    return (
        <>
            <Helmet>
                <title>Legal Notice - ecommerce</title>
                <meta
                    name="description"
                    content="Learn about ecommerce's legal information, intellectual property, liability, privacy policy, and contact details."
                />
                <meta name="keywords" content="ecommerce legal notice, company information, intellectual property, liability, privacy policy" />
                <meta property="og:title" content="Legal Notice - ecommerce" />
                <meta
                    property="og:description"
                    content="View ecommerce's legal notice, company information, intellectual property, liability, and privacy information."
                />
                <meta property="og:url" content="https://ecommerce.com/legal-notice" />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <Banner image={legalNoticeBanner} title="Legal Notice">
                <Breadcrumb>
                    <BreadcrumbList className="text-lg">
                        <BreadcrumbItem>
                            <Link to="/" className="text-white/70 transition-colors hover:text-white dark:text-white/80 dark:hover:text-white">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">Legal Notice</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Banner>
            <Container>
                <section className="my-10 w-full p-4">
                    <div className="mb-5 w-full">
                        <h1 className="text-3xl font-bold text-light-deep underline decoration-2 underline-offset-2">Company Information</h1>
                    </div>

                    <ul className="space-y-2 text-base">
                        <li>
                            <strong className="text-[17px]">Company Name: </strong>
                            ecommerce
                        </li>

                        <li>
                            <strong className="text-[17px]">Address: </strong>
                            Hyderabad
                        </li>

                        <li>
                            <strong className="text-[17px]">Email: </strong>
                            sameer.d3v@gmail.com
                        </li>

                        <li>
                            <strong className="text-[17px]">Phone: </strong>
                            +91 13245 67890
                        </li>

                        <li>
                            <strong className="text-[17px]">VAT Number: </strong>
                            IN123456789
                        </li>

                        <li>
                            <strong className="text-[17px]">Company Registration: </strong>-
                        </li>
                    </ul>
                </section>

                <section className="my-10 w-full p-4">
                    <div className="mb-5 w-full">
                        <h1 className="text-3xl font-bold text-light-deep underline decoration-2 underline-offset-2">Intellectual Property</h1>

                        <p>
                            All content, design, and intellectual property on this website are the exclusive property of ecommerce. Any unauthorized
                            reproduction or use is prohibited. Trademarks, logos, and other proprietary content are the property of their respective owners.
                        </p>
                    </div>
                </section>

                <section className="my-10 w-full p-4">
                    <div className="mb-5 w-full">
                        <h1 className="text-3xl font-bold text-light-deep underline decoration-2 underline-offset-2">Liability</h1>

                        <p>
                            ecommerce is not responsible for any damages, direct or indirect, arising from the use of this website, including any inaccuracies
                            or errors in the content. The website may contain links to external websites, for which ecommerce holds no responsibility.
                        </p>
                    </div>
                </section>

                <section className="my-10 w-full p-4">
                    <div className="mb-5 w-full">
                        <h1 className="text-3xl font-bold text-light-deep underline decoration-2 underline-offset-2">Privacy Policy</h1>

                        <p>
                            Please refer to our{" "}
                            <Link className="text-light-link dark:text-dark-link" to="/privacy-policy">
                                Privacy Policy
                            </Link>{" "}
                            for detailed information about how we handle your data and ensure compliance with applicable data protection laws.
                        </p>
                    </div>
                </section>

                <section className="my-10 w-full p-4">
                    <div className="mb-5 w-full">
                        <h1 className="text-3xl font-bold text-light-deep underline decoration-2 underline-offset-2">Contact</h1>

                        <p>
                            If you have any questions or concerns regarding this legal notice, please feel free to contact us at{" "}
                            <a className="text-light-link dark:text-dark-link" href="mailto:sameer.d3v@gmail.com">
                                sameer.d3v@gmail.com
                            </a>
                        </p>
                    </div>
                </section>
            </Container>
        </>
    );
};

export default LegalNotice;
