"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyCard } from "@/components/ui/property-card"
import Image from "next/image"
import { useTransaction } from "@/hooks/useTransaction"
import { TransactionModal } from "@/components/ui/transaction-modal"

const mockProperties = [
  {
    id: "1",
    name: "Luxury Apartment in Downtown Metropolis",
    address: "123 Elm Street, Metropolis, CA",
    image: "/images/luxury-apartment.jpg",
    tokenPrice: 100,
    totalTokens: 10000,
    currentYield: 6.5,
    status: "active" as const,
  },
  {
    id: "2",
    name: "Beachfront Villa in Coastal Paradise",
    address: "456 Ocean Drive, Coastal Paradise, FL",
    image: "/images/beachfront-villa.jpg",
    tokenPrice: 250,
    totalTokens: 8000,
    currentYield: 7.2,
    status: "active" as const,
  },
  {
    id: "3",
    name: "Mountain Chalet in Alpine Retreat",
    address: "789 Pine Ridge Road, Alpine Retreat, CO",
    image: "/images/mountain-chalet.jpg",
    tokenPrice: 150,
    totalTokens: 6000,
    currentYield: 5.8,
    status: "active" as const,
  },
  {
    id: "4",
    name: "Urban Loft in City Center",
    address: "101 Oak Avenue, City Center, NY",
    image: "/images/urban-loft.jpg",
    tokenPrice: 75,
    totalTokens: 12000,
    currentYield: 8.1,
    status: "sold" as const,
  },
  {
    id: "5",
    name: "Suburban Home in Green Meadows",
    address: "222 Maple Lane, Green Meadows, TX",
    image: "/images/suburban-home.jpg",
    tokenPrice: 120,
    totalTokens: 9000,
    currentYield: 6.9,
    status: "pending" as const,
  },
]

export default function InvestPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const { transaction, executeTransaction, closeTransaction } = useTransaction()

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && property.status === activeTab
  })

  const handleViewListing = (id: string) => {
    // Navigate to property detail page
    window.location.href = `/properties/${id}`
  }

  const handlePurchase = async (property: any) => {
    try {
      await executeTransaction(
        async () => {
          // Mock transaction
          return { hash: "0x" + Math.random().toString(16).substr(2, 64) }
        },
        "Purchase Property Tokens",
        `Purchasing tokens for ${property.name}`,
      )
    } catch (error) {
      console.error("Transaction failed:", error)
    }
  }

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="font-bricolage text-3xl font-bold">Token Listings</h1>
          <p className="text-muted-foreground">
            Explore a curated selection of tokens representing fractional ownership in premium real estate properties.
            Invest in your dream property today.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search listings"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onViewListing={handleViewListing}
                onPurchase={() => handlePurchase(property)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden">
            <Image
              src="/images/empty-state-properties.jpg"
              alt="No properties found"
              width={128}
              height={128}
              className="object-cover w-full h-full opacity-50"
            />
          </div>
          <p className="text-muted-foreground">No properties found matching your criteria.</p>
        </div>
      )}
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
