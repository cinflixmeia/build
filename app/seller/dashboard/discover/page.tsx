"use client"

import { useEffect, useState } from "react"
import { ContentCarousel } from "@/components/content-carousel"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CategoryCarousel } from "@/components/category-carousel"
import { MovieModal } from "@/components/movie-modal"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, DollarSign, Film, Tv, Music, BookOpen, Globe, Star, Award, Heart, Zap, Users, Camera, Mic, Video, Search, Filter, Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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

// Sample data for streaming platform style content
const latestReleases = [
  {
    id: "1",
    title: "INDIA'S BIGGEST FOODIE",
    genre: "Reality TV",
    budget: "$2M",
    region: "India",
    duration: "45 min",
    posterUrl: posterImages[0],
    director: "Rahul Sharma",
    status: "Active",
    rating: "8.5",
    year: "2024",
    description: "A culinary journey across India's diverse food culture."
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
    status: "Active",
    rating: "7.8",
    year: "2024",
    description: "Seven days that changed everything for Vina."
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
    status: "Active",
    rating: "9.2",
    year: "2024",
    description: "Behind the scenes with India's biggest music stars."
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
    status: "Active",
    rating: "8.1",
    year: "2024",
    description: "Reality check for celebrity couples."
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
    status: "Active",
    rating: "8.7",
    year: "2024",
    description: "The story behind India's most successful brands."
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
    status: "Active",
    rating: "9.0",
    year: "2024",
    description: "The life and legacy of Ayrton Senna in Hindi."
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
    status: "Active",
    rating: "8.3",
    year: "2024",
    description: "A powerful story of hope and resilience."
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
    status: "Active",
    rating: "7.9",
    year: "2024",
    description: "A psychological thriller that keeps you guessing."
  }
]

const topRatedImdb = [
  {
    id: "9",
    title: "The Silent Echo",
    genre: "Thriller",
    budget: "$15M",
    region: "North America",
    duration: "120 min",
    posterUrl: posterImages[8],
    director: "Christopher Nolan",
    status: "Active",
    rating: "9.1",
    year: "2024",
    description: "A detective with synesthesia solves crimes by seeing sounds as colors."
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
    status: "Active",
    rating: "8.9",
    year: "2024",
    description: "A nomad discovers a hidden oasis that grants wishes but at a terrible cost."
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
    status: "Active",
    rating: "8.7",
    year: "2024",
    description: "An epic action drama with stunning visuals and powerful performances."
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
    status: "Active",
    rating: "8.5",
    year: "2024",
    description: "The origin story of Superman in a modern retelling."
  },
  {
    id: "13",
    title: "KESARI",
    genre: "War",
    budget: "$18M",
    region: "India",
    duration: "160 min",
    posterUrl: posterImages[12],
    director: "Anurag Singh",
    status: "Active",
    rating: "8.3",
    year: "2024",
    description: "The story of the Battle of Saragarhi, a true tale of valor."
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
    status: "Active",
    rating: "8.6",
    year: "2024",
    description: "A powerful story of a woman's journey to self-discovery."
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
    status: "Active",
    rating: "9.2",
    year: "2024",
    description: "The most anticipated superhero crossover of the year."
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
    status: "Active",
    rating: "7.8",
    year: "2024",
    description: "A hilarious comedy about a dysfunctional family business."
  }
]

