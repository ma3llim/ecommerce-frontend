import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import bannerImage from "@/assets/banners/basket_banner.webp";
import { Helmet } from "react-helmet-async";
import type { ProductVariant } from "@/client/types/Product.types";
import ToastService from "@/services/ToastService";
import { ProductApi } from "@/client/api/Product.api";
import ProductGallery from "@/client/components/products/ProductGallery";
import ProductInfo from "@/client/components/products/ProductInfo";
import ProductSpecifications from "@/client/components/products/ProductSpecifications";
import Container from "@/client/components/Container";
import Banner from "@/client/components/Banner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import PageLoader from "@/components/common/PageLoader";
import { CartApi } from "@/client/api/Cart.api";
import ProductReviews from "@/client/components/products/ProductReviews";
import Faq, { type FaqItem } from "@/client/components/Faq";

const ProductDetails = () => {
    const { productSlug } = useParams<{ productSlug: string }>();
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", productSlug],
        queryFn: () => ProductApi.getProductBySlug(productSlug!),
        enabled: !!productSlug,
    });

    const { mutate: addToCart, isPending } = useMutation({
        mutationFn: () => {
            if (!selectedVariant) {
                throw new Error("Product variant is unavailable.");
            }
            return CartApi.addItem({ productVariantId: selectedVariant.productVariantId, quantity });
        },
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
            ToastService.success(response.message || "Product added to cart.");
        },
        onError: error => {
            ToastService.error(error instanceof Error ? error.message : "Login to add product in cart.");
        },
    });

    const product = data?.data;

    const variants = product?.variants ?? [];

    const selectedVariant = variants.find(variant => variant.productVariantId === (selectedVariantId ?? product?.defaultVariantId)) ?? variants[0];

    const handleSelectVariant = (variant: ProductVariant) => {
        setSelectedVariantId(variant.productVariantId);
        setQuantity(1);
    };

    const handleAddToCart = () => {
        addToCart();
    };

    const faqs: FaqItem[] =
        product?.faqs.map(faq => ({
            id: faq.productFaqId,
            title: faq.question,
            answer: faq.answer,
        })) ?? [];

    return (
        <>
            <Helmet>
                <title>{`${product?.name} - E-Commerce`}</title>
                <meta
                    name="description"
                    content={`${product?.description} Shop ${product?.name} at the best price on E-Commerce with secure shopping and fast delivery.`}
                />
                <meta name="keywords" content={`${product?.name}, ${product?.slug}, buy ${product?.name} online, ${product?.name} price, E-Commerce`} />
                <meta property="og:title" content={`${product?.name} - E-Commerce`} />
                <meta property="og:description" content={`${product?.description} Shop now on E-Commerce.`} />
                <meta property="og:url" content={`https://E-Commerce.com/product-details/${product?.slug}`} />
                <meta property="og:type" content="product" />
                {selectedVariant?.images?.[0]?.url && <meta property="og:image" content={selectedVariant?.images[0].url} />}
                <meta name="robots" content="index, follow" />
            </Helmet>
            <Banner title="Products" image={bannerImage}>
                <Breadcrumb>
                    <BreadcrumbList className="text-lg">
                        <BreadcrumbItem>
                            <Link to="/" className="text-white/70 transition-colors hover:text-white dark:text-white/80 dark:hover:text-white">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link to="/products" className="text-white/70 transition-colors hover:text-white dark:text-white/80 dark:hover:text-white">
                                Products
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">{product?.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Banner>
            <Container>
                {isLoading ? (
                    <PageLoader />
                ) : isError || !product ? (
                    <div className="flex min-h-96 flex-col items-center justify-center text-center">
                        <h1 className="text-2xl font-bold">Product not found</h1>
                        <p className="mt-2 text-muted-foreground">The product you're looking for is unavailable.</p>
                        <Link to="/products" className="mt-5 text-primary hover:underline">
                            Back to Products
                        </Link>
                    </div>
                ) : !selectedVariant ? (
                    <div className="flex min-h-96 items-center justify-center">
                        <p className="text-muted-foreground">No active product variant available.</p>
                    </div>
                ) : (
                    <section className="w-full py-8 md:py-10">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                            <ProductGallery images={selectedVariant.images} productName={product.name} />
                            <ProductInfo
                                product={product}
                                selectedVariant={selectedVariant}
                                quantity={quantity}
                                isPending={isPending}
                                onSelectVariant={handleSelectVariant}
                                onQuantityChange={setQuantity}
                                onAddToCart={handleAddToCart}
                            />
                        </div>

                        <div className="mt-12">
                            <ProductSpecifications specifications={product.specifications} />

                            <Faq lists={faqs} />
                        </div>
                        <ProductReviews productSlug={product.slug} />
                    </section>
                )}
            </Container>
        </>
    );
};

export default ProductDetails;
