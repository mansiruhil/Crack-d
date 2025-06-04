"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sword, Shield, Brain, Code } from "lucide-react"

interface BattleSceneProps {
  enemy: {
    name: string
    type: string
    health: number
    maxHealth: number
    damage: number
    weakness: string
    ascii: string[]
  }
  playerHealth: number
  playerMaxHealth: number
  onAttack: () => void
  onDefend: () => void
  onAnalyze: () => void
  onSolveChallenge: () => void
}

export default function BattleScene({
  enemy,
  playerHealth,
  playerMaxHealth,
  onAttack,
  onDefend,
  onAnalyze,
  onSolveChallenge,
}: BattleSceneProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Enemy ASCII art */}
      <div className="font-mono text-red-500 whitespace-pre">
        {enemy.ascii.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>

      {/* Enemy stats */}
      <div>
        <div className="flex justify-between text-sm">
          <span className="text-red-500 font-bold">{enemy.name}</span>
          <span className="text-red-500">
            {enemy.health}/{enemy.maxHealth} HP
          </span>
        </div>
        <Progress
          value={(enemy.health / enemy.maxHealth) * 100}
          className="h-2 mt-1 bg-red-900"
          indicatorClassName="bg-red-500"
        />
      </div>

      {/* Player health */}
      <div>
        <div className="flex justify-between text-sm">
          <span className="text-green-500 font-bold">Your Health</span>
          <span className="text-green-500">
            {playerHealth}/{playerMaxHealth} HP
          </span>
        </div>
        <Progress value={(playerHealth / playerMaxHealth) * 100} className="h-2 mt-1" />
      </div>

      {/* Battle actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={onAttack} className="flex items-center gap-2" variant="outline">
          <Sword className="h-4 w-4" /> Attack
        </Button>
        <Button onClick={onDefend} className="flex items-center gap-2" variant="outline">
          <Shield className="h-4 w-4" /> Defend
        </Button>
        <Button onClick={onAnalyze} className="flex items-center gap-2" variant="outline">
          <Brain className="h-4 w-4" /> Analyze
        </Button>
        <Button onClick={onSolveChallenge} className="flex items-center gap-2" variant="outline">
          <Code className="h-4 w-4" /> Solve Challenge
        </Button>
      </div>
    </div>
  )
}
