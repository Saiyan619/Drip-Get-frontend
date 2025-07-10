import { useQuery } from "@tanstack/react-query";
import { ApiResponse, FilterParams } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useProducts = (filters: FilterParams = {}) => {
  const getProducts = async (): Promise<ApiResponse> => {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/api/products${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if (!response.ok) {
      throw new Error("Product fetch failed");
    }
    
    return response.json();
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["getAllProducts", filters],
    queryFn: getProducts
  });

  return { data, isPending, error };
};