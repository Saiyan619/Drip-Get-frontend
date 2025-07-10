import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.images[0] || '/api/placeholder/400/400'}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <Badge variant="outline">{product.category}</Badge>
          </div>
          <CardDescription className="mb-4 line-clamp-2">
            {product.description}
          </CardDescription>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-lg font-bold text-green-600">
                    ${product.salePrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold">${product.price}</span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {product.variants.slice(0, 3).map((variant) => (
              <Badge key={variant._id} variant="secondary" className="text-xs">
                {variant.color} {variant.size}
              </Badge>
            ))}
            {product.variants.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{product.variants.length - 3} more
              </Badge>
            )}
          </div>
          <Button className="w-full" onClick={() => onAddToCart?.(product)}>
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
