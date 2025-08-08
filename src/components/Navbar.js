import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, ShoppingCart, User, Crown, } from "lucide-react";
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useGetCart } from '@/apiServices/CartServices';
const Navbar = () => {
    const { data } = useGetCart();
    useEffect(() => {
        data;
    }, [data]);
    const numOfCartItems = data?.items.length;
    return (_jsx("header", { className: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: _jsxs("div", { className: "container flex h-16 items-center justify-between", children: [_jsxs("div", { className: "pl-5 flex items-center gap-16", children: [_jsx(Link, { to: "/", className: "flex items-center gap-2", children: _jsx("span", { className: "text-2xl font-bold", children: "Drip Get" }) }), _jsx("nav", { className: "hidden md:flex items-center gap-6", children: _jsxs(Link, { to: "/search", className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium  border border-gray-200 rounded-lg  hover:border-primary/20 transition-all duration-200 ease-in-out group shadow-sm", children: [_jsx(Search, { className: "h-4 w-4 group-hover:scale-110 transition-transform duration-200" }), "Search Products"] }) })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "hidden md:flex items-center gap-2", children: _jsxs("div", { className: "relative", children: [_jsx(SignedOut, { children: _jsx("div", { className: 'border px-3 py-[5px] rounded', children: _jsx(SignInButton, {}) }) }), _jsx(SignedIn, { children: _jsx(UserButton, {}) })] }) }), _jsx(ThemeToggle, {}), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "hidden sm:flex", children: _jsx(User, { className: "h-5 w-5" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { to: "/userProfile", children: [_jsx(User, { className: "h-5 w-5" }), "Profile"] }) }), _jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { to: "/admin", children: [_jsx(Crown, { className: "h-5 w-5" }), "Admin"] }) })] })] }), _jsx(Link, { to: "/cart", children: _jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [_jsx(ShoppingCart, { className: "h-5 w-5" }), _jsx(Badge, { variant: "destructive", className: "absolute -top-2 -right-2 h-5 w-5 min-w-[1.25rem] rounded-full p-0 flex items-center justify-center text-xs font-bold text-white bg-red-600 border-0", children: numOfCartItems })] }) })] })] }) }));
};
export default Navbar;
