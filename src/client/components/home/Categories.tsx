import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import SectionHeader from "../SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { CategoryApi } from "@/client/api/Category.api";
import CategoriesSkeleton from "./CategoriesSkeleton";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Categories = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ["categories", 0, 10],
        queryFn: () => CategoryApi.getAll(0, 10),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
    const categories = data?.data.content ?? [];

    if (isLoading) {
        return <CategoriesSkeleton />;
    }

    return (
        <section className="group relative my-10 flex w-full flex-col">
            <SectionHeader title="Popular Categories" />
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                navigation={false}
                loop={categories.length > 1}
                autoplay={{
                    delay: 8000,
                    disableOnInteraction: false,
                }}
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
                        slidesPerView: 4,
                    },
                }}
                onBeforeInit={swiper => {
                    swiperRef.current = swiper;
                }}
                className="w-full"
            >
                {categories.map(category => (
                    <SwiperSlide key={category.categoryId} className="p-2">
                        <div className="overflow-hidden rounded-lg bg-card px-4 pb-4 pt-2 shadow-lg">
                            <Link to={`/category/${category.slug}`}>
                                <div className="mb-4 overflow-hidden rounded-lg">
                                    <img
                                        loading="lazy"
                                        src={category.imageUrl}
                                        alt={category.name}
                                        className="h-56 w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                                        draggable="false"
                                    />
                                </div>
                            </Link>

                            <div className="flex flex-col gap-3 items-center">
                                <Link to={`/category/${category.slug}`}>
                                    <h3 className="cursor-pointer text-center text-xl font-bold transition-colors hover:text-primary">
                                        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                                    </h3>
                                </Link>

                                <Link to={`/category/${category.slug}`}>
                                    <Button>View Category</Button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {categories.length > 1 && (
                <>
                    <button
                        type="button"
                        className="absolute left-4 top-1/2 z-20 mx-5 hidden -translate-y-1/2 rounded-full bg-background p-2 text-foreground shadow group-hover:block"
                        onClick={() => swiperRef.current?.slidePrev()}
                        aria-label="Go Back"
                    >
                        <FaArrowAltCircleLeft />
                    </button>

                    <button
                        type="button"
                        className="absolute right-4 top-1/2 z-20 mx-5 hidden -translate-y-1/2 rounded-full bg-background p-2 text-foreground shadow group-hover:block"
                        onClick={() => swiperRef.current?.slideNext()}
                        aria-label="Go Next"
                    >
                        <FaArrowAltCircleRight />
                    </button>
                </>
            )}
        </section>
    );
};

export default Categories;
