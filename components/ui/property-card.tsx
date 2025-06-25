"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PropertyCardProps {
  id: string
  name: string
  address: string
  image: string
  tokenPrice: number
  totalTokens: number
  currentYield: number
  status?: "active" | "sold" | "pending"
  onViewListing?: (id: string) => void
}

export function PropertyCard({
  id,
  name,
  address,
  image,
  tokenPrice,
  totalTokens,
  currentYield,
  status = "active",
  onViewListing,
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
      <div className="aspect-video relative">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        {status !== "active" && (
          <Badge className="absolute top-2 right-2" variant={status === "sold" ? "destructive" : "secondary"}>
            {status}
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-bricolage font-semibold text-lg">{name}</h3>
            <p className="text-muted-foreground text-sm">{address}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Token Price</p>
              <p className="font-semibold">${tokenPrice}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Tokens</p>
              <p className="font-semibold">{totalTokens.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Current Yield</p>
              <p className="font-semibold text-green-500">{currentYield}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Market Cap</p>
              <p className="font-semibold">${(tokenPrice * totalTokens).toLocaleString()}</p>
            </div>
          </div>

          <Button className="w-full" onClick={() => onViewListing?.(id)} disabled={status === "sold"}>
            {status === "sold" ? "Sold Out" : "View Listing"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
