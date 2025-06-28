"use client"
import { Progress } from "@/components/ui/progress"
import { StatCard } from "@/components/ui/stat-card"
import { DataTable } from "@/components/ui/data-table"
import { Sidebar } from "@/components/layout/sidebar"
import { useWalletStore, usePortfolioStore, useUIStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { WalletConnectPrompt } from "@/components/ui/wallet-connect-prompt"

export default function DashboardPage() {
  const { positions, totalSupplied, totalBorrowed, netApy } = usePortfolioStore()
  const { sidebarOpen } = useUIStore()
  const { isConnected } = useWalletStore()

  // Show wallet connect prompt if not connected
  if (!isConnected) {
    return <WalletConnectPrompt />
  }

  const columns = [
    { key: "asset" as const, header: "Asset" },
    {
      key: "supplied" as const,
      header: "Supplied",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      key: "apy" as const,
      header: "APY",
      render: (value: number) => `${value}%`,
    },
    {
      key: "borrowed" as const,
      header: "Borrowed",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      key: "borrowApy" as const,
      header: "Borrow APY",
      render: (value: number) => `${value}%`,
    },
    {
      key: "healthFactor" as const,
      header: "Health Factor",
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <Progress value={value} className="w-16" />
          <span className="text-sm font-medium">{value}</span>
        </div>
      ),
    },
  ]

  return (
    <div className="flex">
      <Sidebar />
      <div className={cn("flex-1 transition-all duration-300", sidebarOpen ? "ml-64" : "ml-16")}>
        <div className="container px-4 py-8 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-bricolage text-3xl font-bold">Aave Positions</h1>
            <p className="text-muted-foreground">Track your lending positions on Aave</p>
          </div>

          {/* Overview Cards */}
          <div>
            <h2 className="font-bricolage text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Total Supplied"
                value={`$${totalSupplied.toLocaleString()}`}
                change="+1.2%"
                changeType="positive"
              />
              <StatCard
                title="Total Borrowed"
                value={`$${totalBorrowed.toLocaleString()}`}
                change="-0.5%"
                changeType="negative"
              />
              <StatCard title="Net APY" value={`${netApy}%`} change="+0.1%" changeType="positive" />
            </div>
          </div>

          {/* Positions Table */}
          <DataTable title="Positions" data={positions} columns={columns} />
        </div>
      </div>
    </div>
  )
}
