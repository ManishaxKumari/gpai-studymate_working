"use client"
import { Chat } from "@/components/chat"

export function Demo() {
  return (
    <section id="demo" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">See How GPAI Helps You Study Smarter</h2>
          <p className="text-lg text-muted-foreground">Experience the power of AI-assisted learning</p>
        </div>

        <div className="h-96">
          <Chat />
        </div>
      </div>
    </section>
  )
}
