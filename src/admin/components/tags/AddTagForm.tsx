import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TagApi } from "@/admin/api/Tag.api";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import { addTagSchema, type AddTagFormValues } from "@/admin/validation/products/TagSchema";

const AddTagForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddTagFormValues>({
        resolver: yupResolver(addTagSchema),
        defaultValues: {
            name: "",
        },
        mode: "onChange",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: TagApi.addTag,
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["tagList"],
            });
            ToastService.success(response.message);
            navigate("/admin/tags/tag-listing");
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    const onSubmit = (data: AddTagFormValues) => {
        if (isPending) return;
        mutate({
            name: data.name.trim(),
        });
    };

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
                        <Button
                            disabled={isPending}
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset();
                                navigate("/admin/tags/tag-listing");
                            }}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating..." : "Create Tag"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
};

export default AddTagForm;
