import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Heart, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
const CartSummary = ({ cartItems }) => {
    // console.log(cartItems[0].productId.price)
    const total = cartItems.reduce((sum, item) => {
        const itemPrice = item?.productId.salePrice || item?.productId.price;
        return sum + itemPrice * item.quantity;
    }, 0);
    console.log(total);
    return (_jsx("div", { children: cartItems.length > 0 && (_jsx("div", { className: "lg:col-span-1", children: _jsxs("div", { className: "bg-muted p-6 rounded-lg sticky top-8", children: [_jsx("h2", { className: "text-xl font-semibold mb-6 text-foreground", children: "Order Summary" }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsx("div", { className: "flex justify-between text-foreground", children: _jsxs("span", { children: ["Subtotal (", cartItems.length, " items)"] }) }), _jsx(Separator, {}), _jsxs("div", { className: "flex justify-between font-semibold text-lg text-foreground", children: [_jsx("span", { children: "Total" }), _jsxs("span", { children: ["$", total.toFixed(2)] })] })] }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Promo code" }), _jsx(Button, { variant: "outline", children: "Apply" })] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Try: SAVE10 or WELCOME20" })] }), _jsx(Button, { className: "w-full mb-4", size: "lg", asChild: true, children: _jsx(Link, { to: "/create-order", children: "Proceed to Place Order" }) }), _jsx(Button, { variant: "outline", className: "w-full mb-4", asChild: true, children: _jsx(Link, { to: "/search", children: "Continue Shopping" }) }), _jsxs("div", { className: "mt-6 space-y-3 text-sm text-muted-foreground", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Truck, { className: "h-4 w-4" }), _jsx("span", { children: "Free shipping on orders over $200" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Heart, { className: "h-4 w-4" }), _jsx("span", { children: "30-day return policy" })] })] })] }) })) }));
};
export default CartSummary;
