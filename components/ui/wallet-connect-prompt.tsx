"use client"

import { Wallet, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWalletStore } from "@/lib/store"

const benefits = [
  {
    icon: Shield,
    title: "Secure",
    description: "Your wallet stays in your control",
  },
  {
    icon: Zap,
    title: "Fast",
    description: "Instant transactions and updates",
  },
  {
    icon: Wallet,
    title: "Easy",
    description: "One-click connection process",
  },
]

export function WalletConnectPrompt() {
  const { connect } = useWalletStore()

  const handleConnect = () => {
    // Mock wallet connection - in real app, this would integrate with Web3 providers
    connect("0x1234...5678", 1)
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-bricolage text-2xl">Connect Your Wallet</CardTitle>
          <p className="text-muted-foreground">
            Connect your wallet to access your dashboard and start investing in tokenized real estate.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Benefits */}
          <div className="grid grid-cols-3 gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="text-center">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          {/* Connect Button */}
          <Button onClick={handleConnect} className="w-full bg-primary hover:bg-primary/90" size="lg">
            Connect Wallet
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
