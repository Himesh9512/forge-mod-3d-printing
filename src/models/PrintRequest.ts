import mongoose from "mongoose";

const PrintRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customFile: { type: String, required: true },
    material: { type: String, required: true },
    color: { type: String, required: true },
    dimensions: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      depth: { type: Number, required: true },
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'reviewing', 'approved', 'printing', 'shipped'], default: 'pending' },
    comments: [
      {
        message: String,
        sender: { type: String, enum: ['admin', 'customer'], required: true },
        timestamp: Date,
      },
    ],
    shippingAddress: { type: String, required: true },
    trackingNumber: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PrintRequest', PrintRequestSchema);