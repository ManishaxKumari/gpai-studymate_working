"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react"
import { validateFile, formatFileSize, type UploadedFile } from "@/lib/file-upload"

interface FileUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: UploadedFile) => void
  acceptedTypes?: string
}

export function FileUploadDialog({
  isOpen,
  onClose,
  onUpload,
  acceptedTypes = ".pdf,.pptx,.txt",
}: FileUploadDialogProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    setError(null)

    files.forEach((file) => {
      const validation = validateFile(file)

      if (!validation.valid) {
        setError(validation.error || "Invalid file")
        return
      }

      const fileType = file.name.split(".").pop()?.toLowerCase() as "pdf" | "pptx" | "txt"
      const uploadedFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        type: fileType,
        size: file.size,
        uploadedAt: new Date(),
      }

      setUploadedFiles((prev) => [...prev, uploadedFile])
      onUpload(uploadedFile)
    })
  }

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Upload Study Material</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
            isDragging ? "border-purple-600 bg-purple-50" : "border-purple-300 hover:bg-purple-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-600 mt-1">PDF, PPTX, or TXT files (max 50MB)</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileInput}
          className="hidden"
          multiple
        />

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-900">Uploaded Files:</p>
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 flex-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-600">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFile(file.id)}
                  className="text-gray-500 hover:text-red-600 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-2">
          <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            disabled={uploadedFiles.length === 0}
          >
            Done
          </Button>
        </div>
      </Card>
    </div>
  )
}
