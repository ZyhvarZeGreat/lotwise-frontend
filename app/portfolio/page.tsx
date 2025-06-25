"use client"
import { DataTable } from "@/components/ui/data-table"
import { Sidebar } from "@/components/layout/sidebar"
import { useUIStore, useWalletStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { WalletConnectPrompt } from "@/components/ui/wallet-connect-prompt"
const yieldColumns = [
  { key: "property" as const, header: "Property" },
  { key: "yieldAmount" as const, header: "Yield Amount" },
  { key: "distributionDate" as const, header: "Distribution Date" },
  {
    key: "status" as const,
    header: "Status",
    render: (value: string) => (
      <span
        className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          value === "Distributed"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        )}
      >
        {value}
      </span>
    ),
  },
]

const holderColumns = [
  { key: "tokenHolder" as const, header: "Token Holder" },
  { key: "property" as const, header: "Property" },
  { key: "yieldAmount" as const, header: "Yield Amount" },
  { key: "distributionDate" as const, header: "Distribution Date" },
]

const yieldDistribution = [
  {
    property: "Luxury Apartment Complex",
    yieldAmount: "$15,000",
    distributionDate: "2024-07-20",
    status: "Distributed",
  },
  {
    property: "Commercial Office Building",
    yieldAmount: "$8,000",
    distributionDate: "2024-07-15",
    status: "Pending",
  },
  {
    property: "Retail Shopping Center",
    yieldAmount: "$12,000",
    distributionDate: "2024-07-10",
    status: "Distributed",
  },
]

const tokenHolderYields = [
  {
    tokenHolder: "Emily Carter",
    property: "Luxury Apartment Complex",
    yieldAmount: "$5,000",
    distributionDate: "2024-07-20",
  },
  {
    tokenHolder: "David Lee",
    property: "Commercial Office Building",
    yieldAmount: "$3,000",
    distributionDate: "2024-07-15",
  },
  {
    tokenHolder: "Sophia Rodriguez",
    property: "Retail Shopping Center",
    yieldAmount: "$4,000",
    distributionDate: "2024-07-10",
  },
]

export default function PortfolioPage() {
  const { sidebarOpen } = useUIStore()
  const { isConnected } = useWalletStore()

  // Show wallet connect prompt if not connected
  if (!isConnected) {
    return <WalletConnectPrompt />
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className={cn("flex-1 transition-all duration-300", sidebarOpen ? "ml-64" : "ml-16")}>
        <div className="container px-4 py-8 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-bricolage text-3xl font-bold">Yields</h1>
            <p className="text-muted-foreground">Manage yield distribution for token holders</p>
          </div>

          {/* Yield Distribution Table */}
          <DataTable title="Yield Distribution" data={yieldDistribution} columns={yieldColumns} />

          {/* Token Holder Yields Table */}
          <DataTable title="Token Holder Yields" data={tokenHolderYields} columns={holderColumns} />
        </div>
      </div>
    </div>
  )
}
