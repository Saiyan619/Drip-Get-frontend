import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// UpdateCartDialog.tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateCartItem } from '@/apiServices/CartServices';
import { Edit2, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
const UpdateCartDialog = ({ cartItem, onUpdate }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        size: cartItem.size,
        color: cartItem.color,
        quantity: cartItem.quantity
    });
    const { updateSingleCart, isPending } = useUpdateCartItem();
    // Get unique sizes and colors from product variants
    const availableSizes = [...new Set(cartItem.productId.variants.map(v => v.size))];
    const availableColors = [...new Set(cartItem.productId.variants.map(v => v.color))];
    // Get variants that match current size/color selection
    const getAvailableVariantsForSize = (size) => {
        return cartItem.productId.variants.filter(v => v.size === size);
    };
    const getAvailableVariantsForColor = (color) => {
        return cartItem.productId.variants.filter(v => v.color === color);
    };
    // Get current variant info
    const currentVariant = cartItem.productId.variants.find(v => v.size === formData.size && v.color === formData.color);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentVariant) {
            console.error('Selected variant not available');
            return;
        }
        if (formData.quantity > currentVariant.inventory) {
            console.error('Quantity exceeds available inventory');
            return;
        }
        try {
            await updateSingleCart({
                _id: cartItem._id,
                productId: cartItem.productId._id,
                size: formData.size,
                color: formData.color,
                quantity: formData.quantity
            });
            setOpen(false);
            onUpdate(); // Refresh cart data
        }
        catch (error) {
            console.error('Error updating cart item:', error);
        }
    };
    const handleQuantityChange = (increment) => {
        const maxQuantity = currentVariant?.inventory || 1;
        setFormData(prev => ({
            ...prev,
            quantity: increment
                ? Math.min(prev.quantity + 1, maxQuantity)
                : Math.max(1, prev.quantity - 1)
        }));
    };
    const handleSizeChange = (newSize) => {
        setFormData(prev => {
            // Check if current color is available for new size
            const availableColorsForSize = getAvailableVariantsForSize(newSize).map(v => v.color);
            const newColor = availableColorsForSize.includes(prev.color)
                ? prev.color
                : availableColorsForSize[0];
            return {
                ...prev,
                size: newSize,
                color: newColor,
                quantity: 1 // Reset quantity when changing variants
            };
        });
    };
    const handleColorChange = (newColor) => {
        setFormData(prev => {
            // Check if current size is available for new color
            const availableSizesForColor = getAvailableVariantsForColor(newColor).map(v => v.size);
            const newSize = availableSizesForColor.includes(prev.size)
                ? prev.size
                : availableSizesForColor[0];
            return {
                ...prev,
                size: newSize,
                color: newColor,
                quantity: 1 // Reset quantity when changing variants
            };
        });
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "sm", className: "text-blue-600 hover:text-blue-800", children: [_jsx(Edit2, { className: "h-4 w-4 mr-1" }), "Edit"] }) }), _jsx(DialogContent, { className: "sm:max-w-[425px]", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Update Cart Item" }), _jsxs(DialogDescription, { children: ["Make changes to ", cartItem.productId.name, ". Click save when you're done."] })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-3", children: [_jsx(Label, { htmlFor: "size", children: "Size" }), _jsxs(Select, { value: formData.size, onValueChange: handleSizeChange, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select size" }) }), _jsx(SelectContent, { children: availableSizes.map(size => (_jsx(SelectItem, { value: size, children: size }, size))) })] })] }), _jsxs("div", { className: "grid gap-3", children: [_jsx(Label, { htmlFor: "color", children: "Color" }), _jsxs(Select, { value: formData.color, onValueChange: handleColorChange, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select color" }) }), _jsx(SelectContent, { children: availableColors.map(color => (_jsx(SelectItem, { value: color, children: color }, color))) })] })] }), currentVariant && (_jsxs("div", { className: "text-sm text-gray-600", children: [_jsxs("p", { children: ["SKU: ", currentVariant.sku] }), _jsxs("p", { children: ["Available: ", currentVariant.inventory, " units"] })] })), _jsxs("div", { className: "grid gap-3", children: [_jsx(Label, { htmlFor: "quantity", children: "Quantity" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { type: "button", variant: "outline", size: "icon", className: "h-8 w-8", onClick: () => handleQuantityChange(false), disabled: formData.quantity <= 1, children: _jsx(Minus, { className: "h-4 w-4" }) }), _jsx(Input, { id: "quantity", type: "number", min: "1", max: currentVariant?.inventory || 1, value: formData.quantity, onChange: (e) => {
                                                        const value = parseInt(e.target.value) || 1;
                                                        const maxQuantity = currentVariant?.inventory || 1;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            quantity: Math.max(1, Math.min(value, maxQuantity))
                                                        }));
                                                    }, className: "w-20 text-center" }), _jsx(Button, { type: "button", variant: "outline", size: "icon", className: "h-8 w-8", onClick: () => handleQuantityChange(true), disabled: formData.quantity >= (currentVariant?.inventory || 1), children: _jsx(Plus, { className: "h-4 w-4" }) })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { type: "button", variant: "outline", children: "Cancel" }) }), _jsx(Button, { type: "submit", disabled: isPending || !currentVariant || formData.quantity > (currentVariant?.inventory || 0), children: isPending ? 'Saving...' : 'Save changes' })] })] }) })] }));
};
export default UpdateCartDialog;
