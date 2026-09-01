import { ProductApi } from "@/admin/api/Product.api";
import SortableImage from "@/admin/components/products/SortableImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToastService from "@/services/ToastService";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

const VariantImageManager = () => {
    const { productId, variantId } = useParams<{ productId: string; variantId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const { data, isLoading } = useQuery({
        queryKey: ["productVariants", productId],
        queryFn: () => ProductApi.getProductVariants(productId!),
        enabled: !!productId,
    });

    const variant = data?.data?.find(item => item.id === variantId);
    const [images, setImages] = useState(() => [...(variant?.images ?? [])].sort((a, b) => a.displayOrder - b.displayOrder));

    const { mutate: uploadImages, isPending: isUploading } = useMutation({
        mutationFn: () => ProductApi.uploadVariantImages(productId!, variantId!, selectedFiles),
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["productVariants", productId],
            });
            ToastService.success(response.message);

            setSelectedFiles([]);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    const { mutate: deleteImage, isPending: isDeleting } = useMutation({
        mutationFn: (imageId: string) => ProductApi.deleteVariantImage(productId!, variantId!, imageId),

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["productVariants", productId],
            });
            ToastService.success(response.message);
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    const { mutate: setPrimaryImage, isPending: isSettingPrimary } = useMutation({
        mutationFn: (imageId: string) => ProductApi.setVariantImagePrimary(productId!, variantId!, imageId),

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["productVariants", productId],
            });

            ToastService.success(response.message);
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    const { mutate: replaceImage, isPending: isReplacing } = useMutation({
        mutationFn: ({ imageId, file }: { imageId: string; file: File }) => ProductApi.replaceVariantImage(productId!, variantId!, imageId, file),

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["productVariants", productId],
            });

            ToastService.success(response.message);
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    const { mutate: reorderImages, isPending: isReordering } = useMutation({
        mutationFn: (imageIds: string[]) => ProductApi.reorderVariantImages(productId!, variantId!, imageIds),

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["productVariants", productId],
            });

            ToastService.success(response.message);
        },

        onError: error => {
            ToastService.error(error.message);

            queryClient.invalidateQueries({
                queryKey: ["productVariants", productId],
            });
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);

        setSelectedFiles(files);
    };

    const handleUpload = () => {
        if (selectedFiles.length === 0 || isUploading) {
            return;
        }

        uploadImages();
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id || isReordering) {
            return;
        }

        const oldIndex = images.findIndex(image => image.id === active.id);

        const newIndex = images.findIndex(image => image.id === over.id);

        if (oldIndex === -1 || newIndex === -1) {
            return;
        }

        const reorderedImages = arrayMove(images, oldIndex, newIndex);

        setImages(reorderedImages);

        const imageIds = reorderedImages.map(image => image.id);

        reorderImages(imageIds);
    };

    useEffect(() => {
        setImages([...(variant?.images ?? [])].sort((a, b) => a.displayOrder - b.displayOrder));
    }, [variant?.images]);
    const isProcessing = isUploading || isDeleting || isSettingPrimary || isReplacing || isReordering;

    if (isLoading) {
        return <div className="p-6 text-sm text-muted-foreground">Loading images...</div>;
    }

    if (!variant) {
        return <div className="p-6 text-sm text-destructive">Variant not found.</div>;
    }

    return (
        <>
            <Helmet>
                <title>Manage Variant Images | Admin</title>
                <meta name="description" content="Manage images associated with product variants, including adding, updating, and removing variant images." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full max-w-5xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">Manage Variant Images</h1>

                    <p className="text-sm text-muted-foreground">Manage images for variant {variant.sku}.</p>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Upload Images</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            disabled={isProcessing}
                            onChange={handleFileChange}
                            className="block w-full text-sm"
                        />

                        {selectedFiles.length > 0 && (
                            <p className="text-sm text-muted-foreground">
                                {selectedFiles.length} image
                                {selectedFiles.length > 1 ? "s" : ""} selected.
                            </p>
                        )}

                        <Button type="button" disabled={selectedFiles.length === 0 || isProcessing} onClick={handleUpload}>
                            <Upload className="mr-2 size-4" />

                            {isUploading ? "Uploading..." : "Upload Images"}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Variant Images ({images.length})</CardTitle>

                        {images.length > 1 && <p className="text-sm text-muted-foreground">Drag and drop images to change their order.</p>}

                        {isReordering && <p className="text-sm text-muted-foreground">Saving image order...</p>}
                    </CardHeader>

                    <CardContent>
                        {images.length === 0 ? (
                            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                                No images uploaded for this variant.
                            </div>
                        ) : (
                            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={images.map(image => image.id)} strategy={rectSortingStrategy}>
                                    <div className="grid grid-cols-2 gap-6">
                                        {images.map((image, index) => (
                                            <SortableImage
                                                key={image.id}
                                                image={image}
                                                order={index + 1}
                                                sku={variant.sku}
                                                isProcessing={isProcessing}
                                                isSettingPrimary={isSettingPrimary}
                                                isDeleting={isDeleting}
                                                isReplacing={isReplacing}
                                                onSetPrimary={setPrimaryImage}
                                                onDelete={deleteImage}
                                                onReplace={(imageId, file) =>
                                                    replaceImage({
                                                        imageId,
                                                        file,
                                                    })
                                                }
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        )}
                    </CardContent>
                </Card>

                <div className="mt-6 flex justify-end">
                    <Button type="button" variant="outline" disabled={isProcessing} onClick={() => navigate(`/admin/products/${productId}/variants`)}>
                        Back to Variants
                    </Button>
                </div>
            </div>
        </>
    );
};

export default VariantImageManager;
