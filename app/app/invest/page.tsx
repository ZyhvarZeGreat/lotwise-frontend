"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Star, MapPin, TrendingUp, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyCard } from "@/components/ui/property-card"
import { Sidebar } from "@/components/layout/sidebar"
import { useUIStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const properties = [
  {
    id: 1,
    image: "/images/luxury-apartment.jpg",
    title: "Luxury Downtown Apartment",
    location: "New York, NY",
    price: 1000000,
    tokenPrice: 1000,
    totalTokens: 1000,
    availableTokens: 750,
    apy: 5.2,
    type: "Residential",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    rating: 4.8,
    riskLevel: "Low",
  },
  {
    id: 2,
    image: "/images/beachfront-villa.jpg",
    title: "Beachfront Villa",
    location: "Miami, FL",
    price: 2500000,
    tokenPrice: 2500,
    totalTokens: 1000,
    availableTokens: 400,
    apy: 6.1,
    type: "Residential",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3200,
    rating: 4.9,
    riskLevel: "Medium",
  },
  {
    id: 3,
    image: "/images/commercial-building.jpg",
    title: "Commercial Office Building",
    location: "San Francisco, CA",
    price: 5000000,
    tokenPrice: 5000,
    totalTokens: 1000,
    availableTokens: 200,
    apy: 7.3,
    type: "Commercial",
    bedrooms: 0,
    bathrooms: 0,
    sqft: 15000,
    rating: 4.7,
    riskLevel: "High",
  },
  {
    id: 4,
    image: "/images/suburban-home.jpg",
    title: "Suburban Family Home",
    location: "Austin, TX",
    price: 750000,
    tokenPrice: 750,
    totalTokens: 1000,
    availableTokens: 600,
    apy: 4.8,
    type: "Residential",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
    rating: 4.6,
    riskLevel: "Low",
  },
  {
    id: 5,
    image: "/images/retail-center.jpg",
    title: "Retail Shopping Center",
    location: "Los Angeles, CA",
    price: 3200000,
    tokenPrice: 3200,
    totalTokens: 1000,
    availableTokens: 300,
    apy: 6.8,
    type: "Commercial",
    bedrooms: 0,
    bathrooms: 0,
    sqft: 25000,
    rating: 4.5,
    riskLevel: "Medium",
  },
  {
    id: 6,
    image: "/images/mountain-chalet.jpg",
    title: "Mountain Chalet",
    location: "Denver, CO",
    price: 1200000,
    tokenPrice: 1200,
    totalTokens: 1000,
    availableTokens: 450,
    apy: 5.5,
    type: "Residential",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    rating: 4.7,
    riskLevel: "Medium",
  },
]

const stats = [
  { title: "Total Properties", value: "1,247", change: "+12.5%", changeType: "positive" as const },
  { title: "Total Value", value: "$2.1B", change: "+8.2%", changeType: "positive" as const },
  { title: "Avg. APY", value: "5.8%", change: "+0.3%", changeType: "positive" as const },
  { title: "Active Investors", value: "15,432", change: "+15.1%", changeType: "positive" as const },
]

export default function InvestPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("apy")
  const { sidebarOpen } = useUIStore()

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || property.type.toLowerCase() === selectedType.toLowerCase()
    const matchesLocation = selectedLocation === "all" || property.location.includes(selectedLocation)

    return matchesSearch && matchesType && matchesLocation
  })

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "apy":
        return b.apy - a.apy
      case "price":
        return a.tokenPrice - b.tokenPrice
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="flex">
      <Sidebar />
      <div className={cn("flex-1 transition-all duration-300", sidebarOpen ? "ml-64" : "ml-16")}>
        <div className="container px-4 py-8 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-bricolage text-3xl font-bold">Investment Properties</h1>
            <p className="text-muted-foreground">Discover and invest in tokenized real estate properties</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div
                      className={cn(
                        "flex items-center text-sm",
                        stat.changeType === "positive" ? "text-green-600" : "text-red-600",
                      )}
                    >
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search properties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Property Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Miami">Miami</SelectItem>
                      <SelectItem value="San Francisco">San Francisco</SelectItem>
                      <SelectItem value="Austin">Austin</SelectItem>
                      <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                      <SelectItem value="Denver">Denver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by APY" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apy">Highest APY</SelectItem>
                      <SelectItem value="price">Lowest Price</SelectItem>
                      <SelectItem value="rating">Highest Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Properties Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bricolage text-xl font-semibold">Available Properties ({sortedProperties.length})</h2>
              <Tabs defaultValue="grid" className="w-auto">
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Tabs defaultValue="grid" className="w-full">
              <TabsContent value="grid">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="list">
                <div className="space-y-4">
                  {sortedProperties.map((property) => (
                    <Card key={property.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-6">
                          <div className="relative w-32 h-24 rounded-lg overflow-hidden">
                            <Image
                              src={property.image || "/placeholder.svg"}
                              alt={property.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{property.title}</h3>
                                <div className="flex items-center text-muted-foreground text-sm">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {property.location}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold">${property.tokenPrice}</div>
                                <div className="text-sm text-muted-foreground">per token</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge variant="secondary">{property.type}</Badge>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="text-sm">{property.rating}</span>
                              </div>
                              <div className="text-sm">
                                <span className="font-medium text-green-600">{property.apy}% APY</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {property.availableTokens}/{property.totalTokens} available
                              </div>
                            </div>
                          </div>
                          <Button asChild>
                            <Link href={`/app/properties/${property.id}`}>
                              View Details
                              <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Empty State */}
          {sortedProperties.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto relative">
                    <Image
                      src="/images/empty-state-properties.jpg"
                      alt="No properties found"
                      fill
                      className="object-cover rounded-full opacity-50"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">No properties found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters to see more properties</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedType("all")
                      setSelectedLocation("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
