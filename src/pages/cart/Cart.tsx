import { useDeleteCart, useGetCart } from '@/apiServices/CartServices'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Item } from '@radix-ui/react-select';
import { Clock, Heart, Minus, Plus, Trash2, Truck } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { number } from 'yargs';

const Cart = () => {
  const { data: cart } = useGetCart();
  const { deleteCart} = useDeleteCart();
        const myCart = cart

    const test = () => {
      console.log(myCart);
  }
  const handleRemove = async (itemId: string | undefined) => {
  try {
    await deleteCart(itemId);
  } catch (err) {
    console.error(err);
  }
};
 const [quantity, setQuantity] = useState(1);

  const updateDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      // TODO: call backend to update cart
    }
  };

  const updateIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
    // TODO: call backend to update cart
  };
  return (
    <div>
      Cart
          Cart
          <button onClick={test}>Get cart</button>

            <div className="space-y-4">
              {myCart?.items.map((item) => {
                // const discountPercentage = item
                //   ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                //   : 0

                return (
                  <div
                    key={`${item.productId._id}-${item.size}-${item.color}`}
                    className="flex gap-4 p-4 border rounded-lg bg-white"
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
                            <h3 className="font-medium">{item.productId.name}</h3>
                          </Link>
                          <p className="text-sm text-gray-600">{item.productId.category}</p>
                          <p className="text-sm text-gray-600">
                            {item.size} • {item.color}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Truck className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-600">Free shipping</span>
                            <Clock className="h-3 w-3 text-gray-500 ml-2" />
                            <span className="text-xs text-gray-500">Arrives in 3-5 days</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">${item.productId.price}</span>
                            {item.productId.price&& (
                              <span className="text-sm text-gray-500 line-through">${item.productId.price}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={updateDecreaseQuantity}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                          {/* <span className="w-8 text-center">{item.quantity}</span> */}
                          {/* dummy quantity */}
           <span className="w-8 text-center">{quantity}</span>

                  <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={updateIncreaseQuantity}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            // onClick={() => saveForLater(item)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            Save for Later
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            // onClick={() => removeItem(item.id)}
onClick={() => handleRemove(item._id)} // ✅ Correct
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
     {/* <Button onClick={() => handleRemove("68736775de0f9a34632a1f89")} // ✅ Correct */}
{/* >Remove All</Button> */}

    </div>
  )
}

export default Cart
