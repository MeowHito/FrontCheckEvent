import { cn } from '@/lib/utils';

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function Loading({ size = 'md', className }: LoadingProps) {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    return (
        <div className={cn('flex items-center justify-center', className)}>
            <div
                className={cn(
                    'animate-spin rounded-full border-2 border-gray-200 border-t-orange-500',
                    sizes[size]
                )}
            />
        </div>
    );
}

export function LoadingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
            <div className="text-center">
                <Loading size="lg" />
                <p className="mt-4 text-gray-600">กำลังโหลด...</p>
            </div>
        </div>
    );
}

export function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'animate-pulse bg-gray-200 rounded-lg',
                className
            )}
        />
    );
}
