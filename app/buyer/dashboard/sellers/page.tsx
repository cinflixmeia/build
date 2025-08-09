"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Filter, 
  Star,
  MessageSquare,
  Eye,
  Heart,
  Users,
  Globe,
  Calendar,
  DollarSign,
  FileText,
  Download,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Award,
  TrendingUp
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample sellers data
const sellers = [
  {
    id: "1",
    name: "Rahul Sharma Productions",
    avatar: "R",
    rating: 4.9,
    totalContent: 15,
    totalRevenue: "$250,000",
    totalDeals: 8,
    averageRating: 4.8,
    region: "India",
    specializations: ["Reality TV", "Documentary", "Food"],
    lastActive: "2 hours ago",
    status: "Active",
    description: "Leading producer of reality TV and documentary content with a focus on food and travel shows.",
    contact: {
      email: "rahul@sharmaproductions.com",
      phone: "+91 98765 43210",
      website: "www.sharmaproductions.com"
    },
    topContent: [
      { title: "INDIA'S BIGGEST FOODIE", rating: 4.8, price: "$12,000" },
      { title: "Culinary Adventures", rating: 4.7, price: "$8,500" },
      { title: "Street Food Chronicles", rating: 4.9, price: "$15,000" }
    ]
  },
  {
    id: "2",
    name: "Priya Patel Films",
    avatar: "P",
    rating: 4.7,
    totalContent: 8,
    totalRevenue: "$180,000",
    totalDeals: 5,
    averageRating: 4.6,
    region: "India",
    specializations: ["Drama", "Romance", "Family"],
    lastActive: "1 day ago",
    status: "Active",
    description: "Specialized in emotional dramas and family-oriented content with strong storytelling.",
    contact: {
      email: "priya@patelfilms.com",
      phone: "+91 98765 43211",
      website: "www.patelfilms.com"
    },
    topContent: [
      { title: "VINA के वो सात दिन", rating: 4.6, price: "$8,500" },
      { title: "Family Bonds", rating: 4.5, price: "$6,200" },
      { title: "Love Stories", rating: 4.7, price: "$9,800" }
    ]
  },
  {
    id: "3",
    name: "Amit Kumar Studios",
    avatar: "A",
    rating: 4.8,
    totalContent: 12,
    totalRevenue: "$320,000",
    totalDeals: 10,
    averageRating: 4.9,
    region: "India",
    specializations: ["Music", "Documentary", "Biography"],
    lastActive: "3 days ago",
    status: "Active",
    description: "Premier music documentary producer with exclusive access to top artists and behind-the-scenes content.",
    contact: {
      email: "amit@kumarstudios.com",
      phone: "+91 98765 43212",
      website: "www.kumarstudios.com"
    },
    topContent: [
      { title: "I-POP ICONS GETTING CLOSER TO BADSHAH", rating: 4.9, price: "$15,000" },
      { title: "Music Legends", rating: 4.8, price: "$18,000" },
      { title: "Studio Sessions", rating: 4.7, price: "$12,500" }
    ]
  },
  {
    id: "4",
    name: "Neha Singh Productions",
    avatar: "N",
    rating: 4.5,
    totalContent: 6,
    totalRevenue: "$120,000",
    totalDeals: 3,
    averageRating: 4.3,
    region: "India",
    specializations: ["Reality", "Comedy", "Entertainment"],
    lastActive: "1 week ago",
    status: "Active",
    description: "Entertainment-focused production house specializing in reality shows and comedy content.",
    contact: {
      email: "neha@singhproductions.com",
      phone: "+91 98765 43213",
      website: "www.singhproductions.com"
    },
    topContent: [
      { title: "Pati Patni Aur PANGA", rating: 4.3, price: "$9,200" },
      { title: "Comedy Central", rating: 4.4, price: "$7,500" },
      { title: "Reality Check", rating: 4.2, price: "$6,800" }
    ]
  },
  {
    id: "5",
    name: "GMO Media",
    avatar: "G",
    rating: 4.6,
    totalContent: 20,
    totalRevenue: "$450,000",
    totalDeals: 12,
    averageRating: 4.7,
    region: "Global",
    specializations: ["Documentary", "Business", "Marketing"],
    lastActive: "2 days ago",
    status: "Active",
    description: "Global media company specializing in business documentaries and educational content.",
    contact: {
      email: "info@gmomedia.com",
      phone: "+1 555 123 4567",
      website: "www.gmomedia.com"
    },
    topContent: [
      { title: "GMO MEDIA PRESENTS MAKING OF INCREDIBLE BRANDS", rating: 4.7, price: "$18,000" },
      { title: "Business Insights", rating: 4.6, price: "$22,000" },
      { title: "Marketing Masters", rating: 4.8, price: "$25,000" }
    ]
  },
  {
    id: "6",
    name: "Vikram Mehta Films",
    avatar: "V",
    rating: 4.9,
    totalContent: 10,
    totalRevenue: "$280,000",
    totalDeals: 7,
    averageRating: 4.9,
    region: "India",
    specializations: ["Biography", "Sports", "Documentary"],
    lastActive: "5 days ago",
    status: "Active",
    description: "Award-winning documentary filmmaker specializing in sports biographies and historical content.",
    contact: {
      email: "vikram@mehtafilms.com",
      phone: "+91 98765 43214",
      website: "www.mehtafilms.com"
    },
    topContent: [
      { title: "SENNA हिन्दी", rating: 4.9, price: "$25,000" },
      { title: "Sports Legends", rating: 4.8, price: "$20,000" },
      { title: "Historical Tales", rating: 4.9, price: "$18,500" }
    ]
  }
]

