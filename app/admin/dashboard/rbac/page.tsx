"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Role = { id: string; name: string; permissions: string[] }

const DEFAULT_ROLES: Role[] = [
  { id: 'r-admin', name: 'admin', permissions: ['all'] },
  { id: 'r-seller', name: 'seller', permissions: ['content:create', 'content:update', 'offers:respond'] },
  { id: 'r-buyer', name: 'buyer', permissions: ['offers:create', 'messages:send'] },
]

export default function AdminRBACPage() {
  const [roles, setRoles] = useState<Role[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_ROLES
    try { const raw = localStorage.getItem('admin_roles'); return raw ? JSON.parse(raw) : DEFAULT_ROLES } catch { return DEFAULT_ROLES }
  })

  useEffect(() => { try { localStorage.setItem('admin_roles', JSON.stringify(roles)) } catch {} }, [roles])

  const [activeRole, setActiveRole] = useState<string>(() => {
    if (typeof window === 'undefined') return 'admin'
    try { return localStorage.getItem('current_admin_role') || 'admin' } catch { return 'admin' }
  })

  const setCurrentRole = (name: string) => {
    setActiveRole(name)
    try { localStorage.setItem('current_admin_role', name) } catch {}
  }

  const PERMISSIONS = [
    'users:manage',
    'content:moderate',
    'offers:moderate',
    'transactions:manage',
    'flags:toggle',
    'analytics:view',
  ]

  const hasPerm = (role: Role, perm: string) => role.permissions.includes('all') || role.permissions.includes(perm)

  const togglePerm = (roleId: string, perm: string) => {
    setRoles(prev => prev.map(r => {
      if (r.id !== roleId) return r
      if (r.permissions.includes('all')) return r
      const present = r.permissions.includes(perm)
      const nextPerms = present ? r.permissions.filter(p => p !== perm) : [...r.permissions, perm]
      return { ...r, permissions: nextPerms }
    }))
    // audit
    try {
      const raw = localStorage.getItem('admin_audit')
      const arr = raw ? JSON.parse(raw) : []
      arr.push({ id: String(Date.now()), ts: Date.now(), actor: 'admin', action: 'rbac.permission.toggle', meta: { roleId, perm } })
      localStorage.setItem('admin_audit', JSON.stringify(arr))
    } catch {}
  }

  const addPermission = (roleId: string, perm: string) => {
    if (!perm.trim()) return
    setRoles(prev => prev.map(r => r.id === roleId ? { ...r, permissions: Array.from(new Set([...(r.permissions||[]), perm])) } : r))
  }

  const removePermission = (roleId: string, perm: string) => {
    setRoles(prev => prev.map(r => r.id === roleId ? { ...r, permissions: r.permissions.filter(p => p !== perm) } : r))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Roles & Permissions</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Active role:</span>
          <select value={activeRole} onChange={(e) => setCurrentRole(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
            {roles.map(r => (<option key={r.id} value={r.name}>{r.name}</option>))}
          </select>
        </div>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Permission Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2">Permission</th>
                    {roles.map(r => (
                      <th key={r.id} className="text-left p-2 capitalize">{r.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERMISSIONS.map(perm => (
                    <tr key={perm} className="border-t">
                      <td className="p-2 font-medium">{perm}</td>
                      {roles.map(r => (
                        <td key={r.id} className="p-2">
                          <input type="checkbox" checked={hasPerm(r, perm)} disabled={r.permissions.includes('all')} onChange={() => togglePerm(r.id, perm)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map(r => (
            <Card key={r.id}>
              <CardHeader>
                <CardTitle>{r.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex flex-wrap gap-2">
                  {r.permissions.map(p => (
                    <span key={p} className="px-2 py-1 rounded border">
                      {p} <button className="ml-2 text-muted-foreground" onClick={() => removePermission(r.id, p)}>×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input id={`perm-${r.id}`} className="px-2 py-1 border rounded flex-1 bg-background" placeholder="permission.key" />
                  <Button variant="outline" onClick={() => {
                    const el = document.getElementById(`perm-${r.id}`) as HTMLInputElement
                    addPermission(r.id, el?.value || '')
                    if (el) el.value = ''
                  }}>Add</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

