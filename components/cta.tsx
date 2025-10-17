"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 md:p-16 border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Study Smarter?</h2>

          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students using AI to learn faster and score better.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6 justify-center">
            <Link href="/onboarding">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 font-semibold whitespace-nowrap">
                Start Learning Free
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">No credit card required. Start learning free today.</p>
        </div>
      </div>
    </section>
  )
}
