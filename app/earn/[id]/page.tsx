"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, TrendingUp, Shield, DollarSign, Info, Calculator, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useTransaction } from "@/hooks/useTransaction"
import { TransactionModal } from "@/components/ui/transaction-modal"

const earnOpportunityDetails = {
  "1": {
    title: "High-Yield Savings Pool",
    description:
      "Earn competitive yields on your stablecoin deposits with our flagship savings product. This pool automatically optimizes your returns across multiple DeFi protocols.",
    apy: "8.5%",
    tvl: "$45.2M",
    risk: "Low",
    lockPeriod: "None",
    icon: DollarSign,
    minDeposit: "$100",
    maxDeposit: "$1,000,000",
    fees: "0.5%",
    compounding: "Daily",
    details: {
      strategy: "Multi-protocol yield optimization across Aave, Compound, and Yearn Finance",
      risks: ["Smart contract risk", "Protocol risk", "Impermanent loss (minimal)"],
      benefits: ["Daily compounding", "No lock-up period", "Instant withdrawals", "Insurance coverage"],
      allocation: [
        { protocol: "Aave", percentage: 40 },
        { protocol: "Compound", percentage: 35 },
        { protocol: "Yearn", percentage: 25 },
      ],
    },
  },
  "2": {
    title: "Real Estate Yield Farming",
    description:
      "Provide liquidity to our real estate token pairs and earn additional rewards through our innovative yield farming program.",
    apy: "12.3%",
    tvl: "$23.8M",
    risk: "Medium",
    lockPeriod: "30 days",
    icon: TrendingUp,
    minDeposit: "$500",
    maxDeposit: "$500,000",
    fees: "1.0%",
    compounding: "Weekly",
    details: {
      strategy: "Liquidity provision for REAL/ETH and REAL/USDC pairs with additional token rewards",
      risks: ["Impermanent loss", "Smart contract risk", "Market volatility"],
      benefits: ["High APY", "Token rewards", "Real estate exposure", "Weekly compounding"],
      allocation: [
        { protocol: "REAL/ETH LP", percentage: 60 },
        { protocol: "REAL/USDC LP", percentage: 40 },
      ],
    },
  },
}

export default function EarnDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [depositAmount, setDepositAmount] = useState("")
  const { transaction, executeTransaction, closeTransaction } = useTransaction()

  const opportunityId = params.id as string
  const opportunity = earnOpportunityDetails[opportunityId as keyof typeof earnOpportunityDetails]

  if (!opportunity) {
    return <div>Opportunity not found</div>
  }

  const Icon = opportunity.icon

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const handleDeposit = async () => {
    if (!depositAmount) return

    try {
      await executeTransaction(
        async () => {
          // Mock transaction
          return { hash: "0x" + Math.random().toString(16).substr(2, 64) }
        },
        "Start Earning",
        `Depositing $${depositAmount} into ${opportunity.title}`,
      )
    } catch (error) {
      console.error("Transaction failed:", error)
    }
  }

  const calculateReturns = (amount: string, apy: string) => {
    const principal = Number.parseFloat(amount) || 0
    const rate = Number.parseFloat(apy.replace("%", "")) / 100
    const daily = (principal * rate) / 365
    const monthly = (principal * rate) / 12
    const yearly = principal * rate

    return { daily, monthly, yearly }
  }

  const returns = calculateReturns(depositAmount, opportunity.apy)

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4 animate-slide-up">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="font-bricolage text-3xl font-bold">{opportunity.title}</h1>
          <p className="text-muted-foreground">Detailed information and investment options</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Card */}
          <Card className="animate-scale-in">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-bricolage text-xl">{opportunity.title}</CardTitle>
                    <Badge className={getRiskColor(opportunity.risk)}>{opportunity.risk} Risk</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">{opportunity.apy}</p>
                  <p className="text-sm text-muted-foreground">APY</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{opportunity.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <p className="text-sm text-muted-foreground">TVL</p>
                  <p className="font-semibold text-lg">{opportunity.tvl}</p>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <p className="text-sm text-muted-foreground">Lock Period</p>
                  <p className="font-semibold text-lg">{opportunity.lockPeriod}</p>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <p className="text-sm text-muted-foreground">Min Deposit</p>
                  <p className="font-semibold text-lg">{opportunity.minDeposit}</p>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <p className="text-sm text-muted-foreground">Compounding</p>
                  <p className="font-semibold text-lg">{opportunity.compounding}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information Tabs */}
          <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Tabs defaultValue="strategy" className="w-full">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="strategy">Strategy</TabsTrigger>
                  <TabsTrigger value="risks">Risks</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="allocation">Allocation</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent>
                <TabsContent value="strategy" className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-2">Investment Strategy</h3>
                      <p className="text-muted-foreground">{opportunity.details.strategy}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="risks" className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center">
                      <Shield className="h-5 w-5 text-yellow-500 mr-2" />
                      Risk Factors
                    </h3>
                    <ul className="space-y-2">
                      {opportunity.details.risks.map((risk, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="benefits" className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center">
                      <Zap className="h-5 w-5 text-green-500 mr-2" />
                      Key Benefits
                    </h3>
                    <ul className="space-y-2">
                      {opportunity.details.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="allocation" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Fund Allocation</h3>
                    {opportunity.details.allocation.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.protocol}</span>
                          <span className="font-medium">{item.percentage}%</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Investment Calculator */}
          <Card className="animate-bounce-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle className="font-bricolage flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Investment Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Deposit Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </div>

              {depositAmount && (
                <div className="space-y-3 p-4 bg-muted/50 rounded-lg animate-fade-in">
                  <h4 className="font-semibold text-sm">Estimated Returns</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily:</span>
                      <span className="font-medium">${returns.daily.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly:</span>
                      <span className="font-medium">${returns.monthly.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Yearly:</span>
                      <span className="font-medium text-primary">${returns.yearly.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleDeposit}
                disabled={!depositAmount || transaction.status === "signing" || transaction.status === "pending"}
              >
                {transaction.status === "signing" || transaction.status === "pending"
                  ? "Processing..."
                  : "Start Earning"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Minimum deposit: {opportunity.minDeposit} • Fee: {opportunity.fees}
              </p>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="font-bricolage text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Current APY</span>
                <span className="font-bold text-primary">{opportunity.apy}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Value Locked</span>
                <span className="font-semibold">{opportunity.tvl}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Depositors</span>
                <span className="font-semibold">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pool Utilization</span>
                <span className="font-semibold">78.5%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
