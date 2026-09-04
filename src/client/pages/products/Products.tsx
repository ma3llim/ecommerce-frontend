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
                <title>{categorySlug ? `${categorySlug.replace(/-/g, " ")} Products - Ecommerce` : "All Products - Ecommerce"}</title>
                <meta
                    name="description"
                    content={
                        categorySlug
                            ? `Shop ${categorySlug.replace(/-/g, " ")} products at Ecommerce. Discover quality products, great prices, secure shopping, and reliable delivery.`
                            : "Browse and shop quality products at Ecommerce. Discover great prices, secure shopping, and reliable delivery."
                    }
                />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={categorySlug ? `https://ecommerce.mohdsameer.info/category/${categorySlug}` : "https://ecommerce.mohdsameer.info/products"}
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={categorySlug ? `${categorySlug.replace(/-/g, " ")} Products - Ecommerce` : "All Products - Ecommerce"} />
                <meta
                    property="og:description"
                    content={
                        categorySlug
                            ? `Discover ${categorySlug.replace(/-/g, " ")} products on Ecommerce. Shop quality products at great prices.`
                            : "Browse quality products on Ecommerce and discover great prices across our collection."
                    }
                />
                <meta
                    property="og:url"
                    content={categorySlug ? `https://ecommerce.mohdsameer.info/category/${categorySlug}` : "https://ecommerce.mohdsameer.info/products"}
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={categorySlug ? `${categorySlug.replace(/-/g, " ")} Products - Ecommerce` : "All Products - Ecommerce"} />
                <meta
                    name="twitter:description"
                    content={
                        categorySlug
                            ? `Discover ${categorySlug.replace(/-/g, " ")} products on Ecommerce. Shop quality products at great prices.`
                            : "Browse quality products on Ecommerce and discover great prices across our collection."
                    }
                />
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
