"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Search, Filter } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Txn = { id: string; date: string; buyer: string; seller: string; amount: string; status: "Completed" | "Pending" | "Failed" | "Disputed" | "Refunded" }

const MOCK_TXNS: Txn[] = [
  { id: "TX-1", date: "2024-01-15", buyer: "Netflix", seller: "Rahul Sharma", amount: "$1,200", status: "Completed" },
  { id: "TX-2", date: "2024-01-12", buyer: "Amazon", seller: "Priya Patel", amount: "$800", status: "Pending" },
  { id: "TX-3", date: "2024-01-10", buyer: "Hulu", seller: "Amit Kumar", amount: "$600", status: "Failed" },
]

export default function AdminTransactionsPage() {
  const [term, setTerm] = useState("")
  const [status, setStatus] = useState("All")
  const [txns, setTxns] = useState<Txn[]>(() => {
    if (typeof window === 'undefined') return MOCK_TXNS
    try { const raw = localStorage.getItem('admin_txns'); return raw ? JSON.parse(raw) : MOCK_TXNS } catch { return MOCK_TXNS }
  })

  useEffect(() => {
    try { localStorage.setItem('admin_txns', JSON.stringify(txns)) } catch {}
  }, [txns])

  const [canManage, setCanManage] = useState(true)
  useEffect(() => {
    try {
      const rawRole = localStorage.getItem('current_admin_role') || 'admin'
      const raw = localStorage.getItem('admin_roles')
      const roles = raw ? JSON.parse(raw) : []
      const r = roles.find((x: any) => x.name === rawRole)
      const perms: string[] = r?.permissions || ['all']
      setCanManage(perms.includes('all') || perms.includes('transactions:manage'))
    } catch { setCanManage(true) }
  }, [])

  const filtered = useMemo(() => {
    return txns.filter(t => {
      const tt = term.toLowerCase()
      const matchTerm = t.id.toLowerCase().includes(tt) || t.buyer.toLowerCase().includes(tt) || t.seller.toLowerCase().includes(tt)
      const matchStatus = status === "All" || t.status === status
      return matchTerm && matchStatus
    })
  }, [term, status, txns])

  const exportCsv = () => {
    const header = "ID,Date,Buyer,Seller,Amount,Status\n"
    const rows = filtered.map(t => `${t.id},${t.date},${t.buyer},${t.seller},${t.amount},${t.status}`).join("\n")
    const csv = header + rows
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const setStatusFor = (id: string, s: Txn['status']) => {
    setTxns(prev => prev.map(t => t.id === id ? { ...t, status: s } : t))
    appendAudit({ action: 'txn.status.set', target: id, meta: { status: s } })
  }

  function appendAudit(entry: { action: string; target?: string; meta?: any }) {
    try {
      const raw = localStorage.getItem('admin_audit')
      const arr = raw ? JSON.parse(raw) : []
      arr.push({ id: String(Date.now()), ts: Date.now(), actor: 'admin', ...entry })
      localStorage.setItem('admin_audit', JSON.stringify(arr))
    } catch {}
  }

  const [openDispute, setOpenDispute] = useState<Txn | null>(null)
  const [resolutionNote, setResolutionNote] = useState("")
  const resolveDispute = (id: string, status: Txn['status']) => {
    setTxns(prev => prev.map(t => t.id === id ? { ...t, status } : t))
    appendAudit({ action: 'txn.dispute.resolve', target: id, meta: { status, note: resolutionNote } })
    setOpenDispute(null)
    setResolutionNote("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Review purchases and payouts</p>
        </div>
        <Button variant="outline" onClick={exportCsv}><Download className="h-4 w-4 mr-2" /> Export</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by id, buyer or seller" value={term} onChange={(e) => setTerm(e.target.value)} className="pl-10" />
            </div>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
              <option>All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Disputed">Disputed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map(t => (
              <div key={t.id} className="grid grid-cols-2 md:grid-cols-7 items-center gap-2 p-3 border rounded-md text-sm">
                <div className="font-medium">{t.id}</div>
                <div>{t.date}</div>
                <div className="hidden md:block">{t.buyer}</div>
                <div className="hidden md:block">{t.seller}</div>
                <div className="font-semibold text-green-600">{t.amount}</div>
                <div>{t.status}</div>
                <div className="flex gap-1 justify-end">
                  {t.status !== 'Completed' && (
                    <Button size="sm" variant="outline" onClick={() => setStatusFor(t.id, 'Completed')} disabled={!canManage}>Mark Completed</Button>
                  )}
                  {t.status !== 'Failed' && (
                    <Button size="sm" variant="destructive" onClick={() => setStatusFor(t.id, 'Failed')} disabled={!canManage}>Fail</Button>
                  )}
                  {t.status !== 'Disputed' && (
                    <Button size="sm" variant="outline" onClick={() => setOpenDispute(t)} disabled={!canManage}>Dispute</Button>
                  )}
                  {t.status !== 'Refunded' && (
                    <Button size="sm" variant="outline" onClick={() => setStatusFor(t.id, 'Refunded')} disabled={!canManage}>Refund</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!openDispute} onOpenChange={(o) => !o && setOpenDispute(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Dispute</DialogTitle>
          </DialogHeader>
          {openDispute && (
            <div className="space-y-3 text-sm">
              <div className="text-muted-foreground">Transaction: {openDispute.id}</div>
              <textarea className="w-full border rounded p-2 bg-background" rows={4} placeholder="Resolution note..." value={resolutionNote} onChange={(e) => setResolutionNote(e.target.value)} />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => resolveDispute(openDispute.id, 'Completed')}>Mark Completed</Button>
                <Button variant="destructive" onClick={() => resolveDispute(openDispute.id, 'Refunded')}>Refund</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

