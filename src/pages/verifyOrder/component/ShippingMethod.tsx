import React from 'react'
import { useState } from "react"
import { ArrowLeft, Edit, CreditCard, Truck, MapPin, User, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useParams } from "react-router-dom"
import { useGetOrderById } from "@/apiServices/orderServices"
import { useUser } from "@clerk/clerk-react"
import { CartItem } from "@/types"

const ShippingMethod = () => {
      const getShippingMethodDetails = (method: string) => {
    switch (method) {
      case "standard":
        return { name: "Standard Shipping", time: "5-7 business days", cost: "Free" }
      case "express":
        return { name: "Express Shipping", time: "2-3 business days", cost: "$15.00" }
      case "overnight":
        return { name: "Overnight Shipping", time: "Next business day", cost: "$35.00" }
      default:
        return { name: "Standard Shipping", time: "5-7 business days", cost: "Free" }
    }
  }

  
  const shippingDetails = getShippingMethodDetails("standard")
  return (
    <div>
          {/* Shipping Method */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Shipping Method
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm sm:text-base">{shippingDetails.name}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{shippingDetails.time}</p>
                        </div>
                        <p className="font-medium text-sm sm:text-base">{shippingDetails.cost}</p>
                      </div>
                    </CardContent>
                  </Card>
    </div>
  )
}

export default ShippingMethod
