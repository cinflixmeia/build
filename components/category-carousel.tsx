"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Film, Heart, Globe, Star, Camera, Music, Users, Award, Video, Tv } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: {
    bg: string
    border: string
    icon: string
    text: string
    darkBg: string
    darkBorder: string
    darkIcon: string
    darkText: string
  }
}

const categories: Category[] = [
  {
    id: "1",
    name: "Action & Adventure",
    icon: Zap,
    color: {
      bg: "from-red-50 to-red-100",
      border: "border-red-200",
      icon: "text-red-600",
      text: "text-red-900",
      darkBg: "dark:from-red-950/20 dark:to-red-900/20",
      darkBorder: "dark:border-red-800",
      darkIcon: "dark:text-red-400",
      darkText: "dark:text-red-100"
    }
  },
  {
    id: "2",
    name: "Drama",
    icon: Film,
    color: {
      bg: "from-blue-50 to-blue-100",
      border: "border-blue-200",
      icon: "text-blue-600",
      text: "text-blue-900",
      darkBg: "dark:from-blue-950/20 dark:to-blue-900/20",
      darkBorder: "dark:border-blue-800",
      darkIcon: "dark:text-blue-400",
      darkText: "dark:text-blue-100"
    }
  },
  {
    id: "3",
    name: "Comedy",
    icon: Heart,
    color: {
      bg: "from-yellow-50 to-yellow-100",
      border: "border-yellow-200",
      icon: "text-yellow-600",
      text: "text-yellow-900",
      darkBg: "dark:from-yellow-950/20 dark:to-yellow-900/20",
      darkBorder: "dark:border-yellow-800",
      darkIcon: "dark:text-yellow-400",
      darkText: "dark:text-yellow-100"
    }
  },
  {
    id: "4",
    name: "Sci-Fi & Fantasy",
    icon: Globe,
    color: {
      bg: "from-purple-50 to-purple-100",
      border: "border-purple-200",
      icon: "text-purple-600",
      text: "text-purple-900",
      darkBg: "dark:from-purple-950/20 dark:to-purple-900/20",
      darkBorder: "dark:border-purple-800",
      darkIcon: "dark:text-purple-400",
      darkText: "dark:text-purple-100"
    }
  },
  {
    id: "5",
    name: "Horror & Thriller",
    icon: Star,
    color: {
      bg: "from-gray-50 to-gray-100",
      border: "border-gray-200",
      icon: "text-gray-600",
      text: "text-gray-900",
      darkBg: "dark:from-gray-950/20 dark:to-gray-900/20",
      darkBorder: "dark:border-gray-800",
      darkIcon: "dark:text-gray-400",
      darkText: "dark:text-gray-100"
    }
  },
  {
    id: "6",
    name: "Documentary",
    icon: Camera,
    color: {
      bg: "from-green-50 to-green-100",
      border: "border-green-200",
      icon: "text-green-600",
      text: "text-green-900",
      darkBg: "dark:from-green-950/20 dark:to-green-900/20",
      darkBorder: "dark:border-green-800",
      darkIcon: "dark:text-green-400",
      darkText: "dark:text-green-100"
    }
  },
  {
    id: "7",
    name: "Music & Musical",
    icon: Music,
    color: {
      bg: "from-pink-50 to-pink-100",
      border: "border-pink-200",
      icon: "text-pink-600",
      text: "text-pink-900",
      darkBg: "dark:from-pink-950/20 dark:to-pink-900/20",
      darkBorder: "dark:border-pink-800",
      darkIcon: "dark:text-pink-400",
      darkText: "dark:text-pink-100"
    }
  },
  {
    id: "8",
    name: "Family & Kids",
    icon: Users,
    color: {
      bg: "from-indigo-50 to-indigo-100",
      border: "border-indigo-200",
      icon: "text-indigo-600",
      text: "text-indigo-900",
      darkBg: "dark:from-indigo-950/20 dark:to-indigo-900/20",
      darkBorder: "dark:border-indigo-800",
      darkIcon: "dark:text-indigo-400",
      darkText: "dark:text-indigo-100"
    }
  },
  {
    id: "9",
    name: "Romance",
    icon: Heart,
    color: {
      bg: "from-rose-50 to-rose-100",
      border: "border-rose-200",
      icon: "text-rose-600",
      text: "text-rose-900",
      darkBg: "dark:from-rose-950/20 dark:to-rose-900/20",
      darkBorder: "dark:border-rose-800",
      darkIcon: "dark:text-rose-400",
      darkText: "dark:text-rose-100"
    }
  },
  {
    id: "10",
    name: "Crime & Mystery",
    icon: Award,
    color: {
      bg: "from-orange-50 to-orange-100",
      border: "border-orange-200",
      icon: "text-orange-600",
      text: "text-orange-900",
      darkBg: "dark:from-orange-950/20 dark:to-orange-900/20",
      darkBorder: "dark:border-orange-800",
      darkIcon: "dark:text-orange-400",
      darkText: "dark:text-orange-100"
    }
  },
  {
    id: "11",
    name: "Animation",
    icon: Video,
    color: {
      bg: "from-teal-50 to-teal-100",
      border: "border-teal-200",
      icon: "text-teal-600",
      text: "text-teal-900",
      darkBg: "dark:from-teal-950/20 dark:to-teal-900/20",
      darkBorder: "dark:border-teal-800",
      darkIcon: "dark:text-teal-400",
      darkText: "dark:text-teal-100"
    }
  },
  {
    id: "12",
    name: "Reality TV",
    icon: Tv,
    color: {
      bg: "from-cyan-50 to-cyan-100",
      border: "border-cyan-200",
      icon: "text-cyan-600",
      text: "text-cyan-900",
      darkBg: "dark:from-cyan-950/20 dark:to-cyan-900/20",
      darkBorder: "dark:border-cyan-800",
      darkIcon: "dark:text-cyan-400",
      darkText: "dark:text-cyan-100"
    }
  }
]

export function CategoryCarousel() {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
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
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Explore Categories</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover content across different genres and formats
        </p>
      </div>
      
      {/* Mobile Swipe Hint */}
      <div className="text-center text-sm text-muted-foreground">
        Drag or swipe to browse more categories
      </div>

      {/* Draggable Container */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ userSelect: isDragging ? 'none' : 'auto' }}
      >
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <Card
              key={category.id}
              className={`group hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br ${category.color.bg} ${category.color.darkBg} ${category.color.border} ${category.color.darkBorder} min-w-[160px] h-[120px] flex-shrink-0 ${
                isDragging ? 'pointer-events-none' : ''
              }`}
            >
              <CardContent className="p-3 text-center flex flex-col justify-center h-full">
                <div className={`w-10 h-10 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 ${
                  isDragging ? 'transition-none' : ''
                }`}>
                  <IconComponent className={`h-5 w-5 ${category.color.icon} ${category.color.darkIcon}`} />
                </div>
                <h3 className={`text-sm font-semibold ${category.color.text} ${category.color.darkText}`}>
                  {category.name}
                </h3>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 