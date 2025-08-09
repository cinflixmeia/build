"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    try {
      const r = localStorage.getItem("role")
      setRole(r)
    } catch {}
  }, [pathname])

  const signInAsAdmin = () => {
    try {
      localStorage.setItem("role", "admin")
    } catch {}
    setRole("admin")
    router.replace("/admin/dashboard")
  }

  if (role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold">Admin Access Required</h1>
          <p className="text-muted-foreground">This area is restricted. Use the mock button below to simulate an admin sign-in for development.</p>
          <div className="flex items-center justify-center gap-3">
            <Button onClick={signInAsAdmin}>Sign in as Admin (mock)</Button>
            <Button variant="outline" onClick={() => router.replace("/")}>Go Home</Button>
          </div>
        </div>
      </div>
    )
  }

  return children
}

