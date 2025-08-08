import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGetMyOrders } from "@/apiServices/orderServices";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import { Badge } from "lucide-react";
const ProfileOrders = () => {
    const { myOrders } = useGetMyOrders();
    const test = () => {
        console.log(myOrders);
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "delivered":
                return "bg-green-100 text-green-800";
            case "shipped":
                return "bg-blue-100 text-blue-800";
            case "processing":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Order History" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: myOrders?.orders.map((order) => (_jsxs("div", { className: "border rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsxs("h3", { className: "font-medium", children: ["Order ", order.orderNumber] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Placed on ", new Date(order.createdAt).toLocaleDateString()] })] }), _jsxs("div", { className: "text-right", children: [_jsx(Badge, { className: getStatusColor(order.status), children: order.status.charAt(0).toUpperCase() + order.status.slice(1) }), _jsxs("p", { className: "font-semibold mt-1", children: ["$", order.total.toFixed(2)] })] })] }), _jsx(Separator, { className: "mb-4" }), _jsx("div", { className: "space-y-2" }), _jsxs("div", { className: "flex gap-2 mt-4", children: [_jsx(Button, { variant: "outline", size: "sm", children: "View Details" }), _jsx(Button, { variant: "outline", size: "sm", children: "Track Order" }), order.status === "delivered" && (_jsx(Button, { variant: "outline", size: "sm", children: "Reorder" }))] })] }, order._id))) }) })] }));
};
export default ProfileOrders;
