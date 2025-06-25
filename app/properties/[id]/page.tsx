"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, MapPin, Calendar, Home, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useTransaction } from "@/hooks/useTransaction"
import { TransactionModal } from "@/components/ui/transaction-modal"
import { GoogleMap } from "@/components/ui/google-map"
import { NeighborhoodInfo } from "@/components/ui/neighborhood-info"

// Mock property data
const propertyData = {
  id: "1",
  name: "123 Main Street",
  description:
    "A beautiful 3-bedroom, 2-bathroom home located in a quiet neighborhood. This property features a spacious living area, a modern kitchen, and a large backyard perfect for entertaining.",
  address: "123 Main Street, Anytown, USA",
  bedrooms: 3,
  bathrooms: 2,
  squareFootage: 1800,
  yearBuilt: 2005,
  propertyType: "Single-Family Home",
  parking: "2-Car Garage",
  lotSize: "0.25 acres",
  tokenPrice: 100,
  totalTokens: 10000,
  marketCap: 1000000,
  currentYield: 6,
  yieldFrequency: "Quarterly",
  nextDividend: "July 15, 2024",
  investmentHighlights:
    "This property offers a stable rental income and potential for capital appreciation. Located in a desirable area with excellent schools and amenities, it's an ideal long-term growth for long-term growth.",
  images: ["/images/luxury-apartment.jpg", "/images/beachfront-villa.jpg", "/images/mountain-chalet.jpg"],
}

export default function PropertyDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const { transaction, executeTransaction, closeTransaction } = useTransaction()

  const propertyDetails = [
    { label: "Address", value: propertyData.address, icon: MapPin },
    { label: "Bedrooms", value: propertyData.bedrooms.toString(), icon: Home },
    { label: "Bathrooms", value: propertyData.bathrooms.toString(), icon: Home },
    { label: "Square Footage", value: `${propertyData.squareFootage} sq ft`, icon: Home },
    { label: "Lot Size", value: propertyData.lotSize, icon: Home },
    { label: "Year Built", value: propertyData.yearBuilt.toString(), icon: Calendar },
    { label: "Property Type", value: propertyData.propertyType, icon: Home },
    { label: "Parking", value: propertyData.parking, icon: Car },
  ]

  const financialInfo = [
    { label: "Token Price", value: `$${propertyData.tokenPrice}` },
    { label: "Total Tokens", value: propertyData.totalTokens.toLocaleString() },
    { label: "Market Cap", value: `$${propertyData.marketCap.toLocaleString()}` },
    { label: "Current Yield", value: `${propertyData.currentYield}%` },
    { label: "Yield Frequency", value: propertyData.yieldFrequency },
    { label: "Next Dividend", value: propertyData.nextDividend },
  ]

  const handleBuyTokens = async () => {
    try {
      await executeTransaction(
        async () => {
          // Mock transaction - replace with actual Web3 call
          return { hash: "0x" + Math.random().toString(16).substr(2, 64) }
        },
        "Purchase Property Tokens",
        `Purchasing 100 tokens for ${propertyData.name}`,
      )
    } catch (error) {
      console.error("Transaction failed:", error)
    }
  }

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/invest" className="hover:text-foreground">
          Properties
        </Link>
        <span>/</span>
        <span>{propertyData.name}</span>
      </div>

      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/invest">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src={propertyData.images[selectedImage] || "/placeholder.svg"}
              alt={propertyData.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {propertyData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-video relative rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${propertyData.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-bricolage text-3xl font-bold mb-2">{propertyData.name}</h1>
            <p className="text-muted-foreground">{propertyData.description}</p>
          </div>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bricolage">Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {propertyDetails.map((detail, index) => {
                  const Icon = detail.icon
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">{detail.label}</p>
                        <p className="font-medium">{detail.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bricolage">Financial Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {financialInfo.map((info, index) => (
                  <div key={index}>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-semibold">{info.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Investment Highlights */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bricolage">Investment Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{propertyData.investmentHighlights}</p>
            </CardContent>
          </Card>

          {/* Action Button */}
          <Button size="lg" className="w-full bg-primary hover:bg-primary/90" onClick={handleBuyTokens}>
            Buy Tokens
          </Button>
        </div>
      </div>

      {/* Location & Neighborhood Section */}
      <Tabs defaultValue="map" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">Location & Map</TabsTrigger>
          <TabsTrigger value="neighborhood">Neighborhood Info</TabsTrigger>
        </TabsList>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle className="font-bricolage flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Interactive Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <GoogleMap address={propertyData.address} propertyName={propertyData.name} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="neighborhood">
          <NeighborhoodInfo address={propertyData.address} />
        </TabsContent>
      </Tabs>

      <TransactionModal
        isOpen={transaction.isOpen}
        onClose={closeTransaction}
        title={transaction.title}
        description={transaction.description}
        transactionHash={transaction.transactionHash}
        status={transaction.status}
        errorMessage={transaction.errorMessage}
      />
    </div>
  )
}
