"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CodingChallengeProps {
  challenge: {
    id: string
    title: string
    description: string
    hint: string
    solution: string
    difficulty: string
    type: string
  }
  onSubmit: (code: string) => void
  onRequestHint: () => void
  onExit: () => void
}

export default function CodingChallenge({ challenge, onSubmit, onRequestHint, onExit }: CodingChallengeProps) {
  const [code, setCode] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-bold">{challenge.title}</h3>
        <div className="text-sm text-muted-foreground">{challenge.description}</div>
        <div className="text-xs text-muted-foreground mt-1">
          Difficulty: {challenge.difficulty} | Type: {challenge.type}
        </div>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-40 bg-black border border-green-500 rounded-md p-2 font-mono text-green-500"
        placeholder="Write your solution here..."
      />

      <div className="flex gap-2">
        <Button
          onClick={() => onSubmit(code)}
          className="border-green-500 text-green-500 hover:bg-green-500/10"
          variant="outline"
        >
          Submit
        </Button>
        <Button
          onClick={onRequestHint}
          className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
          variant="outline"
        >
          Hint
        </Button>
        <Button onClick={onExit} className="border-red-500 text-red-500 hover:bg-red-500/10" variant="outline">
          Exit
        </Button>
      </div>
    </div>
  )
}
