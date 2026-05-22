# Vehicle Booking Frontend

A modern React application for vehicle booking management system.

## Features

- **Vehicle Browse & Book**: Browse available vehicles and book them for specific dates
- **User Authentication**: Register and login to manage bookings
- **Booking Management**: View and manage your bookings
- **Admin Dashboard**: Manage vehicles and bookings (admin only)
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: API integration for live data

## Project Structure

```
frontend/
├── public/               # Static files
├── src/
│   ├── components/       # Reusable components
│   │   ├── Header.tsx    # Navigation header
│   │   └── VehicleCard.tsx  # Vehicle display card
│   ├── pages/            # Page components
│   │   ├── Home.tsx      # Home page
│   │   ├── Booking.tsx   # Booking page
│   │   └── admin/
│   │       └── AdminDashboard.tsx
│   ├── services/         # API services
│   │   ├── api.ts        # Axios configuration
│   │   ├── vehicleService.ts
│   │   └── bookingService.ts
│   ├── context/          # React context
│   │   └── AuthContext.tsx
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── styles/           # CSS files
│   ├── App.tsx           # Main app component
│   └── index.tsx         # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL:
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## Running the Application

### Development
```bash
npm start
```
The app will open at `http://localhost:3000`

### Production Build
```bash
npm run build
```

### Testing
```bash
npm test
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router v6** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Environment Variables

- `REACT_APP_API_BASE_URL` - Backend API base URL (default: http://localhost:5000/api)
- `REACT_APP_ENV` - Environment (development/production)

## Key Components

### Pages
- **Home** - Landing page with vehicle listings
- **Booking** - Booking form and vehicle selection
- **Admin Dashboard** - Manage vehicles and bookings

### Services
- **api.ts** - Axios configuration with interceptors
- **vehicleService.ts** - Vehicle API calls
- **bookingService.ts** - Booking API calls

### Context
- **AuthContext** - User authentication state and methods

## API Integration

The frontend expects the backend API to implement these endpoints:

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `POST /api/vehicles` - Create vehicle (admin)
- `PUT /api/vehicles/:id` - Update vehicle (admin)
- `DELETE /api/vehicles/:id` - Delete vehicle (admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `PATCH /api/bookings/:id/confirm` - Confirm booking (admin)
- `PATCH /api/bookings/:id/cancel` - Cancel booking

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Styling

The project uses CSS modules for component styling. Main style files:
- `styles/index.css` - Global styles
- `styles/App.css` - App-wide styles and utilities
- Component-specific CSS files

## Contributing

1. Create a new branch for features
2. Follow the existing code structure
3. Ensure TypeScript compilation passes
4. Test before submitting

## License

MIT
