import { useAuth } from '@clerk/clerk-react';
import { useState } from 'react';
import { usePaymentIntent } from '@/apiServices/paymentServices';
import { Button } from '@/components/ui/button';


export function CheckoutPage() {
  const { paymentIntent } = usePaymentIntent();
  const handlePayment = async () => {
    await paymentIntent("688b64e86bab41b8e6102e92")
  }
  // 688b64e86bab41b8e6102e92
  // ORD-970c57ad
  return (
    <Button className='w-full' onClick={handlePayment} >
    Proceed to Checkout
    </Button>
  );
}