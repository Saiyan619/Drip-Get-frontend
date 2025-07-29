 <TabsContent value="payment" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Payment Methods</CardTitle>
                <Button>Add New Card</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">Default</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">MC</span>
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 8888</p>
                          <p className="text-sm text-gray-600">Expires 08/26</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>



            <TabsContent value="addresses" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Saved Addresses</CardTitle>
                <Button>Add New Address</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* {user.addresses.map((address) => (
                    <div key={address.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{address.name}</h3>
                            {address.isDefault && <Badge variant="secondary">Default</Badge>}
                          </div>
                          <p className="text-gray-600">
                            {address.street}
                            <br />
                            {address.city}, {address.state} {address.zipCode}
                            <br />
                            {address.country}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))} */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>


 {/* <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment
            </TabsTrigger> */}