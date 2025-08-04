
import React from 'react'
import { useState, useEffect } from "react"
import { Edit, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CreateProductInput, isExistingImage, isNewImage, NewImageFile, ProductVariant } from '@/types'
import { useGetSingleProduct, useUpdateProduct } from '@/apiServices/ProductApi'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

type updateProductProp = {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}



const UpdateProducts = ({ id, open, onOpenChange }: updateProductProp) => {
  const { updateProductData } = useUpdateProduct();
  const { data } = useGetSingleProduct(id);
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Initialize with empty state first
  const [editProduct, setEditProduct] = useState<CreateProductInput>({
    name: "",
    description: "",
    category: "clothing",
    price: 0,
    salePrice: 0,
    images: [],
    variants: [{ size: "", color: "", inventory: 0, sku: "" }],
  });

  // Update state when data is loaded
  useEffect(() => {
    if (data) {
      setEditProduct({
        name: data.name || "",
        description: data.description || "",
        category: data.category || "clothing",
        price: data.price || 0,
        salePrice: data.salePrice || 0,
        images: data.images?.map((imageUrl: string, index: number) => ({
          type: 'existing' as const,
          url: imageUrl,
          name: `existing-image-${index}`,
          id: `existing-${index}`
        })) || [],
        variants: data.variants || [{ size: "", color: "", inventory: 0, sku: "" }],
      });
    }
  }, [data]);

  const categories = [
    { value: "clothing", label: "Clothing" },
    { value: "accessories", label: "Accessories" },
    { value: "shoes", label: "Shoes" },
    { value: "shirts", label: "Shirts" },
  ]

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors = ["Black", "White", "Gray", "Navy", "Brown", "Red", "Blue", "Green"]

  const generateSKU = (name: string, size: string, color: string) => {
    const nameCode = name.substring(0, 4).toUpperCase().replace(/\s/g, "")
    const sizeCode = size.toUpperCase()
    const colorCode = color.substring(0, 3).toUpperCase()
    return `${nameCode}-${sizeCode}-${colorCode}`
  }

  const handleUpdateProduct = async () => {
    if (!editProduct.name || !editProduct.description || !editProduct.price) {
      alert("Please fill in all required fields");
      return;
    }

    if (editProduct.variants.some((v) => !v.size || !v.color || v.inventory < 0)) {
      alert("Please complete all variant information");
      return;
    }

    setIsSubmitting(true);

    try {
      const variantsWithSKU = editProduct.variants.map((variant) => ({
        ...variant,
        sku: variant.sku || generateSKU(editProduct.name, variant.size, variant.color),
      }));

      const newImages = editProduct.images.filter(isNewImage);
      const existingImages = editProduct.images.filter(isExistingImage);
      
      let allImageUrls: string[] = [...existingImages.map(img => img.url)];
      
      if (newImages.length > 0) {
        console.log("New images to upload:", newImages);
        const placeholderUrls = newImages.map((_, index) => 
          `placeholder-new-image-${index}.jpg`
        );
        allImageUrls = [...allImageUrls, ...placeholderUrls];
      }
      console.log(allImageUrls)

      const productData = {
        name: editProduct.name,
        description: editProduct.description,
        category: editProduct.category,
        price: editProduct.price,
        salePrice: editProduct.salePrice,
        images: editProduct.images.map((img) => {
    if (isNewImage(img)) {
      return {
        type: "new" as const, // 👈 force literal type
        file: img.file,
        preview: img.preview,
        name: img.name,
      };
    } else if (isExistingImage(img)) {
      return {
        type: "existing" as const, // 👈 force literal type
        url: img.url,
        name: img.name,
        id: img.id,
      };
    } else {
      throw new Error("Invalid image format");
    }
  }),
        variants: variantsWithSKU,
      };
console.log(productData)
      await updateProductData({ id, input:productData });
      onOpenChange(false);
      
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateEditVariant = (index: number, field: keyof ProductVariant, value: string | number) => {
    setEditProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) => (i === index ? { ...variant, [field]: value } : variant)),
    }))
  }

  const addEditVariant = () => {
    setEditProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, { size: "", color: "", inventory: 0, sku: "" }],
    }))
  }

  const removeEditVariant = (index: number) => {
    if (editProduct.variants.length > 1) {
      setEditProduct((prev) => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index),
      }))
    }
  }

  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {         
      const newImages: NewImageFile[] = Array.from(files).map((file, index) => ({
        type: 'new' as const,
        file: file,
        preview: URL.createObjectURL(file),
        name: file.name
      }));
      
      setEditProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const removeEditImage = (index: number) => {
    setEditProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update product information for "{data?.name}"</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Product Name *</Label>
                <Input
                  id="edit-name"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  placeholder="e.g., Stussy jorts"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category *</Label>
                <select
                  id="edit-category"
                  value={editProduct.category}
                  onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                placeholder="Product description"
                rows={3}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-price">Regular Price *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, price: Number.parseFloat(e.target.value) || 0 })
                  }
                  placeholder="50.00"
                />
              </div>
              <div>
                <Label htmlFor="edit-salePrice">Sale Price (Optional)</Label>
                <Input
                  id="edit-salePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editProduct.salePrice}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, salePrice: Number.parseFloat(e.target.value) || 0 })
                  }
                  placeholder="30.00"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Images</h3>
            <div>
              <Label htmlFor="edit-images">Upload Additional Images</Label>
              <Input
                id="edit-images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleEditImageUpload}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">Add more images to your product gallery</p>
            </div>

            {editProduct.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {editProduct.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={isNewImage(image) ? image.preview : image.url}
                        alt={`Product image ${index + 1}`}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg?height=200&width=200&text=Product+Image";
                        }}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                      onClick={() => removeEditImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <Badge 
                      className={`absolute bottom-2 left-2 text-xs ${
                        isNewImage(image) ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                    >
                      {isNewImage(image) ? 'New' : 'Existing'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Variants */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Product Variants</h3>
              <Button variant="outline" size="sm" onClick={addEditVariant}>
                <Plus className="h-4 w-4 mr-1" />
                Add Variant
              </Button>
            </div>

            <div className="space-y-4">
              {editProduct.variants.map((variant, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Variant {index + 1}</h4>
                    {editProduct.variants.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEditVariant(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label>Size *</Label>
                      <select
                        value={variant.size}
                        onChange={(e) => updateEditVariant(index, "size", e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option value="">Select Size</option>
                        {sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label>Color *</Label>
                      <select
                        value={variant.color}
                        onChange={(e) => updateEditVariant(index, "color", e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option value="">Select Color</option>
                        {colors.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label>Inventory *</Label>
                      <Input
                        type="number"
                        min="0"
                        value={variant.inventory}
                        onChange={(e) =>
                          updateEditVariant(index, "inventory", Number.parseInt(e.target.value) || 0)
                        }
                        placeholder="10"
                      />
                    </div>

                    <div>
                      <Label>SKU</Label>
                      <Input
                        value={variant.sku}
                        onChange={(e) => updateEditVariant(index, "sku", e.target.value)}
                        placeholder="Auto-generated"
                      />
                      <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Product Info */}
          {data && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold">Current Product Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Original Name:</span> {data.name}
                </div>
                <div>
                  <span className="font-medium">Original Price:</span> ${data.price}
                </div>
                <div>
                  <span className="font-medium">Category:</span> {data.category}
                </div>
                <div>
                  <span className="font-medium">Stock Status:</span>
                  <Badge
                    className={`ml-2 ${data.variants[0]?.inventory > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {data.variants[0]?.inventory > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateProduct} disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating...
              </div>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Update Product
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProducts