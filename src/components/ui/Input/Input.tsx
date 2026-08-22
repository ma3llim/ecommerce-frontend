import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const Input = ({ error, className = '', id, ...props }: InputProps) => {
    return (
        <div className="w-full">
            <input
                id={id}
                className={clsx(
                    'w-full rounded-lg border',
                    'bg-surface text-text-primary',
                    'placeholder:text-text-muted',
                    'px-3 py-2.5',
                    'text-sm',
                    'outline-none',
                    'transition-colors duration-200',
                    error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border focus:border-primary focus:ring-primary/20',
                    'focus:ring-2',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
            />

            {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
        </div>
    );
};

export default Input;
