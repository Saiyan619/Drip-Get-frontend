import { Order, OrderDataInput } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllOrders = () => {
    const { getToken } = useAuth();
    const getAllOrders = async () => {
        const token = await getToken();
        const response = await fetch(`${API_BASE_URL}/api/orders/admin/orders`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error("Something went wrong while fetching orders");
        }
        const data = await response.json();
        return data;
    }
    const { data: allOrders, isPending, error, refetch } = useQuery({
        queryKey: ["getAllOrders"],
        queryFn: getAllOrders,
    })
    return { allOrders };
};

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
    const { data: myOrders, isPending, error, refetch } = useQuery<Order>({
        queryKey: ["getMyOrders"],
        queryFn: getMyOrders
    });
    return { myOrders, isPending, error, refetch };
}


export const useGetOrderById = (orderId: string) => {
            const { getToken } = useAuth();
const getOrderById = async (orderId: string) => {
            const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }

    });
    if (!response.ok) {
        throw new Error("Something went wrong while fetching the order");
    }
    const data = await response.json();
    console.log(data);
    return data;
    }
    const { data: singleOrder, isPending, error } = useQuery<Order>({
        queryKey: ["getOrderById", orderId], 
        queryFn: () => getOrderById(orderId), 
        enabled: !!orderId // Only run query if orderId exists
    });
    return { singleOrder, isPending, error}
}


 export const useCreateOrder = () => {
        const { getToken } = useAuth();

    const createOrder = async (orderData: OrderDataInput) => {
        const token = await getToken();
        const response = await fetch(`${API_BASE_URL}/api/orders/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            throw new Error("Something went wrong while creating the order");
        }
        const data = await response.json();
        console.log("Order created successfully:", data);
        return data;


    };
    const {mutateAsync:createNewOrder, isPending}= useMutation({mutationFn: createOrder})
    return{createNewOrder}
}
type UpdateOrderProps = {
    id: string;
    status: string;
}
export const useUpdateOrder = () => {
    const { getToken } = useAuth();
    const updateOrder = async ({id, status}:UpdateOrderProps) => {
        const token = await getToken();
        const response = await fetch(`${API_BASE_URL}/api/orders/admin/orders/${id}/status`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status }), 
        })
        if (!response.ok) {
            throw new Error("Cant update order");
        }
        const data = await response.json()
        console.log(data)
        return data
    }
    const { mutateAsync:updateUserOrder, isPending } = useMutation({
        mutationFn:updateOrder
    })
    return {updateUserOrder}
}
