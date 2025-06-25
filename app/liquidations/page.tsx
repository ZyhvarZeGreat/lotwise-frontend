"use client"

import { DataTable } from "@/components/ui/data-table"
import { Sidebar } from "@/components/layout/sidebar"
import { useUIStore, useWalletStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { WalletConnectPrompt } from "@/components/ui/wallet-connect-prompt"

const liquidationData = [
  {
    user: "User 1",
    collateral: "ETH",
    debt: "DAI",
    healthFactor: 0.95,
    liquidationPrice: "$1,800",
  },
  {
    user: "User 2",
    collateral: "BTC",
    debt: "USDC",
    healthFactor: 0.88,
    liquidationPrice: "$25,000",
  },
  {
    user: "User 3",
    collateral: "LINK",
    debt: "USDT",
    healthFactor: 0.92,
    liquidationPrice: "$15",
  },
  {
    user: "User 4",
    collateral: "AVAX",
    debt: "DAI",
    healthFactor: 0.98,
    liquidationPrice: "$30",
  },
  {
    user: "User 5",
    collateral: "SOL",
    debt: "USDC",
    healthFactor: 0.85,
    liquidationPrice: "$200",
  },
]

export default function LiquidationsPage() {
  const { sidebarOpen } = useUIStore()
  const { isConnected } = useWalletStore()

  // Show wallet connect prompt if not connected
  if (!isConnected) {
    return <WalletConnectPrompt />
  }

  const columns = [
    { key: "user" as const, header: "User" },
    { key: "collateral" as const, header: "Collateral" },
    { key: "debt" as const, header: "Debt" },
    {
      key: "healthFactor" as const,
      header: "Health Factor",
      render: (value: number) => (
        <span
          className={cn(
            "font-medium",
            value < 0.9 ? "text-red-500" : value < 0.95 ? "text-yellow-500" : "text-green-500",
          )}
        >
          {value.toFixed(2)}
        </span>
      ),
    },
    { key: "liquidationPrice" as const, header: "Liquidation Price" },
  ]

  return (
    <div className="flex">
      <Sidebar />
      <div className={cn("flex-1 transition-all duration-300", sidebarOpen ? "ml-64" : "ml-16")}>
        <div className="container px-4 py-8 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-bricolage text-3xl font-bold">Liquidations</h1>
            <p className="text-muted-foreground">Monitor at-risk positions for liquidation opportunities</p>
          </div>

          {/* At-Risk Positions Table */}
          <DataTable title="At-Risk Positions" data={liquidationData} columns={columns} />
        </div>
      </div>
    </div>
  )
}
