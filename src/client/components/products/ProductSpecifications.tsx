interface ProductSpecificationsProps {
    specifications?: Record<string, string>;
}

const ProductSpecifications = ({ specifications }: ProductSpecificationsProps) => {
    const entries = Object.entries(specifications ?? {});

    if (!entries.length) {
        return null;
    }

    return (
        <section className="border-t py-8">
            <h2 className="text-2xl font-bold tracking-tight">Specifications</h2>
            <div className="mt-5 overflow-hidden rounded-xl border">
                {entries.map(([name, value], index) => (
                    <div key={name} className={`grid grid-cols-1 gap-4 px-5 py-4 sm:grid-cols-[20rem_1fr] ${index % 2 === 0 ? "bg-muted/30" : "bg-card"}`}>
                        <span className="font-medium capitalize">{name}</span>
                        <span className="text-muted-foreground">{value}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductSpecifications;
