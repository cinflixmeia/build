"use client"

import { useMemo, useState, useEffect } from "react"
import { ChartContainer } from "@/components/chart-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer } from "recharts"

type SeriesPoint = { date: string; value: number }

const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"]

const MOCK_SERIES: { label: string; data: SeriesPoint[] }[] = [
  { label: "Revenue", data: [
    { date: "Jan", value: 12000 }, { date: "Feb", value: 15000 }, { date: "Mar", value: 11000 }, { date: "Apr", value: 21000 },
    { date: "May", value: 18000 }, { date: "Jun", value: 23000 }
  ]},
  { label: "Purchases", data: [
    { date: "Jan", value: 120 }, { date: "Feb", value: 180 }, { date: "Mar", value: 140 }, { date: "Apr", value: 220 },
    { date: "May", value: 200 }, { date: "Jun", value: 260 }
  ]},
]

const MOCK_PIE = [
  { name: "Buyers", value: 820 },
  { name: "Sellers", value: 340 },
  { name: "Admins", value: 4 },
]

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState("Last 6 months")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [txns, setTxns] = useState<any[]>([])
  useEffect(() => {
    try { const raw = localStorage.getItem('admin_txns'); setTxns(raw ? JSON.parse(raw) : []) } catch {}
  }, [])

  const filteredTxns = useMemo(() => {
    if (!txns.length) return [] as any[]
    const sd = startDate ? new Date(startDate) : null
    const ed = endDate ? new Date(endDate) : null
    return txns.filter((t: any) => {
      const d = new Date(t.date)
      if (sd && d < sd) return false
      if (ed && d > ed) return false
      return true
    })
  }, [txns, startDate, endDate])

  const revenue = useMemo(() => {
    const src = filteredTxns.length ? filteredTxns : txns
    if (!src.length) return MOCK_SERIES[0].data
    const map: Record<string, number> = {}
    src.forEach((t: any) => {
      if (t.status !== 'Completed') return
      const m = new Date(t.date).toLocaleString('en', { month: 'short' })
      const val = Number(String(t.amount).replace(/[^0-9.-]+/g, '')) || 0
      map[m] = (map[m] || 0) + val
    })
    return Object.keys(map).map(k => ({ date: k, value: map[k] }))
  }, [txns, filteredTxns])

  const purchases = useMemo(() => {
    const src = filteredTxns.length ? filteredTxns : txns
    if (!src.length) return MOCK_SERIES[1].data
    const map: Record<string, number> = {}
    src.forEach((t: any) => {
      const m = new Date(t.date).toLocaleString('en', { month: 'short' })
      map[m] = (map[m] || 0) + 1
    })
    return Object.keys(map).map(k => ({ date: k, value: map[k] }))
  }, [txns, filteredTxns])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Platform-wide metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={range} onChange={(e) => setRange(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>Year to date</option>
            <option>Custom</option>
          </select>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="px-3 py-2 border rounded-md bg-background" />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="px-3 py-2 border rounded-md bg-background" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Revenue Trend">
          <LineChart data={revenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} />
          </LineChart>
        </ChartContainer>
        <ChartContainer title="Purchases Trend">
          <BarChart data={purchases}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" />
          </BarChart>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Users Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie dataKey="value" data={MOCK_PIE} outerRadius={90} label>
                    {MOCK_PIE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transactions by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={["Completed","Pending","Failed","Disputed","Refunded"].map(s => ({ status: s, count: txns.filter((t: any) => t.status === s).length }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>KPIs</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Conversion Rate</div>
              <div className="text-2xl font-semibold">3.8%</div>
            </div>
            <div>
              <div className="text-muted-foreground">Avg. Order Value</div>
              <div className="text-2xl font-semibold">$175</div>
            </div>
            <div>
              <div className="text-muted-foreground">Active Sellers</div>
              <div className="text-2xl font-semibold">312</div>
            </div>
            <div>
              <div className="text-muted-foreground">Active Buyers</div>
              <div className="text-2xl font-semibold">978</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

