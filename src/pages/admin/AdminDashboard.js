import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetProducts } from "@/apiServices/ProductApi";
import { useGetAllOrders } from "@/apiServices/orderServices";
import AdminOrder from "./components/orders/AdminOrder";
import AdminProducts from "./components/products/AdminProducts";
import Users from "./components/users/Users";
import CreateProduct from "./components/products/createProducts/CreateProduct";
export default function AdminPage() {
    const { allOrders } = useGetAllOrders();
    const { data } = useGetProducts();
    const [activeTab, setActiveTab] = useState("products");
    // const [searchQuery, setSearchQuery] = useState("")
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        brand: "",
        price: "",
        category: "clothing",
        description: "",
        sizes: [],
        colors: [],
    });
    const stats = {
        // totalProducts: products.length,
        // totalOrders: 156,
        // totalRevenue: 45280,
        totalCustomers: 1234,
    };
    const totalRevenue = allOrders?.reduce((acc, order) => acc + order.total, 0);
    const latestProducts = allOrders?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
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
    const handleAddProduct = () => {
        // Add product logic
        console.log("Adding product:", newProduct);
        setIsAddProductOpen(false);
        setNewProduct({
            name: "",
            brand: "",
            price: "",
            category: "clothing",
            description: "",
            sizes: [],
            colors: [],
        });
    };
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Admin Dashboard" }), _jsx(CreateProduct, {})] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "products", children: "Products" }), _jsx(TabsTrigger, { value: "orders", children: "Orders" }), _jsx(TabsTrigger, { value: "customers", children: "Customers" })] }), _jsxs(TabsContent, { value: "overview", className: "mt-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Total Products" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: data?.products.length }), _jsx("p", { className: "text-xs text-muted-foreground", children: "+2 from last month" })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Total Orders" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: allOrders?.length }), _jsx("p", { className: "text-xs text-muted-foreground", children: "+12% from last month" })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Total Revenue" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-2xl font-bold", children: ["$", totalRevenue?.toLocaleString()] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "+8% from last month" })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Total Customers" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: stats.totalCustomers }), _jsx("p", { className: "text-xs text-muted-foreground", children: "+5% from last month" })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent Orders" }) }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Order ID" }), _jsx(TableHead, { children: "Customer" }), _jsx(TableHead, { children: "Total" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Date" })] }) }), _jsx(TableBody, { children: latestProducts?.map((order) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: order.orderNumber }), _jsx(TableCell, { children: order.shippingAddress.firstName }), _jsxs(TableCell, { children: ["$", order.total] }), _jsx(TableCell, { children: _jsx(Badge, { className: getStatusColor(order.status), children: order.status }) }), _jsx(TableCell, { children: new Date(order.createdAt).toLocaleDateString() })] }, order.orderNumber))) })] }) })] })] }), _jsx(TabsContent, { value: "products", className: "mt-6", children: _jsx(AdminProducts, {}) }), _jsx(TabsContent, { value: "orders", className: "mt-6", children: _jsx(AdminOrder, {}) }), _jsx(TabsContent, { value: "customers", className: "mt-6", children: _jsx(Users, {}) })] })] }));
}
