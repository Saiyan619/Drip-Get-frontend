export interface UserInput{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Variant {
  _id: string;
  size: string;
  color: string;
  inventory: number;
  sku: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  salePrice?: number | null;
  images: string[];
  variants: Variant[];
  isActive: boolean;
  createdAt: string;
}

export interface ApiResponse {
  total: number;
  page: number;
  totalPages: number;
  products: Product[];
}

export interface FilterParams {
  category?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

// export interface Variant {
//   size: string;
//   color: string;
//   inventory: number;
//   sku: string;
// }

export interface CartItemInput {
  _id: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface CartItem {
    _id: string;
  productId: Product; // populated version
  size: string;
  color: string;
  quantity: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  __v: number;
}


export interface ShippingAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface CreateOrderRequest {
  shippingAddress: ShippingAddress;
  checkoutSessionId?: string; 
}

// For the order response from my backend
export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerId: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: ShippingAddress;
  stripePaymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderResponse {
  message: string;
  order: Order;
}