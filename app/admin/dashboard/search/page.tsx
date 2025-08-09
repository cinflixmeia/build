"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function AdminSearchPage() {
  const [q, setQ] = useState("")
  const users = (() => { try { return JSON.parse(localStorage.getItem('admin_users') || '[]') } catch { return [] } })()
  const content = (() => { try { return JSON.parse(localStorage.getItem('admin_content') || '[]') } catch { return [] } })()
  const offers = (() => { try { return JSON.parse(localStorage.getItem('admin_offers') || '[]') } catch { return [] } })()

  const res = useMemo(() => {
    const t = q.toLowerCase()
    const u = users.filter((x: any) => `${x.name} ${x.email}`.toLowerCase().includes(t)).slice(0, 5)
    const c = content.filter((x: any) => `${x.title} ${x.genre}`.toLowerCase().includes(t)).slice(0, 5)
    const o = offers.filter((x: any) => `${x.title} ${x.buyer} ${x.seller}`.toLowerCase().includes(t)).slice(0, 5)
    return { u, c, o }
  }, [q])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Global Search</h1>
        <p className="text-muted-foreground">Search across users, content, and offers</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Users</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {res.u.map((u: any) => (
              <a key={u.id} href={`/admin/dashboard/users/${u.id}`} className="block p-2 border rounded hover:bg-muted/30">
                {u.name} — {u.email}
              </a>
            ))}
            {res.u.length === 0 && <div className="text-muted-foreground">No matches</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Content</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {res.c.map((c: any) => (
              <a key={c.id} href={`/admin/dashboard/content/${c.id}`} className="block p-2 border rounded hover:bg-muted/30">
                {c.title} — {c.genre}
              </a>
            ))}
            {res.c.length === 0 && <div className="text-muted-foreground">No matches</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Offers</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {res.o.map((o: any) => (
              <div key={o.id} className="p-2 border rounded">
                {o.title} — {o.buyer} → {o.seller}
              </div>
            ))}
            {res.o.length === 0 && <div className="text-muted-foreground">No matches</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

