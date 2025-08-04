import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, DollarSign, Shield, TrendingUp, Users, Globe, Award, Zap, Film, Heart, Camera, Music, Users as UsersIcon, Video, Tv, BarChart3, Lock, Target, Check, Star, Award as AwardIcon, Briefcase, GraduationCap, MapPin, Linkedin, Twitter, Mail } from "lucide-react"

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

// Company stats
const companyStats = [
  {
    icon: DollarSign,
    title: "Revenue Generated",
    value: "$50M+",
    description: "For content creators worldwide"
  },
  {
    icon: Users,
    title: "Content Creators",
    value: "10,000+",
    description: "Trust Cinflix with their IP"
  },
  {
    icon: Globe,
    title: "Global Reach",
    value: "80+",
    description: "Countries with active buyers"
  },
  {
    icon: Award,
    title: "Success Rate",
    value: "95%",
    description: "Content that finds buyers"
  }
]

// Team members
const teamMembers = [
  {
    id: "1",
    name: "Ram Bharati",
    role: "Chief Executive Officer",
    bio: "A visionary filmmaker turned entrepreneur, Ram brings over 15 years of experience in the entertainment industry. Having directed and produced award-winning films, he understands the challenges content creators face in monetizing their work. His passion for storytelling and deep industry knowledge drives Cinflix's mission to democratize content licensing.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    achievements: [
      "Directed 20+ award-winning films",
      "Produced content for major studios",
      "15+ years in entertainment industry",
      "Expert in content monetization"
    ],
    education: "Film & Media Arts, National Film School",
    location: "Mumbai, India",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "ram@cinflix.com"
    },
    expertise: ["Film Production", "Content Strategy", "Industry Relations", "Business Development"]
  },
  {
    id: "2",
    name: "Saurab Vokkalkar",
    role: "Chief Technology Officer",
    bio: "A serial entrepreneur and tech innovator, Saurab has built multiple successful tech startups. With expertise in scalable platforms and cutting-edge technology, he leads Cinflix's technical vision. His experience in building robust, user-friendly platforms ensures Cinflix delivers a seamless experience for content creators and buyers alike.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    achievements: [
      "Built 5+ successful tech startups",
      "Expert in scalable platforms",
      "10+ years in technology",
      "Specialist in B2B platforms"
    ],
    education: "Computer Science, IIT Bombay",
    location: "Bangalore, India",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "saurab@cinflix.com"
    },
    expertise: ["Platform Architecture", "AI/ML", "B2B Solutions", "Product Strategy"]
  }
]

// Company values
const companyValues = [
  {
    icon: Shield,
    title: "Trust & Security",
    description: "We prioritize the security of your intellectual property with advanced DRM protection and vetted buyer networks."
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Connect with buyers from 80+ countries, expanding your content's reach beyond traditional boundaries."
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "Leveraging cutting-edge technology to streamline content licensing and maximize monetization opportunities."
  },
  {
    icon: Users,
    title: "Creator-First",
    description: "Built by creators for creators, ensuring your success is our primary mission."
  }
]

export default function AboutPage() {
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
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.0) 100%), url(https://cinflixmeia.github.io/build/herolanscapeposter.jpg)`
              }}
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              About Cinflix
            </h1>
            <p className="text-white/90 text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
              Revolutionizing content licensing through technology and industry expertise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
              >
                <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Meet the Team
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg font-semibold px-8 py-4 h-auto backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-200 group dark:border-white/30 dark:text-white dark:hover:bg-white/10 border-gray-200 text-gray-900 hover:bg-gray-100/80"
              >
                <Globe className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Our Mission
              </Button>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-16 sm:py-20 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Cinflix by the Numbers</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our impact on the content licensing industry
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-lg font-semibold">{stat.title}</div>
                    <p className="text-muted-foreground">{stat.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Leadership Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Meet the visionaries behind Cinflix's mission to democratize content licensing
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {teamMembers.map((member) => (
                <Card key={member.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center pb-6">
                    <div className="relative mx-auto mb-6">
                      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto">
                        <div 
                          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url(${member.image})` }}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full">
                        <AwardIcon className="h-4 w-4" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-lg text-primary font-semibold mb-4">{member.role}</p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{member.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>{member.education}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Key Achievements</h4>
                      <ul className="space-y-2">
                        {member.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-4 pt-4">
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <Twitter className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <Mail className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-16 sm:py-20 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at Cinflix
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <div key={index} className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Cinflix, we believe that great content deserves to be seen and monetized globally. Our mission is to democratize content licensing by providing creators with the tools, technology, and global network they need to maximize the value of their intellectual property.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded by a filmmaker and built by tech innovators, we understand both the creative and business challenges of content monetization. We're committed to making the licensing process transparent, efficient, and profitable for creators worldwide.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-muted-foreground">Transparent pricing and processes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-muted-foreground">Global buyer network</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-muted-foreground">Advanced technology platform</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                  <Film className="h-24 w-24 text-primary/60" />
                </div>
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  Since 2023
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Join the Cinflix Revolution
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of the future of content licensing and monetization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
              >
                <DollarSign className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Start Monetizing
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
              >
                <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 