import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Filter, Grid, List } from 'lucide-react';
import { useFilters } from '@/hooks/UseFilter';
import { useGetProducts } from '@/apiServices/ProductApi';
import { ProductFilters } from './components/ProductFilters';
import { ActiveFilters } from './components/ActiveFilter';
import { ProductSkeleton } from './components/ProductSkeleton';
import { ProductGrid } from './components/ProductGrid';
import { Pagination } from './components/Pagination';
const SearchPage = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const { filters, searchInput, setSearchInput, updateFilter, clearFilters, hasActiveFilters } = useFilters();
    const { data: productsData, isPending, error } = useGetProducts(filters);
    // Get unique categories from the products for filter dropdown
    const categories = useMemo(() => {
        if (!productsData?.products)
            return [];
        return [...new Set(productsData.products.map(product => product.category))];
    }, [productsData]);
    const handleAddToCart = (product) => {
        console.log('Adding to cart:', product);
        // Implement your cart logic here
    };
    const handleRemoveFilter = (key) => {
        updateFilter(key, '');
    };
    const handleRemoveSearch = () => {
        setSearchInput('');
        updateFilter('search', '');
    };
    const debugConsole = () => {
        console.log('Products data:', productsData);
    };
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 max-w-7xl", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Products" }), _jsx("p", { className: "text-gray-600", children: productsData ? `${productsData.total} products found` : 'Loading products...' })] }), _jsxs("div", { className: "flex items-center gap-2 mt-4 sm:mt-0", children: [_jsx(Button, { onClick: debugConsole, variant: "outline", size: "sm", children: "Debug Console" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setViewMode(viewMode === 'grid' ? 'list' : 'grid'), children: viewMode === 'grid' ? _jsx(List, { className: "h-4 w-4" }) : _jsx(Grid, { className: "h-4 w-4" }) }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => setShowFilters(!showFilters), className: "", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filters"] })] })] }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [_jsx("div", { className: `lg:w-64 lg:block ${showFilters ? 'block' : 'hidden'}`, children: _jsx(ProductFilters, { filters: filters, searchInput: searchInput, categories: categories[0] || '', hasActiveFilters: hasActiveFilters, onSearchChange: setSearchInput, onFilterChange: updateFilter, onClearFilters: clearFilters }) }), _jsxs("div", { className: "flex-1", children: [hasActiveFilters && (_jsx(ActiveFilters, { filters: filters, onRemoveFilter: handleRemoveFilter, onRemoveSearch: handleRemoveSearch })), error && (_jsx(Alert, { className: "mb-6", children: _jsx(AlertDescription, { children: error instanceof Error ? error.message : 'Failed to fetch products' }) })), isPending && (_jsx(ProductSkeleton, { count: filters.limit || 10, viewMode: viewMode })), productsData && !isPending && (_jsxs(_Fragment, { children: [_jsx(ProductGrid, { products: productsData.products, viewMode: viewMode }), _jsx(Pagination, { currentPage: productsData.page, totalPages: productsData.totalPages, onPageChange: (page) => updateFilter('page', page) })] }))] })] })] }));
};
export default SearchPage;
