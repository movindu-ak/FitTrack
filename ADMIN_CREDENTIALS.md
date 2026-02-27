# Admin Account Credentials

## Default Admin Account

A default admin account has been created for accessing the admin panel.

### Login Credentials

```
URL: http://localhost:5173/admin
Email: admin@fittrack.com
Password: admin123
```

## How to Create Admin Account

If the admin account doesn't exist in the database, run the following command:

```bash
cd backend
npm run seed:admin
```

This will create the admin account with the above credentials.

## Security Notice

⚠️ **Important**: This is a default public admin account for development/testing purposes. 

**For production:**
- Change the password immediately after first login
- Consider removing the seed script or adding environment-specific protection
- Use strong, unique passwords
- Enable two-factor authentication if available

## Admin Features

The admin account has access to:
- Admin Dashboard (`/admin-dashboard`)
- Register new gym trainers
- View all bookings and members
- Monitor gym analytics and revenue
- Manage membership plans
- View live gym occupancy

## Admin Login Process

1. Navigate to `http://localhost:5173/admin`
2. Use the credentials above
3. You will be redirected to the Admin Dashboard

**Note**: Regular members and trainers cannot access the admin panel, even with these credentials. The login system validates the user role from the database.
