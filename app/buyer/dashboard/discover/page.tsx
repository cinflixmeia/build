"use client"

import { useEffect, useState } from "react"
import { ContentCarousel } from "@/components/content-carousel"
import { CategoryCarousel } from "@/components/category-carousel"
import { MovieModal } from "@/components/movie-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, DollarSign, Film, Tv, Music, BookOpen, Globe, Star, Award, Heart, Zap, Users, Camera, Mic, Video, Search, Filter } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Local poster images mapping
const posterImages = [
  "https://cinflixmeia.github.io/build/posters/continuum-dvd-movie-cover.webp",
  "https://cinflixmeia.github.io/build/posters/torch-song-trilogy-movie-poster.webp",
  "https://cinflixmeia.github.io/build/posters/guns-of-the-magnificent-seven-italian-movie-cover.webp",
  "https://cinflixmeia.github.io/build/posters/a-e-i-o-u-das-schnelle-alphabet-der-liebe-german-movie-poster.webp",
  "https://cinflixmeia.github.io/build/posters/hasse-tage-en-karlekshistoria-swedish-movie-poster.webp",
  "https://cinflixmeia.github.io/build/posters/rugrats-movie-poster.webp",
  "https://cinflixmeia.github.io/build/posters/the-big-clock-french-movie-poster.webp",
  "https://cinflixmeia.github.io/build/posters/mille-dollari-sul-nero-german-dvd-movie-cover.webp",
  "https://cinflixmeia.github.io/build/posters/the-harder-they-fall-movie-poster.webp",
  "https://cinflixmeia.github.io/build/posters/hale-and-pace-british-dvd-movie-cover.webp",
  "https://cinflixmeia.github.io/build/posters/the-hundred-foot-journey-german-movie-poster.webp",
  "https://cinflixmeia.github.io/build/posters/liebe-ist-das-schonste-geschenk-german-movie-cover.webp",
  "https://cinflixmeia.github.io/build/posters/egzorcizam-croatian-movie-poster.webp",
  "https://cinflixmeia.github.io/build/posters/the-flash-brazilian-movie-poster.webp",
  "https://cinflixmeia.github.io/build/posters/the-apartment-movie-cover-sm.webp",
  "https://cinflixmeia.github.io/build/posters/superman-hungarian-movie-poster-sm.webp"
]

// Function to get poster image with cycling
const getPosterImage = (index: number) => posterImages[index % posterImages.length]

// Movie data for modal
const movieData = {
  "1": {
    id: "1",
    title: "INDIA'S BIGGEST FOODIE",
    poster: "https://cinflixmeia.github.io/build/posters/continuum-dvd-movie-cover.webp",
    year: "2024",
    rating: "TV-PG",
    duration: "45 min",
    genre: ["Reality TV", "Food", "Travel"],
    description: "A culinary journey across India's diverse food culture, exploring regional cuisines, traditional cooking methods, and the stories behind iconic dishes. From street food to fine dining, this series showcases the rich tapestry of Indian gastronomy.",
    director: "Rahul Sharma",
    cast: ["Celebrity Chefs", "Food Critics", "Local Experts"],
    language: "Hindi, English",
    country: "India",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imdbRating: "8.5/10",
    awards: ["Best Food Show 2024", "Culinary Excellence Award"]
  },
  "2": {
    id: "2",
    title: "VINA के वो सात दिन",
    poster: "https://cinflixmeia.github.io/build/posters/torch-song-trilogy-movie-poster.webp",
    year: "2024",
    rating: "TV-14",
    duration: "120 min",
    genre: ["Drama", "Romance", "Family"],
    description: "Seven days that changed everything for Vina. A powerful story of love, loss, and redemption set against the backdrop of modern India. This emotional journey explores the complexities of relationships and the strength of the human spirit.",
    director: "Priya Patel",
    cast: ["Aishwarya Rai", "Ranbir Kapoor", "Deepika Padukone", "Amitabh Bachchan"],
    language: "Hindi",
    country: "India",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imdbRating: "7.8/10",
    awards: ["Best Drama Series", "Outstanding Performance"]
  },
  "3": {
    id: "3",
    title: "I-POP ICONS GETTING CLOSER TO BADSHAH",
    poster: "https://cinflixmeia.github.io/build/posters/guns-of-the-magnificent-seven-italian-movie-cover.webp",
    year: "2024",
    rating: "TV-PG",
    duration: "90 min",
    genre: ["Music", "Documentary", "Biography"],
    description: "Behind the scenes with India's biggest music stars. An intimate look at the lives and careers of the country's most influential artists, featuring exclusive interviews, studio sessions, and never-before-seen footage.",
    director: "Amit Kumar",
    cast: ["Badshah", "Various Artists", "Music Producers"],
    language: "Hindi, Punjabi",
    country: "India",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imdbRating: "9.2/10",
    awards: ["Best Music Documentary", "Excellence in Music"]
  }
}

