import { motion } from "framer-motion";
import deliveryBanner from "@/assets/banners/delivery.webp";
import type { ReactNode } from "react";

interface BannerProps {
    image?: string;
    title?: string;
    children?: ReactNode;
}

const Banner = ({ image = deliveryBanner, title, children }: BannerProps) => {
    return (
        <section className="relative h-96 w-full select-none">
            <img loading="lazy" className="h-full w-full object-cover" src={image} alt={title || "Banner Image"} />

            <div className="absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-black/50 text-white">
                <motion.div
                    className="container mx-auto text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <motion.h1
                        className="text-3xl font-bold underline decoration-4 underline-offset-4 md:text-4xl"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                        }}
                    >
                        {title}
                    </motion.h1>

                    <motion.div
                        className="my-2 hidden items-center justify-center text-lg md:flex"
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.6,
                        }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Banner;
