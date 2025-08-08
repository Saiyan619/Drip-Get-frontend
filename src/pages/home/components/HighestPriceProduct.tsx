import { useGetProducts } from '@/apiServices/ProductApi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Heart, ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const HighestPriceProduct = () => {
      const { data } = useGetProducts();
    const highestPrices = [...data?.products || []] // spread to avoid mutating original
  .sort((a, b) => b.price - a.price) // highest first
  .slice(0, 4);

    return (
 <section className="py-20 px-20">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Big Spenders</h2>
              <p className="text-muted-foreground">The ultimate luxury drops, hardest fits and statement accessories, curated for big spenders like you.</p>
            </div>
            <Button variant="outline">
            <Link to="/search">
                            View All Products
            </Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
        

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highestPrices?.map((clothes) => (
              <Card key={clothes._id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={clothes.images[0]}
                    alt={clothes.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">-{clothes.salePrice}%</Badge> */}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{clothes.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-1">{clothes.name}</CardTitle>
                </CardHeader>
                <CardFooter className="pt-0">
                  <div className="flex items-start justify-between w-full flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">${clothes.salePrice}</span>
                      <span className="text-sm text-muted-foreground line-through">${clothes.price}</span>
                    </div>
                    <Link to={`/product/${clothes._id}`}>
                           <Button size="sm">
                      See more
                    </Button>
                    </Link>
             
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

export default HighestPriceProduct
