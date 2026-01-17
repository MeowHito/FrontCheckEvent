'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Ticket, X } from 'lucide-react';
import { bookingsApi } from '@/lib/api';
import { useAuthStore } from '@/lib/auth';
import { Button, Card, Loading, Modal } from '@/components/ui';
import { formatDate, formatPrice } from '@/lib/utils';
import type { Booking, Event } from '@/types';

export default function BookingsPage() {
    const { isAuthenticated } = useAuthStore();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            loadBookings();
        }
    }, [isAuthenticated]);

    const loadBookings = async () => {
        try {
            setLoading(true);
            const data = await bookingsApi.getAll();
            setBookings(data);
        } catch (error) {
            console.error('Failed to load bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setShowCancelModal(true);
    };

    const handleCancelConfirm = async () => {
        if (!selectedBooking) return;
        try {
            setCancellingId(selectedBooking._id);
            await bookingsApi.cancel(selectedBooking._id);
            loadBookings();
            setShowCancelModal(false);
        } catch (error) {
            console.error('Failed to cancel booking:', error);
        } finally {
            setCancellingId(null);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">กรุณาเข้าสู่ระบบ</h1>
                    <Link href="/login?redirect=/bookings">
                        <Button>เข้าสู่ระบบ</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            {/* Header */}
            <section className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-2xl font-bold text-gray-900">การจองของฉัน</h1>
                    <p className="text-gray-500 mt-2">ดูและจัดการการจองกิจกรรมของคุณ</p>
                </div>
            </section>

            {/* Bookings List */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loading size="lg" />
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 mb-6">ยังไม่มีการจอง</p>
                        <Link href="/events">
                            <Button>ดูอีเว้นท์ทั้งหมด</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => {
                            const event = booking.event as Event;
                            return (
                                <Card key={booking._id} className="p-6">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full md:w-24 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-3xl">🏃</span>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        {event?.title || 'กิจกรรม'}
                                                    </h3>
                                                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4" />
                                                            <span>{event?.date ? formatDate(event.date) : '-'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="h-4 w-4" />
                                                            <span>{event?.location?.name || '-'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Ticket className="h-4 w-4" />
                                                            <span>หมายเลข: {booking.registrationNumber}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <span className={`px-3 py-1 text-sm rounded-full ${booking.status === 'confirmed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : booking.status === 'cancelled'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {booking.status === 'pending' && 'รอยืนยัน'}
                                                    {booking.status === 'confirmed' && 'ยืนยันแล้ว'}
                                                    {booking.status === 'cancelled' && 'ยกเลิก'}
                                                </span>
                                            </div>

                                            <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                                <span className="font-semibold text-black">
                                                    {event?.price ? formatPrice(event.price) : '-'}
                                                </span>
                                                <div className="flex gap-2">
                                                    {event && (
                                                        <Link href={`/events/${event._id}`}>
                                                            <Button variant="outline" size="sm">ดูรายละเอียด</Button>
                                                        </Link>
                                                    )}
                                                    {booking.status !== 'cancelled' && (
                                                        <Button variant="ghost" size="sm" onClick={() => handleCancelClick(booking)}>
                                                            ยกเลิก
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Cancel Modal */}
            <Modal isOpen={showCancelModal} onClose={() => setShowCancelModal(false)} title="ยืนยันการยกเลิก">
                <div className="text-center py-4">
                    <p className="text-gray-600 mb-6">คุณต้องการยกเลิกการจองนี้ใช่หรือไม่?</p>
                    <div className="flex gap-3 justify-center">
                        <Button variant="outline" onClick={() => setShowCancelModal(false)}>ไม่ใช่</Button>
                        <Button variant="danger" onClick={handleCancelConfirm} isLoading={cancellingId === selectedBooking?._id}>
                            ยืนยันยกเลิก
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
