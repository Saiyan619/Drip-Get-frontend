import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Edit, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const ShippingMethod = () => {
    const getShippingMethodDetails = (method) => {
        switch (method) {
            case "standard":
                return { name: "Standard Shipping", time: "5-7 business days", cost: "Free" };
            case "express":
                return { name: "Express Shipping", time: "2-3 business days", cost: "$15.00" };
            case "overnight":
                return { name: "Overnight Shipping", time: "Next business day", cost: "$35.00" };
            default:
                return { name: "Standard Shipping", time: "5-7 business days", cost: "Free" };
        }
    };
    const shippingDetails = getShippingMethodDetails("standard");
    return (_jsx("div", { children: _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Truck, { className: "h-5 w-5" }), "Shipping Method"] }), _jsxs(Button, { variant: "outline", size: "sm", className: "bg-transparent", children: [_jsx(Edit, { className: "h-4 w-4 mr-1" }), "Edit"] })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm sm:text-base", children: shippingDetails.name }), _jsx("p", { className: "text-xs sm:text-sm text-gray-600", children: shippingDetails.time })] }), _jsx("p", { className: "font-medium text-sm sm:text-base", children: shippingDetails.cost })] }) })] }) }));
};
export default ShippingMethod;
