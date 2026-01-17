'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline';
    hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
        const variants = {
            default: 'bg-white shadow-sm',
            outline: 'bg-white border border-gray-200',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-xl overflow-hidden',
                    variants[variant],
                    hover && 'card-hover cursor-pointer',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('p-5', className)} {...props} />
    )
);
CardHeader.displayName = 'CardHeader';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('p-5 pt-0', className)} {...props} />
    )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('p-5 pt-0 flex items-center', className)} {...props} />
    )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };
