"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, ChevronDown, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useWalletStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { NotificationsDropdown } from "@/components/ui/notifications-dropdown"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useTransaction } from "@/hooks/useTransaction"
import { TransactionModal } from "@/components/ui/transaction-modal"

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Invest", href: "/invest" },
  { name: "Earn", href: "/earn" },
  { name: "Docs", href: "/docs" },
]

export function Navbar() {
  const pathname = usePathname()
  const { isConnected, address, balance, disconnect } = useWalletStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentBalance, setCurrentBalance] = useState("0")
  const { transaction, executeTransaction, closeTransaction } = useTransaction()

  useEffect(() => {
    if (isConnected) {
      // Simulate balance updates
      const interval = setInterval(() => {
        const randomBalance = (Math.random() * 10000 + 1000).toFixed(2)
        setCurrentBalance(randomBalance)
        useWalletStore.getState().setBalance(randomBalance)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isConnected])

  const handleConnectWallet = async () => {
    try {
      await executeTransaction(
        async () => {
          // Mock wallet connection
          const mockBalance = (Math.random() * 10000 + 1000).toFixed(2)
          useWalletStore.getState().connect("0x1234...5678", 1)
          setCurrentBalance(mockBalance)
          return {}
        },
        "Connect Wallet",
        "Connecting to your Web3 wallet",
      )
    } catch (error) {
      console.error("Wallet connection failed:", error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8">
              <svg viewBox="0 0 340 340" className="w-full h-full">
                <path
                  d="M170.013 46.3719C200.768 96.7283 254.345 131.635 316.386 136.702C318.801 147.397 320.089 158.536 320.089 170C320.089 252.892 252.895 320.089 170.013 320.089C87.1273 320.089 19.9118 252.888 19.9118 170C19.9118 158.534 21.189 147.387 23.611 136.704C85.6655 131.646 139.254 96.7363 170.013 46.3719Z"
                  stroke="currentColor"
                  strokeWidth="39.646"
                  fill="none"
                  className="text-primary"
                />
              </svg>
            </div>
            <span className="font-bricolage font-bold text-xl">Lotwise</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Asset Balance */}
          {isConnected && (
            <div className="hidden sm:flex items-center space-x-2 bg-muted/50 px-3 py-2 rounded-lg">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">${currentBalance}</span>
            </div>
          )}

          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search" className="w-64 pl-10 bg-muted/50" />
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <NotificationsDropdown />

          {/* Wallet Connection */}
          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={disconnect} className="text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleConnectWallet} className="bg-primary hover:bg-primary/90">
              Connect Wallet
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
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
    </nav>
  )
}
