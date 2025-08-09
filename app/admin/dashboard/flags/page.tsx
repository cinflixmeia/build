"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

type Flag = { key: string; label: string; enabled: boolean; description?: string }

const INITIAL: Flag[] = [
  { key: "enable_offers", label: "Enable Offers", enabled: true, description: "Turn offers/negotiations on/off globally" },
  { key: "enable_messages", label: "Enable Messages", enabled: true, description: "Turn messaging system on/off" },
  { key: "enable_uploads", label: "Enable Uploads", enabled: true, description: "Allow sellers to upload content" },
  { key: "maintenance_mode", label: "Maintenance Mode", enabled: false, description: "Show maintenance mode banner" },
]

export default function AdminFlagsPage() {
  const [flags, setFlags] = useState<Flag[]>(() => {
    if (typeof window === 'undefined') return INITIAL
    try {
      const raw = localStorage.getItem('admin_flags')
      return raw ? JSON.parse(raw) : INITIAL
    } catch { return INITIAL }
  })

  const toggle = (key: string) => {
    setFlags(prev => {
      const next = prev.map(f => f.key === key ? { ...f, enabled: !f.enabled } : f)
      try { localStorage.setItem('admin_flags', JSON.stringify(next)) } catch {}
      appendAudit({ action: 'flag.toggle', target: key, meta: { enabled: next.find(f => f.key === key)?.enabled } })
      return next
    })
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
      <div>
        <h1 className="text-2xl font-bold">Feature Flags</h1>
        <p className="text-muted-foreground">Toggle platform features</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" /> Flags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {flags.map(f => (
              <div key={f.key} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <div className="font-medium">{f.label}</div>
                  {f.description && <div className="text-xs text-muted-foreground">{f.description}</div>}
                </div>
                <Button variant={f.enabled ? 'default' : 'outline'} onClick={() => toggle(f.key)}>{f.enabled ? 'Enabled' : 'Disabled'}</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

