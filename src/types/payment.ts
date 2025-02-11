export default interface Payment {
  id: string;
  user: string;
  order: string;
  transactionId: string;
  amount: number;
  status: 'successful' | 'failed';
}