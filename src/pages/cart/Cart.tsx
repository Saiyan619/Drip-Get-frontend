import { useDeleteCart, useGetCart } from '@/apiServices/CartServices'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Item } from '@radix-ui/react-select';
import { CheckCircle, Clock, Heart, Minus, Plus, Trash2, Truck } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { number } from 'yargs';
import UpdateCartDialog from './components/UpdateCartDialog';
import CartSummary from './components/CartSummary';

const Cart = () => {
  const { data: cart, refetch } = useGetCart();
  const { deleteUserCart, isPending } = useDeleteCart();
  // Add state to track which item is being deleted
  const [deletingItemId, setDeletingItemId] = useState(null);
  
  const myCart = cart

  const test = () => {
    console.log(myCart?.items);
  }
  
  const handleRemove = async (itemId) => {
    try {
      setDeletingItemId(itemId); // Set which item is being deleted
      await deleteUserCart(itemId);
      // Refetch cart data after successful deletion
      refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingItemId(null); // Clear the deleting state
    }
  };

  return (
    <div>
      {/* <Button onClick={test}>Get cart</Button> */}

      {myCart?.items.length === 0 ? 
      (  <div className="text-center mb-8 sm:mb-12">
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
              {/* <cart className="h-12 w-12 sm:h-14 sm:w-14 text-green-600" /> */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
                </div>
      
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                    Your cart is currently empty
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                    Looks like you haven't added anything yet. Start exploring our products and find something you love.
                </p>
                        <Link to="/search">
                        <Button>Continue Shopping</Button>
                        </Link>         
        </div>)
        : (
               <div className="space-y-4">
              {myCart?.items.map((item) => {
                // Check if this specific item is being deleted
                const isDeleting = deletingItemId === item._id;
                
                return (
                  <div
                    key={`${item.productId._id}-${item.size}-${item.color}`}
                    className="flex gap-4 p-4 border rounded-lg bg-card text-card-foreground"
                  >
                    <div className="w-24 h-24 relative">
                      <img
                        src={item.productId.images[0] || "/placeholder.svg"}
                        alt={item.productId.name}
                        className="object-cover rounded-lg"
                      />
                      {item.productId.price > 0 && (
                        <Badge className="absolute -top-2 -left-2 bg-red-500 text-xs">-30%</Badge>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link to={`/product/${item.productId._id}`} className="hover:underline">
                            <h3 className="font-medium text-foreground">{item.productId.name}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.productId.category}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.size} • {item.color}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Truck className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-600">Free shipping</span>
                            <Clock className="h-3 w-3 text-muted-foreground ml-2" />
                            <span className="text-xs text-muted-foreground">Arrives in 3-5 days</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">${item.productId.price}</span>
                            {item.productId.price && (
                              <span className="text-sm text-muted-foreground line-through">${item.productId.price}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {/* <span className="w-8 text-center">{item.quantity}</span> */}
                          {/* dummy quantity */}
                          <span className="w-8 text-center text-foreground text-sm">Qty:{item.quantity}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            // onClick={() => saveForLater(item)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            Save for Later
                          </Button>
                          <UpdateCartDialog cartItem={item} onUpdate={refetch} />

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(item._id)}
                            className="text-red-500 hover:text-red-700"
                            disabled={isDeleting} // Only disable this specific button
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            {isDeleting ? "Removing" : "Remove"} {/* Only show "Removing" for this item */}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
     )}

      <CartSummary cartItems={myCart?.items ?? []} />
    </div>
  )
}

export default Cart