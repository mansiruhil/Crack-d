"use client"

import { Progress } from "@/components/ui/progress"

interface PlayerStatsProps {
  player: {
    name: string
    level: string
    health: number
    maxHealth: number
    experience: number
    skills: {
      algorithms: number
      dataStructures: number
      systemDesign: number
      debugging: number
    }
    inventory: string[]
  }
}

export default function PlayerStats({ player }: PlayerStatsProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border border-green-500 rounded-md">
      <div>
        <h2 className="text-lg font-bold text-green-500">{player.name}</h2>
        <div className="text-sm text-green-500">{player.level} Developer</div>
      </div>

      {/* Health and XP */}
      <div>
        <div className="flex justify-between text-xs text-green-500">
          <span>Health</span>
          <span>
            {player.health}/{player.maxHealth}
          </span>
        </div>
        <Progress value={(player.health / player.maxHealth) * 100} className="h-2 mt-1" />

        <div className="flex justify-between text-xs text-green-500 mt-2">
          <span>Experience</span>
          <span>{player.experience}</span>
        </div>
        <Progress value={player.experience % 100} className="h-2 mt-1" />
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-sm font-bold text-green-500">Skills</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="text-green-500 text-xs">
            <div className="flex justify-between">
              <span>Algorithms</span>
              <span>{player.skills.algorithms}</span>
            </div>
            <Progress value={player.skills.algorithms * 2} className="h-1 mt-1" />
          </div>
          <div className="text-green-500 text-xs">
            <div className="flex justify-between">
              <span>Data Structures</span>
              <span>{player.skills.dataStructures}</span>
            </div>
            <Progress value={player.skills.dataStructures * 2} className="h-1 mt-1" />
          </div>
          <div className="text-green-500 text-xs">
            <div className="flex justify-between">
              <span>System Design</span>
              <span>{player.skills.systemDesign}</span>
            </div>
            <Progress value={player.skills.systemDesign * 2} className="h-1 mt-1" />
          </div>
          <div className="text-green-500 text-xs">
            <div className="flex justify-between">
              <span>Debugging</span>
              <span>{player.skills.debugging}</span>
            </div>
            <Progress value={player.skills.debugging * 2} className="h-1 mt-1" />
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div>
        <h3 className="text-sm font-bold text-green-500">Inventory</h3>
        <ul className="text-xs text-green-500 mt-1">
          {player.inventory.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
