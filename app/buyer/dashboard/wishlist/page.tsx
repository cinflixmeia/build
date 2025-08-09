"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Heart,
  DollarSign,
  Star,
  Eye,
  Calendar,
  Globe,
  Trash2,
  MessageSquare,
  ShoppingCart,
  Plus,
  Minus
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

// Sample wishlist data
const wishlistItems = [
  {
    id: "1",
    title: "The Silent Echo",
    seller: "Warner Bros. Studios",
    price: "$45,000",
    originalPrice: "$50,000",
    rating: 4.9,
    poster: "https://cinflixmeia.github.io/build/posters/the-big-clock-french-movie-poster.webp",
    status: "Available",
    genre: "Thriller",
    duration: "120 min",
    year: "2024",
    description: "A detective with synesthesia solves crimes by seeing sounds as colors.",
    addedDate: "2024-01-10",
    licenseType: "Exclusive",
    licenseRegion: "North America"
  },
  {
    id: "2",
    title: "Desert Dreams",
    seller: "Legendary Pictures",
    price: "$60,000",
    originalPrice: "$65,000",
    rating: 4.8,
    poster: "https://cinflixmeia.github.io/build/posters/mille-dollari-sul-nero-german-dvd-movie-cover.webp",
    status: "Available",
    genre: "Fantasy",
    duration: "140 min",
    year: "2024",
    description: "A nomad discovers a hidden oasis that grants wishes but at a terrible cost.",
    addedDate: "2024-01-08",
    licenseType: "Non-Exclusive",
    licenseRegion: "Global"
  },
  {
    id: "3",
    title: "thudarum",
    seller: "Arka Mediaworks",
    price: "$35,000",
    originalPrice: "$40,000",
    rating: 4.7,
    poster: "https://cinflixmeia.github.io/build/posters/the-harder-they-fall-movie-poster.webp",
    status: "Available",
    genre: "Action",
    duration: "150 min",
    year: "2024",
    description: "An epic action drama with stunning visuals and powerful performances.",
    addedDate: "2024-01-05",
    licenseType: "Exclusive",
    licenseRegion: "India"
  },
  {
    id: "4",
    title: "MAN OF STEEL",
    seller: "Warner Bros. Pictures",
    price: "$150,000",
    originalPrice: "$180,000",
    rating: 4.5,
    poster: "https://cinflixmeia.github.io/build/posters/hale-and-pace-british-dvd-movie-cover.webp",
    status: "Available",
    genre: "Superhero",
    duration: "143 min",
    year: "2024",
    description: "The origin story of Superman in a modern retelling.",
    addedDate: "2024-01-03",
    licenseType: "Exclusive",
    licenseRegion: "Global"
  },
  {
    id: "5",
    title: "KESARI",
    seller: "Zee Studios",
    price: "$28,000",
    originalPrice: "$32,000",
    rating: 4.3,
    poster: "https://cinflixmeia.github.io/build/posters/the-hundred-foot-journey-german-movie-poster.webp",
    status: "Available",
    genre: "War",
    duration: "160 min",
    year: "2024",
    description: "The story of the Battle of Saragarhi, a true tale of valor.",
    addedDate: "2024-01-01",
    licenseType: "Non-Exclusive",
    licenseRegion: "Asia Pacific"
  },
  {
    id: "6",
    title: "DEVIKA",
    seller: "Priya Dutt Productions",
    price: "$22,000",
    originalPrice: "$25,000",
    rating: 4.6,
    poster: "https://cinflixmeia.github.io/build/posters/liebe-ist-das-schonste-geschenk-german-movie-cover.webp",
    status: "Available",
    genre: "Drama",
    duration: "130 min",
    year: "2024",
    description: "A powerful story of a woman's journey to self-discovery.",
    addedDate: "2023-12-28",
    licenseType: "Exclusive",
    licenseRegion: "India"
  }
]

