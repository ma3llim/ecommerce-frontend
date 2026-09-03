import { FaCcMastercard, FaCcVisa, FaCreditCard, FaGooglePay, FaPaypal } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import securePaymentBanner from "@/assets/banners/secure_payment.webp";
import Banner from "../components/Banner";
import Faq, { type FaqItem } from "../components/Faq";
import Container from "../components/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const faqs: FaqItem[] = [
    {
        id: "1",
        question: "Is my payment information safe?",
        answer: "Yes, your payment information is encrypted and processed securely. We do not store credit card details.",
    },
    {
        id: "2",
        question: "What payment methods do you accept?",
        answer: "We accept Visa, MasterCard, American Express, PayPal, and several other payment methods.",
    },
    {
        id: "3",
        question: "What if my payment is declined?",
        answer: "Please double-check your card information or contact your bank. You may also try another payment option.",
    },
];

const SecurePayment = () => {
    return (
        <>
            <Helmet>
                <title>Secure Payment Methods - ecommerce</title>
                <meta
                    name="description"
                    content="Shop safely with ecommerce! We offer secure payment options, including credit cards, PayPal, and more. Your transactions are protected."
                />
                <meta name="keywords" content="secure payment, online payment, safe transactions, credit card, PayPal, ecommerce payments" />
                <meta property="og:title" content="Secure Payment Methods - ecommerce" />
                <meta
                    property="og:description"
                    content="Enjoy secure and reliable payments with ecommerce. We support multiple payment methods to ensure a smooth shopping experience."
                />
                <meta property="og:url" content="https://ecommerce.com/secure-payment" />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <Banner image={securePaymentBanner} title="Secure Payment">
                <Breadcrumb>
                    <BreadcrumbList className="text-lg">
                        <BreadcrumbItem>
                            <Link to="/" className="text-white/70 transition-colors hover:text-white dark:text-white/80 dark:hover:text-white">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">Secure Payment</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Banner>

            <Container>
                <section className="mb-5 mt-10 w-full px-4 py-4">
                    <h1 className="text-3xl font-bold text-light-blue dark:text-dark-light">Secure Payment</h1>

                    <p className="text-lg">
                        At <span className="font-bold">ecommerce</span>, we take your security seriously. Our secure payment systems and industry-leading
                        encryption ensure that your personal information stays safe throughout the transaction process.
                    </p>
                </section>

                <section className="my-5 w-full px-4 py-2">
                    <h1 className="mb-2 text-3xl font-bold text-light-blue dark:text-dark-light">How We Protect Your Data</h1>
                    <ul className="space-y-4 overflow-hidden">
                        <li className="flex items-center gap-2 text-base">
                            <p>
                                <strong className="mr-2">SSL Encryption:</strong>
                                We use Secure Socket Layer (SSL) technology to encrypt your sensitive information, including payment details, ensuring they
                                cannot be intercepted during transmission.
                            </p>
                        </li>

                        <li className="flex items-center gap-2 text-base">
                            <p>
                                <strong className="mr-2">PCI-DSS Compliance:</strong>
                                We comply with industry standards for the protection of your data. Your credit card information is never stored on our servers.
                            </p>
                        </li>

                        <li className="flex items-center gap-2 text-base">
                            <p>
                                <strong className="mr-2">Trusted Payment Gateways:</strong>
                                We work with top-tier payment processors like PayPal and Stripe to guarantee secure transactions.
                            </p>
                        </li>

                        <li className="flex items-center gap-2 text-base">
                            <p>
                                <strong className="mr-2">Fraud Detection:</strong>
                                Our systems automatically monitor and flag suspicious activities, preventing fraud and unauthorized transactions.
                            </p>
                        </li>
                    </ul>
                </section>

                <section className="my-5 w-full px-4 py-2">
                    <h2 className="mb-2 text-3xl font-bold text-light-blue dark:text-dark-light">Accepted Payment Methods</h2>

                    <p className="mb-3 text-base">We offer a wide range of secure payment options:</p>

                    <div className="my-4 flex w-2/4 flex-wrap gap-5 text-3xl">
                        <FaCreditCard aria-label="Credit Card" />
                        <FaCcVisa aria-label="CC Visa" />
                        <FaCcMastercard aria-label="CC MasterCard" />
                        <FaPaypal aria-label="PayPal" />
                        <FaGooglePay aria-label="Google Pay" />
                    </div>
                </section>

                <section className="my-20 w-full">
                    <div className="w-full text-center">
                        <h2 className="mb-4 text-3xl font-bold underline decoration-2">Frequently Asked Questions</h2>
                    </div>

                    <div className="w-full">
                        <Faq lists={faqs} />
                    </div>
                </section>
            </Container>
        </>
    );
};

export default SecurePayment;
