"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Search,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  Users,
  Globe,
  Award
} from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Pie, PieChart as RePieChart, Cell, Legend, BarChart, Bar } from "recharts"
import { ChartContainer } from "@/components/chart-wrapper"

// Helper to parse "$1,200" -> 1200
const parseAmount = (amount: string) => {
  try {
    return parseFloat(amount.replace(/[$,]/g, "")) || 0
  } catch {
    return 0
  }
}

// Different time range data
const chartData = {
  "7d": [
    { day: "Mon", revenue: 1200 },
    { day: "Tue", revenue: 1800 },
    { day: "Wed", revenue: 2100 },
    { day: "Thu", revenue: 1600 },
    { day: "Fri", revenue: 2400 },
    { day: "Sat", revenue: 2800 },
    { day: "Sun", revenue: 3200 }
  ],
  "30d": [
    { week: "Week 1", revenue: 8400 },
    { week: "Week 2", revenue: 9200 },
    { week: "Week 3", revenue: 7800 },
    { week: "Week 4", revenue: 10200 }
  ],
  "90d": [
    { month: "Oct", revenue: 5200 },
    { month: "Nov", revenue: 4800 },
    { month: "Dec", revenue: 6400 }
  ],
  "1y": [
    { month: "Jan", revenue: 2100 },
    { month: "Feb", revenue: 1800 },
    { month: "Mar", revenue: 2400 },
    { month: "Apr", revenue: 3200 },
    { month: "May", revenue: 2800 },
    { month: "Jun", revenue: 3600 },
    { month: "Jul", revenue: 4200 },
    { month: "Aug", revenue: 3800 },
    { month: "Sep", revenue: 4500 },
    { month: "Oct", revenue: 5200 },
    { month: "Nov", revenue: 4800 },
    { month: "Dec", revenue: 6400 }
  ]
}

const genreBreakdown = [
  { genre: "Documentary", value: 5400, color: "#6366f1" },
  { genre: "Drama", value: 3200, color: "#10b981" },
  { genre: "Action", value: 1800, color: "#f59e42" },
  { genre: "Thriller", value: 1000, color: "#ef4444" },
]

const topPerformers = [
  {
    id: "1",
    title: "Apollo 11: First Steps on the Moon",
    revenue: "$3,200",
    views: "1,240",
    growth: "+25%",
    isPositive: true,
    genre: "Documentary",
    buyer: "Netflix"
  },
  {
    id: "2",
    title: "The Imitation Game",
    revenue: "$4,100",
    views: "2,100",
    growth: "+18%",
    isPositive: true,
    genre: "Drama",
    buyer: "Amazon Prime"
  },
  {
    id: "3",
    title: "Beyonce & Jay-Z: Power Love",
    revenue: "$2,500",
    views: "890",
    growth: "+12%",
    isPositive: true,
    genre: "Documentary",
    buyer: "Hulu"
  },
  {
    id: "4",
    title: "Yellow Yellow Yellow: The Indycar Safety Team",
    revenue: "$1,800",
    views: "650",
    growth: "-5%",
    isPositive: false,
    genre: "Documentary",
    buyer: "Disney+"
  }
]

