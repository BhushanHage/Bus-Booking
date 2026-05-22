import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import VehicleCard from '../components/VehicleCard';
import { Vehicle } from '../types';
import { vehicleService } from '../services/vehicleService';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const navigate = useNavigate();

  const categories = [
    { id: 'bike', label: 'Bikes', icon: '🏍️' },
    { id: 'scooter', label: 'Scooters', icon: '🛵' },
    { id: 'car', label: 'Cars', icon: '🚗' },
    { id: 'suv', label: 'SUVs', icon: '🚙' },
    { id: 'tempo', label: 'Tempo Traveller', icon: '🚐' },
  ];

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = vehicles.filter(
        (v) => v.type.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredVehicles(filtered);
    } else {
      setFilteredVehicles(vehicles);
    }
  }, [selectedCategory, vehicles]);

  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      const data = await vehicleService.getAllVehicles();
      setVehicles(data);
      setFilteredVehicles(data);
    } catch (err) {
      setError('Failed to load vehicles. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? '' : categoryId);
  };

  const handleBookVehicle = (vehicle: Vehicle) => {
    navigate(`/booking?vehicleId=${vehicle.id}`);
  };

  return (
    <div className="App">
      <Header />
      <main>
        {/* SECTION A: Hero Banner */}
        <section className="hero-banner">
          <div className="hero-content">
            <h1 className="hero-title">Book Your Ride Across Maharashtra</h1>
            <p className="hero-subtitle">
              Fast, affordable, and reliable vehicle booking service
            </p>
            <div className="hero-buttons">
              <Link to="/booking" className="btn btn-hero btn-primary">
                Search Vehicles
              </Link>
              <Link to="/booking" className="btn btn-hero btn-outline">
                View All Vehicles
              </Link>
            </div>
          </div>
          <div className="hero-background"></div>
        </section>

        {/* SECTION B: Quick Search Categories */}
        <section className="quick-search">
          <div className="container">
            <h2>Browse by Category</h2>
            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${
                    selectedCategory === category.id ? 'active' : ''
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION C: Featured Vehicles */}
        <section className="featured-vehicles">
          <div className="container">
            <h2>
              {selectedCategory
                ? `Available ${
                    categories.find((c) => c.id === selectedCategory)?.label
                  }`
                : 'Featured Vehicles'}
            </h2>

            {error && <div className="error-banner">{error}</div>}

            {isLoading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading vehicles...</p>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="no-vehicles">
                <p>
                  {selectedCategory
                    ? 'No vehicles available in this category.'
                    : 'No vehicles available at the moment.'}
                </p>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="btn btn-secondary"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            ) : (
              <div className="vehicles-grid">
                {filteredVehicles.slice(0, 6).map((vehicle) => (
                  <div key={vehicle.id} className="vehicle-card-wrapper">
                    <VehicleCard
                      vehicle={vehicle}
                      onBook={() => handleBookVehicle(vehicle)}
                    />
                  </div>
                ))}
              </div>
            )}

            {filteredVehicles.length > 6 && (
              <div className="view-all-button">
                <Link to="/booking" className="btn btn-primary btn-large">
                  View All Vehicles ({filteredVehicles.length})
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* SECTION D: How It Works */}
        <section className="how-it-works">
          <div className="container">
            <h2>How It Works</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-icon">
                  <span>1</span>
                </div>
                <h3>Choose Vehicle</h3>
                <p>Browse through our wide selection of vehicles and find the perfect one for your needs.</p>
              </div>

              <div className="step-divider"></div>

              <div className="step">
                <div className="step-icon">
                  <span>2</span>
                </div>
                <h3>Book & Pay</h3>
                <p>Select your booking dates and complete the secure payment process.</p>
              </div>

              <div className="step-divider"></div>

              <div className="step">
                <div className="step-icon">
                  <span>3</span>
                </div>
                <h3>Ride</h3>
                <p>Enjoy your journey with our well-maintained vehicles and professional service.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
