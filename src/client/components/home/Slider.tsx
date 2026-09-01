import { Button } from "@/components/ui/button";
import { useCallback, useMemo, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export interface SliderItem {
    id: number;
    imageUrl: string;
    title?: string;
    short_title?: string;
    achor_link: string;
    achor_title: string;
}

interface SliderProps {
    sliderData: SliderItem[];
}

const Slider = ({ sliderData }: SliderProps) => {
    const sliders = useMemo(() => sliderData, [sliderData]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevValue => (prevValue + 1) % sliders.length);
    }, [sliders.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex(prevValue => (prevValue - 1 + sliders.length) % sliders.length);
    }, [sliders.length]);

    if (!sliders.length) {
        return null;
    }

    return (
        <div className="relative h-112.5 w-full overflow-hidden shadow-md md:h-137.5 lg:h-162.5">
            <AnimatePresence>
                {sliders.map((slider, index) =>
                    index === currentIndex ? (
                        <motion.div
                            key={slider.id}
                            className="absolute left-0 top-0 h-full w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            <div className="relative flex h-full w-full items-center justify-center">
                                <img loading="lazy" src={slider.imageUrl} alt={slider.title || `Slider ${index + 1}`} className="h-full w-full object-cover" />

                                <div className="absolute flex h-full w-full flex-col items-center justify-center gap-4 bg-black/50 p-8 text-white">
                                    <motion.h1
                                        className="text-3xl font-bold md:text-4xl"
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.4,
                                        }}
                                    >
                                        {slider.title}
                                    </motion.h1>

                                    <motion.h2
                                        className="text-xl font-light italic uppercase"
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.2,
                                        }}
                                    >
                                        {slider.short_title}
                                    </motion.h2>

                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.6,
                                        }}
                                    >
                                        <Link to={slider.achor_link} rel="noopener noreferrer">
                                            <Button className="mt-4">{slider.achor_title}</Button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ) : null
                )}
            </AnimatePresence>

            <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-4 top-1/2 mx-5 -translate-y-1/2 rounded-full bg-background p-2 text-foreground shadow"
            >
                <FaArrowAltCircleLeft />
            </button>

            <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-4 top-1/2 mx-5 -translate-y-1/2 rounded-full bg-background p-2 text-foreground shadow"
            >
                <FaArrowAltCircleRight />
            </button>

            <div className="absolute bottom-4 mt-2 flex w-full justify-center py-1">
                {sliders.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        aria-label={`Go To Slide ${index + 1}`}
                        aria-current={index === currentIndex}
                        onClick={() => setCurrentIndex(index)}
                        className={`mx-1 h-3 w-3 cursor-pointer rounded-full ${index === currentIndex ? "bg-primary" : "bg-white/60"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
