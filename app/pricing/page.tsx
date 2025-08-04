import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, DollarSign, Shield, TrendingUp, Users, Globe, Award, Zap, Film, Heart, Camera, Music, Users as UsersIcon, Video, Tv, BarChart3, Lock, Target, Check, Star } from "lucide-react"

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

// Pricing plans
const pricingPlans = [
  {
    id: "1",
    name: "Transaction Commission",
    price: "10%–15%",
    description: "on each content rights deal, ensuring scalable revenue as volume grows.",
    features: [
      "Scalable commission structure",
      "Volume-based pricing",
      "No hidden fees",
      "Transparent reporting",
      "Global reach",
      "Expert support"
    ],
    popular: false,
    icon: DollarSign,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "2",
    name: "Listing Fees",
    price: "₹999 – ₹4,999",
    description: "Content owners pay to list IPs, creating an upfront revenue source.",
    features: [
      "One-time listing fee",
      "Premium placement options",
      "Enhanced visibility",
      "Priority support",
      "Analytics dashboard",
      "Marketing promotion"
    ],
    popular: true,
    icon: Film,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "3",
    name: "Subscription Plans",
    price: "₹4,999 – ₹19,999",
    description: "Premium access for advanced features, ranging annually.",
    features: [
      "Advanced analytics",
      "Priority customer support",
      "Exclusive content access",
      "Custom reporting",
      "API integration",
      "White-label options"
    ],
    popular: false,
    icon: Star,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "4",
    name: "White-label Licensing",
    price: "Custom B2B",
    description: "Custom B2B pricing for studios and broadcasters to license CinFlix technology.",
    features: [
      "Custom integration",
      "Dedicated account manager",
      "API access",
      "Brand customization",
      "Enterprise security",
      "24/7 support"
    ],
    popular: false,
    icon: Shield,
    color: "from-orange-500 to-red-500"
  }
]

// Success metrics
const successMetrics = [
  {
    icon: DollarSign,
    title: "Revenue Growth",
    value: "150%",
    description: "Average revenue increase for content creators"
  },
  {
    icon: Users,
    title: "Global Reach",
    value: "80+",
    description: "Countries with active buyers"
  },
  {
    icon: TrendingUp,
    title: "Success Rate",
    value: "95%",
    description: "Content that finds buyers within 30 days"
  },
  {
    icon: Award,
    title: "Customer Satisfaction",
    value: "4.9/5",
    description: "Average rating from content creators"
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
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
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Transparent Pricing
            </h1>
            <p className="text-white/90 text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
              Choose the pricing model that works best for your content monetization needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
              >
                <DollarSign className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg font-semibold px-8 py-4 h-auto backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-200 group dark:border-white/30 dark:text-white dark:hover:bg-white/10 border-gray-200 text-gray-900 hover:bg-gray-100/80"
              >
                <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Talk to Sales
              </Button>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-16 sm:py-20 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why Choose Cinflix?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of content creators who have successfully monetized their work
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {successMetrics.map((metric, index) => {
                const IconComponent = metric.icon
                return (
                  <div key={index} className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary">{metric.value}</div>
                    <div className="text-lg font-semibold">{metric.title}</div>
                    <p className="text-muted-foreground">{metric.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Flexible Pricing Options</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose the pricing model that aligns with your content monetization strategy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingPlans.map((plan) => {
                const IconComponent = plan.icon
                return (
                  <Card key={plan.id} className={`relative group hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    plan.popular ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-4 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <div className="text-3xl font-bold text-primary">{plan.price}</div>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground group/btn">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 sm:py-20 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Pricing Comparison</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See how Cinflix compares to traditional content licensing models
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Traditional Model */}
              <Card className="text-center">
                <CardHeader>
                  <h3 className="text-xl font-bold text-red-600">Traditional Model</h3>
                  <div className="text-3xl font-bold">25-40%</div>
                  <p className="text-muted-foreground">Commission rates</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Setup Costs</span>
                      <span className="text-sm font-semibold text-red-600">High</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Time to Market</span>
                      <span className="text-sm font-semibold text-red-600">6-12 months</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Global Reach</span>
                      <span className="text-sm font-semibold text-red-600">Limited</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Support</span>
                      <span className="text-sm font-semibold text-red-600">Basic</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cinflix Model */}
              <Card className="text-center ring-2 ring-primary shadow-lg">
                <CardHeader>
                  <h3 className="text-xl font-bold text-primary">Cinflix Model</h3>
                  <div className="text-3xl font-bold">10-15%</div>
                  <p className="text-muted-foreground">Commission rates</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Setup Costs</span>
                      <span className="text-sm font-semibold text-green-600">Low</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Time to Market</span>
                      <span className="text-sm font-semibold text-green-600">Immediate</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Global Reach</span>
                      <span className="text-sm font-semibold text-green-600">Unlimited</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Support</span>
                      <span className="text-sm font-semibold text-green-600">Premium</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Savings */}
              <Card className="text-center">
                <CardHeader>
                  <h3 className="text-xl font-bold text-green-600">Your Savings</h3>
                  <div className="text-3xl font-bold">60-75%</div>
                  <p className="text-muted-foreground">Cost reduction</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Commission Savings</span>
                      <span className="text-sm font-semibold text-green-600">40-60%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Time Savings</span>
                      <span className="text-sm font-semibold text-green-600">90%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Setup Savings</span>
                      <span className="text-sm font-semibold text-green-600">80%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Revenue Increase</span>
                      <span className="text-sm font-semibold text-green-600">150%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">How does the commission structure work?</h3>
                  <p className="text-muted-foreground">
                    We charge 10-15% commission on successful content deals, with rates varying based on content type and deal volume.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Are there any hidden fees?</h3>
                  <p className="text-muted-foreground">
                    No hidden fees. All costs are transparent and clearly communicated upfront.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">What's included in the listing fees?</h3>
                  <p className="text-muted-foreground">
                    Listing fees include premium placement, enhanced visibility, and marketing promotion for your content.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Can I switch between pricing models?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can switch between pricing models based on your content and business needs.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">How do subscription plans work?</h3>
                  <p className="text-muted-foreground">
                    Subscription plans provide premium features, advanced analytics, and priority support on an annual basis.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">What's included in white-label licensing?</h3>
                  <p className="text-muted-foreground">
                    White-label licensing includes custom integration, dedicated support, and brand customization for enterprise clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Monetizing Your Content?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose the pricing model that works best for you and start earning from your content today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
              >
                <DollarSign className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
              >
                <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Talk to Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 