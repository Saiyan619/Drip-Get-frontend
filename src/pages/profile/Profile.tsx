import { useEffect, useState } from "react"
import { User, Package, MapPin, CreditCard, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useGetUser, useUpdateUser } from "@/apiServices/UserApi"
import { useUser } from "@clerk/clerk-react"
import PersonalInformation from "./components/PersonalInformation"
import ProfileOrders from "./components/ProfileOrders"
import { UserInput } from "@/types"

export default function ProfilePage() {
    const { currentUser } = useGetUser();
    const { updateUser } = useUpdateUser();
    const {user} = useUser()
    console.log(currentUser)
    useEffect(() => {
  if (currentUser) {
    setProfileData({
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
      address: {
        street: currentUser.address?.street || "",
        city: currentUser.address?.city || "",
        state: currentUser.address?.state || "",
        zipCode: currentUser.address?.zipCode || "",
        country: currentUser.address?.country || "",
      },
    });
  }
}, [currentUser]);
    
    // console.log(user)
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [profileData, setProfileData] = useState<UserInput>({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
      address: {
    street: currentUser?.address?.street || "",
    city: currentUser?.address?.city || "",
    state: currentUser?.address?.state || "",
    zipCode: currentUser?.address?.zipCode || "",
    country: currentUser?.address?.country || "",
  },
  })

        console.log(profileData.firstName)

  const handleSave = () => {
    setIsEditing(false)
      // Save profile data
      updateUser({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phone: profileData.phone,
        address: {
          street: profileData.address.street,
          city: profileData.address.city,
          state: profileData.address.state,
          zipCode: profileData.address.zipCode,
          country: profileData.address.country},})
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <img
              src={user?.imageUrl || "/placeholder.svg"}
              alt="niyi"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{profileData.firstName}</h1>
            <p className="text-gray-600">{profileData.email}</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
           
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Wishlist
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <PersonalInformation setProfileData={setProfileData} profileData={profileData} setIsEditing={setIsEditing} handleSave={handleSave} isEditing={isEditing} />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
          <ProfileOrders />
          </TabsContent>

        
         

          <TabsContent value="wishlist" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="group relative">
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
                        {/* <img
                          src="/placeholder.svg?height=300&width=300"
                          alt="Wishlist item"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        /> */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        >
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                      <div className="mt-4 space-y-2">
                        <h3 className="font-medium">Designer Item {item}</h3>
                        <p className="text-sm text-gray-600">Brand Name</p>
                        <p className="font-semibold">$299</p>
                        <Button size="sm" className="w-full">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