export default function BuyerSellersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [regionFilter, setRegionFilter] = useState("All")
  const [ratingFilter, setRatingFilter] = useState("All")
  const [selectedSeller, setSelectedSeller] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [follows, setFollows] = useState<Record<string, boolean>>({})

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesRegion = regionFilter === "All" || seller.region === regionFilter
    const matchesRating = ratingFilter === "All" || 
      (ratingFilter === "4.5+" && seller.rating >= 4.5) ||
      (ratingFilter === "4.0+" && seller.rating >= 4.0)
    return matchesSearch && matchesRegion && matchesRating
  })

  const handleSellerClick = (seller: any) => {
    setSelectedSeller(seller)
    setShowDetails(true)
  }

  // Load persisted follow state
  useEffect(() => {
    try {
      const raw = localStorage.getItem('buyer_seller_follows')
      setFollows(raw ? JSON.parse(raw) : {})
    } catch {
      setFollows({})
    }
  }, [])

  const toggleFollow = (sellerId: string) => {
    setFollows(prev => {
      const next = { ...prev, [sellerId]: !prev[sellerId] }
      try { localStorage.setItem('buyer_seller_follows', JSON.stringify(next)) } catch {}
      return next
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sellers</h1>
          <p className="text-muted-foreground">Discover and connect with content creators</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Find Sellers
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellers.length}</div>
            <p className="text-xs text-muted-foreground">Active creators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">Seller satisfaction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">71</div>
            <p className="text-xs text-muted-foreground">Available pieces</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Completed transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sellers or specializations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="All">All Regions</option>
            <option value="India">India</option>
            <option value="Global">Global</option>
          </select>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="All">All Ratings</option>
            <option value="4.5+">4.5+ Stars</option>
            <option value="4.0+">4.0+ Stars</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSellers.map((seller) => (
          <Card key={seller.id} className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSellerClick(seller)}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {seller.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold truncate">{seller.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-sm font-medium">{seller.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />
                    <span>{seller.region}</span>
                    <span>•</span>
                    <span>{seller.totalContent} content</span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {seller.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {seller.specializations.slice(0, 2).map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {seller.specializations.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{seller.specializations.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Last active: {seller.lastActive}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredSellers.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
            <Users className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No sellers found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || regionFilter !== "All" || ratingFilter !== "All"
              ? "Try adjusting your search or filters"
              : "No sellers available at the moment"
            }
          </p>
        </div>
      )}

      {/* Seller Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {selectedSeller && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedSeller.name}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Seller Info */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        {selectedSeller.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{selectedSeller.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{selectedSeller.region}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{selectedSeller.rating}</span>
                        <span className="text-sm text-muted-foreground">({selectedSeller.totalDeals} deals)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{selectedSeller.contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{selectedSeller.contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span>{selectedSeller.contact.website}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedSeller.specializations.map((spec: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Statistics</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Total Content:</span>
                          <span className="ml-2 font-medium">{selectedSeller.totalContent}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Revenue:</span>
                          <span className="ml-2 font-medium">{selectedSeller.totalRevenue}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Deals:</span>
                          <span className="ml-2 font-medium">{selectedSeller.totalDeals}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg. Rating:</span>
                          <span className="ml-2 font-medium">{selectedSeller.averageRating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Content */}
                <div className="lg:col-span-2">
                  <div>
                    <h4 className="font-semibold mb-4">Top Content</h4>
                    <div className="space-y-3">
                      {selectedSeller.topContent.map((content: { title: string; rating: number; price: string }, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h5 className="font-medium">{content.title}</h5>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                <span>{content.rating}</span>
                              </div>
                              <span>•</span>
                              <span className="text-green-600 font-medium">{content.price}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-4">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedSeller.description}</p>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                      <Button variant={follows[selectedSeller.id] ? "default" : "outline"} onClick={() => toggleFollow(selectedSeller.id)}>
                        <Heart className={`h-4 w-4 mr-2 ${follows[selectedSeller.id] ? 'fill-current' : ''}`} />
                        {follows[selectedSeller.id] ? 'Following' : 'Follow'}
                      </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View All Content
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