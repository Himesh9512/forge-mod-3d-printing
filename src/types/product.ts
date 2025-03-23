export default interface Product {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  price: number;
  category: string;
  fileFormat: string[];
  modelFile: string;
  thumbnail: string;
  printable: boolean;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  }[];
  materials: string[];
  license: 'Personal' | 'Commercial';
  rating: number;
  stripeId: string;
  reviews: string[];
}
