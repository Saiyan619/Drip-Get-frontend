import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
       <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="container md:pl-20  md:pt-24 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="w-fit">New Release</Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Level Up Your Gaming Experience</h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Discover the latest games, exclusive deals, and join millions of gamers worldwide. Your next adventure awaits.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Browse Games
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Trailer
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">10M+</div>
                  <div className="text-sm text-muted-foreground">Active Players</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5000+</div>
                  <div className="text-sm text-muted-foreground">Games Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.9★</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
                      <div className="relative z-10">
                          
                          <img
                  src="./Call-of-Duty-Black-Ops-6-feature-2.jpg"
                  alt="Featured Game"
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
  )
}

export default Header
