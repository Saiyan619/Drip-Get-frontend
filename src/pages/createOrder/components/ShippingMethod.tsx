import { useState } from "react"
import { CreditCard, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useCreateOrder } from "@/apiServices/orderServices"

const ShippingMethod = () => {
  return (
    <div>
          {/* Shipping Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      3
                    </span>
                    Shipping Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="standard" id="standard" />
                      <div className="flex-1">
                        <Label htmlFor="standard" className="font-medium cursor-pointer">
                          Standard Shipping
                        </Label>
                        <p className="text-sm text-gray-600">5-7 business days • Free</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="express" id="express" />
                      <div className="flex-1">
                        <Label htmlFor="express" className="font-medium cursor-pointer">
                          Express Shipping
                        </Label>
                        <p className="text-sm text-gray-600">2-3 business days • $15</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <div className="flex-1">
                        <Label htmlFor="overnight" className="font-medium cursor-pointer">
                          Overnight Shipping
                        </Label>
                        <p className="text-sm text-gray-600">Next business day • $35</p>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
    </div>
  )
}

export default ShippingMethod
