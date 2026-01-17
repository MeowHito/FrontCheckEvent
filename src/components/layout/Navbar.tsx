'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, User, Calendar, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuthStore();

    const navLinks = [
        { href: '/events', label: 'อีเว้นท์ทั้งหมด' },
        { href: '/calendar', label: 'ปฏิทินอีเว้นท์' },
        { href: '/contact', label: 'ติดต่อเรา' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo-black.png"
                            alt="Action"
                            width={120}
                            height={32}
                            className="h-8 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'text-sm font-medium transition-colors',
                                    isActive(link.href)
                                        ? 'text-black'
                                        : 'text-gray-500 hover:text-black'
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated && user ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black transition-colors">
                                    <span>{user.name}</span>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                                    <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                                        <Link
                                            href="/profile"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>โปรไฟล์</span>
                                        </Link>
                                        <Link
                                            href="/bookings"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <Calendar className="h-4 w-4" />
                                            <span>การจองของฉัน</span>
                                        </Link>
                                        {user.role === UserRole.ADMIN && (
                                            <Link
                                                href="/admin/dashboard"
                                                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                <LayoutDashboard className="h-4 w-4" />
                                                <span>แดชบอร์ดผู้ดูแล</span>
                                            </Link>
                                        )}
                                        <hr className="my-2" />
                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>ออกจากระบบ</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                                >
                                    เข้าสู่ระบบ
                                </Link>
                                <Link
                                    href="/help"
                                    className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                                >
                                    บริการช่วยเหลือ
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    'block px-4 py-3 text-sm font-medium rounded-lg',
                                    isActive(link.href)
                                        ? 'text-black bg-gray-50'
                                        : 'text-gray-500 hover:bg-gray-50'
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <hr className="my-3" />
                        {isAuthenticated && user ? (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                >
                                    โปรไฟล์
                                </Link>
                                <Link
                                    href="/bookings"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                >
                                    การจองของฉัน
                                </Link>
                                {user.role === UserRole.ADMIN && (
                                    <Link
                                        href="/admin/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                    >
                                        แดชบอร์ดผู้ดูแล
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    ออกจากระบบ
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                >
                                    เข้าสู่ระบบ
                                </Link>
                                <Link
                                    href="/help"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                >
                                    บริการช่วยเหลือ
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
