import axios from 'axios';
import type {
    User,
    Event,
    Booking,
    AuthResponse,
    PaginatedResponse,
    LoginForm,
    RegisterForm,
    CreateEventForm,
    CreateBookingForm,
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authApi = {
    register: async (data: RegisterForm): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    login: async (data: LoginForm): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', data);
        return response.data;
    },

    getProfile: async (): Promise<User> => {
        const response = await api.get<User>('/auth/profile');
        return response.data;
    },
};

// Events APIs
export const eventsApi = {
    getAll: async (params?: {
        category?: string;
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<Event>> => {
        const response = await api.get<PaginatedResponse<Event>>('/events', { params });
        return response.data;
    },

    getOne: async (id: string): Promise<Event> => {
        const response = await api.get<Event>(`/events/${id}`);
        return response.data;
    },

    getCalendar: async (year: number, month: number): Promise<Event[]> => {
        const response = await api.get<Event[]>('/events/calendar', {
            params: { year, month },
        });
        return response.data;
    },

    create: async (data: CreateEventForm): Promise<Event> => {
        const response = await api.post<Event>('/events', data);
        return response.data;
    },

    update: async (id: string, data: Partial<CreateEventForm>): Promise<Event> => {
        const response = await api.patch<Event>(`/events/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/events/${id}`);
    },
};

// Bookings APIs
export const bookingsApi = {
    getAll: async (): Promise<Booking[]> => {
        const response = await api.get<Booking[]>('/bookings');
        return response.data;
    },

    getOne: async (id: string): Promise<Booking> => {
        const response = await api.get<Booking>(`/bookings/${id}`);
        return response.data;
    },

    getByEvent: async (eventId: string): Promise<Booking[]> => {
        const response = await api.get<Booking[]>(`/bookings/event/${eventId}`);
        return response.data;
    },

    create: async (eventId: string): Promise<Booking> => {
        const response = await api.post<Booking>('/bookings', { eventId });
        return response.data;
    },

    cancel: async (id: string): Promise<Booking> => {
        const response = await api.delete<Booking>(`/bookings/${id}`);
        return response.data;
    },
};

// Users APIs (Admin)
export const usersApi = {
    getAll: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/users');
        return response.data;
    },

    getOne: async (id: string): Promise<User> => {
        const response = await api.get<User>(`/users/${id}`);
        return response.data;
    },

    update: async (id: string, data: Partial<User>): Promise<User> => {
        const response = await api.patch<User>(`/users/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/users/${id}`);
    },
};
