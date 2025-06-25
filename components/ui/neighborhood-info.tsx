"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Car, ShoppingBag, GraduationCap, Hospital, Coffee } from "lucide-react"

interface NeighborhoodInfoProps {
  address: string
}

// Mock neighborhood data
const getNeighborhoodInfo = (address: string) => {
  const mockData = {
    walkScore: 85,
    transitScore: 72,
    bikeScore: 68,
    crimeRating: "Low",
    schoolRating: 8.5,
    nearbyAmenities: [
      { name: "Whole Foods Market", type: "Grocery", distance: "0.3 mi", icon: ShoppingBag },
      { name: "Central Park", type: "Park", distance: "0.5 mi", icon: MapPin },
      { name: "Metro Station", type: "Transit", distance: "0.2 mi", icon: Car },
      { name: "Roosevelt Elementary", type: "School", distance: "0.4 mi", icon: GraduationCap },
      { name: "City Hospital", type: "Healthcare", distance: "0.8 mi", icon: Hospital },
      { name: "Starbucks", type: "Coffee", distance: "0.1 mi", icon: Coffee },
    ],
    demographics: {
      medianAge: 34,
      medianIncome: "$75,000",
      ownerOccupied: "68%",
    },
    marketTrends: {
      priceChange: "+5.2%",
      daysOnMarket: 28,
      pricePerSqFt: "$450",
    },
  }

  return mockData
}

export function NeighborhoodInfo({ address }: NeighborhoodInfoProps) {
  const info = getNeighborhoodInfo(address)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (score >= 60) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <div className="space-y-6">
      {/* Walkability Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bricolage">Walkability & Transit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(info.walkScore)}`}>{info.walkScore}</div>
              <p className="text-sm text-muted-foreground">Walk Score</p>
              <Badge className={getScoreBadge(info.walkScore)}>
                {info.walkScore >= 80 ? "Very Walkable" : info.walkScore >= 60 ? "Somewhat Walkable" : "Car-Dependent"}
              </Badge>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(info.transitScore)}`}>{info.transitScore}</div>
              <p className="text-sm text-muted-foreground">Transit Score</p>
              <Badge className={getScoreBadge(info.transitScore)}>
                {info.transitScore >= 80 ? "Excellent" : info.transitScore >= 60 ? "Good" : "Some Transit"}
              </Badge>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(info.bikeScore)}`}>{info.bikeScore}</div>
              <p className="text-sm text-muted-foreground">Bike Score</p>
              <Badge className={getScoreBadge(info.bikeScore)}>
                {info.bikeScore >= 80
                  ? "Very Bikeable"
                  : info.bikeScore >= 60
                    ? "Bikeable"
                    : "Some Bike Infrastructure"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Amenities */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bricolage">Nearby Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {info.nearbyAmenities.map((amenity, index) => {
              const Icon = amenity.icon
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{amenity.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {amenity.type} • {amenity.distance}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Safety & Schools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-bricolage">Safety & Schools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Crime Rating</span>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                {info.crimeRating}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">School Rating</span>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{info.schoolRating}/10</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-bricolage">Demographics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Median Age</span>
              <span className="font-semibold">{info.demographics.medianAge}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Median Income</span>
              <span className="font-semibold">{info.demographics.medianIncome}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Owner Occupied</span>
              <span className="font-semibold">{info.demographics.ownerOccupied}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bricolage">Market Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{info.marketTrends.priceChange}</div>
              <p className="text-sm text-muted-foreground">Price Change (YoY)</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{info.marketTrends.daysOnMarket}</div>
              <p className="text-sm text-muted-foreground">Days on Market</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{info.marketTrends.pricePerSqFt}</div>
              <p className="text-sm text-muted-foreground">Price per Sq Ft</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
