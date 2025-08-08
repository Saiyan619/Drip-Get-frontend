import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDeleteCart, useGetCart } from '@/apiServices/CartServices';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Heart, Trash2, Truck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateCartDialog from './components/UpdateCartDialog';
import CartSummary from './components/CartSummary';
const Cart = () => {
    const { data: cart, refetch } = useGetCart();
    const { deleteUserCart, isPending } = useDeleteCart();
    // Add state to track which item is being deleted
    const [deletingItemId, setDeletingItemId] = useState(null);
    const myCart = cart;
    const test = () => {
        console.log(myCart?.items);
    };
    const handleRemove = async (itemId) => {
        try {
            setDeletingItemId(itemId); // Set which item is being deleted
            await deleteUserCart(itemId);
            // Refetch cart data after successful deletion
            refetch();
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setDeletingItemId(null); // Clear the deleting state
        }
    };
    return (_jsxs("div", { children: [myCart?.items.length === 0 ?
                (_jsxs("div", { className: "text-center mb-8 sm:mb-12", children: [_jsxs("div", { className: "relative mb-6 sm:mb-8", children: [_jsx("div", { className: "w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-6", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" }) }) }), _jsx("div", { className: "absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping" })] }), _jsx("h1", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900", children: "Your cart is currently empty" }), _jsx("p", { className: "text-base sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed", children: "Looks like you haven't added anything yet. Start exploring our products and find something you love." }), _jsx(Link, { to: "/search", children: _jsx(Button, { children: "Continue Shopping" }) })] }))
                : (_jsx("div", { className: "space-y-4", children: myCart?.items.map((item) => {
                        // Check if this specific item is being deleted
                        const isDeleting = deletingItemId === item._id;
                        return (_jsxs("div", { className: "flex gap-4 p-4 border rounded-lg bg-card text-card-foreground", children: [_jsxs("div", { className: "w-24 h-24 relative", children: [_jsx("img", { src: item.productId.images[0] || "/placeholder.svg", alt: item.productId.name, className: "object-cover rounded-lg" }), item.productId.price > 0 && (_jsx(Badge, { className: "absolute -top-2 -left-2 bg-red-500 text-xs", children: "-30%" }))] }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx(Link, { to: `/product/${item.productId._id}`, className: "hover:underline", children: _jsx("h3", { className: "font-medium text-foreground", children: item.productId.name }) }), _jsx("p", { className: "text-sm text-muted-foreground", children: item.productId.category }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [item.size, " \u2022 ", item.color] }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Truck, { className: "h-3 w-3 text-green-600" }), _jsx("span", { className: "text-xs text-green-600", children: "Free shipping" }), _jsx(Clock, { className: "h-3 w-3 text-muted-foreground ml-2" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Arrives in 3-5 days" })] })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "font-semibold text-foreground", children: ["$", item.productId.price] }), item.productId.price && (_jsxs("span", { className: "text-sm text-muted-foreground line-through", children: ["$", item.productId.price] }))] }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex items-center space-x-2", children: _jsxs("span", { className: "w-8 text-center text-foreground text-sm", children: ["Qty:", item.quantity] }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "ghost", size: "sm", 
                                                            // onClick={() => saveForLater(item)}
                                                            className: "text-muted-foreground hover:text-foreground", children: [_jsx(Heart, { className: "h-4 w-4 mr-1" }), "Save for Later"] }), _jsx(UpdateCartDialog, { cartItem: item, onUpdate: refetch }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => handleRemove(item._id), className: "text-red-500 hover:text-red-700", disabled: isDeleting, children: [_jsx(Trash2, { className: "h-4 w-4 mr-1" }), isDeleting ? "Removing" : "Remove", " "] })] })] })] })] }, `${item.productId._id}-${item.size}-${item.color}`));
                    }) })), _jsx(CartSummary, { cartItems: myCart?.items ?? [] })] }));
};
export default Cart;
