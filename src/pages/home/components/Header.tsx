import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import React from 'react'

const Header = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <Badge className="w-fit mx-auto lg:mx-0">New Drop</Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                Level Up Your 
                <span className="block text-primary">Style Game</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 lg:max-w-lg">
                Discover the latest arrivals, exclusive offers, and shop alongside thousands of trendsetters. Your next favorite look is just a click away.
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <Link to="/search">
                <Button 
                  size="lg" 
                  className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                >
                  Browse Collections
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
            
            {/* Stats Section */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-4 lg:pt-6">
              <div className="text-center min-w-[80px]">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">10M+</div>
                <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Active Buyers</div>
              </div>
              <div className="text-center min-w-[80px]">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">5000+</div>
                <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Fits Available</div>
              </div>
              <div className="text-center min-w-[80px]">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">4.9★</div>
                <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">User Rating</div>
              </div>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="relative order-first lg:order-last">
            <div className="relative z-10 mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none">
              <img
                src="./Brand shoot🌟.jpg"
                alt="Featured Style"
                className="w-full h-auto rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl object-cover aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5]"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-xl sm:rounded-2xl" />
              
              {/* Floating Elements for Visual Interest */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 bg-secondary/20 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-0 w-24 sm:w-40 h-24 sm:h-40 bg-secondary/10 rounded-full blur-2xl -z-10"></div>
      </div>
    </section>
  )
}

export default Header