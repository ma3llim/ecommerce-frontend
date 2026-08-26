import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { AdminButtonSize, AdminButtonVariant } from "@/types/ButtonVariant.types";

interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: AdminButtonVariant;
    size?: AdminButtonSize;
    children: ReactNode;
}

const variantStyles: Record<AdminButtonVariant, string> = {
    primary: "bg-[var(--admin-primary)] text-[var(--admin-primary-foreground)] hover:bg-[var(--admin-primary)]/90",
    info: "bg-[var(--admin-info)] text-[var(--admin-info-foreground)] hover:bg-[var(--admin-info)]/90",
    accent: "bg-[var(--admin-accent)] text-[var(--admin-accent-foreground)] hover:bg-[var(--admin-accent)]/90",
    success: "bg-[var(--admin-success)] text-[var(--admin-success-foreground)] hover:bg-[var(--admin-success)]/90",
    danger: "bg-[var(--admin-danger)] text-[var(--admin-danger-foreground)] hover:bg-[var(--admin-danger)]/90",
    warning: "bg-[var(--admin-warning)] text-[var(--admin-warning-foreground)] hover:bg-[var(--admin-warning)]/90",
    teal: "bg-[var(--admin-teal)] text-[var(--admin-teal-foreground)] hover:bg-[var(--admin-teal)]/90",
    pink: "bg-[var(--admin-pink)] text-[var(--admin-pink-foreground)] hover:bg-[var(--admin-pink)]/90",
    secondary: "bg-[var(--admin-secondary)] text-[var(--admin-secondary-foreground)] hover:bg-[var(--admin-secondary)]/90",
};

const sizeStyles: Record<AdminButtonSize, string> = {
    xs: "h-7 rounded-md px-2 text-xs",
    sm: "h-8 rounded-md px-3 text-sm",
    md: "h-9 rounded-md px-4 text-sm",
    lg: "h-10 rounded-md px-5 text-base",
    xl: "h-11 rounded-lg px-6 text-base",
    icon: "h-9 w-9 rounded-md p-0",
};

export function AdminButton({ variant = "primary", className, size = "sm", children, ...props }: AdminButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
