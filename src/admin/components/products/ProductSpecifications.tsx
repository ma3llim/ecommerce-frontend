import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductSpecificationsProps {
    specifications: Record<string, string>;
}

const ProductSpecifications = ({ specifications }: ProductSpecificationsProps) => {
    const entries = Object.entries(specifications ?? {});

    return (
        <Card>
            <CardHeader>
                <CardTitle>Specifications</CardTitle>
            </CardHeader>

            <CardContent>
                {!entries.length ? (
                    <p className="text-sm text-muted-foreground">No specifications available.</p>
                ) : (
                    <div className="divide-y rounded-lg border">
                        {entries.map(([key, value]) => (
                            <div key={key} className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-3">
                                <span className="font-medium">{key}</span>

                                <span className="text-muted-foreground sm:col-span-2">{value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductSpecifications;
