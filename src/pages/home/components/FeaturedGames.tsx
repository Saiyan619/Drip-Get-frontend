import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Heart, ShoppingCart, Star } from 'lucide-react'
import React from 'react'

const featuredGames = [
  {
    id: 1,
    title: "Cyber Legends 2077",
    price: 59.99,
    originalPrice: 79.99,
    image: "./Call-of-Duty-Black-Ops-6-feature-2.jpg",
    rating: 4.8,
    reviews: 2847,
    discount: 25,
    genre: "RPG",
  },
  {
    id: 2,
    title: "Space Warriors Elite",
    price: 39.99,
    originalPrice: 49.99,
    image: "./Call-of-Duty-Black-Ops-6-feature-2.jpg",
    rating: 4.6,
    reviews: 1923,
    discount: 20,
    genre: "Action",
  },
  {
    id: 3,
    title: "Fantasy Realm Online",
    price: 29.99,
    originalPrice: 39.99,
    image: "./Call-of-Duty-Black-Ops-6-feature-2.jpg",
    rating: 4.7,
    reviews: 3156,
    discount: 25,
    genre: "MMORPG",
  },
  {
    id: 4,
    title: "Racing Thunder X",
    price: 34.99,
    originalPrice: 44.99,
    image: "./Call-of-Duty-Black-Ops-6-feature-2.jpg",
    rating: 4.5,
    reviews: 1654,
    discount: 22,
    genre: "Racing",
  },
]

const FeaturedGames = () => {
  return (
 <section className="py-20 px-20">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Games</h2>
              <p className="text-muted-foreground">Handpicked games just for you</p>
            </div>
            <Button variant="outline">
              View All Games
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGames.map((game) => (
              <Card key={game.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">-{game.discount}%</Badge>
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
                    <Badge variant="secondary">{game.genre}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{game.rating}</span>
                      <span className="text-sm text-muted-foreground">({game.reviews})</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-1">{game.title}</CardTitle>
                </CardHeader>
                <CardFooter className="pt-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">${game.price}</span>
                      <span className="text-sm text-muted-foreground line-through">${game.originalPrice}</span>
                    </div>
                    <Button size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

export default FeaturedGames
