import Banner from "@/client/components/Banner";
import bannerImage from "@/assets/banners/basket_banner.webp";
import { Helmet } from "react-helmet-async";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import ProductsListing from "@/client/components/products/ProductsListing";

const AllProducts = () => {
    return (
        <>
            <Helmet>
                <title>All Products - Ecommerce</title>
                <meta
                    name="description"
                    content="Browse all products on Ecommerce and discover quality products at great prices with secure checkout and reliable delivery."
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://ecommerce.mohdsameer.info/products" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="All Products - Ecommerce" />
                <meta
                    property="og:description"
                    content="Browse all products on Ecommerce and discover quality products at great prices with secure checkout and reliable delivery."
                />
                <meta property="og:url" content="https://ecommerce.mohdsameer.info/products" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="All Products - Ecommerce" />
                <meta
                    name="twitter:description"
                    content="Browse all products on Ecommerce and discover quality products at great prices with secure checkout and reliable delivery."
                />
            </Helmet>

            <Banner title="All Products" image={bannerImage}>
                <Breadcrumb>
                    <BreadcrumbList className="text-lg">
                        <BreadcrumbItem>
                            <Link to="/" className="text-white/70 transition-colors hover:text-white">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">All Products</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Banner>

            <ProductsListing />
        </>
    );
};

export default AllProducts;
