"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">GP</span>
          </div>
          <span className="font-bold text-lg text-foreground">GPAI StudyMate</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
            Features
          </a>
          <a href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition">
            Demo
          </a>
          <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition">
            Testimonials
          </a>
        </nav>
        <Link href="/onboarding">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
            Start Learning
          </Button>
        </Link>
      </div>
    </header>
  )
}
