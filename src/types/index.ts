// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

// Event types
export interface Location {
  name: string;
  address: string;
  lat?: number;
  lng?: number;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime?: string;
  location: Location;
  category: EventCategory;
  capacity: number;
  registeredCount: number;
  price: number;
  image?: string;
  status: EventStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export enum EventCategory {
  FIVE_K = '5K',
  TEN_K = '10K',
  HALF_MARATHON = 'Half Marathon',
  FULL_MARATHON = 'Full Marathon',
  TRAIL = 'Trail',
  FUN_RUN = 'Fun Run',
}

export enum EventStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

// Booking types
export interface Booking {
  _id: string;
  user: User | string;
  event: Event | string;
  status: BookingStatus;
  registrationNumber: string;
  createdAt: string;
  updatedAt: string;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface CreateEventForm {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime?: string;
  location: Location;
  category: EventCategory;
  capacity: number;
  price: number;
  image?: string;
}

export interface CreateBookingForm {
  eventId: string;
}
