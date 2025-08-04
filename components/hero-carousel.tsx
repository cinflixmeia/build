"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FeaturedProject {
  id: string
  title: string
  logline: string
  genre: string
  budget: string
  region: string
  posterUrl: string
}

const featuredProjects: FeaturedProject[] = [
  {
    id: "1",
    title: "The Last Horizon",
    logline: "A space explorer discovers an ancient civilization that holds the key to humanity's survival.",
    genre: "Sci-Fi",
    budget: "$15M",
    region: "Global",
    posterUrl: "/build/posters/continuum-dvd-movie-cover.webp"
  },
  {
    id: "2",
    title: "Midnight in Paris",
    logline: "A struggling writer finds himself transported to 1920s Paris every night at midnight.",
    genre: "Romance",
    budget: "$8M",
    region: "Europe",
    posterUrl: "/build/posters/torch-song-trilogy-movie-poster.webp"
  },
  {
    id: "3",
    title: "The Silent Echo",
    logline: "A detective with synesthesia solves crimes by seeing sounds as colors.",
    genre: "Thriller",
    budget: "$12M",
    region: "North America",
    posterUrl: "/build/posters/guns-of-the-magnificent-seven-italian-movie-cover.webp"
  },
  {
    id: "4",
    title: "Desert Dreams",
    logline: "A nomad discovers a hidden oasis that grants wishes but at a terrible cost.",
    genre: "Fantasy",
    budget: "$20M",
    region: "Middle East",
    posterUrl: "/build/posters/a-e-i-o-u-das-schnelle-alphabet-der-liebe-german-movie-poster.webp"
  }
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-xl border border-border/50 shadow-2xl">
      {/* Slides */}
      <div className="relative w-full h-full">
        {featuredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%), url(${project.posterUrl})`
              }}
            />
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl lg:max-w-3xl">
                  <div className="mb-4 sm:mb-6">
                    <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
                      {project.genre}
                    </span>
                  </div>
                  
                  <h1 className="text-display text-white mb-4 sm:mb-6 leading-tight">
                    {project.title}
                  </h1>
                  
                  <p className="text-body text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-xl">
                    {project.logline}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group">
                      <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-200" />
                      View Deal
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-sm sm:text-base font-semibold backdrop-blur-sm group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </div>
                  
                  <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-8 text-caption">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="font-medium">Budget:</span> 
                      <span className="text-white">{project.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="font-medium">Region:</span> 
                      <span className="text-white">{project.region}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile for touch-friendly experience */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-sm hidden sm:flex transition-all duration-200 hover:scale-110"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-sm hidden sm:flex transition-all duration-200 hover:scale-110"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {/* Indicators - Larger and more touch-friendly on mobile */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {featuredProjects.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-primary shadow-lg shadow-primary/50" 
                : "bg-white/40 hover:bg-white/60"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Mobile Swipe Instructions */}
      <div className="absolute top-6 right-6 sm:hidden">
        <div className="bg-black/60 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm border border-white/20">
          Swipe to browse
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
    </div>
  )
} 