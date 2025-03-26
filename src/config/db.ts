import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) throw new Error('MongoDB URI is missing!');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  try {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
        console.log('MongoDB Connected with Mongoose');
        return mongoose;
      });
    }

    cached.conn = await cached.promise;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).mongoose = cached; // ✅ Store connection globally
    return cached.conn;

    // await mongoose.connect(MONGODB_URI);
    // console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};
