'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, Users, Clock, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { eventsApi, bookingsApi } from '@/lib/api';
import { useAuthStore } from '@/lib/auth';
import { Button, Card, Loading, Modal } from '@/components/ui';
import { formatDate, formatPrice } from '@/lib/utils';
import type { Event } from '@/types';

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [bookingResult, setBookingResult] = useState<{ success: boolean; message: string } | null>(null);

    useEffect(() => {
        if (params.id) {
            loadEvent();
        }
    }, [params.id]);

    const loadEvent = async () => {
        try {
            setLoading(true);
            const data = await eventsApi.getOne(params.id as string);
            setEvent(data);
        } catch (error) {
            console.error('Failed to load event:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!isAuthenticated) {
            router.push(`/login?redirect=/events/${params.id}`);
            return;
        }

        try {
            setBooking(true);
            await bookingsApi.create(params.id as string);
            setBookingResult({ success: true, message: 'ลงทะเบียนสำเร็จ!' });
            loadEvent();
        } catch (error: any) {
            setBookingResult({
                success: false,
                message: error.response?.data?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่',
            });
        } finally {
            setBooking(false);
            setShowResult(true);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
                <Loading size="lg" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500 text-lg mb-4">ไม่พบกิจกรรม</p>
                    <Link href="/events">
                        <Button variant="outline">กลับไปหน้าอีเว้นท์</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const isFull = event.registeredCount >= event.capacity;
    const isCompleted = event.status === 'completed';

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/events" className="inline-flex items-center text-sm text-gray-600 hover:text-black">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        กลับไปหน้าอีเว้นท์
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Image */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="aspect-video bg-gray-100 flex items-center justify-center">
                                {event.image ? (
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-6xl">🏃</span>
                                )}
                            </div>
                        </div>

                        {/* Details */}
                        <Card className="mt-6 p-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h1>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Calendar className="h-5 w-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">วันที่</p>
                                        <p className="font-medium">{formatDate(event.date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Clock className="h-5 w-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">เวลา</p>
                                        <p className="font-medium">{event.startTime} {event.endTime && `- ${event.endTime}`}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <MapPin className="h-5 w-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">สถานที่</p>
                                        <p className="font-medium">{event.location.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Users className="h-5 w-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">ผู้เข้าร่วม</p>
                                        <p className="font-medium">{event.registeredCount} / {event.capacity} คน</p>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-6" />

                            <div>
                                <h2 className="text-lg font-semibold mb-3">รายละเอียด</h2>
                                <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
                            </div>

                            {event.location.address && (
                                <>
                                    <hr className="my-6" />
                                    <div>
                                        <h2 className="text-lg font-semibold mb-3">ที่อยู่</h2>
                                        <p className="text-gray-600">{event.location.address}</p>
                                    </div>
                                </>
                            )}
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div>
                        <Card className="p-6 sticky top-24">
                            <div className="mb-6">
                                <span className="text-sm text-gray-500">ค่าลงทะเบียน</span>
                                <p className="text-3xl font-bold text-black">{formatPrice(event.price)}</p>
                            </div>

                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600">ผู้เข้าร่วมแล้ว</span>
                                    <span className="font-medium">{event.registeredCount} คน</span>
                                </div>
                                <div className="flex justify-between text-sm mb-3">
                                    <span className="text-gray-600">เหลือที่ว่าง</span>
                                    <span className="font-medium">{event.capacity - event.registeredCount} คน</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-black h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {isCompleted ? (
                                <Button className="w-full" disabled>
                                    กิจกรรมสิ้นสุดแล้ว
                                </Button>
                            ) : isFull ? (
                                <Button className="w-full" disabled>
                                    เต็มแล้ว
                                </Button>
                            ) : (
                                <Button className="w-full" onClick={handleBooking} isLoading={booking}>
                                    ลงทะเบียน
                                </Button>
                            )}

                            {!isAuthenticated && (
                                <p className="text-xs text-gray-500 text-center mt-4">
                                    * กรุณาเข้าสู่ระบบก่อนลงทะเบียน
                                </p>
                            )}
                        </Card>
                    </div>
                </div>
            </div>

            {/* Result Modal */}
            <Modal isOpen={showResult} onClose={() => setShowResult(false)} title="">
                <div className="text-center py-4">
                    {bookingResult?.success ? (
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    ) : (
                        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    )}
                    <h3 className="text-lg font-semibold mb-2">
                        {bookingResult?.success ? 'สำเร็จ!' : 'เกิดข้อผิดพลาด'}
                    </h3>
                    <p className="text-gray-600 mb-6">{bookingResult?.message}</p>
                    {bookingResult?.success ? (
                        <Link href="/bookings">
                            <Button>ดูการจองของฉัน</Button>
                        </Link>
                    ) : (
                        <Button variant="outline" onClick={() => setShowResult(false)}>
                            ปิด
                        </Button>
                    )}
                </div>
            </Modal>
        </div>
    );
}
