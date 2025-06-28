"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Star, TrendingUp, Users, Shield, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { GoogleMap } from "@/components/ui/google-map"
import { NeighborhoodInfo } from "@/components/ui/neighborhood-info"
import { Sidebar } from "@/components/layout/sidebar"
import { useUIStore } from "@/lib/store"
import { cn } from "@/lib/utils"

// Mock property data - in real app this would come from API
const property = {
  id: 1,
  title: "Luxury Downtown Apartment",
  location: "123 Main Street, New York, NY 10001",
  images: [
    "/images/luxury-apartment.jpg",
    "/images/beachfront-villa.jpg",
    "/images/mountain-chalet.jpg",
    "/images/urban-loft.jpg",
  ],
  price: 1000000,
  tokenPrice: 1000,
  totalTokens: 1000,
  availableTokens: 750,
  soldTokens: 250,
  apy: 5.2,
  type: "Residential",
  bedrooms: 3,
  bathrooms: 2,
  sqft: 1500,
  rating: 4.8,
  riskLevel: "Low",
  yearBuilt: 2020,
  description:
    "A stunning luxury apartment in the heart of downtown Manhattan. This modern residence features floor-to-ceiling windows, premium finishes, and access to world-class amenities including a rooftop terrace, fitness center, and concierge services.",
  amenities: [
    "Rooftop Terrace",
    "Fitness Center",
    "Concierge Services",
    "In-unit Laundry",
    "Parking Garage",
    "Pet Friendly",
    "24/7 Security",
    "Swimming Pool",
  ],
  coordinates: { lat: 40.7128, lng: -74.006 },
  monthlyRent: 4500,
  occupancyRate: 95,
  propertyManager: "Premium Properties LLC",
  lastValuation: "2024-01-15",
  nextValuation: "2024-07-15",
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [investmentAmount, setInvestmentAmount] = useState("")
  const { sidebarOpen } = useUIStore()

  const tokensToBuy = investmentAmount ? Math.floor(Number(investmentAmount) / property.tokenPrice) : 0
  const totalCost = tokensToBuy * property.tokenPrice
  const estimatedMonthlyReturn = (totalCost * property.apy) / 100 / 12

  return (
    <div className="flex">
      <Sidebar />
      <div className={cn("flex-1 transition-all duration-300", sidebarOpen ? "ml-64" : "ml-16")}>
        <div className="container px-4 py-8 space-y-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/app/invest">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </Button>

          {/* Property Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Gallery */}
            <div className="lg:col-span-2 space-y-4">
              <div className="aspect-video relative rounded-xl overflow-hidden">
                <Image
                  src={property.images[selectedImage] || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "aspect-video relative rounded-lg overflow-hidden border-2 transition-colors",
                      selectedImage === index ? "border-primary" : "border-transparent",
                    )}
                  >
                    <Image src={image || "/placeholder.svg"} alt={`View ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Investment Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Investment Details</span>
                    <Badge variant="secondary">{property.type}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Token Price</span>
                      <span className="font-semibold">${property.tokenPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">APY</span>
                      <span className="font-semibold text-green-600">{property.apy}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Risk Level</span>
                      <Badge
                        variant={
                          property.riskLevel === "Low"
                            ? "default"
                            : property.riskLevel === "Medium"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {property.riskLevel}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="investment">Investment Amount ($)</Label>
                      <Input
                        id="investment"
                        type="number"
                        placeholder="Enter amount"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                      />
                    </div>

                    {investmentAmount && (
                      <div className="space-y-2 p-4 bg-muted rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span>Tokens to buy:</span>
                          <span className="font-medium">{tokensToBuy}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total cost:</span>
                          <span className="font-medium">${totalCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Est. monthly return:</span>
                          <span className="font-medium text-green-600">${estimatedMonthlyReturn.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    <Button className="w-full" disabled={!investmentAmount || tokensToBuy === 0}>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Invest Now
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Available Tokens</span>
                      <span className="font-medium">
                        {property.availableTokens}/{property.totalTokens}
                      </span>
                    </div>
                    <Progress value={(property.soldTokens / property.totalTokens) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground text-center">
                      {((property.soldTokens / property.totalTokens) * 100).toFixed(1)}% sold
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="text-2xl font-bold">{property.rating}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold">{property.occupancyRate}%</div>
                    <div className="text-xs text-muted-foreground">Occupancy</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="space-y-6">
            <div>
              <h1 className="font-bricolage text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">{property.bedrooms} bed</Badge>
                <Badge variant="outline">{property.bathrooms} bath</Badge>
                <Badge variant="outline">{property.sqft.toLocaleString()} sqft</Badge>
                <Badge variant="outline">Built {property.yearBuilt}</Badge>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {property.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financials" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Property Value</span>
                      </div>
                      <div className="text-2xl font-bold">${property.price.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Monthly Rent</span>
                      </div>
                      <div className="text-2xl font-bold">${property.monthlyRent.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Occupancy Rate</span>
                      </div>
                      <div className="text-2xl font-bold">{property.occupancyRate}%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-5 w-5 text-orange-600" />
                        <span className="font-medium">Next Valuation</span>
                      </div>
                      <div className="text-sm font-medium">{property.nextValuation}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Financial Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Annual Percentage Yield (APY)</span>
                        <span className="font-semibold text-green-600">{property.apy}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Property Manager</span>
                        <span className="font-medium">{property.propertyManager}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Last Valuation</span>
                        <span className="font-medium">{property.lastValuation}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Risk Assessment</span>
                        <Badge
                          variant={
                            property.riskLevel === "Low"
                              ? "default"
                              : property.riskLevel === "Medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {property.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Location & Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <GoogleMap
                        center={property.coordinates}
                        zoom={15}
                        markers={[
                          {
                            position: property.coordinates,
                            title: property.title,
                            address: property.location,
                          },
                        ]}
                        className="h-64 w-full rounded-lg"
                      />
                    </CardContent>
                  </Card>
                  <NeighborhoodInfo location={property.location} />
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Property Deed</div>
                          <div className="text-sm text-muted-foreground">Legal ownership document</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Financial Statements</div>
                          <div className="text-sm text-muted-foreground">Q4 2023 financial report</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Property Inspection Report</div>
                          <div className="text-sm text-muted-foreground">Latest inspection results</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Insurance Policy</div>
                          <div className="text-sm text-muted-foreground">Current insurance coverage</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