// Sample data for buyer browsing content
const trendingContent = [
  {
    id: "1",
    title: "INDIA'S BIGGEST FOODIE",
    genre: "Reality TV",
    budget: "$2M",
    region: "India",
    duration: "45 min",
    posterUrl: posterImages[0],
    director: "Rahul Sharma",
    status: "Available",
    rating: "8.5",
    year: "2024",
    description: "A culinary journey across India's diverse food culture.",
    price: "$12,000",
    seller: "Rahul Sharma Productions"
  },
  {
    id: "2",
    title: "VINA के वो सात दिन",
    genre: "Drama",
    budget: "$1.5M",
    region: "India",
    duration: "120 min",
    posterUrl: posterImages[1],
    director: "Priya Patel",
    status: "Available",
    rating: "7.8",
    year: "2024",
    description: "Seven days that changed everything for Vina.",
    price: "$8,500",
    seller: "Priya Patel Films"
  },
  {
    id: "3",
    title: "I-POP ICONS GETTING CLOSER TO BADSHAH",
    genre: "Music",
    budget: "$3M",
    region: "India",
    duration: "90 min",
    posterUrl: posterImages[2],
    director: "Amit Kumar",
    status: "Available",
    rating: "9.2",
    year: "2024",
    description: "Behind the scenes with India's biggest music stars.",
    price: "$15,000",
    seller: "Amit Kumar Studios"
  },
  {
    id: "4",
    title: "Pati Patni Aur PANGA",
    genre: "Reality",
    budget: "$1.8M",
    region: "India",
    duration: "60 min",
    posterUrl: posterImages[3],
    director: "Neha Singh",
    status: "Available",
    rating: "8.1",
    year: "2024",
    description: "Reality check for celebrity couples.",
    price: "$9,200",
    seller: "Neha Singh Productions"
  },
  {
    id: "5",
    title: "GMO MEDIA PRESENTS MAKING OF INCREDIBLE BRANDS",
    genre: "Documentary",
    budget: "$2.5M",
    region: "Global",
    duration: "75 min",
    posterUrl: posterImages[4],
    director: "Raj Malhotra",
    status: "Available",
    rating: "8.7",
    year: "2024",
    description: "The story behind India's most successful brands.",
    price: "$18,000",
    seller: "GMO Media"
  },
  {
    id: "6",
    title: "SENNA हिन्दी",
    genre: "Biography",
    budget: "$4M",
    region: "India",
    duration: "150 min",
    posterUrl: posterImages[5],
    director: "Vikram Mehta",
    status: "Available",
    rating: "9.0",
    year: "2024",
    description: "The life and legacy of Ayrton Senna in Hindi.",
    price: "$25,000",
    seller: "Vikram Mehta Films"
  },
  {
    id: "7",
    title: "REFUGEE",
    genre: "Drama",
    budget: "$3.2M",
    region: "India",
    duration: "135 min",
    posterUrl: posterImages[6],
    director: "Anjali Desai",
    status: "Available",
    rating: "8.3",
    year: "2024",
    description: "A powerful story of hope and resilience.",
    price: "$20,000",
    seller: "Anjali Desai Productions"
  },
  {
    id: "8",
    title: "YELLOW HEART",
    genre: "Thriller",
    budget: "$2.8M",
    region: "India",
    duration: "110 min",
    posterUrl: posterImages[7],
    director: "Suresh Reddy",
    status: "Available",
    rating: "7.9",
    year: "2024",
    description: "A psychological thriller that keeps you guessing.",
    price: "$16,500",
    seller: "Suresh Reddy Studios"
  }
]

