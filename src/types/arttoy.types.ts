export interface Arttoy {
  _id: string;
  sku: string;
  name: string;
  description: string;
  arrivalDate: string;
  availableQuota: number;
  posterPicture: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
}

export interface OrderArtToy {
  _id: string;
  sku: string;
  name: string;
  description: string;
  arrivalDate: string;
  availableQuota: number;
  posterPicture?: string;
}

export interface Order {
  _id: string;
  user: OrderUser | string;
  artToy: OrderArtToy | string;
  orderAmount: number;
  createdAt: string;
  updatedAt: string;
}
