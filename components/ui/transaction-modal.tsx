"use client"

import { useEffect, useState } from "react"
import { CheckCircle, X, AlertCircle, Loader2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  transactionHash?: string
  status: "pending" | "success" | "error" | "signing"
  errorMessage?: string
}

export function TransactionModal({
  isOpen,
  onClose,
  title = "Transaction",
  description,
  transactionHash,
  status,
  errorMessage,
}: TransactionModalProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 300)
      return () => clearTimeout(timer)
    } else {
      setShowContent(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const getStatusConfig = () => {
    switch (status) {
      case "signing":
        return {
          icon: Loader2,
          iconClass: "h-12 w-12 text-blue-500 animate-spin",
          bgClass: "bg-blue-500/20",
          title: "Sign Transaction",
          message: "Please sign the transaction in your wallet to continue.",
          badgeText: "Waiting for Signature",
          badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        }
      case "pending":
        return {
          icon: Loader2,
          iconClass: "h-12 w-12 text-yellow-500 animate-spin",
          bgClass: "bg-yellow-500/20",
          title: "Transaction Pending",
          message: "Your transaction is being processed on the blockchain.",
          badgeText: "Confirming",
          badgeClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        }
      case "success":
        return {
          icon: CheckCircle,
          iconClass: "h-12 w-12 text-green-500",
          bgClass: "bg-green-500/20",
          title: "Transaction Successful",
          message: "Your transaction has been confirmed on the blockchain.",
          badgeText: "Confirmed",
          badgeClass: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        }
      case "error":
        return {
          icon: AlertCircle,
          iconClass: "h-12 w-12 text-red-500",
          bgClass: "bg-red-500/20",
          title: "Transaction Failed",
          message: errorMessage || "Your transaction failed to process. Please try again.",
          badgeText: "Failed",
          badgeClass: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card
        className={cn(
          "w-full max-w-md mx-4 transform transition-all duration-500",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
      >
        <CardContent className="p-8 text-center space-y-6">
          {/* Close Button */}
          {status !== "signing" && status !== "pending" && (
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}

          {/* Status Icon with Animation */}
          <div className="relative">
            <div
              className={cn(
                "w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-700",
                config.bgClass,
                showContent ? "scale-100 rotate-0" : "scale-0 rotate-180",
              )}
            >
              <Icon
                className={cn(
                  config.iconClass,
                  "transition-all duration-500 delay-300",
                  showContent ? "scale-100 opacity-100" : "scale-0 opacity-0",
                )}
              />
            </div>
            {/* Ripple Effect for pending states */}
            {(status === "signing" || status === "pending") && (
              <div
                className={cn(
                  "absolute inset-0 w-20 h-20 mx-auto rounded-full transition-all duration-1000",
                  config.bgClass.replace("/20", "/10"),
                  showContent ? "scale-150 opacity-0" : "scale-100 opacity-100",
                )}
              />
            )}
          </div>

          {/* Content */}
          <div
            className={cn(
              "space-y-4 transition-all duration-500 delay-500",
              showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <div className="space-y-2">
              <Badge className={config.badgeClass}>{config.badgeText}</Badge>
              <h2 className="font-bricolage text-2xl font-bold">{title}</h2>
              <p className="text-muted-foreground">{description || config.message}</p>
            </div>

            {/* Transaction Hash */}
            {transactionHash && status !== "signing" && (
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Transaction Hash</p>
                <div className="flex items-center space-x-2">
                  <code className="text-xs font-mono bg-background px-2 py-1 rounded flex-1 truncate">
                    {transactionHash}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => window.open(`https://etherscan.io/tx/${transactionHash}`, "_blank")}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {status === "success" && (
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Close
                </Button>
                <Button onClick={onClose} className="flex-1">
                  Continue
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Close
                </Button>
                <Button onClick={onClose} className="flex-1">
                  Try Again
                </Button>
              </div>
            )}

            {(status === "signing" || status === "pending") && (
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  {status === "signing"
                    ? "Check your wallet for the transaction approval"
                    : "This may take a few minutes depending on network congestion"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
