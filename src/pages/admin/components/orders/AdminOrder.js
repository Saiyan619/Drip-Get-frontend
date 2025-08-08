import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetAllOrders } from '@/apiServices/orderServices';
import UpdateOrder from './components/UpdateOrder';
const AdminOrder = () => {
    const { allOrders } = useGetAllOrders();
    const getStatusColor = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-500 text-green-100";
            case "shipped":
                return "bg-blue-100 text-blue-800";
            case "processing":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    return (_jsx("div", { children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "All Orders" }) }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Order ID" }), _jsx(TableHead, { children: "Customer" }), _jsx(TableHead, { children: "Total" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Date" }), _jsx(TableHead, { className: "w-[70px]", children: "Actions" })] }) }), _jsx(TableBody, { children: allOrders?.map((order) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: order.orderNumber }), _jsx(TableCell, { children: order.shippingAddress.firstName }), _jsxs(TableCell, { children: ["$", order.total] }), _jsx(TableCell, { children: _jsx(Badge, { className: getStatusColor(order.status), children: order.status }) }), _jsx(TableCell, { children: new Date(order.createdAt).toLocaleDateString() }), _jsx(TableCell, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), "View Details"] }), _jsx("div", { className: 'ml-2 text-sm', children: _jsx(UpdateOrder, { id: order._id, initialStatus: order.status }) })] })] }) })] }, order._id))) })] }) })] }) }));
};
export default AdminOrder;
