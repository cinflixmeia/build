"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Play, 
  Download, 
  Share2, 
  MoreHorizontal,
  Calendar,
  DollarSign,
  Star,
  Eye,
  Clock,
  Globe,
  FileText,
  Users,
  Settings,
  Heart,
  MessageSquare
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"

// Sample purchased content data
const purchasedContent = [
  {
    id: "1",
    title: "INDIA'S BIGGEST FOODIE",
    seller: "Rahul Sharma Productions",
    purchaseDate: "2024-01-15",
    licenseType: "Exclusive",
    licenseRegion: "North America",
    licenseDuration: "5 years",
    amount: "$12,000",
    rating: 4.8,
    poster: "https://cinflixmeia.github.io/build/posters/continuum-dvd-movie-cover.webp",
    status: "Active",
    genre: "Reality TV",
    duration: "45 min",
    year: "2024",
    description: "A culinary journey across India's diverse food culture.",
    usageRights: ["Streaming", "Broadcast", "VOD"],
    expiryDate: "2029-01-15"
  },
  {
    id: "2",
    title: "VINA के वो सात दिन",
    seller: "Priya Patel Films",
    purchaseDate: "2024-01-10",
    licenseType: "Non-Exclusive",
    licenseRegion: "Global",
    licenseDuration: "3 years",
    amount: "$8,500",
    rating: 4.6,
    poster: "https://cinflixmeia.github.io/build/posters/torch-song-trilogy-movie-poster.webp",
    status: "Active",
    genre: "Drama",
    duration: "120 min",
    year: "2024",
    description: "Seven days that changed everything for Vina.",
    usageRights: ["Streaming", "VOD"],
    expiryDate: "2027-01-10"
  },
  {
    id: "3",
    title: "I-POP ICONS GETTING CLOSER TO BADSHAH",
    seller: "Amit Kumar Studios",
    purchaseDate: "2024-01-05",
    licenseType: "Exclusive",
    licenseRegion: "India",
    licenseDuration: "7 years",
    amount: "$15,000",
    rating: 4.9,
    poster: "https://cinflixmeia.github.io/build/posters/guns-of-the-magnificent-seven-italian-movie-cover.webp",
    status: "Active",
    genre: "Music",
    duration: "90 min",
    year: "2024",
    description: "Behind the scenes with India's biggest music stars.",
    usageRights: ["Streaming", "Broadcast", "VOD", "Theatrical"],
    expiryDate: "2031-01-05"
  },
  {
    id: "4",
    title: "Pati Patni Aur PANGA",
    seller: "Neha Singh Productions",
    purchaseDate: "2023-12-20",
    licenseType: "Non-Exclusive",
    licenseRegion: "Asia Pacific",
    licenseDuration: "2 years",
    amount: "$9,200",
    rating: 4.3,
    poster: "https://cinflixmeia.github.io/build/posters/a-e-i-o-u-das-schnelle-alphabet-der-liebe-german-movie-poster.webp",
    status: "Active",
    genre: "Reality",
    duration: "60 min",
    year: "2024",
    description: "Reality check for celebrity couples.",
    usageRights: ["Streaming", "VOD"],
    expiryDate: "2025-12-20"
  },
  {
    id: "5",
    title: "GMO MEDIA PRESENTS MAKING OF INCREDIBLE BRANDS",
    seller: "GMO Media",
    purchaseDate: "2023-12-15",
    licenseType: "Exclusive",
    licenseRegion: "Europe",
    licenseDuration: "4 years",
    amount: "$18,000",
    rating: 4.7,
    poster: "https://cinflixmeia.github.io/build/posters/hasse-tage-en-karlekshistoria-swedish-movie-poster.webp",
    status: "Active",
    genre: "Documentary",
    duration: "75 min",
    year: "2024",
    description: "The story behind India's most successful brands.",
    usageRights: ["Streaming", "Broadcast", "VOD", "Educational"],
    expiryDate: "2027-12-15"
  },
  {
    id: "6",
    title: "SENNA हिन्दी",
    seller: "Vikram Mehta Films",
    purchaseDate: "2023-12-10",
    licenseType: "Exclusive",
    licenseRegion: "Global",
    licenseDuration: "6 years",
    amount: "$25,000",
    rating: 4.9,
    poster: "https://cinflixmeia.github.io/build/posters/rugrats-movie-poster.webp",
    status: "Active",
    genre: "Biography",
    duration: "150 min",
    year: "2024",
    description: "The life and legacy of Ayrton Senna in Hindi.",
    usageRights: ["Streaming", "Broadcast", "VOD", "Theatrical", "Home Video"],
    expiryDate: "2029-12-10"
  }
]

