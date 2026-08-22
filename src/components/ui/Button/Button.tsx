import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary/30',
    secondary: 'bg-surface-secondary text-text-primary hover:bg-border focus-visible:ring-primary/20',
    outline: 'border border-border bg-transparent text-text-primary hover:bg-surface-secondary focus-visible:ring-primary/20',
    ghost: 'bg-transparent text-text-secondary hover:bg-surface-secondary hover:text-text-primary focus-visible:ring-primary/20',
    danger: 'bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger/30',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-5 text-base',
};

const Button = ({ children, variant = 'primary', size = 'sm', loading, disabled = false, fullWidth, className = '', ...props }: ButtonProps) => {
    return (
        <button
            type="button"
            disabled={disabled || loading}
            className={cn(
                'inline-flex items-center justify-center gap-2',
                'rounded-lg',
                'font-medium',
                'transition-colors duration-200',
                'outline-none',
                'focus-visible:ring-2',
                'disabled:pointer-events-none disabled:opacity-50',
                sizeClasses[size],
                variantClasses[variant],
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            {loading && <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />}
            {children}
        </button>
    );
};

export default Button;
