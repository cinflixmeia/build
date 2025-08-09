"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Shield, Ban, CheckCircle, XCircle, User, Download } from "lucide-react"

type UserRow = {
  id: string
  name: string
  email: string
  role: "buyer" | "seller" | "admin"
  status: "active" | "suspended"
}

const MOCK_USERS: UserRow[] = [
  { id: "1", name: "Rahul Sharma", email: "rahul@buyer.com", role: "buyer", status: "active" },
  { id: "2", name: "Priya Patel", email: "priya@seller.com", role: "seller", status: "active" },
  { id: "3", name: "Amit Kumar", email: "amit@seller.com", role: "seller", status: "suspended" },
  { id: "4", name: "Admin", email: "admin@cinflix.com", role: "admin", status: "active" },
]

export default function AdminUsersPage() {
  const [term, setTerm] = useState("")
  const [role, setRole] = useState("All")
  const [status, setStatus] = useState("All")
  const [users, setUsers] = useState<UserRow[]>(() => {
    if (typeof window === 'undefined') return MOCK_USERS
    try {
      const raw = localStorage.getItem('admin_users')
      return raw ? JSON.parse(raw) : MOCK_USERS
    } catch { return MOCK_USERS }
  })

  useEffect(() => {
    try { localStorage.setItem('admin_users', JSON.stringify(users)) } catch {}
  }, [users])

  const [selected, setSelected] = useState<string[]>([])
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

  const filtered = useMemo(() => {
    return users.filter(u => {
      const t = term.toLowerCase()
      const matchTerm = u.name.toLowerCase().includes(t) || u.email.toLowerCase().includes(t)
      const matchRole = role === "All" || u.role === role
      const matchStatus = status === "All" || u.status === status
      return matchTerm && matchRole && matchStatus
    })
  }, [term, role, status, users])

  const toggleSuspend = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u))
    appendAudit({ action: 'user.status.toggle', target: id })
  }

  const toggleRole = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: u.role === 'seller' ? 'buyer' : u.role === 'buyer' ? 'seller' : u.role } : u))
    appendAudit({ action: 'user.role.toggle', target: id })
  }

  const impersonate = (u: UserRow) => {
    try { localStorage.setItem('impersonate', JSON.stringify({ id: u.id, name: u.name, role: u.role })) } catch {}
    alert(`Now impersonating ${u.name} (${u.role}) — mock mode`) // simple feedback
    appendAudit({ action: 'user.impersonate', target: u.id })
  }

  const exportCsv = () => {
    const header = "ID,Name,Email,Role,Status\n"
    const rows = filtered.map(u => `${u.id},${u.name},${u.email},${u.role},${u.status}`).join("\n")
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `users_${new Date().toISOString().split('T')[0]}.csv`
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
        const parsed: UserRow[] = lines.slice(1).map((l, i) => {
          const [id, name, email, role, status] = l.split(',')
          return { id: id && id.trim() ? id : `${Date.now()}-${i}`, name, email, role: (role as any) || 'buyer', status: (status as any) || 'active' }
        })
        setUsers(prev => [...parsed, ...prev])
        appendAudit({ action: 'users.import.csv', meta: { count: parsed.length } })
      } catch {}
    }
    r.readAsText(file)
  }

  const toggleSelectAll = () => {
    if (selected.length === filtered.length) setSelected([])
    else setSelected(filtered.map(u => u.id))
  }

  const bulkSuspend = () => {
    setUsers(prev => prev.map(u => selected.includes(u.id) ? { ...u, status: 'suspended' } : u))
    appendAudit({ action: 'users.bulk.suspend', meta: { ids: selected } })
    setSelected([])
  }

  const bulkActivate = () => {
    setUsers(prev => prev.map(u => selected.includes(u.id) ? { ...u, status: 'active' } : u))
    appendAudit({ action: 'users.bulk.activate', meta: { ids: selected } })
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
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage buyers, sellers and admins</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCsv}>Export CSV</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={exportCsv}><Download className="h-4 w-4 mr-2" /> Export</Button>
              <input id="users-import" type="file" accept=".csv" className="hidden" onChange={(e) => { const f=e.target.files?.[0]; if (f) importCsv(f) }} />
              <Button variant="outline" onClick={() => document.getElementById('users-import')?.click()}>Import CSV</Button>
              <Button variant="outline" onClick={toggleSelectAll} disabled={!canManage}>{selected.length === filtered.length && filtered.length>0 ? 'Unselect All' : 'Select All'}</Button>
              <Button variant="outline" onClick={bulkSuspend} disabled={!canManage || selected.length===0}>Suspend</Button>
              <Button onClick={bulkActivate} disabled={!canManage || selected.length===0}>Activate</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." value={term} onChange={(e) => setTerm(e.target.value)} className="pl-10" />
            </div>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
              <option>All</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
              <option>All</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <div className="font-medium"><a className="underline" href={`/admin/dashboard/users/${u.id}`}>{u.name}</a> <span className="text-muted-foreground">({u.email})</span></div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <Badge variant="secondary">{u.role}</Badge>
                    <Badge variant={u.status === 'active' ? 'default' : 'destructive'}>{u.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" aria-label="Select user" checked={selected.includes(u.id)} onChange={(e) => {
                    setSelected(prev => e.target.checked ? Array.from(new Set([...prev, u.id])) : prev.filter(x => x !== u.id))
                  }} />
                  <Button size="sm" variant="outline" onClick={() => toggleRole(u.id)}>
                    <Shield className="h-4 w-4 mr-2" /> Toggle Role
                  </Button>
                  <Button size="sm" variant={u.status === 'active' ? 'destructive' : 'default'} onClick={() => toggleSuspend(u.id)}>
                    {u.status === 'active' ? (
                      <><Ban className="h-4 w-4 mr-2" /> Suspend</>
                    ) : (
                      <><CheckCircle className="h-4 w-4 mr-2" /> Activate</>
                    )}
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => impersonate(u)}>
                    <User className="h-4 w-4 mr-2" /> Impersonate
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

