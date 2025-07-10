import { Card, CardContent } from '@/components/ui/card'
import { Play, Trophy, Users, Zap } from 'lucide-react'
import React from 'react'


const gameCategories = [
  { name: "Action", icon: Zap, count: 245, image: "/placeholder.svg?height=200&width=300" },
  { name: "RPG", icon: Trophy, count: 189, image: "/placeholder.svg?height=200&width=300" },
  { name: "Strategy", icon: Users, count: 156, image: "/placeholder.svg?height=200&width=300" },
  { name: "Sports", icon: Play, count: 98, image: "/placeholder.svg?height=200&width=300" },
]
const GameCategories = () => {
  return (
    <section className="py-20 px-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our vast collection of games across different genres and find your next favorite
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameCategories.map((category) => (
              <Card
                key={category.name}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <category.icon className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground">{category.count} games available</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

export default GameCategories
