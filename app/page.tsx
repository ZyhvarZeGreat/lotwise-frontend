"use client"
import Image from "next/image"
import Link from "next/link"
import { Star, ArrowRight, Shield, TrendingUp, Users, Zap, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Landing Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8">
              <svg viewBox="0 0 340 340" className="w-full h-full">
                <path
                  d="M170.013 46.3719C200.768 96.7283 254.345 131.635 316.386 136.702C318.801 147.397 320.089 158.536 320.089 170C320.089 252.892 252.895 320.089 170.013 320.089C87.1273 320.089 19.9118 252.888 19.9118 170C19.9118 158.534 21.189 147.387 23.611 136.704C85.6655 131.646 139.254 96.7363 170.013 46.3719Z"
                  stroke="currentColor"
                  strokeWidth="39.646"
                  fill="none"
                  className="text-primary"
                />
              </svg>
            </div>
            <span className="font-bricolage font-bold text-xl">Lotwise V2</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#properties"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Properties
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/docs">Learn More</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/app">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-6">
                <Badge variant="outline" className="w-fit">
                  🚀 Now Live on Ethereum & Polygon
                </Badge>
                <h1 className="font-bricolage text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  The Future of <span className="text-primary">Real Estate</span> Investment
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Lotwise V2 tokenizes real estate into 1,000 ERC-721 tokens per property, enabling fractional
                  ownership. Integrate with Aave to earn yield, trade instantly, and access global real estate markets.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/app">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group">
                  <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                <div>
                  <div className="text-2xl font-bold">$3.5M+</div>
                  <div className="text-sm text-muted-foreground">Total Value Locked</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-sm text-muted-foreground">Properties Listed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">15K+</div>
                  <div className="text-sm text-muted-foreground">Active Investors</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image src="/images/luxury-apartment.jpg" alt="Modern luxury property" fill className="object-cover" />
              </div>

              {/* Floating Cards */}
              <div
                className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-bounce-in"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-sm text-muted-foreground">Powered by</div>
                <div className="font-semibold">Chainlink & Aave</div>
              </div>

              <div
                className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-bounce-in"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-sm text-muted-foreground">Average APY</div>
                <div className="font-semibold text-green-600">5.2%</div>
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
      <section id="features" className="py-20">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold mb-4">Why Choose Lotwise V2?</h2>
            <p className="text-muted-foreground text-lg">
              Built with cutting-edge blockchain technology and integrated with leading DeFi protocols
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
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

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Get started with tokenized real estate in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="font-bricolage font-semibold text-lg mb-2">Connect Wallet</h3>
              <p className="text-muted-foreground text-sm">
                Connect your Web3 wallet to access the platform and start investing
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="font-bricolage font-semibold text-lg mb-2">Browse Properties</h3>
              <p className="text-muted-foreground text-sm">
                Explore tokenized real estate properties and choose your investments
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="font-bricolage font-semibold text-lg mb-2">Earn Yield</h3>
              <p className="text-muted-foreground text-sm">
                Supply tokens as collateral on Aave and earn competitive yields
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link href="/app">
                Start Investing Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Properties Preview */}
      <section id="properties" className="py-20">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-12">
            <div className="animate-slide-up">
              <h2 className="font-bricolage text-3xl font-bold mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">Discover premium tokenized real estate opportunities</p>
            </div>
            <Button variant="outline" asChild className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Link href="/app/invest">View All Properties</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularListings.map((listing, index) => (
              <Card
                key={listing.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
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
                        <div className="text-sm text-muted-foreground">per token</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{listing.location}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{listing.rating}</span>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/app/properties/${listing.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold">Ready to Start Your Real Estate Journey?</h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of investors who are already earning yields on tokenized real estate. Start with as little
              as $100 and build your diversified property portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/app">
                  Get Started Today
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

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8">
                  <svg viewBox="0 0 340 340" className="w-full h-full">
                    <path
                      d="M170.013 46.3719C200.768 96.7283 254.345 131.635 316.386 136.702C318.801 147.397 320.089 158.536 320.089 170C320.089 252.892 252.895 320.089 170.013 320.089C87.1273 320.089 19.9118 252.888 19.9118 170C19.9118 158.534 21.189 147.387 23.611 136.704C85.6655 131.646 139.254 96.7363 170.013 46.3719Z"
                      stroke="currentColor"
                      strokeWidth="39.646"
                      fill="none"
                      className="text-primary"
                    />
                  </svg>
                </div>
                <span className="font-bricolage font-bold text-xl">Lotwise V2</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The future of real estate investment through blockchain technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/app/invest" className="hover:text-primary transition-colors">
                    Browse Properties
                  </Link>
                </li>
                <li>
                  <Link href="/app/earn" className="hover:text-primary transition-colors">
                    Earn Yield
                  </Link>
                </li>
                <li>
                  <Link href="/app/portfolio" className="hover:text-primary transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/app/liquidations" className="hover:text-primary transition-colors">
                    Liquidations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs" className="hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Whitepaper
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Lotwise V2. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
