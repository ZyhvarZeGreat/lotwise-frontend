"use client"

import { useEffect, useState } from "react"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SuccessAnimationProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
  amount?: string
  tokenSymbol?: string
}

export function SuccessAnimation({
  isOpen,
  onClose,
  title = "Purchase Successful!",
  message = "Your tokens have been successfully purchased.",
  amount,
  tokenSymbol,
}: SuccessAnimationProps) {
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
          <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>

          {/* Success Icon with Animation */}
          <div className="relative">
            <div
              className={cn(
                "w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center transition-all duration-700",
                showContent ? "scale-100 rotate-0" : "scale-0 rotate-180",
              )}
            >
              <CheckCircle
                className={cn(
                  "h-12 w-12 text-green-500 transition-all duration-500 delay-300",
                  showContent ? "scale-100 opacity-100" : "scale-0 opacity-0",
                )}
              />
            </div>
            {/* Ripple Effect */}
            <div
              className={cn(
                "absolute inset-0 w-20 h-20 mx-auto rounded-full bg-green-500/10 transition-all duration-1000",
                showContent ? "scale-150 opacity-0" : "scale-100 opacity-100",
              )}
            />
          </div>

          {/* Content */}
          <div
            className={cn(
              "space-y-4 transition-all duration-500 delay-500",
              showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <h2 className="font-bricolage text-2xl font-bold text-green-500">{title}</h2>
            <p className="text-muted-foreground">{message}</p>

            {amount && tokenSymbol && (
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Amount Purchased</p>
                <p className="text-xl font-bold">
                  {amount} {tokenSymbol}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Continue Shopping
              </Button>
              <Button onClick={onClose} className="flex-1 bg-green-500 hover:bg-green-600">
                View Portfolio
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
