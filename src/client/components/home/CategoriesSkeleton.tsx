import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton } from "@/components/ui/skeleton";
import SectionHeader from "../SectionHeader";

const CategoriesSkeleton = () => {
    const skeletonItems = Array.from({ length: 4 });

    return (
        <section className="my-10 flex w-full flex-col">
            <SectionHeader title="Popular Categories" />

            <Swiper
                slidesPerView={1}
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
                className="w-full"
            >
                {skeletonItems.map((_, index) => (
                    <SwiperSlide key={index} className="p-2">
                        <div className="overflow-hidden rounded-lg bg-card px-4 pb-4 pt-2 shadow-lg">
                            <Skeleton className="mb-4 h-56 w-full rounded-lg" />
                            <div className="flex flex-col gap-3">
                                <Skeleton className="mx-auto h-7 w-3/5" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default CategoriesSkeleton;
