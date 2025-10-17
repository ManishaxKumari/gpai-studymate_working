"use client"

import { Card } from "@/components/ui/card"

const features = [
  {
    icon: "✨",
    title: "AI Notes Generator",
    description: "Summarize topics instantly into concise study notes.",
  },
  {
    icon: "🎯",
    title: "Doubt Solver",
    description: "Get step-by-step answers from your AI tutor.",
  },
  {
    icon: "📅",
    title: "Study Planner",
    description: "Auto-generate daily learning plans customized to your syllabus.",
  },
  {
    icon: "📈",
    title: "Exam Booster",
    description: "Analyze weak areas and suggest how to improve.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Smarter Tools for Smarter Students</h2>
          <p className="text-lg text-muted-foreground">Everything you need to excel in your studies</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
