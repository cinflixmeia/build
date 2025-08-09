"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Offer = { id: string; title: string; buyer: string; seller: string; amount: string; status: "Pending"|"Accepted"|"Rejected"|"Countered"; notes?: string[] }

export default function AdminOfferDetailClient({ id }: { id: string }) {
  const router = useRouter()
  const [offer, setOffer] = useState<Offer | null>(null)
  const [canModerate, setCanModerate] = useState(true)
  const [newNote, setNewNote] = useState("")

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

  useEffect(() => {
    try {
      const raw = localStorage.getItem('admin_offers')
      const list: Offer[] = raw ? JSON.parse(raw) : []
      setOffer(list.find((o) => o.id === id) || null)
    } catch { setOffer(null) }
  }, [id])

  const saveOffer = (next: Offer) => {
    setOffer(next)
    try {
      const raw = localStorage.getItem('admin_offers')
      const list: Offer[] = raw ? JSON.parse(raw) : []
      const idx = list.findIndex((o) => o.id === next.id)
      if (idx >= 0) list[idx] = next
      localStorage.setItem('admin_offers', JSON.stringify(list))
    } catch {}
  }

  const appendAudit = (entry: { action: string; target?: string; meta?: any }) => {
    try {
      const raw = localStorage.getItem('admin_audit')
      const arr = raw ? JSON.parse(raw) : []
      arr.push({ id: String(Date.now()), ts: Date.now(), actor: 'admin', ...entry })
      localStorage.setItem('admin_audit', JSON.stringify(arr))
    } catch {}
  }

  const addNote = () => {
    if (!offer || !newNote.trim()) return
    const next = { ...offer, notes: [...(offer.notes || []), newNote.trim()] }
    saveOffer(next)
    appendAudit({ action: 'offer.note.add', target: offer.id })
    setNewNote("")
  }

  const setStatus = (s: Offer['status']) => {
    if (!offer) return
    const next = { ...offer, status: s }
    saveOffer(next)
    appendAudit({ action: 'offer.status.set', target: offer.id, meta: { status: s } })
  }

  if (!offer) return <div className="space-y-6"><h1 className="text-2xl font-bold">Offer</h1><p className="text-muted-foreground">Not found</p></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Offer Detail</h1>
          <p className="text-muted-foreground">ID: {offer.id}</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/admin/dashboard/offers')}>Back</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div><span className="text-muted-foreground">Title:</span> {offer.title}</div>
          <div><span className="text-muted-foreground">Buyer:</span> {offer.buyer}</div>
          <div><span className="text-muted-foreground">Seller:</span> {offer.seller}</div>
          <div><span className="text-muted-foreground">Amount:</span> {offer.amount}</div>
          <div><span className="text-muted-foreground">Status:</span> {offer.status}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moderation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {offer.status !== 'Accepted' && (
            <Button variant="outline" onClick={() => setStatus('Accepted')} disabled={!canModerate}>Force Accept</Button>
          )}
          {offer.status !== 'Rejected' && (
            <Button variant="destructive" onClick={() => setStatus('Rejected')} disabled={!canModerate}>Force Reject</Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input placeholder="Add a note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} />
            <Button onClick={addNote} disabled={!canModerate || !newNote.trim()}>Add</Button>
          </div>
          <div className="space-y-2 text-sm">
            {(offer.notes || []).map((n, i) => (
              <div key={i} className="p-2 border rounded">{n}</div>
            ))}
            {(!offer.notes || offer.notes.length === 0) && (<div className="text-muted-foreground">No notes</div>)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

