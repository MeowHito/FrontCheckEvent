'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { eventsApi } from '@/lib/api';
import { Button, Card, CardContent, Loading } from '@/components/ui';
import { formatDate, formatPrice } from '@/lib/utils';
import type { Event } from '@/types';

const categories = ['5K', '10K', 'Half Marathon', 'Full Marathon', 'Trail', 'Fun Run'];
const provinces = ['กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต', 'ชลบุรี', 'ขอนแก่น', 'นครราชสีมา'];

function EventsContent() {
    const searchParams = useSearchParams();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

    // Filter states
    const [provinceOpen, setProvinceOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        province: '',
    });

    useEffect(() => {
        loadEvents();
    }, [pagination.page, filters.category]);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const response = await eventsApi.getAll({
                search: filters.search || undefined,
                category: filters.category || undefined,
                page: pagination.page,
                limit: 12,
            });

            if (Array.isArray(response)) {
                setEvents(response);
                setPagination({ page: 1, totalPages: 1, total: response.length });
            } else {
                setEvents(response.data || []);
                setPagination({
                    page: response.page || 1,
                    totalPages: response.totalPages || 1,
                    total: response.total || 0,
                });
            }
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
        onSelect
    }: {
        label: string;
        value: string;
        options: string[];
        isOpen: boolean;
        setIsOpen: (open: boolean) => void;
        onSelect: (value: string) => void;
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
                    <span className={`block text-sm font-medium hover:underline underline-offset-4 ${value ? 'text-black underline' : 'text-gray-900'}`}>
                        {value || label}
                    </span>
                </button>

                {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                        <div className="p-3 border-b border-gray-100">
                            <input
                                type="text"
                                placeholder="ค้นหา"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 text-sm border-b border-gray-200 focus:outline-none focus:border-black"
                            />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            <button
                                onClick={() => {
                                    onSelect('');
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50"
                            >
                                ทั้งหมด
                            </button>
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
        <>
            {/* Filter Section */}
            <section className="watermark-bg min-h-[50vh] flex items-center justify-center relative">
                <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                        <FilterDropdown
                            label="เลือกจังหวัด"
                            value={filters.province}
                            options={provinces}
                            isOpen={provinceOpen}
                            setIsOpen={(open) => {
                                setProvinceOpen(open);
                                if (open) setCategoryOpen(false);
                            }}
                            onSelect={(val) => setFilters(prev => ({ ...prev, province: val }))}
                        />

                        <FilterDropdown
                            label="เลือกประเภทการแข่งขัน"
                            value={filters.category}
                            options={categories}
                            isOpen={categoryOpen}
                            setIsOpen={(open) => {
                                setCategoryOpen(open);
                                if (open) setProvinceOpen(false);
                            }}
                            onSelect={(val) => setFilters(prev => ({ ...prev, category: val }))}
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
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loading size="lg" />
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">ไม่พบกิจกรรม</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-600 mb-6">พบ {pagination.total} กิจกรรม</p>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {events.map((event) => (
                                    <Link key={event._id} href={`/events/${event._id}`}>
                                        <Card hover variant="outline" className="h-full">
                                            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center overflow-hidden">
                                                {event.image ? (
                                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-4xl">🏃</span>
                                                )}
                                            </div>
                                            <CardContent className="pt-4">
                                                <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2">
                                                    {event.title}
                                                </h3>
                                                <div className="space-y-1 text-xs text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>{formatDate(event.date)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        <span className="line-clamp-1">{event.location.name}</span>
                                                    </div>
                                                </div>
                                                <p className="mt-2 font-semibold text-black">
                                                    {formatPrice(event.price)}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            {pagination.totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-12">
                                    <Button
                                        variant="outline"
                                        disabled={pagination.page === 1}
                                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="px-4 text-gray-600 text-sm">
                                        หน้า {pagination.page} จาก {pagination.totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        disabled={pagination.page === pagination.totalPages}
                                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            <Suspense fallback={<div className="flex justify-center py-20"><Loading size="lg" /></div>}>
                <EventsContent />
            </Suspense>
        </div>
    );
}