const recentTransactions = [
  {
    id: "TXN-001",
    title: "Apollo 11: First Steps on the Moon",
    buyer: "Netflix",
    amount: "$1,200",
    date: "2024-01-15",
    status: "Completed",
    genre: "Documentary",
    duration: "1h 30m",
    views: "1,240",
    description: "The historic moon landing documentary"
  },
  {
    id: "TXN-002",
    title: "The Imitation Game",
    buyer: "Amazon Prime",
    amount: "$800",
    date: "2024-01-14",
    status: "Completed",
    genre: "Drama",
    duration: "1h 54m",
    views: "2,100",
    description: "The story of Alan Turing's code-breaking"
  },
  {
    id: "TXN-003",
    title: "Beyonce & Jay-Z: Power Love",
    buyer: "Hulu",
    amount: "$600",
    date: "2024-01-13",
    status: "Pending",
    genre: "Documentary",
    duration: "1h 45m",
    views: "890",
    description: "A compelling documentary about power couple's journey"
  },
  {
    id: "TXN-004",
    title: "Yellow Yellow Yellow: The Indycar Safety Team",
    buyer: "Disney+",
    amount: "$400",
    date: "2024-01-12",
    status: "Completed",
    genre: "Documentary",
    duration: "1h 20m",
    views: "650",
    description: "Behind the scenes of racing safety innovation"
  },
  {
    id: "TXN-005",
    title: "Superman: Hungarian Edition",
    buyer: "HBO Max",
    amount: "$900",
    date: "2024-01-11",
    status: "Completed",
    genre: "Action",
    duration: "2h 23m",
    views: "450",
    description: "The Man of Steel in Hungarian"
  },
  {
    id: "TXN-006",
    title: "The Big Clock",
    buyer: "Paramount+",
    amount: "$300",
    date: "2024-01-10",
    status: "Pending",
    genre: "Thriller",
    duration: "1h 35m",
    views: "0",
    description: "Classic film noir thriller"
  },
  {
    id: "TXN-007",
    title: "The Flash: Brazilian Edition",
    buyer: "Netflix",
    amount: "$750",
    date: "2024-01-09",
    status: "Completed",
    genre: "Action",
    duration: "2h 15m",
    views: "320",
    description: "The fastest man alive in Portuguese"
  },
  {
    id: "TXN-008",
    title: "The Hundred Foot Journey",
    buyer: "Amazon Prime",
    amount: "$550",
    date: "2024-01-08",
    status: "Completed",
    genre: "Drama",
    duration: "1h 55m",
    views: "780",
    description: "A culinary journey across cultures"
  }
]

const buyers = ["Netflix", "Amazon Prime", "Hulu", "Disney+", "HBO Max", "Paramount+"]
const genres = ["Documentary", "Drama", "Action", "Thriller"]
const statuses = ["Completed", "Pending", "Failed"]

// Date range presets
const datePresets = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "last7days" },
  { label: "Last 30 days", value: "last30days" },
  { label: "This month", value: "thismonth" },
  { label: "Last month", value: "lastmonth" },
  { label: "Custom range", value: "custom" }
]

