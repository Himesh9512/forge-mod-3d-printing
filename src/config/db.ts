import mongoose from "mongoose";

const MONGO_DB_STRING = process.env.MONGO_DB_STRING || "";

if (!MONGO_DB_STRING) throw new Error("MongoDB URI is missing!");

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_STRING);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
