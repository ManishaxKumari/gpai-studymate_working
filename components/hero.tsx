"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Your Personal <span className="text-primary">AI Study Partner</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Chat. Learn. Plan. Grow smarter every day with AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Start Learning Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary/5 rounded-full px-8 h-12 text-base font-semibold bg-transparent"
          >
            Watch Demo
          </Button>
        </div>

        <div className="mt-16 relative">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 md:p-16 border border-primary/20">
            <div className="flex items-center justify-center gap-8">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">📚</span>
              </div>
              <div className="w-1 h-16 bg-primary/30" />
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-6 text-sm">AI-powered learning experience</p>
          </div>
        </div>
      </div>
    </section>
  )
}
