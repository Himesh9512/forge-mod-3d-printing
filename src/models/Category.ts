import mongoose, { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
};

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model<ICategory>('Category',CategorySchema);