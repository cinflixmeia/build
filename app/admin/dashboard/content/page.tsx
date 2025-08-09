"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, Trash2, Ban, CheckCircle, Download } from "lucide-react"

type ContentRow = {
  id: string
  title: string
  seller: string
  status: "active" | "flagged" | "removed"
  genre: string
  year: string
  fileMeta?: { posterDataUrl?: string }
}

const MOCK_CONTENT: ContentRow[] = [
  { id: "c1", title: "INDIA'S BIGGEST FOODIE", seller: "Rahul Sharma Productions", status: "active", genre: "Reality TV", year: "2024" },
  { id: "c2", title: "VINA के वो सात दिन", seller: "Priya Patel Films", status: "active", genre: "Drama", year: "2024" },
  { id: "c3", title: "I-POP ICONS GETTING CLOSER TO BADSHAH", seller: "Amit Kumar Studios", status: "flagged", genre: "Music", year: "2024" },
]

export default function AdminContentPage() {
  const [term, setTerm] = useState("")
  const [status, setStatus] = useState("All")
  const [list, setList] = useState<ContentRow[]>(() => {
    if (typeof window === 'undefined') return MOCK_CONTENT
    try {
      const raw = localStorage.getItem('admin_content')
      if (raw) return JSON.parse(raw)
      // seed from sellerContents
      const rawSeller = localStorage.getItem('sellerContents')
      const seller: any[] = rawSeller ? JSON.parse(rawSeller) : []
      if (seller.length) {
        const seeded: ContentRow[] = seller.map((c: any) => ({
          id: c.id,
          title: c.formData?.title || 'Untitled',
          seller: 'Unknown Seller',
          status: 'active',
          genre: c.formData?.genre || 'Unknown',
          year: String(c.formData?.year || ''),
          fileMeta: { posterDataUrl: c.fileMeta?.posterDataUrl }
        }))
        try { localStorage.setItem('admin_content', JSON.stringify(seeded)) } catch {}
        return seeded
      }
      return MOCK_CONTENT
    } catch { return MOCK_CONTENT }
  })

  useEffect(() => {
    try { localStorage.setItem('admin_content', JSON.stringify(list)) } catch {}
  }, [list])

  const [selected, setSelected] = useState<string[]>([])
  const [canModerate, setCanModerate] = useState(true)
  useEffect(() => {
    try {
      const rawRole = localStorage.getItem('current_admin_role') || 'admin'
      const raw = localStorage.getItem('admin_roles')
      const roles = raw ? JSON.parse(raw) : []
      const r = roles.find((x: any) => x.name === rawRole)
      const perms: string[] = r?.permissions || ['all']
      setCanModerate(perms.includes('all') || perms.includes('content:moderate'))
    } catch { setCanModerate(true) }
  }, [])

  const filtered = useMemo(() => {
    return list.filter(c => {
      const t = term.toLowerCase()
      const matchTerm = c.title.toLowerCase().includes(t) || c.seller.toLowerCase().includes(t)
      const matchStatus = status === "All" || c.status === status
      return matchTerm && matchStatus
    })
  }, [term, status, list])

  const setStatusFor = (id: string, status: ContentRow["status"]) => {
    setList(prev => prev.map(c => c.id === id ? { ...c, status } : c))
    appendAudit({ action: 'content.status.set', target: id, meta: { status } })
  }

  const exportCsv = () => {
    const header = "ID,Title,Seller,Genre,Year,Status\n"
    const rows = filtered.map(c => `${c.id},${c.title},${c.seller},${c.genre},${c.year},${c.status}`).join("\n")
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `content_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const toggleSelectAll = () => {
    if (selected.length === filtered.length) setSelected([])
    else setSelected(filtered.map(c => c.id))
  }

  const bulkSetStatus = (s: ContentRow['status']) => {
    setList(prev => prev.map(c => selected.includes(c.id) ? { ...c, status: s } : c))
    appendAudit({ action: 'content.bulk.status.set', meta: { status: s, ids: selected } })
    setSelected([])
  }

  function appendAudit(entry: { action: string; target?: string; meta?: any }) {
    try {
      const raw = localStorage.getItem('admin_audit')
      const arr = raw ? JSON.parse(raw) : []
      arr.push({ id: String(Date.now()), ts: Date.now(), actor: 'admin', ...entry })
      localStorage.setItem('admin_audit', JSON.stringify(arr))
    } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Content</h1>
          <p className="text-muted-foreground">Moderate and manage all uploaded content</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={exportCsv}><Download className="h-4 w-4 mr-2" /> Export</Button>
              <input id="content-import" type="file" accept=".csv" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = () => {
                  try {
                    const text = String(r.result||'');
                    const lines = text.split(/\r?\n/).filter(Boolean);
                    const parsed = lines.slice(1).map(l => { const [id,title,seller,genre,year,status] = l.split(','); return { id: id||String(Date.now()), title, seller, genre, year, status: (status||'active') as any } })
                    setList(prev => [...parsed, ...prev])
                    appendAudit({ action: 'content.import.csv', meta: { count: parsed.length } })
                  } catch {}
                }; r.readAsText(f)
              }} />
              <Button variant="outline" onClick={() => document.getElementById('content-import')?.click()}>Import CSV</Button>
              <Button variant="outline" onClick={toggleSelectAll} disabled={!canModerate}>{selected.length === filtered.length && filtered.length > 0 ? 'Unselect All' : 'Select All'}</Button>
              <Button variant="outline" onClick={() => bulkSetStatus('flagged')} disabled={!canModerate || selected.length===0}>Flag</Button>
              <Button variant="outline" onClick={() => bulkSetStatus('active')} disabled={!canModerate || selected.length===0}>Unflag</Button>
              <Button variant="destructive" onClick={() => bulkSetStatus('removed')} disabled={!canModerate || selected.length===0}>Remove</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search content..." value={term} onChange={(e) => setTerm(e.target.value)} className="pl-10" />
            </div>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
              <option>All</option>
              <option value="active">Active</option>
              <option value="flagged">Flagged</option>
              <option value="removed">Removed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Content ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((c, i) => (
              <div key={`${c.id}-${i}`} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  {c.fileMeta?.posterDataUrl && (
                    <img src={c.fileMeta.posterDataUrl} alt="Poster" className="h-10 w-7 rounded object-cover border" />
                  )}
                  <div className="font-medium">{c.title} <span className="text-muted-foreground">— {c.seller}</span></div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <Badge variant="secondary">{c.genre}</Badge>
                    <Badge variant="outline">{c.year}</Badge>
                    <Badge variant={c.status === 'active' ? 'default' : c.status === 'flagged' ? 'destructive' : 'secondary'}>{c.status}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/dashboard/content/${c.id}`}>
                    <Button size="sm" variant="outline"><Eye className="h-4 w-4 mr-2" /> View</Button>
                  </Link>
                  <Button size="sm" variant="outline" onClick={() => setStatusFor(c.id, c.status === 'flagged' ? 'active' : 'flagged')}>
                    {c.status === 'flagged' ? (<><CheckCircle className="h-4 w-4 mr-2"/> Unflag</>) : (<><Ban className="h-4 w-4 mr-2"/> Flag</>)}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => setStatusFor(c.id, 'removed')}>
                    <Trash2 className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

