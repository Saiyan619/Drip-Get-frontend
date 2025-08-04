// UpdateCartDialog.tsx
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUpdateCartItem } from '@/apiServices/CartServices'
import { Edit2, Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { CartItem } from '@/types'

interface UpdateCartDialogProps {
  cartItem: CartItem;
  onUpdate: () => void;
}

const UpdateCartDialog: React.FC<UpdateCartDialogProps> = ({ cartItem, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    size: cartItem.size,
    color: cartItem.color,
    quantity: cartItem.quantity
  });
    

  const { updateSingleCart, isPending } = useUpdateCartItem();

  // Get unique sizes and colors from product variants
  const availableSizes = [...new Set(cartItem.productId.variants.map(v => v.size))];
  const availableColors = [...new Set(cartItem.productId.variants.map(v => v.color))];
  
  // Get variants that match current size/color selection
  const getAvailableVariantsForSize = (size: string) => {
    return cartItem.productId.variants.filter(v => v.size === size);
  };
  
  const getAvailableVariantsForColor = (color: string) => {
    return cartItem.productId.variants.filter(v => v.color === color);
  };
  
  // Get current variant info
  const currentVariant = cartItem.productId.variants.find(
    v => v.size === formData.size && v.color === formData.color
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentVariant) {
      console.error('Selected variant not available');
      return;
    }
    
    if (formData.quantity > currentVariant.inventory) {
      console.error('Quantity exceeds available inventory');
      return;
    }
    
    try {
        await updateSingleCart({
           _id: cartItem._id,
        productId: cartItem.productId._id,
        size: formData.size,
        color: formData.color,
        quantity: formData.quantity
      });
      setOpen(false);
      onUpdate(); // Refresh cart data
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  

  const handleQuantityChange = (increment: boolean) => {
    const maxQuantity = currentVariant?.inventory || 1;
    setFormData(prev => ({
      ...prev,
      quantity: increment 
        ? Math.min(prev.quantity + 1, maxQuantity)
        : Math.max(1, prev.quantity - 1)
    }));
  };

  const handleSizeChange = (newSize: string) => {
    setFormData(prev => {
      // Check if current color is available for new size
      const availableColorsForSize = getAvailableVariantsForSize(newSize).map(v => v.color);
      const newColor = availableColorsForSize.includes(prev.color) 
        ? prev.color 
        : availableColorsForSize[0];
      
      return {
        ...prev,
        size: newSize,
        color: newColor,
        quantity: 1 // Reset quantity when changing variants
      };
    });
  };

  const handleColorChange = (newColor: string) => {
    setFormData(prev => {
      // Check if current size is available for new color
      const availableSizesForColor = getAvailableVariantsForColor(newColor).map(v => v.size);
      const newSize = availableSizesForColor.includes(prev.size) 
        ? prev.size 
        : availableSizesForColor[0];
      
      return {
        ...prev,
        size: newSize,
        color: newColor,
        quantity: 1 // Reset quantity when changing variants
      };
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
          <Edit2 className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Cart Item</DialogTitle>
            <DialogDescription>
              Make changes to {cartItem.productId.name}. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="size">Size</Label>
              <Select 
                value={formData.size} 
                onValueChange={handleSizeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {availableSizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="color">Color</Label>
              <Select 
                value={formData.color} 
                onValueChange={handleColorChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {availableColors.map(color => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {currentVariant && (
              <div className="text-sm text-gray-600">
                <p>SKU: {currentVariant.sku}</p>
                <p>Available: {currentVariant.inventory} units</p>
              </div>
            )}
            
            <div className="grid gap-3">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleQuantityChange(false)}
                  disabled={formData.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={currentVariant?.inventory || 1}
                  value={formData.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    const maxQuantity = currentVariant?.inventory || 1;
                    setFormData(prev => ({ 
                      ...prev, 
                      quantity: Math.max(1, Math.min(value, maxQuantity))
                    }));
                  }}
                  className="w-20 text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleQuantityChange(true)}
                  disabled={formData.quantity >= (currentVariant?.inventory || 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isPending || !currentVariant || formData.quantity > (currentVariant?.inventory || 0)}
            >
              {isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateCartDialog;