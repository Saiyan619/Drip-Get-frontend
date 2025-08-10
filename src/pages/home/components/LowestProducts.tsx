import React from 'react'
import { useGetProducts } from '@/apiServices/ProductApi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Heart, ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const LowestProducts = () => {
  const { data } = useGetProducts();
  const lowestPrices = [...data?.products || []]// spread to avoid mutating original
    .sort((a, b) => a.price - b.price) // lowest first
    .slice(0, 4);
   
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-20">
      <div className="container">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Best Bargains</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg sm:max-w-none mx-auto sm:mx-0">
              Unbeatable steals, stylish essentials all at prices that make your wallet happy.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full sm:w-auto flex items-center justify-center gap-2"
            asChild
          >
            <Link to="/search">
              <span className="hidden sm:inline">View All Products</span>
              <span className="sm:hidden">View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
       
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {lowestPrices?.map((clothes) => (
            <Card key={clothes._id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={clothes.images[0]}
                  alt={clothes.name}
                  className="w-full h-40 sm:h-48 md:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-500 hover:bg-red-600 text-xs">
                  -30%
                </Badge>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              
              {/* Card Content */}
              <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {clothes.category}
                  </Badge>
                </div>
                <CardTitle className="line-clamp-2 text-sm sm:text-base leading-tight">
                  {clothes.name}
                </CardTitle>
              </CardHeader>
              
              {/* Card Footer */}
              <CardFooter className="pt-0 px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="flex items-end justify-between w-full">
                  {/* Price Section */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold">
                        ${clothes.salePrice}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground line-through">
                        ${clothes.price}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Button size="sm" className="text-xs sm:text-sm px-3 sm:px-4" asChild>
                    <Link to={`/product/${clothes._id}`}>
                      <span className="hidden sm:inline">See more</span>
                      <span className="sm:hidden">View</span>
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="flex justify-center mt-8 sm:hidden">
          <Button className="w-full max-w-xs" asChild>
            <Link to="/search">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default LowestProducts