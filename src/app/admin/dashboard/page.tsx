'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Users, Ticket, TrendingUp, ArrowRight } from 'lucide-react';
import { eventsApi, usersApi } from '@/lib/api';
import { Card, Loading } from '@/components/ui';

interface DashboardStats {
    totalEvents: number;
    totalUsers: number;
    totalBookings: number;
    upcomingEvents: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalEvents: 0,
        totalUsers: 0,
        totalBookings: 0,
        upcomingEvents: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const [eventsRes, usersRes] = await Promise.all([
                eventsApi.getAll({ limit: 100 }),
                usersApi.getAll(),
            ]);

            const events = Array.isArray(eventsRes) ? eventsRes : (eventsRes.data || []);
            const users = Array.isArray(usersRes) ? usersRes : [];

            setStats({
                totalEvents: events.length,
                totalUsers: users.length,
                totalBookings: events.reduce((acc: number, e: any) => acc + (e.registeredCount || 0), 0),
                upcomingEvents: events.filter((e: any) => e.status === 'upcoming').length,
            });
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { title: 'กิจกรรมทั้งหมด', value: stats.totalEvents, icon: Calendar, color: 'bg-black' },
        { title: 'กิจกรรมใกล้มา', value: stats.upcomingEvents, icon: TrendingUp, color: 'bg-gray-800' },
        { title: 'ผู้ใช้ทั้งหมด', value: stats.totalUsers, icon: Users, color: 'bg-gray-700' },
        { title: 'การลงทะเบียน', value: stats.totalBookings, icon: Ticket, color: 'bg-gray-600' },
    ];

    return (
        <div className="p-6 md:p-8 bg-[#f5f5f5] min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">แดชบอร์ด</h1>
                <p className="text-gray-500">ภาพรวมระบบ</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loading size="lg" />
                </div>
            ) : (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statCards.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={stat.title} className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{stat.title}</p>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <Link href="/admin/events" className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-gray-700" />
                                        <span>จัดการอีเว้นท์</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-gray-400" />
                                </Link>
                                <Link href="/admin/users" className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-gray-700" />
                                        <span>จัดการผู้ใช้</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-gray-400" />
                                </Link>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลเพิ่มเติม</h2>
                            <p className="text-gray-600">
                                ยินดีต้อนรับสู่หน้าแดชบอร์ดผู้ดูแลระบบ คุณสามารถจัดการอีเว้นท์และผู้ใช้ได้จากเมนูด้านซ้าย
                            </p>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
}
