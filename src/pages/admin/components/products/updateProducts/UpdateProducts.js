import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Edit, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { isExistingImage, isNewImage } from '@/types';
import { useGetSingleProduct, useUpdateProduct } from '@/apiServices/ProductApi';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
const UpdateProducts = ({ id, open, onOpenChange }) => {
    const { updateProductData, isPending } = useUpdateProduct();
    const { data } = useGetSingleProduct(id);
    // Initialize with empty state first
    const [editProduct, setEditProduct] = useState({
        name: "",
        description: "",
        category: "clothing",
        price: 0,
        salePrice: 0,
        images: [],
        variants: [{ size: "", color: "", inventory: 0, sku: "" }],
    });
    // Update state when data is loaded
    useEffect(() => {
        if (data) {
            setEditProduct({
                name: data.name || "",
                description: data.description || "",
                category: data.category || "clothing",
                price: data.price || 0,
                salePrice: data.salePrice || 0,
                images: data.images?.map((imageUrl, index) => ({
                    type: 'existing',
                    url: imageUrl,
                    name: `existing-image-${index}`,
                    id: `existing-${index}`
                })) || [],
                variants: data.variants || [{ size: "", color: "", inventory: 0, sku: "" }],
            });
        }
    }, [data]);
    const categories = [
        { value: "clothing", label: "Clothing" },
        { value: "accessories", label: "Accessories" },
        { value: "shoes", label: "Shoes" },
        { value: "shirts", label: "Shirts" },
    ];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const colors = ["Black", "White", "Gray", "Navy", "Brown", "Red", "Blue", "Green"];
    const generateSKU = (name, size, color) => {
        const nameCode = name.substring(0, 4).toUpperCase().replace(/\s/g, "");
        const sizeCode = size.toUpperCase();
        const colorCode = color.substring(0, 3).toUpperCase();
        return `${nameCode}-${sizeCode}-${colorCode}`;
    };
    const handleUpdateProduct = async () => {
        if (!editProduct.name || !editProduct.description || !editProduct.price) {
            alert("Please fill in all required fields");
            return;
        }
        if (editProduct.variants.some((v) => !v.size || !v.color || v.inventory < 0)) {
            alert("Please complete all variant information");
            return;
        }
        try {
            const variantsWithSKU = editProduct.variants.map((variant) => ({
                ...variant,
                sku: variant.sku || generateSKU(editProduct.name, variant.size, variant.color),
            }));
            const newImages = editProduct.images.filter(isNewImage);
            const existingImages = editProduct.images.filter(isExistingImage);
            let allImageUrls = [...existingImages.map(img => img.url)];
            if (newImages.length > 0) {
                console.log("New images to upload:", newImages);
                const placeholderUrls = newImages.map((_, index) => `placeholder-new-image-${index}.jpg`);
                allImageUrls = [...allImageUrls, ...placeholderUrls];
            }
            console.log(allImageUrls);
            const productData = {
                name: editProduct.name,
                description: editProduct.description,
                category: editProduct.category,
                price: editProduct.price,
                salePrice: editProduct.salePrice,
                images: editProduct.images.map((img) => {
                    if (isNewImage(img)) {
                        return {
                            type: "new", // 👈 force literal type
                            file: img.file,
                            preview: img.preview,
                            name: img.name,
                        };
                    }
                    else if (isExistingImage(img)) {
                        return {
                            type: "existing", // 👈 force literal type
                            url: img.url,
                            name: img.name,
                            id: img.id,
                        };
                    }
                    else {
                        throw new Error("Invalid image format");
                    }
                }),
                variants: variantsWithSKU,
            };
            console.log(productData);
            await updateProductData({ id, input: productData });
            onOpenChange(false);
        }
        catch (error) {
            console.error("Error updating product:", error);
            alert("Error updating product. Please try again.");
        }
    };
    const updateEditVariant = (index, field, value) => {
        setEditProduct((prev) => ({
            ...prev,
            variants: prev.variants.map((variant, i) => (i === index ? { ...variant, [field]: value } : variant)),
        }));
    };
    const addEditVariant = () => {
        setEditProduct((prev) => ({
            ...prev,
            variants: [...prev.variants, { size: "", color: "", inventory: 0, sku: "" }],
        }));
    };
    const removeEditVariant = (index) => {
        if (editProduct.variants.length > 1) {
            setEditProduct((prev) => ({
                ...prev,
                variants: prev.variants.filter((_, i) => i !== index),
            }));
        }
    };
    const handleEditImageUpload = (e) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map((file, index) => ({
                type: 'new',
                file: file,
                preview: URL.createObjectURL(file),
                name: file.name
            }));
            setEditProduct((prev) => ({
                ...prev,
                images: [...prev.images, ...newImages],
            }));
        }
    };
    const removeEditImage = (index) => {
        setEditProduct((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, modal: true, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Edit Product" }), _jsxs(DialogDescription, { children: ["Update product information for \"", data?.name, "\""] })] }), _jsxs("div", { className: "grid gap-6 py-4", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Basic Information" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "edit-name", children: "Product Name *" }), _jsx(Input, { id: "edit-name", value: editProduct.name, onChange: (e) => setEditProduct({ ...editProduct, name: e.target.value }), placeholder: "e.g., Stussy jorts" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "edit-category", children: "Category *" }), _jsx("select", { id: "edit-category", value: editProduct.category, onChange: (e) => setEditProduct({ ...editProduct, category: e.target.value }), className: "w-full px-3 py-2 border rounded-lg", children: categories.map((cat) => (_jsx("option", { value: cat.value, children: cat.label }, cat.value))) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "edit-description", children: "Description *" }), _jsx(Textarea, { id: "edit-description", value: editProduct.description, onChange: (e) => setEditProduct({ ...editProduct, description: e.target.value }), placeholder: "Product description", rows: 3 })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Pricing" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "edit-price", children: "Regular Price *" }), _jsx(Input, { id: "edit-price", type: "number", min: "0", step: "0.01", value: editProduct.price, onChange: (e) => setEditProduct({ ...editProduct, price: Number.parseFloat(e.target.value) || 0 }), placeholder: "50.00" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "edit-salePrice", children: "Sale Price (Optional)" }), _jsx(Input, { id: "edit-salePrice", type: "number", min: "0", step: "0.01", value: editProduct.salePrice, onChange: (e) => setEditProduct({ ...editProduct, salePrice: Number.parseFloat(e.target.value) || 0 }), placeholder: "30.00" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Product Images" }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "edit-images", children: "Upload Additional Images" }), _jsx(Input, { id: "edit-images", type: "file", multiple: true, accept: "image/*", onChange: handleEditImageUpload, className: "mt-1" }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Add more images to your product gallery" })] }), editProduct.images.length > 0 && (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: editProduct.images.map((image, index) => (_jsxs("div", { className: "relative group", children: [_jsx("div", { className: "aspect-square bg-gray-100 rounded-lg overflow-hidden", children: _jsx("img", { src: isNewImage(image) ? image.preview : image.url, alt: `Product image ${index + 1}`, className: "object-cover w-full h-full", onError: (e) => {
                                                        const target = e.target;
                                                        target.src = "/placeholder.svg?height=200&width=200&text=Product+Image";
                                                    } }) }), _jsx(Button, { variant: "destructive", size: "icon", className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6", onClick: () => removeEditImage(index), children: _jsx(X, { className: "h-3 w-3" }) }), _jsx(Badge, { className: `absolute bottom-2 left-2 text-xs ${isNewImage(image) ? 'bg-blue-500' : 'bg-green-500'}`, children: isNewImage(image) ? 'New' : 'Existing' })] }, index))) }))] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Product Variants" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: addEditVariant, children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), "Add Variant"] })] }), _jsx("div", { className: "space-y-4", children: editProduct.variants.map((variant, index) => (_jsxs("div", { className: "p-4 border rounded-lg space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h4", { className: "font-medium", children: ["Variant ", index + 1] }), editProduct.variants.length > 1 && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => removeEditVariant(index), className: "text-red-600 hover:text-red-700", children: _jsx(Trash2, { className: "h-4 w-4" }) }))] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Size *" }), _jsxs("select", { value: variant.size, onChange: (e) => updateEditVariant(index, "size", e.target.value), className: "w-full px-3 py-2 border rounded-lg", children: [_jsx("option", { value: "", children: "Select Size" }), sizes.map((size) => (_jsx("option", { value: size, children: size }, size)))] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Color *" }), _jsxs("select", { value: variant.color, onChange: (e) => updateEditVariant(index, "color", e.target.value), className: "w-full px-3 py-2 border rounded-lg", children: [_jsx("option", { value: "", children: "Select Color" }), colors.map((color) => (_jsx("option", { value: color, children: color }, color)))] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Inventory *" }), _jsx(Input, { type: "number", min: "0", value: variant.inventory, onChange: (e) => updateEditVariant(index, "inventory", Number.parseInt(e.target.value) || 0), placeholder: "10" })] }), _jsxs("div", { children: [_jsx(Label, { children: "SKU" }), _jsx(Input, { value: variant.sku, onChange: (e) => updateEditVariant(index, "sku", e.target.value), placeholder: "Auto-generated" }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Leave empty to auto-generate" })] })] })] }, index))) })] }), data && (_jsxs("div", { className: "space-y-4 p-4 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Current Product Information" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Original Name:" }), " ", data.name] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Original Price:" }), " $", data.price] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Category:" }), " ", data.category] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Stock Status:" }), _jsx(Badge, { className: `ml-2 ${data.variants[0]?.inventory > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: data.variants[0]?.inventory > 0 ? "In Stock" : "Out of Stock" })] })] })] }))] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), disabled: isPending, children: "Cancel" }), _jsx(Button, { onClick: handleUpdateProduct, disabled: isPending, children: isPending ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }), "Updating..."] })) : (_jsxs(_Fragment, { children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), "Update Product"] })) })] })] }) }));
};
export default UpdateProducts;
