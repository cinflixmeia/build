"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { 
  Search, 
  Filter, 
  Users, 
  MessageSquare,
  Eye,
  TrendingUp,
  Globe,
  Building,
  Calendar,
  Star,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Download,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Zap,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Tag,
  UserPlus,
  Settings,
  RefreshCw,
  User
} from "lucide-react"
import { toast } from "sonner"

// Enhanced buyers data with more details
const buyers = [
  {
    id: "1",
    name: "Netflix",
    type: "Streaming Platform",
    location: "Los Gatos, CA",
    rating: 4.8,
    totalDeals: 15,
    totalSpent: "$45,000",
    lastActive: "2 hours ago",
    status: "Active",
    interests: ["Documentary", "Drama", "Comedy"],
    avatar: "N",
    description: "Global streaming platform with over 200 million subscribers worldwide.",
    contactPerson: "Sarah Johnson",
    email: "sarah.johnson@netflix.com",
    phone: "+1 (555) 123-4567",
    website: "https://netflix.com",
    budget: "$50,000 - $100,000",
    preferredGenres: ["Documentary", "Drama", "Comedy", "Thriller"],
    dealHistory: [
      { id: "1", title: "Apollo 11 Documentary", amount: "$12,000", date: "2024-01-15", status: "Completed" },
      { id: "2", title: "The Imitation Game", amount: "$8,500", date: "2024-01-10", status: "Completed" },
      { id: "3", title: "Beyonce & Jay-Z Documentary", amount: "$15,000", date: "2024-01-05", status: "Pending" }
    ],
    interactions: [
      { id: "1", type: "Message", content: "Interested in licensing rights", date: "2024-01-15", status: "Read" },
      { id: "2", type: "Call", content: "Discussed pricing terms", date: "2024-01-12", status: "Completed" },
      { id: "3", type: "Meeting", content: "Content review meeting", date: "2024-01-10", status: "Scheduled" }
    ],
    tags: ["Premium", "High Budget", "Long-term Partner"],
    priority: "High",
    notes: "Very responsive buyer, prefers exclusive rights. Good for long-term partnerships."
  },
  {
    id: "2",
    name: "Amazon Prime",
    type: "Streaming Platform",
    location: "Seattle, WA",
    rating: 4.6,
    totalDeals: 12,
    totalSpent: "$32,000",
    lastActive: "1 day ago",
    status: "Active",
    interests: ["Action", "Thriller", "Documentary"],
    avatar: "A",
    description: "Amazon's streaming service with extensive global reach.",
    contactPerson: "Mike Chen",
    email: "mike.chen@amazon.com",
    phone: "+1 (555) 234-5678",
    website: "https://amazon.com/prime",
    budget: "$25,000 - $75,000",
    preferredGenres: ["Action", "Thriller", "Documentary", "Sci-Fi"],
    dealHistory: [
      { id: "1", title: "The Harder They Fall", amount: "$10,000", date: "2024-01-14", status: "Completed" },
      { id: "2", title: "Continuum Documentary", amount: "$7,500", date: "2024-01-08", status: "Completed" }
    ],
    interactions: [
      { id: "1", type: "Message", content: "Requested content samples", date: "2024-01-14", status: "Read" },
      { id: "2", type: "Email", content: "Sent proposal for new content", date: "2024-01-12", status: "Sent" }
    ],
    tags: ["Mid Budget", "Action Focused", "Global Reach"],
    priority: "Medium",
    notes: "Good for action and thriller content. Prefers non-exclusive rights."
  },
  {
    id: "3",
    name: "Hulu",
    type: "Streaming Platform",
    location: "Santa Monica, CA",
    rating: 4.4,
    totalDeals: 8,
    totalSpent: "$18,000",
    lastActive: "3 days ago",
    status: "Active",
    interests: ["Comedy", "Drama", "Reality"],
    avatar: "H",
    description: "Disney-owned streaming platform focusing on TV shows and movies.",
    contactPerson: "Lisa Rodriguez",
    email: "lisa.rodriguez@hulu.com",
    phone: "+1 (555) 345-6789",
    website: "https://hulu.com",
    budget: "$15,000 - $40,000",
    preferredGenres: ["Comedy", "Drama", "Reality", "Romance"],
    dealHistory: [
      { id: "1", title: "Rugrats Movie", amount: "$6,000", date: "2024-01-13", status: "Completed" },
      { id: "2", title: "The Apartment", amount: "$4,500", date: "2024-01-07", status: "Completed" }
    ],
    interactions: [
      { id: "1", type: "Message", content: "Interested in comedy content", date: "2024-01-13", status: "Read" }
    ],
    tags: ["Comedy Focused", "Mid Budget", "TV Content"],
    priority: "Medium",
    notes: "Good for comedy and drama content. Prefers shorter content formats."
  },
  {
    id: "4",
    name: "Disney+",
    type: "Streaming Platform",
    location: "Burbank, CA",
    rating: 4.9,
    totalDeals: 20,
    totalSpent: "$52,000",
    lastActive: "1 week ago",
    status: "Active",
    interests: ["Family", "Animation", "Adventure"],
    avatar: "D",
    description: "Disney's family-focused streaming platform with global reach.",
    contactPerson: "David Wilson",
    email: "david.wilson@disney.com",
    phone: "+1 (555) 456-7890",
    website: "https://disneyplus.com",
    budget: "$30,000 - $80,000",
    preferredGenres: ["Family", "Animation", "Adventure", "Educational"],
    dealHistory: [
      { id: "1", title: "Superman Hungarian Poster", amount: "$18,000", date: "2024-01-12", status: "Completed" },
      { id: "2", title: "The Hundred Foot Journey", amount: "$12,000", date: "2024-01-06", status: "Completed" }
    ],
    interactions: [
      { id: "1", type: "Meeting", content: "Family content review", date: "2024-01-12", status: "Completed" },
      { id: "2", type: "Call", content: "Discussed animation rights", date: "2024-01-10", status: "Completed" }
    ],
    tags: ["Family Content", "High Budget", "Premium Partner"],
    priority: "High",
    notes: "Excellent for family and educational content. High standards for quality."
  },
  {
    id: "5",
    name: "HBO Max",
    type: "Streaming Platform",
    location: "New York, NY",
    rating: 4.7,
    totalDeals: 10,
    totalSpent: "$28,000",
    lastActive: "2 weeks ago",
    status: "Inactive",
    interests: ["Drama", "Thriller", "Documentary"],
    avatar: "H",
    description: "Warner Bros. premium streaming service with high-quality content.",
    contactPerson: "Emma Thompson",
    email: "emma.thompson@hbomax.com",
    phone: "+1 (555) 567-8901",
    website: "https://hbomax.com",
    budget: "$20,000 - $60,000",
    preferredGenres: ["Drama", "Thriller", "Documentary", "Crime"],
    dealHistory: [
      { id: "1", title: "Torch Song Trilogy", amount: "$9,000", date: "2024-01-11", status: "Completed" },
      { id: "2", title: "The Big Clock", amount: "$6,500", date: "2024-01-05", status: "Completed" }
    ],
    interactions: [
      { id: "1", type: "Email", content: "Sent content proposal", date: "2024-01-11", status: "Sent" }
    ],
    tags: ["Premium Content", "Drama Focused", "Inactive"],
    priority: "Low",
    notes: "Currently inactive but good for premium drama content when active."
  }
]

