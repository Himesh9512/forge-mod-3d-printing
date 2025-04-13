export default interface PrintRequest {
  _id: string;
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
  trackingNumber: string;
}
