import { Cart, CartItem, CartItemInput } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAddToCart = () => {
                  const { getToken } = useAuth();

    const addToCart = async (cartParam: CartItemInput) => {
                const token = await getToken();

        const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId:cartParam.productId,
        quantity:cartParam.quantity,
        size:cartParam.size,
        color:cartParam.color
            })
        })
        if (!response.ok) {
            throw new Error("something went wrong");
            
        }
        const data = await response.json();
                console.log(data)

        return data
    }
    return { addToCart };
}

export const useGetCart = () => {
              const { getToken } = useAuth();

    const getCart = async (): Promise<Cart> => {
        const token = await getToken();
        const response = await fetch(`${API_BASE_URL}/api/cart`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error("Something went wrong!!!");
            
        }
        const data = await response.json();
    // console.log("Cart data:", data); // Now properly logs the data
    return data;
    }

    const {data, isPending, error, refetch} = useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
  });
    return { data, refetch };
}


export const useUpdateCartItem = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  
  const updateCartItem = async (cartParam: CartItemInput) => {
    const token = await getToken();

    const response = await fetch(`${API_BASE_URL}/api/cart/add/${cartParam._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        size: cartParam.size,
        color: cartParam.color,
        quantity: cartParam.quantity,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update cart item");
    }
    
    const data = await response.json();
    console.log(data)
    return data;
  };

  const {
    mutateAsync: updateSingleCart,
    isPending,
    isError,
    isSuccess,
  } = useMutation({ 
    mutationFn: updateCartItem,
    onSuccess: () => {
      // Invalidate cart queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  return { updateSingleCart, isPending, isError, isSuccess };
};




export const useDeleteCart = () => {
                  const { getToken } = useAuth();

    const deleteCart = async (id: string | undefined) => {
                const token = await getToken();

        const response = await fetch(`${API_BASE_URL}/api/cart/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error("Something went wrong!!!");
            
        }
        const data = await response.json();
        console.log(data)
        return data
    }
    return { deleteCart };
}