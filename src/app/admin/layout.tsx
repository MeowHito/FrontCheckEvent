'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AdminSidebar } from '@/components/layout';
import { useAuthStore } from '@/lib/auth';
import { LoadingPage } from '@/components/ui';
import { UserRole } from '@/types';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuthStore();

    useEffect(() => {
        if (!isLoading && (!isAuthenticated || user?.role !== UserRole.ADMIN)) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, user, router]);

    if (isLoading) {
        return <LoadingPage />;
    }

    if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
        return <LoadingPage />;
    }

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 bg-gray-50 overflow-auto">
                {children}
            </main>
        </div>
    );
}
