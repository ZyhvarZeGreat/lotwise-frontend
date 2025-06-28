"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { TrendingUp, DollarSign, Clock, Shield, ArrowUpRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard } from "@/components/ui/stat-card"
import { Sidebar } from "@/components/layout/sidebar"
import { useUIStore, useWalletStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { WalletConnectPrompt } from "@/components/ui/wallet-connect-prompt"

const earnStats = [
  { title: "Total Earning Opportunities", value: "24", change: "+3", changeType: "positive" as const },
  { title: "Average APY", value: "6.2%", change: "+0.4%", changeType: "positive" as const },
  { title: "Total Locked Value", value: "$12.5M", change: "+18.2%", changeType: "positive" as const },
  { title: "Active Strategies", value: "8", change: "+2", changeType: "positive" as const },
]

const opportunities = [
  {
    id: 1,
    title: "High-Yield Residential Pool",
    description: "Diversified portfolio of residential properties across major US cities",
    apy: 7.2,
    minInvestment: 1000,
    totalLocked: 2500000,
    capacity: 5000000,
    duration: "12 months",
    riskLevel: "Medium",
    strategy: "Yield Farming",
    image: "/images/luxury-apartment.jpg",
    features: ["Auto-compounding", "Monthly payouts", "Diversified portfolio"],
  },
  {
    id: 2,
    title: "Commercial Real Estate Vault",
    description: "Premium commercial properties with stable long-term returns",
    apy: 5.8,
    minInvestment: 5000,
    totalLocked: 8200000,
    capacity: 10000000,
    duration: "24 months",
    riskLevel: "Low",
    strategy: "Staking",
    image: "/images/commercial-building.jpg",
    features: ["Stable returns", "Quarterly payouts", "Blue-chip properties"],
  },
  {
    id: 3,
    title: "Luxury Property Liquidity Pool",
    description: "High-end luxury properties with premium yield potential",
    apy: 9.1,
    minInvestment: 10000,
    totalLocked: 1800000,
    capacity: 3000000,
    duration: "6 months",
    riskLevel: "High",
    strategy: "Liquidity Mining",
    image: "/images/beachfront-villa.jpg",
    features: ["High APY", "Weekly rewards", "Premium properties"],
  },
  {
    id: 4,
    title: "Suburban Growth Fund",
    description: "Emerging suburban markets with high growth potential",
    apy: 6.5,
    minInvestment: 2500,
    totalLocked: 3200000,
    capacity: 5000000,
    duration: "18 months",
    riskLevel: "Medium",
    strategy: "Growth Farming",
    image: "/images/suburban-home.jpg",
    features: ["Growth focused", "Bi-weekly payouts", "Emerging markets"],
  },
]

export default function EarnPage() {
  const [selectedRisk, setSelectedRisk] = useState("all")
  const [selectedStrategy, setSelectedStrategy] = useState("all")
  const [sortBy, setSortBy] = useState("apy")
  const { sidebarOpen } = useUIStore()
  const { isConnected } = useWalletStore()

  // Show wallet connect prompt if not connected
  if (!isConnected) {
    return <WalletConnectPrompt />
  }

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesRisk = selectedRisk === "all" || opportunity.riskLevel.toLowerCase() === selectedRisk.toLowerCase()
    const matchesStrategy =
      selectedStrategy === "all" || opportunity.strategy.toLowerCase().includes(selectedStrategy.toLowerCase())

    return matchesRisk && matchesStrategy
  })

  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    switch (sortBy) {
      case "apy":
        return b.apy - a.apy
      case "minInvestment":
        return a.minInvestment - b.minInvestment
      case "capacity":
        return b.capacity - b.totalLocked - (a.capacity - a.totalLocked)
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
            <h1 className="font-bricolage text-3xl font-bold">Earn</h1>
            <p className="text-muted-foreground">
              Maximize your returns with our yield farming and staking opportunities
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {earnStats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
              />
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Risk Level</label>
                  <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Risk Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Strategy</label>
                  <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Strategies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Strategies</SelectItem>
                      <SelectItem value="staking">Staking</SelectItem>
                      <SelectItem value="farming">Yield Farming</SelectItem>
                      <SelectItem value="liquidity">Liquidity Mining</SelectItem>
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
                      <SelectItem value="minInvestment">Lowest Min. Investment</SelectItem>
                      <SelectItem value="capacity">Most Capacity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opportunities Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bricolage text-xl font-semibold">
                Earning Opportunities ({sortedOpportunities.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedOpportunities.map((opportunity) => {
                const utilizationRate = (opportunity.totalLocked / opportunity.capacity) * 100
                const availableCapacity = opportunity.capacity - opportunity.totalLocked

                return (
                  <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-start space-x-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={opportunity.image || "/placeholder.svg"}
                              alt={opportunity.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{opportunity.title}</h3>
                                <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">{opportunity.apy}%</div>
                                <div className="text-xs text-muted-foreground">APY</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{opportunity.strategy}</Badge>
                          <Badge
                            variant={
                              opportunity.riskLevel === "Low"
                                ? "default"
                                : opportunity.riskLevel === "Medium"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {opportunity.riskLevel} Risk
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {opportunity.duration}
                          </Badge>
                        </div>

                        {/* Features */}
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Features:</div>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.features.map((feature) => (
                              <div key={feature} className="flex items-center text-xs bg-muted px-2 py-1 rounded">
                                <Shield className="h-3 w-3 mr-1 text-green-600" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Min. Investment</div>
                            <div className="font-semibold">${opportunity.minInvestment.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Available Capacity</div>
                            <div className="font-semibold">${availableCapacity.toLocaleString()}</div>
                          </div>
                        </div>

                        {/* Utilization */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Pool Utilization</span>
                            <span className="font-medium">{utilizationRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={utilizationRate} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            ${opportunity.totalLocked.toLocaleString()} / ${opportunity.capacity.toLocaleString()}
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button className="w-full" asChild>
                          <Link href={`/app/earn/${opportunity.id}`}>
                            <DollarSign className="mr-2 h-4 w-4" />
                            Start Earning
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Empty State */}
          {sortedOpportunities.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="font-semibold text-lg">No opportunities found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to see more earning opportunities
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedRisk("all")
                      setSelectedStrategy("all")
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