const statusColors = {
  Active: "bg-green-500",
  Expired: "bg-red-500",
  Pending: "bg-yellow-500"
}

export default function BuyerLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [licenseFilter, setLicenseFilter] = useState("All")
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [loading, setLoading] = useState(true)

  const filteredContent = purchasedContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || item.status === statusFilter
    const matchesLicense = licenseFilter === "All" || item.licenseType === licenseFilter
    return matchesSearch && matchesStatus && matchesLicense
  })

  const handleContentClick = (content: any) => {
    setSelectedContent(content)
    setShowDetails(true)
  }

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Library</h1>
          <p className="text-muted-foreground">Manage your purchased content and licenses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Library
          </Button>
          <Button>
            <Share2 className="h-4 w-4 mr-2" />
            Share Library
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your library..."
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
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Pending">Pending</option>
          </select>
          <select
            value={licenseFilter}
            onChange={(e) => setLicenseFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="All">All Licenses</option>
            <option value="Exclusive">Exclusive</option>
            <option value="Non-Exclusive">Non-Exclusive</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full" />
          ))
        ) : filteredContent.map((content) => (
          <Card key={content.id} className="group cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleContentClick(content)}>
            <div className="relative overflow-hidden rounded-t-lg">
              <div 
                className="w-full aspect-[2/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${content.poster})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                <Badge 
                  variant="secondary" 
                  className={`${statusColors[content.status as keyof typeof statusColors]} text-white text-xs font-medium backdrop-blur-sm`}
                >
                  {content.status}
                </Badge>
              </div>

              {/* License Badge */}
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="text-xs font-medium backdrop-blur-sm bg-white/20 text-white border-white/30">
                  {content.licenseType}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                <Button size="icon" variant="secondary" className="h-8 w-8 p-0 flex-1">
                  <Play className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8 p-0">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors duration-200">
                  {content.title}
                </h3>
                <p className="text-sm text-muted-foreground">{content.seller}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>{content.rating}</span>
                  </div>
                  <span className="text-green-600 font-medium">{content.amount}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{content.purchaseDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    <span>{content.licenseRegion}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {content.genre}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {content.licenseDuration}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {!loading && filteredContent.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
            <FileText className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No content found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "All" || licenseFilter !== "All"
              ? "Try adjusting your search or filters"
              : "Start building your library by purchasing content"
            }
          </p>
          {!searchTerm && statusFilter === "All" && licenseFilter === "All" && (
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Browse Content
            </Button>
          )}
        </div>
      )}

      {/* Content Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {selectedContent && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedContent.title}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Poster */}
                <div className="lg:col-span-1">
                  <div 
                    className="w-full aspect-[2/3] bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url(${selectedContent.poster})` }}
                  />
                </div>

                {/* Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Content Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Genre:</span>
                          <span className="ml-2 font-medium">{selectedContent.genre}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="ml-2 font-medium">{selectedContent.duration}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Year:</span>
                          <span className="ml-2 font-medium">{selectedContent.year}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rating:</span>
                          <span className="ml-2 font-medium">{selectedContent.rating}/5</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">License Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">License Type:</span>
                          <span className="ml-2 font-medium">{selectedContent.licenseType}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Region:</span>
                          <span className="ml-2 font-medium">{selectedContent.licenseRegion}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="ml-2 font-medium">{selectedContent.licenseDuration}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expiry Date:</span>
                          <span className="ml-2 font-medium">{selectedContent.expiryDate}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Usage Rights</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedContent.usageRights.map((right: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {right}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Purchase Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Purchase Date:</span>
                          <span className="ml-2 font-medium">{selectedContent.purchaseDate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="ml-2 font-medium text-green-600">{selectedContent.amount}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Seller:</span>
                          <span className="ml-2 font-medium">{selectedContent.seller}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <Badge className={`ml-2 ${statusColors[selectedContent.status as keyof typeof statusColors]}`}>
                            {selectedContent.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Play Content
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Seller
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