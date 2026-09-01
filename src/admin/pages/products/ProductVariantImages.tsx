import type { ProductVariantImage } from "@/admin/types/products/Product.types";

interface ProductVariantImagesProps {
    images: ProductVariantImage[];
}

const ProductVariantImages = ({ images }: ProductVariantImagesProps) => {
    if (!images.length) {
        return <p className="text-sm text-muted-foreground">No images available.</p>;
    }

    const sortedImages = [...images].sort((a, b) => a.displayOrder - b.displayOrder);

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {sortedImages.map(image => (
                <div key={image.id} className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border bg-muted/20">
                    <img src={image.imageUrl} alt="Product variant" loading="lazy" className="h-full w-full object-contain" />
                    {image.primary && (
                        <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">Primary</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProductVariantImages;