export default function SalesPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [genreFilter, setGenreFilter] = useState("All")
  const [buyerFilter, setBuyerFilter] = useState("All")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [exporting, setExporting] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  // Date filtering state
  const [datePreset, setDatePreset] = useState("last30days")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const itemsPerPage = 5

  // Placeholder; calculated after filteredTransactions is declared
  let metrics: {
    totalRevenue: number
    thisMonthRevenue: number
    lastMonthRevenue: number
    changePct: number | null
    isPositive: boolean
    activeTitles: number
    avgPerTitle: number
  } = {
    totalRevenue: 0,
    thisMonthRevenue: 0,
    lastMonthRevenue: 0,
    changePct: null,
    isPositive: true,
    activeTitles: 0,
    avgPerTitle: 0,
  }
  let currentChartData: any[] = []

  // Calculate date range based on preset
  const getDateRange = (preset: string) => {
    const today = new Date()
    const start = new Date()
    const end = new Date()

    switch (preset) {
      case "today":
        return { start: today.toISOString().split('T')[0], end: today.toISOString().split('T')[0] }
      case "yesterday":
        start.setDate(today.getDate() - 1)
        return { start: start.toISOString().split('T')[0], end: start.toISOString().split('T')[0] }
      case "last7days":
        start.setDate(today.getDate() - 7)
        return { start: start.toISOString().split('T')[0], end: today.toISOString().split('T')[0] }
      case "last30days":
        start.setDate(today.getDate() - 30)
        return { start: start.toISOString().split('T')[0], end: today.toISOString().split('T')[0] }
      case "thismonth":
        start.setDate(1)
        return { start: start.toISOString().split('T')[0], end: today.toISOString().split('T')[0] }
      case "lastmonth":
        start.setMonth(today.getMonth() - 1, 1)
        end.setMonth(today.getMonth(), 0)
        return { start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] }
      case "custom":
        return { start: startDate, end: endDate }
      default:
        start.setDate(today.getDate() - 30)
        return { start: start.toISOString().split('T')[0], end: today.toISOString().split('T')[0] }
    }
  }

  const currentDateRange = getDateRange(datePreset)

  // Filtered and sorted transactions with date filtering
  const filteredTransactions = useMemo(() => {
    let filtered = recentTransactions.filter(txn => {
      const matchesSearch =
        txn.title.toLowerCase().includes(search.toLowerCase()) ||
        txn.buyer.toLowerCase().includes(search.toLowerCase()) ||
        txn.description.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "All" || txn.status === statusFilter
      const matchesGenre = genreFilter === "All" || txn.genre === genreFilter
      const matchesBuyer = buyerFilter === "All" || txn.buyer === buyerFilter
      
      // Date filtering
      const transactionDate = new Date(txn.date)
      const startDate = new Date(currentDateRange.start)
      const endDate = new Date(currentDateRange.end)
      const matchesDate = transactionDate >= startDate && transactionDate <= endDate

      return matchesSearch && matchesStatus && matchesGenre && matchesBuyer && matchesDate
    })

    // Sort transactions
    filtered.sort((a, b) => {
      let aValue, bValue
      switch (sortBy) {
        case "amount":
          aValue = parseFloat(a.amount.replace("$", "").replace(",", ""))
          bValue = parseFloat(b.amount.replace("$", "").replace(",", ""))
          break
        case "date":
          aValue = new Date(a.date).getTime()
          bValue = new Date(b.date).getTime()
          break
        case "title":
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        default:
          aValue = new Date(a.date).getTime()
          bValue = new Date(b.date).getTime()
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [search, statusFilter, genreFilter, buyerFilter, sortBy, sortOrder, currentDateRange])

  // Metrics recalculation based on filtered transactions
  metrics = useMemo(() => {
    const now = new Date()
    const thisMonthKey = `${now.getFullYear()}-${now.getMonth()}`
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthKey = `${lastMonth.getFullYear()}-${lastMonth.getMonth()}`

    let totalRevenue = 0
    let thisMonthRevenue = 0
    let lastMonthRevenue = 0
    const titlesThisMonth = new Set<string>()

    filteredTransactions.forEach(txn => {
      if (txn.status !== "Completed") return
      const amt = parseAmount(txn.amount)
      totalRevenue += amt

      const d = new Date(txn.date)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      if (key === thisMonthKey) {
        thisMonthRevenue += amt
        titlesThisMonth.add(txn.title)
      }
      if (key === lastMonthKey) {
        lastMonthRevenue += amt
      }
    })

    const changePct = lastMonthRevenue === 0 ? null : ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
    const avgThisMonth = titlesThisMonth.size > 0 ? thisMonthRevenue / titlesThisMonth.size : 0

    return {
      totalRevenue,
      thisMonthRevenue,
      lastMonthRevenue,
      changePct,
      isPositive: (changePct ?? 0) >= 0,
      activeTitles: titlesThisMonth.size,
      avgPerTitle: avgThisMonth
    }
  }, [filteredTransactions])

  // Build chart data dynamically from filtered transactions and selected time range
  currentChartData = useMemo(() => {
    const base = filteredTransactions.filter(t => t.status === "Completed")
    const today = new Date()

    const formatCurrency = (n: number) => n

    if (timeRange === "7d") {
      const days: { label: string; date: Date }[] = []
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(today.getDate() - i)
        days.push({ label: d.toLocaleDateString(undefined, { weekday: 'short' }), date: new Date(d.getFullYear(), d.getMonth(), d.getDate()) })
      }
      return days.map(({ label, date }) => {
        const sum = base.reduce((acc, t) => {
          const td = new Date(t.date)
          const normalized = new Date(td.getFullYear(), td.getMonth(), td.getDate())
          return acc + (normalized.getTime() === date.getTime() ? parseAmount(t.amount) : 0)
        }, 0)
        return { day: label, revenue: formatCurrency(sum) }
      })
    }

    if (timeRange === "30d") {
      // 4 buckets of ~7 days
      const start = new Date(today)
      start.setDate(today.getDate() - 27)
      const buckets = [0, 1, 2, 3].map(() => 0)
      base.forEach(t => {
        const d = new Date(t.date)
        if (d >= start && d <= today) {
          const diffDays = Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
          const bucket = Math.min(3, Math.floor(diffDays / 7))
          buckets[bucket] += parseAmount(t.amount)
        }
      })
      return [
        { week: "Week 1", revenue: formatCurrency(buckets[0]) },
        { week: "Week 2", revenue: formatCurrency(buckets[1]) },
        { week: "Week 3", revenue: formatCurrency(buckets[2]) },
        { week: "Week 4", revenue: formatCurrency(buckets[3]) },
      ]
    }

    if (timeRange === "90d") {
      const months: { key: string; label: string }[] = []
      for (let i = 2; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
        months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleString(undefined, { month: 'short' }) })
      }
      const map = Object.fromEntries(months.map(m => [m.key, 0])) as Record<string, number>
      base.forEach(t => {
        const d = new Date(t.date)
        const key = `${d.getFullYear()}-${d.getMonth()}`
        if (map[key] !== undefined) map[key] += parseAmount(t.amount)
      })
      return months.map(m => ({ month: m.label, revenue: formatCurrency(map[m.key]) }))
    }

    // 1y
    const months: { key: string; label: string }[] = []
    for (let i = 11; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
      months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleString(undefined, { month: 'short' }) })
    }
    const map = Object.fromEntries(months.map(m => [m.key, 0])) as Record<string, number>
    base.forEach(t => {
      const d = new Date(t.date)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      if (map[key] !== undefined) map[key] += parseAmount(t.amount)
    })
    return months.map(m => ({ month: m.label, revenue: formatCurrency(map[m.key]) }))
  }, [filteredTransactions, timeRange])

  // Paginated transactions
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredTransactions, currentPage])

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  // Export CSV
  const handleExport = () => {
    setExporting(true)
    const header = "ID,Title,Buyer,Amount,Date,Status,Genre,Duration,Views\n"
    const rows = filteredTransactions.map(txn =>
      `${txn.id},${txn.title},${txn.buyer},${txn.amount},${txn.date},${txn.status},${txn.genre},${txn.duration},${txn.views}`
    ).join("\n")
    const csv = header + rows
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => setExporting(false), 1000)
  }

  // Bulk actions
  const handleSelectAll = () => {
    if (selectedTransactions.length === paginatedTransactions.length) {
      setSelectedTransactions([])
    } else {
      setSelectedTransactions(paginatedTransactions.map(t => t.id))
    }
  }

  const handleBulkExport = () => {
    if (selectedTransactions.length === 0) return
    const selectedData = recentTransactions.filter(t => selectedTransactions.includes(t.id))
    const header = "ID,Title,Buyer,Amount,Date,Status,Genre,Duration,Views\n"
    const rows = selectedData.map(txn =>
      `${txn.id},${txn.title},${txn.buyer},${txn.amount},${txn.date},${txn.status},${txn.genre},${txn.duration},${txn.views}`
    ).join("\n")
    const csv = header + rows
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `selected_transactions_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setShowTransactionModal(true)
  }

  const handleSelectTransaction = (id: string) => {
    setSelectedTransactions(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    )
  }

  const handleDatePresetChange = (preset: string) => {
    setDatePreset(preset)
    if (preset !== "custom") {
      setStartDate("")
      setEndDate("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sales & Revenue</h1>
          <p className="text-muted-foreground">Track your earnings and performance</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={handleExport} 
            disabled={exporting}
          >
            <Download className="h-4 w-4" />
            {exporting ? "Exporting..." : "Export All"}
          </Button>
        </div>
      </div>

      {/* Date Range Display */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Date Range:</span>
              <span className="text-sm text-muted-foreground">
                {currentDateRange.start} to {currentDateRange.end}
              </span>
            </div>
            <div className="flex gap-2">
              {datePresets.map((preset) => (
                <Button
                  key={preset.value}
                  variant={datePreset === preset.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleDatePresetChange(preset.value)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="All">All Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Genre</label>
                <select
                  value={genreFilter}
                  onChange={e => setGenreFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="All">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Buyer</label>
                <select
                  value={buyerFilter}
                  onChange={e => setBuyerFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="All">All Buyers</option>
                  {buyers.map(buyer => (
                    <option key={buyer} value={buyer}>{buyer}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>

            {/* Custom Date Range */}
            {datePreset === "custom" && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Start Date</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">End Date</label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Filtered</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.thisMonthRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              {metrics.changePct === null ? null : metrics.isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1 animate-bounce" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1 animate-bounce" />
              )}
              {metrics.changePct !== null && (
                <span className={metrics.isPositive ? "text-green-500" : "text-red-500"}>
                  {metrics.changePct.toFixed(1)}%
                </span>
              )}
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Content</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeTitles}</div>
            <p className="text-xs text-muted-foreground">Titles generating revenue (this month)</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.avgPerTitle.toFixed(0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Avg per title this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer height={256}>
              <LineChart data={currentChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={timeRange === "7d" ? "day" : timeRange === "30d" ? "week" : "month"} />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Genre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={genreBreakdown}
                    dataKey="value"
                    nameKey="genre"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ genre, value }) => `${genre}: $${value}`}
                  >
                    {genreBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.views} views • {item.genre}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{item.revenue}</p>
                    <div className="flex items-center text-xs">
                      {item.isPositive ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1 animate-bounce" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1 animate-bounce" />
                      )}
                      <span className={item.isPositive ? "text-green-500" : "text-red-500"}>
                        {item.growth}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="flex items-center gap-2">
              {selectedTransactions.length > 0 && (
                <Button size="sm" variant="outline" onClick={handleBulkExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Selected ({selectedTransactions.length})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredTransactions.length} of {recentTransactions.length} transactions
              </span>
            </div>
          </div>

          {/* Bulk Selection */}
          <div className="mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="text-xs"
            >
              {selectedTransactions.length === paginatedTransactions.length ? "Deselect All" : "Select All"}
            </Button>
          </div>

          <div className="space-y-4">
            {paginatedTransactions.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">No transactions found for the selected date range.</div>
            ) : (
              paginatedTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(transaction.id)}
                      onChange={() => handleSelectTransaction(transaction.id)}
                      className="rounded"
                    />
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{transaction.title}</h4>
                      <p className="text-sm text-muted-foreground">Sold to {transaction.buyer}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date} • {transaction.genre}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">{transaction.amount}</p>
                      <Badge 
                        variant={transaction.status === "Completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewTransaction(transaction)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
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

      {/* Transaction Detail Modal */}
      <Dialog open={showTransactionModal} onOpenChange={setShowTransactionModal}>
        <DialogContent className="max-w-2xl">
          {selectedTransaction && (
            <>
              <DialogHeader>
                <DialogTitle>Transaction Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Transaction Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID:</span>
                        <span>{selectedTransaction.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{selectedTransaction.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-semibold text-green-600">{selectedTransaction.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={selectedTransaction.status === "Completed" ? "default" : "secondary"}>
                          {selectedTransaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Content Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Genre:</span>
                        <span>{selectedTransaction.genre}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{selectedTransaction.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Views:</span>
                        <span>{selectedTransaction.views}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Buyer:</span>
                        <span>{selectedTransaction.buyer}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{selectedTransaction.description}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 