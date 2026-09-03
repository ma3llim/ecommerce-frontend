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
                <title>All Products | E-Commerce</title>
                <meta
                    name="description"
                    content="Browse all products at the best prices on E-Commerce. Shop quality products with fast delivery and secure checkout."
                />
                <meta name="robots" content="index, follow" />
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
