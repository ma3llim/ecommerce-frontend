import type { SortableImageProps } from "@/admin/types/products/ProductVariant.types";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Star, Trash2 } from "lucide-react";

const SortableImage = ({
    image,
    sku,
    isProcessing,
    isSettingPrimary,
    order,
    isDeleting,
    isReplacing,
    onSetPrimary,
    onDelete,
    onReplace,
}: SortableImageProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: image.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const replaceInputId = `replace-image-${image.id}`;

    return (
        <div ref={setNodeRef} style={style} className={`overflow-hidden rounded-lg border bg-background ${isDragging ? "z-50 opacity-50 shadow-xl" : ""}`}>
            <div className="relative h-48 overflow-hidden bg-muted">
                <img loading="lazy" src={image.imageUrl} alt={`${sku} image`} className="h-full w-full object-cover" />

                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    disabled={isProcessing}
                    className="absolute left-2 top-2 flex size-8 cursor-grab items-center justify-center rounded-md bg-background/90 shadow-sm hover:bg-background active:cursor-grabbing disabled:cursor-not-allowed"
                    aria-label={`Drag image ${image.displayOrder}`}
                >
                    <GripVertical className="size-4" />
                </button>

                {image.primary && (
                    <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-medium shadow-sm">
                        <Star className="size-3" />
                        Primary
                    </div>
                )}
            </div>

            <div className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Order {order}</span>
                </div>

                <input
                    id={replaceInputId}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isProcessing}
                    onChange={event => {
                        const file = event.target.files?.[0];

                        if (!file) {
                            return;
                        }

                        onReplace(image.id, file);

                        event.target.value = "";
                    }}
                />

                <div className="flex flex-wrap gap-2">
                    {!image.primary && (
                        <Button type="button" variant="outline" size="sm" disabled={isProcessing || isSettingPrimary} onClick={() => onSetPrimary(image.id)}>
                            <Star className="mr-1 size-4" />
                            Set Primary
                        </Button>
                    )}

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isProcessing || isReplacing}
                        onClick={() => document.getElementById(replaceInputId)?.click()}
                    >
                        {isReplacing ? "Replacing..." : "Replace"}
                    </Button>

                    <Button type="button" variant="destructive" size="sm" disabled={isProcessing || isDeleting} onClick={() => onDelete(image.id)}>
                        <Trash2 className="mr-1 size-4" />
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SortableImage;
