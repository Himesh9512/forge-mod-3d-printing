export default interface Order {
  id: string;
  user: string;
  items: {
    productId: string;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'failed' | 'refunded';
  tracking: {
    statusUpdates: {
      status: string;
      timestamp: Date;
    }[];
  };
  stripeSessionId: string;
}
