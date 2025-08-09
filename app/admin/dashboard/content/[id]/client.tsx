"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AdminContentDetailClient({ id }: { id: string }) {
  const router = useRouter()
  const [item, setItem] = useState<any | null>(null)
  const [canEdit, setCanEdit] = useState(true)

  useEffect(() => {
    try {
      const rawRole = localStorage.getItem('current_admin_role') || 'admin'
      const raw = localStorage.getItem('admin_roles')
      const roles = raw ? JSON.parse(raw) : []
      const r = roles.find((x: any) => x.name === rawRole)
      const perms: string[] = r?.permissions || ['all']
      setCanEdit(perms.includes('all') || perms.includes('content:moderate'))
    } catch { setCanEdit(true) }
  }, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('admin_content')
      const list = raw ? JSON.parse(raw) : []
      setItem(list.find((c: any) => c.id === id) || null)
    } catch { setItem(null) }
  }, [id])

  const save = () => {
    if (!item) return
    try {
      const raw = localStorage.getItem('admin_content')
      const list = raw ? JSON.parse(raw) : []
      const idx = list.findIndex((c: any) => c.id === item.id)
      if (idx >= 0) list[idx] = item
      localStorage.setItem('admin_content', JSON.stringify(list))
      const ar = localStorage.getItem('admin_audit')
      const arr = ar ? JSON.parse(ar) : []
      arr.push({ id: String(Date.now()), ts: Date.now(), actor: 'admin', action: 'content.update', target: item.id, meta: { title: item.title } })
      localStorage.setItem('admin_audit', JSON.stringify(arr))
    } catch {}
    router.push('/admin/dashboard/content')
  }

  if (!item) return <div className="space-y-6"><h1 className="text-2xl font-bold">Content</h1><p className="text-muted-foreground">Not found</p></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit Content</h1>
          <p className="text-muted-foreground">ID: {item.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/admin/dashboard/content')}>Back</Button>
          <Button onClick={save} disabled={!canEdit}>Save</Button>
        </div>
      </div>

      {item.fileMeta?.posterDataUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={item.fileMeta.posterDataUrl} alt="Poster" className="max-h-64 rounded border" />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} disabled={!canEdit} />
          </div>
          <div>
            <label className="text-sm font-medium">Seller</label>
            <Input value={item.seller} onChange={(e) => setItem({ ...item, seller: e.target.value })} disabled={!canEdit} />
          </div>
          <div>
            <label className="text-sm font-medium">Genre</label>
            <Input value={item.genre} onChange={(e) => setItem({ ...item, genre: e.target.value })} disabled={!canEdit} />
          </div>
          <div>
            <label className="text-sm font-medium">Year</label>
            <Input value={item.year} onChange={(e) => setItem({ ...item, year: e.target.value })} disabled={!canEdit} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea value={(item.description||'')} onChange={(e) => setItem({ ...item, description: e.target.value })} rows={4} disabled={!canEdit} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

