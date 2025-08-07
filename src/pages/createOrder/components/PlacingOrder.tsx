import { CreditCard, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type orderSummaryType = {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

type PlacingOrdertotalProps = {
    orderSummary: orderSummaryType;
  handlePlacingOrder: () => void;
    isPending:boolean
}

const PlacingOrder = ({orderSummary,handlePlacingOrder, isPending}:PlacingOrdertotalProps) => {
  return (
    <div>
         {/* Order Summary */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{orderSummary.shipping === 0 ? "Free" : `$${orderSummary.shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${orderSummary.tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>

                      <Button className="w-full" size="lg" disabled={isPending} onClick={handlePlacingOrder}>
                  <CreditCard className="mr-2 h-5 w-5" />
              {isPending ? (
                <div className="flex items-center gap-2">
       <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
<span>Placing...</span>
                </div>)
                : "Place Order"}
                </Button>

              
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>Free returns within 30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
    </div>
  )
}

export default PlacingOrder
