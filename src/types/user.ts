export default interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  address: {
    street: string,
    city: string,
    state: string,
    zip: string,
    country: string,
  };
  purchasedModels: string[];
}