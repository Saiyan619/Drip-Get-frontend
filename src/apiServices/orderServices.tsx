import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useGetMyOrders = () => {
    const { getToken } = useAuth();
    const getMyOrders = async () => {
        const token = await getToken();
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Something went wrong while fetching orders");
        }
        const data = await response.json();
        return data;

    }
    const { data: myOrders, isPending, error, refetch } = useQuery({
        queryKey: ["getMyOrders"],
        queryFn: getMyOrders
    });
    return { myOrders, isPending, error, refetch };
}

export const useCreateOrder =()=>{
    const createOrder = async () => {
        
    }
}