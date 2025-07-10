import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { FilterParams } from '@/types';

interface ActiveFiltersProps {
  filters: FilterParams;
  onRemoveFilter: (key: keyof FilterParams) => void;
  onRemoveSearch: () => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
  onRemoveSearch
}) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {filters.search && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Search: {filters.search}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={onRemoveSearch}
          />
        </Badge>
      )}
      {filters.category && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Category: {filters.category}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onRemoveFilter('category')}
          />
        </Badge>
      )}
      {filters.minPrice && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Min: ${filters.minPrice}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onRemoveFilter('minPrice')}
          />
        </Badge>
      )}
      {filters.maxPrice && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Max: ${filters.maxPrice}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onRemoveFilter('maxPrice')}
          />
        </Badge>
      )}
    </div>
  );
};
