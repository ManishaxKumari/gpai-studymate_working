"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight } from "lucide-react"

const colleges = [
  "IIT Delhi",
  "IIT Bombay",
  "IIT Madras",
  "Delhi University",
  "Mumbai University",
  "Bangalore University",
]

const branches = [
  "Computer Science",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Electronics",
  "Chemical Engineering",
]

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Data Structures",
  "Algorithms",
  "Database Management",
  "Web Development",
  "Machine Learning",
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<"college" | "branch" | "subject">("college")
  const [college, setCollege] = useState("")
  const [newCollege, setNewCollege] = useState("")
  const [branch, setBranch] = useState("")
  const [newBranch, setNewBranch] = useState("")
  const [subject, setSubject] = useState("")
  const [newSubject, setNewSubject] = useState("")
  const [showAddCollege, setShowAddCollege] = useState(false)
  const [showAddBranch, setShowAddBranch] = useState(false)
  const [showAddSubject, setShowAddSubject] = useState(false)

  const handleCollegeSelect = (value: string) => {
    if (value === "add") {
      setShowAddCollege(true)
    } else {
      setCollege(value)
      setStep("branch")
    }
  }

  const handleAddCollege = () => {
    if (newCollege.trim()) {
      setCollege(newCollege)
      setNewCollege("")
      setShowAddCollege(false)
      setStep("branch")
    }
  }

  const handleBranchSelect = (value: string) => {
    if (value === "add") {
      setShowAddBranch(true)
    } else {
      setBranch(value)
      setStep("subject")
    }
  }

  const handleAddBranch = () => {
    if (newBranch.trim()) {
      setBranch(newBranch)
      setNewBranch("")
      setShowAddBranch(false)
      setStep("subject")
    }
  }

  const handleSubjectSelect = (value: string) => {
    if (value === "add") {
      setShowAddSubject(true)
    } else {
      setSubject(value)
    }
  }

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      setSubject(newSubject)
      setNewSubject("")
      setShowAddSubject(false)
    }
  }

  const handleContinue = () => {
    if (subject) {
      router.push(
        `/study?college=${encodeURIComponent(college)}&branch=${encodeURIComponent(branch)}&subject=${encodeURIComponent(subject)}`,
      )
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        {step === "college" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Choose Your College</h1>
              <p className="text-gray-600">Select your college to get started</p>
            </div>

            {!showAddCollege ? (
              <div className="space-y-3">
                <Select value={college} onValueChange={handleCollegeSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a college" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                    <SelectItem value="add">+ Add College</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-3">
                <Input
                  placeholder="Enter college name"
                  value={newCollege}
                  onChange={(e) => setNewCollege(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddCollege()}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddCollege} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddCollege(false)
                      setNewCollege("")
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === "branch" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Branch</h1>
              <p className="text-gray-600 text-sm">College: {college}</p>
            </div>

            {!showAddBranch ? (
              <div className="space-y-3">
                <Select value={branch} onValueChange={handleBranchSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                    <SelectItem value="add">+ Add Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-3">
                <Input
                  placeholder="Enter branch name"
                  value={newBranch}
                  onChange={(e) => setNewBranch(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddBranch()}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddBranch} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddBranch(false)
                      setNewBranch("")
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <Button onClick={() => setStep("college")} variant="ghost" className="w-full text-gray-600">
              Back
            </Button>
          </div>
        )}

        {step === "subject" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Subject</h1>
              <p className="text-gray-600 text-sm">
                {college} • {branch}
              </p>
            </div>

            {!showAddSubject ? (
              <div className="space-y-3">
                <Select value={subject} onValueChange={handleSubjectSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                    <SelectItem value="add">+ Add Subject</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-3">
                <Input
                  placeholder="Enter subject name"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddSubject()}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddSubject} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddSubject(false)
                      setNewSubject("")
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <Button onClick={() => setStep("branch")} variant="ghost" className="w-full text-gray-600">
              Back
            </Button>

            <Button
              onClick={handleContinue}
              disabled={!subject}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Start Learning
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
    </main>
  )
}
