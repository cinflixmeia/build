"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BarChart3, DollarSign, Film, Plus, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function SellerDashboard() {
  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground">Overview of your performance and quick actions</p>
          </div>
          <div className="flex gap-2">
            <Link href="/seller/dashboard/upload">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Upload Content
              </Button>
            </Link>
            <Link href="/seller/dashboard/offers">
              <Button variant="outline" className="flex items-center gap-2">
                <Zap className="h-4 w-4" /> View Offers
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Sales Summary */}
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Total Sales</CardTitle>
              <DollarSign className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$12,400</div>
              <div className="text-sm text-muted-foreground mt-1">This month</div>
            </CardContent>
          </Card>

          {/* Content Performance */}
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Top Performing Title</CardTitle>
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="font-semibold">"Apollo 11: First Steps on the Moon"</div>
              <div className="text-2xl font-bold mt-2">$4,200</div>
              <div className="text-sm text-muted-foreground mt-1">Revenue this month</div>
            </CardContent>
          </Card>

          {/* Active Buyers */}
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Active Buyers</CardTitle>
              <Users className="h-6 w-6 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18</div>
              <div className="text-sm text-muted-foreground mt-1">Engaged this month</div>
            </CardContent>
          </Card>

          {/* Content Library */}
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Content Library</CardTitle>
              <Film className="h-6 w-6 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">27</div>
              <div className="text-sm text-muted-foreground mt-1">Titles uploaded</div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Chart Placeholder */}
          <Card className="lg:col-span-2 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Revenue Performance</CardTitle>
              <BarChart3 className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                {/* Replace with actual chart component */}
                <span>Chart coming soon...</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm">
                <li>
                  <span className="font-medium text-foreground">You</span> added <span className="font-medium">"The Imitation Game"</span> to your library.
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </li>
                <li>
                  <span className="font-medium text-foreground">Buyer "Acme Media"</span> made an offer on <span className="font-medium">"Apollo 11"</span>.
                  <div className="text-xs text-muted-foreground">Yesterday</div>
                </li>
                <li>
                  <span className="font-medium text-foreground">You</span> received payment for <span className="font-medium">"Beyonce & Jay-Z: Power Love"</span>.
                  <div className="text-xs text-muted-foreground">2 days ago</div>
                </li>
                <li>
                  <span className="font-medium text-foreground">You</span> updated the poster for <span className="font-medium">"Yellow Yellow Yellow"</span>.
                  <div className="text-xs text-muted-foreground">3 days ago</div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}