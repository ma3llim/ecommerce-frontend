import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addressSchema, type AddressFormSchemaValues } from "@/client/validation/Address.schema";
import type { AddressFormProps } from "@/client/types/Address.types";

const AddressForm = ({ address, isPending, onSubmit, onCancel }: AddressFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        watch,
        formState: { errors },
    } = useForm<AddressFormSchemaValues>({
        resolver: yupResolver(addressSchema),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            addressLineOne: "",
            addressLineTwo: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            addressType: "HOME",
            defaultShipping: false,
            defaultBilling: false,
        },
    });

    useEffect(() => {
        if (address) {
            reset({
                fullName: address.fullName,
                phoneNumber: address.phoneNumber,
                addressLineOne: address.addressLineOne,
                addressLineTwo: address.addressLineTwo ?? "",
                city: address.city,
                state: address.state,
                country: address.country,
                postalCode: address.postalCode,
                addressType: address.addressType,
                defaultShipping: address.defaultShipping,
                defaultBilling: address.defaultBilling,
            });
        } else {
            reset({
                fullName: "",
                phoneNumber: "",
                addressLineOne: "",
                addressLineTwo: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
                addressType: "HOME",
                defaultShipping: false,
                defaultBilling: false,
            });
        }
    }, [address, reset]);

    const defaultShipping = useWatch({
        control,
        name: "defaultShipping",
    });

    const defaultBilling = useWatch({
        control,
        name: "defaultBilling",
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" disabled={isPending} placeholder="Enter full name" {...register("fullName")} />
                    <FormError message={errors.fullName?.message} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" type="tel" disabled={isPending} placeholder="Enter phone number" {...register("phoneNumber")} />
                    <FormError message={errors.phoneNumber?.message} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="addressLineOne">Address Line 1</Label>

                <Input id="addressLineOne" disabled={isPending} placeholder="House number, street name" {...register("addressLineOne")} />

                <FormError message={errors.addressLineOne?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="addressLineTwo">Address Line 2</Label>

                <Input id="addressLineTwo" disabled={isPending} placeholder="Apartment, landmark, etc. (optional)" {...register("addressLineTwo")} />

                <FormError message={errors.addressLineTwo?.message} />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" disabled={isPending} placeholder="Enter city" {...register("city")} />
                    <FormError message={errors.city?.message} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" disabled={isPending} placeholder="Enter state" {...register("state")} />
                    <FormError message={errors.state?.message} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" disabled={isPending} placeholder="Enter country" {...register("country")} />
                    <FormError message={errors.country?.message} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" disabled={isPending} placeholder="Enter postal code" {...register("postalCode")} />
                    <FormError message={errors.postalCode?.message} />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Address Type</Label>
                <Select
                    value={watch("addressType")}
                    disabled={isPending}
                    onValueChange={value =>
                        setValue("addressType", value as "HOME" | "OFFICE" | "OTHER", {
                            shouldValidate: true,
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select address type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="HOME">Home</SelectItem>
                        <SelectItem value="OFFICE">Office</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                </Select>
                <FormError message={errors.addressType?.message} />
            </div>

            <div className="space-y-4 rounded-xl border p-4">
                <div className="flex items-start gap-3">
                    <Checkbox
                        id="defaultShipping"
                        disabled={isPending}
                        checked={defaultShipping}
                        onCheckedChange={checked => setValue("defaultShipping", checked === true)}
                    />
                    <div>
                        <Label htmlFor="defaultShipping" className="cursor-pointer">
                            Default Shipping Address
                        </Label>
                        <p className="text-sm text-muted-foreground">Use this address for shipping.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Checkbox
                        id="defaultBilling"
                        disabled={isPending}
                        checked={defaultBilling}
                        onCheckedChange={checked => setValue("defaultBilling", checked === true)}
                    />
                    <div>
                        <Label htmlFor="defaultBilling" className="cursor-pointer">
                            Default Billing Address
                        </Label>

                        <p className="text-sm text-muted-foreground">Use this address for billing.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" disabled={isPending} onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : address ? "Update Address" : "Add Address"}
                </Button>
            </div>
        </form>
    );
};

export default AddressForm;
