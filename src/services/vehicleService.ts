import apiClient from './api';
import { Vehicle } from '../types';

export const vehicleService = {
  getAllVehicles: async (): Promise<Vehicle[]> => {
    const response = await apiClient.get('/vehicles');
    return response.data.data || [];
  },

  getVehicleById: async (id: string): Promise<Vehicle> => {
    const response = await apiClient.get(`/vehicles/${id}`);
    return response.data.data;
  },

  createVehicle: async (vehicleData: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    const response = await apiClient.post('/vehicles', vehicleData);
    return response.data.data;
  },

  updateVehicle: async (id: string, vehicleData: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await apiClient.put(`/vehicles/${id}`, vehicleData);
    return response.data.data;
  },

  deleteVehicle: async (id: string): Promise<void> => {
    await apiClient.delete(`/vehicles/${id}`);
  },

  getAvailableVehicles: async (startDate: string, endDate: string): Promise<Vehicle[]> => {
    const response = await apiClient.get('/vehicles/available', {
      params: { startDate, endDate },
    });
    return response.data.data || [];
  },
};
