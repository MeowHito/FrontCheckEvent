import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { authApi } from './api';

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
    logout: () => void;
    fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                set({ isLoading: true });
                try {
                    const response = await authApi.login({ email, password });
                    localStorage.setItem('token', response.access_token);
                    set({
                        user: response.user,
                        token: response.access_token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            register: async (name: string, email: string, password: string, phone?: string) => {
                set({ isLoading: true });
                try {
                    const response = await authApi.register({ name, email, password, phone });
                    localStorage.setItem('token', response.access_token);
                    set({
                        user: response.user,
                        token: response.access_token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                localStorage.removeItem('token');
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
            },

            fetchProfile: async () => {
                const { token } = get();
                if (!token) return;

                set({ isLoading: true });
                try {
                    const user = await authApi.getProfile();
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch {
                    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ token: state.token, user: state.user }),
        }
    )
);
