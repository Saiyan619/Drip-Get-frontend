import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Heart, ShoppingBag, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetSingleProduct } from "@/apiServices/ProductApi";
import { useParams } from "react-router-dom";
import { useAddToCart, useGetCart } from "@/apiServices/CartServices";
export default function ProductDetails() {
    const { id } = useParams();
    const { data: singleProduct, isLoading, error } = useGetSingleProduct(id);
    const { addCart, isPending } = useAddToCart();
    const { refetch } = useGetCart();
    // ALL HOOKS MUST BE AT THE TOP - BEFORE ANY EARLY RETURNS!
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const handleAddToCart = async () => {
        try {
            await addCart({
                productId: product._id,
                size: selectedSize,
                color: selectedColor,
                quantity,
            });
            await refetch();
        }
        catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };
    useEffect(() => {
        singleProduct;
    }, [singleProduct, isPending, error]);
    // Update selected size/color when product loads
    useEffect(() => {
        if (singleProduct && singleProduct.variants) {
            const sizes = [...new Set(singleProduct.variants.map(variant => variant.size) || [])];
            const colors = [...new Set(singleProduct.variants.map(variant => variant.color) || [])];
            if (sizes.length > 0 && !selectedSize) {
                setSelectedSize(sizes[0]);
            }
            if (colors.length > 0 && !selectedColor) {
                setSelectedColor(colors[0]);
            }
        }
    }, [singleProduct, selectedSize, selectedColor]);
    // NOW you can do early returns
    if (isLoading) {
        return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsx("div", { className: "flex items-center justify-center min-h-96", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Loading product details..." })] }) }) }));
    }
    if (error) {
        return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsx("div", { className: "flex items-center justify-center min-h-96", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-red-600 mb-2", children: "Error loading product" }), _jsx("p", { className: "text-gray-600", children: error.message })] }) }) }));
    }
    if (!singleProduct) {
        return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsx("div", { className: "flex items-center justify-center min-h-96", children: _jsx("div", { className: "text-center", children: _jsx("p", { className: "text-gray-600", children: "Product not found" }) }) }) }));
    }
    // Safe to use product data here
    const product = singleProduct;
    const sizes = [...new Set(product.variants?.map(variant => variant.size) || [])];
    const colors = [...new Set(product.variants?.map(variant => variant.color) || [])];
    // Calculate discount percentage if both price and salePrice exist
    const discountPercentage = product.salePrice && product.price > product.salePrice
        ? Math.round(((product.price - product.salePrice) / product.price) * 100)
        : 0;
    // Determine the display price (use salePrice if available, otherwise regular price)
    const displayPrice = product.salePrice || product.price;
    const originalPrice = product.salePrice ? product.price : null;
    // Find the current variant based on selected size and color
    const currentVariant = product.variants?.find(variant => variant.size === selectedSize && variant.color === selectedColor);
    // Check if current selection is in stock
    const isInStock = currentVariant ? currentVariant.inventory > 0 : false;
    // console.log(currentVariant)
    const mappedVar = product.variants?.map((item) => {
        return (item.size);
    });
    // console.log(product.variants)
    // console.log(currentVariant)
    const cartReq = {
        // selectedImage,
        selectedSize,
        selectedColor,
        quantity
    };
    return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "aspect-square overflow-hidden rounded-lg bg-gray-100 relative", children: [_jsx("img", { src: product.images?.[selectedImage] || "/placeholder.svg", alt: product.name, className: "object-cover w-full h-full" }), discountPercentage > 0 && (_jsxs(Badge, { className: "absolute top-4 left-4 bg-red-500", children: ["-", discountPercentage, "% OFF"] }))] }), _jsxs("div", { className: "grid grid-cols-4 gap-4", children: [product.images?.map((image, index) => (_jsx("button", { onClick: () => setSelectedImage(index), className: `aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${selectedImage === index ? "border-black shadow-md" : "border-gray-200 hover:border-gray-400"}`, children: _jsx("img", { src: image || "/placeholder.svg", alt: `${product.name} view ${index + 1}`, className: "object-cover w-full h-full" }) }, index))) || [], (product.images?.length || 0) < 4 && Array.from({ length: 4 - (product.images?.length || 0) }).map((_, index) => (_jsx("div", { className: "aspect-square overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-gray-400 text-xs text-center", children: [_jsx("div", { className: "w-8 h-8 mx-auto mb-1 opacity-50", children: _jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }), _jsx("circle", { cx: "8.5", cy: "8.5", r: "1.5" }), _jsx("polyline", { points: "21,15 16,10 5,21" })] }) }), "More photos"] }) }, `placeholder-${index}`)))] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600 mb-2", children: product.category }), _jsx("h1", { className: "text-3xl font-bold mb-4", children: product.name }), _jsxs("div", { className: "flex items-center space-x-4 mb-6", children: [_jsxs("span", { className: "text-3xl font-bold", children: ["$", displayPrice] }), originalPrice && (_jsxs("span", { className: "text-xl text-gray-500 line-through", children: ["$", originalPrice] }))] })] }), _jsx(Separator, {}), _jsx("div", { children: _jsx("p", { className: "text-gray-700 leading-relaxed", children: product.description }) }), _jsx(Separator, {}), sizes.length > 1 && (_jsxs("div", { children: [_jsx(Label, { className: "text-base font-medium mb-3 block", children: "Size" }), _jsx(RadioGroup, { value: selectedSize, onValueChange: setSelectedSize, children: _jsx("div", { className: "flex flex-wrap gap-2", children: sizes.map((size) => (_jsxs("div", { children: [_jsx(RadioGroupItem, { value: size, id: size, className: "peer sr-only" }), _jsx(Label, { htmlFor: size, className: "flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer peer-checked:border-black peer-checked:bg-black peer-checked:text-white hover:border-gray-400 transition-colors", children: size })] }, size))) }) })] })), colors.length >= 1 && (_jsxs("div", { children: [_jsx(Label, { className: "text-base font-medium mb-3 block", children: "Color" }), _jsx(RadioGroup, { value: selectedColor, onValueChange: setSelectedColor, children: _jsx("div", { className: "flex flex-wrap gap-2", children: colors.map((color) => (_jsxs("div", { children: [_jsx(RadioGroupItem, { value: color, id: color, className: "peer sr-only" }), _jsx(Label, { htmlFor: color, className: "flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer peer-checked:border-black peer-checked:bg-black peer-checked:text-white hover:border-gray-400 transition-colors", children: color })] }, color))) }) })] })), _jsxs("div", { children: [_jsx(Label, { className: "text-base font-medium mb-3 block", children: "Quantity" }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Button, { variant: "outline", size: "icon", onClick: () => setQuantity(Math.max(1, quantity - 1)), disabled: quantity <= 1, children: "-" }), _jsx("span", { className: "text-lg font-medium w-8 text-center", children: quantity }), _jsx(Button, { variant: "outline", size: "icon", onClick: () => setQuantity(quantity + 1), disabled: currentVariant ? quantity >= currentVariant.inventory : false, children: "+" })] }), currentVariant && (_jsxs("p", { className: "text-sm text-gray-600 mt-2", children: [currentVariant.inventory, " items in stock"] }))] }), !isInStock ?
                            (_jsxs("div", { className: "space-y-4", children: [_jsxs(Button, { size: "lg", className: "w-full", disabled: !isInStock, children: [_jsx(ShoppingBag, { className: "mr-2 h-5 w-5" }), isInStock
                                                ? `Add to Cart - $${(displayPrice * quantity).toFixed(2)}`
                                                : 'Out of Stock'] }), _jsxs(Button, { variant: "outline", size: "lg", className: "w-full bg-transparent", children: [_jsx(Heart, { className: "mr-2 h-4 w-4" }), "Add to Wishlist"] })] })) :
                            (_jsxs(Button, { onClick: handleAddToCart, size: "lg", className: "w-full", children: ["     ", isPending ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }), _jsx("span", { children: "Adding" })] })) : ("Add to Cart")] })), _jsx(Separator, {}), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Truck, { className: "h-5 w-5 text-gray-600" }), _jsx("span", { className: "text-sm", children: "Free shipping on orders over $200" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(RotateCcw, { className: "h-5 w-5 text-gray-600" }), _jsx("span", { className: "text-sm", children: "30-day return policy" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Shield, { className: "h-5 w-5 text-gray-600" }), _jsx("span", { className: "text-sm", children: "2-year warranty included" })] })] })] })] }) }));
}
