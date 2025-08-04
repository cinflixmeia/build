"use client"

import { useState } from "react"
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

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <img 
              src="https://cinflixmeia.github.io/build/Logos/lightlogo.png" 
              alt="Cinflix Logo" 
              className="h-32 w-auto dark:hidden"
            />
            <img 
              src="https://cinflixmeia.github.io/build/Logos/darklogo.png" 
              alt="Cinflix Logo" 
              className="h-32 w-auto hidden dark:block"
            />
          </a>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/build/buyer/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Buyer
            </a>
            <a href="/build/seller/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Seller
            </a>
            <a href="/build/pricing/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Pricing
            </a>
            <a href="/build/about/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              About
            </a>
          </nav>
        </div>

        {/* Desktop Right side */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-pulse"></span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Sign Up/Sign In Button */}
          <Button variant="destructive" className="font-semibold">
            Sign Up | Sign In
          </Button>
        </div>

        {/* Mobile Right side */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Mobile Search Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="h-9 w-9 rounded-full"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-pulse"></span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
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
              <a href="/build/buyer/" className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                Buyer
              </a>
              <a href="/build/seller/" className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                Seller
              </a>
              <a href="/build/pricing/" className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                Pricing
              </a>
              <a href="/build/about/" className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                About
              </a>
            </div>

            <div className="pt-4 border-t border-border/40">
              <Button variant="destructive" className="w-full font-semibold">
                Sign Up | Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 