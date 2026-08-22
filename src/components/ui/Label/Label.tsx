import { cn } from '@/utils/cn';
import type { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}

const Label = ({ children, required = false, className = '', ...props }: LabelProps) => {
    return (
        <label className={cn('mb-2 block text-sm font-medium text-text-secondary', className)} {...props}>
            {children}
            {required && (
                <span className="ml-1 text-danger" aria-hidden="true">
                    {' '}
                    *
                </span>
            )}
        </label>
    );
};

export default Label;
