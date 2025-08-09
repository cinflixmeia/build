"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search, Users, Globe, Play, DollarSign, Star, Clock, Award, Zap, Film, Heart, Camera, Music, Users as UsersIcon, Video, Tv } from "lucide-react"

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

// Sample showcase collections
const showcaseCollections = [
  {
    id: "1",
    title: "Hollywood Classics",
    description: "Timeless masterpieces from the golden age of cinema",
    count: "500+ titles",
    posterUrl: getPosterImage(0),
    genre: "Classic"
  },
  {
    id: "2",
    title: "Bollywood Blockbusters",
    description: "The biggest hits from Indian cinema",
    count: "1000+ titles",
    posterUrl: getPosterImage(1),
    genre: "Bollywood"
  },
  {
    id: "3",
    title: "Documentary Collection",
    description: "Educational and inspiring real stories",
    count: "300+ titles",
    posterUrl: getPosterImage(2),
    genre: "Documentary"
  },
  {
    id: "4",
    title: "Animation Masterpieces",
    description: "Family-friendly animated content for all ages",
    count: "200+ titles",
    posterUrl: getPosterImage(3),
    genre: "Animation"
  },
  {
    id: "5",
    title: "Thriller & Suspense",
    description: "Edge-of-your-seat entertainment",
    count: "400+ titles",
    posterUrl: getPosterImage(4),
    genre: "Thriller"
  },
  {
    id: "6",
    title: "Romance Collection",
    description: "Love stories that touch the heart",
    count: "600+ titles",
    posterUrl: getPosterImage(5),
    genre: "Romance"
  }
]

export default function BuyerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.0) 100%), url(https://cinflixmeia.github.io/build/herolanscapeposter.jpg)`
              }}
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center h-full">
            <div className="flex-1 flex flex-col justify-center items-start max-w-2xl py-16 md:py-0">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight text-left">
                Easily discover and buy film and TV content
              </h1>
              <p className="text-white/90 text-xl sm:text-2xl mb-8 max-w-lg text-left">
                Access a global library of premium content with flexible licensing options
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg sm:text-xl font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
                >
                  <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  Find Your Titles
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 text-lg sm:text-xl font-semibold px-8 py-4 h-auto backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-200 group dark:border-white/30 dark:text-white dark:hover:bg-white/10 border-gray-200 text-gray-900 hover:bg-gray-100/80"
                >
                  <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  Talk to the Team
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 text-lg sm:text-xl font-semibold px-8 py-4 h-auto backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-200 group dark:border-white/30 dark:text-white dark:hover:bg-white/10 border-gray-200 text-gray-900 hover:bg-gray-100/80"
                  onClick={() => window.location.href = '/buyer/dashboard'}
                >
                  <ArrowRight className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  Go to Dashboard
                </Button>
              </div>
            </div>
            <div className="flex-1 hidden md:block" />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 sm:py-20 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="text-4xl sm:text-5xl font-bold text-primary">150K+</div>
                <div className="text-xl font-semibold">hours of content</div>
                <p className="text-muted-foreground">Extensive library of premium film and TV content</p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl sm:text-5xl font-bold text-primary">80+</div>
                <div className="text-xl font-semibold">genres and themes</div>
                <p className="text-muted-foreground">From action to romance, documentaries to animation</p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl sm:text-5xl font-bold text-primary">40+</div>
                <div className="text-xl font-semibold">languages and dialects</div>
                <p className="text-muted-foreground">Global content in multiple languages</p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem & Solution Section */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Problem */}
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">The Buyer's Problem</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Licensing content can be time consuming and expensive. Traditional models have not kept pace with change and demand, making it difficult to find and acquire the right content for your platform.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-muted-foreground">Complex licensing processes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-muted-foreground">High acquisition costs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-muted-foreground">Limited content discovery</span>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">The Cinflix Solution</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Cinflix offers a flexible, expert-led, easy-to-integrate platform to acquire content on your terms, at 1/10th the cost of traditional models.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">Streamlined licensing process</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">Cost-effective acquisition</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">Advanced content discovery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why Choose Cinflix?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Featuring a global library of over 150,000 hours, from animation to documentaries, Hollywood to Bollywood - and a suite of licensing options including AVOD, Cable, SVOD & even the Metaverse - Cinflix puts you in control, minus the hassle, at a fraction of the cost.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Find Your Titles</h3>
                <p className="text-muted-foreground">
                  Find the right content for you, with thousands of hours of film, television, animation, documentary, and recorded live performances from major studios, independent producers and production companies around the world.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Create Collections</h3>
                <p className="text-muted-foreground">
                  Curate content collections perfectly tailored to your needs and audience from over 80 genres and themes.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Expert Support</h3>
                <p className="text-muted-foreground">
                  Our onboarding team makes it easy to integrate, manage and optimize your content, with set-up costs at 1/10th of traditional models.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Collections */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Showcase Collections</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Take inspiration from some of our curated collections
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {showcaseCollections.map((collection) => (
                <Card key={collection.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div 
                      className="w-full aspect-[2/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${collection.posterUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-4 w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold shadow-lg group/btn">
                          Explore Collection
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-xs font-medium backdrop-blur-sm">
                        {collection.genre}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                      {collection.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        {collection.count}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group">
                <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Start Acquiring Content
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Content Strategy?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start acquiring content and learn more about our unique Content as a Service (CaaS) solution, today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
              >
                <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Find Your Titles
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
              >
                <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Talk to the Team
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 