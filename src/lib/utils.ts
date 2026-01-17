import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function formatTime(time: string): string {
    return time;
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
    }).format(price);
}

export function getStatusColor(status: string): string {
    switch (status) {
        case 'upcoming':
            return 'bg-blue-100 text-blue-800';
        case 'ongoing':
            return 'bg-green-100 text-green-800';
        case 'completed':
            return 'bg-gray-100 text-gray-800';
        case 'cancelled':
            return 'bg-red-100 text-red-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'confirmed':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

export function getCategoryColor(category: string): string {
    switch (category) {
        case '5K':
            return 'bg-emerald-100 text-emerald-800';
        case '10K':
            return 'bg-cyan-100 text-cyan-800';
        case 'Half Marathon':
            return 'bg-purple-100 text-purple-800';
        case 'Full Marathon':
            return 'bg-orange-100 text-orange-800';
        case 'Trail':
            return 'bg-amber-100 text-amber-800';
        case 'Fun Run':
            return 'bg-pink-100 text-pink-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}
