import { cn } from '@/utils/cn';
import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const Card = ({ children, className = '', ...props }: CardProps) => {
    return (
        <div className={cn('rounded-xl', 'border border-border', 'bg-surface', 'shadow-card', className)} {...props}>
            {children}
        </div>
    );
};

export default Card;
