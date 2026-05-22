import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Vehicle, Booking } from '../../types';
import { vehicleService } from '../../services/vehicleService';
import { bookingService } from '../../services/bookingService';
import '../../styles/AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'vehicles' | 'bookings'>('vehicles');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [vehiclesData, bookingsData] = await Promise.all([
        vehicleService.getAllVehicles(),
        bookingService.getAllBookings(),
      ]);
      setVehicles(vehiclesData);
      setBookings(bookingsData);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await vehicleService.deleteVehicle(id);
        setVehicles(vehicles.filter((v) => v.id !== id));
      } catch (err) {
        setError('Failed to delete vehicle');
      }
    }
  };

  const handleConfirmBooking = async (id: string) => {
    try {
      const updated = await bookingService.confirmBooking(id);
      setBookings(bookings.map((b) => (b.id === id ? updated : b)));
    } catch (err) {
      setError('Failed to confirm booking');
    }
  };

  const handleCancelBooking = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const updated = await bookingService.cancelBooking(id);
        setBookings(bookings.map((b) => (b.id === id ? updated : b)));
      } catch (err) {
        setError('Failed to cancel booking');
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="admin-container">
        <h1>Admin Dashboard</h1>

        {error && <div className="error-box">{error}</div>}

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'vehicles' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicles')}
          >
            Vehicles ({vehicles.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings ({bookings.length})
          </button>
        </div>

        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {activeTab === 'vehicles' && (
              <div className="tab-content">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Model</th>
                      <th>Year</th>
                      <th>Type</th>
                      <th>Price/Day</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle) => (
                      <tr key={vehicle.id}>
                        <td>{vehicle.name}</td>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.year}</td>
                        <td>{vehicle.type}</td>
                        <td>${vehicle.pricePerDay}</td>
                        <td>
                          <span className={`status ${vehicle.available ? 'available' : 'unavailable'}`}>
                            {vehicle.available ? 'Available' : 'Booked'}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="tab-content">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Vehicle</th>
                      <th>User ID</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.vehicle?.name || 'N/A'}</td>
                        <td>{booking.userId}</td>
                        <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                        <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                        <td>${booking.totalPrice}</td>
                        <td>
                          <span className={`status ${booking.status}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleConfirmBooking(booking.id)}
                                className="btn btn-success btn-sm"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="btn btn-danger btn-sm"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
