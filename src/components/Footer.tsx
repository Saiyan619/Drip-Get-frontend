import React from 'react'
import { Button } from './ui/button'
import { Download, Gamepad2, Trophy, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <footer className="bg-muted/50 py-12 px-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold">Drip Get</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Your ultimate destination for the latest Fits and Shopping experiences.
              </p>
              <div className="flex gap-4">
                <Button size="icon" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Users className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Trophy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Clothing</h3>
              <div className="space-y-2">
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  New Releases
                </Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Top Fits
                </Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Coming Soon
                </Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Free Fits
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  System Requirements
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Press
                </Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 DripGet. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
