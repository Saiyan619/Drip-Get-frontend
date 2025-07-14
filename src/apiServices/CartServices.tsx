import { Cart, CartItem, CartItemInput } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
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
    console.log("Cart data:", data); // Now properly logs the data
    return data;
    }

    const {data, isPending, error} = useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
  });
    return { data };
}

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