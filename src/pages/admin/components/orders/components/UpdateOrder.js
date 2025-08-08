import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useGetAllOrders, useUpdateOrder } from '@/apiServices/orderServices';
import { Edit, Loader2 } from 'lucide-react';
const UpdateOrder = ({ id, initialStatus }) => {
    const { updateUserOrder, isPending } = useUpdateOrder();
    const { refetch } = useGetAllOrders();
    const [status, setStatus] = useState(initialStatus);
    const [open, setOpen] = useState(false);
    const handleUpdateOrder = async () => {
        try {
            await updateUserOrder({ id, status: status });
            await refetch;
            setOpen(false);
        }
        catch (error) {
            console.error('Failed to delete product:', error);
        }
    };
    const handleStatusChange = (value) => {
        setStatus(value);
    };
    console.log(status);
    return (_jsx("div", { children: _jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsxs(DialogTrigger, { className: 'flex items-center text-green-600 mt-1', children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), "Update Order"] }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Update Order Status" }), _jsx(DialogDescription, { children: "Change the status of this order. This action will update the order in the system." })] }), _jsx("div", { children: _jsxs(Select, { value: status, onValueChange: handleStatusChange, children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsx(SelectContent, { children: _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Order Status" }), _jsx(SelectItem, { value: "pending", children: "Pending" }), _jsx(SelectItem, { value: "processing", children: "Paid" }), _jsx(SelectItem, { value: "shipped", children: "Shipped" }), _jsx(SelectItem, { value: "delivered", children: "Delivered" })] }) })] }) }), _jsxs(DialogFooter, { children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) }), _jsx(Button, { onClick: handleUpdateOrder, disabled: isPending, type: "submit", children: isPending ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Updating..."] })) : ('Update Order') })] })] })] }) }));
};
export default UpdateOrder;
