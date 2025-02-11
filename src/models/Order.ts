import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        modelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Model', required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['paid', 'failed', 'refunded'], default: 'paid' },
    tracking: {
      statusUpdates: [
        {
          status: String,
          timestamp: Date,
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);