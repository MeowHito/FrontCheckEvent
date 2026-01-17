'use client';

import { useEffect, useState } from 'react';
import { Search, Trash2, Shield } from 'lucide-react';
import { usersApi } from '@/lib/api';
import { Button, Card, Loading, Modal } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import type { User } from '@/types';
import { UserRole } from '@/types';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await usersApi.getAll();
            setUsers(data);
        } catch (error) {
            console.error('Failed to load users:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeleteClick = (user: User) => {
        setDeletingUser(user);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingUser) return;
        try {
            setDeleting(true);
            await usersApi.delete(deletingUser._id);
            setShowDeleteModal(false);
            loadUsers();
        } catch (error) {
            console.error('Failed to delete user:', error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="p-6 md:p-8 bg-[#f5f5f5] min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">จัดการผู้ใช้</h1>
                <p className="text-gray-500">ดูและจัดการผู้ใช้ทั้งหมดในระบบ</p>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="ค้นหาผู้ใช้..."
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
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ผู้ใช้</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">เบอร์โทร</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">บทบาท</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">สมัครเมื่อ</th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-sm text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{user.phone || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 text-xs rounded ${user.role === UserRole.ADMIN ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                <Shield className="h-3 w-3 mr-1" />
                                                {user.role === UserRole.ADMIN ? 'Admin' : 'User'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(user.createdAt)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {user.role !== UserRole.ADMIN && (
                                                    <button onClick={() => handleDeleteClick(user)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Delete Modal */}
            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="ยืนยันการลบ">
                <div className="text-center py-4">
                    <p className="text-gray-600 mb-6">คุณต้องการลบผู้ใช้ "{deletingUser?.name}" ใช่หรือไม่?</p>
                    <div className="flex gap-3 justify-center">
                        <Button variant="outline" onClick={() => setShowDeleteModal(false)}>ยกเลิก</Button>
                        <Button variant="danger" onClick={handleDeleteConfirm} isLoading={deleting}>ลบ</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