const recommendedContent = [
  {
    id: "9",
    title: "The Silent Echo",
    genre: "Thriller",
    budget: "$15M",
    region: "North America",
    duration: "120 min",
    posterUrl: posterImages[8],
    director: "Christopher Nolan",
    status: "Available",
    rating: "9.1",
    year: "2024",
    description: "A detective with synesthesia solves crimes by seeing sounds as colors.",
    price: "$45,000",
    seller: "Warner Bros. Studios"
  },
  {
    id: "10",
    title: "Desert Dreams",
    genre: "Fantasy",
    budget: "$20M",
    region: "Middle East",
    duration: "140 min",
    posterUrl: posterImages[9],
    director: "Denis Villeneuve",
    status: "Available",
    rating: "8.9",
    year: "2024",
    description: "A nomad discovers a hidden oasis that grants wishes but at a terrible cost.",
    price: "$60,000",
    seller: "Legendary Pictures"
  },
  {
    id: "11",
    title: "thudarum",
    genre: "Action",
    budget: "$25M",
    region: "India",
    duration: "150 min",
    posterUrl: posterImages[10],
    director: "S.S. Rajamouli",
    status: "Available",
    rating: "8.7",
    year: "2024",
    description: "An epic action drama with stunning visuals and powerful performances.",
    price: "$35,000",
    seller: "Arka Mediaworks"
  },
  {
    id: "12",
    title: "MAN OF STEEL",
    genre: "Superhero",
    budget: "$200M",
    region: "Global",
    duration: "143 min",
    posterUrl: posterImages[11],
    director: "Zack Snyder",
    status: "Available",
    rating: "8.5",
    year: "2024",
    description: "The origin story of Superman in a modern retelling.",
    price: "$150,000",
    seller: "Warner Bros. Pictures"
  }
]

const newReleases = [
  {
    id: "13",
    title: "KESARI",
    genre: "War",
    budget: "$18M",
    region: "India",
    duration: "160 min",
    posterUrl: posterImages[12],
    director: "Anurag Singh",
    status: "Available",
    rating: "8.3",
    year: "2024",
    description: "The story of the Battle of Saragarhi, a true tale of valor.",
    price: "$28,000",
    seller: "Zee Studios"
  },
  {
    id: "14",
    title: "DEVIKA",
    genre: "Drama",
    budget: "$12M",
    region: "India",
    duration: "130 min",
    posterUrl: posterImages[13],
    director: "Priya Dutt",
    status: "Available",
    rating: "8.6",
    year: "2024",
    description: "A powerful story of a woman's journey to self-discovery.",
    price: "$22,000",
    seller: "Priya Dutt Productions"
  },
  {
    id: "15",
    title: "MARVEL STUDIOS DEADPOOL & WOLVERINE",
    genre: "Superhero",
    budget: "$250M",
    region: "Global",
    duration: "135 min",
    posterUrl: posterImages[14],
    director: "Shawn Levy",
    status: "Available",
    rating: "9.2",
    year: "2024",
    description: "The most anticipated superhero crossover of the year.",
    price: "$200,000",
    seller: "Marvel Studios"
  },
  {
    id: "16",
    title: "Toofan Factory",
    genre: "Comedy",
    budget: "$8M",
    region: "India",
    duration: "110 min",
    posterUrl: posterImages[15],
    director: "Rohit Shetty",
    status: "Available",
    rating: "7.8",
    year: "2024",
    description: "A hilarious comedy about a dysfunctional family business.",
    price: "$14,000",
    seller: "Rohit Shetty Productions"
  }
]

export default function BuyerDiscoverPage() {
  const [selectedMovie, setSelectedMovie] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleMovieClick = (movieId: string) => {
    const movie = movieData[movieId as keyof typeof movieData]
    if (movie) {
      setSelectedMovie(movie)
      setIsModalOpen(true)
    }
  }

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Discover Content</h1>
          <p className="text-muted-foreground">Browse and discover content available for licensing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Advanced Search
          </Button>
        </div>
      </div>

      {/* Trending Content Section */}
      <section className="py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <ContentCarousel 
            title="Trending Now" 
            projects={trendingContent}
            showDetails={true}
            onMovieClick={handleMovieClick}
          />
        )}
      </section>

      {/* Category Cards Section */}
      <section className="py-8 bg-muted/10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : (
          <CategoryCarousel />
        )}
      </section>

      {/* Recommended for You Section */}
      <section className="py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <ContentCarousel 
            title="Recommended for You" 
            projects={recommendedContent}
            showDetails={true}
            onMovieClick={handleMovieClick}
          />
        )}
      </section>

      {/* New Releases Section */}
      <section className="py-8 bg-muted/10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <ContentCarousel 
            title="New Releases" 
            projects={newReleases}
            showDetails={true}
            onMovieClick={handleMovieClick}
          />
        )}
      </section>

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenFullPage={() => {}}
      />
    </div>
  )
} 