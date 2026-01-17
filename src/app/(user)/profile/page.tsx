'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Phone, Shield, Save, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/lib/auth';
import { usersApi } from '@/lib/api';
import { Button, Card, Input } from '@/components/ui';
import { UserRole } from '@/types';

export default function ProfilePage() {
    const router = useRouter();
    const { user, isAuthenticated, logout, fetchProfile } = useAuthStore();
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: user?.name || '',
            phone: user?.phone || '',
        },
    });

    if (!isAuthenticated || !user) {
        router.push('/login?redirect=/profile');
        return null;
    }

    const onSubmit = async (data: { name: string; phone: string }) => {
        try {
            setSaving(true);
            setMessage(null);
            await usersApi.update(user._id, data);
            await fetchProfile();
            setEditing(false);
            setMessage({ type: 'success', text: 'อัปเดตข้อมูลสำเร็จ' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'เกิดข้อผิดพลาด' });
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        reset({ name: user.name, phone: user.phone || '' });
        setEditing(false);
        setMessage(null);
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            {/* Header */}
            <section className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        กลับหน้าหลัก
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">โปรไฟล์ของฉัน</h1>
                    <p className="text-gray-500 mt-2">ดูและแก้ไขข้อมูลส่วนตัว</p>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="p-8">
                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b">
                        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                            <span className={`inline-flex items-center px-2 py-1 text-xs rounded mt-1 ${user.role === UserRole.ADMIN ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
                                }`}>
                                <Shield className="h-3 w-3 mr-1" />
                                {user.role === UserRole.ADMIN ? 'ผู้ดูแลระบบ' : 'สมาชิก'}
                            </span>
                        </div>
                    </div>

                    {/* Messages */}
                    {message && (
                        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success'
                                ? 'bg-green-50 text-green-600 border border-green-200'
                                : 'bg-red-50 text-red-600 border border-red-200'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User className="h-4 w-4 inline mr-2" />ชื่อ-นามสกุล
                                </label>
                                {editing ? (
                                    <Input {...register('name')} placeholder="ชื่อ-นามสกุล" />
                                ) : (
                                    <p className="py-3 px-4 bg-gray-50 rounded-lg">{user.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="h-4 w-4 inline mr-2" />อีเมล
                                </label>
                                <p className="py-3 px-4 bg-gray-100 rounded-lg text-gray-500">{user.email}</p>
                                <p className="text-xs text-gray-400 mt-1">ไม่สามารถเปลี่ยนแปลงได้</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="h-4 w-4 inline mr-2" />เบอร์โทรศัพท์
                                </label>
                                {editing ? (
                                    <Input {...register('phone')} placeholder="เบอร์โทรศัพท์" />
                                ) : (
                                    <p className="py-3 px-4 bg-gray-50 rounded-lg">{user.phone || '-'}</p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-6 border-t">
                            {editing ? (
                                <>
                                    <Button type="button" variant="outline" onClick={handleCancel}>ยกเลิก</Button>
                                    <Button type="submit" isLoading={saving}>
                                        <Save className="h-4 w-4 mr-2" />บันทึก
                                    </Button>
                                </>
                            ) : (
                                <Button type="button" onClick={() => setEditing(true)}>แก้ไขข้อมูล</Button>
                            )}
                        </div>
                    </form>
                </Card>

                {/* Logout */}
                <Card className="p-6 mt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">ออกจากระบบ</p>
                            <p className="text-sm text-gray-500">คุณจะถูกนำออกจากระบบ</p>
                        </div>
                        <Button variant="danger" onClick={() => { logout(); router.push('/'); }}>
                            ออกจากระบบ
                        </Button>
                    </div>
                </Card>
            </section>
        </div>
    );
}
