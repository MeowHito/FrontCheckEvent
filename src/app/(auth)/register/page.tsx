'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/lib/auth';
import { Button, Input, Card } from '@/components/ui';

const registerSchema = z.object({
    name: z.string().min(2, 'กรุณากรอกชื่อ'),
    email: z.string().email('อีเมลไม่ถูกต้อง'),
    phone: z.string().optional(),
    password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'รหัสผ่านไม่ตรงกัน',
    path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const { register: registerUser, isLoading } = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setError('');
            await registerUser(data.name, data.email, data.password, data.phone);
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center py-12 px-4">
            {/* Logo */}
            <div className="mb-8">
                <Link href="/">
                    <Image
                        src="/logo-black.png"
                        alt="Action"
                        width={160}
                        height={48}
                        className="h-12 w-auto"
                    />
                </Link>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">สมัครสมาชิก</h1>
            <p className="text-gray-500 mb-8">สร้างบัญชีใหม่เพื่อลงทะเบียนอีเว้นท์</p>

            <Card className="p-8 w-full max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                        <Input
                            {...register('name')}
                            placeholder="ชื่อ-นามสกุล"
                            className="pl-12"
                            error={errors.name?.message}
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                        <Input
                            {...register('email')}
                            type="email"
                            placeholder="อีเมล"
                            className="pl-12"
                            error={errors.email?.message}
                        />
                    </div>

                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                        <Input
                            {...register('phone')}
                            placeholder="เบอร์โทรศัพท์ (ไม่บังคับ)"
                            className="pl-12"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                        <Input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="รหัสผ่าน"
                            className="pl-12 pr-12"
                            error={errors.password?.message}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                        <Input
                            {...register('confirmPassword')}
                            type="password"
                            placeholder="ยืนยันรหัสผ่าน"
                            className="pl-12"
                            error={errors.confirmPassword?.message}
                        />
                    </div>

                    <div className="flex items-start gap-2 pt-2">
                        <input type="checkbox" className="mt-1 rounded border-gray-300 text-black focus:ring-black" required />
                        <span className="text-sm text-gray-600">
                            ฉันยอมรับ{' '}
                            <Link href="/terms" className="text-black hover:underline">
                                ข้อตกลงและเงื่อนไข
                            </Link>{' '}
                            และ{' '}
                            <Link href="/privacy" className="text-black hover:underline">
                                นโยบายความเป็นส่วนตัว
                            </Link>
                        </span>
                    </div>

                    <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                        สมัครสมาชิก
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    มีบัญชีอยู่แล้ว?{' '}
                    <Link href="/login" className="text-black font-medium hover:underline">
                        เข้าสู่ระบบ
                    </Link>
                </div>
            </Card>
        </div>
    );
}
