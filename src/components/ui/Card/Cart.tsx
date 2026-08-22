import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const Card = ({ children, className = '', ...props }: CardProps) => {
    return (
        <div className={clsx('rounded-xl', 'border border-border', 'bg-surface', 'shadow-card', className)} {...props}>
            {children}
        </div>
    );
};

export default Card;
