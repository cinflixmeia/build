"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Film, DollarSign, ShieldCheck, Activity, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

export default function AdminOverviewPage() {
  const [users, setUsers] = useState<any[]>([])
  const [content, setContent] = useState<any[]>([])
  const [flags, setFlags] = useState<any[]>([])

  useEffect(() => {
    try {
      const u = localStorage.getItem('admin_users')
      setUsers(u ? JSON.parse(u) : [])
    } catch {}
    try {
      const c = localStorage.getItem('admin_content')
      setContent(c ? JSON.parse(c) : [])
    } catch {}
    try {
      const f = localStorage.getItem('admin_flags')
      setFlags(f ? JSON.parse(f) : [])
    } catch {}
  }, [])

  const stats = useMemo(() => {
    const revenue = (() => {
      try {
        const raw = localStorage.getItem('admin_txns')
        const tx = raw ? JSON.parse(raw) : []
        const total = tx.filter((t: any) => t.status === 'Completed')
          .reduce((sum: number, t: any) => sum + (Number(String(t.amount).replace(/[^0-9.-]+/g, '')) || 0), 0)
        return `$${total.toLocaleString()}`
      } catch { return "$0" }
    })()
    return [
      { label: "Total Users", value: users.length || 1280, icon: Users },
      { label: "Total Content", value: content.length || 342, icon: Film },
      { label: "Total Revenue", value: revenue, icon: DollarSign },
      { label: "Active Flags", value: (flags.filter?.((f: any) => f.enabled).length) || 0, icon: SlidersHorizontal },
    ]
  }, [users, content, flags])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground">Control the platform across buyers and sellers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{s.label}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Link href="/admin/dashboard/users"><Button variant="outline">Manage Users</Button></Link>
            <Link href="/admin/dashboard/content"><Button variant="outline">Moderate Content</Button></Link>
            <Link href="/admin/dashboard/offers"><Button variant="outline">Review Offers</Button></Link>
            <Link href="/admin/dashboard/transactions"><Button variant="outline">View Transactions</Button></Link>
            <Link href="/admin/dashboard/settings"><Button>Platform Settings</Button></Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>API</span>
              <Badge variant="secondary">Mock</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Media CDN</span>
              <Badge variant="secondary">Mock</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Background Jobs</span>
              <Badge variant="secondary">Mock</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

