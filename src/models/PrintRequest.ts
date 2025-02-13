import mongoose, { Document } from "mongoose";

export interface IPrintRequest extends Document {
  user: mongoose.Types.ObjectId;
  customFile: string;
  material: string;
  color: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  quantity: number;
  price: number;
  status: 'pending' | 'reviewing' | 'approved' | 'printing' | 'shipped';
  comments: {
    message: string;
    sender: 'admin' | 'customer';
    timestamp: Date;
  }[];
  shippingAddress: string;
  trackingNumber?: string;
}

const PrintRequestSchema = new mongoose.Schema<IPrintRequest>(
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

export default mongoose.models.PrintRequest || mongoose.model<IPrintRequest>('PrintRequest', PrintRequestSchema);