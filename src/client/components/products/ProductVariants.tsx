import type { ProductVariant } from "@/client/types/Product.types";

interface ProductVariantsProps {
    variants: ProductVariant[];
    selectedVariant: ProductVariant;
    onSelectVariant: (variant: ProductVariant) => void;
}

const ProductVariants = ({ variants, selectedVariant, onSelectVariant }: ProductVariantsProps) => {
    const attributes = new Map<string, Set<string>>();
    variants.forEach(variant => {
        Object.entries(variant.attributes ?? {}).forEach(([name, value]) => {
            if (!attributes.has(name)) {
                attributes.set(name, new Set());
            }
            attributes.get(name)!.add(String(value));
        });
    });

    if (!attributes.size) {
        return null;
    }

    const findVariant = (attributeName: string, value: string) => {
        const candidate = variants.find(variant =>
            Object.entries(variant.attributes ?? {}).every(([name, currentValue]) => {
                if (name === attributeName) {
                    return String(currentValue) === value;
                }

                return selectedVariant.attributes?.[name] === currentValue;
            })
        );

        if (candidate) {
            onSelectVariant(candidate);
        }
    };

    return (
        <div className="space-y-5">
            {Array.from(attributes.entries()).map(([name, values]) => (
                <div key={name}>
                    <p className="mb-3 text-sm font-semibold capitalize">{name}</p>
                    <div className="flex flex-wrap gap-2">
                        {Array.from(values).map(value => {
                            const selected = String(selectedVariant.attributes?.[name]) === value;

                            return (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => findVariant(name, value)}
                                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                                        selected ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary"
                                    }`}
                                >
                                    {value}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductVariants;
