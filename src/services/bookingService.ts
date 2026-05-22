import apiClient from './api';
import { Booking } from '../types';

export const bookingService = {
  getAllBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get('/bookings');
    return response.data.data || [];
  },

  getBookingById: async (id: string): Promise<Booking> => {
    const response = await apiClient.get(`/bookings/${id}`);
    return response.data.data;
  },

  getUserBookings: async (userId: string): Promise<Booking[]> => {
    const response = await apiClient.get(`/bookings/user/${userId}`);
    return response.data.data || [];
  },

  createBooking: async (bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data.data;
  },

  updateBooking: async (id: string, bookingData: Partial<Booking>): Promise<Booking> => {
    const response = await apiClient.put(`/bookings/${id}`, bookingData);
    return response.data.data;
  },

  cancelBooking: async (id: string): Promise<Booking> => {
    const response = await apiClient.patch(`/bookings/${id}/cancel`);
    return response.data.data;
  },

  confirmBooking: async (id: string): Promise<Booking> => {
    const response = await apiClient.patch(`/bookings/${id}/confirm`);
    return response.data.data;
  },
};
