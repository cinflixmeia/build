"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, CheckCircle, XCircle, Eye, FileText, Download } from "lucide-react"

type OfferRow = {
  id: string
  title: string
  buyer: string
  seller: string
  amount: string
  status: "Pending" | "Accepted" | "Rejected" | "Countered"
}

const MOCK_OFFERS: OfferRow[] = [
  { id: "O-1", title: "Apollo 11", buyer: "Netflix", seller: "Rahul Sharma", amount: "$1200", status: "Pending" },
  { id: "O-2", title: "Imitation Game", buyer: "Amazon", seller: "Priya Patel", amount: "$800", status: "Accepted" },
  { id: "O-3", title: "Power Love", buyer: "Hulu", seller: "Amit Kumar", amount: "$750", status: "Countered" },
]

export default function AdminOffersModerationPage() {
  const [term, setTerm] = useState("")
  const [status, setStatus] = useState("All")
  const [offers, setOffers] = useState<OfferRow[]>(() => {
    if (typeof window === 'undefined') return MOCK_OFFERS
    try { const raw = localStorage.getItem('admin_offers'); return raw ? JSON.parse(raw) : MOCK_OFFERS } catch { return MOCK_OFFERS }
  })
  useEffect(() => { try { localStorage.setItem('admin_offers', JSON.stringify(offers)) } catch {} }, [offers])
  const [selected, setSelected] = useState<OfferRow | null>(null)

  const [canModerate, setCanModerate] = useState(true)
  useEffect(() => {
    try {
      const rawRole = localStorage.getItem('current_admin_role') || 'admin'
      const raw = localStorage.getItem('admin_roles')
      const roles = raw ? JSON.parse(raw) : []
      const r = roles.find((x: any) => x.name === rawRole)
      const perms: string[] = r?.permissions || ['all']
      setCanModerate(perms.includes('all') || perms.includes('offers:moderate'))
    } catch { setCanModerate(true) }
  }, [])

  const filtered = useMemo(() => {
    return offers.filter(o => {
      const t = term.toLowerCase()
      const matchTerm = o.title.toLowerCase().includes(t) || o.buyer.toLowerCase().includes(t) || o.seller.toLowerCase().includes(t)
      const matchStatus = status === "All" || o.status === status
      return matchTerm && matchStatus
    })
  }, [term, status, offers])

  const setStatusFor = (id: string, s: OfferRow["status"]) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: s } : o))
    appendAudit({ action: 'offer.status.set', target: id, meta: { status: s } })
  }

  const exportCsv = () => {
    const header = "ID,Title,Buyer,Seller,Amount,Status\n"
    const rows = filtered.map(o => `${o.id},${o.title},${o.buyer},${o.seller},${o.amount},${o.status}`).join("\n")
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `offers_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  function appendAudit(entry: { action: string; target?: string; meta?: any }) {
    try {
      const raw = localStorage.getItem('admin_audit')
      const arr = raw ? JSON.parse(raw) : []
      arr.push({ id: String(Date.now()), ts: Date.now(), actor: 'admin', ...entry })
      localStorage.setItem('admin_audit', JSON.stringify(arr))
    } catch {}
  }

  const importCsv = (file: File) => {
    const r = new FileReader()
    r.onload = () => {
      try {
        const text = String(r.result || '')
        const lines = text.split(/\r?\n/).filter(Boolean)
        const parsed: OfferRow[] = lines.slice(1).map((l, i) => {
          const [id, title, buyer, seller, amount, status] = l.split(',')
          return { id: id && id.trim() ? id : `${Date.now()}-${i}`, title, buyer, seller, amount, status: (status as any) || 'Pending' }
        })
        setOffers(prev => [...parsed, ...prev])
        appendAudit({ action: 'offers.import.csv', meta: { count: parsed.length } })
      } catch {}
    }
    r.readAsText(file)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Offers Moderation</h1>
          <p className="text-muted-foreground">Review and enforce policy on offers</p>
        </div>
        <Button variant="outline" onClick={exportCsv}><Download className="h-4 w-4 mr-2" /> Export</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</CardTitle>
            <div className="flex items-center gap-2">
              <input id="offers-import" type="file" accept=".csv" className="hidden" onChange={(e) => { const f=e.target.files?.[0]; if (f) importCsv(f) }} />
              <Button variant="outline" onClick={() => document.getElementById('offers-import')?.click()}>Import CSV</Button>
              <Button variant="outline" onClick={exportCsv}><Download className="h-4 w-4 mr-2" /> Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." value={term} onChange={(e) => setTerm(e.target.value)} className="pl-10" />
            </div>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
              <option>All</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Countered">Countered</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Offers ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map(o => (
              <div key={o.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <div className="font-medium">{o.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <Badge variant="secondary">Buyer: {o.buyer}</Badge>
                    <Badge variant="secondary">Seller: {o.seller}</Badge>
                    <Badge variant="outline">{o.amount}</Badge>
                    <Badge variant={o.status === 'Pending' ? 'secondary' : o.status === 'Rejected' ? 'destructive' : 'default'}>{o.status}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={`/admin/dashboard/offers/${o.id}`}><Button size="sm" variant="outline"><Eye className="h-4 w-4 mr-2" /> View</Button></a>
                  {o.status !== 'Accepted' && (
                    <Button size="sm" variant="outline" onClick={() => setStatusFor(o.id, 'Accepted')} disabled={!canModerate}><CheckCircle className="h-4 w-4 mr-2" /> Force Accept</Button>
                  )}
                  {o.status !== 'Rejected' && (
                    <Button size="sm" variant="destructive" onClick={() => setStatusFor(o.id, 'Rejected')} disabled={!canModerate}><XCircle className="h-4 w-4 mr-2" /> Force Reject</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Offer Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-2 text-sm">
              <div><span className="text-muted-foreground">ID:</span> {selected.id}</div>
              <div><span className="text-muted-foreground">Title:</span> {selected.title}</div>
              <div><span className="text-muted-foreground">Buyer:</span> {selected.buyer}</div>
              <div><span className="text-muted-foreground">Seller:</span> {selected.seller}</div>
              <div><span className="text-muted-foreground">Amount:</span> {selected.amount}</div>
              <div><span className="text-muted-foreground">Status:</span> {selected.status}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

