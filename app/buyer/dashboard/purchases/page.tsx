"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  FileText,
  Globe,
  Clock,
  Users,
  ShoppingCart,
  CreditCard,
  Receipt,
  MessageSquare
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts"
import { ChartContainer } from "@/components/chart-wrapper"

// Sample purchase data
const purchases = [
  {
    id: "1",
    title: "INDIA'S BIGGEST FOODIE",
    seller: "Rahul Sharma Productions",
    purchaseDate: "2024-01-15",
    amount: "$12,000",
    status: "Completed",
    licenseType: "Exclusive",
    licenseRegion: "North America",
    licenseDuration: "5 years",
    rating: 4.8,
    poster: "https://cinflixmeia.github.io/build/posters/continuum-dvd-movie-cover.webp",
    genre: "Reality TV",
    paymentMethod: "Credit Card",
    invoiceNumber: "INV-2024-001"
  },
  {
    id: "2",
    title: "VINA के वो सात दिन",
    seller: "Priya Patel Films",
    purchaseDate: "2024-01-10",
    amount: "$8,500",
    status: "Completed",
    licenseType: "Non-Exclusive",
    licenseRegion: "Global",
    licenseDuration: "3 years",
    rating: 4.6,
    poster: "https://cinflixmeia.github.io/build/posters/torch-song-trilogy-movie-poster.webp",
    genre: "Drama",
    paymentMethod: "Bank Transfer",
    invoiceNumber: "INV-2024-002"
  },
  {
    id: "3",
    title: "I-POP ICONS GETTING CLOSER TO BADSHAH",
    seller: "Amit Kumar Studios",
    purchaseDate: "2024-01-05",
    amount: "$15,000",
    status: "Completed",
    licenseType: "Exclusive",
    licenseRegion: "India",
    licenseDuration: "7 years",
    rating: 4.9,
    poster: "https://cinflixmeia.github.io/build/posters/guns-of-the-magnificent-seven-italian-movie-cover.webp",
    genre: "Music",
    paymentMethod: "Credit Card",
    invoiceNumber: "INV-2024-003"
  },
  {
    id: "4",
    title: "Pati Patni Aur PANGA",
    seller: "Neha Singh Productions",
    purchaseDate: "2023-12-20",
    amount: "$9,200",
    status: "Completed",
    licenseType: "Non-Exclusive",
    licenseRegion: "Asia Pacific",
    licenseDuration: "2 years",
    rating: 4.3,
    poster: "https://cinflixmeia.github.io/build/posters/a-e-i-o-u-das-schnelle-alphabet-der-liebe-german-movie-poster.webp",
    genre: "Reality",
    paymentMethod: "PayPal",
    invoiceNumber: "INV-2023-045"
  },
  {
    id: "5",
    title: "GMO MEDIA PRESENTS MAKING OF INCREDIBLE BRANDS",
    seller: "GMO Media",
    purchaseDate: "2023-12-15",
    amount: "$18,000",
    status: "Completed",
    licenseType: "Exclusive",
    licenseRegion: "Europe",
    licenseDuration: "4 years",
    rating: 4.7,
    poster: "https://cinflixmeia.github.io/build/posters/hasse-tage-en-karlekshistoria-swedish-movie-poster.webp",
    genre: "Documentary",
    paymentMethod: "Bank Transfer",
    invoiceNumber: "INV-2023-044"
  },
  {
    id: "6",
    title: "SENNA हिन्दी",
    seller: "Vikram Mehta Films",
    purchaseDate: "2023-12-10",
    amount: "$25,000",
    status: "Completed",
    licenseType: "Exclusive",
    licenseRegion: "Global",
    licenseDuration: "6 years",
    rating: 4.9,
    poster: "https://cinflixmeia.github.io/build/posters/rugrats-movie-poster.webp",
    genre: "Biography",
    paymentMethod: "Credit Card",
    invoiceNumber: "INV-2023-043"
  }
]

// Genre color palette
const GENRE_COLORS: Record<string, string> = {
  "Reality TV": "#8884d8",
  Drama: "#82ca9d",
  Music: "#ffc658",
  Documentary: "#ff7300",
  Biography: "#00ff00",
}

const sellerData = [
  { name: "Rahul Sharma", purchases: 1, amount: 12000 },
  { name: "Priya Patel", purchases: 1, amount: 8500 },
  { name: "Amit Kumar", purchases: 1, amount: 15000 },
  { name: "Neha Singh", purchases: 1, amount: 9200 },
  { name: "GMO Media", purchases: 1, amount: 18000 },
  { name: "Vikram Mehta", purchases: 1, amount: 25000 }
]

const statusColors = {
  Completed: "bg-green-500",
  Pending: "bg-yellow-500",
  Failed: "bg-red-500"
}

