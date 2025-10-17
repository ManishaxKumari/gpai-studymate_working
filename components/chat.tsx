"use client"

import type React from "react"
import ReactMarkdown from "react-markdown"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Send } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: data.reply,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("[v0] Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Sorry, I encountered an error. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col h-full">
      {/* Chat Messages Container */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-8 md:p-12 space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-lg text-muted-foreground mb-2">Ask GPAI StudyMate anything...</p>
              <p className="text-sm text-muted-foreground">
                Get personalized study help, create study plans, and learn smarter
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-md rounded-2xl p-4 ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm border border-primary/20"
                }`}
              >
                {message.type === "ai" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                        em: ({ node, ...props }) => <em className="italic" {...props} />,
                        code: ({ node, inline, ...props }) =>
                          inline ? (
                            <code className="bg-primary/10 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                          ) : (
                            <code
                              className="block bg-primary/10 p-2 rounded text-sm font-mono overflow-x-auto"
                              {...props}
                            />
                          ),
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                        h1: ({ node, ...props }) => <h1 className="text-lg font-bold mb-2" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-base font-bold mb-2" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-sm font-bold mb-1" {...props} />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="bg-muted text-foreground rounded-2xl rounded-tl-sm border border-primary/20 p-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 md:p-6 bg-background">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask GPAI StudyMate anything…"
            disabled={isLoading}
            className="flex-1 rounded-full px-4 py-3 bg-input text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 p-3"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
