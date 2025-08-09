"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const MODULES = [
  { name: "Users", path: "/admin/dashboard/users", desc: "Manage users, roles and status" },
  { name: "Content", path: "/admin/dashboard/content", desc: "Moderate global content library" },
  { name: "Offers", path: "/admin/dashboard/offers", desc: "Moderate offers and negotiations" },
  { name: "Transactions", path: "/admin/dashboard/transactions", desc: "Transactions, refunds and disputes" },
  { name: "Analytics", path: "/admin/dashboard/analytics", desc: "Platform KPIs and insights" },
  { name: "Feature Flags", path: "/admin/dashboard/flags", desc: "Toggle features and maintenance mode" },
  { name: "Audit Logs", path: "/admin/dashboard/audit-logs", desc: "Track administrative actions" },
  { name: "Settings", path: "/admin/dashboard/settings", desc: "Global platform settings" },
]

export default function AdminModulesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Modules</h1>
        <p className="text-muted-foreground">Quick access to administrative capabilities</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES.map(m => (
          <Card key={m.name}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {m.name}
                <Badge variant="secondary">Mock</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{m.desc}</p>
              <a href={m.path}><Button variant="outline">Open</Button></a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

