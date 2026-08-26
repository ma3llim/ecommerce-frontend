import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { data, useNavigate, useParams } from "react-router-dom";
import { TagApi } from "@/admin/api/Tag.api";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import { updateTagSchema, type UpdateTagFormValues } from "@/admin/validation/tags/TagSchema";

const UpdateTagForm = () => {
    const { tagId } = useParams<{ tagId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateTagFormValues>({
        resolver: yupResolver(updateTagSchema),
        defaultValues: {
            name: "",
        },
        mode: "onChange",
    });

    const { data: tagResponse, isLoading: isTagLoading } = useQuery({
        queryKey: ["tag", tagId],
        queryFn: () => TagApi.getTagById(tagId!),
        enabled: !!tagId,
    });

    useEffect(() => {
        if (!tagResponse?.data) {
            return;
        }

        reset({
            name: tagResponse.data?.name,
        });
    }, [tagResponse, reset]);
    console.log(tagResponse?.data);

    const { mutate, isPending: isUpdating } = useMutation({
        mutationFn: (data: UpdateTagFormValues) =>
            TagApi.updateTag(tagId!, {
                name: data.name.trim(),
            }),

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["tagList"],
            });

            queryClient.invalidateQueries({
                queryKey: ["tag", tagId],
            });

            ToastService.success(response.message);
            navigate("/admin/tags/tag-listing");
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    const onSubmit = (data: UpdateTagFormValues) => {
        if (isUpdating) return;

        mutate(data);
    };

    const isPending = isTagLoading || isUpdating;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Tag Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Tag Name</Label>

                        <Input id="name" disabled={isPending} placeholder="Enter tag name" {...register("name")} />

                        <FormError message={errors.name?.message} />
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Button type="button" variant="outline" disabled={isPending} onClick={() => navigate("/admin/tags/tag-listing")}>
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isUpdating ? "Updating..." : "Update Tag"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
};

export default UpdateTagForm;
