import { ProductApi } from "@/client/api/Product.api";
import Banner from "@/client/components/Banner";
import Container from "@/client/components/Container";
import PageLoader from "@/components/common/PageLoader";
import bannerImage from "@/assets/banners/basket_banner.webp";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import ProductCard from "@/client/components/products/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import SectionHeader from "@/client/components/SectionHeader";
import { Helmet } from "react-helmet-async";

const Products = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const [pagination, SetPagination] = useState<PaginationRequest>({ page: 0, size: 12 });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", categorySlug, pagination],
        queryFn: () => ProductApi.getProducts({ category: categorySlug || undefined, pagination }),
    });

    const productPage = data?.data;
    const products = productPage?.content ?? [];

    if (isError) {
        return (
            <Container>
                <section className="flex min-h-96 flex-col items-center justify-center text-center">
                    <h1 className="text-2xl font-bold">Unable to load products</h1>
                    <p className="mt-2 text-muted-foreground">Something went wrong while loading products.</p>
                    <Button className="mt-5" onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                </section>
            </Container>
        );
    }

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
            <Banner title="Products" image={bannerImage} />
            <Container>
                <section className="w-full py-8 md:py-10">
                    <SectionHeader title="Products" />

                    {isLoading ? (
                        <PageLoader />
                    ) : products.length === 0 ? (
                        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed text-center">
                            <h2 className="text-xl font-semibold">No products found</h2>
                            <p className="mt-2 text-muted-foreground">There are no products available right now.</p>
                            <Link to="/products" className="mt-5">
                                <Button>View All Products</Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {products.map(product => (
                                    <ProductCard key={product.productId} product={product} />
                                ))}
                            </div>

                            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
                                <p className="text-sm text-muted-foreground">
                                    Page <span className="font-medium text-foreground">{(productPage?.page ?? 0) + 1}</span> of{" "}
                                    <span className="font-medium text-foreground">{productPage?.totalPages}</span>
                                </p>

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={productPage?.first ?? true}
                                        onClick={() =>
                                            SetPagination(prev => ({
                                                ...prev,
                                                page: Math.max(0, prev.page - 1),
                                            }))
                                        }
                                    >
                                        <ChevronLeft className="mr-1 h-4 w-4" />
                                        Previous
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={productPage?.last ?? true}
                                        onClick={() =>
                                            SetPagination(prev => ({
                                                ...prev,
                                                page: prev.page + 1,
                                            }))
                                        }
                                    >
                                        Next
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </Container>
        </>
    );
};

export default Products;
