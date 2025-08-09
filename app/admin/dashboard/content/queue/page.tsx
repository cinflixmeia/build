"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"

type Item = { id: string; title: string; genre: string; year: string; seller: string }

export default function AdminContentQueuePage() {
  const [queue, setQueue] = useState<Item[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const raw = localStorage.getItem('admin_content_queue')
      if (raw) return JSON.parse(raw)
      // Seed from sellerContents
      const sraw = localStorage.getItem('sellerContents')
      const seller = sraw ? JSON.parse(sraw) : []
      const seeded: Item[] = seller.map((c: any) => ({ id: c.id, title: c.formData?.title || 'Untitled', genre: c.formData?.genre || 'Unknown', year: String(c.formData?.year || ''), seller: 'Unknown Seller' }))
      localStorage.setItem('admin_content_queue', JSON.stringify(seeded))
      return seeded
    } catch { return [] }
  })

  useEffect(() => { try { localStorage.setItem('admin_content_queue', JSON.stringify(queue)) } catch {} }, [queue])

  const approve = (id: string) => {
    // Move to admin_content as active
    try {
      const raw = localStorage.getItem('admin_content')
      const list = raw ? JSON.parse(raw) : []
      const item = queue.find(q => q.id === id)
      if (item) {
        const existsIdx = list.findIndex((x: any) => x.id === id)
        const payload = { id: item.id, title: item.title, seller: item.seller, status: 'active', genre: item.genre, year: item.year }
        if (existsIdx >= 0) list[existsIdx] = payload; else list.unshift(payload)
        localStorage.setItem('admin_content', JSON.stringify(list))
      }
    } catch {}
    setQueue(prev => prev.filter(q => q.id !== id))
    appendAudit({ action: 'content.approve', target: id })
  }

  const reject = (id: string) => {
    setQueue(prev => prev.filter(q => q.id !== id))
    appendAudit({ action: 'content.reject', target: id })
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
          <h1 className="text-2xl font-bold">Moderation Queue</h1>
          <p className="text-muted-foreground">Approve or reject pending content</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="h-4 w-4" /> Pending Items ({queue.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {queue.map(q => (
              <div key={q.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <div className="font-medium">{q.title} <span className="text-muted-foreground">— {q.seller}</span></div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <Badge variant="secondary">{q.genre}</Badge>
                    <Badge variant="outline">{q.year}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => approve(q.id)}>Approve</Button>
                  <Button size="sm" variant="destructive" onClick={() => reject(q.id)}>Reject</Button>
                </div>
              </div>
            ))}
            {queue.length === 0 && (
              <div className="text-sm text-muted-foreground">No pending items</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

