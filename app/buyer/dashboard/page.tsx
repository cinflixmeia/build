"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  ShoppingCart,
  Heart,
  Users,
  Star,
  Eye,
  Play,
  Calendar,
  MapPin,
  Award,
  Activity,
  Target,
  Globe,
  MessageSquare,
  Film
} from "lucide-react"

// Sample buyer data
const buyerStats = {
  totalSpent: "$45,200",
  totalPurchases: 12,
  favoriteSellers: 8,
  averageRating: 4.8,
  monthlySpending: "$3,800",
  spendingChange: "+15%",
  isPositive: true
}

const recentPurchases = [
  {
    id: "1",
    title: "INDIA'S BIGGEST FOODIE",
    seller: "Rahul Sharma Productions",
    amount: "$12,000",
    date: "2024-01-15",
    status: "Active",
    rating: 4.8,
    poster: "https://cinflixmeia.github.io/build/posters/continuum-dvd-movie-cover.webp"
  },
  {
    id: "2",
    title: "VINA के वो सात दिन",
    seller: "Priya Patel Films",
    amount: "$8,500",
    date: "2024-01-10",
    status: "Active",
    rating: 4.6,
    poster: "https://cinflixmeia.github.io/build/posters/torch-song-trilogy-movie-poster.webp"
  },
  {
    id: "3",
    title: "I-POP ICONS GETTING CLOSER TO BADSHAH",
    seller: "Amit Kumar Studios",
    amount: "$15,000",
    date: "2024-01-05",
    status: "Active",
    rating: 4.9,
    poster: "https://cinflixmeia.github.io/build/posters/guns-of-the-magnificent-seven-italian-movie-cover.webp"
  }
]

const favoriteSellers = [
  {
    id: "1",
    name: "Rahul Sharma Productions",
    avatar: "R",
    rating: 4.9,
    totalContent: 15,
    totalSpent: "$25,000",
    lastPurchase: "2 days ago"
  },
  {
    id: "2",
    name: "Priya Patel Films",
    avatar: "P",
    rating: 4.7,
    totalContent: 8,
    totalSpent: "$18,500",
    lastPurchase: "1 week ago"
  },
  {
    id: "3",
    name: "Amit Kumar Studios",
    avatar: "A",
    rating: 4.8,
    totalContent: 12,
    totalSpent: "$22,000",
    lastPurchase: "3 days ago"
  }
]

const recentActivity = [
  {
    id: "1",
    type: "purchase",
    title: "Purchased INDIA'S BIGGEST FOODIE",
    description: "Licensed for North America",
    amount: "$12,000",
    date: "2 hours ago",
    seller: "Rahul Sharma Productions"
  },
  {
    id: "2",
    type: "offer",
    title: "Made offer on VINA के वो सात दिन",
    description: "Counter offer sent",
    amount: "$8,500",
    date: "1 day ago",
    seller: "Priya Patel Films"
  },
  {
    id: "3",
    type: "message",
    title: "Message from Amit Kumar Studios",
    description: "Regarding licensing terms",
    amount: "",
    date: "2 days ago",
    seller: "Amit Kumar Studios"
  },
  {
    id: "4",
    type: "wishlist",
    title: "Added to wishlist",
    description: "SENNA हिन्दी documentary",
    amount: "$4,000",
    date: "3 days ago",
    seller: "Vikram Mehta Films"
  }
]

const spendingTrends = [
  { month: "Jan", amount: 3200 },
  { month: "Feb", amount: 3800 },
  { month: "Mar", amount: 4200 },
  { month: "Apr", amount: 3900 },
  { month: "May", amount: 4500 },
  { month: "Jun", amount: 4800 }
]

export default function BuyerDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Track your content purchases and manage your portfolio</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ShoppingCart className="h-4 w-4 mr-2" />
            View All Purchases
          </Button>
          <Button>
            <Heart className="h-4 w-4 mr-2" />
            Browse Content
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buyerStats.totalSpent}</div>
            <div className="flex items-center text-xs">
              {buyerStats.isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={buyerStats.isPositive ? "text-green-500" : "text-red-500"}>
                {buyerStats.spendingChange}
              </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buyerStats.totalPurchases}</div>
            <p className="text-xs text-muted-foreground">Content pieces owned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite Sellers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buyerStats.favoriteSellers}</div>
            <p className="text-xs text-muted-foreground">Trusted creators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buyerStats.averageRating}</div>
            <p className="text-xs text-muted-foreground">Content satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Purchases & Favorite Sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Purchases */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Purchases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div 
                    className="w-16 h-24 bg-cover bg-center rounded-md"
                    style={{ backgroundImage: `url(${purchase.poster})` }}
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{purchase.title}</h4>
                    <p className="text-sm text-muted-foreground">{purchase.seller}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-sm">{purchase.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm font-medium text-green-600">{purchase.amount}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">
                      {purchase.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{purchase.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Favorite Sellers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Favorite Sellers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {favoriteSellers.map((seller) => (
                <div key={seller.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {seller.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{seller.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-sm">{seller.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm">{seller.totalContent} content</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{seller.totalSpent}</p>
                    <p className="text-xs text-muted-foreground">{seller.lastPurchase}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'purchase' ? 'bg-green-100 text-green-600' :
                  activity.type === 'offer' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'message' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {activity.type === 'purchase' && <ShoppingCart className="h-4 w-4" />}
                  {activity.type === 'offer' && <DollarSign className="h-4 w-4" />}
                  {activity.type === 'message' && <MessageSquare className="h-4 w-4" />}
                  {activity.type === 'wishlist' && <Heart className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.seller}</p>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <p className="text-sm font-medium text-green-600">{activity.amount}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Film className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Browse Content</h3>
                <p className="text-sm text-muted-foreground">Discover new content</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">My Wishlist</h3>
                <p className="text-sm text-muted-foreground">View saved content</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Messages</h3>
                <p className="text-sm text-muted-foreground">Contact sellers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 