const trendingNow = [
  {
    id: "17",
    title: "RRR",
    genre: "Action",
    budget: "$72M",
    region: "India",
    duration: "182 min",
    posterUrl: posterImages[0],
    director: "S.S. Rajamouli",
    status: "Active",
    rating: "9.5",
    year: "2022",
    description: "A tale of two legendary revolutionaries and their journey far away from home."
  },
  {
    id: "18",
    title: "Pathaan",
    genre: "Action",
    budget: "$25M",
    region: "India",
    duration: "146 min",
    posterUrl: getPosterImage(1),
    director: "Siddharth Anand",
    status: "Active",
    rating: "8.8",
    year: "2023",
    description: "An Indian spy takes on the leader of a group of mercenaries."
  },
  {
    id: "19",
    title: "Jawan",
    genre: "Action",
    budget: "$30M",
    region: "India",
    duration: "169 min",
    posterUrl: getPosterImage(2),
    director: "Atlee",
    status: "Active",
    rating: "8.9",
    year: "2023",
    description: "A high-octane action thriller about a man who is out to avenge the injustice."
  },
  {
    id: "20",
    title: "Animal",
    genre: "Crime",
    budget: "$35M",
    region: "India",
    duration: "201 min",
    posterUrl: getPosterImage(3),
    director: "Sandeep Reddy Vanga",
    status: "Active",
    rating: "8.7",
    year: "2023",
    description: "A father, who is often away due to work, is unable to comprehend the intensity of his son's love."
  },
  {
    id: "21",
    title: "12th Fail",
    genre: "Drama",
    budget: "$2M",
    region: "India",
    duration: "147 min",
    posterUrl: getPosterImage(4),
    director: "Vidhu Vinod Chopra",
    status: "Active",
    rating: "9.2",
    year: "2023",
    description: "The story of UPSC aspirants and their determination to succeed."
  },
  {
    id: "22",
    title: "Dunki",
    genre: "Comedy",
    budget: "$15M",
    region: "India",
    duration: "161 min",
    posterUrl: getPosterImage(5),
    director: "Rajkumar Hirani",
    status: "Active",
    rating: "8.4",
    year: "2023",
    description: "Four friends from a village in Punjab share a common dream: to go to England."
  },
  {
    id: "23",
    title: "Salaar",
    genre: "Action",
    budget: "$40M",
    region: "India",
    duration: "175 min",
    posterUrl: getPosterImage(6),
    director: "Prashanth Neel",
    status: "Active",
    rating: "8.6",
    year: "2023",
    description: "A gang leader tries to keep a promise made to his dying friend."
  },
  {
    id: "24",
    title: "Leo",
    genre: "Action",
    budget: "$35M",
    region: "India",
    duration: "164 min",
    posterUrl: getPosterImage(7),
    director: "Lokesh Kanagaraj",
    status: "Active",
    rating: "8.5",
    year: "2023",
    description: "A mild-mannered cafe owner fights back when a local gang tries to take over his cafe."
  }
]

