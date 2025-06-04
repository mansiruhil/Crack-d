"use client"

import { useState, useEffect } from "react"

interface GameMapProps {
  position: number
  maxPosition: number
}

export default function GameMap({ position, maxPosition }: GameMapProps) {
  const [mapElements, setMapElements] = useState<string[]>([])

  useEffect(() => {
    // Generate map based on position and max position
    const elements = []
    for (let i = 0; i <= maxPosition; i++) {
      if (i === position) {
        elements.push("@") // Player position
      } else if (i % 3 === 0) {
        elements.push("X") // Enemy position
      } else {
        elements.push(".") // Empty space
      }
    }
    setMapElements(elements)
  }, [position, maxPosition])

  return <div className="font-mono text-green-500 text-center">{mapElements.join(" ")}</div>
}
