import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { CartItem } from '@/types'
import { Heart, Truck } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

interface CartSummaryProps {
  cartItems: CartItem[];
}

const CartSummary = ({ cartItems }: CartSummaryProps) => {
  // console.log(cartItems[0].productId.price)
  const total = cartItems.reduce((sum, item) => {
    const itemPrice = item?.productId.salePrice || item?.productId.price;
    return sum + itemPrice * item.quantity;
  }, 0)
  console.log(total)
  
  return (
    <div>
       {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="lg:col-span-1">
            <div className="bg-muted p-6 rounded-lg sticky top-8">
              <h2 className="text-xl font-semibold mb-6 text-foreground">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal ({cartItems.length} items)</span>
                  {/* <span>${subtotal.toFixed(2)}</span> */}
                </div>
                {/* {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo discount</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}  */}
                 {/* <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div> */}
                <Separator />
                <div className="flex justify-between font-semibold text-lg text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
           
                <div className="space-y-4 mb-6">
                  <div className="flex gap-2">
                    <Input placeholder="Promo code" />
                    <Button variant="outline">
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Try: SAVE10 or WELCOME20</p>
                </div>
 
              <Button className="w-full mb-4" size="lg" asChild>
                <Link to="/create-order">Proceed to Place Order</Link>
              </Button>
              <Button variant="outline" className="w-full mb-4" asChild>
                <Link to="/search">Continue Shopping</Link>
              </Button>
              {/* {shipping > 0 && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800 text-center">
                    Add ${(200 - subtotal).toFixed(2)} more for free shipping
                  </p>
                </div>
              )} */}
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping on orders over $200</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  )
}

export default CartSummary