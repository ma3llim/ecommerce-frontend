import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, Trash2, Upload, ArrowUp, ArrowDown, RefreshCw } from "lucide-react";
import { ProductApi } from "@/admin/api/Product.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToastService from "@/services/ToastService";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";

const VariantImageManager = () => {
    const { productId, variantId } = useParams<{ productId: string; variantId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [replacingImageId, setReplacingImageId] = useState<string | null>(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ["productVariants", productId, variantId],
        queryFn: () => ProductApi.getProductVariants(productId!),
        enabled: !!productId,
    });

    const variant = data?.data?.find(item => item.id === variantId);
    const images = variant?.images ?? [];

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

            setReplacingImageId(null);
        },
        onError: error => {
            ToastService.error(error.message);
            setReplacingImageId(null);
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
        },
    });

    const isProcessing = isUploading || isDeleting || isSettingPrimary || isReplacing || isReordering;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);

        setSelectedFiles(files);
    };

    const handleUpload = () => {
        if (selectedFiles.length === 0 || isProcessing) {
            return;
        }
        uploadImages();
    };

    const handleReplaceImage = (imageId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file || isProcessing) {
            return;
        }

        setReplacingImageId(imageId);

        replaceImage({
            imageId,
            file,
        });

        event.target.value = "";
    };

    const handleMoveUp = (index: number) => {
        if (index === 0 || isProcessing) {
            return;
        }

        const imageIds = images.map(image => image.id);
        [imageIds[index - 1], imageIds[index]] = [imageIds[index], imageIds[index - 1]];
        reorderImages(imageIds);
    };

    const handleMoveDown = (index: number) => {
        if (index === images.length - 1 || isProcessing) {
            return;
        }
        const imageIds = images.map(image => image.id);
        [imageIds[index], imageIds[index + 1]] = [imageIds[index + 1], imageIds[index]];
        reorderImages(imageIds);
    };

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return <ErrorState message={error.message} />;
    }

    if (!variant) {
        return <ErrorState message="Variant not found." />;
    }

    return (
        <div className="mx-auto w-full max-w-5xl">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Manage Variant Images</h1>
                <p className="text-sm text-muted-foreground">
                    Manage images for variant <span className="font-medium">{variant.sku}</span>.
                </p>
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
                </CardHeader>

                <CardContent>
                    {images.length === 0 ? (
                        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                            No images uploaded for this variant.
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {images.map((image, index) => (
                                <div key={image.id} className="overflow-hidden rounded-lg border">
                                    {/* Image */}
                                    <div className="aspect-square overflow-hidden bg-muted">
                                        <img src={image.imageUrl} alt={`${variant.sku} image`} className="h-full w-full object-cover" />
                                    </div>

                                    <div className="space-y-3 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Display Order: {image.displayOrder}</span>

                                            {image.primary && (
                                                <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium">
                                                    <Star className="size-3" />
                                                    Primary
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                disabled={index === 0 || isProcessing}
                                                onClick={() => handleMoveUp(index)}
                                            >
                                                <ArrowUp className="mr-1 size-4" />
                                                Up
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                disabled={index === images.length - 1 || isProcessing}
                                                onClick={() => handleMoveDown(index)}
                                            >
                                                <ArrowDown className="mr-1 size-4" />
                                                Down
                                            </Button>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {!image.primary && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={isProcessing}
                                                    onClick={() => setPrimaryImage(image.id)}
                                                >
                                                    <Star className="mr-1 size-4" />

                                                    {isSettingPrimary ? "Setting..." : "Set Primary"}
                                                </Button>
                                            )}

                                            <label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    disabled={isProcessing}
                                                    onChange={event => handleReplaceImage(image.id, event)}
                                                />

                                                <Button type="button" variant="outline" size="sm" disabled={isProcessing}>
                                                    <span>
                                                        <RefreshCw className="mr-1 size-4" />

                                                        {isReplacing && replacingImageId === image.id ? "Replacing..." : "Replace"}
                                                    </span>
                                                </Button>
                                            </label>

                                            {/* Delete */}
                                            <Button type="button" variant="destructive" size="sm" disabled={isProcessing} onClick={() => deleteImage(image.id)}>
                                                <Trash2 className="mr-1 size-4" />

                                                {isDeleting ? "Deleting..." : "Delete"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="mt-6 flex justify-end">
                <Button type="button" variant="outline" disabled={isProcessing} onClick={() => navigate(`/admin/products/${productId}/variants`)}>
                    Back to Variants
                </Button>
            </div>
        </div>
    );
};

export default VariantImageManager;
