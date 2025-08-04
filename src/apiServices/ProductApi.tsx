import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse, CreateProductInput, FilterParams, isExistingImage, isNewImage, Product } from '@/types';
import { useAuth } from "@clerk/clerk-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetProducts = (filters: FilterParams = {}) => {
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

export const useGetSingleProduct = (id:string | undefined) => {
  const getSingleProduct = async (): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    if (!response.ok) {
     throw new Error("Something went wrong");
      
    }
const data = await response.json();
    console.log("Fetched product:", data);
    return data;

    
  }

  const {data, isPending, error} = useQuery({
    queryKey: ["getSingleProduct", id],
    queryFn: getSingleProduct,
    enabled:!!id
  });

  return{data, isPending, error}
}


export const useCreateProduct = () => {
  const { getToken } = useAuth();
  const createProduct = async (input: CreateProductInput) => {
    const token = await getToken();
     const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("price", input.price.toString());
   
if (input.salePrice !== undefined && input.salePrice !== null) {
  formData.append("salePrice", input.salePrice.toString()); 
}

    // Variants must be stringified
    formData.append("variants", JSON.stringify(input.variants));

    // Append each image file
    input.images.forEach((file) => {
      formData.append("images", file.name);
    });

    const response = await fetch(`${API_BASE_URL}/api/products/admin/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
            body: formData,

    });
    if (!response.ok) {
      throw new Error("failed to create product")
    }
    const data = await response.json();
    console.log("Created product", data);
    return data
  }
  const { mutateAsync: createNewProduct, isPending } = useMutation({ mutationFn: createProduct })
  return {createNewProduct}
}

type updateProductProp = {
  id: string;
  input: CreateProductInput;
}

export const useUpdateProduct = () => {
  const { getToken } = useAuth();
  
  const updateProduct = async ({ id, input }: updateProductProp) => {
    const formData = new FormData();
    
    // Basic fields
    if (input.name) formData.append('name', input.name);
    if (input.description) formData.append('description', input.description);
    if (input.category) formData.append('category', input.category);
    if (typeof input.price !== 'undefined') formData.append('price', input.price.toString());
    if (typeof input.salePrice !== 'undefined') formData.append('salePrice', input.salePrice.toString());
    
    // Variants
    if (input.variants) {
      formData.append('variants', JSON.stringify(input.variants));
    }
    
    // Handle images properly
    if (input.images && input.images.length > 0) {
      // Separate existing and new images
      const existingImages: string[] = [];
      const newImageFiles: File[] = [];
      
      input.images.forEach((image) => {
        if (isNewImage(image)) {
          // For new images, append the actual File object
          newImageFiles.push(image.file);
        } else if (isExistingImage(image)) {
          // For existing images, collect URLs
          existingImages.push(image.url);
        }
      });
      
      // Append existing image URLs as JSON array
      if (existingImages.length > 0) {
        formData.append('existingImages', JSON.stringify(existingImages));
      }
      
      // Append new image files
      newImageFiles.forEach((file) => {
        formData.append('newImages', file);
      });
      
      // Alternative approach - if your backend expects all images in one field:
      // Create a structured array for the backend
      const imageData = input.images.map((image, index) => {
        if (isNewImage(image)) {
          return {
            type: 'new',
            name: image.name,
            index: index // to match with file uploads
          };
        } else {
          return {
            type: 'existing',
            url: image.url,
            name: image.name,
            id: image.id
          };
        }
      });
      
      formData.append('images', JSON.stringify(imageData));
    }
    
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/api/products/admin/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type when using FormData - let the browser set it
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Update product error:', errorData);
      throw new Error(`Failed to update Product: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Update product success:', data);
    return data;
  }
  
  const { mutateAsync: updateProductData } = useMutation({
    mutationFn: updateProduct
  });
  
  return { updateProductData };
}


export const useDeleteProducts = () => {
  const { getToken } = useAuth();
  const deleteProducts = async (id:string) => {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/api/products/admin/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    if (!response.ok) {
      throw new Error("Cant delete something went wrong");
      
    }
    const data = await response.json();
    console.log(data)
    return data
  }
  const { mutateAsync: deleteProduct, isPending } = useMutation({
    mutationFn: deleteProducts
  });
  return {deleteProduct}
}