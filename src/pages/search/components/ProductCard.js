import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAddToCart, useGetCart } from '@/apiServices/CartServices';
import { Link } from 'react-router-dom';
export const ProductCard = ({ product }) => {
    const { addCart, isPending } = useAddToCart();
    const { refetch } = useGetCart();
    // Temporary defaults (replace with actual UI selections)
    const [selectedSize] = useState(product.variants[0]?.size || '');
    const [selectedColor] = useState(product.variants[0]?.color || '');
    const [quantity] = useState(1);
    const handleAddToCart = async () => {
        try {
            await addCart({
                productId: product._id,
                size: selectedSize,
                color: selectedColor,
                quantity,
            });
            await refetch();
        }
        catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };
    return (_jsx(Card, { className: "hover:shadow-lg transition-shadow", children: _jsxs(CardContent, { className: "p-0", children: [_jsx(Link, { to: `/product/${product._id}`, children: _jsx("div", { className: "aspect-square overflow-hidden rounded-t-lg", children: _jsx("img", { src: product.images[0] || '/api/placeholder/400/400', alt: product.name, className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300" }) }) }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx(CardTitle, { className: "text-lg", children: product.name }), _jsx(Badge, { variant: "outline", children: product.category })] }), _jsx(CardDescription, { className: "mb-4 line-clamp-2", children: product.description }), _jsx("div", { className: "flex items-center justify-between mb-4", children: _jsx("div", { className: "flex items-center gap-2", children: product.salePrice ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: "text-lg font-bold text-green-600", children: ["$", product.salePrice] }), _jsxs("span", { className: "text-sm text-gray-500 line-through", children: ["$", product.price] })] })) : (_jsxs("span", { className: "text-lg font-bold", children: ["$", product.price] })) }) }), _jsxs("div", { className: "flex flex-wrap gap-1 mb-4", children: [product.variants.slice(0, 3).map((variant) => (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: [variant.color, " ", variant.size] }, variant._id))), product.variants.length > 3 && (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: ["+", product.variants.length - 3, " more"] }))] }), _jsx(Button, { onClick: handleAddToCart, className: "w-full", children: isPending ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }), _jsx("span", { children: "Adding" })] })) : ("Add to Cart") })] })] }) }));
};
