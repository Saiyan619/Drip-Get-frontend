import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProductCard } from './ProductCard';
export const ProductGrid = ({ products, viewMode,
// onAddToCart 
 }) => {
    if (products.length === 0) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx("p", { className: "text-gray-500 text-lg", children: "No products found" }), _jsx("p", { className: "text-gray-400 mt-2", children: "Try adjusting your filters" })] }));
    }
    return (_jsx("div", { className: `grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`, children: products.map((product) => (
        // <Link to={`/product/${product._id}`}>
        _jsx(ProductCard, { product: product }, product._id)
        // </Link>
        )) }));
};
