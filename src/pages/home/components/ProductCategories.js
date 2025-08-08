import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from '@/components/ui/card';
import { Play, Trophy, Users, Zap } from 'lucide-react';
const gameCategories = [
    { name: "Action", icon: Zap, count: 245, image: "/placeholder.svg?height=200&width=300" },
    { name: "RPG", icon: Trophy, count: 189, image: "/placeholder.svg?height=200&width=300" },
    { name: "Strategy", icon: Users, count: 156, image: "/placeholder.svg?height=200&width=300" },
    { name: "Sports", icon: Play, count: 98, image: "/placeholder.svg?height=200&width=300" },
];
const ProductCategories = () => {
    return (_jsx("section", { className: "py-20 px-20 bg-muted/50", children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold mb-4", children: "Browse by Category" }), _jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Explore our vast collection of games across different genres and find your next favorite" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: gameCategories.map((category) => (_jsxs(Card, { className: "group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: category.image || "/placeholder.svg", alt: category.name, width: 300, height: 200, className: "w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" }), _jsx("div", { className: "absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx(category.icon, { className: "h-12 w-12 text-white" }) })] }), _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("h3", { className: "text-xl font-semibold mb-2", children: category.name }), _jsxs("p", { className: "text-muted-foreground", children: [category.count, " games available"] })] })] }, category.name))) })] }) }));
};
export default ProductCategories;
