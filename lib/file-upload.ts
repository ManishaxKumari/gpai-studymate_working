export interface UploadedFile {
  id: string
  name: string
  type: "pdf" | "pptx" | "txt"
  size: number
  uploadedAt: Date
  content?: string
}

export const ALLOWED_FILE_TYPES = {
  pdf: "application/pdf",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
}

export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export function validateFile(file: File): { valid: boolean; error?: string } {
  const fileExtension = file.name.split(".").pop()?.toLowerCase()

  if (!fileExtension || !Object.keys(ALLOWED_FILE_TYPES).includes(fileExtension)) {
    return { valid: false, error: "File type not supported. Please upload PDF, PPTX, or TXT files." }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "File size exceeds 50MB limit." }
  }

  return { valid: true }
}

export async function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const content = e.target?.result as string
      resolve(content)
    }

    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }

    reader.readAsText(file)
  })
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
}
