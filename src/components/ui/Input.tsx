'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, id, ...props }, ref) => {
        return (
            <div className="space-y-1">
                {label && (
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={id}
                    className={cn(
                        'w-full px-4 py-3 rounded-lg border border-gray-200 bg-white',
                        'focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent',
                        'transition-all duration-200 placeholder:text-gray-400',
                        error && 'border-red-500 focus:ring-red-500',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