export default function BuyerWishlistPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("All")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [wishlist, setWishlist] = useState(wishlistItems)

  const filteredWishlist = wishlist.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = genreFilter === "All" || item.genre === genreFilter
    return matchesSearch && matchesGenre
  })

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== itemId))
  }

  const handleMakeOffer = (item: any) => {
    // Create a conversation + offer skeleton in localStorage for buyer messages
    try {
      const key = 'buyer_new_conversations'
      const raw = localStorage.getItem(key)
      const arr = raw ? JSON.parse(raw) : []
      arr.push({
        id: Date.now().toString(),
        sellerName: item.seller,
        title: item.title,
        message: `Offer initiated for ${item.title} at ${item.price}`,
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem(key, JSON.stringify(arr))
    } catch {}

    // Navigate to Buyer Messages to continue the conversation
    router.push('/buyer/dashboard/messages')
  }

  const totalValue = wishlist.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace('$', '').replace(',', ''))
  }, 0)

  const totalSavings = wishlist.reduce((sum, item) => {
    const original = parseFloat(item.originalPrice.replace('$', '').replace(',', ''))
    const current = parseFloat(item.price.replace('$', '').replace(',', ''))
    return sum + (original - current)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">Save content for later purchase</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Heart className="h-4 w-4 mr-2" />
            Share Wishlist
          </Button>
          <Button>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wishlist.length}</div>
            <p className="text-xs text-muted-foreground">Saved content</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Wishlist value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <Minus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From original prices</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search wishlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="All">All Genres</option>
            <option value="Thriller">Thriller</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Action">Action</option>
            <option value="Superhero">Superhero</option>
            <option value="War">War</option>
            <option value="Drama">Drama</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredWishlist.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative overflow-hidden rounded-t-lg">
              <div 
                className="w-full aspect-[2/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.poster})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="text-xs font-medium backdrop-blur-sm">
                  {item.status}
                </Badge>
              </div>

              {/* Price Badge */}
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="text-xs font-medium backdrop-blur-sm bg-white/20 text-white border-white/30">
                  {item.price}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                <Button size="icon" variant="secondary" className="h-8 w-8 p-0 flex-1" onClick={() => handleMakeOffer(item)}>
                  <DollarSign className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8 p-0" onClick={() => setSelectedItem(item)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="destructive" className="h-8 w-8 p-0" onClick={() => handleRemoveFromWishlist(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.seller}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-600 font-medium">{item.price}</span>
                    <span className="text-muted-foreground line-through">{item.originalPrice}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{item.addedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    <span>{item.licenseRegion}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {item.genre}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.licenseType}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredWishlist.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
            <Heart className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No items in wishlist</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || genreFilter !== "All"
              ? "Try adjusting your search or filters"
              : "Start adding content to your wishlist"
            }
          </p>
          {!searchTerm && genreFilter === "All" && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Browse Content
            </Button>
          )}
        </div>
      )}

      {/* Item Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedItem.title}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Poster */}
                <div className="lg:col-span-1">
                  <div 
                    className="w-full aspect-[2/3] bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url(${selectedItem.poster})` }}
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
                          <span className="ml-2 font-medium">{selectedItem.genre}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="ml-2 font-medium">{selectedItem.duration}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Year:</span>
                          <span className="ml-2 font-medium">{selectedItem.year}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rating:</span>
                          <span className="ml-2 font-medium">{selectedItem.rating}/5</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Pricing Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Current Price:</span>
                          <span className="ml-2 font-medium text-green-600">{selectedItem.price}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Original Price:</span>
                          <span className="ml-2 font-medium line-through">{selectedItem.originalPrice}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">License Type:</span>
                          <span className="ml-2 font-medium">{selectedItem.licenseType}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Region:</span>
                          <span className="ml-2 font-medium">{selectedItem.licenseRegion}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => handleMakeOffer(selectedItem)}>
                      <DollarSign className="h-4 w-4 mr-2" />
                      Make Offer
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Seller
                    </Button>
                    <Button variant="outline" onClick={() => handleRemoveFromWishlist(selectedItem.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
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