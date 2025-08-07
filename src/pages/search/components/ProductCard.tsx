import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useAddToCart, useGetCart } from '@/apiServices/CartServices';
import { Link } from 'react-router-dom';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addCart, isPending } = useAddToCart();
  const { refetch } = useGetCart();

  // Temporary defaults (replace with actual UI selections)
  const [selectedSize] = useState(product.variants[0]?.size || '');
  const [selectedColor] = useState(product.variants[0]?.color || '');
  const [quantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      await addCart({
        productId: product._id,
        size: selectedSize,
        color: selectedColor,
        quantity,
      });
      await refetch();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <Link to={`/product/${product._id}`}>
         <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.images[0] || '/api/placeholder/400/400'}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        </Link>
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
          <Button onClick={handleAddToCart} className="w-full">
         {
  isPending ? (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      <span>Adding</span>
    </div>
  ) : (
    "Add to Cart"
  )
}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
