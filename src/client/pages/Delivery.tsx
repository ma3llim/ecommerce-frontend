import { Helmet } from "react-helmet-async";
import bannerImage from "@/assets/banners/delivery.webp";
import Banner from "../components/Banner";
import Container from "../components/Container";
import ShippingMethods from "../components/delivery/ShippingMethods";
import OrderProcessingTime from "../components/delivery/OrderProcessingTime";
import FAQsSection from "../components/delivery/FaqSection";

const Delivery = () => {
    return (
        <>
            <Helmet>
                <title>Fast & Reliable Delivery - ecommerce</title>
                <meta
                    name="description"
                    content="Get your orders delivered quickly and safely with ecommerce. Learn about our shipping options, delivery times, and policies."
                />
                <meta name="keywords" content="delivery, shipping, ecommerce delivery, fast shipping, ecommerce delivery, order tracking" />
                <meta property="og:title" content="Fast & Reliable Delivery - ecommerce" />
                <meta
                    property="og:description"
                    content="ecommerce ensures quick and secure delivery for all your orders. Check our shipping details and policies."
                />
                <meta property="og:url" content="https://ecommerce.com/delivery" />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <Banner image={bannerImage} title={"Delivery Information"} />
            <Container>
                <ShippingMethods />
                <OrderProcessingTime />
                <FAQsSection />
            </Container>
        </>
    );
};

export default Delivery;
