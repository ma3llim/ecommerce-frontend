import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type AdminButtonVariant = "primary" | "info" | "accent" | "success" | "danger";

interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: AdminButtonVariant;
    children: ReactNode;
}

const variantStyles: Record<AdminButtonVariant, string> = {
    primary: "bg-[var(--admin-primary)] text-[var(--admin-primary-foreground)] hover:bg-[var(--admin-primary)]/90",
    info: "bg-[var(--admin-info)] text-[var(--admin-info-foreground)] hover:bg-[var(--admin-info)]/90",
    accent: "bg-[var(--admin-accent)] text-[var(--admin-accent-foreground)] hover:bg-[var(--admin-accent)]/90",
    success: "bg-[var(--admin-success)] text-[var(--admin-success-foreground)] hover:bg-[var(--admin-success)]/90",
    danger: "bg-[var(--admin-danger)] text-[var(--admin-danger-foreground)] hover:bg-[var(--admin-danger)]/90",
};

export function AdminButton({ variant = "primary", className, children, ...props }: AdminButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                variantStyles[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
