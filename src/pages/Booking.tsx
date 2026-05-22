import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import VehicleCard from '../components/VehicleCard';
import { Vehicle, Booking } from '../types';
import { vehicleService } from '../services/vehicleService';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';
import '../styles/Booking.css';
const BookingPage: React.FC = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchAvailableVehicles();
  }, []);

  const fetchAvailableVehicles = async () => {
    try {
      setIsLoading(true);
      const data = await vehicleService.getAllVehicles();
      setVehicles(data.filter((v) => v.available));
    } catch (err) {
      setError('Failed to load vehicles.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async (vehicle: Vehicle) => {
    if (!user) {
      setError('Please login to book a vehicle');
      return;
    }

    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError('End date must be after start date');
      return;
    }

    try {
      setIsLoading(true);
      const days = Math.ceil(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = days * vehicle.pricePerDay;

      const booking: Omit<Booking, 'id' | 'createdAt'> = {
        userId: user.id,
        vehicleId: vehicle.id,
        startDate,
        endDate,
        status: 'pending',
        totalPrice,
      };

      await bookingService.createBooking(booking);
      setSuccess('Booking created successfully!');
      setSelectedVehicle(null);
      setStartDate('');
      setEndDate('');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <h1>Book a Vehicle</h1>

        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>}

        <div className="booking-filters">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="vehicles-grid">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onBook={() => handleBooking(vehicle)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingPage;
