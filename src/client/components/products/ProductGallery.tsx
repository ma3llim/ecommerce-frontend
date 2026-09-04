import { useState } from "react";
import type { ProductVariantImage } from "@/client/types/Product.types";

interface ProductGalleryProps {
    images: ProductVariantImage[];
    productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
    const sortedImages = [...images].sort((a, b) => a.displayOrder - b.displayOrder);
    const [currentImage, setCurrentImage] = useState(() => {
        const primaryIndex = sortedImages.findIndex(image => image.primary);
        return primaryIndex >= 0 ? primaryIndex : 0;
    });
    if (!sortedImages.length) {
        return (
            <div className="flex aspect-square w-full items-center justify-center rounded-xl border bg-muted/30">
                <span className="text-sm text-muted-foreground">No image available</span>
            </div>
        );
    }

    const selectedImage = sortedImages[currentImage] ?? sortedImages[0];
    return (
        <div className="flex w-full gap-3">
            {sortedImages.length > 1 && (
                <div className="hidden w-16 shrink-0 flex-col gap-3 overflow-y-auto sm:flex">
                    {sortedImages.map((image, index) => (
                        <button
                            key={image.productVariantImageId}
                            type="button"
                            onClick={() => setCurrentImage(index)}
                            className={`aspect-square overflow-hidden rounded-lg border-2 bg-card p-1 transition-colors duration-300 ${
                                currentImage === index ? "border-primary" : "border-border hover:border-primary/50"
                            }`}
                        >
                            <img loading="lazy" src={image.url} alt={`${productName} ${index + 1}`} className="h-full w-full rounded-md object-contain" />
                        </button>
                    ))}
                </div>
            )}

            <div className="relative min-w-0 flex-1">
                <div className="aspect-square w-full overflow-hidden rounded-xl border bg-muted/20 p-4 sm:p-6">
                    <img loading="lazy" src={selectedImage.url} alt={productName} className="h-full w-full object-contain transition-opacity duration-300" />
                </div>

                {sortedImages.length > 1 && (
                    <div className="mt-3 flex justify-center gap-2 sm:hidden">
                        {sortedImages.map((image, index) => (
                            <button
                                key={image.productVariantImageId}
                                type="button"
                                aria-label={`View image ${index + 1}`}
                                onClick={() => setCurrentImage(index)}
                                className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                                    currentImage === index ? "scale-125 border-primary bg-primary" : "border-border bg-muted"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductGallery;
