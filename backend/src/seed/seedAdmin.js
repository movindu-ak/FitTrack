import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars
dotenv.config({ path: join(__dirname, '../../.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@fittrack.com' });

    if (adminExists) {
      console.log('Admin account already exists!');
      console.log('Email: admin@fittrack.com');
      console.log('Role:', adminExists.role);
      process.exit(0);
    }

    // Create admin account
    const admin = await User.create({
      name: 'FitTrack Admin',
      email: 'admin@fittrack.com',
      password: 'admin123',
      role: 'admin',
      phone: '0771234567'
    });

    console.log('✅ Admin account created successfully!');
    console.log('=====================================');
    console.log('📧 Email: admin@fittrack.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');
    console.log('=====================================');
    console.log('⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
