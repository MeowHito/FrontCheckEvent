'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, X, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/lib/auth';
import { cn } from '@/lib/utils';

const menuItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'แดชบอร์ด' },
    { href: '/admin/events', icon: Calendar, label: 'จัดการอีเว้นท์' },
    { href: '/admin/users', icon: Users, label: 'จัดการผู้ใช้' },
];

export function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const { logout } = useAuthStore();

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className={cn('border-b border-gray-800 p-4', collapsed ? 'px-2' : '')}>
                <Link href="/admin/dashboard" className="flex items-center justify-center">
                    <Image
                        src="/logo-white.png"
                        alt="Action"
                        width={collapsed ? 40 : 120}
                        height={32}
                        className={collapsed ? 'h-6 w-auto' : 'h-8 w-auto'}
                    />
                </Link>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                                isActive
                                    ? 'bg-white text-black'
                                    : 'text-gray-400 hover:text-white hover:bg-white/10',
                                collapsed && 'justify-center'
                            )}
                            onClick={() => setMobileOpen(false)}
                        >
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800">
                <Link
                    href="/"
                    className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors mb-2',
                        collapsed && 'justify-center'
                    )}
                >
                    <Calendar className="h-5 w-5" />
                    {!collapsed && <span className="text-sm">ดูหน้าเว็บ</span>}
                </Link>
                <button
                    onClick={logout}
                    className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors',
                        collapsed && 'justify-center'
                    )}
                >
                    <LogOut className="h-5 w-5" />
                    {!collapsed && <span className="text-sm">ออกจากระบบ</span>}
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-lg"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={cn(
                    'md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a1a] flex flex-col transition-transform',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <button
                    onClick={() => setMobileOpen(false)}
                    className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white"
                >
                    <X className="h-5 w-5" />
                </button>
                <SidebarContent />
            </aside>

            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    'hidden md:flex flex-col bg-[#1a1a1a] transition-all duration-300',
                    collapsed ? 'w-16' : 'w-64'
                )}
            >
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute top-4 left-4 p-1 text-gray-400 hover:text-white z-10 hidden"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <SidebarContent />
            </aside>
        </>
    );
}
