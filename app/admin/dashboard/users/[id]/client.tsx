"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminUserDetailClient({ id }: { id: string }) {
  const router = useRouter()
  const [user, setUser] = useState<any | null>(null)
  const [canManage, setCanManage] = useState(true)

  useEffect(() => {
    try {
      const rawRole = localStorage.getItem('current_admin_role') || 'admin'
      const raw = localStorage.getItem('admin_roles')
      const roles = raw ? JSON.parse(raw) : []
      const r = roles.find((x: any) => x.name === rawRole)
      const perms: string[] = r?.permissions || ['all']
      setCanManage(perms.includes('all') || perms.includes('users:manage'))
    } catch { setCanManage(true) }
  }, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('admin_users')
      const list = raw ? JSON.parse(raw) : []
      setUser(list.find((u: any) => u.id === id) || null)
    } catch { setUser(null) }
  }, [id])

  const invalidateSessions = () => {
    try {
      const ar = localStorage.getItem('admin_audit')
      const arr = ar ? JSON.parse(ar) : []
      arr.push({ id: String(Date.now()), ts: Date.now(), actor: 'admin', action: 'user.sessions.invalidate', target: user?.id })
      localStorage.setItem('admin_audit', JSON.stringify(arr))
    } catch {}
    alert('Sessions invalidated (mock)')
  }

  if (!user) return <div className="space-y-6"><h1 className="text-2xl font-bold">User</h1><p className="text-muted-foreground">Not found</p></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Detail</h1>
          <p className="text-muted-foreground">ID: {user.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/admin/dashboard/users')}>Back</Button>
          <Button onClick={invalidateSessions} disabled={!canManage}>Invalidate Sessions</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div><span className="text-muted-foreground">Name:</span> {user.name}</div>
          <div><span className="text-muted-foreground">Email:</span> {user.email}</div>
          <div><span className="text-muted-foreground">Role:</span> {user.role}</div>
          <div><span className="text-muted-foreground">Status:</span> {user.status}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessions & Devices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="p-3 border rounded">macOS • Chrome • Last active: today (mock)</div>
          <div className="p-3 border rounded">iOS • App • Last active: yesterday (mock)</div>
        </CardContent>
      </Card>
    </div>
  )
}

