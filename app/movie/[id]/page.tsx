import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, Play, Star, Clock, Calendar, Users, Globe, Award, Heart, Share2, Download, Eye, DollarSign, MessageCircle, Phone, Mail, MapPin, Linkedin, Twitter, Instagram } from "lucide-react"

// Sample movie data - in a real app this would come from an API
const movieData = {
  "1": {
    id: "1",
    title: "The Apartment",
    poster: "/posters/the-apartment-movie-cover-sm.webp",
    year: "1960",
    rating: "PG-13",
    duration: "2h 5m",
    genre: ["Drama", "Romance", "Comedy"],
    description: "A struggling insurance clerk tries to climb the corporate ladder by lending his apartment to his superiors for their extramarital affairs. However, complications arise when he falls in love with an elevator operator who is having an affair with one of his bosses.",
    director: "Billy Wilder",
    cast: ["Jack Lemmon", "Shirley MacLaine", "Fred MacMurray", "Ray Walston", "Jack Kruschen"],
    language: "English",
    country: "United States",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imdbRating: "8.3/10",
    awards: ["Academy Award for Best Picture", "Academy Award for Best Director", "Academy Award for Best Original Screenplay"],
    budget: "$3.2M",
    boxOffice: "$25.2M",
    productionCompany: "The Mirisch Company",
    cinematographer: "Joseph LaShelle",
    editor: "Daniel Mandell",
    composer: "Adolph Deutsch",
    filmingLocations: ["New York City", "Los Angeles"],
    releaseDate: "June 15, 1960",
    runtime: "125 minutes",
    color: "Black and White",
    aspectRatio: "1.85:1",
    soundMix: "Mono",
    negativeFormat: "35mm",
    cinematographicProcess: "Spherical",
    printedFilmFormat: "35mm",
    seller: {
      name: "Classic Films Ltd",
      rating: "4.8/5",
      verified: true,
      location: "Los Angeles, CA",
      contact: "+1 (555) 123-4567",
      email: "contact@classicfilms.com",
      website: "www.classicfilms.com",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    licensing: {
      price: "$50,000",
      type: "Exclusive Rights",
      territory: "Worldwide",
      duration: "10 years",
      availableRights: ["Theatrical", "Television", "Streaming", "Home Video", "Educational"],
      restrictions: ["No editing without permission", "Must include original credits"]
    }
  },
  "2": {
    id: "2",
    title: "Superman",
    poster: "/posters/superman-hungarian-movie-poster-sm.webp",
    year: "1978",
    rating: "PG",
    duration: "2h 23m",
    genre: ["Action", "Adventure", "Sci-Fi"],
    description: "An alien orphan is sent from his dying planet to Earth, where he grows up to become his adoptive home's first and greatest superhero.",
    director: "Richard Donner",
    cast: ["Christopher Reeve", "Marlon Brando", "Gene Hackman", "Margot Kidder", "Ned Beatty"],
    language: "English",
    country: "United States",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imdbRating: "7.3/10",
    awards: ["Academy Award for Best Sound", "Academy Award for Best Film Editing"],
    budget: "$55M",
    boxOffice: "$300.2M",
    productionCompany: "Warner Bros.",
    cinematographer: "Geoffrey Unsworth",
    editor: "Stuart Baird",
    composer: "John Williams",
    filmingLocations: ["New York City", "Alberta, Canada"],
    releaseDate: "December 10, 1978",
    runtime: "143 minutes",
    color: "Color",
    aspectRatio: "2.39:1",
    soundMix: "Dolby Stereo",
    negativeFormat: "35mm",
    cinematographicProcess: "Panavision",
    printedFilmFormat: "35mm",
    seller: {
      name: "Warner Bros. Licensing",
      rating: "4.9/5",
      verified: true,
      location: "Burbank, CA",
      contact: "+1 (555) 987-6543",
      email: "licensing@warnerbros.com",
      website: "www.warnerbros.com",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    licensing: {
      price: "$150,000",
      type: "Non-Exclusive Rights",
      territory: "North America",
      duration: "5 years",
      availableRights: ["Television", "Streaming", "Home Video"],
      restrictions: ["No theatrical rights", "Must include Warner Bros. logo"]
    }
  }
}

// Generate static params for static export
export async function generateStaticParams() {
  return Object.keys(movieData).map((id) => ({
    id: id,
  }))
}

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: movieId } = await params
  const movie = movieData[movieId as keyof typeof movieData]

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Button asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[600px] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.2) 100%), url(${movie.poster})`
              }}
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Poster */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative group">
                  <div 
                    className="aspect-[2/3] w-64 rounded-lg overflow-hidden bg-cover bg-center shadow-2xl"
                    style={{ backgroundImage: `url(${movie.poster})` }}
                  >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                      >
                        <Play className="h-6 w-6 mr-2" />
                        Play Trailer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Movie Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{movie.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>{movie.imdbRating}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>{movie.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>{movie.year}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>{movie.country}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genre.map((genre, index) => (
                      <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
                    {movie.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Watch Trailer
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Heart className="h-5 w-5 mr-2" />
                    Add to Wishlist
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              {/* Overview Tab */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <h2 className="text-2xl font-bold">Synopsis</h2>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {movie.description}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h2 className="text-2xl font-bold">Cast & Crew</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Director</h3>
                        <p className="text-muted-foreground">{movie.director}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Cast</h3>
                        <div className="flex flex-wrap gap-2">
                          {movie.cast.map((actor, index) => (
                            <Badge key={index} variant="outline">
                              {actor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {movie.awards.length > 0 && (
                    <Card>
                      <CardHeader>
                        <h2 className="text-2xl font-bold">Awards & Recognition</h2>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {movie.awards.map((award, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Award className="h-4 w-4 text-yellow-500" />
                              <span className="text-muted-foreground">{award}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">Quick Facts</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Release Date</span>
                        <span className="font-medium">{movie.releaseDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Runtime</span>
                        <span className="font-medium">{movie.runtime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Language</span>
                        <span className="font-medium">{movie.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Country</span>
                        <span className="font-medium">{movie.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Color</span>
                        <span className="font-medium">{movie.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget</span>
                        <span className="font-medium">{movie.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Box Office</span>
                        <span className="font-medium">{movie.boxOffice}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 