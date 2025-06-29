"use client"

import { useState } from "react"
import { Book, Code, Database, Zap, Shield, Globe, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiEndpoint } from "@/components/ui/api-endpoint"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const apiEndpoints = {
  properties: [
    {
      method: "GET" as const,
      endpoint: "/api/properties",
      description: "List all properties",
      parameters: [
        { name: "page", type: "number", required: false, description: "Page number for pagination" },
        { name: "limit", type: "number", required: false, description: "Number of items per page" },
        { name: "status", type: "string", required: false, description: "Filter by property status" },
      ],
      response: {
        description: "Returns a paginated list of properties",
        example: {
          data: [
            {
              id: "prop_123",
              name: "Luxury Apartment Complex",
              address: "123 Main St, City, State",
              tokenPrice: 100,
              totalTokens: 10000,
              currentYield: 6.5,
              status: "active",
            },
          ],
          pagination: {
            page: 1,
            limit: 20,
            total: 150,
          },
        },
      },
    },
    {
      method: "GET" as const,
      endpoint: "/api/properties/:id",
      description: "Get property details",
      parameters: [{ name: "id", type: "string", required: true, description: "Property ID" }],
      response: {
        description: "Returns detailed property information",
        example: {
          id: "prop_123",
          name: "Luxury Apartment Complex",
          description: "A beautiful property...",
          financials: {
            tokenPrice: 100,
            totalTokens: 10000,
            marketCap: 1000000,
          },
        },
      },
    },
    {
      method: "POST" as const,
      endpoint: "/api/properties/:id/verify",
      description: "Verify property via Chainlink Functions",
      parameters: [
        { name: "id", type: "string", required: true, description: "Property ID to verify" },
        { name: "verificationData", type: "object", required: true, description: "Property verification data" },
      ],
      response: {
        description: "Returns verification status",
        example: {
          verified: true,
          transactionHash: "0x123...",
          timestamp: "2024-01-15T10:30:00Z",
        },
      },
    },
  ],
  portfolio: [
    {
      method: "GET" as const,
      endpoint: "/api/users/:address",
      description: "Get user profile",
      parameters: [{ name: "address", type: "string", required: true, description: "User wallet address" }],
      response: {
        description: "Returns user profile information",
        example: {
          address: "0x123...",
          displayName: "John Doe",
          joinedAt: "2024-01-01T00:00:00Z",
          totalInvested: 50000,
        },
      },
    },
    {
      method: "GET" as const,
      endpoint: "/api/users/:address/portfolio",
      description: "Get user portfolio",
      parameters: [{ name: "address", type: "string", required: true, description: "User wallet address" }],
      response: {
        description: "Returns user's complete portfolio",
        example: {
          totalValue: 52500,
          positions: [
            {
              propertyId: "prop_123",
              tokens: 100,
              currentValue: 10500,
              unrealizedGain: 500,
            },
          ],
        },
      },
    },
  ],
  aave: [
    {
      method: "GET" as const,
      endpoint: "/api/aave/position/:address",
      description: "Get user's Aave position",
      parameters: [{ name: "address", type: "string", required: true, description: "User wallet address" }],
      response: {
        description: "Returns user's Aave lending position",
        example: {
          totalSupplied: 12345,
          totalBorrowed: 5678,
          healthFactor: 2.5,
          positions: [],
        },
      },
    },
    {
      method: "POST" as const,
      endpoint: "/api/aave/supply",
      description: "Supply tokens as collateral",
      parameters: [
        { name: "asset", type: "string", required: true, description: "Asset to supply" },
        { name: "amount", type: "string", required: true, description: "Amount to supply" },
      ],
      response: {
        description: "Returns transaction hash",
        example: {
          transactionHash: "0x123...",
          status: "pending",
        },
      },
    },
  ],
  yield: [
    {
      method: "GET" as const,
      endpoint: "/api/yield/:propertyId",
      description: "Get property yield info",
      parameters: [{ name: "propertyId", type: "string", required: true, description: "Property ID" }],
      response: {
        description: "Returns yield information for the property",
        example: {
          currentYield: 6.5,
          totalDistributed: 150000,
          nextDistribution: "2024-04-01T00:00:00Z",
        },
      },
    },
    {
      method: "POST" as const,
      endpoint: "/api/yield/claim",
      description: "Claim accumulated yield",
      parameters: [
        { name: "propertyId", type: "string", required: true, description: "Property ID" },
        { name: "amount", type: "string", required: true, description: "Amount to claim" },
      ],
      response: {
        description: "Returns claim transaction details",
        example: {
          transactionHash: "0x123...",
          amount: "1250.00",
          status: "confirmed",
        },
      },
    },
  ],
  marketplace: [
    {
      method: "GET" as const,
      endpoint: "/api/marketplace",
      description: "List active token sales",
      parameters: [
        { name: "propertyId", type: "string", required: false, description: "Filter by property" },
        { name: "minPrice", type: "number", required: false, description: "Minimum price filter" },
      ],
      response: {
        description: "Returns list of active marketplace listings",
        example: {
          listings: [
            {
              id: "listing_123",
              propertyId: "prop_123",
              tokens: 50,
              pricePerToken: 105,
              seller: "0x456...",
            },
          ],
        },
      },
    },
    {
      method: "POST" as const,
      endpoint: "/api/marketplace/buy",
      description: "Purchase listed token",
      parameters: [
        { name: "listingId", type: "string", required: true, description: "Listing ID to purchase" },
        { name: "quantity", type: "number", required: true, description: "Number of tokens to buy" },
      ],
      response: {
        description: "Returns purchase transaction details",
        example: {
          transactionHash: "0x789...",
          totalCost: "5250.00",
          status: "confirmed",
        },
      },
    },
  ],
  crosschain: [
    {
      method: "GET" as const,
      endpoint: "/api/crosschain/supported",
      description: "Supported networks",
      response: {
        description: "Returns list of supported blockchain networks",
        example: {
          networks: [
            { chainId: 1, name: "Ethereum", symbol: "ETH" },
            { chainId: 137, name: "Polygon", symbol: "MATIC" },
            { chainId: 42161, name: "Arbitrum", symbol: "ETH" },
          ],
        },
      },
    },
    {
      method: "POST" as const,
      endpoint: "/api/crosschain/transfer",
      description: "Initiate cross-chain transfer",
      parameters: [
        { name: "fromChain", type: "number", required: true, description: "Source chain ID" },
        { name: "toChain", type: "number", required: true, description: "Destination chain ID" },
        { name: "amount", type: "string", required: true, description: "Amount to transfer" },
      ],
      response: {
        description: "Returns cross-chain transfer details",
        example: {
          transferId: "xfer_123",
          sourceHash: "0x123...",
          estimatedTime: "5-10 minutes",
          status: "pending",
        },
      },
    },
  ],
}

