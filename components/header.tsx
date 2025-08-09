"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Bell, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { RoleSwitch } from "@/components/role-switcher"
import { useTheme } from "next-themes"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { setTheme, theme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <div className="container flex h-[72px] items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            {/* Show dark-mark on light theme */}
            <img
              src="/Logos/logo-dark.svg"
              alt="Cinflix"
              className="h-16 w-auto dark:hidden"
            />
            {/* Show light-mark on dark theme */}
            <img
              src="/Logos/logo-light.svg"
              alt="Cinflix"
              className="h-16 w-auto hidden dark:block"
            />
          </Link>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-10 ml-4" aria-label="Primary">
            <Link href="/buyer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Buyer
            </Link>
            <Link href="/seller" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Seller
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              About
            </Link>
          </nav>
        </div>

        {/* Desktop Right side */}
        <div className="hidden md:flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative h-9 w-9 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-pulse"></span>
          </Button>

          {/* Theme Toggle Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Theme" className="h-9 w-9">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <RoleSwitch />

          {/* Sign Up/Sign In Button */}
          <Link href="/seller/auth/signup">
            <Button variant="destructive" className="font-semibold">
              Sign Up | Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile Right side */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Search Toggle */}
           <Button 
            variant="ghost" 
            size="icon" aria-label="Search" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="h-9 w-9 rounded-full"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative h-9 w-9 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-pulse"></span>
          </Button>

          {/* Theme Toggle Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Theme" className="h-9 w-9">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <RoleSwitch />

          {/* Mobile menu button */}
           <Button 
            variant="ghost" 
            size="icon" aria-label="Mobile Menu" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-9 w-9 rounded-full"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 p-4 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects, directors, investors..."
              className="pl-10 bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 animate-fade-in">
          <div className="p-4 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-2">
              <Link href="/buyer" className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                Buyer
              </Link>
              <Link href="/seller" className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                Seller
              </Link>
              <Link href="/pricing" className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                Pricing
              </Link>
              <Link href="/about" className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                About
              </Link>
            </div>

            <div className="pt-4 border-t border-border/40">
              <Link href="/seller/auth/signup">
                <Button variant="destructive" className="w-full font-semibold">
                  Sign Up | Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 