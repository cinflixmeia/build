"use client"

import { useState } from "react"
import { X, Play, Star, Clock, Calendar, Users, Globe, ArrowRight, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Movie {
  id: string
  title: string
  poster: string
  year: string
  rating: string
  duration: string
  genre: string[]
  description: string
  director: string
  cast: string[]
  language: string
  country: string
  trailerUrl: string
  imdbRating: string
  awards: string[]
}

interface MovieModalProps {
  movie: Movie | null
  isOpen: boolean
  onClose: () => void
  onOpenFullPage: (movieId: string) => void
}

export function MovieModal({ movie, isOpen, onClose, onOpenFullPage }: MovieModalProps) {
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false)

  if (!movie) {
    return null
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Poster and Basic Info */}
          <div className="space-y-4">
            {/* Poster */}
            <div className="relative group">
              <div 
                className="aspect-[2/3] rounded-lg overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${movie.poster})` }}
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    onClick={() => setIsTrailerPlaying(!isTrailerPlaying)}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                  >
                    <Play className="h-6 w-6 mr-2" />
                    Play Trailer
                  </Button>
                </div>
              </div>
            </div>

            {/* Trailer Section */}
            {isTrailerPlaying && (
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  src={`${movie.trailerUrl}?autoplay=1&mute=1`}
                  title={`${movie.title} Trailer`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{movie.imdbRating}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{movie.country}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((genre, index) => (
                <Badge key={index} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Synopsis</h3>
              <p className="text-muted-foreground leading-relaxed">
                {movie.description}
              </p>
            </div>

            {/* Director */}
            <div>
              <h3 className="font-semibold mb-2">Director</h3>
              <p className="text-muted-foreground">{movie.director}</p>
            </div>

            {/* Cast */}
            <div>
              <h3 className="font-semibold mb-2">Cast</h3>
              <div className="flex flex-wrap gap-2">
                {movie.cast.slice(0, 5).map((actor, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {actor}
                  </Badge>
                ))}
                {movie.cast.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{movie.cast.length - 5} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Awards */}
            {movie.awards.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Awards</h3>
                <div className="space-y-1">
                  {movie.awards.slice(0, 3).map((award, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-muted-foreground">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Language */}
            <div>
              <h3 className="font-semibold mb-2">Language</h3>
              <p className="text-muted-foreground">{movie.language}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t mt-6">
          <Button 
            onClick={() => onOpenFullPage(movie.id)}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            View Full Details
          </Button>
          <Button variant="outline" className="flex-1">
            <Users className="h-4 w-4 mr-2" />
            Contact Seller
          </Button>
        </div>
      </div>
    </div>
  )
} 