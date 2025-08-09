import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, DollarSign, Shield, TrendingUp, Users, Globe, Award, Zap, Film, Heart, Camera, Music, Users as UsersIcon, Video, Tv, BarChart3, Lock, Target } from "lucide-react"

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

// Sample featured content
const featuredContent = [
  {
    id: "1",
    title: "Beyonce & Jay-Z: Power Love",
    year: "2021",
    posterUrl: getPosterImage(0),
    description: "A compelling documentary about power couple's journey",
    revenue: "$2.5M+"
  },
  {
    id: "2",
    title: "Yellow Yellow Yellow: The Indycar Safety Team",
    year: "2017",
    posterUrl: getPosterImage(1),
    description: "Behind the scenes of racing safety innovation",
    revenue: "$1.8M+"
  },
  {
    id: "3",
    title: "Apollo 11: First Steps on the Moon",
    year: "2012",
    posterUrl: getPosterImage(2),
    description: "The historic moon landing documentary",
    revenue: "$3.2M+"
  },
  {
    id: "4",
    title: "The Imitation Game",
    year: "2014",
    posterUrl: getPosterImage(3),
    description: "The story of Alan Turing's code-breaking",
    revenue: "$4.1M+"
  }
]

export default function SellerPage() {
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
                Easily sell and monetize your film and TV content
              </h1>
              <p className="text-white/90 text-xl sm:text-2xl mb-8 max-w-lg text-left">
                We got you. Our dedicated team is here to make everything as hassle-free as possible for you to get started and grow your revenues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
                <Link href="/seller/auth/signup">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg sm:text-xl font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
                  >
                    <DollarSign className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    Join Cinflix
                  </Button>
                </Link>
                <Link href="/seller/auth/login">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10 text-lg sm:text-xl font-semibold px-8 py-4 h-auto backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-200 group dark:border-white/30 dark:text-white dark:hover:bg-white/10 border-gray-200 text-gray-900 hover:bg-gray-100/80"
                  >
                    <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/seller/dashboard">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="border-white/30 text-white hover:bg-white/10 text-lg sm:text-xl font-semibold px-8 py-4 h-auto backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-200 group dark:border-white/30 dark:text-white dark:hover:bg-white/10 border-gray-200 text-gray-900 hover:bg-gray-100/80"
                  >
                    <BarChart3 className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 hidden md:block" />
          </div>
        </section>

        {/* Game Changer Section */}
        <section className="py-16 sm:py-20 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Here's why we're changing the game...</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Developed by rights holders for rights holders, Cinflix takes the hard work out of immediately realizing your valuable content's potential.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Enter stage:</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Merging cutting edge tech, with hands on expert support, Cinflix gives you access to buyers in every corner of the globe - from established broadcasters to the latest emerging platforms - all from the one easy to use location.
                </p>
                <Link href="/seller/auth/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group">
                    <DollarSign className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    Join Cinflix
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                  <Globe className="h-24 w-24 text-primary/60" />
                </div>
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  Global Reach
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Selling content should be easier, right?</h2>
              <div className="text-2xl font-bold text-primary mb-4">Fact: 90% of content does not realize its full monetization potential.</div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                And with overwhelming choice, confusing contracts, highly conceptual 'solutions' - not to mention the large investment required in both time, money and integration - is it really any wonder?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold">Overwhelming Choice</h3>
                <p className="text-muted-foreground">
                  Too many platforms and options to choose from
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold">Confusing Contracts</h3>
                <p className="text-muted-foreground">
                  Complex legal terms and unclear agreements
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto">
                  <DollarSign className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold">High Investment</h3>
                <p className="text-muted-foreground">
                  Large time and money investment required
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-20 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Safe Bet */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold">We're a safe bet.</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We may be in the business of entertaining, but that doesn't mean we don't have a serious side. Your content is safe and secure with us; Cinflix packages your titles with DRM before delivery to clients, so you are in control of your valuable IP.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-green-500" />
                    <span className="text-muted-foreground">DRM protection for all content</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-green-500" />
                    <span className="text-muted-foreground">Vetted clients only</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <span className="text-muted-foreground">Guaranteed monthly payments</span>
                  </div>
                </div>
              </div>

              {/* Positive Change */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold">We drive positive change.</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We list titles from sellers for free on our marketplace, and constantly promote content via our global network of buyers - helping sellers monetize and optimize their content immediately. And yeah we hate long contract negotiations as much as you do.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span className="text-muted-foreground">Global buyer network</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <span className="text-muted-foreground">Immediate monetization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-blue-500" />
                    <span className="text-muted-foreground">No long negotiations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Section */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-500" />
                  </div>
                  <h2 className="text-2xl font-bold">We use data to help you scale.</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Cinflix platform receives accurate real-time data to help provide insight into the performance of your content - allowing us to optimize your inventory. All this is readily available in your very own dedicated reporting dashboard.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    <span className="text-muted-foreground">Real-time performance data</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-purple-500" />
                    <span className="text-muted-foreground">Inventory optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-purple-500" />
                    <span className="text-muted-foreground">Dedicated reporting dashboard</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-24 w-24 text-purple-500/60" />
                </div>
                <div className="absolute -top-4 -right-4 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Analytics
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Content */}
        <section className="py-16 sm:py-20 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Success Stories</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See how content creators are monetizing their work with Cinflix
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredContent.map((content) => (
                <Card key={content.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div 
                      className="w-full aspect-[2/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${content.posterUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Revenue Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge variant="default" className="text-xs font-medium backdrop-blur-sm bg-green-500">
                        {content.revenue}
                      </Badge>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-xs font-medium backdrop-blur-sm">
                        {content.year}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                      {content.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {content.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Still need more reasons? Speak to our team, today...
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/seller/auth/signup">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
                >
                  <DollarSign className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  Join Cinflix
                </Button>
              </Link>
              <Link href="/seller/auth/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
                >
                  <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 