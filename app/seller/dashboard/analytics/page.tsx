"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Eye,
  DollarSign,
  Users,
  Calendar,
  Download,
  Filter,
  PieChart,
  Activity,
  Target,
  Award
} from "lucide-react"
import { toast } from "sonner"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RePieChart, Pie, Cell, Legend
} from "recharts"

// Sample analytics data
const analyticsData = {
  views: {
    total: "124,500",
    change: "+12.5%",
    isPositive: true
  },
  revenue: {
    total: "$12,400",
    change: "+8.3%",
    isPositive: true
  },
  engagement: {
    total: "89%",
    change: "+5.2%",
    isPositive: true
  },
  conversion: {
    total: "3.2%",
    change: "-0.8%",
    isPositive: false
  }
}

const topContent = [
  {
    title: "Apollo 11: First Steps on the Moon",
    views: "24,500",
    revenue: "$3,200",
    engagement: "92%",
    growth: "+25%"
  },
  {
    title: "The Imitation Game",
    views: "18,200",
    revenue: "$4,100",
    engagement: "88%",
    growth: "+18%"
  },
  {
    title: "Beyonce & Jay-Z: Power Love",
    views: "15,800",
    revenue: "$2,500",
    engagement: "85%",
    growth: "+12%"
  }
]

const audienceData = [
  { region: "North America", percentage: 45, revenue: "$5,580" },
  { region: "Europe", percentage: 28, revenue: "$3,472" },
  { region: "Asia Pacific", percentage: 18, revenue: "$2,232" },
  { region: "Latin America", percentage: 9, revenue: "$1,116" }
]

const monthlyTrends = [
  { month: "Jan", views: 8500, revenue: 2100 },
  { month: "Feb", views: 9200, revenue: 2400 },
  { month: "Mar", views: 10500, revenue: 2800 },
  { month: "Apr", views: 11800, revenue: 3200 },
  { month: "May", views: 13200, revenue: 3600 },
  { month: "Jun", views: 14500, revenue: 4200 },
  { month: "Jul", views: 15800, revenue: 4800 },
  { month: "Aug", views: 17200, revenue: 5200 },
  { month: "Sep", views: 18500, revenue: 5800 },
  { month: "Oct", views: 19800, revenue: 6400 },
  { month: "Nov", views: 21200, revenue: 7200 },
  { month: "Dec", views: 24500, revenue: 8400 }
]

const COLORS = ["#6366f1", "#f59e42", "#10b981", "#f43f5e", "#fbbf24", "#3b82f6", "#a21caf", "#14b8a6"]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [contentFilter, setContentFilter] = useState("All")
  const [regionFilter, setRegionFilter] = useState("All")

  // Filtered data for charts
  const filteredMonthlyTrends = useMemo(() => {
    // Simulate time range filtering
    let months = monthlyTrends
    if (timeRange === "7d") months = monthlyTrends.slice(-1)
    else if (timeRange === "30d") months = monthlyTrends.slice(-2)
    else if (timeRange === "90d") months = monthlyTrends.slice(-3)
    else if (timeRange === "1y") months = monthlyTrends
    return months
  }, [timeRange])

  const filteredAudienceData = useMemo(() => {
    if (regionFilter === "All") return audienceData
    return audienceData.filter(r => r.region === regionFilter)
  }, [regionFilter])

  const filteredTopContent = useMemo(() => {
    if (contentFilter === "All") return topContent
    return topContent.filter(c => c.title === contentFilter)
  }, [contentFilter])

  const handleExport = () => {
    // Export analytics as CSV
    const rows = [
      ["Month", "Views", "Revenue"],
      ...filteredMonthlyTrends.map(m => [m.month, m.views, m.revenue])
    ]
    const csv = rows.map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "analytics.csv"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Analytics exported as CSV!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your content performance</p>
        </div>
        <div className="flex gap-2">
          <select
            value={contentFilter}
            onChange={e => setContentFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="All">All Content</option>
            {topContent.map(c => (
              <option key={c.title} value={c.title}>{c.title}</option>
            ))}
          </select>
          <select
            value={regionFilter}
            onChange={e => setRegionFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="All">All Regions</option>
            {audienceData.map(r => (
              <option key={r.region} value={r.region}>{r.region}</option>
            ))}
          </select>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.views.total}</div>
            <div className="flex items-center text-xs">
              {analyticsData.views.isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={analyticsData.views.isPositive ? "text-green-500" : "text-red-500"}>
                {analyticsData.views.change}
              </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.revenue.total}</div>
            <div className="flex items-center text-xs">
              {analyticsData.revenue.isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={analyticsData.revenue.isPositive ? "text-green-500" : "text-red-500"}>
                {analyticsData.revenue.change}
              </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.engagement.total}</div>
            <div className="flex items-center text-xs">
              {analyticsData.engagement.isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={analyticsData.engagement.isPositive ? "text-green-500" : "text-red-500"}>
                {analyticsData.engagement.change}
              </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.conversion.total}</div>
            <div className="flex items-center text-xs">
              {analyticsData.conversion.isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={analyticsData.conversion.isPositive ? "text-green-500" : "text-red-500"}>
                {analyticsData.conversion.change}
              </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredMonthlyTrends}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#6366f1" name="Views" />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Audience by Region */}
        <Card>
          <CardHeader>
            <CardTitle>Audience by Region</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={filteredAudienceData}
                    dataKey="percentage"
                    nameKey="region"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {filteredAudienceData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Content */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTopContent.map((content, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{content.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{content.views} views</span>
                      <span>{content.revenue} revenue</span>
                      <span>{content.engagement} engagement</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-xs">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">{content.growth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audience Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredAudienceData}>
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="percentage" fill="#6366f1" name="Audience %" />
                  <Bar dataKey={"revenue"} fill="#10b981" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredMonthlyTrends}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#6366f1" name="Views" />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Best Performing Genre</h4>
                  <p className="text-sm text-muted-foreground">Documentaries are generating 40% more revenue than other genres</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Audience Growth</h4>
                  <p className="text-sm text-muted-foreground">North American audience grew by 25% this quarter</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Peak Viewing Times</h4>
                  <p className="text-sm text-muted-foreground">Content performs best between 7-9 PM EST</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Conversion Optimization</h4>
                  <p className="text-sm text-muted-foreground">Adding trailers increases conversion by 15%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Range Selector */}
      <div className="flex justify-center">
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {[
            { value: "7d", label: "7D" },
            { value: "30d", label: "30D" },
            { value: "90d", label: "90D" },
            { value: "1y", label: "1Y" }
          ].map((range) => (
            <Button
              key={range.value}
              variant={timeRange === range.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
} 