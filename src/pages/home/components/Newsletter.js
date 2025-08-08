import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
const Newsletter = () => {
    return (_jsx("section", { className: "py-20", children: _jsx("div", { className: "container", children: _jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [_jsx("h2", { className: "text-3xl font-bold mb-4", children: "Stay in the Game" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "Get the latest game releases, exclusive deals, and gaming news delivered to your inbox" }), _jsxs("div", { className: "flex gap-4 max-w-md mx-auto", children: [_jsx(Input, { placeholder: "Enter your email", className: "flex-1" }), _jsxs(Button, { children: ["Subscribe", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] }) }) }));
};
export default Newsletter;