export default function BuyerPurchasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [dateFilter, setDateFilter] = useState("All")
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  const filteredPurchases = useMemo(() => {
    const now = new Date()
    const start = new Date(0)
    const end = new Date()

    if (dateFilter === "This Month") {
      start.setFullYear(now.getFullYear(), now.getMonth(), 1)
      end.setFullYear(now.getFullYear(), now.getMonth() + 1, 0)
    } else if (dateFilter === "Last 3 Months") {
      start.setFullYear(now.getFullYear(), now.getMonth() - 2, 1)
      end.setFullYear(now.getFullYear(), now.getMonth() + 1, 0)
    } else if (dateFilter === "This Year") {
      start.setFullYear(now.getFullYear(), 0, 1)
      end.setFullYear(now.getFullYear(), 11, 31)
    } else {
      start.setTime(0)
    }

    return purchases.filter(purchase => {
      const matchesSearch = purchase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           purchase.seller.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "All" || purchase.status === statusFilter
      const d = new Date(purchase.purchaseDate)
      const matchesDate = d >= start && d <= end
      return matchesSearch && matchesStatus && matchesDate
    })
  }, [searchTerm, statusFilter, dateFilter])

  const totalSpent = useMemo(() => {
    return filteredPurchases.reduce((sum, purchase) => sum + parseFloat(purchase.amount.replace('$', '').replace(',', '')), 0)
  }, [filteredPurchases])

  const averageRating = useMemo(() => {
    const ratings = filteredPurchases.map(p => p.rating)
    return ratings.length > 0 ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1) : "0.0"
  }, [filteredPurchases])

  // Build charts from filteredPurchases
  const spendingData = useMemo(() => {
    const map = new Map<string, number>()
    filteredPurchases.forEach(p => {
      const d = new Date(p.purchaseDate)
      const label = d.toLocaleString(undefined, { month: 'short' })
      const amt = parseFloat(p.amount.replace(/[$,]/g, '')) || 0
      map.set(label, (map.get(label) || 0) + amt)
    })
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    return months.filter(m => map.has(m)).map(m => ({ month: m, amount: map.get(m) || 0 }))
  }, [filteredPurchases])

  const genreData = useMemo(() => {
    const map = new Map<string, number>()
    filteredPurchases.forEach(p => {
      const amt = parseFloat(p.amount.replace(/[$,]/g, '')) || 0
      map.set(p.genre, (map.get(p.genre) || 0) + amt)
    })
    return Array.from(map.entries()).map(([name, value]) => ({ name, value, color: GENRE_COLORS[name] || '#999999' }))
  }, [filteredPurchases])

  const handlePurchaseClick = (purchase: any) => {
    setSelectedPurchase(purchase)
    setShowDetails(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Purchase History</h1>
          <p className="text-muted-foreground">Track your content purchases and spending analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Receipt className="h-4 w-4 mr-2" />
            View Invoices
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
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time purchases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredPurchases.length}</div>
            <p className="text-xs text-muted-foreground">Content pieces owned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating}</div>
            <p className="text-xs text-muted-foreground">Content satisfaction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredPurchases.filter(p => p.status === "Completed").length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer height={300}>
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Genre Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Spending by Genre</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer height={300}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search purchases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="All">All Time</option>
            <option value="This Month">This Month</option>
            <option value="Last 3 Months">Last 3 Months</option>
            <option value="This Year">This Year</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Purchases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPurchases.map((purchase) => (
              <div key={purchase.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => handlePurchaseClick(purchase)}>
                <div 
                  className="w-16 h-24 bg-cover bg-center rounded-md"
                  style={{ backgroundImage: `url(${purchase.poster})` }}
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{purchase.title}</h4>
                  <p className="text-sm text-muted-foreground">{purchase.seller}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{purchase.purchaseDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{purchase.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      <span>{purchase.licenseRegion}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{purchase.amount}</div>
                  <Badge className={`mt-1 ${statusColors[purchase.status as keyof typeof statusColors]}`}>
                    {purchase.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{purchase.licenseType}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Purchase Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {selectedPurchase && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedPurchase.title}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Poster */}
                <div className="lg:col-span-1">
                  <div 
                    className="w-full aspect-[2/3] bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url(${selectedPurchase.poster})` }}
                  />
                </div>

                {/* Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Purchase Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Purchase Date:</span>
                          <span className="ml-2 font-medium">{selectedPurchase.purchaseDate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="ml-2 font-medium text-green-600">{selectedPurchase.amount}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <Badge className={`ml-2 ${statusColors[selectedPurchase.status as keyof typeof statusColors]}`}>
                            {selectedPurchase.status}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Payment Method:</span>
                          <span className="ml-2 font-medium">{selectedPurchase.paymentMethod}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Invoice Number:</span>
                          <span className="ml-2 font-medium">{selectedPurchase.invoiceNumber}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rating:</span>
                          <span className="ml-2 font-medium">{selectedPurchase.rating}/5</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">License Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">License Type:</span>
                          <span className="ml-2 font-medium">{selectedPurchase.licenseType}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Region:</span>
                          <span className="ml-2 font-medium">{selectedPurchase.licenseRegion}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="ml-2 font-medium">{selectedPurchase.licenseDuration}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Genre:</span>
                          <span className="ml-2 font-medium">{selectedPurchase.genre}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Receipt className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Seller
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Content
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 