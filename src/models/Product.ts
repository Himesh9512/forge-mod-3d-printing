import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  category: mongoose.Types.ObjectId;
  fileFormat: ( 'STL' | 'OBJ' | 'STEP')[];
  modelFile: string;
  thumbnail: string;
  printable: boolean;
  dimensions: Array<{ width: number; height: number; depth: number }>;
  materials: ('PLA' | 'ABS' | 'Resin')[];
  license: 'Personal' | 'Commercial';
  rating: number;
  reviews: mongoose.Types.ObjectId[];
};

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    fileFormat: { type: [String], enum: ['STL', 'OBJ', 'STEP'], required: true },
    modelFile: { type: String, required: true },
    thumbnail: { type: String, required: true },
    printable: { type: Boolean, default: false },
    dimensions: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      depth: { type: Number, required: true },
    },
    materials: { type: [String], enum: ['PLA', 'ABS', 'Resin'], required: true },
    license: { type: String, enum: ['Personal', 'Commercial'], required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product',ProductSchema);