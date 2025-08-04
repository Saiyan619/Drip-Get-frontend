import React from 'react'
import { useState } from "react"
import { Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


import { Label } from "@/components/ui/label"
import { CreateProductInput, ProductVariant } from '@/types'

type VariantsProps = {
    addVariant: () => void;
    removeVariant: (index: number) => void;
    updateVariant: (index: number, field: keyof ProductVariant, value: string | number) => void;
    colors: string[];
    sizes: string[];
    newProduct: CreateProductInput;
};

const Variants = ({addVariant, removeVariant, newProduct, updateVariant, colors, sizes}:VariantsProps) => {
  return (
    <div>
        {/* Variants */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Product Variants</h3>
                        <Button variant="outline" size="sm" onClick={addVariant}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Variant
                        </Button>
                      </div>
      
                      <div className="space-y-4">
                        {newProduct.variants.map((variant, index) => (
                          <div key={index} className="p-4 border rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Variant {index + 1}</h4>
                              {newProduct.variants.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeVariant(index)}
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
                                  onChange={(e) => updateVariant(index, "size", e.target.value)}
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
                                  onChange={(e) => updateVariant(index, "color", e.target.value)}
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
                                  onChange={(e) => updateVariant(index, "inventory", Number.parseInt(e.target.value) || 0)}
                                  placeholder="10"
                                />
                              </div>
      
                              <div>
                                <Label>SKU</Label>
                                <Input
                                  value={variant.sku}
                                  onChange={(e) => updateVariant(index, "sku", e.target.value)}
                                  placeholder="Auto-generated"
                                />
                                <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
      
    </div>
  )
}

export default Variants
