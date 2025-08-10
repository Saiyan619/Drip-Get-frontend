import React from 'react'
import { useState } from "react"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CreateProductInput } from '@/types'

type BasicInfoProps = {
    newProduct: CreateProductInput;
    setNewProduct: (product: CreateProductInput) => void;
    categories: { value: string; label: string }[];
}

const BasicInfo = ({newProduct, setNewProduct, categories}:BasicInfoProps) => {
  return (
    <div>
      <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="e.g., Stussy jorts"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
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
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="e.g., made by lil yatvhy"
                    rows={3}
                  />
                </div>
              </div>
    </div>
  )
}

export default BasicInfo