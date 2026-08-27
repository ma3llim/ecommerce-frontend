import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CouponForm from "@/admin/components/CouponForm";
import { Button } from "@/components/ui/button";
import PageLoader from "@/components/common/PageLoader";
import { CouponApi } from "@/admin/api/Coupon.api";
import type { CouponCreateRequest, CouponUpdateRequest } from "@/admin/types/Coupon.types";
import { Helmet } from "react-helmet-async";

const EditCoupon = () => {
    const { couponId } = useParams<{ couponId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: coupon, isLoading } = useQuery({
        queryKey: ["coupon", couponId],
        queryFn: () => CouponApi.getCoupon(couponId!),
        enabled: !!couponId,
    });

    const { mutate: updateCoupon, isPending } = useMutation({
        mutationFn: (data: CouponUpdateRequest) => CouponApi.updateCoupon(couponId!, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["coupons"],
            });
            queryClient.invalidateQueries({
                queryKey: ["coupon", couponId],
            });
            navigate("/admin/coupons");
        },
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (!coupon) {
        return <div className="p-6">Coupon not found.</div>;
    }

    const handleSubmit = (data: CouponCreateRequest | CouponUpdateRequest) => {
        const payload = {
            ...data,
            validFrom: new Date(data.validFrom).toISOString(),
            validUntil: new Date(data.validUntil).toISOString(),
        };

        updateCoupon(payload as CouponCreateRequest);
    };

    return (
        <>
            <Helmet>
                <title>Edit Coupon | ecommerce</title>
                <meta name="description" content="Update coupon information, validity, discount, and usage settings." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full">
                <div className="mb-6 flex items-center gap-3">
                    <Button type="button" variant="ghost" size="icon" onClick={() => navigate("/admin/coupons")}>
                        <ArrowLeft className="size-4" />
                    </Button>

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Edit Coupon</h1>

                        <p className="text-sm text-muted-foreground">Update coupon configuration.</p>
                    </div>
                </div>

                <CouponForm initialData={coupon} isPending={isPending} onSubmit={handleSubmit} onCancel={() => navigate("/admin/coupons")} />
            </div>
        </>
    );
};

export default EditCoupon;
