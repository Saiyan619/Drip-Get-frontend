import { useAuth } from '@clerk/clerk-react';
import { useState } from 'react';
import { usePaymentIntent } from '@/apiServices/paymentServices';
import { Button } from '@/components/ui/button';
import { useGetOrderById } from '@/apiServices/orderServices';
import { useParams } from 'react-router-dom';


type RouteParams = {
  id: string;
};
export function CheckoutPage() {
  const { paymentIntent, isLoading } = usePaymentIntent();
 const { id } = useParams<RouteParams>();

  const handlePayment = async () => {
    if (!id) return; 
    await paymentIntent(id);
  };
  // 688b64e86bab41b8e6102e92
  // ORD-970c57ad
  return (
    <Button disabled={isLoading} className='w-full' onClick={handlePayment} >
      {isLoading ?
        (<div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Checking Out....</span>
        </div>) :
        (
          <span>    Proceed to Checkout
</span>
        )
      }
    </Button>
  );
}