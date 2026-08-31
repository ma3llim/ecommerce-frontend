import { Plus } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ToastService from "@/services/ToastService";
import type { Address } from "@/client/types/Address.types";
import { AddressApi } from "@/client/api/AddressApi";
import type { AddressFormSchemaValues } from "@/client/validation/Address.schema";
import AddressForm from "@/client/components/address/AddressForm";
import AddressCard from "@/client/components/address/AddressCard";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";

const Addresses = () => {
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user-addresses"],
        queryFn: AddressApi.getAddresses,
    });

    const addresses = data?.data ?? [];

    const { mutate: createAddress, isPending: isCreating } = useMutation({
        mutationFn: AddressApi.createAddress,

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["user-addresses"],
            });
            setShowForm(false);
            ToastService.success(response.message);
        },
        onError: error => {
            ToastService.error(error?.message);
        },
    });

    const { mutate: updateAddress, isPending: isUpdating } = useMutation({
        mutationFn: AddressApi.updateAddress,
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["user-addresses"],
            });
            setShowForm(false);
            setEditingAddress(null);
            ToastService.success(response.message);
        },
        onError: error => {
            ToastService.error(error?.message);
        },
    });

    const { mutate: deleteAddress, isPending: isDeleting } = useMutation({
        mutationFn: AddressApi.deleteAddress,
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["user-addresses"],
            });
            ToastService.success(response.message);
        },
        onError: error => {
            ToastService.error(error?.message);
        },
    });

    const { mutate: setDefaultShipping, isPending: isSettingShipping } = useMutation({
        mutationFn: AddressApi.setDefaultShipping,
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["user-addresses"],
            });
            ToastService.success(response.message || "Default shipping address updated.");
        },

        onError: error => {
            ToastService.error(error?.message || "Failed to update shipping address.");
        },
    });

    const { mutate: setDefaultBilling, isPending: isSettingBilling } = useMutation({
        mutationFn: AddressApi.setDefaultBilling,
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["user-addresses"],
            });
            ToastService.success(response.message || "Default billing address updated.");
        },

        onError: error => {
            ToastService.error(error?.message || "Failed to update billing address.");
        },
    });

    const isPending = isCreating || isUpdating || isDeleting || isSettingShipping || isSettingBilling;

    const handleSubmit = (values: AddressFormSchemaValues) => {
        if (editingAddress) {
            updateAddress({
                addressId: editingAddress.id,
                values: {
                    fullName: values.fullName,
                    phoneNumber: values.phoneNumber,
                    addressLineOne: values.addressLineOne,
                    addressLineTwo: values.addressLineTwo,
                    city: values.city,
                    state: values.state,
                    country: values.country,
                    postalCode: values.postalCode,
                    addressType: values.addressType,
                },
            });

            return;
        }

        createAddress(values);
    };

    const handleAdd = () => {
        setEditingAddress(null);
        setShowForm(true);
    };

    const handleEdit = (address: Address) => {
        setEditingAddress(address);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingAddress(null);
    };

    const handleDelete = (address: Address) => {
        deleteAddress(address.id);
    };

    if (isLoading) {
        return <PageLoader />;
    }

    if (isError) {
        return <ErrorState message={error.message} />;
    }

    return (
        <section className="w-full space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Addresses</h1>
                    <p className="mt-2 text-muted-foreground">Manage your shipping and billing addresses.</p>
                </div>
                {!showForm && (
                    <Button type="button" onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Address
                    </Button>
                )}
            </div>

            {showForm && (
                <div className="rounded-2xl border bg-card p-5 shadow-sm md:p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">{editingAddress ? "Edit Address" : "Add New Address"}</h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {editingAddress ? "Update your saved address." : "Add a new shipping or billing address."}
                        </p>
                    </div>

                    <AddressForm address={editingAddress} isPending={isPending} onSubmit={handleSubmit} onCancel={handleCancel} />
                </div>
            )}

            {!showForm && addresses.length === 0 && (
                <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed bg-card p-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Plus className="h-6 w-6" />
                    </div>

                    <h2 className="mt-4 text-lg font-semibold">No addresses yet</h2>

                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">Add an address to make checkout faster and easier.</p>

                    <Button className="mt-5" onClick={handleAdd}>
                        Add Address
                    </Button>
                </div>
            )}

            {/* Address List */}
            {!showForm && addresses.length > 0 && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {addresses.map(address => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            isPending={isPending}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onDefaultShipping={address => setDefaultShipping(address.id)}
                            onDefaultBilling={address => setDefaultBilling(address.id)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Addresses;
