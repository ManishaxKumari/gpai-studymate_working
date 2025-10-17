"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, FileText, Bookmark, Zap, Download, Plus, Menu, X, Trash2 } from "lucide-react"
import { useStudyData } from "@/hooks/use-study-data"

interface SidebarProps {
  subject: string
  college: string
  branch: string
}

interface StudyItem {
  id: string
  title: string
  type: "note" | "bookmark" | "saved-point"
  content: string
  createdAt: Date
}

export function Sidebar({ subject, college, branch }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [myBooks] = useState<string[]>([subject])
  const [selectedNote, setSelectedNote] = useState<StudyItem | null>(null)

  const { notes, bookmarks, savedPoints, deleteNote, deleteBookmark, deleteSavedPoint, isLoaded } = useStudyData()

  const handleExportPDF = () => {
    alert("Exporting all notes and bookmarks as PDF...")
  }

  if (!isLoaded) {
    return <div className="w-64 h-screen bg-gradient-to-b from-purple-50 to-white border-r border-gray-200" />
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative md:translate-x-0 transition-transform duration-300 w-64 h-screen bg-gradient-to-b from-purple-50 to-white border-r border-gray-200 flex flex-col z-40`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">StudyMate</h2>
          <p className="text-xs text-gray-600 mt-1 font-medium">{subject}</p>
          <p className="text-xs text-gray-500">
            {college} • {branch}
          </p>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* My Books Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-purple-600" />
                  My Books
                </h3>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-purple-100">
                  <Plus className="h-4 w-4 text-purple-600" />
                </Button>
              </div>
              <div className="space-y-2">
                {myBooks.map((book, idx) => (
                  <Card
                    key={idx}
                    className="p-3 cursor-pointer hover:bg-purple-50 transition-colors border-purple-200 bg-white hover:shadow-md"
                  >
                    <p className="text-sm font-medium text-gray-900">{book}</p>
                    <p className="text-xs text-purple-600 mt-1 font-medium">Active</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-600" />
                  Notes
                </h3>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                  {notes.length}
                </span>
              </div>
              <div className="space-y-2">
                {notes.length > 0 ? (
                  notes.map((note) => (
                    <Card
                      key={note.id}
                      className="p-3 cursor-pointer hover:bg-purple-50 transition-colors border-purple-200 bg-white group"
                      onClick={() => setSelectedNote(note)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{note.title}</p>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{note.content}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNote(note.id)
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-3 text-center text-gray-500 text-sm bg-gray-50">
                    No notes yet. Start studying to create notes.
                  </Card>
                )}
              </div>
            </div>

            {/* Bookmarks Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-purple-600" />
                  Bookmarks
                </h3>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                  {bookmarks.length}
                </span>
              </div>
              <div className="space-y-2">
                {bookmarks.length > 0 ? (
                  bookmarks.map((bookmark) => (
                    <Card
                      key={bookmark.id}
                      className="p-3 cursor-pointer hover:bg-purple-50 transition-colors border-purple-200 bg-white group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{bookmark.title}</p>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{bookmark.content}</p>
                        </div>
                        <button
                          onClick={() => deleteBookmark(bookmark.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-3 text-center text-gray-500 text-sm bg-gray-50">No bookmarks yet.</Card>
                )}
              </div>
            </div>

            {/* Saved Points Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  Saved Points
                </h3>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                  {savedPoints.length}
                </span>
              </div>
              <div className="space-y-2">
                {savedPoints.length > 0 ? (
                  savedPoints.map((point) => (
                    <Card
                      key={point.id}
                      className="p-3 cursor-pointer hover:bg-purple-50 transition-colors border-purple-200 bg-white group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{point.title}</p>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{point.content}</p>
                        </div>
                        <button
                          onClick={() => deleteSavedPoint(point.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-3 text-center text-gray-500 text-sm bg-gray-50">No saved points yet.</Card>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <Button
            onClick={handleExportPDF}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export as PDF
          </Button>
        </div>
      </div>

      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 md:hidden">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{selectedNote.title}</h3>
              <button onClick={() => setSelectedNote(null)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-700 mb-4">{selectedNote.content}</p>
            <p className="text-xs text-gray-500">Created: {selectedNote.createdAt.toLocaleDateString()}</p>
          </Card>
        </div>
      )}

      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsOpen(false)} />}
    </>
  )
}
