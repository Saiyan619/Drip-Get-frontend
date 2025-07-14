import React, { useState, useMemo } from 'react';
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
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const {
    filters,
    searchInput,
    setSearchInput,
    updateFilter,
    clearFilters,
    hasActiveFilters
  } = useFilters();

  const { data: productsData, isPending, error } = useGetProducts(filters);

  // Get unique categories from the products for filter dropdown
  const categories = useMemo(() => {
    if (!productsData?.products) return [];
    return [...new Set(productsData.products.map(product => product.category))];
  }, [productsData]);

  const handleAddToCart = (product: any) => {
    console.log('Adding to cart:', product);
    // Implement your cart logic here
  };

  const handleRemoveFilter = (key: keyof typeof filters) => {
    updateFilter(key, '');
  };

  const handleRemoveSearch = () => {
    setSearchInput('');
    updateFilter('search', '');
  };

  const debugConsole = () => {
    console.log('Products data:', productsData);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">
            {productsData ? `${productsData.total} products found` : 'Loading products...'}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Button onClick={debugConsole} variant="outline" size="sm">
            Debug Console
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className=""
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>
      

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <ProductFilters
            filters={filters}
            searchInput={searchInput}
            categories={categories[0] || ''}
            hasActiveFilters={hasActiveFilters}
            onSearchChange={setSearchInput}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Active Filters */}
          {hasActiveFilters && (
            <ActiveFilters
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onRemoveSearch={handleRemoveSearch}
            />
          )}

          {/* Error State */}
          {error && (
            <Alert className="mb-6">
              <AlertDescription>
                {error instanceof Error ? error.message : 'Failed to fetch products'}
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {isPending && (
            <ProductSkeleton count={filters.limit || 10} viewMode={viewMode} />
          )}

          {/* Products Grid */}
          {productsData && !isPending && (
            <>
              <ProductGrid
                products={productsData.products}
                viewMode={viewMode}
              />

              {/* Pagination */}
              <Pagination
                currentPage={productsData.page}
                totalPages={productsData.totalPages}
                onPageChange={(page) => updateFilter('page', page)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;