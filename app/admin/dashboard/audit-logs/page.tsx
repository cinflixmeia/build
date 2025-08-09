"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Filter, Search } from "lucide-react"

type Audit = { id: string; ts: number; actor: string; action: string; target?: string; meta?: Record<string, any> }

export default function AuditLogsPage() {
  const [term, setTerm] = useState("")
  const [logs, setLogs] = useState<Audit[]>(() => {
    if (typeof window === 'undefined') return []
    try { const raw = localStorage.getItem('admin_audit'); return raw ? JSON.parse(raw) : [] } catch { return [] }
  })

  useEffect(() => {
    const onStorage = () => {
      try { const raw = localStorage.getItem('admin_audit'); setLogs(raw ? JSON.parse(raw) : []) } catch {}
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const filtered = useMemo(() => {
    const t = term.toLowerCase()
    return logs.filter(l => `${l.actor} ${l.action} ${l.target ?? ''}`.toLowerCase().includes(t))
  }, [logs, term])

  const exportCsv = () => {
    const header = "ID,Timestamp,Actor,Action,Target\n"
    const rows = filtered.map(l => `${l.id},${new Date(l.ts).toISOString()},${l.actor},${l.action},${l.target ?? ''}`).join("\n")
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const importCsv = (file: File) => {
    const r = new FileReader()
    r.onload = () => {
      try {
        const text = String(r.result || '')
        const lines = text.split(/\r?\n/).filter(Boolean)
        const parsed: Audit[] = lines.slice(1).map(l => {
          const [id, ts, actor, action, target] = l.split(',')
          return { id: id || String(Date.now()), ts: Date.parse(ts) || Date.now(), actor, action, target }
        })
        setLogs(prev => [...prev, ...parsed])
        try { localStorage.setItem('admin_audit', JSON.stringify([...logs, ...parsed])) } catch {}
      } catch {}
    }
    r.readAsText(file)
  }

  const clearLogs = () => {
    setLogs([])
    try { localStorage.setItem('admin_audit', JSON.stringify([])) } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">Track all administrative actions</p>
        </div>
        <div className="flex items-center gap-2">
          <input id="audit-import" type="file" accept=".csv" className="hidden" onChange={(e) => { const f=e.target.files?.[0]; if (f) importCsv(f) }} />
          <Button variant="outline" onClick={() => document.getElementById('audit-import')?.click()}>Import CSV</Button>
          <Button variant="outline" onClick={exportCsv}><Download className="h-4 w-4 mr-2" /> Export</Button>
          <Button variant="destructive" onClick={clearLogs}>Clear</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search logs..." value={term} onChange={(e) => setTerm(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Logs ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
          {filtered.slice().reverse().map((l, i) => (
              <div key={`${l.id}-${i}`} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 border rounded-md">
                <div className="text-muted-foreground">{new Date(l.ts).toLocaleString()}</div>
                <div className="font-medium">{l.actor}</div>
                <div>{l.action}</div>
                <div className="truncate">{l.target || '-'}</div>
                <div className="truncate text-muted-foreground">{l.meta ? JSON.stringify(l.meta) : ''}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

