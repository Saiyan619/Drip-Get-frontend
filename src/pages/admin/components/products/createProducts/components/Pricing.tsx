import React from 'react'
import { useState } from "react"
import { Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CreateProductInput, ProductVariant } from '@/types'
import { useCreateProduct } from '@/apiServices/ProductApi'
import { p } from '@clerk/clerk-react/dist/useAuth-DN6TRwS8'

type PriceProps = {
    newProduct: CreateProductInput;
    setNewProduct: (product: CreateProductInput) => void;
}
const Pricing = ({newProduct, setNewProduct}:PriceProps) => {
  return (
    <div>
      {/* Pricing */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Pricing</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="price">Regular Price *</Label>
                          <Input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) || 0 })}
                            placeholder="50.00"
                          />
                        </div>
                        <div>
                          <Label htmlFor="salePrice">Sale Price (Optional)</Label>
                          <Input
                            id="salePrice"
                            type="number"
                            min="0"
                            step="0.01"
                            value={newProduct.salePrice}
                            onChange={(e) =>
                              setNewProduct({ ...newProduct, salePrice: Number.parseFloat(e.target.value) || 0 })
                            }
                            placeholder="30.00"
                          />
                        </div>
                      </div>
                    </div>
    </div>
  )
}

export default Pricing
