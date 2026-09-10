export interface MenuItem {
  id: string;
  name: string;
  category: 'gelatos' | 'cafes' | 'sobremesas' | 'salgados';
  description: string;
  price: number;
  image: string;
  badge?: string;
  origin?: string;
  calories?: string;
  ingredients?: string[];
  isPopular?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ReservationData {
  storeId: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  image: string;
  fallbackImage?: string;
  mapsUrl: string;
}
