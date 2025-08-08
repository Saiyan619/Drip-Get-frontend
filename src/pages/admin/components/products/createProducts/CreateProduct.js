import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { isNewImage } from '@/types';
import { useCreateProduct, useGetProducts } from '@/apiServices/ProductApi';
import Variants from './components/Variants';
import Pricing from './components/Pricing';
import BasicInfo from './components/BasicInfo';
const CreateProduct = () => {
    const { createNewProduct, isPending } = useCreateProduct();
    const { refetch } = useGetProducts();
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        category: "clothing",
        price: 0,
        salePrice: 0,
        images: [],
        variants: [{ size: "", color: "", inventory: 0, sku: "" }],
    });
    const categories = [
        { value: "clothing", label: "Clothing" },
        { value: "accessories", label: "Accessories" },
        { value: "shoes", label: "Shoes" },
        { value: "shirts", label: "Shirts" },
    ];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const colors = ["Black", "White", "Gray", "Navy", "Brown", "Red", "Blue", "Green"];
    const handleImageUpload = (e) => {
        const files = e.target.files;
        console.log("Selected files:", files);
        if (files) {
            const newImages = Array.from(files).map((file, index) => ({
                type: 'new',
                file: file,
                preview: URL.createObjectURL(file),
                name: file.name
            }));
            setNewProduct((prev) => ({
                ...prev,
                images: [...prev.images, ...newImages],
            }));
        }
    };
    const removeImage = (index) => {
        setNewProduct((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };
    const addVariant = () => {
        setNewProduct((prev) => ({
            ...prev,
            variants: [...prev.variants, { size: "", color: "", inventory: 0, sku: "" }],
        }));
    };
    const removeVariant = (index) => {
        if (newProduct.variants.length > 1) {
            setNewProduct((prev) => ({
                ...prev,
                variants: prev.variants.filter((_, i) => i !== index),
            }));
        }
    };
    const updateVariant = (index, field, value) => {
        setNewProduct((prev) => ({
            ...prev,
            variants: prev.variants.map((variant, i) => (i === index ? { ...variant, [field]: value } : variant)),
        }));
    };
    const generateSKU = (name, size, color) => {
        const nameCode = name.substring(0, 4).toUpperCase().replace(/\s/g, "");
        const sizeCode = size.toUpperCase();
        const colorCode = color.substring(0, 3).toUpperCase();
        return `${nameCode}-${sizeCode}-${colorCode}`;
    };
    const handleAddProduct = async () => {
        // Validation
        if (!newProduct.name || !newProduct.description || !newProduct.price) {
            alert("Please fill in all required fields");
            return;
        }
        if (newProduct.variants.some((v) => !v.size || !v.color || v.inventory < 0)) {
            alert("Please complete all variant information");
            return;
        }
        try {
            // Auto-generate SKUs if not provided
            const variantsWithSKU = newProduct.variants.map((variant) => ({
                ...variant,
                sku: variant.sku || generateSKU(newProduct.name, variant.size, variant.color),
            }));
            const productData = {
                ...newProduct,
                variants: variantsWithSKU,
            };
            const product = {
                name: productData.name,
                description: productData.description,
                category: productData.category,
                price: productData.price,
                salePrice: productData.salePrice,
                images: productData.images,
                variants: productData.variants.map((variant, index) => ({
                    ...variant,
                })),
            };
            await createNewProduct(product);
            await refetch();
            // Reset form
            setNewProduct({
                name: "",
                description: "",
                category: "clothing",
                price: 0,
                salePrice: 0,
                images: [],
                variants: [{ size: "", color: "", inventory: 0, sku: "" }],
            });
            setIsAddProductOpen(false);
        }
        catch (error) {
            console.error("Error creating product:", error);
            alert("Error creating product. Please try again.");
        }
        finally {
        }
    };
    return (_jsx("div", { children: _jsxs(Dialog, { open: isAddProductOpen, onOpenChange: setIsAddProductOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add Product"] }) }), _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Add New Product" }), _jsx(DialogDescription, { children: "Create a new product for your store with variants and images" })] }), _jsxs("div", { className: "grid gap-6 py-4", children: [_jsx(BasicInfo, { newProduct: newProduct, setNewProduct: setNewProduct, categories: categories }), _jsx(Pricing, { newProduct: newProduct, setNewProduct: setNewProduct }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Product Images" }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "images", children: "Upload Images" }), _jsx(Input, { id: "images", type: "file", multiple: true, accept: "image/*", onChange: handleImageUpload, className: "mt-1" }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Upload multiple images for your product" })] }), newProduct.images.length > 0 && (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: newProduct.images.map((image, index) => (_jsxs("div", { className: "relative group", children: [_jsx("div", { className: "aspect-square bg-gray-100 rounded-lg overflow-hidden", children: _jsx("img", { src: isNewImage(image) ? image.preview : image.url, alt: `Product image ${index + 1}`, className: "w-full h-full object-cover", onError: (e) => {
                                                                // Fallback for broken images
                                                                e.currentTarget.src = "/placeholder.svg?height=200&width=200&text=Product+Image";
                                                            } }) }), _jsx(Button, { variant: "destructive", size: "icon", className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6", onClick: () => removeImage(index), children: _jsx(X, { className: "h-3 w-3" }) })] }, index))) }))] }), _jsx(Variants, { addVariant: addVariant, newProduct: newProduct, removeVariant: removeVariant, colors: colors, updateVariant: updateVariant, sizes: sizes })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setIsAddProductOpen(false), disabled: isPending, children: "Cancel" }), _jsx(Button, { onClick: handleAddProduct, disabled: isPending, children: isPending ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }), "Creating..."] })) : (_jsxs(_Fragment, { children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create Product"] })) })] })] })] }) }));
};
export default CreateProduct;
