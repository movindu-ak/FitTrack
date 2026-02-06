import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not defined in .env file');
      console.log('\nTo fix this:');
      console.log('1. Install MongoDB locally and start it, then use: mongodb://localhost:27017/fittrack');
      console.log('2. Or create a free MongoDB Atlas cluster at: https://www.mongodb.com/cloud/atlas');
      console.log('   Then update MONGODB_URI in .env with your connection string\n');
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('\nDatabase connection failed. Please check:');
    console.log('1. MongoDB is running (if using local)');
    console.log('2. Connection string is correct in .env');
    console.log('3. Network/firewall allows the connection\n');
    process.exit(1);
  }
};

export default connectDB;
