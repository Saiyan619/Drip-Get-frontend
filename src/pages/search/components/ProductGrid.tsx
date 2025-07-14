import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';
import { Link } from 'react-router-dom';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  // onAddToCart?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  viewMode, 
  // onAddToCart 
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
        <p className="text-gray-400 mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {products.map((product) => (
        // <Link to={`/product/${product._id}`}>
        <ProductCard 
          key={product._id} 
          product={product} 
          // onAddToCart={onAddToCart}
          />
        // </Link>

      ))}
    </div>
  );
};