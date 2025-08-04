import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t border-border/40 glass">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col space-y-8 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo and Links */}
          <div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-12">
            <a href="/build/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
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
            
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors duration-200 font-medium">About</a>
              <a href="#" className="hover:text-foreground transition-colors duration-200 font-medium">FAQ</a>
              <a href="#" className="hover:text-foreground transition-colors duration-200 font-medium">Legal</a>
              <a href="#" className="hover:text-foreground transition-colors duration-200 font-medium">Privacy</a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center sm:justify-end space-x-3">
            <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-9 sm:w-9 rounded-full hover:bg-muted/50 transition-all duration-200 group">
              <Twitter className="h-5 w-5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-200" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-9 sm:w-9 rounded-full hover:bg-muted/50 transition-all duration-200 group">
              <Linkedin className="h-5 w-5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-200" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-9 sm:w-9 rounded-full hover:bg-muted/50 transition-all duration-200 group">
              <Github className="h-5 w-5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-200" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-9 sm:w-9 rounded-full hover:bg-muted/50 transition-all duration-200 group">
              <Mail className="h-5 w-5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-200" />
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-caption">
          <p className="text-muted-foreground">
            &copy; 2024 Cinflix. All rights reserved. Connecting filmmakers with investors worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
} 