import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usePaymentIntent = () => {
    const { getToken } = useAuth();
    
    const paymentIntent = async (orderId: string) => {
        const token = await getToken();
        const response = await fetch(`${API_BASE_URL}/api/payments/create-intent`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ orderId })
        });
        
        if (!response.ok) {
            throw new Error("Something went wrong while creating payment intent!!");
        }
        
        const data = await response.json();
        console.log(data);
        return data;
    };

    const mutation = useMutation({
        mutationFn: paymentIntent,
        onSuccess: (data) => {
            console.log('Redirecting to:', data.checkoutUrl);
            window.location.href = data.checkoutUrl;
        },
        onError: () => {
            toast.error("Payment Error. Something went wrong!!")
        }
    });

    return {
        paymentIntent: mutation.mutate,
        isLoading: mutation.isPending
    };
};