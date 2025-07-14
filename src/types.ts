// types/product.ts
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
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface CartItem {
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

