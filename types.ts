export interface User {
  _id: string;
  name: string;
  role: string;
  gender: string;
  password: string;
  phone: string;
  avatar: string;
  products: string[]; // Array of product IDs
  createdAt: string;
  updatedAt: string;
  description: string;
  address: string;
  lastSeen: string;
  favorites: Product[];
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
  status: string;
  productCordinates: Location;
  isFavorite: boolean;
  period: string;
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

export interface Dimensions {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export interface Conv {
  _id: string;
  participants: {
    sender: User;
    receiver: User;
  };
}
export interface Message {
  _id: string;
  sender: User;
  receiver: User;
  text: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  __v: number;
}
