"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Mail, ArrowRight, Shield, TrendingUp, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatCard } from "@/components/ui/stat-card"

const companies = [
  { name: "Coinbase", logo: "/placeholder.svg" },
  { name: "Linear", logo: "/placeholder.svg" },
  { name: "Webflow", logo: "/placeholder.svg" },
  { name: "Finder", logo: "/placeholder.svg" },
]

const popularListings = [
  {
    id: 1,
    image: "/images/luxury-apartment.jpg",
    price: "$5,970",
    title: "Tranquil Haven",
    location: "New York, NY • 3 Bedrooms, 3 Bathrooms",
    rating: 4.9,
    type: "For Sale",
  },
  {
    id: 2,
    image: "/images/beachfront-villa.jpg",
    price: "$1,970",
    title: "Serene Retreat",
    location: "Miami, FL • 2 Bedrooms, 2 Bathrooms",
    rating: 4.8,
    type: "For Rent",
  },
  {
    id: 3,
    image: "/images/mountain-chalet.jpg",
    price: "$3,970",
    title: "Urban Oasis",
    location: "Los Angeles, CA • 4 Bedrooms, 3 Bathrooms",
    rating: 4.9,
    type: "For Sale",
  },
  {
    id: 4,
    image: "/images/urban-loft.jpg",
    price: "$2,970",
    title: "Hillside Haven",
    location: "San Francisco, CA • 3 Bedrooms, 2 Bathrooms",
    rating: 4.7,
    type: "For Rent",
  },
  {
    id: 5,
    image: "/images/suburban-home.jpg",
    price: "$4,970",
    title: "The Cambridge Villa",
    location: "Boston, MA • 5 Bedrooms, 4 Bathrooms",
    rating: 4.8,
    type: "For Sale",
  },
  {
    id: 6,
    image: "/images/commercial-building.jpg",
    price: "$6,970",
    title: "Rooftop Heights",
    location: "Chicago, IL • 3 Bedrooms, 3 Bathrooms",
    rating: 4.9,
    type: "For Sale",
  },
]

const cities = [
  { name: "Canada", image: "/images/luxury-apartment.jpg" },
  { name: "USA", image: "/images/beachfront-villa.jpg" },
  { name: "Australia", image: "/images/mountain-chalet.jpg" },
  { name: "Dubai", image: "/images/urban-loft.jpg" },
]

const agents = [
  {
    name: "David Liam",
    role: "UI Designer",
    image: "/placeholder.svg",
    rating: 4.9,
    properties: 25,
  },
  {
    name: "Maria Wilson",
    role: "UI Designer",
    image: "/placeholder.svg",
    rating: 4.8,
    properties: 30,
  },
  {
    name: "Alex Hamilton",
    role: "UI Designer",
    image: "/placeholder.svg",
    rating: 4.9,
    properties: 28,
  },
]

const features = [
  {
    icon: Shield,
    title: "Secure & Transparent",
    description: "Built on blockchain technology with full transparency and security.",
  },
  {
    icon: TrendingUp,
    title: "High Yields",
    description: "Earn competitive yields on your real estate investments.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a community of investors shaping the future of real estate.",
  },
  {
    icon: Zap,
    title: "Instant Liquidity",
    description: "Trade your real estate tokens instantly on our marketplace.",
  },
]

const stats = [
  { title: "Total Value Locked", value: "$3.5M", change: "+12.5%", changeType: "positive" as const },
  { title: "Properties Listed", value: "1,247", change: "+8.2%", changeType: "positive" as const },
  { title: "Active Investors", value: "15,432", change: "+15.1%", changeType: "positive" as const },
  { title: "Average APY", value: "5.2%", change: "+0.3%", changeType: "positive" as const },
]

