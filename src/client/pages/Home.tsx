import { lazy, Suspense, useMemo } from "react";
import PageLoader from "@/components/common/PageLoader";
import slider1 from "@/assets/sliders/slider1.webp";
import slider2 from "@/assets/sliders/slider2.webp";
import slider3 from "@/assets/sliders/slider3.webp";
import slider4 from "@/assets/sliders/slider4.webp";
import { Helmet } from "react-helmet-async";
import type { SliderItem } from "../components/home/Slider";
import Categories from "../components/home/Categories";
import Container from "../components/Container";

const Slider = lazy(() => import("@/client/components/home/Slider"));
const TagProductSlider = lazy(() => import("@/client/components/home/TagProductSlider"));

const Home = () => {
    const sliderData = useMemo<SliderItem[]>(
        () => [
            {
                id: 1,
                imageUrl: slider1,
                short_title: "Wireless Gaming",
                title: "Level Up Your Game",
                achor_link: "/category",
                achor_title: "Shop Now",
            },
            {
                id: 2,
                imageUrl: slider2,
                short_title: "Latest Technology",
                title: "Smart. Fast. Powerful.",
                achor_link: "/category",
                achor_title: "Explore Now",
            },
            {
                id: 3,
                imageUrl: slider3,
                short_title: "Premium Audio",
                title: "Sound That Moves You",
                achor_link: "/category",
                achor_title: "Shop Audio",
            },
            {
                id: 4,
                imageUrl: slider4,
                short_title: "Everyday Essentials",
                title: "Everything You Need",
                achor_link: "/category",
                achor_title: "Discover More",
            },
        ],
        []
    );

    return (
        <>
            <Helmet>
                <title>Ecommerce - Best Online Shopping Platform</title>
                <meta name="description" content="Shop the best products at Ecommerce. Get exclusive deals on electronics, fashion, and more!" />
                <meta name="keywords" content="Ecommerce, online shopping, ecommerce, best deals, fashion, electronics" />
                <meta property="og:title" content="Ecommerce - Best Online Shopping Platform" />
                <meta property="og:description" content="Find amazing deals on top-quality products at Ecommerce." />
                // Todo replace domain link
                {/* <meta property="og:image" content="https://E-Commerce.com/src/client/assets/Logo.svg" />
                <meta property="og:url" content="https://E-Commerce.com/" /> */}
                <meta name="robots" content="index, follow" />
            </Helmet>
            <Suspense fallback={<PageLoader />}>
                <Slider sliderData={sliderData} />
            </Suspense>
            <Container>
                <Suspense fallback={<PageLoader />}>
                    <Categories />
                </Suspense>
                <Suspense fallback={<PageLoader />}>
                    <TagProductSlider tagSlug="best-seller" title="Best Seller" />
                </Suspense>
                <Suspense fallback={<PageLoader />}>
                    <TagProductSlider tagSlug="new-arrival" title="New Arrival" />
                </Suspense>
                <Suspense fallback={<PageLoader />}>
                    <TagProductSlider tagSlug="trending" title="Trending" />
                </Suspense>
                <Suspense fallback={<PageLoader />}>
                    <TagProductSlider tagSlug="featured" title="Featured" />
                </Suspense>
                <Suspense fallback={<PageLoader />}>
                    <TagProductSlider tagSlug="sale" title="Sale" />
                </Suspense>
            </Container>
        </>
    );
};

export default Home;
