"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  BarChart3, 
  Film, 
  DollarSign, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  Upload,
  FileText,
  MessageSquare,
  Bell,
  User
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { RoleSwitch } from "@/components/role-switcher"

const navigation = [
  { name: 'Dashboard', href: '/seller/dashboard', icon: Home },
  { name: 'Discover', href: '/seller/dashboard/discover', icon: Film },
  { name: 'Upload Content', href: '/seller/dashboard/upload', icon: Upload },
  { name: 'Sales & Revenue', href: '/seller/dashboard/sales', icon: DollarSign },
  { name: 'Offers & Deals', href: '/seller/dashboard/offers', icon: FileText },
  { name: 'Messages', href: '/seller/dashboard/messages', icon: MessageSquare },
  { name: 'Buyers', href: '/seller/dashboard/buyers', icon: Users },
  { name: 'Analytics', href: '/seller/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/seller/dashboard/settings', icon: Settings },
]

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Removed global Header */}
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border/40">
            <div className="flex h-16 items-center justify-between px-4 border-b border-border/40">
              <h2 className="text-lg font-semibold">Seller Dashboard</h2>
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
            <div className="absolute bottom-4 left-4 right-4">
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r border-border/40">
          <div className="flex h-16 items-center px-4 border-b border-border/40">
            <h2 className="text-lg font-semibold">Seller Dashboard</h2>
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
          <div className="p-4">
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border/40 bg-background/95 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-pulse" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              {/* Theme Toggle */}
              <ThemeToggle />
              <RoleSwitch />
              <Link href="/">
                <Button variant="outline" size="sm">Exit to Home</Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 