export default function HomePage() {
  const [searchType, setSearchType] = useState("Buy")

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-6">
                <h1 className="font-bricolage text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  The Future of <span className="text-primary">Real Estate</span> Investment
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Lotwise V2 is a decentralized platform that tokenizes real estate properties into 1,000 ERC-721 tokens
                  per property (e.g., $1,000 each for a $1M property), enabling fractional ownership. It integrates with
                  Aave for users to supply tokens as collateral, borrow assets, and earn yield (e.g., 5.2% APY), while
                  distributing profits automatically.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/invest">
                    Start Investing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image src="/images/luxury-apartment.jpg" alt="Modern house" fill className="object-cover" />
              </div>

              {/* Floating Cards */}
              <div
                className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-bounce-in"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-sm text-muted-foreground">Powered by Chainlink</div>
                <div className="font-semibold">Functions, CCIP, Data Feeds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-muted-foreground text-lg">
              Powered by Chainlink (Functions for data verification, CCIP for cross-chain transfers across Ethereum and
              Polygon, Data Feeds for price updates, and Automation for management), it features a marketplace for
              instant token trading, real-time analytics, and liquidation monitoring to ensure safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="text-center hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bricolage font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="font-bricolage text-2xl font-bold mb-2">1250+ Companies</h2>
            <p className="text-muted-foreground">Trust by us.</p>
          </div>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {companies.map((company, index) => (
              <div key={company.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="h-8 w-24 bg-muted rounded flex items-center justify-center">
                  <span className="text-sm font-medium">{company.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Listings */}
      <section className="py-20">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-12">
            <div className="animate-slide-up">
              <h2 className="font-bricolage text-3xl font-bold mb-2">Popular Listings</h2>
              <p className="text-muted-foreground">Explore latest and featured properties for sale and rent</p>
            </div>
            <Button variant="outline" className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Explore All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularListings.map((listing, index) => (
              <Card
                key={listing.id}
                className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video relative">
                  <Image src={listing.image || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
                  <Badge className="absolute top-3 left-3 bg-primary">{listing.type}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{listing.title}</h3>
                      <div className="text-right">
                        <div className="font-bold text-lg">{listing.price}</div>
                        <div className="text-sm text-muted-foreground">/month</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{listing.location}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{listing.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-12">
            <div className="animate-slide-up">
              <h2 className="font-bricolage text-3xl font-bold">Popular Cities</h2>
            </div>
            <Button variant="outline" className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Explore All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cities.map((city, index) => (
              <div
                key={city.name}
                className="text-center animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square relative rounded-full overflow-hidden mb-4 mx-auto w-32 h-32">
                  <Image src={city.image || "/placeholder.svg"} alt={city.name} fill className="object-cover" />
                </div>
                <h3 className="font-semibold">{city.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listing */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative animate-fade-in">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image src="/images/beachfront-villa.jpg" alt="Featured property" fill className="object-cover" />
              </div>
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg">
                <div className="text-sm font-medium">Panorama Residences</div>
              </div>
            </div>

            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div>
                <h2 className="font-bricolage text-3xl font-bold mb-4">Featured Listing</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-primary text-2xl font-bold">"</div>
                    <div>
                      <p className="text-lg mb-2">
                        <span className="font-semibold">Extraordinary performance.</span> Quick solutions. Highly
                        recommended.
                      </p>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">John Doe</div>
                          <div className="text-sm text-muted-foreground">UI Designer</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold">1500+</div>
                  <div className="text-muted-foreground">Properties Listed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">1.9M+</div>
                  <div className="text-muted-foreground">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="font-bricolage text-3xl font-bold">What Our Clients Say About Us</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 animate-scale-in">
              <div className="flex items-start space-x-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>MM</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-lg mb-4">
                    "Working with this team was a pleasure! They helped us find a property that exceeded our
                    expectations. We couldn't have done it without them!"
                  </p>
                  <div>
                    <div className="font-semibold">Martha Miller</div>
                    <div className="text-sm text-muted-foreground">UI Designer</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Agents */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="font-bricolage text-3xl font-bold">Our Agents</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {agents.map((agent, index) => (
              <Card
                key={agent.name}
                className="text-center p-6 animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={agent.image || "/placeholder.svg"} />
                  <AvatarFallback>
                    {agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-1">{agent.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{agent.role}</p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{agent.rating}</span>
                  </div>
                  <div>{agent.properties} Properties</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-primary hover:bg-primary/90 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              View All Agents
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-primary/10">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <h2 className="font-bricolage text-3xl font-bold mb-4">Stay Updated on Latest Property</h2>
            <p className="text-muted-foreground mb-8">Subscribe to our newsletter for the latest updates</p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button className="bg-primary hover:bg-primary/90">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold">Ready to Start Investing?</h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of investors who are already earning yields on tokenized real estate. All accessible via a
              user-friendly interface as of June 25, 2025, 02:09 PM WAT.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/invest">
                  Browse Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
