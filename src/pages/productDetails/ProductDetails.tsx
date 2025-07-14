import { useEffect, useState } from "react"
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useGetSingleProduct } from "@/apiServices/ProductApi"
import { useParams } from "react-router-dom"
import { useAddToCart } from "@/apiServices/CartServices"

export default function ProductDetails() {
  const { id } = useParams();
  const { data: singleProduct, isPending, error } = useGetSingleProduct(id);
  const { addToCart } = useAddToCart();
  
  // ALL HOOKS MUST BE AT THE TOP - BEFORE ANY EARLY RETURNS!
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)

  
  useEffect(() => {
    console.log(singleProduct)
  }, [singleProduct, isPending, error])
  
  // Update selected size/color when product loads
  useEffect(() => {
    if (singleProduct && singleProduct.variants) {
      const sizes = [...new Set(singleProduct.variants.map(variant => variant.size) || [])]
      const colors = [...new Set(singleProduct.variants.map(variant => variant.color) || [])]
      
      if (sizes.length > 0 && !selectedSize) {
        setSelectedSize(sizes[0])
      }
      if (colors.length > 0 && !selectedColor) {
        setSelectedColor(colors[0])
      }
    }
  }, [singleProduct, selectedSize, selectedColor])

  // NOW you can do early returns
  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <p className="text-red-600 mb-2">Error loading product</p>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!singleProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <p className="text-gray-600">Product not found</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Safe to use product data here
  const product = singleProduct;
  const sizes = [...new Set(product.variants?.map(variant => variant.size) || [])]
  const colors = [...new Set(product.variants?.map(variant => variant.color) || [])]
  
  // Calculate discount percentage if both price and salePrice exist
  const discountPercentage = product.salePrice && product.price > product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0
  
  // Determine the display price (use salePrice if available, otherwise regular price)
  const displayPrice = product.salePrice || product.price
  const originalPrice = product.salePrice ? product.price : null
  
  // Find the current variant based on selected size and color
  const currentVariant = product.variants?.find(
    variant => variant.size === selectedSize && variant.color === selectedColor
  )
  
  // Check if current selection is in stock
  const isInStock = currentVariant ? currentVariant.inventory > 0 : false
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images Section */}
        <div className="space-y-4">
          {/* Main product image with discount badge */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
            <img
              src={product.images?.[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="object-cover w-full h-full"
            />
            {discountPercentage > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500">-{discountPercentage}% OFF</Badge>
            )}
          </div>
          
          {/* Thumbnail images */}
          <div className="grid grid-cols-4 gap-4">
            {product.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                  selectedImage === index ? "border-black shadow-md" : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            )) || []}
            {/* Add placeholder thumbnails if fewer than 4 images exist */}
            {(product.images?.length || 0) < 4 && Array.from({ length: 4 - (product.images?.length || 0) }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="aspect-square overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center"
              >
                <div className="text-gray-400 text-xs text-center">
                  <div className="w-8 h-8 mx-auto mb-1 opacity-50">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21,15 16,10 5,21"/>
                    </svg>
                  </div>
                  More photos
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          {/* Product title and basic info */}
          <div>
            <p className="text-sm text-gray-600 mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* Price display with original price crossed out if on sale */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold">${displayPrice}</span>
              {originalPrice && (
                <span className="text-xl text-gray-500 line-through">${originalPrice}</span>
              )}
            </div>
          </div>

          <Separator />

          {/* Product description */}
          <div>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <Separator />

          {/* Size Selection - only show if multiple sizes available */}
          {sizes.length > 1 && (
            <div>
              <Label className="text-base font-medium mb-3 block">Size</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem value={size} id={size} className="peer sr-only" />
                      <Label
                        htmlFor={size}
                        className="flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer peer-checked:border-black peer-checked:bg-black peer-checked:text-white hover:border-gray-400 transition-colors"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Color Selection - only show if multiple colors available */}
          {colors.length > 1 && (
            <div>
              <Label className="text-base font-medium mb-3 block">Color</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <div key={color}>
                      <RadioGroupItem value={color} id={color} className="peer sr-only" />
                      <Label
                        htmlFor={color}
                        className="flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer peer-checked:border-black peer-checked:bg-black peer-checked:text-white hover:border-gray-400 transition-colors"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Quantity Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Quantity</Label>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setQuantity(quantity + 1)}
                disabled={currentVariant ? quantity >= currentVariant.inventory : false}
              >
                +
              </Button>
            </div>
            {currentVariant && (
              <p className="text-sm text-gray-600 mt-2">
                {currentVariant.inventory} items in stock
              </p>
            )}
          </div>

          {/* Add to Cart and Wishlist buttons */}
          <div className="space-y-4">
           <Button 
  size="lg" 
  className="w-full"
  disabled={!isInStock}
              onClick={() => {
    console.log(selectedSize, selectedColor)
    if (!product._id) return;
    addToCart({
      productId: product?._id,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    });
  }}
>
  <ShoppingBag className="mr-2 h-5 w-5" />
  {isInStock 
    ? `Add to Cart - $${(displayPrice * quantity).toFixed(2)}`
    : 'Out of Stock'
  }
</Button>

            <Button variant="outline" size="lg" className="w-full bg-transparent">
              <Heart className="mr-2 h-4 w-4" />
              Add to Wishlist
            </Button>
          </div>

          <Separator />

          {/* Store features and policies */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-gray-600" />
              <span className="text-sm">Free shipping on orders over $200</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-5 w-5 text-gray-600" />
              <span className="text-sm">30-day return policy</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-600" />
              <span className="text-sm">2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}