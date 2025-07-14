import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X } from 'lucide-react';
import { FilterParams } from '@/types';

interface ProductFiltersProps {
  filters: FilterParams;
  searchInput: string;
  categories: string;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (key: keyof FilterParams, value: any) => void;
  onClearFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  searchInput,
  categories,
  hasActiveFilters,
  onSearchChange,
  onFilterChange,
  onClearFilters
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Filters</span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <label className="text-sm font-medium mb-2 block">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          {/* <Select 
            value={filters.category || ''} 
            onValueChange={(value) => onFilterChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="all">All Categories</SelectItem> 
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        <p>{categories}</p>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-2 block">Price Range</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              className="flex-1"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="text-sm font-medium mb-2 block">Sort By</label>
          <Select
  value={`${filters.sortBy || 'createdAt'}-${filters.order || 'desc'}`}  // ✅ Now has fallbacks
            onValueChange={(value) => {
              const [sortBy, order] = value.split('-') as [string, 'asc' | 'desc'];
              onFilterChange('sortBy', sortBy);
              onFilterChange('order', order);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="createdAt-asc">Oldest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Items per page */}
        <div>
          <label className="text-sm font-medium mb-2 block">Items per page</label>
          <Select
            value={filters.limit?.toString() || '10'}
            onValueChange={(value) => onFilterChange('limit', parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};