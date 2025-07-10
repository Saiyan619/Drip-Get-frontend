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