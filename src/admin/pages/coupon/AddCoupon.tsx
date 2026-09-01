import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CouponForm from "@/admin/components/CouponForm";
import { Button } from "@/components/ui/button";
import type { CouponCreateRequest, CouponUpdateRequest } from "@/admin/types/Coupon.types";
import { CouponApi } from "@/admin/api/Coupon.api";
import { Helmet } from "react-helmet-async";

const AddCoupon = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: createCoupon, isPending } = useMutation({
        mutationFn: (data: CouponCreateRequest) => CouponApi.createCoupon(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["coupons"],
            });
            navigate("/admin/coupons");
        },
    });

    const handleSubmit = (data: CouponCreateRequest | CouponUpdateRequest) => {
        const payload = {
            ...data,
            validFrom: new Date(data.validFrom).toISOString(),
            validUntil: new Date(data.validUntil).toISOString(),
        };

        createCoupon(payload as CouponCreateRequest);
    };

    return (
        <>
            <Helmet>
                <title>Add Coupon | ecommerce</title>
                <meta name="description" content="Create a new discount coupon for the ecommerce store." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full">
                <div className="mb-6 flex items-center gap-3">
                    <Button type="button" variant="ghost" size="icon" onClick={() => navigate("/admin/coupons")}>
                        <ArrowLeft className="size-4" />
                    </Button>

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Add Coupon</h1>
                        <p className="text-sm text-muted-foreground">Create a new discount coupon.</p>
                    </div>
                </div>

                <CouponForm isPending={isPending} onSubmit={handleSubmit} onCancel={() => navigate("/admin/coupons")} />
            </div>
        </>
    );
};

export default AddCoupon;
