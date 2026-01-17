'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { eventsApi } from '@/lib/api';
import { Button, Card, Loading } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import type { Event } from '@/types';

const DAYS = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const MONTHS = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    useEffect(() => {
        loadEvents();
    }, [year, month]);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const data = await eventsApi.getCalendar(year, month + 1);
            setEvents(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to load calendar events:', error);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const getEventsForDay = (day: number) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day &&
                eventDate.getMonth() === month &&
                eventDate.getFullYear() === year;
        });
    };

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            {/* Header */}
            <section className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-2xl font-bold text-gray-900">ปฏิทินอีเว้นท์</h1>
                    <p className="text-gray-500 mt-2">ดูกิจกรรมวิ่งทั้งหมดในรูปแบบปฏิทิน</p>
                </div>
            </section>

            {/* Calendar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="p-6">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-6">
                        <Button variant="ghost" onClick={prevMonth}>
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {MONTHS[month]} {year + 543}
                        </h2>
                        <Button variant="ghost" onClick={nextMonth}>
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loading size="lg" />
                        </div>
                    ) : (
                        <>
                            {/* Day Headers */}
                            <div className="grid grid-cols-7 mb-2">
                                {DAYS.map(day => (
                                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1">
                                {days.map((day, index) => {
                                    const dayEvents = day ? getEventsForDay(day) : [];
                                    const isToday = day &&
                                        new Date().getDate() === day &&
                                        new Date().getMonth() === month &&
                                        new Date().getFullYear() === year;

                                    return (
                                        <div
                                            key={index}
                                            className={`min-h-24 p-2 rounded-lg ${day ? 'bg-gray-50 hover:bg-gray-100' : ''
                                                } ${isToday ? 'ring-2 ring-black bg-black/5' : ''}`}
                                        >
                                            {day && (
                                                <>
                                                    <span className={`text-sm font-medium ${isToday ? 'text-black font-bold' : 'text-gray-900'
                                                        }`}>
                                                        {day}
                                                    </span>
                                                    <div className="mt-1 space-y-1">
                                                        {dayEvents.slice(0, 2).map(event => (
                                                            <Link key={event._id} href={`/events/${event._id}`}>
                                                                <div className="text-xs p-1 rounded bg-black text-white truncate hover:bg-gray-800 transition-colors">
                                                                    {event.title}
                                                                </div>
                                                            </Link>
                                                        ))}
                                                        {dayEvents.length > 2 && (
                                                            <div className="text-xs text-gray-500">
                                                                +{dayEvents.length - 2} กิจกรรม
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </Card>

                {/* Upcoming Events List */}
                {events.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            กิจกรรมในเดือนนี้
                        </h3>
                        <div className="space-y-3">
                            {events.map(event => (
                                <Link key={event._id} href={`/events/${event._id}`}>
                                    <Card hover className="p-4 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                                            {new Date(event.date).getDate()}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                                            <p className="text-sm text-gray-500">{event.location.name}</p>
                                        </div>
                                        <span className="text-sm text-gray-500">{event.category}</span>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
