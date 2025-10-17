"use client"

import { useState, useEffect } from "react"

export interface StudyItem {
  id: string
  title: string
  type: "note" | "bookmark" | "saved-point"
  content: string
  createdAt: Date
}

const STORAGE_KEY = "studymate_data"

export function useStudyData() {
  const [notes, setNotes] = useState<StudyItem[]>([])
  const [bookmarks, setBookmarks] = useState<StudyItem[]>([])
  const [savedPoints, setSavedPoints] = useState<StudyItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setNotes(data.notes || [])
        setBookmarks(data.bookmarks || [])
        setSavedPoints(data.savedPoints || [])
      } catch (error) {
        console.error("[v0] Error loading study data:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          notes,
          bookmarks,
          savedPoints,
        }),
      )
    }
  }, [notes, bookmarks, savedPoints, isLoaded])

  const addNote = (content: string, title?: string) => {
    const newNote: StudyItem = {
      id: Date.now().toString(),
      title: title || "Untitled Note",
      type: "note",
      content,
      createdAt: new Date(),
    }
    setNotes((prev) => [newNote, ...prev])
    return newNote
  }

  const addBookmark = (content: string, title?: string) => {
    const newBookmark: StudyItem = {
      id: Date.now().toString(),
      title: title || "Untitled Bookmark",
      type: "bookmark",
      content,
      createdAt: new Date(),
    }
    setBookmarks((prev) => [newBookmark, ...prev])
    return newBookmark
  }

  const addSavedPoint = (content: string, title?: string) => {
    const newPoint: StudyItem = {
      id: Date.now().toString(),
      title: title || "Untitled Point",
      type: "saved-point",
      content,
      createdAt: new Date(),
    }
    setSavedPoints((prev) => [newPoint, ...prev])
    return newPoint
  }

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  const deleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  const deleteSavedPoint = (id: string) => {
    setSavedPoints((prev) => prev.filter((s) => s.id !== id))
  }

  return {
    notes,
    bookmarks,
    savedPoints,
    addNote,
    addBookmark,
    addSavedPoint,
    deleteNote,
    deleteBookmark,
    deleteSavedPoint,
    isLoaded,
  }
}
