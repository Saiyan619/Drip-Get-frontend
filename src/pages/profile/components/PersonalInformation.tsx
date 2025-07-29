import { User, Package, MapPin, CreditCard, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// firstName
// lastName
// street
// state
// zipCode
// country
type PersonalInformationProps = {
    isEditing: boolean;
    setIsEditing: (isEditing:boolean) => void;
    handleSave: () => void;
    profileData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    setProfileData: (data: {
        firstName: string; lastName: string; email: string; phone: string; street: string; city: string; state: string; zipCode: string; country: string;
    }) => void;
    updateUser: (userData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }) => Promise<void>;
  }

const PersonalInformation = ({ isEditing, handleSave, setIsEditing, profileData, setProfileData, updateUser } : PersonalInformationProps) => {
  return (
    <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 flex-col">
                  <div className="flex flex-col">
                        <div className="flex justify-between flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <Label htmlFor="firstName">First Name</Label>
                          <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                        <div className="flex justify-between flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input
                              id="email"
                                                    type="email"

                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                      </div>
                      <div className="w-full">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={profileData.country}
                      onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  </div>
                 </div>
                  

              <Separator />
              {/* Other Info */}
                              <CardTitle>Address</CardTitle>

              <div className="flex flex-col">
        <div className="flex justify-between flex-col sm:flex-row gap-4">

                  <div className="w-full">
                    <Label htmlFor="street">Street</Label>
                    <Input
                      id="street"
                      value={profileData.street}
                      onChange={(e) => setProfileData({ ...profileData, street: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="zipCode">ZipCode</Label>
                    <Input
                      id="zipCode"
                      value={profileData.zipCode}
                      onChange={(e) => setProfileData({ ...profileData, zipCode: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
        <div className="flex justify-between flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profileData.state}
                      onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  </div>
                  </div>
              </CardContent>
            </Card>
  )
}

export default PersonalInformation
