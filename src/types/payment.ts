export default interface Payment {
  _id: string;
  user: string;
  order: string;
  transactionId: string;
  amount: number;
  status: 'successful' | 'failed';
}
