import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGetProducts } from '@/apiServices/ProductApi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
const LowestProducts = () => {
    const { data } = useGetProducts();
    const lowestPrices = [...data?.products || []] // spread to avoid mutating original
        .sort((a, b) => a.price - b.price) // highest first
        .slice(0, 4);
    return (_jsx("section", { className: "py-20 px-20", children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "flex items-center justify-between mb-12", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold mb-2", children: "Best Bargains" }), _jsx("p", { className: "text-muted-foreground", children: "Unbeatable steals, stylish essentials all at prices that make your wallet happy." })] }), _jsxs(Button, { variant: "outline", children: [_jsx(Link, { to: "/search", children: "View All Products" }), _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: lowestPrices?.map((clothes) => (_jsxs(Card, { className: "group hover:shadow-lg transition-all duration-300 overflow-hidden", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: clothes.images[0], alt: clothes.name, width: 400, height: 300, className: "w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" }), _jsx(Badge, { className: "absolute top-3 left-3 bg-red-500 hover:bg-red-600", children: "-30%" }), _jsx(Button, { size: "icon", variant: "secondary", className: "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(Heart, { className: "h-4 w-4" }) })] }), _jsxs(CardHeader, { className: "pb-3", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx(Badge, { variant: "secondary", children: clothes.category }) }), _jsx(CardTitle, { className: "line-clamp-1", children: clothes.name })] }), _jsx(CardFooter, { className: "pt-0", children: _jsxs("div", { className: "flex items-start justify-between w-full flex-col", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-2xl font-bold", children: ["$", clothes.salePrice] }), _jsxs("span", { className: "text-sm text-muted-foreground line-through", children: ["$", clothes.price] })] }), _jsx(Link, { to: `/product/${clothes._id}`, children: _jsx(Button, { size: "sm", children: "See more" }) })] }) })] }, clothes._id))) })] }) }));
};
export default LowestProducts;
