import Banner from "@/client/components/Banner";
import bannerImage from "@/assets/banners/basket_banner.webp";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProductsListing from "@/client/components/products/ProductsListing";

const Products = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();

    const categoryName = categorySlug
        ? categorySlug
              .split("-")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
        : "Category";

    return (
        <>
            <Helmet>
                <title>{categorySlug ? `${categorySlug.replace("-", " ")} Products - E-Commerce` : "Products - E-Commerce"}</title>
                <meta
                    name="description"
                    content={
                        categorySlug
                            ? `Buy top-quality ${categorySlug.replace("-", " ")} products at the best prices on E-Commerce. Fast delivery and secure shopping.`
                            : "Browse top-quality products at the best prices on E-Commerce."
                    }
                />
                <meta name="keywords" content={`${categorySlug}, buy ${categorySlug} online, best ${categorySlug} products, E-Commerce`} />
                <meta property="og:title" content={`${categorySlug?.replace("-", " ")} Products - E-Commerce`} />
                <meta property="og:description" content={`Discover the latest ${categorySlug?.replace("-", " ")} collection on E-Commerce. Shop now!`} />
                <meta property="og:url" content={`https://E-Commerce.com/${categorySlug}/${categorySlug}/products`} />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <Banner title={categoryName} image={bannerImage}>
                <Breadcrumb>
                    <BreadcrumbList className="text-lg">
                        <BreadcrumbItem>
                            <Link to="/" className="text-white/70 transition-colors hover:text-white">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link to="/products" className="text-white/70 transition-colors hover:text-white">
                                Products
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-medium text-white">{categoryName}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Banner>

            <ProductsListing categorySlug={categorySlug} />
        </>
    );
};

export default Products;
