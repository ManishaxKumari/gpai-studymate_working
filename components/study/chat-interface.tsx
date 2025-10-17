"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Upload, FileText, BarChart3, Send, Loader2, X } from "lucide-react"
import { MessageActions } from "./message-actions"
import { useStudyData } from "@/hooks/use-study-data"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  subject: string
}

type Mode = "chat" | "study" | "upload-book" | "upload-slides" | "exam-analysis"

export function ChatInterface({ subject }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Welcome to your ${subject} study session! I'm your AI tutor. Choose an option below to get started.`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<Mode>("chat")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addNote, addBookmark, addSavedPoint } = useStudyData()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
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
        throw new Error("Failed to get response from API")
      }

      const data = await response.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "Sorry, I couldn't generate a response.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    setMessages([
      {
        id: Date.now().toString(),
        role: "assistant",
        content: getModeWelcomeMessage(newMode),
        timestamp: new Date(),
      },
    ])
  }

  const getModeWelcomeMessage = (selectedMode: Mode): string => {
    switch (selectedMode) {
      case "study":
        return `Let's start studying ${subject}! Ask me any questions about concepts, formulas, or topics you'd like to understand better.`
      case "upload-book":
        return `Upload your textbook or study material, and I'll explain it concept by concept like a personal tutor.`
      case "upload-slides":
        return `Upload your class slides, and I'll provide detailed explanations with examples for each slide.`
      case "exam-analysis":
        return `Upload previous year question papers, and I'll analyze them to predict likely exam questions and important topics.`
      default:
        return `Welcome! How can I help you study today?`
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: `Uploaded: ${file.name}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Great! I've received your file "${file.name}". I'm analyzing it now. This will take a moment...`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1500)
    }
  }

  const handleSaveNote = (content: string) => {
    addNote(content, `Note from ${subject}`)
  }

  const handleSaveBookmark = (content: string) => {
    addBookmark(content, `Bookmark from ${subject}`)
  }

  const handleSaveSavedPoint = (content: string) => {
    addSavedPoint(content, `Key Point from ${subject}`)
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">{subject}</h1>
        <p className="text-sm text-gray-600 mt-1">AI-powered learning assistant</p>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 md:p-6">
        <div className="space-y-4 max-w-3xl">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-xs md:max-w-md lg:max-w-lg">
                <Card
                  className={`px-4 py-3 ${
                    message.role === "user"
                      ? "bg-purple-600 text-white rounded-2xl rounded-tr-none"
                      : "bg-gray-100 text-gray-900 rounded-2xl rounded-tl-none"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div className="text-sm md:text-base prose prose-sm max-w-none">
                      <ReactMarkdown>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm md:text-base">{message.content}</p>
                  )}
                  <p className={`text-xs mt-2 ${message.role === "user" ? "text-purple-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </Card>
                {message.role === "assistant" && (
                  <MessageActions
                    content={message.content}
                    onSaveNote={handleSaveNote}
                    onSaveBookmark={handleSaveBookmark}
                    onSaveSavedPoint={handleSaveSavedPoint}
                  />
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-none">
                <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
              </Card>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Mode Selection */}
      {mode === "chat" && messages.length === 1 && (
        <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50">
          <p className="text-sm text-gray-600 mb-4 font-medium">Quick Actions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="justify-start h-auto py-3 px-4 border-purple-200 hover:bg-purple-50 bg-transparent"
              onClick={() => handleModeChange("study")}
            >
              <BookOpen className="h-5 w-5 text-purple-600 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Start Study</p>
                <p className="text-xs text-gray-600">Begin AI-guided learning</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto py-3 px-4 border-purple-200 hover:bg-purple-50 bg-transparent"
              onClick={() => handleModeChange("upload-book")}
            >
              <Upload className="h-5 w-5 text-purple-600 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Upload Book</p>
                <p className="text-xs text-gray-600">Upload textbook PDF</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto py-3 px-4 border-purple-200 hover:bg-purple-50 bg-transparent"
              onClick={() => handleModeChange("upload-slides")}
            >
              <FileText className="h-5 w-5 text-purple-600 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Upload Slides</p>
                <p className="text-xs text-gray-600">Upload class slides</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto py-3 px-4 border-purple-200 hover:bg-purple-50 bg-transparent"
              onClick={() => handleModeChange("exam-analysis")}
            >
              <BarChart3 className="h-5 w-5 text-purple-600 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Exam Analysis</p>
                <p className="text-xs text-gray-600">Upload previous papers</p>
              </div>
            </Button>
          </div>
        </div>
      )}

      {/* Mode Header */}
      {mode !== "chat" && (
        <div className="border-t border-gray-200 px-4 md:px-6 py-3 bg-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mode === "study" && <BookOpen className="h-5 w-5 text-purple-600" />}
            {mode === "upload-book" && <Upload className="h-5 w-5 text-purple-600" />}
            {mode === "upload-slides" && <FileText className="h-5 w-5 text-purple-600" />}
            {mode === "exam-analysis" && <BarChart3 className="h-5 w-5 text-purple-600" />}
            <span className="text-sm font-medium text-gray-900 capitalize">
              {mode === "upload-book" && "Upload Textbook"}
              {mode === "upload-slides" && "Upload Slides"}
              {mode === "exam-analysis" && "Exam Analysis"}
              {mode === "study" && "Study Mode"}
            </span>
          </div>
          <Button size="sm" variant="ghost" onClick={() => handleModeChange("chat")} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* File Upload Area */}
      {(mode === "upload-book" || mode === "upload-slides" || mode === "exam-analysis") && !uploadedFile && (
        <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50">
          <div
            className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center cursor-pointer hover:bg-purple-50 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-600 mt-1">PDF, PPTX, or TXT files supported</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.pptx,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 md:p-6 bg-white">
        <div className="flex gap-3 max-w-3xl">
          <Input
            placeholder={
              mode === "upload-book" || mode === "upload-slides" || mode === "exam-analysis"
                ? "Ask questions about the uploaded file..."
                : "Ask me anything about this subject..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            className="flex-1 rounded-full border-gray-300"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 h-auto w-auto"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
