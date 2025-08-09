"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Users,
  Film,
  FileText,
  DollarSign,
  BarChart3,
  Settings,
  Flag,
  Menu,
  X,
  Bell,
  ShieldCheck,
  Search
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { RoleSwitch } from "@/components/role-switcher"

const navigation = [
  { name: "Overview", href: "/admin/dashboard", icon: Home },
  { name: "Modules", href: "/admin/dashboard/modules", icon: ShieldCheck },
  { name: "Audit Logs", href: "/admin/dashboard/audit-logs", icon: FileText },
  { name: "Users", href: "/admin/dashboard/users", icon: Users },
  { name: "Content", href: "/admin/dashboard/content", icon: Film },
  { name: "Content Queue", href: "/admin/dashboard/content/queue", icon: FileText },
  { name: "Offers", href: "/admin/dashboard/offers", icon: FileText },
  { name: "Search", href: "/admin/dashboard/search", icon: Search },
  { name: "Transactions", href: "/admin/dashboard/transactions", icon: DollarSign },
  { name: "Analytics", href: "/admin/dashboard/analytics", icon: BarChart3 },
  { name: "Categories", href: "/admin/dashboard/categories", icon: Search },
  { name: "RBAC", href: "/admin/dashboard/rbac", icon: ShieldCheck },
  { name: "Feature Flags", href: "/admin/dashboard/flags", icon: Flag },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
]

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [flags, setFlags] = useState<{ maintenance_mode?: boolean } | null>(null)
  const [impersonate, setImpersonate] = useState<{ id: string; name: string; role: string } | null>(null)

  // hydrate flags & impersonation banner
  useEffect(() => {
    try {
      const raw = localStorage.getItem('admin_flags')
      if (raw) {
        const parsed = JSON.parse(raw) as Array<{ key: string; enabled: boolean }>
        const obj: any = {}
        parsed.forEach(f => { obj[f.key] = f.enabled })
        setFlags(obj)
      }
      const imp = localStorage.getItem('impersonate')
      if (imp) setImpersonate(JSON.parse(imp))
    } catch {}
  }, [])

  const stopImpersonate = () => {
    try { localStorage.removeItem('impersonate') } catch {}
    setImpersonate(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border/40">
            <div className="flex h-16 items-center justify-between px-4 border-b border-border/40">
              <h2 className="text-lg font-semibold flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Admin Panel</h2>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r border-border/40">
          <div className="flex h-16 items-center px-4 border-b border-border/40">
            <h2 className="text-lg font-semibold flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Admin Panel</h2>
          </div>
          <nav className="flex flex-1 flex-col px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border/40 bg-background/95 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center gap-x-2 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-2 lg:gap-x-6">
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-pulse" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <ThemeToggle />
              <RoleSwitch />
              <Link href="/">
                <Button variant="outline" size="sm">Exit to Home</Button>
              </Link>
            </div>
          </div>
        </div>
        {flags?.maintenance_mode && (
          <div className="px-4 py-2 bg-amber-100 text-amber-900 text-sm">Maintenance Mode is enabled</div>
        )}
        {impersonate && (
          <div className="px-4 py-2 bg-blue-100 text-blue-900 text-sm flex items-center justify-between">
            <span>Impersonating {impersonate.name} ({impersonate.role})</span>
            <Button size="sm" variant="outline" onClick={stopImpersonate}>Stop</Button>
          </div>
        )}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

