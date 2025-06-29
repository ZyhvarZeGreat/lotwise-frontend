"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

interface Props {
  children: React.ReactNode
}

export default function ClientLayout({ children }: Props) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <div className="min-h-screen bg-background">
      {!isHomePage && <Navbar />}
      <main>{children}</main>
      <Footer />
    </div>
  )
}
