"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Terminal, Code, Brain } from "lucide-react"

interface GameIntroProps {
  onStart: (playerName: string) => void
}

export default function GameIntro({ onStart }: GameIntroProps) {
  const [playerName, setPlayerName] = useState("")

  const handleStart = () => {
    if (playerName.trim()) {
      onStart(playerName)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 border border-green-500 rounded-md">
      <div className="flex items-center gap-2">
        <Terminal className="h-8 w-8 text-green-500" />
        <h1 className="text-3xl font-bold text-green-500">Terminal Quest</h1>
      </div>

      <div className="text-center text-green-500 max-w-md">
        <p className="mb-4">
          Welcome to Terminal Quest: Code Adventure! Embark on an epic journey to become a master developer.
        </p>
        <p>
          Battle rejection letters, fake internships, and tricky coding bosses by solving real algorithm challenges.
          Level up your skills and turn the grind into an adventure!
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <div>
          <label htmlFor="player-name" className="text-sm text-green-500 mb-1 block">
            Enter Your Developer Name
          </label>
          <Input
            id="player-name"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="bg-black border-green-500 text-green-500"
            placeholder="Developer Name"
          />
        </div>

        <Button
          onClick={handleStart}
          className="border-green-500 text-green-500 hover:bg-green-500/10"
          variant="outline"
          disabled={!playerName.trim()}
        >
          Start Adventure
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="flex flex-col items-center text-center">
          <Code className="h-6 w-6 text-green-500 mb-2" />
          <h3 className="text-sm font-bold text-green-500">Solve Challenges</h3>
          <p className="text-xs text-green-500">Master algorithms and data structures</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Brain className="h-6 w-6 text-green-500 mb-2" />
          <h3 className="text-sm font-bold text-green-500">Level Up</h3>
          <p className="text-xs text-green-500">Gain skills and experience</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Terminal className="h-6 w-6 text-green-500 mb-2" />
          <h3 className="text-sm font-bold text-green-500">Epic Adventure</h3>
          <p className="text-xs text-green-500">Turn learning into a game</p>
        </div>
      </div>
    </div>
  )
}
