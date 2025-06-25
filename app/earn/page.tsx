"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, Clock, DollarSign } from "lucide-react"
import { useTransaction } from "@/hooks/useTransaction"
import { TransactionModal } from "@/components/ui/transaction-modal"

const earnOpportunities = [
  {
    id: "1",
    title: "High-Yield Savings Pool",
    description: "Earn competitive yields on your stablecoin deposits with our flagship savings product.",
    apy: "8.5%",
    tvl: "$45.2M",
    risk: "Low",
    lockPeriod: "None",
    icon: DollarSign,
  },
  {
    id: "2",
    title: "Real Estate Yield Farming",
    description: "Provide liquidity to our real estate token pairs and earn additional rewards.",
    apy: "12.3%",
    tvl: "$23.8M",
    risk: "Medium",
    lockPeriod: "30 days",
    icon: TrendingUp,
  },
  {
    id: "3",
    title: "Staking Rewards",
    description: "Stake your LOTWISE tokens to earn governance rewards and platform fees.",
    apy: "15.7%",
    tvl: "$18.5M",
    risk: "Medium",
    lockPeriod: "90 days",
    icon: Shield,
  },
  {
    id: "4",
    title: "Fixed-Term Deposits",
    description: "Lock your funds for guaranteed returns with our fixed-term deposit products.",
    apy: "6.8%",
    tvl: "$67.3M",
    risk: "Low",
    lockPeriod: "180 days",
    icon: Clock,
  },
]

export default function EarnPage() {
  const { transaction, executeTransaction, closeTransaction } = useTransaction()

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

  const handleStartEarning = async (opportunity: any) => {
    try {
      await executeTransaction(
        async () => {
          return { hash: "0x" + Math.random().toString(16).substr(2, 64) }
        },
        "Start Earning",
        `Starting to earn with ${opportunity.title}`,
      )
    } catch (error) {
      console.error("Transaction failed:", error)
    }
  }

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4 animate-slide-up">
        <div>
          <h1 className="font-bricolage text-3xl font-bold">Earn</h1>
          <p className="text-muted-foreground">
            Maximize your returns with our diverse earning opportunities across DeFi and real estate.
          </p>
        </div>
      </div>

      {/* Earning Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {earnOpportunities.map((opportunity, index) => {
          const Icon = opportunity.icon
          return (
            <Card
              key={opportunity.id}
              className="hover:shadow-lg transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-bricolage text-lg">{opportunity.title}</CardTitle>
                      <Badge className={getRiskColor(opportunity.risk)}>{opportunity.risk} Risk</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{opportunity.apy}</p>
                    <p className="text-sm text-muted-foreground">APY</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{opportunity.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">TVL</p>
                    <p className="font-semibold">{opportunity.tvl}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Lock Period</p>
                    <p className="font-semibold">{opportunity.lockPeriod}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                    <Link href={`/earn/${opportunity.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => handleStartEarning(opportunity)}>
                    Start Earning
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Additional Info */}
      <Card className="bg-primary/5 border-primary/20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bricolage font-semibold text-lg mb-2">Security First</h3>
              <p className="text-muted-foreground">
                All earning opportunities are backed by our robust security infrastructure and smart contract audits.
                Your funds are protected by industry-leading security measures and insurance coverage.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
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
