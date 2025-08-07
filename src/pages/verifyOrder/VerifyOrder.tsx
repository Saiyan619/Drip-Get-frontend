import { useState } from "react"
import { ArrowLeft, Edit, CreditCard, Truck, MapPin, User, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useParams } from "react-router-dom"
import { useGetOrderById } from "@/apiServices/orderServices"
import { useUser } from "@clerk/clerk-react"
import { CheckoutPage } from "../checkout/Checkout"
import ShippingMethod from "./component/ShippingMethod"

export default function VerifyOrder() {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>Invalid Order ID</div>;
  const { singleOrder } = useGetOrderById(id);
  console.log(singleOrder)


  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Verify Your Order</h1>
            <p className="text-gray-600 mt-1">Please review your order details before placing your order</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items ({singleOrder?.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {singleOrder?.items.map((item:any) => {
                  const discountPercentage = item.originalPrice
                    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                    : 0

                  return (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 p-4 rounded-lg">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 relative shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.productName}
                          className="object-cover rounded-lg"
                        />
                        {discountPercentage > 0 && (
                          <Badge className="absolute -top-2 -left-2 bg-red-500 text-xs">-{discountPercentage}%</Badge>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base truncate">{item.productName}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{item.brand}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {item.size} • {item.color} • Qty: {item.quantity}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-semibold text-sm sm:text-base">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
             
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">{user?.primaryEmailAddress?.emailAddress}</p>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm sm:text-base space-y-1">
                  <p className="font-medium">
                   {singleOrder?.shippingAddress.firstName} {singleOrder?.shippingAddress.lastName}
                  </p>
                  <p> {singleOrder?.shippingAddress.street} </p>
                  <p>
                     {singleOrder?.shippingAddress.city} ,  {singleOrder?.shippingAddress.state} .  {singleOrder?.shippingAddress.zipCode} 
                  </p>
                  <p>{singleOrder?.shippingAddress.country}</p>
                  <p className="text-gray-600"> {singleOrder?.shippingAddress.country} </p>
                </div>
              </CardContent>
            </Card>

        
          <ShippingMethod />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Subtotal ({singleOrder?.items.length} items)</span>
                    <span>${singleOrder?.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Shipping</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Tax</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base sm:text-lg">
                    <span>Total</span>
                    <span>${singleOrder?.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                 
                 <CheckoutPage />

                  <Button
                    variant="outline"
                    className="w-full h-12 bg-transparent"
                  >
                    Back to Checkout
                  </Button>
                </div>

                <div className="pt-4 space-y-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                    </div>
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    </div>
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    </div>
                    <span>Free returns & exchanges</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
