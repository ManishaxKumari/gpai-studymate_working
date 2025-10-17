"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Sidebar } from "@/components/study/sidebar"
import { ChatInterface } from "@/components/study/chat-interface"

export default function StudyPage() {
  const searchParams = useSearchParams()
  const [college, setCollege] = useState("")
  const [branch, setBranch] = useState("")
  const [subject, setSubject] = useState("")

  useEffect(() => {
    setCollege(searchParams.get("college") || "")
    setBranch(searchParams.get("branch") || "")
    setSubject(searchParams.get("subject") || "")
  }, [searchParams])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar subject={subject} college={college} branch={branch} />
      <ChatInterface subject={subject} />
    </div>
  )
}