const interactionTypes = {
  Message: { icon: MessageSquare, color: "text-blue-500" },
  Call: { icon: Phone, color: "text-green-500" },
  Meeting: { icon: Calendar, color: "text-purple-500" },
  Email: { icon: Mail, color: "text-orange-500" }
}

const priorityColors = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-gray-500"
}

export default function BuyersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [selectedBuyer, setSelectedBuyer] = useState<any>(null)
  const [showBuyerModal, setShowBuyerModal] = useState(false)
  const [selectedBuyers, setSelectedBuyers] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [buyersList, setBuyersList] = useState(buyers)
  const [showAddBuyerModal, setShowAddBuyerModal] = useState(false)
  const [addBuyerForm, setAddBuyerForm] = useState({
    name: "",
    type: "Streaming Platform",
    location: "",
    rating: 4.0,
    totalDeals: 0,
    totalSpent: "$0",
    lastActive: "Just now",
    status: "Active",
    interests: [],
    avatar: "B",
    description: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    budget: "",
    preferredGenres: [],
    dealHistory: [],
    interactions: [],
    tags: [],
    priority: "Medium",
    notes: ""
  })
  const [editBuyerForm, setEditBuyerForm] = useState<any>(null)
  const [showEditBuyerModal, setShowEditBuyerModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messageContent, setMessageContent] = useState("")
  const [showTagModal, setShowTagModal] = useState(false)
  const [bulkTag, setBulkTag] = useState("")

  const filteredAndSortedBuyers = useMemo(() => {
    let filtered = buyersList.filter(buyer => {
      const matchesSearch = buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           buyer.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           buyer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "All" || buyer.status === statusFilter
      const matchesPriority = priorityFilter === "All" || buyer.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })

    // Sort buyers
    filtered.sort((a, b) => {
      let aValue, bValue
      switch (sortBy) {
        case "name":
          aValue = a.name
          bValue = b.name
          break
        case "rating":
          aValue = a.rating
          bValue = b.rating
          break
        case "totalSpent":
          aValue = parseFloat(a.totalSpent.replace(/[$,]/g, ""))
          bValue = parseFloat(b.totalSpent.replace(/[$,]/g, ""))
          break
        case "totalDeals":
          aValue = a.totalDeals
          bValue = b.totalDeals
          break
        default:
          aValue = a.name
          bValue = b.name
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [searchTerm, statusFilter, priorityFilter, sortBy, sortOrder, buyersList])

  const handleSelectBuyer = (buyerId: string) => {
    setSelectedBuyers(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId)
        : [...prev, buyerId]
    )
  }

  const handleSelectAll = () => {
    setSelectedBuyers(filteredAndSortedBuyers.map(b => b.id))
  }

  const handleClearSelection = () => {
    setSelectedBuyers([])
  }

  const handleExportBuyers = () => {
    const selectedData = buyersList.filter(b => selectedBuyers.includes(b.id))
    if (selectedData.length === 0) {
      toast.error("No buyers selected for export.")
      return
    }
    // Generate CSV
    const csvRows = [
      [
        "Name", "Type", "Location", "Rating", "Total Deals", "Total Spent", "Status", "Contact", "Email", "Phone", "Tags"
      ],
      ...selectedData.map(b => [
        b.name, b.type, b.location, b.rating, b.totalDeals, b.totalSpent, b.status, b.contactPerson, b.email, b.phone, b.tags.join(";")
      ])
    ]
    const csvContent = csvRows.map(row => row.map(String).join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "buyers.csv"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Buyers exported as CSV!")
  }

  const handleBulkAction = (action: string) => {
    if (selectedBuyers.length === 0) {
      toast.error("No buyers selected.")
      return
    }
    if (action === "message") {
      setShowMessageModal(true)
    } else if (action === "export") {
      handleExportBuyers()
    } else if (action === "tag") {
      setShowTagModal(true)
    }
  }

  const handleBulkTag = () => {
    setBuyersList(prev => prev.map(b =>
      selectedBuyers.includes(b.id)
        ? { ...b, tags: Array.from(new Set([...b.tags, bulkTag])) }
        : b
    ))
    setShowTagModal(false)
    setBulkTag("")
    toast.success("Tag added to selected buyers!")
  }

  const handleSendBulkMessage = () => {
    setShowMessageModal(false)
    setMessageContent("")
    toast.success("Message sent to selected buyers!")
  }

  const handleAddBuyer = () => {
    if (!addBuyerForm.name.trim()) {
      toast.error("Name is required.")
      return
    }
    setBuyersList(prev => [
      {
        ...addBuyerForm,
        id: Date.now().toString(),
        avatar: addBuyerForm.name[0].toUpperCase() || "B"
      },
      ...prev
    ])
    setShowAddBuyerModal(false)
    setAddBuyerForm({
      name: "",
      type: "Streaming Platform",
      location: "",
      rating: 4.0,
      totalDeals: 0,
      totalSpent: "$0",
      lastActive: "Just now",
      status: "Active",
      interests: [],
      avatar: "B",
      description: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
      budget: "",
      preferredGenres: [],
      dealHistory: [],
      interactions: [],
      tags: [],
      priority: "Medium",
      notes: ""
    })
    toast.success("Buyer added!")
  }

  const handleEditBuyer = () => {
    setBuyersList(prev => prev.map(b =>
      b.id === editBuyerForm.id ? { ...editBuyerForm } : b
    ))
    setShowEditBuyerModal(false)
    toast.success("Buyer profile updated!")
  }

  const openBuyerProfile = (buyer: any) => {
    setSelectedBuyer(buyer)
    setShowBuyerModal(true)
  }

  const handleEditProfile = () => {
    setEditBuyerForm(selectedBuyer)
    setShowEditBuyerModal(true)
  }

  const handleUpdateNotes = (notes: string) => {
    setBuyersList(prev => prev.map(b =>
      b.id === selectedBuyer.id ? { ...b, notes } : b
    ))
    setSelectedBuyer({ ...selectedBuyer, notes })
    toast.success("Notes updated!")
  }

  const handleAddTag = (tag: string) => {
    setBuyersList(prev => prev.map(b =>
      b.id === selectedBuyer.id ? { ...b, tags: Array.from(new Set([...b.tags, tag])) } : b
    ))
    setSelectedBuyer({ ...selectedBuyer, tags: Array.from(new Set([...selectedBuyer.tags, tag])) })
    toast.success("Tag added!")
  }

  const totalRevenue = buyersList.reduce((sum, buyer) => 
    sum + parseFloat(buyer.totalSpent.replace(/[$,]/g, "")), 0
  )

  const totalDeals = buyersList.reduce((sum, buyer) => sum + buyer.totalDeals, 0)

  const averageRating = buyersList.reduce((sum, buyer) => sum + buyer.rating, 0) / buyersList.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Buyers</h1>
          <p className="text-muted-foreground">Connect with potential buyers and track interactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? "List View" : "Grid View"}
          </Button>
          <Button variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Buyer
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact All
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buyers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buyersList.length}</div>
            <p className="text-xs text-muted-foreground">Active buyers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeals}</div>
            <p className="text-xs text-muted-foreground">Completed transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From all buyers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Buyer satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search buyers, contacts, or interests..."
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
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-")
                setSortBy(field)
                setSortOrder(order as "asc" | "desc")
              }}
              className="px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="rating-desc">Rating High-Low</option>
              <option value="totalSpent-desc">Revenue High-Low</option>
              <option value="totalDeals-desc">Deals High-Low</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedBuyers.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                {selectedBuyers.length} buyer(s) selected
              </span>
              <Button variant="outline" size="sm" onClick={handleClearSelection}>
                Clear
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleBulkAction("message")}>
                <MessageSquare className="h-4 w-4 mr-1" />
                Message All
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleBulkAction("export")}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleBulkAction("tag")}>
                <Tag className="h-4 w-4 mr-1" />
                Add Tags
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Buyers Grid/List */}
      <div className={viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        : "space-y-4"
      }>
        {filteredAndSortedBuyers.map((buyer) => (
          <Card key={buyer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedBuyers.includes(buyer.id)}
                    onChange={() => handleSelectBuyer(buyer.id)}
                    className="rounded border-gray-300"
                  />
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                      {buyer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{buyer.name}</h3>
                    <p className="text-sm text-muted-foreground">{buyer.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={buyer.status === "Active" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {buyer.status}
                  </Badge>
                  <div className={`w-2 h-2 rounded-full ${priorityColors[buyer.priority as keyof typeof priorityColors]}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{buyer.description}</p>
              
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{buyer.location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{buyer.rating}</span>
                <span className="text-muted-foreground">({buyer.totalDeals} deals)</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Spent:</span>
                  <span className="font-medium">{buyer.totalSpent}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Active:</span>
                  <span>{buyer.lastActive}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Contact:</span>
                  <span>{buyer.contactPerson}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Interests:</p>
                <div className="flex flex-wrap gap-1">
                  {buyer.interests.slice(0, 3).map((interest, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                  {buyer.interests.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{buyer.interests.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="outline" onClick={() => openBuyerProfile(buyer)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedBuyers.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
            <Users className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No buyers found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "All" || priorityFilter !== "All"
              ? "Try adjusting your search or filters"
              : "Buyers will appear here when they show interest in your content"
            }
          </p>
        </div>
      )}

      {/* Buyer Profile Modal */}
      <Dialog open={showBuyerModal} onOpenChange={setShowBuyerModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {selectedBuyer?.avatar}
                </AvatarFallback>
              </Avatar>
              {selectedBuyer?.name} - Buyer Profile
            </DialogTitle>
          </DialogHeader>
          
          {selectedBuyer && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedBuyer.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedBuyer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedBuyer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedBuyer.website}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedBuyer.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Preferences</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget Range:</span>
                        <span>{selectedBuyer.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Priority:</span>
                        <Badge variant="outline" className="text-xs">
                          {selectedBuyer.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">{selectedBuyer.totalDeals}</div>
                        <div className="text-xs text-muted-foreground">Total Deals</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">{selectedBuyer.totalSpent}</div>
                        <div className="text-xs text-muted-foreground">Total Spent</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">{selectedBuyer.rating}</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">{selectedBuyer.interests.length}</div>
                        <div className="text-xs text-muted-foreground">Interests</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedBuyer.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Deal History */}
              <div>
                <h3 className="font-semibold mb-4">Deal History</h3>
                <div className="space-y-2">
                  {selectedBuyer.dealHistory.map((deal: any) => (
                    <div key={deal.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{deal.title}</div>
                        <div className="text-sm text-muted-foreground">{deal.date}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{deal.amount}</span>
                        <Badge variant={deal.status === "Completed" ? "default" : "secondary"}>
                          {deal.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interaction History */}
              <div>
                <h3 className="font-semibold mb-4">Recent Interactions</h3>
                <div className="space-y-2">
                  {selectedBuyer.interactions.map((interaction: any) => {
                    const IconComponent = interactionTypes[interaction.type as keyof typeof interactionTypes]?.icon || MessageSquare
                    const iconColor = interactionTypes[interaction.type as keyof typeof interactionTypes]?.color || "text-gray-500"
                    
                    return (
                      <div key={interaction.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <IconComponent className={`h-4 w-4 ${iconColor}`} />
                        <div className="flex-1">
                          <div className="font-medium">{interaction.type}</div>
                          <div className="text-sm text-muted-foreground">{interaction.content}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">{interaction.date}</div>
                          <Badge variant="outline" className="text-xs">
                            {interaction.status}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="font-semibold mb-2">Notes</h3>
                <p className="text-sm text-muted-foreground">{selectedBuyer.notes}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 