export interface User {
  _id: string;
  name: string;
  role: string;
  gender: string;
  password: string;
  phone: string;
  image: string;
  products: string[]; // Array of product IDs
  createdAt: string;
  updatedAt: string;
  description: string;
  address: string;
  __v: number;
}

export interface Product {
  _id: string;
  category: string;
  productName: string;
  title: string;
  description: string;
  price: number;
  timePeriod: string;
  user: User;
  images: string[]; // Array of image URLs
  availability: boolean;
  address: string;
  createdAt: string;
  __v: number;
}

export interface ApiResponse {
  msg: string;
  product: Product;
}
export interface Location {
  latitude: number;
  longitude: number;
}
