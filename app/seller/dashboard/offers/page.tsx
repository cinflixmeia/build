"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Filter,
  MessageSquare,
  CheckCircle,
  X,
  Clock,
  DollarSign,
  Users,
  Calendar,
  AlertCircle,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Send,
  Edit,
  ArrowLeft,
  ArrowRight
} from "lucide-react"

type NegotiationEntry = {
  id: number
  date: string
  type: "offer" | "accept" | "reject" | "counter" | "message"
  message: string
  amount: string | null
  from: string
}

type Offer = {
  id: string
  title: string
  buyer: string
  amount: string
  status: "Pending" | "Accepted" | "Rejected" | "Countered"
  type: string
  duration: string
  territory: string
  received: string
  expires: string
  description: string
  originalAmount: string
  counterAmount: string | null
  negotiationHistory: NegotiationEntry[]
}

// Enhanced offers data with negotiation history
const initialOffers: Offer[] = [
  {
    id: "OFF-001",
    title: "Apollo 11: First Steps on the Moon",
    buyer: "Netflix",
    amount: "$1,200",
    status: "Pending",
    type: "Licensing",
    duration: "2 years",
    territory: "North America",
    received: "2024-01-15",
    expires: "2024-01-22",
    description: "Exclusive streaming rights for North America",
    originalAmount: "$1,200",
    counterAmount: null,
    negotiationHistory: [
      {
        id: 1,
        date: "2024-01-15",
        type: "offer",
        message: "Initial offer received",
        amount: "$1,200" as string | null,
        from: "Netflix"
      }
    ]
  },
  {
    id: "OFF-002",
    title: "The Imitation Game",
    buyer: "Amazon Prime",
    amount: "$800",
    status: "Accepted",
    type: "Licensing",
    duration: "1 year",
    territory: "Global",
    received: "2024-01-14",
    expires: "2024-01-21",
    description: "Non-exclusive streaming rights worldwide",
    originalAmount: "$800",
    counterAmount: null,
    negotiationHistory: [
      {
        id: 1,
        date: "2024-01-14",
        type: "offer",
        message: "Initial offer received",
        amount: "$800",
        from: "Amazon Prime"
      },
      {
        id: 2,
        date: "2024-01-15",
        type: "accept",
        message: "Offer accepted",
        amount: "$800",
        from: "You"
      }
    ]
  },
  {
    id: "OFF-003",
    title: "Beyonce & Jay-Z: Power Love",
    buyer: "Hulu",
    amount: "$750",
    status: "Countered",
    type: "Licensing",
    duration: "18 months",
    territory: "United States",
    received: "2024-01-13",
    expires: "2024-01-20",
    description: "Exclusive streaming rights for US market",
    originalAmount: "$600",
    counterAmount: "$750",
    negotiationHistory: [
      {
        id: 1,
        date: "2024-01-13",
        type: "offer",
        message: "Initial offer received",
        amount: "$600",
        from: "Hulu"
      },
      {
        id: 2,
        date: "2024-01-14",
        type: "counter",
        message: "Counter offer sent",
        amount: "$750",
        from: "You"
      }
    ]
  },
  {
    id: "OFF-004",
    title: "Yellow Yellow Yellow: The Indycar Safety Team",
    buyer: "Disney+",
    amount: "$400",
    status: "Rejected",
    type: "Licensing",
    duration: "1 year",
    territory: "Europe",
    received: "2024-01-12",
    expires: "2024-01-19",
    description: "Non-exclusive streaming rights for Europe",
    originalAmount: "$400",
    counterAmount: null,
    negotiationHistory: [
      {
        id: 1,
        date: "2024-01-12",
        type: "offer",
        message: "Initial offer received",
        amount: "$400",
        from: "Disney+"
      },
      {
        id: 2,
        date: "2024-01-13",
        type: "reject",
        message: "Offer rejected",
        amount: "$400",
        from: "You"
      }
    ]
  },
  {
    id: "OFF-005",
    title: "The Big Clock",
    buyer: "HBO Max",
    amount: "$900",
    status: "Pending",
    type: "Licensing",
    duration: "3 years",
    territory: "North America",
    received: "2024-01-11",
    expires: "2024-01-18",
    description: "Exclusive streaming rights for North America",
    originalAmount: "$900",
    counterAmount: null,
    negotiationHistory: [
      {
        id: 1,
        date: "2024-01-11",
        type: "offer",
        message: "Initial offer received",
        amount: "$900",
        from: "HBO Max"
      }
    ]
  }
]

