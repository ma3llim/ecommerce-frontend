import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ApplyCouponRequest } from "@/client/types/Coupon.types";
import type { CouponCodeResponse } from "@/client/types/Cart.types";
import { couponSchema } from "@/client/validation/CouponSchema";

interface CouponCardProps {
    couponResult: CouponCodeResponse | null;
    isApplyingCoupon: boolean;
    onApplyCoupon: (values: ApplyCouponRequest) => void;
}

const CouponCard = ({ couponResult, isApplyingCoupon, onApplyCoupon }: CouponCardProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ApplyCouponRequest>({
        resolver: yupResolver(couponSchema),
        defaultValues: {
            code: "",
        },
    });

    return (
        <section className="rounded-xl border bg-card p-5">
            <h2 className="text-xl font-semibold">Coupon</h2>
            <p className="mt-1 text-sm text-muted-foreground">Have a coupon code? Apply it here.</p>
            <form onSubmit={handleSubmit(onApplyCoupon)} className="mt-4">
                <div className="flex gap-2">
                    <Input {...register("code")} placeholder="Enter coupon code" disabled={isApplyingCoupon || !!couponResult} className="uppercase" />
                    <Button type="submit" disabled={isApplyingCoupon || !!couponResult}>
                        {isApplyingCoupon ? "Applying..." : couponResult ? "Applied" : "Apply"}
                    </Button>
                </div>
                {errors.code && <p className="mt-2 text-sm text-destructive">{errors.code.message}</p>}
            </form>
        </section>
    );
};

export default CouponCard;
