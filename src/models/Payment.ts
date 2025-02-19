import mongoose, { Document } from 'mongoose';

export interface IPayment extends Document {
  _id: string;
  user: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  paymentMethod: 'Stripe' | 'PayPal';
  transactionId: string;
  amount: number;
  status: 'successful' | 'failed';
}

const PaymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    paymentMethod: { type: String, enum: ['Stripe', 'PayPal'], required: true },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['successful', 'failed'], default: 'successful' },
  },
  { timestamps: true }
);

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
