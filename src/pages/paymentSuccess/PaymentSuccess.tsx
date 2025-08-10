import { useState, useEffect } from "react"
import { CheckCircle, Package, Truck, Mail, Download, Star, Calendar, MapPin, CreditCard, Phone, Share2, Twitter, Facebook, Copy, Gift, Heart, ArrowRight, Clock, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"



export default function PaymentSuccessPage() {

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
     

        {/* Success Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="relative mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 sm:h-14 sm:w-14 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            Payment Successful! 🎉
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Thank you for your purchase! Your order has been confirmed and we're preparing it for shipment.
          </p>
                  <Link to="/search">
                  <Button>Continue Shopping</Button>
                  </Link>         
        </div>


        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold mb-1">Secure Payment</h4>
            <p className="text-sm text-gray-600">256-bit SSL encryption</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold mb-1">Fast Shipping</h4>
            <p className="text-sm text-gray-600">Free on orders over $200</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Heart className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold mb-1">30-Day Returns</h4>
            <p className="text-sm text-gray-600">Hassle-free returns</p>
          </div>
        </div>
      </div>
    </div>
  )
}