# FitTrack
Automated Gym Management Application

## Default Admin Account

A default admin account has been created for accessing the admin panel:

**Admin Login:**
- URL: `http://localhost:5173/admin`
- Email: `admin@fittrack.com`
- Password: `admin123`

⚠️ **Change the password after first login!**

## Quick Start

### Backend Setup
```bash
cd backend
npm install
npm run seed:admin  # Create admin account (if not exists)
npm run dev         # Start backend server
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev         # Start frontend development server
```

## User Roles & Access

### Admin
- Access: `http://localhost:5173/admin`
- Features:
  - Register gym trainers
  - View all bookings and members
  - Monitor gym analytics
  - Manage operations

### Members & Trainers
- Access: `http://localhost:5173/login`
- No role selection needed - automatic based on account type

## Documentation

For detailed admin credentials and security information, see [ADMIN_CREDENTIALS.md](./ADMIN_CREDENTIALS.md)
