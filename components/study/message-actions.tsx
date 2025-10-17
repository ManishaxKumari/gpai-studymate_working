"use client"

import { Button } from "@/components/ui/button"
import { Bookmark, FileText, Zap } from "lucide-react"
import { useState } from "react"

interface MessageActionsProps {
  content: string
  onSaveNote: (content: string) => void
  onSaveBookmark: (content: string) => void
  onSaveSavedPoint: (content: string) => void
}

export function MessageActions({ content, onSaveNote, onSaveBookmark, onSaveSavedPoint }: MessageActionsProps) {
  const [saved, setSaved] = useState<"note" | "bookmark" | "point" | null>(null)

  const handleSaveNote = () => {
    onSaveNote(content)
    setSaved("note")
    setTimeout(() => setSaved(null), 2000)
  }

  const handleSaveBookmark = () => {
    onSaveBookmark(content)
    setSaved("bookmark")
    setTimeout(() => setSaved(null), 2000)
  }

  const handleSaveSavedPoint = () => {
    onSaveSavedPoint(content)
    setSaved("point")
    setTimeout(() => setSaved(null), 2000)
  }

  return (
    <div className="flex gap-2 mt-2 flex-wrap">
      <Button
        size="sm"
        variant="ghost"
        className={`h-7 px-2 text-xs ${
          saved === "note" ? "bg-green-100 text-green-700 hover:bg-green-100" : "text-gray-600 hover:bg-gray-100"
        }`}
        onClick={handleSaveNote}
      >
        <FileText className="h-3 w-3 mr-1" />
        {saved === "note" ? "Saved!" : "Save Note"}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className={`h-7 px-2 text-xs ${
          saved === "bookmark" ? "bg-green-100 text-green-700 hover:bg-green-100" : "text-gray-600 hover:bg-gray-100"
        }`}
        onClick={handleSaveBookmark}
      >
        <Bookmark className="h-3 w-3 mr-1" />
        {saved === "bookmark" ? "Saved!" : "Bookmark"}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className={`h-7 px-2 text-xs ${
          saved === "point" ? "bg-green-100 text-green-700 hover:bg-green-100" : "text-gray-600 hover:bg-gray-100"
        }`}
        onClick={handleSaveSavedPoint}
      >
        <Zap className="h-3 w-3 mr-1" />
        {saved === "point" ? "Saved!" : "Save Point"}
      </Button>
    </div>
  )
}
