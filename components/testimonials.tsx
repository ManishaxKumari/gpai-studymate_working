"use client"

import { Card } from "@/components/ui/card"

const testimonials = [
  {
    name: "Aditi",
    college: "NIT Rourkela",
    text: "GPAI StudyMate makes revision feel effortless! I can now prepare for exams in half the time.",
    avatar: "👩‍🎓",
  },
  {
    name: "Raj",
    college: "IIT Bombay",
    text: "It's like having a 24/7 study buddy. The AI understands my syllabus and helps me focus on what matters.",
    avatar: "👨‍🎓",
  },
  {
    name: "Priya",
    college: "Delhi University",
    text: "The exam predictor feature helped me score 95%! Highly recommend to all students.",
    avatar: "👩‍🎓",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Loved by Students Everywhere</h2>
          <p className="text-lg text-muted-foreground">Join thousands of students using AI to learn faster</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 border border-primary/20 bg-card hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.college}</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">"{testimonial.text}"</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
