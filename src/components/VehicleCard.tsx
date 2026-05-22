import React from 'react';
import { Vehicle } from '../types';
import '../styles/VehicleCard.css';

interface VehicleCardProps {
  vehicle: Vehicle;
  onBook?: (vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (id: string) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onBook, onEdit, onDelete }) => {
  // Mock driver rating - in a real app, this would come from the vehicle data
  const driverRating = 4.8;

  return (
    <div className="vehicle-card">
      <div className="vehicle-image-container">
        {vehicle.imageUrl && (
          <img src={vehicle.imageUrl} alt={vehicle.name} className="vehicle-image" />
        )}
        {!vehicle.imageUrl && (
          <div className="vehicle-image-placeholder">
            <span>📷</span>
          </div>
        )}
        <div className="type-badge">{vehicle.type}</div>
      </div>

      <div className="vehicle-info">
        <div className="vehicle-header">
          <h3>{vehicle.name}</h3>
          <span className={`status-badge ${vehicle.available ? 'available' : 'unavailable'}`}>
            {vehicle.available ? '✓ Available' : '✗ Booked'}
          </span>
        </div>

        <p className="vehicle-model">{vehicle.model} ({vehicle.year})</p>

        <div className="vehicle-rating">
          <span className="stars">⭐ {driverRating}</span>
          <span className="rating-text">Driver Rating</span>
        </div>

        <div className="vehicle-price">
          <span className="price-label">Price per Day</span>
          <span className="price-value">₹{vehicle.pricePerDay}/km</span>
        </div>
      </div>

      <div className="vehicle-actions">
        {onBook && vehicle.available && (
          <button onClick={() => onBook(vehicle)} className="btn btn-book">
            Book Now
          </button>
        )}
        {onBook && !vehicle.available && (
          <button disabled className="btn btn-book btn-disabled">
            Not Available
          </button>
        )}
        {onEdit && (
          <button onClick={() => onEdit(vehicle)} className="btn btn-secondary btn-edit">
            Edit
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(vehicle.id)} className="btn btn-danger">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;
