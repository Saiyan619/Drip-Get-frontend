import { useState, useEffect } from 'react';
export const useFilters = () => {
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        order: 'desc'
    });
    const [searchInput, setSearchInput] = useState('');
    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(prev => ({ ...prev, search: searchInput || undefined, page: 1 }));
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);
    const updateFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value === '' ? undefined : value,
            page: key !== 'page' ? 1 : value
        }));
    };
    const clearFilters = () => {
        setFilters({
            page: 1,
            limit: 10,
            sortBy: 'createdAt',
            order: 'desc'
        });
        setSearchInput('');
    };
    const hasActiveFilters = Boolean(filters.search ||
        filters.category ||
        filters.minPrice ||
        filters.maxPrice);
    return {
        filters,
        searchInput,
        setSearchInput,
        updateFilter,
        clearFilters,
        hasActiveFilters
    };
};
