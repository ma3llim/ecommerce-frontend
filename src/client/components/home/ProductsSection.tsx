import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaEye } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Rating from "../Rating";
import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";
import type { Product } from "@/client/types/Product.types";

interface ProductsSectionProps {
    title?: string;
    productData?: Product[];
}

const ProductsSection = ({ title = "Featured Products", productData = [] }: ProductsSectionProps) => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="relative my-10 flex w-full flex-col">
            <SectionHeader title={title} />

            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                navigation={true}
                loop={true}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 3,
                    },
                }}
                onBeforeInit={swiper => {
                    swiperRef.current = swiper;
                }}
                className="w-full"
            >
                {productData.map(product => (
                    <SwiperSlide key={product._id} className="p-3">
                        <div className="group flex min-h-130 max-h-130 cursor-pointer flex-col items-center justify-center space-y-4 overflow-hidden rounded-lg bg-muted px-4 py-4 shadow-lg transition-all">
                            <div className="relative w-full">
                                <img
                                    loading="lazy"
                                    src={product.productFeatureImage}
                                    alt={product.productName}
                                    className="h-72 w-full transform overflow-hidden rounded-lg object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    draggable="false"
                                />

                                <span className="absolute left-1 top-1 rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">New</span>
                            </div>

                            <div className="flex w-full flex-col gap-4">
                                <Link to={`/product-details/${product.productSlug}`}>
                                    <h3 className="mb-2 truncate text-xl font-semibold text-primary">{capitalizeWords(product.productName)}</h3>
                                </Link>

                                <p className="line-clamp-2 text-base text-muted-foreground">{capitalizeWords(product.productShortDescription)}</p>

                                <Rating size="text-base" rating={product.ratings?.averageRating || 3} />

                                <Link to={`/product-details/${product.productSlug}`}>
                                    <Button className="w-full">
                                        <FaEye />
                                        View Product
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button
                type="button"
                className="absolute left-4 top-1/2 z-10 mx-5 -translate-y-1/2 rounded-full bg-background p-2 text-foreground shadow"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Go Back"
            >
                <FaArrowAltCircleLeft />
            </button>

            <button
                type="button"
                className="absolute right-4 top-1/2 z-10 mx-5 -translate-y-1/2 rounded-full bg-background p-2 text-foreground shadow"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Go Next"
            >
                <FaArrowAltCircleRight />
            </button>
        </section>
    );
};

export default ProductsSection;
