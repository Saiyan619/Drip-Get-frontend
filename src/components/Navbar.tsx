import React, { useEffect } from 'react'
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
} from "lucide-react"
import { Badge } from './ui/badge';
import { Button } from './ui/button'
import { ThemeToggle } from './theme-toggle'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useGetCart } from '@/apiServices/CartServices';

const Navbar = () => {
    const { data } = useGetCart();

  useEffect(() => {
    data
  }, [data])
  
  const numOfCartItems = data?.items.length
  return (
     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="pl-5 flex items-center gap-16">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold">Drip Get</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
            <Link 
  to="/search" 
  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium  border border-gray-200 rounded-lg  hover:border-primary/20 transition-all duration-200 ease-in-out group shadow-sm"
>
  <Search className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
  Search Products
</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                    <SignedOut>
                <div className='border px-3 py-[5px] rounded'>
                    <SignInButton />
      </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
              </div>
            </div>
                  {/* <ThemeToggle /> */}
                            <ThemeToggle />

           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                 <Link to="/userProfile">
                  <User className="h-5 w-5" />
                  Profile
          </Link>
                </DropdownMenuItem>
              <DropdownMenuItem asChild>
                
                  <Link to="/admin">
                <Crown  className="h-5 w-5"  />
                  Admin</Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Sign Out</DropdownMenuItem> */}
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
        </div>
      </header>
  )
}

export default Navbar