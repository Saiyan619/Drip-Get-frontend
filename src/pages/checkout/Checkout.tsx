import { useAuth } from '@clerk/clerk-react';
import { useState } from 'react';


////Testting api before intergragtion with stripe
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function CheckoutPage() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const handleCheckout = async () => {
    setLoading(true);
    const yourAuthToken = await getToken();
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourAuthToken}`
        }
      });

      const data = await response.json();
      console.log('Backend response:', data);
      
      // Check if request was successful
      if (!response.ok) {
        throw new Error(data.message || 'Checkout failed');
      }
      
      // Redirect to Stripe's checkout page
      window.location.href = data.checkoutUrl;
     
    } catch (error) {
      console.error('Checkout failed:', error);
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Redirecting to checkout...' : 'Proceed to Checkout'}
    </button>
  );
}