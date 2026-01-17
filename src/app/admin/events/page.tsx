'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { eventsApi } from '@/lib/api';
import { Button, Card, Loading, Modal, Input } from '@/components/ui';
import { formatDate, formatPrice } from '@/lib/utils';
import type { Event, EventCategory, CreateEventForm } from '@/types';

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [saving, setSaving] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
    const [deleting, setDeleting] = useState(false);

    const [formData, setFormData] = useState<CreateEventForm>({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: { name: '', address: '', lat: 0, lng: 0 },
        category: 'Fun Run' as EventCategory,
        capacity: 100,
        price: 0,
        image: '',
    });

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const response = await eventsApi.getAll({ limit: 100 });
            const data = Array.isArray(response) ? response : (response.data || []);
            setEvents(data);
        } catch (error) {
            console.error('Failed to load events:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleCreate = () => {
        setEditingEvent(null);
        setFormData({
            title: '', description: '', date: '', startTime: '', endTime: '',
            location: { name: '', address: '', lat: 0, lng: 0 },
            category: 'Fun Run' as EventCategory, capacity: 100, price: 0, image: '',
        });
        setShowModal(true);
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date.split('T')[0],
            startTime: event.startTime,
            endTime: event.endTime || '',
            location: event.location,
            category: event.category,
            capacity: event.capacity,
            price: event.price,
            image: event.image || '',
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            if (editingEvent) {
                await eventsApi.update(editingEvent._id, formData);
            } else {
                await eventsApi.create(formData);
            }
            setShowModal(false);
            loadEvents();
        } catch (error) {
            console.error('Failed to save event:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteClick = (event: Event) => {
        setDeletingEvent(event);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingEvent) return;
        try {
            setDeleting(true);
            await eventsApi.delete(deletingEvent._id);
            setShowDeleteModal(false);
            loadEvents();
        } catch (error) {
            console.error('Failed to delete event:', error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="p-6 md:p-8 bg-[#f5f5f5] min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">จัดการอีเว้นท์</h1>
                    <p className="text-gray-500">สร้าง แก้ไข และลบอีเว้นท์</p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="h-4 w-4 mr-2" />สร้างอีเว้นท์
                </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="ค้นหาอีเว้นท์..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center py-20"><Loading size="lg" /></div>
            ) : (
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">อีเว้นท์</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">วันที่</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ประเภท</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ผู้เข้าร่วม</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ราคา</th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filteredEvents.map((event) => (
                                    <tr key={event._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900 line-clamp-1">{event.title}</p>
                                            <p className="text-sm text-gray-500 line-clamp-1">{event.location.name}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(event.date)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{event.category}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{event.registeredCount}/{event.capacity}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatPrice(event.price)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleEdit(event)} className="p-2 text-gray-400 hover:text-black transition-colors">
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => handleDeleteClick(event)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Create/Edit Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingEvent ? 'แก้ไขอีเว้นท์' : 'สร้างอีเว้นท์ใหม่'} className="max-w-2xl">
                <div className="space-y-4">
                    <Input label="ชื่ออีเว้นท์" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="วันที่" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                        <Input label="เวลาเริ่ม" type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
                    </div>
                    <Input label="สถานที่" value={formData.location.name} onChange={(e) => setFormData({ ...formData, location: { ...formData.location, name: e.target.value } })} />
                    <Input label="ที่อยู่" value={formData.location.address} onChange={(e) => setFormData({ ...formData, location: { ...formData.location, address: e.target.value } })} />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ประเภท</label>
                            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })} className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black">
                                <option value="5K">5K</option>
                                <option value="10K">10K</option>
                                <option value="Half Marathon">Half Marathon</option>
                                <option value="Full Marathon">Full Marathon</option>
                                <option value="Trail">Trail</option>
                                <option value="Fun Run">Fun Run</option>
                            </select>
                        </div>
                        <Input label="ความจุ" type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })} />
                    </div>
                    <Input label="ราคา (บาท)" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียด</label>
                        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setShowModal(false)}>ยกเลิก</Button>
                        <Button onClick={handleSave} isLoading={saving}>{editingEvent ? 'บันทึก' : 'สร้าง'}</Button>
                    </div>
                </div>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="ยืนยันการลบ">
                <div className="text-center py-4">
                    <p className="text-gray-600 mb-6">คุณต้องการลบอีเว้นท์ "{deletingEvent?.title}" ใช่หรือไม่?</p>
                    <div className="flex gap-3 justify-center">
                        <Button variant="outline" onClick={() => setShowDeleteModal(false)}>ยกเลิก</Button>
                        <Button variant="danger" onClick={handleDeleteConfirm} isLoading={deleting}>ลบ</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
