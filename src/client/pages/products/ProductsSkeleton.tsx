import ProductCardSkeleton from "@/client/components/products/ProductCardSkeleton";

const ProductsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(index => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
};

export default ProductsSkeleton;
