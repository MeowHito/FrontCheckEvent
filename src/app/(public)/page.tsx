'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Calendar, MapPin, Users, ChevronDown } from 'lucide-react';
import { eventsApi } from '@/lib/api';
import { Button, Card, CardContent } from '@/components/ui';
import { formatDate, formatPrice } from '@/lib/utils';
import type { Event } from '@/types';

const categories = ['5K', '10K', 'Half Marathon', 'Full Marathon', 'Trail', 'Fun Run'];
const provinces = ['กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต', 'ชลบุรี', 'ขอนแก่น', 'นครราชสีมา'];

export default function HomePage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [search, setSearch] = useState('');

    // Dropdown states
    const [provinceOpen, setProvinceOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);

    useEffect(() => {
        loadEvents();
    }, [selectedCategory]);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const response = await eventsApi.getAll({
                status: 'upcoming',
                category: selectedCategory || undefined,
                limit: 8
            });
            setEvents(Array.isArray(response) ? response : (response.data || []));
        } catch (error) {
            console.error('Failed to load events:', error);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const FilterDropdown = ({
        label,
        value,
        options,
        isOpen,
        setIsOpen,
        onSelect,
        placeholder = 'ค้นหา'
    }: {
        label: string;
        value: string;
        options: string[];
        isOpen: boolean;
        setIsOpen: (open: boolean) => void;
        onSelect: (value: string) => void;
        placeholder?: string;
    }) => {
        const [searchTerm, setSearchTerm] = useState('');
        const filteredOptions = options.filter(opt =>
            opt.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-center w-full"
                >
                    <span className="block text-sm font-medium text-gray-900 hover:underline underline-offset-4">
                        {label}
                    </span>
                </button>

                {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                        <div className="p-3 border-b border-gray-100">
                            <input
                                type="text"
                                placeholder={placeholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 text-sm border-b border-gray-200 focus:outline-none focus:border-black"
                            />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {filteredOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        onSelect(option);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${value === option ? 'bg-gray-100' : ''
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            {/* Filter Section */}
            <section className="watermark-bg min-h-[60vh] flex items-center justify-center relative">
                <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                        <FilterDropdown
                            label="เลือกจังหวัด"
                            value={selectedProvince}
                            options={provinces}
                            isOpen={provinceOpen}
                            setIsOpen={(open) => {
                                setProvinceOpen(open);
                                if (open) setCategoryOpen(false);
                            }}
                            onSelect={setSelectedProvince}
                        />

                        <FilterDropdown
                            label="เลือกประเภทการแข่งขัน"
                            value={selectedCategory}
                            options={categories}
                            isOpen={categoryOpen}
                            setIsOpen={(open) => {
                                setCategoryOpen(open);
                                if (open) setProvinceOpen(false);
                            }}
                            onSelect={setSelectedCategory}
                        />

                        <div className="text-center">
                            <button className="text-sm font-medium text-gray-900 hover:underline underline-offset-4">
                                เลือกวันที่
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => loadEvents()}
                                className="text-sm font-medium text-gray-900 hover:underline underline-offset-4"
                            >
                                ค้นหาอีเว้นท์
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">อีเว้นท์ทั้งหมด</h2>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
                            ))}
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500">ไม่พบกิจกรรม</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {events.map((event) => (
                                <Link key={event._id} href={`/events/${event._id}`}>
                                    <Card hover variant="outline" className="h-full">
                                        <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                                            {event.image ? (
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-4xl">🏃</span>
                                            )}
                                        </div>
                                        <CardContent className="pt-4">
                                            <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2">
                                                {event.title}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(event.date)}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {event.location.name}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link href="/events">
                            <Button variant="outline" size="lg">
                                ดูอีเว้นท์ทั้งหมด
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
