import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/client/api/Product.api";
import SectionHeader from "../SectionHeader";
import "swiper/css";
import "swiper/css/navigation";
import ProductsSkeleton from "@/client/pages/products/ProductsSkeleton";
import ProductCard from "../products/ProductCard";

interface TagProductsProps {
    tagSlug: string;
    title: string;
}

const TagProductSlider = ({ tagSlug, title }: TagProductsProps) => {
    const swiperRef = useRef<SwiperType | null>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products-by-tag", tagSlug],
        queryFn: () =>
            ProductApi.getProductsByTag({
                tagSlug,
                pagination: {
                    page: 0,
                    size: 10,
                },
            }),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const products = data?.data?.content ?? [];

    if (isError || (!isLoading && products.length === 0)) {
        return null;
    }

    return (
        <section className="relative my-10 flex w-full flex-col">
            <SectionHeader title={title} />
            {isLoading ? (
                <ProductsSkeleton />
            ) : (
                <>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        slidesPerView={1}
                        navigation={false}
                        loop={products.length > 1}
                        autoplay={{
                            delay: 8000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1280: {
                                slidesPerView: 4,
                            },
                        }}
                        onBeforeInit={swiper => {
                            swiperRef.current = swiper;
                        }}
                        className="w-full"
                    >
                        {products.map(product => (
                            <SwiperSlide key={product.productId} className="p-2">
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {products.length > 1 && (
                        <>
                            <button
                                type="button"
                                className="absolute left-4 top-1/2 z-20 mx-5 hidden -translate-y-1/2 rounded-full bg-background p-2 text-foreground shadow group-hover:block"
                                onClick={() => swiperRef.current?.slidePrev()}
                                aria-label={`Previous ${title}`}
                            >
                                <FaArrowAltCircleLeft />
                            </button>

                            <button
                                type="button"
                                className="absolute right-4 top-1/2 z-20 mx-5 hidden -translate-y-1/2 rounded-full bg-background p-2 text-foreground shadow group-hover:block"
                                onClick={() => swiperRef.current?.slideNext()}
                                aria-label={`Next ${title}`}
                            >
                                <FaArrowAltCircleRight />
                            </button>
                        </>
                    )}
                </>
            )}
        </section>
    );
};

export default TagProductSlider;
