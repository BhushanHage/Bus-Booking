export interface Vehicle {
  id: string;
  name: string;
  model: string;
  year: number;
  type: string;
  pricePerDay: number;
  available: boolean;
  imageUrl?: string;
}

export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  vehicle?: Vehicle;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
