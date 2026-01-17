'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/lib/auth';
import { Button, Input, Card, Loading } from '@/components/ui';

const loginSchema = z.object({
    email: z.string().email('อีเมลไม่ถูกต้อง'),
    password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, isLoading } = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError('');
            await login(data.email, data.password);
            const redirect = searchParams.get('redirect') || '/';
            router.push(redirect);
        } catch (err: any) {
            setError(err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        }
    };

    return (
        <Card className="p-8 w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                    </div>
                )}

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

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
                        <span className="text-gray-600">จดจำฉัน</span>
                    </label>
                    <Link href="/forgot-password" className="text-gray-600 hover:text-black hover:underline">
                        ลืมรหัสผ่าน?
                    </Link>
                </div>

                <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                    เข้าสู่ระบบ
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
                ยังไม่มีบัญชี?{' '}
                <Link href="/register" className="text-black font-medium hover:underline">
                    สมัครสมาชิก
                </Link>
            </div>
        </Card>
    );
}

export default function LoginPage() {
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

            <h1 className="text-2xl font-bold text-gray-900 mb-2">เข้าสู่ระบบ</h1>
            <p className="text-gray-500 mb-8">ยินดีต้อนรับกลับ</p>

            <Suspense fallback={<div className="p-8"><Loading /></div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
