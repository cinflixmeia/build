"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShieldCheck, UserCircle2, Store, ChevronsUpDown } from "lucide-react"

export function RoleSwitch() {
  const pathname = usePathname()
  const router = useRouter()

  const current = (() => {
    if (pathname?.startsWith("/admin")) return "Admin"
    if (pathname?.startsWith("/seller")) return "Seller"
    if (pathname?.startsWith("/buyer")) return "Buyer"
    return "Public"
  })()

  const go = (role: "Buyer" | "Seller" | "Admin") => {
    if (role === "Buyer") router.push("/buyer/dashboard")
    if (role === "Seller") router.push("/seller/dashboard")
    if (role === "Admin") router.push("/admin/dashboard")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Switch role" className="inline-flex items-center gap-2">
          <ChevronsUpDown className="h-4 w-4" />
          <span className="hidden sm:inline">{current}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Switch to</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => go("Buyer")}>
          <UserCircle2 className="h-4 w-4 mr-2" /> Buyer
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => go("Seller")}>
          <Store className="h-4 w-4 mr-2" /> Seller
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => go("Admin")}>
          <ShieldCheck className="h-4 w-4 mr-2" /> Admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

