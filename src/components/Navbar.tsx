import React from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  ShoppingCart,
  User,
  Star,
  Gamepad2,
  Zap,
  Trophy,
  Users,
  ArrowRight,
  Play,
  Download,
  Heart,
  Badge,
} from "lucide-react"
import { Button } from './ui/button'
import { ThemeToggle } from './theme-toggle'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
const Navbar = () => {
  return (
     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="pl-5 flex items-center gap-16">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold">Game Grab</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/games" className="text-sm font-medium hover:text-primary transition-colors">
                Games
              </Link>
              <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">
                Categories
              </Link>
              <Link to="/deals" className="text-sm font-medium hover:text-primary transition-colors">
                Deals
              </Link>
              <Link to="/news" className="text-sm font-medium hover:text-primary transition-colors">
                News
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                    <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
              </div>
            </div>
                  {/* <ThemeToggle /> */}
                            <ThemeToggle />

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          <Link to="/cart">
           <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
          </Link>
          </div>
        </div>
      </header>
  )
}

export default Navbar
