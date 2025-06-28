"use client"
import Image from "next/image"
import Link from "next/link"
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/ui/data-table"
import { StatCard } from "@/components/ui/stat-card"
import { Sidebar } from "@/components/layout/sidebar"
import { useUIStore, useWalletStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { WalletConnectPrompt } from "@/components/ui/wallet-connect-prompt"

const portfolioStats = [
  { title: "Total Portfolio Value", value: "$45,230", change: "+12.5%", changeType: "positive" as const },
  { title: "Total Invested", value: "$38,500", change: "+8.2%", changeType: "positive" as const },
  { title: "Total Returns", value: "$6,730", change: "+15.1%", changeType: "positive" as const },
  { title: "Average APY", value: "5.8%", change: "+0.3%", changeType: "positive" as const },
]

const holdings = [
  {
    id: 1,
    property: "Luxury Downtown Apartment",
    location: "New York, NY",
    image: "/images/luxury-apartment.jpg",
    tokensOwned: 50,
    totalTokens: 1000,
    investmentValue: 50000,
    currentValue: 52500,
    apy: 5.2,
    monthlyReturn: 216.67,
    status: "Active",
    riskLevel: "Low",
  },
  {
    id: 2,
    property: "Beachfront Villa",
    location: "Miami, FL",
    image: "/images/beachfront-villa.jpg",
    tokensOwned: 20,
    totalTokens: 1000,
    investmentValue: 50000,
    currentValue: 51800,
    apy: 6.1,
    monthlyReturn: 263.33,
    status: "Active",
    riskLevel: "Medium",
  },
  {
    id: 3,
    property: "Commercial Office Building",
    location: "San Francisco, CA",
    image: "/images/commercial-building.jpg",
    tokensOwned: 10,
    totalTokens: 1000,
    investmentValue: 50000,
    currentValue: 48200,
    apy: 7.3,
    monthlyReturn: 293.33,
    status: "Active",
    riskLevel: "High",
  },
]

const transactions = [
  {
    id: 1,
    type: "Purchase",
    property: "Luxury Downtown Apartment",
    tokens: 25,
    amount: 25000,
    date: "2024-01-15",
    status: "Completed",
  },
  {
    id: 2,
    type: "Dividend",
    property: "Beachfront Villa",
    tokens: 0,
    amount: 263.33,
    date: "2024-01-01",
    status: "Completed",
  },
  {
    id: 3,
    type: "Purchase",
    property: "Commercial Office Building",
    tokens: 10,
    amount: 50000,
    date: "2023-12-20",
    status: "Completed",
  },
]

export default function PortfolioPage() {
  const { sidebarOpen } = useUIStore()
  const { isConnected } = useWalletStore()

  // Show wallet connect prompt if not connected
  if (!isConnected) {
    return <WalletConnectPrompt />
  }

  const totalInvested = holdings.reduce((sum, holding) => sum + holding.investmentValue, 0)
  const totalCurrentValue = holdings.reduce((sum, holding) => sum + holding.currentValue, 0)
  const totalReturn = totalCurrentValue - totalInvested
  const totalReturnPercentage = ((totalReturn / totalInvested) * 100).toFixed(2)

  const transactionColumns = [
    { key: "type" as const, header: "Type" },
    { key: "property" as const, header: "Property" },
    {
      key: "tokens" as const,
      header: "Tokens",
      render: (value: number) => (value > 0 ? value.toString() : "-"),
    },
    {
      key: "amount" as const,
      header: "Amount",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    { key: "date" as const, header: "Date" },
    {
      key: "status" as const,
      header: "Status",
      render: (value: string) => <Badge variant={value === "Completed" ? "default" : "secondary"}>{value}</Badge>,
    },
  ]

  return (
    <div className="flex">
      <Sidebar />
      <div className={cn("flex-1 transition-all duration-300", sidebarOpen ? "ml-64" : "ml-16")}>
        <div className="container px-4 py-8 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-bricolage text-3xl font-bold">Portfolio</h1>
            <p className="text-muted-foreground">Track your real estate investments and performance</p>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioStats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
              />
            ))}
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Portfolio Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">${totalCurrentValue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Current Portfolio Value</div>
                    </div>
                    <div className="text-right">
                      <div
                        className={cn(
                          "text-lg font-semibold flex items-center",
                          totalReturn >= 0 ? "text-green-600" : "text-red-600",
                        )}
                      >
                        {totalReturn >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {totalReturn >= 0 ? "+" : ""}${totalReturn.toLocaleString()} ({totalReturnPercentage}%)
                      </div>
                      <div className="text-sm text-muted-foreground">Total Return</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Total Invested</span>
                      <span className="font-medium">${totalInvested.toLocaleString()}</span>
                    </div>
                    <Progress value={(totalCurrentValue / (totalInvested * 1.2)) * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Asset Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding) => {
                    const percentage = ((holding.currentValue / totalCurrentValue) * 100).toFixed(1)
                    return (
                      <div key={holding.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="truncate">{holding.property}</span>
                          <span className="font-medium">{percentage}%</span>
                        </div>
                        <Progress value={Number(percentage)} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Holdings */}
          <Tabs defaultValue="holdings" className="w-full">
            <TabsList>
              <TabsTrigger value="holdings">Holdings</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="holdings" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {holdings.map((holding) => {
                  const returnAmount = holding.currentValue - holding.investmentValue
                  const returnPercentage = ((returnAmount / holding.investmentValue) * 100).toFixed(2)
                  const ownershipPercentage = ((holding.tokensOwned / holding.totalTokens) * 100).toFixed(2)

                  return (
                    <Card key={holding.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-6">
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                            <Image
                              src={holding.image || "/placeholder.svg"}
                              alt={holding.property}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{holding.property}</h3>
                                <p className="text-muted-foreground">{holding.location}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Badge variant="secondary">{holding.status}</Badge>
                                  <Badge
                                    variant={
                                      holding.riskLevel === "Low"
                                        ? "default"
                                        : holding.riskLevel === "Medium"
                                          ? "secondary"
                                          : "destructive"
                                    }
                                  >
                                    {holding.riskLevel} Risk
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold">${holding.currentValue.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Current Value</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <div className="text-sm text-muted-foreground">Tokens Owned</div>
                                <div className="font-semibold">{holding.tokensOwned}</div>
                                <div className="text-xs text-muted-foreground">{ownershipPercentage}% ownership</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Investment</div>
                                <div className="font-semibold">${holding.investmentValue.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Return</div>
                                <div
                                  className={cn("font-semibold", returnAmount >= 0 ? "text-green-600" : "text-red-600")}
                                >
                                  {returnAmount >= 0 ? "+" : ""}${returnAmount.toLocaleString()} ({returnPercentage}%)
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Monthly Return</div>
                                <div className="font-semibold text-green-600">${holding.monthlyReturn.toFixed(2)}</div>
                                <div className="text-xs text-muted-foreground">{holding.apy}% APY</div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Progress
                                  value={(holding.tokensOwned / holding.totalTokens) * 100}
                                  className="w-32 h-2"
                                />
                                <span className="text-xs text-muted-foreground">
                                  {holding.tokensOwned}/{holding.totalTokens} tokens
                                </span>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/app/properties/${holding.id}`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Property
                                  </Link>
                                </Button>
                                <Button size="sm">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  Buy More
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="transactions">
              <DataTable title="Transaction History" data={transactions} columns={transactionColumns} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
