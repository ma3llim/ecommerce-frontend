import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    size?: SpinnerSize;
}

const sizeClasses: Record<SpinnerSize, string> = {
    sm: 'size-4 border-2',
    md: 'size-5 border-2',
    lg: 'size-8 border-[3px]',
};

const Spinner = ({ size = 'md', className = '', ...props }: SpinnerProps) => {
    return (
        <span
            role="status"
            aria-label="Loading"
            className={clsx('inline-block animate-spin rounded-full', 'border-current border-t-transparent', sizeClasses[size], className)}
            {...props}
        />
    );
};

export default Spinner;
