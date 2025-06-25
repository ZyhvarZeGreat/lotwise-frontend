"use client"

import { useState } from "react"
import { Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/components/ui/data-table"
import { Sidebar } from "@/components/layout/sidebar"
import { useUIStore, useWalletStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { WalletConnectPrompt } from "@/components/ui/wallet-connect-prompt"

const transactionData = [
  {
    id: "tx_001",
    type: "Purchase",
    asset: "REAL-LAC",
    amount: "100 tokens",
    value: "$10,000",
    status: "Completed",
    date: "2024-01-15 14:30",
    hash: "0x1234...5678",
  },
  {
    id: "tx_002",
    type: "Yield",
    asset: "REAL-LAC",
    amount: "$1,250",
    value: "$1,250",
    status: "Completed",
    date: "2024-01-10 09:15",
    hash: "0x2345...6789",
  },
  {
    id: "tx_003",
    type: "Sale",
    asset: "REAL-BFV",
    amount: "50 tokens",
    value: "$12,500",
    status: "Pending",
    date: "2024-01-08 16:45",
    hash: "0x3456...7890",
  },
  {
    id: "tx_004",
    type: "Purchase",
    asset: "REAL-MCA",
    amount: "75 tokens",
    value: "$11,250",
    status: "Completed",
    date: "2024-01-05 11:20",
    hash: "0x4567...8901",
  },
  {
    id: "tx_005",
    type: "Yield",
    asset: "REAL-BFV",
    amount: "$890",
    value: "$890",
    status: "Failed",
    date: "2024-01-03 08:30",
    hash: "0x5678...9012",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Failed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Purchase":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Sale":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "Yield":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function TransactionsPage() {
  const { sidebarOpen } = useUIStore()
  const { isConnected } = useWalletStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Show wallet connect prompt if not connected
  if (!isConnected) {
    return <WalletConnectPrompt />
  }

  const filteredTransactions = transactionData.filter((tx) => {
    const matchesSearch =
      tx.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || tx.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || tx.type.toLowerCase() === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const columns = [
    {
      key: "id" as const,
      header: "Transaction ID",
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <span className="font-mono text-sm">{value}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
    {
      key: "type" as const,
      header: "Type",
      render: (value: string) => <Badge className={getTypeColor(value)}>{value}</Badge>,
    },
    { key: "asset" as const, header: "Asset" },
    { key: "amount" as const, header: "Amount" },
    { key: "value" as const, header: "Value" },
    {
      key: "status" as const,
      header: "Status",
      render: (value: string) => <Badge className={getStatusColor(value)}>{value}</Badge>,
    },
    { key: "date" as const, header: "Date" },
  ]

  const stats = [
    { title: "Total Transactions", value: transactionData.length.toString() },
    { title: "Total Volume", value: "$45,890" },
    { title: "This Month", value: "12" },
    { title: "Pending", value: transactionData.filter((tx) => tx.status === "Pending").length.toString() },
  ]

  return (
    <div className="flex">
      <Sidebar />
      <div className={cn("flex-1 transition-all duration-300", sidebarOpen ? "ml-64" : "ml-16")}>
        <div className="container px-4 py-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="font-bricolage text-3xl font-bold">Transactions</h1>
              <p className="text-muted-foreground">View and manage your transaction history</p>
            </div>
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bricolage font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bricolage">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="sale">Sale</SelectItem>
                    <SelectItem value="yield">Yield</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <DataTable title="Transaction History" data={filteredTransactions} columns={columns} />
        </div>
      </div>
    </div>
  )
}
