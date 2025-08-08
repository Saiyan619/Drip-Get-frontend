import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from 'lucide-react';
import { useDeleteProducts } from '@/apiServices/ProductApi';
const DeleteProduct = ({ id }) => {
    const { deleteProduct } = useDeleteProducts();
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDeleteProduct = async () => {
        setIsDeleting(true);
        try {
            await deleteProduct(id);
            // Only close dialog if deletion was successful
            setOpen(false);
        }
        catch (error) {
            console.error('Failed to delete product:', error);
            // You might want to show an error message to the user here
            // The dialog remains open so user can try again or cancel
        }
        finally {
            setIsDeleting(false);
        }
    };
    return (_jsx("div", { children: _jsxs(AlertDialog, { open: open, onOpenChange: setOpen, children: [_jsxs(AlertDialogTrigger, { className: 'flex items-center text-red-600 mt-1', children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete"] }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Are you absolutely sure?" }), _jsx(AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete your Product and remove your data from our servers." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { disabled: isDeleting, children: "Cancel" }), _jsx("button", { onClick: handleDeleteProduct, disabled: isDeleting, className: "inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", children: isDeleting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Deleting..."] })) : ('Continue') })] })] })] }) }));
};
export default DeleteProduct;
