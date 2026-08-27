import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { couponSchema } from "../validation/Coupon.scheme";
import FormError from "@/components/forms/FormError";
import type { CouponCreateRequest, CouponFormProps, DiscountType } from "../types/Coupon.types";

const CouponForm = ({ initialData, isPending, onSubmit, onCancel }: CouponFormProps) => {
    const isEdit = !!initialData;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CouponCreateRequest>({
        resolver: yupResolver(couponSchema),
        defaultValues: {
            code: initialData?.code ?? "",
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
            discountType: initialData?.discountType ?? "PERCENTAGE",
            discountValue: initialData?.discountValue ?? 0,
            minimumOrderAmount: initialData?.minimumOrderAmount ?? 0,
            maximumDiscountAmount: initialData?.maximumDiscountAmount ?? 0,
            usageLimit: initialData?.usageLimit ?? 1,
            validFrom: initialData?.validFrom ? initialData.validFrom.slice(0, 16) : "",
            validUntil: initialData?.validUntil ? initialData.validUntil.slice(0, 16) : "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {!isEdit && (
                <div className="space-y-2">
                    <Label htmlFor="code">Coupon Code</Label>
                    <Input id="code" disabled={isPending} placeholder="SUMMER2026" {...register("code")} />
                    <FormError message={errors.code?.message} />
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="name">Coupon Name</Label>
                <Input id="name" disabled={isPending} placeholder="Summer Sale" {...register("name")} />
                <FormError message={errors.name?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" disabled={isPending} placeholder="Enter coupon description" rows={4} {...register("description")} />
                <FormError message={errors.description?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="discountType">Discount Type</Label>
                <Controller
                    name="discountType"
                    control={control}
                    render={({ field }) => (
                        <Select value={field.value} onValueChange={value => field.onChange(value as DiscountType)} disabled={isPending}>
                            <SelectTrigger id="discountType">
                                <SelectValue placeholder="Select discount type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                                <SelectItem value="FIXED_AMOUNT">Fixed Amount</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <FormError message={errors.discountType?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="discountValue">Discount Value</Label>
                <Input
                    id="discountValue"
                    type="number"
                    step="0.01"
                    min="0"
                    disabled={isPending}
                    placeholder="10"
                    {...register("discountValue", {
                        valueAsNumber: true,
                    })}
                />
                <FormError message={errors.discountValue?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="minimumOrderAmount">Minimum Order Amount</Label>
                <Input
                    id="minimumOrderAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    disabled={isPending}
                    placeholder="500"
                    {...register("minimumOrderAmount", {
                        valueAsNumber: true,
                    })}
                />

                <FormError message={errors.minimumOrderAmount?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="maximumDiscountAmount">Maximum Discount Amount</Label>
                <Input
                    id="maximumDiscountAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    disabled={isPending}
                    placeholder="1000"
                    {...register("maximumDiscountAmount", {
                        valueAsNumber: true,
                    })}
                />
                <FormError message={errors.maximumDiscountAmount?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                    id="usageLimit"
                    type="number"
                    min="1"
                    disabled={isPending}
                    placeholder="100"
                    {...register("usageLimit", {
                        valueAsNumber: true,
                    })}
                />
                <FormError message={errors.usageLimit?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="validFrom">Valid From</Label>
                <Input id="validFrom" type="datetime-local" disabled={isPending} {...register("validFrom")} />
                <FormError message={errors.validFrom?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="validUntil">Valid Until</Label>
                <Input id="validUntil" type="datetime-local" disabled={isPending} {...register("validUntil")} />
                <FormError message={errors.validUntil?.message} />
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" disabled={isPending} onClick={onCancel}>
                    Cancel
                </Button>

                <Button type="submit" disabled={isPending}>
                    {isPending ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Coupon" : "Create Coupon"}
                </Button>
            </div>
        </form>
    );
};

export default CouponForm;
