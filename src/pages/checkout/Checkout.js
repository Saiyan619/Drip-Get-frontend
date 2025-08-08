import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePaymentIntent } from '@/apiServices/paymentServices';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
export function CheckoutPage() {
    const { paymentIntent, isLoading } = usePaymentIntent();
    const { id } = useParams();
    const handlePayment = async () => {
        if (!id)
            return;
        await paymentIntent(id);
    };
    // 688b64e86bab41b8e6102e92
    // ORD-970c57ad
    return (_jsx(Button, { disabled: isLoading, className: 'w-full', onClick: handlePayment, children: isLoading ?
            (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }), _jsx("span", { children: "Checking Out...." })] })) :
            (_jsx("span", { children: "    Proceed to Checkout" })) }));
}