export default function DiscoverPage() {
  const allProjects = [...latestReleases, ...topRatedImdb, ...trendingNow]
  // deduplicate by id
  const uniqueProjects = Array.from(new Map(allProjects.map((p) => [p.id, p])).values())

  const [filters, setFilters] = useState({
    term: "",
    genre: "",
    region: "",
    minRating: ""
  })
  const [searchResults, setSearchResults] = useState<typeof uniqueProjects>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const [selectedMovie, setSelectedMovie] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [myContents, setMyContents] = useState<any[]>([])
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('sellerContents')
      const contents = raw ? JSON.parse(raw) : []
      setMyContents(contents)
    } catch (e) {
      setMyContents([])
    }
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const handleMovieClick = (movieId: string) => {
    const movie = movieData[movieId as keyof typeof movieData]
    if (movie) {
      setSelectedMovie(movie)
      setIsModalOpen(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Discover Content</h1>
          <p className="text-muted-foreground">Browse and explore content from creators worldwide</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
            <Search className="h-4 w-4 mr-2" />
            Advanced Search
          </Button>
        </div>
      </div>

      {/* Latest Releases Section */}
      <section className="py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <ContentCarousel 
            title="Latest Releases" 
            projects={latestReleases}
            showDetails={true}
            onMovieClick={handleMovieClick}
          />
        )}
      </section>

      {/* My Content Section */}
      <section className="py-8 bg-muted/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">My Content</h2>
          <Link href="/seller/dashboard/upload">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" /> Upload New
                            </Button>
          </Link>
                          </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : myContents.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              You have not uploaded any content yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myContents.map((c) => (
              <Card key={c.id} className="overflow-hidden">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{c.formData?.title || 'Untitled'}</div>
                      <div className="text-xs text-muted-foreground truncate">{c.formData?.genre || '—'} • {c.formData?.year || '—'}</div>
                    </div>
                    <Badge variant="secondary">{new Date(c.updatedAt || c.createdAt).toLocaleDateString()}</Badge>
                          </div>
                  <div className="text-sm line-clamp-2 text-muted-foreground">
                    {c.formData?.description || 'No description provided.'}
                          </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{c.fileMeta?.videoName || 'No video'}</span>
                    <span>•</span>
                    <span>{c.fileMeta?.posterName || 'No poster'}</span>
                          </div>
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => router.push(`/seller/dashboard/upload?id=${c.id}`)}>
                      <Edit className="h-4 w-4 mr-2" /> Edit
                        </Button>
                    <Button size="sm" variant="destructive" onClick={() => {
                      const raw = localStorage.getItem('sellerContents')
                      const contents = raw ? JSON.parse(raw) : []
                      const next = contents.filter((x:any) => x.id !== c.id)
                      localStorage.setItem('sellerContents', JSON.stringify(next))
                      setMyContents(next)
                    }}>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
                </div>
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

      {/* Top Rated on IMDb Section */}
              <section className="py-8">
        <ContentCarousel 
          title="Top Rated on IMDb" 
          projects={topRatedImdb}
          showDetails={true}
          onMovieClick={handleMovieClick}
        />
              </section>

      {/* Trending Now Section */}
      <section className="py-8 bg-muted/10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <ContentCarousel 
            title="Trending Now" 
            projects={trendingNow}
            showDetails={true}
            onMovieClick={handleMovieClick}
          />
        )}
      </section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section className="py-8">
          <ContentCarousel
            title={`Search Results (${searchResults.length})`}
            projects={searchResults}
            showDetails={true}
            onMovieClick={handleMovieClick}
          />
        </section>
      )}

      {/* Filter / Advanced Search Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Advanced Search</DialogTitle>
          </DialogHeader>

                              <div className="space-y-4">
                            <div>
              <label className="text-sm font-medium">Search Term</label>
              <Input
                placeholder="Title, director…"
                value={filters.term}
                onChange={(e) => setFilters({ ...filters, term: e.target.value })}
              />
                              </div>
            <div className="grid grid-cols-2 gap-4">
                              <div>
                <label className="text-sm font-medium">Genre</label>
                <select
                  className="w-full bg-background border rounded p-2"
                  value={filters.genre}
                  onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                >
                  <option value="">Any</option>
                  {[
                    "Action",
                    "Drama",
                    "Thriller",
                    "Reality",
                    "Documentary",
                    "Music",
                    "Comedy",
                    "Biography",
                  ].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
                              </div>
              <div>
                <label className="text-sm font-medium">Region</label>
                <select
                  className="w-full bg-background border rounded p-2"
                  value={filters.region}
                  onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                >
                  <option value="">Any</option>
                  {[
                    "India",
                    "North America",
                    "Middle East",
                    "Global",
                  ].map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Minimum IMDb Rating</label>
              <select
                className="w-full bg-background border rounded p-2"
                value={filters.minRating}
                onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
              >
                <option value="">Any</option>
                {["5", "6", "7", "8", "9"].map((n) => (
                  <option key={n} value={n}>{n}+</option>
                ))}
              </select>
                      </div>
                    </div>

          <DialogFooter className="pt-4">
                              <Button
                                variant="outline"
              onClick={() => {
                setFilters({ term: "", genre: "", region: "", minRating: "" })
                setSearchResults([])
                setIsFilterOpen(false)
              }}
            >
              Clear
                              </Button>
                                <Button
              onClick={() => {
                const results = uniqueProjects.filter((p) => {
                  const termMatch = filters.term
                    ? p.title.toLowerCase().includes(filters.term.toLowerCase())
                    : true
                  const genreMatch = filters.genre ? p.genre === filters.genre : true
                  const regionMatch = filters.region ? p.region === filters.region : true
                  const ratingMatch = filters.minRating
                    ? parseFloat(p.rating) >= parseFloat(filters.minRating)
                    : true
                  return termMatch && genreMatch && regionMatch && ratingMatch
                })
                setSearchResults(results)
                setIsFilterOpen(false)
              }}
            >
              Apply Filters
                                </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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