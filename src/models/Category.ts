import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

module.exports = mongoose.model('Category',CategorySchema);