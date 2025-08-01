import { useState } from "react"
import { CreditCard, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
import { useCreateOrder } from "@/apiServices/orderServices"
import PlacingOrder from "./components/PlacingOrder"
import ShippingMethod from "./components/ShippingMethod"
import { useGetUser } from "@/apiServices/UserApi"
import { useUser } from "@clerk/clerk-react"

export default function CreateOrder() {
  const { createNewOrder } = useCreateOrder();
  const { currentUser } = useGetUser();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    // email: user?.primaryEmailAddress, // Assuming user has emailAddresses
  firstName: "",
  lastName: "",
  street: "", // Changed from `street`
  city: "",
  state: "",
  zipCode: "",
  country: "Nigeria",
  phone: "",
  
  })

  const useAddress = () => {
    setFormData({
      ...formData,
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      street: currentUser?.address.street || "",
      city: currentUser?.address.city || "",
      state: currentUser?.address.state || "",
      zipCode: currentUser?.address.zipCode || "",
      country: currentUser?.address.country || "",
      phone: currentUser?.phone || "",
    })
  }

  const shippingAddress = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    street: formData.street,
    city: formData.city,
    state: formData.state,
    zipCode: formData.zipCode,
    country: formData.country,
    phone: formData.phone,
  }

  const orderData = {
    shippingAddress,
  }
 

  const shippingSummary = {
      shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  }

  const orderSummary = {
    subtotal: 1548,
    shipping: 0,
    tax: 123.84,
    total: 1671.84,
  }

  type orderSummaryType = {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}


  // const getUser = () => {
  //   console.log(currentUser)
  // }


  const navigate = useNavigate();
   const handlePlacingOrder = () => {
      createNewOrder(orderData)
        .then((data) => {  // The data returned from your API
      console.log("Order data:", data) // This is your API response
      
      // Now you can access the order ID or any other data from the response
      
      navigate(`verify-order/${data.orderId}`)
        })
        .catch((error) => {
          console.error("Error placing order:", error)
          alert("Failed to place order. Please try again.")
        })
    }
  
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    1
                  </span>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.primaryEmailAddress?.emailAddress}
                    disabled
                    placeholder="your@email.com"
                  />
                </div>
              </CardContent>
            </Card>

<Card>
  
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      2
                    </span>
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="street"
                      value={formData.street}
                      onChange={(e) => handleInputChange("street", e.target.value)}
                      placeholder="123 Main Street"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                </div>
                <Button onClick={useAddress}>Use your Address</Button>
                </CardContent>
              </Card>

            <ShippingMethod  />

          

            <PlacingOrder handlePlacingOrder={handlePlacingOrder} orderSummary={orderSummary} />
       
        </div>
      </div>
    </div>
    </div>
  )
}
