import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Search, Filter, MoreHorizontal, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetProducts } from '@/apiServices/ProductApi';
import UpdateProducts from './updateProducts/UpdateProducts';
import DeleteProduct from './deleteProduct/DeleteProduct';
const AdminProducts = () => {
    const { data } = useGetProducts();
    const [searchQuery, setSearchQuery] = useState("");
    const [editProductId, setEditProductId] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const filteredProducts = data?.products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleEditClick = (productId) => {
        setEditProductId(productId);
        setIsEditDialogOpen(true);
    };
    return (_jsxs("div", { children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: "Products" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), _jsx(Input, { placeholder: "Search products...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-8 w-64" })] }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(Filter, { className: "h-4 w-4" }) })] })] }) }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[180px]", children: "Image" }), _jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Category" }), _jsx(TableHead, { children: "Price" }), _jsx(TableHead, { children: "Stock" }), _jsx(TableHead, { className: "w-[70px]", children: "Actions" })] }) }), _jsx(TableBody, { children: filteredProducts?.map((product) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx("img", { src: product.images[0] || "/placeholder.svg", alt: product.name, width: 50, height: 50, className: "rounded object-cover" }) }), _jsx(TableCell, { className: "font-medium", children: product.name }), _jsx(TableCell, { className: "capitalize", children: product.category }), _jsxs(TableCell, { children: ["$", product.price] }), _jsx(TableCell, { children: _jsx(Badge, { variant: product.variants[0].inventory > 0 ? "default" : "destructive", children: product.variants[0].inventory > 0 ? "In Stock" : "Out of Stock" }) }), _jsx(TableCell, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), "View"] }), _jsxs(DropdownMenuItem, { onClick: () => handleEditClick(product._id), children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), "Edit"] }), _jsx("div", { className: 'ml-2 text-md', children: _jsx(DeleteProduct, { id: product._id }) })] })] }) })] }, product._id))) })] }) })] }), editProductId && (_jsx(UpdateProducts, { id: editProductId, open: isEditDialogOpen, onOpenChange: setIsEditDialogOpen }))] }));
};
export default AdminProducts;
