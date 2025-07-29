
import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Edit, CreditCard, Truck, MapPin, User, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface OrderData {
  // Contact Information
  email: string

  // Shipping Address
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string

  // Shipping Method
  shippingMethod: string

  // Payment Method
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  nameOnCard: string
}

interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  size: string
  color: string
  quantity: number
}

export default function VerifyOrder() {
  const [isProcessing, setIsProcessing] = useState(false)

  // In a real app, this would come from your state management or API
  const [orderData] = useState<OrderData>({
    email: "sarah.johnson@email.com",
    firstName: "Sarah",
    lastName: "Johnson",
    address: "123 Fashion Ave",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "•••• •••• •••• 4242",
    expiryDate: "12/25",
    nameOnCard: "Sarah Johnson",
  })

  const [cartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Luxury Cashmere Coat",
      price: 899,
      originalPrice: 1299,
      image: "/placeholder.svg?height=200&width=200&text=Cashmere+Coat",
      brand: "Maison Luxe",
      size: "M",
      color: "Black",
      quantity: 1,
    },
    {
      id: "2",
      name: "Designer Leather Handbag",
      price: 649,
      image: "/placeholder.svg?height=200&width=200&text=Leather+Handbag",
      brand: "Atelier Paris",
      size: "One Size",
      color: "Black",
      quantity: 1,
    },
  ])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = orderData.shippingMethod === "standard" ? 0 : orderData.shippingMethod === "express" ? 15 : 35
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax

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

  const shippingDetails = getShippingMethodDetails(orderData.shippingMethod)

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, you would:
    // 1. Process payment
    // 2. Create order in database
    // 3. Send confirmation email
    // 4. Clear cart
    // 5. Redirect to success page

    router.push("/checkout/success?order=ORD-" + Date.now())
  }

  const handleEdit = (section: string) => {
    // In a real app, you would navigate back to checkout with the specific section focused
    router.push(`/checkout?edit=${section}`)
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0">
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
                  Order Items ({cartItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => {
                  const discountPercentage = item.originalPrice
                    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                    : 0

                  return (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 relative shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover rounded-lg"
                        />
                        {discountPercentage > 0 && (
                          <Badge className="absolute -top-2 -left-2 bg-red-500 text-xs">-{discountPercentage}%</Badge>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base truncate">{item.name}</h3>
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
                <Button variant="outline" size="sm" onClick={() => handleEdit("contact")} className="bg-transparent">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">{orderData.email}</p>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleEdit("shipping")} className="bg-transparent">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-sm sm:text-base space-y-1">
                  <p className="font-medium">
                    {orderData.firstName} {orderData.lastName}
                  </p>
                  <p>{orderData.address}</p>
                  <p>
                    {orderData.city}, {orderData.state} {orderData.zipCode}
                  </p>
                  <p>{orderData.country}</p>
                  <p className="text-gray-600">{orderData.phone}</p>
                </div>
              </CardContent>
            </Card>

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
                  onClick={() => handleEdit("shipping-method")}
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

            {/* Payment Method */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleEdit("payment")} className="bg-transparent">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">{orderData.cardNumber}</p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {orderData.nameOnCard} • Expires {orderData.expiryDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base sm:text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button
                    className="w-full h-12 text-base font-medium"
                    size="lg"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                       Checkout
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full h-12 bg-transparent"
                    onClick={() => router.back()}
                    disabled={isProcessing}
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
