"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, DollarSign, MapPin, Clock, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: string
  title: string
  genre: string
  budget: string
  region: string
  duration: string
  posterUrl: string
  director: string
  status: string
  rating?: string
  year?: string
  description?: string
}

interface ContentCarouselProps {
  title: string
  projects: Project[]
  showDetails?: boolean
  onMovieClick?: (movieId: string) => void
}

export function ContentCarousel({ title, projects, showDetails = true, onMovieClick }: ContentCarouselProps) {
  const [startIndex, setStartIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Simple responsive items per view
  const itemsPerView = 4

  const nextSlide = () => {
    setStartIndex((prev) => Math.min(prev + itemsPerView, projects.length - itemsPerView))
  }

  const prevSlide = () => {
    setStartIndex((prev) => Math.max(prev - itemsPerView, 0))
  }

  const canGoNext = startIndex + itemsPerView < projects.length
  const canGoPrev = startIndex > 0

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start dragging if clicking on the container itself, not on movie cards
    if (e.target === e.currentTarget) {
      setIsDragging(true)
      setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
      setScrollLeft(containerRef.current?.scrollLeft || 0)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (containerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-heading uppercase tracking-wide">{title}</h2>
          <div className="h-1 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>
        
        {/* Navigation - Hidden on mobile for touch-friendly experience */}
        <div className="hidden sm:flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={!canGoPrev}
            className="h-10 w-10 rounded-full border-border/50 hover:border-primary/50 transition-all duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={!canGoNext}
            className="h-10 w-10 rounded-full border-border/50 hover:border-primary/50 transition-all duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="sm:hidden text-caption text-center">
        Swipe to browse more
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div 
          ref={containerRef}
          className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide pb-4 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ userSelect: isDragging ? 'none' : 'auto' }}
        >
                      {projects.slice(startIndex, startIndex + itemsPerView + 2).map((project) => (
              <div 
                key={project.id} 
                className={`flex-shrink-0 w-50 sm:w-56 md:w-67 group cursor-pointer ${
                  isDragging ? 'pointer-events-none' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (onMovieClick) {
                    onMovieClick(project.id)
                  }
                }}
              >
              {/* Poster Container */}
              <div className="relative overflow-hidden rounded-xl border border-border/50 shadow-lg hover:shadow-xl mb-3">
                <div 
                  className="w-full aspect-[2/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.posterUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-4 w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold shadow-lg group/btn">
                      Make Offer
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="text-xs font-medium backdrop-blur-sm">
                    {project.status}
                  </Badge>
                </div>

                {/* Rating Badge */}
                {project.rating && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="default" className="text-xs font-medium backdrop-blur-sm bg-primary/90">
                      <Star className="h-3 w-3 mr-1" />
                      {project.rating}
                    </Badge>
                  </div>
                )}
              </div>
              
              {/* Movie Info Below Poster */}
              <div className="space-y-2">
                {/* Title */}
                <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                
                {/* Meta Information */}
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  {project.year && (
                    <span>{project.year}</span>
                  )}
                  {project.duration && (
                    <span>{project.duration}</span>
                  )}
                  {project.rating && (
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      <span>{project.rating}</span>
                    </div>
                  )}
                </div>

                {/* Genre Tags */}
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {project.genre}
                  </Badge>
                  {showDetails && (
                    <>
                      <Badge variant="outline" className="text-xs font-medium">
                        {project.region}
                      </Badge>
                      <Badge variant="outline" className="text-xs font-medium">
                        {project.budget}
                      </Badge>
                    </>
                  )}
                </div>

                {/* Description */}
                {project.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                )}

                {/* Director Info */}
                {showDetails && (
                  <div className="text-xs text-muted-foreground">
                    Director: {project.director}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="sm:hidden flex justify-center space-x-2 mt-6">
        {Array.from({ length: Math.ceil(projects.length / itemsPerView) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              Math.floor(startIndex / itemsPerView) === index 
                ? "bg-primary shadow-lg shadow-primary/50" 
                : "bg-muted hover:bg-muted-foreground"
            }`}
            onClick={() => setStartIndex(index * itemsPerView)}
          />
        ))}
      </div>
    </div>
  )
} 