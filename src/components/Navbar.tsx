import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
  Crown,
  Menu,
  X,
} from "lucide-react"
import { Badge } from './ui/badge';
import { Button } from './ui/button'
import { ThemeToggle } from './theme-toggle'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useGetCart } from '@/apiServices/CartServices';

const Navbar = () => {
  const { data } = useGetCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    data
  }, [data])
 
  const numOfCartItems = data?.items.length

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center gap-4 lg:gap-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold">Drip Get</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:border-primary/20 transition-all duration-200 ease-in-out group shadow-sm"
            >
              <Search className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              Search Products
            </Link>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <div className="flex items-center gap-2">
            <SignedOut>
              <div className='border px-3 py-[5px] rounded'>
                <SignInButton />
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/userProfile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin" className="flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Admin
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
           
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 min-w-[1.25rem] rounded-full p-0 flex items-center justify-center text-xs font-bold text-white bg-red-600 border-0"
              >
                {numOfCartItems}
              </Badge>
            </Button>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-4 w-4 min-w-[1rem] rounded-full p-0 flex items-center justify-center text-xs font-bold text-white bg-red-600 border-0"
              >
                {numOfCartItems}
              </Badge>
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-4">
            {/* Mobile Search */}
            <Link
              to="/search"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium border border-gray-200 rounded-lg hover:border-primary/20 transition-all duration-200 ease-in-out"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search className="h-4 w-4" />
              Search Products
            </Link>

            {/* Mobile Auth */}
            <div className="px-4 py-2">
              <SignedOut>
                <div className='border px-3 py-2 rounded w-full text-center'>
                  <SignInButton />
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-2">
                  <UserButton />
                  <span className="text-sm">Account</span>
                </div>
              </SignedIn>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 px-4">
              <Link
                to="/userProfile"
                className="flex items-center gap-3 py-2 text-sm hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              
              <Link
                to="/admin"
                className="flex items-center gap-3 py-2 text-sm hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Crown className="h-4 w-4" />
                Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar