"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContentCarousel } from "@/components/content-carousel"
import { CategoryCarousel } from "@/components/category-carousel"
import { MovieModal } from "@/components/movie-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, DollarSign, Film, Tv, Music, BookOpen, Globe, Star, Award, Heart, Zap, Users, Camera, Mic, Video } from "lucide-react"

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
  },
  "4": {
    id: "4",
    title: "Pati Patni Aur PANGA",
    poster: "https://cinflixmeia.github.io/build/posters/a-e-i-o-u-das-schnelle-alphabet-der-liebe-german-movie-poster.webp",
    year: "2024",
    rating: "TV-14",
    duration: "60 min",
    genre: ["Reality", "Comedy", "Family"],
    description: "Reality check for celebrity couples. A humorous and heartwarming look at the challenges and joys of married life, featuring famous couples navigating the ups and downs of relationships in the public eye.",
    director: "Neha Singh",
    cast: ["Celebrity Couples", "Relationship Experts"],
    language: "Hindi",
    country: "India",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imdbRating: "8.1/10",
    awards: ["Best Reality Show", "Audience Choice Award"]
  },
  "5": {
    id: "5",
    title: "GMO MEDIA PRESENTS MAKING OF INCREDIBLE BRANDS",
    poster: "https://cinflixmeia.github.io/build/posters/hasse-tage-en-karlekshistoria-swedish-movie-poster.webp",
    year: "2024",
    rating: "TV-G",
    duration: "75 min",
    genre: ["Documentary", "Business", "Marketing"],
    description: "An in-depth exploration of how some of the world's most successful brands were built. From startup to global phenomenon, this series reveals the strategies, challenges, and innovations that shaped iconic companies.",
    director: "Raj Malhotra",
    cast: ["Business Leaders", "Marketing Experts", "Brand Founders"],
    language: "English",
    country: "Global",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imdbRating: "8.7/10",
    awards: ["Best Business Documentary", "Excellence in Journalism"]
  },
  "6": {
    id: "6",
    title: "SENNA हिन्दी",
    poster: "https://cinflixmeia.github.io/build/posters/rugrats-movie-poster.webp",
    year: "2024",
    rating: "TV-PG",
    duration: "150 min",
    genre: ["Biography", "Sports", "Drama"],
    description: "The life and legacy of Ayrton Senna in Hindi. A comprehensive look at the legendary Formula One driver's career, his impact on motorsport, and his tragic death that changed the sport forever.",
    director: "Vikram Mehta",
    cast: ["Ayrton Senna", "Alain Prost", "Michael Schumacher"],
    language: "Hindi",
    country: "India",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imdbRating: "9.0/10",
    awards: ["Best Sports Documentary", "Excellence in Biographical Content"]
  },
  "7": {
    id: "7",
    title: "REFUGEE",
    poster: "https://cinflixmeia.github.io/build/posters/the-big-clock-french-movie-poster.webp",
    year: "2024",
    rating: "TV-14",
    duration: "135 min",
    genre: ["Drama", "Social Issue", "Inspiration"],
    description: "A powerful story of hope and resilience. Following the journey of displaced families and their struggle to find a new home, this film explores themes of identity, belonging, and the human spirit.",
    director: "Anjali Desai",
    cast: ["Priyanka Chopra", "Aamir Khan", "Deepika Padukone"],
    language: "Hindi, English",
    country: "India",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imdbRating: "8.3/10",
    awards: ["Best Social Drama", "Humanitarian Award"]
  },
  "8": {
    id: "8",
    title: "YELLOW HEART",
    poster: "https://cinflixmeia.github.io/build/posters/mille-dollari-sul-nero-german-dvd-movie-cover.webp",
    year: "2024",
    rating: "TV-MA",
    duration: "110 min",
    genre: ["Thriller", "Mystery", "Psychological"],
    description: "A psychological thriller that keeps you guessing. When a detective investigates a series of mysterious deaths, she discovers a pattern that leads to a shocking revelation about human nature.",
    director: "Suresh Reddy",
    cast: ["Vidya Balan", "Rajkummar Rao", "Nawazuddin Siddiqui"],
    language: "Hindi",
    country: "India",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imdbRating: "7.9/10",
    awards: ["Best Thriller", "Excellence in Suspense"]
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

// Additional categories for comprehensive streaming platform
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

const bollywoodClassics = [
  {
    id: "25",
    title: "Sholay",
    genre: "Action",
    budget: "$3M",
    region: "India",
    duration: "204 min",
    posterUrl: getPosterImage(8),
    director: "Ramesh Sippy",
    status: "Active",
    rating: "9.3",
    year: "1975",
    description: "After his family is murdered by a notorious bandit, an ex-convict sets out to exact revenge."
  },
  {
    id: "26",
    title: "Mughal-e-Azam",
    genre: "Drama",
    budget: "$1.5M",
    region: "India",
    duration: "197 min",
    posterUrl: getPosterImage(9),
    director: "K. Asif",
    status: "Active",
    rating: "9.1",
    year: "1960",
    description: "A 16th-century prince falls in love with a court dancer and battles with his emperor father."
  },
  {
    id: "27",
    title: "Mother India",
    genre: "Drama",
    budget: "$1M",
    region: "India",
    duration: "172 min",
    posterUrl: getPosterImage(10),
    director: "Mehboob Khan",
    status: "Active",
    rating: "9.0",
    year: "1957",
    description: "A poverty-stricken woman raises her sons through many trials and tribulations."
  },
  {
    id: "28",
    title: "Pyaasa",
    genre: "Drama",
    budget: "$500K",
    region: "India",
    duration: "146 min",
    posterUrl: getPosterImage(11),
    director: "Guru Dutt",
    status: "Active",
    rating: "8.9",
    year: "1957",
    description: "A talented but indigent poet Vijay struggles for love and recognition in the hypocritical society."
  },
  {
    id: "29",
    title: "Guide",
    genre: "Drama",
    budget: "$800K",
    region: "India",
    duration: "183 min",
    posterUrl: getPosterImage(12),
    director: "Vijay Anand",
    status: "Active",
    rating: "8.8",
    year: "1965",
    description: "A tour guide meets a married woman and tries to persuade her to leave her husband."
  },
  {
    id: "30",
    title: "Deewar",
    genre: "Action",
    budget: "$1.2M",
    region: "India",
    duration: "174 min",
    posterUrl: getPosterImage(13),
    director: "Yash Chopra",
    status: "Active",
    rating: "8.7",
    year: "1975",
    description: "Two brothers take different paths in life - one becomes a police officer, the other a criminal."
  },
  {
    id: "31",
    title: "Amar Akbar Anthony",
    genre: "Comedy",
    budget: "$1M",
    region: "India",
    duration: "184 min",
    posterUrl: getPosterImage(14),
    director: "Manmohan Desai",
    status: "Active",
    rating: "8.6",
    year: "1977",
    description: "Three brothers separated in childhood are reunited as adults."
  },
  {
    id: "32",
    title: "Zanjeer",
    genre: "Action",
    budget: "$800K",
    region: "India",
    duration: "129 min",
    posterUrl: getPosterImage(15),
    director: "Prakash Mehra",
    status: "Active",
    rating: "8.5",
    year: "1973",
    description: "A police officer seeks revenge against a crime syndicate."
  }
]

const internationalHits = [
  {
    id: "33",
    title: "Inception",
    genre: "Sci-Fi",
    budget: "$160M",
    region: "Global",
    duration: "148 min",
    posterUrl: getPosterImage(0),
    director: "Christopher Nolan",
    status: "Active",
    rating: "9.3",
    year: "2010",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  {
    id: "34",
    title: "The Dark Knight",
    genre: "Superhero",
    budget: "$185M",
    region: "Global",
    duration: "152 min",
    posterUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=450&fit=crop",
    director: "Christopher Nolan",
    status: "Active",
    rating: "9.4",
    year: "2008",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    id: "35",
    title: "Interstellar",
    genre: "Sci-Fi",
    budget: "$165M",
    region: "Global",
    duration: "169 min",
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop",
    director: "Christopher Nolan",
    status: "Active",
    rating: "9.2",
    year: "2014",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: "36",
    title: "The Shawshank Redemption",
    genre: "Drama",
    budget: "$25M",
    region: "Global",
    duration: "142 min",
    posterUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
    director: "Frank Darabont",
    status: "Active",
    rating: "9.5",
    year: "1994",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    id: "37",
    title: "Pulp Fiction",
    genre: "Crime",
    budget: "$8M",
    region: "Global",
    duration: "154 min",
    posterUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&h=450&fit=crop",
    director: "Quentin Tarantino",
    status: "Active",
    rating: "9.1",
    year: "1994",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
  },
  {
    id: "38",
    title: "Fight Club",
    genre: "Drama",
    budget: "$63M",
    region: "Global",
    duration: "139 min",
    posterUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
    director: "David Fincher",
    status: "Active",
    rating: "9.0",
    year: "1999",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more."
  },
  {
    id: "39",
    title: "The Matrix",
    genre: "Sci-Fi",
    budget: "$63M",
    region: "Global",
    duration: "136 min",
    posterUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=450&fit=crop",
    director: "Lana Wachowski",
    status: "Active",
    rating: "9.3",
    year: "1999",
    description: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free."
  },
  {
    id: "40",
    title: "Forrest Gump",
    genre: "Drama",
    budget: "$55M",
    region: "Global",
    duration: "142 min",
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop",
    director: "Robert Zemeckis",
    status: "Active",
    rating: "9.1",
    year: "1994",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75."
  }
]

const regionalCinema = [
  {
    id: "41",
    title: "KGF: Chapter 1",
    genre: "Action",
    budget: "$15M",
    region: "Karnataka",
    duration: "156 min",
    posterUrl: getPosterImage(1),
    director: "Prashanth Neel",
    status: "Active",
    rating: "8.8",
    year: "2018",
    description: "In the 1970s, a fierce rebel rises against brutal oppression and becomes the symbol of hope to legions of downtrodden people."
  },
  {
    id: "42",
    title: "Baahubali: The Beginning",
    genre: "Action",
    budget: "$40M",
    region: "Telugu",
    duration: "159 min",
    posterUrl: getPosterImage(2),
    director: "S.S. Rajamouli",
    status: "Active",
    rating: "9.2",
    year: "2015",
    description: "In ancient India, an adventurous and daring man becomes involved in a decades-old feud between two warring peoples."
  },
  {
    id: "43",
    title: "Ponniyin Selvan: Part 1",
    genre: "Drama",
    budget: "$35M",
    region: "Tamil",
    duration: "167 min",
    posterUrl: getPosterImage(3),
    director: "Mani Ratnam",
    status: "Active",
    rating: "8.9",
    year: "2022",
    description: "Vandiyathevan, a charming young man, sets out to deliver a message from the Crown Prince Aditha Karikalan to the King and Queen."
  },
  {
    id: "44",
    title: "Pushpa: The Rise",
    genre: "Action",
    budget: "$25M",
    region: "Telugu",
    duration: "179 min",
    posterUrl: getPosterImage(4),
    director: "Sukumar",
    status: "Active",
    rating: "8.7",
    year: "2021",
    description: "A laborer rises through the ranks of a red sandalwood smuggling syndicate, making some powerful enemies in the process."
  },
  {
    id: "45",
    title: "Kantara",
    genre: "Action",
    budget: "$16M",
    region: "Karnataka",
    duration: "150 min",
    posterUrl: getPosterImage(5),
    director: "Rishab Shetty",
    status: "Active",
    rating: "9.1",
    year: "2022",
    description: "A Kambala champion's story with the backdrop of a centuries-old tradition and a divine conflict."
  },
  {
    id: "46",
    title: "Vikram",
    genre: "Action",
    budget: "$20M",
    region: "Tamil",
    duration: "175 min",
    posterUrl: getPosterImage(6),
    director: "Lokesh Kanagaraj",
    status: "Active",
    rating: "8.8",
    year: "2022",
    description: "A special investigator is assigned a case of serial killings, but he finds it is not what it seems to be and leading down this path is going to cost him everything."
  },
  {
    id: "47",
    title: "RRR",
    genre: "Action",
    budget: "$72M",
    region: "Telugu",
    duration: "182 min",
    posterUrl: getPosterImage(7),
    director: "S.S. Rajamouli",
    status: "Active",
    rating: "9.5",
    year: "2022",
    description: "A tale of two legendary revolutionaries and their journey far away from home."
  },
  {
    id: "48",
    title: "Jai Bhim",
    genre: "Drama",
    budget: "$8M",
    region: "Tamil",
    duration: "164 min",
    posterUrl: getPosterImage(8),
    director: "T.J. Gnanavel",
    status: "Active",
    rating: "9.4",
    year: "2021",
    description: "When a tribal man is arrested for a case of alleged theft, his wife turns to a human-rights lawyer to help bring justice."
  }
]

const webSeries = [
  {
    id: "49",
    title: "Sacred Games",
    genre: "Crime",
    budget: "$15M",
    region: "India",
    duration: "Season 1",
    posterUrl: getPosterImage(9),
    director: "Vikramaditya Motwane",
    status: "Active",
    rating: "8.9",
    year: "2018",
    description: "A troubled police officer is drawn into a web of conspiracy as he investigates the disappearance of a powerful criminal."
  },
  {
    id: "50",
    title: "Mirzapur",
    genre: "Crime",
    budget: "$12M",
    region: "India",
    duration: "Season 2",
    posterUrl: getPosterImage(10),
    director: "Karan Anshuman",
    status: "Active",
    rating: "8.8",
    year: "2018",
    description: "A story of two brothers who arrive in Mirzapur to become the biggest mafia of the city."
  },
  {
    id: "51",
    title: "Panchayat",
    genre: "Comedy",
    budget: "$5M",
    region: "India",
    duration: "Season 2",
    posterUrl: getPosterImage(11),
    director: "Deepak Kumar Mishra",
    status: "Active",
    rating: "9.2",
    year: "2020",
    description: "A graduate from a city engineering college finds himself in a dilemma when he is forced to work as a Panchayat secretary in a remote village."
  },
  {
    id: "52",
    title: "The Family Man",
    genre: "Action",
    budget: "$18M",
    region: "India",
    duration: "Season 2",
    posterUrl: getPosterImage(12),
    director: "Raj Nidimoru",
    status: "Active",
    rating: "8.9",
    year: "2019",
    description: "A middle-class man secretly works for a special cell of the National Investigation Agency."
  },
  {
    id: "53",
    title: "Scam 1992",
    genre: "Drama",
    budget: "$10M",
    region: "India",
    duration: "Season 1",
    posterUrl: getPosterImage(13),
    director: "Hansal Mehta",
    status: "Active",
    rating: "9.5",
    year: "2020",
    description: "The story of Harshad Mehta, a stockbroker who took the stock market to dizzying heights and his catastrophic downfall."
  },
  {
    id: "54",
    title: "Aspirants",
    genre: "Drama",
    budget: "$3M",
    region: "India",
    duration: "Season 1",
    posterUrl: getPosterImage(14),
    director: "Apoorv Singh Karki",
    status: "Active",
    rating: "9.1",
    year: "2021",
    description: "The story of three friends who are preparing for the UPSC examination and their journey through life."
  },
  {
    id: "55",
    title: "Kota Factory",
    genre: "Comedy",
    budget: "$2M",
    region: "India",
    duration: "Season 2",
    posterUrl: getPosterImage(15),
    director: "Raghav Subbu",
    status: "Active",
    rating: "8.7",
    year: "2019",
    description: "A story about students preparing for IIT-JEE in Kota, Rajasthan."
  },
  {
    id: "56",
    title: "Delhi Crime",
    genre: "Crime",
    budget: "$8M",
    region: "India",
    duration: "Season 1",
    posterUrl: getPosterImage(0),
    director: "Richie Mehta",
    status: "Active",
    rating: "8.8",
    year: "2019",
    description: "The story of the Delhi Police's investigation into the 2012 Delhi gang rape case."
  }
]

// Sample data for trending collections
const trendingCollections = [
  {
    id: "1",
    title: "The Last Horizon",
    genre: "Sci-Fi",
    budget: "$25M",
    posterUrl: getPosterImage(1),
    status: "Active"
  },
  {
    id: "2",
    title: "Midnight Masquerade",
    genre: "Mystery",
    budget: "$12M",
    posterUrl: getPosterImage(2),
    status: "Active"
  },
  {
    id: "3",
    title: "Desert Dreams",
    genre: "Fantasy",
    budget: "$20M",
    posterUrl: getPosterImage(3),
    status: "Active"
  },
  {
    id: "4",
    title: "The Silent Echo",
    genre: "Thriller",
    budget: "$15M",
    posterUrl: getPosterImage(4),
    status: "Active"
  }
]

export default function Home() {
  const router = useRouter()
  const [selectedMovie, setSelectedMovie] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMovieClick = (movieId: string) => {
    const movie = movieData[movieId as keyof typeof movieData]
    if (movie) {
      setSelectedMovie(movie)
      setIsModalOpen(true)
    }
  }

  const handleOpenFullPage = (movieId: string) => {
    setIsModalOpen(false)
    router.push(`/build/movie/${movieId}/`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section - Text left, image visible right */}
        <section className="relative h-[80vh] min-h-[500px] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.0) 100%), url(https://cinflixmeia.github.io/build/herolanscapeposter.jpg)`
              }}
            />
          </div>
          {/* Content Row */}
          <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center h-full">
            {/* Left: Text Content */}
            <div className="flex-1 flex flex-col justify-center items-start max-w-xl py-16 md:py-0">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight text-left">
                Film IP Deal-Making, Done Right.
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg sm:text-xl font-semibold px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-200 group"
                >
                  <DollarSign className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  Buy Content
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 text-lg sm:text-xl font-semibold px-8 py-4 h-auto backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-200 group dark:border-white/30 dark:text-white dark:hover:bg-white/10 border-gray-200 text-gray-900 hover:bg-gray-100/80"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  Sell Content
                </Button>
              </div>
              <p className="text-white/90 text-lg sm:text-xl max-w-lg text-left">
                Learn about Cinflix's innovative film IP deal-making platform →
              </p>
            </div>
            {/* Right: Empty for image visibility on desktop */}
            <div className="flex-1 hidden md:block" />
          </div>
        </section>

        {/* Latest Releases Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <ContentCarousel 
              title="Latest Releases" 
              projects={latestReleases}
              showDetails={true}
              onMovieClick={handleMovieClick}
            />
          </div>
        </section>

        {/* Category Cards Section */}
        <section className="py-8 bg-muted/10">
          <div className="container mx-auto px-4">
            <CategoryCarousel />
          </div>
        </section>

        {/* Top Rated on IMDb Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-muted/10">
          <div className="container mx-auto px-4">
            <ContentCarousel 
              title="Top Rated on IMDb" 
              projects={topRatedImdb}
              showDetails={true}
              onMovieClick={handleMovieClick}
            />
          </div>
        </section>

        {/* Trending Now Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <ContentCarousel 
              title="Trending Now" 
              projects={trendingNow}
              showDetails={true}
              onMovieClick={handleMovieClick}
            />
          </div>
        </section>

        {/* Bollywood Classics Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-muted/10">
          <div className="container mx-auto px-4">
            <ContentCarousel 
              title="Bollywood Classics" 
              projects={bollywoodClassics}
              showDetails={true}
              onMovieClick={handleMovieClick}
            />
          </div>
        </section>

        {/* International Hits Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <ContentCarousel 
              title="International Hits" 
              projects={internationalHits}
              showDetails={true}
              onMovieClick={handleMovieClick}
            />
          </div>
        </section>

        {/* Regional Cinema Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-muted/10">
          <div className="container mx-auto px-4">
            <ContentCarousel 
              title="Regional Cinema" 
              projects={regionalCinema}
              showDetails={true}
              onMovieClick={handleMovieClick}
            />
          </div>
        </section>

        {/* Web Series Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <ContentCarousel 
              title="Web Series" 
              projects={webSeries}
              showDetails={true}
              onMovieClick={handleMovieClick}
            />
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="py-16 sm:py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Deals</h3>
                <p className="text-muted-foreground">
                  Protected transactions and verified content rights for safe film IP trading.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Global Network</h3>
                <p className="text-muted-foreground">
                  Connect with filmmakers and investors worldwide in our trusted community.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Process</h3>
                <p className="text-muted-foreground">
                  Streamlined deal-making process from pitch to production.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenFullPage={handleOpenFullPage}
      />
      

      

    </div>
  )
}
