import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    address: [
      {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
      },
    ],
    purchasedModels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Model' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);