const sections = [
  { id: "getting-started", title: "Getting Started", icon: Book },
  { id: "properties", title: "Property Management", icon: Database },
  { id: "portfolio", title: "User Portfolio", icon: Shield },
  { id: "aave", title: "Aave Integration", icon: Zap },
  { id: "yield", title: "Yield Management", icon: Code },
  { id: "marketplace", title: "Marketplace", icon: Globe },
  { id: "crosschain", title: "Cross-Chain", icon: Globe },
]

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEndpoints = (endpoints: any[]) => {
    if (!searchQuery) return endpoints
    return endpoints.filter(
      (endpoint) =>
        endpoint.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
        endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <div className="container px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="font-bricolage text-3xl font-bold mb-4">Documentation</h1>
            <p className="text-muted-foreground text-lg">
              Learn how to use Lotwise and integrate with our platform.
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="getting-started" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 gap-2 h-auto p-2">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex flex-col items-center space-y-2 p-4 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs text-center leading-tight">{section.title}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {/* Getting Started */}
          <TabsContent value="getting-started">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-bricolage">Quick Start</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">1. Connect Your Wallet</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect your Web3 wallet to start interacting with the platform.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">2. Browse Properties</h4>
                    <p className="text-sm text-muted-foreground">
                      Explore tokenized real estate properties available for investment.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">3. Make Your First Investment</h4>
                    <p className="text-sm text-muted-foreground">Purchase property tokens and start earning yields.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-bricolage">Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">API Key</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Include your API key in the Authorization header:
                    </p>
                    <pre className="bg-muted p-3 rounded text-sm">
                      <code>Authorization: Bearer YOUR_API_KEY</code>
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Base URL</h4>
                    <pre className="bg-muted p-3 rounded text-sm">
                      <code>https://api.lotwise.com/v2</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* API Endpoints Tabs */}
          {Object.entries(apiEndpoints).map(([key, endpoints]) => (
            <TabsContent key={key} value={key}>
              <div className="space-y-4">
                <h2 className="font-bricolage text-2xl font-bold capitalize">
                  {key === "aave" ? "Aave Integration" : key.replace(/([A-Z])/g, " $1")} API
                </h2>
                {filteredEndpoints(endpoints).map((endpoint, index) => (
                  <ApiEndpoint key={index} {...endpoint} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
