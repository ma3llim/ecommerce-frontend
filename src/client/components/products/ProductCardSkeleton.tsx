const ProductCardSkeleton = () => {
    return (
        <div className="flex h-full w-full select-none flex-col overflow-hidden rounded-lg border-2 border-border bg-card p-0.5">
            <div className="relative h-96 w-full overflow-hidden rounded-md bg-muted">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-primary/20 to-transparent dark:via-primary/30" />
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="relative h-6 w-3/4 overflow-hidden rounded-md bg-muted">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-primary/20 to-transparent dark:via-primary/30" />
                </div>

                <div className="relative mt-3 h-5 w-full overflow-hidden rounded-md bg-muted">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-primary/20 to-transparent dark:via-primary/30" />
                </div>

                <div className="relative mt-2 h-5 w-5/6 overflow-hidden rounded-md bg-muted">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-primary/20 to-transparent dark:via-primary/30" />
                </div>

                <div className="relative mt-5 h-7 w-32 overflow-hidden rounded-md bg-muted">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-primary/20 to-transparent dark:via-primary/30" />
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