const statusColors = {
  Pending: "bg-yellow-500",
  Accepted: "bg-green-500",
  Rejected: "bg-red-500",
  Countered: "bg-blue-500"
}

const statuses = ["All", "Pending", "Accepted", "Rejected", "Countered"]

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>(initialOffers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedOffers, setSelectedOffers] = useState<string[]>([])
  const [showDetails, setShowDetails] = useState(false)
  const [detailsOffer, setDetailsOffer] = useState<any>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmAction, setConfirmAction] = useState<"accept"|"reject"|"counter"|null>(null)
  const [confirmOffer, setConfirmOffer] = useState<any>(null)
  const [showCounter, setShowCounter] = useState(false)
  const [counterAmount, setCounterAmount] = useState("")
  const [counterError, setCounterError] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [exporting, setExporting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const [flags, setFlags] = useState<{ enable_offers?: boolean } | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('admin_flags')
      if (raw) {
        const arr = JSON.parse(raw) as Array<{ key: string; enabled: boolean }>
        const obj: any = {}
        arr.forEach(f => { obj[f.key] = f.enabled })
        setFlags(obj)
      }
    } catch {}
  }, [])

  // Filtering
  const filteredOffers = useMemo(() => {
    return offers.filter(offer => {
      const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.buyer.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "All" || offer.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [offers, searchTerm, statusFilter])

  // Pagination
  const paginatedOffers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredOffers.slice(start, start + itemsPerPage)
  }, [filteredOffers, currentPage])
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage)

  // Bulk selection
  const handleSelectAll = () => {
    if (selectedOffers.length === paginatedOffers.length) {
      setSelectedOffers([])
    } else {
      setSelectedOffers(paginatedOffers.map(o => o.id))
    }
  }
  const handleSelectOffer = (id: string) => {
    setSelectedOffers(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  // Export
  const handleExport = () => {
    setExporting(true)
    const header = "ID,Title,Buyer,Amount,Status,Type,Duration,Territory,Received,Expires,Description\n"
    const rows = (selectedOffers.length > 0 ? offers.filter(o => selectedOffers.includes(o.id)) : filteredOffers)
      .map(o => `${o.id},${o.title},${o.buyer},${o.amount},${o.status},${o.type},${o.duration},${o.territory},${o.received},${o.expires},${o.description}`)
      .join("\n")
    const csv = header + rows
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `offers_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => setExporting(false), 1000)
  }

  // Offer actions
  const parseCurrency = (val: string) => {
    const n = parseFloat(val.replace(/[^0-9.]/g, ""))
    return isNaN(n) ? NaN : n
  }
  const formatCurrency = (n: number) => `$${n.toLocaleString()}`

  const handleAction = (offer: any, action: "accept"|"reject"|"counter") => {
    if (action === "counter") {
      setConfirmOffer(offer)
      setCounterAmount(offer.originalAmount)
      setCounterError("")
      setShowCounter(true)
    } else {
      setConfirmOffer(offer)
      setConfirmAction(action)
      setShowConfirm(true)
    }
  }

  const handleConfirmAction = () => {
    if (!confirmOffer || !confirmAction) return
    
    // Validate counter amount if needed
    if (confirmAction === "counter") {
      const num = parseCurrency(counterAmount)
      if (!isFinite(num) || num <= 0) {
        setCounterError("Enter a valid amount greater than 0")
        return
      }
    }

    const newHistoryEntry: NegotiationEntry = {
      id: confirmOffer.negotiationHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: confirmAction as NegotiationEntry["type"],
      message: `Offer ${confirmAction}ed`,
      amount: confirmAction === "counter" ? formatCurrency(parseCurrency(counterAmount)) : confirmOffer.amount,
      from: "You"
    }

    setOffers(prev => prev.map(o =>
      o.id === confirmOffer.id
        ? { 
            ...o, 
            status: confirmAction === "accept" ? "Accepted" : confirmAction === "reject" ? "Rejected" : "Countered",
            amount: confirmAction === "counter" ? formatCurrency(parseCurrency(counterAmount)) : o.amount,
            counterAmount: confirmAction === "counter" ? formatCurrency(parseCurrency(counterAmount)) : o.counterAmount,
            negotiationHistory: [...o.negotiationHistory, newHistoryEntry]
          }
        : o
    ))
    setShowConfirm(false)
    setShowCounter(false)
    setConfirmOffer(null)
    setConfirmAction(null)
    setCounterAmount("")
    setCounterError("")
  }

  // Handle counter offer separately
  const handleCounterOffer = () => {
    if (!confirmOffer) return
    const num = parseCurrency(counterAmount)
    if (!isFinite(num) || num <= 0) {
      setCounterError("Enter a valid amount greater than 0")
      return
    }
    
    const newHistoryEntry: NegotiationEntry = {
      id: confirmOffer.negotiationHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: "counter",
      message: "Counter offer sent",
      amount: formatCurrency(num),
      from: "You"
    }

    setOffers(prev => prev.map(o =>
      o.id === confirmOffer.id
        ? { 
            ...o, 
            status: "Countered",
            amount: formatCurrency(num),
            counterAmount: formatCurrency(num),
            negotiationHistory: [...o.negotiationHistory, newHistoryEntry]
          }
        : o
    ))
    setShowCounter(false)
    setConfirmOffer(null)
    setCounterAmount("")
    setCounterError("")
  }

  // Offer details
  const handleShowDetails = (offer: any) => {
    setDetailsOffer(offer)
    setShowDetails(true)
  }

  // Send message
  const handleSendMessage = () => {
    if (!detailsOffer || !messageText.trim()) return
    
    const newMessage: NegotiationEntry = {
      id: detailsOffer.negotiationHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: "message",
      message: messageText,
      amount: null,
      from: "You"
    }

    setOffers(prev => prev.map(o =>
      o.id === detailsOffer.id
        ? { ...o, negotiationHistory: [...o.negotiationHistory, newMessage] }
        : o
    ))
    setMessageText("")
  }

  const getStatusCount = (status: string) => offers.filter(offer => offer.status === status).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Offers & Deals</h1>
          <p className="text-muted-foreground">Manage incoming offers and negotiations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExport} disabled={exporting}>
            <Download className="h-4 w-4" />
            {exporting ? "Exporting..." : selectedOffers.length > 0 ? `Export Selected (${selectedOffers.length})` : "Export All"}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Offers</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offers.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount("Pending")}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount("Accepted")}</div>
            <p className="text-xs text-muted-foreground">Deals closed</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,900</div>
            <p className="text-xs text-muted-foreground">From all offers</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search offers..."
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
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Selection */}
      <div className="mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSelectAll}
          className="text-xs"
        >
          {selectedOffers.length === paginatedOffers.length ? "Deselect All" : "Select All"}
        </Button>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {paginatedOffers.map((offer) => (
          <Card key={offer.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedOffers.includes(offer.id)}
                        onChange={() => handleSelectOffer(offer.id)}
                        className="rounded"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{offer.title}</h3>
                        <p className="text-muted-foreground">{offer.buyer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={`${statusColors[offer.status as keyof typeof statusColors]} text-white`}
                      >
                        {offer.status}
                      </Badge>
                      {offer.status === "Pending" && (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      <Button size="icon" variant="outline" onClick={() => handleShowDetails(offer)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Amount:</span>
                      <p className="font-medium">{offer.amount}</p>
                      {offer.counterAmount && offer.counterAmount !== offer.originalAmount && (
                        <p className="text-xs text-muted-foreground">Original: {offer.originalAmount}</p>
                      )}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <p className="font-medium">{offer.type}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{offer.duration}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Territory:</span>
                      <p className="font-medium">{offer.territory}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Received: {offer.received}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Expires: {offer.expires}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:ml-4 lg:min-w-[200px]">
                  {offer.status === "Pending" && (
                    <>
                      <Button size="sm" className="flex items-center gap-2 w-full" onClick={() => handleAction(offer, "accept")} disabled={flags?.enable_offers === false}> 
                        <CheckCircle className="h-4 w-4" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-2 w-full" onClick={() => handleAction(offer, "counter")} disabled={flags?.enable_offers === false}> 
                        <MessageSquare className="h-4 w-4" />
                        Counter
                      </Button>
                      <Button size="sm" variant="destructive" className="flex items-center gap-2 w-full" onClick={() => handleAction(offer, "reject")} disabled={flags?.enable_offers === false}> 
                        <X className="h-4 w-4" />
                        Reject
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-2 w-full" onClick={() => handleShowDetails(offer)}>
                        <MessageSquare className="h-4 w-4" />
                        View/Negotiate
                      </Button>
                    </>
                  )}
                  {offer.status === "Accepted" && (
                    <Button size="sm" variant="outline" className="flex items-center gap-2 w-full" onClick={() => handleShowDetails(offer)}>
                      <MessageSquare className="h-4 w-4" />
                      View Details
                    </Button>
                  )}
                  {offer.status === "Countered" && (
                    <>
                      <Button size="sm" className="flex items-center gap-2 w-full" onClick={() => handleAction(offer, "accept")} disabled={flags?.enable_offers === false}> 
                        <CheckCircle className="h-4 w-4" />
                        Accept Counter
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-2 w-full" onClick={() => handleShowDetails(offer)}>
                        <MessageSquare className="h-4 w-4" />
                        Continue Negotiation
                      </Button>
                    </>
                  )}
                  {offer.status === "Rejected" && (
                    <Button size="sm" variant="outline" className="flex items-center gap-2 w-full" onClick={() => handleShowDetails(offer)}>
                      <MessageSquare className="h-4 w-4" />
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
            <MessageSquare className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No offers found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "All"
              ? "Try adjusting your search or filters"
              : "You'll see incoming offers here when buyers express interest in your content"
            }
          </p>
        </div>
      )}

      {/* Offer Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {detailsOffer && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>Offer Details</span>
                  <Badge className={`${statusColors[detailsOffer.status as keyof typeof statusColors]} text-white`}>
                    {detailsOffer.status}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Offer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Offer Information</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Title:</span>
                        <span className="font-medium">{detailsOffer.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Buyer:</span>
                        <span className="font-medium">{detailsOffer.buyer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium text-green-600">{detailsOffer.amount}</span>
                      </div>
                      {detailsOffer.counterAmount && detailsOffer.counterAmount !== detailsOffer.originalAmount && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Original Amount:</span>
                          <span className="font-medium">{detailsOffer.originalAmount}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{detailsOffer.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{detailsOffer.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Territory:</span>
                        <span className="font-medium">{detailsOffer.territory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Received:</span>
                        <span className="font-medium">{detailsOffer.received}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expires:</span>
                        <span className="font-medium">{detailsOffer.expires}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Description</h3>
                    <p className="text-sm text-muted-foreground">{detailsOffer.description}</p>
                  </div>
                </div>

                {/* Negotiation History */}
                <div>
                  <h3 className="font-semibold mb-4">Negotiation History</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {detailsOffer.negotiationHistory.map((entry: any, index: number) => (
                      <div key={entry.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{entry.from}</span>
                            <span className="text-xs text-muted-foreground">{entry.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{entry.message}</p>
                          {entry.amount && (
                            <span className="text-xs font-medium text-green-600">${entry.amount}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Send Message</h3>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1"
                      rows={3}
                    />
                    <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Action Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-md">
          {confirmOffer && confirmAction && (
            <>
              <DialogHeader>
                <DialogTitle>Confirm {confirmAction.charAt(0).toUpperCase() + confirmAction.slice(1)}</DialogTitle>
              </DialogHeader>
              <div className="mb-4">
                Are you sure you want to <span className="font-semibold">{confirmAction}</span> the offer for <span className="font-semibold">{confirmOffer.title}</span> from <span className="font-semibold">{confirmOffer.buyer}</span>?
              </div>
              <div className="flex gap-2">
                <Button variant={confirmAction === "reject" ? "destructive" : "default"} className="flex-1" onClick={handleConfirmAction}>
                  {confirmAction.charAt(0).toUpperCase() + confirmAction.slice(1)}
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowConfirm(false)}>
                  Cancel
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Counter Offer Modal */}
      <Dialog open={showCounter} onOpenChange={setShowCounter}>
        <DialogContent className="max-w-md">
          {confirmOffer && (
            <>
              <DialogHeader>
                <DialogTitle>Make Counter Offer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Counter Amount</label>
                  <Input
                    type="text"
                    value={counterAmount}
                    onChange={(e) => setCounterAmount(e.target.value)}
                    placeholder="Enter counter amount (e.g., $1,200)"
                    className="w-full"
                    aria-invalid={!!counterError}
                  />
                  {counterError && (
                    <div className="text-xs text-red-500 mt-1">{counterError}</div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Original offer: {confirmOffer.originalAmount}
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={handleCounterOffer}>
                    Send Counter
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setShowCounter(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 