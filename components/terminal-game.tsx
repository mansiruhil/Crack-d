"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Terminal, Brain, Code, Zap, Star } from "lucide-react"

type GameState = "intro" | "academy" | "dungeon" | "challenge" | "victory"
type PlayerLevel = "novice" | "apprentice" | "expert" | "master" | "grandmaster"

interface Player {
  name: string
  level: PlayerLevel
  health: number
  maxHealth: number
  experience: number
  skills: {
    arrays: number
    strings: number
    trees: number
    graphs: number
    sorting: number
    searching: number
  }
  solvedProblems: number
  badges: string[]
}

interface CodeBoss {
  id: string
  name: string
  type: "arrayBeast" | "stringDragon" | "treeTitan" | "graphGiant" | "sortingSorcerer" | "searchingSage"
  health: number
  maxHealth: number
  damage: number
  weakness: string
  ascii: string[]
  dialogue: string[]
  skillType: keyof Player["skills"]
}

export default function TerminalGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState("")
  const [player, setPlayer] = useState<Player>({
    name: "",
    level: "novice",
    health: 100,
    maxHealth: 100,
    experience: 0,
    skills: {
      arrays: 1,
      strings: 1,
      trees: 1,
      graphs: 1,
      sorting: 1,
      searching: 1,
    },
    solvedProblems: 0,
    badges: [],
  })
  const [currentBoss, setCurrentBoss] = useState<CodeBoss | null>(null)
  const [gameLog, setGameLog] = useState<string[]>([
    "╔══════════════════════════════════════╗",
    "║               CRACK'D                ║",
    "╚══════════════════════════════════════╝",
    "",
    "Welcome to crack'd - Master coding through adventure",
    "Type your coder name and press Enter...",
  ])
  const [inputValue, setInputValue] = useState("")
  const [gamePhase, setGamePhase] = useState<"setup" | "exploring" | "battle" | "challenge">("setup")
  const [currentChallenge, setCurrentChallenge] = useState<any>(null)

  const logRef = useRef<HTMLDivElement>(null)

  // Change document title
  useEffect(() => {
    document.title = "crack'd"
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [gameLog])

  const addLog = (message: string) => {
    setGameLog((prev) => [...prev, message])
  }

  const addLogWithEffect = (message: string, effect = "normal") => {
    switch (effect) {
      case "success":
        addLog(`[SUCCESS] ${message}`)
        break
      case "error":
        addLog(`[ERROR] ${message}`)
        break
      case "info":
        addLog(`[INFO] ${message}`)
        break
      case "star":
        addLog(`[REWARD] ${message}`)
        break
      case "fire":
        addLog(`[EPIC] ${message}`)
        break
      default:
        addLog(message)
    }
  }

  // Code Bosses - Pure Algorithm Focused
  const codeBosses: CodeBoss[] = [
    {
      id: "array-beast",
      name: "Array Beast",
      type: "arrayBeast",
      health: 40,
      maxHealth: 40,
      damage: 12,
      weakness: "two-pointer technique",
      skillType: "arrays",
      ascii: [
        "┌──────────────────────────┐",
        "│    ARRAY BEAST           │",
        "│  [A][B][C][D][E]         │",
        "│   ↑  ↓  ↑  ↓  ↑         │",
        "│  [F][G][H][I][J]         │",
        "│   ↓  ↑  ↓  ↑  ↓         │",
        "│  [K][L][M][N][O]         │",
        "└──────────────────────────┘",
      ],
      dialogue: [
        "My arrays are unsorted chaos!",
        "Can you find the pattern in my elements?",
        "Two pointers won't save you!",
      ],
    },
    {
      id: "string-dragon",
      name: "String Dragon",
      type: "stringDragon",
      health: 50,
      maxHealth: 50,
      damage: 15,
      weakness: "palindrome detection",
      skillType: "strings",
      ascii: [
        "STRING DRAGON",
        '   "ROAR ROAR"      ',
        "  /           \\     ",
        " /  Palindrome \\    ",
        "/    Breath     \\   ",
        "\\               /   ",
        " \\   Anagram   /    ",
        "  \\   Fire    /     ",
        '   "RAOR RAOR"      ',
      ],
      dialogue: [
        "My strings are twisted and reversed!",
        "Can you untangle my word puzzles?",
        "Palindromes are my weakness!",
      ],
    },
    {
      id: "tree-titan",
      name: "Binary Tree Titan",
      type: "treeTitan",
      health: 70,
      maxHealth: 70,
      damage: 20,
      weakness: "tree traversal",
      skillType: "trees",
      ascii: [
        "BINARY TREE TITAN",
        "        ┌───┐           ",
        "        │ R │           ",
        "     ┌──┴───┴──┐        ",
        "  ┌──┴──┐   ┌──┴──┐     ",
        "  │  S  │   │  T  │     ",
        "┌─┴─┐ ┌─┴─┐ ┌─┴─┐ ┌─┴─┐ ",
        "│ A │ │ B │ │ C │ │ D │ ",
        "└───┘ └───┘ └───┘ └───┘ ",
      ],
      dialogue: [
        "My branches reach infinite depths!",
        "Can you traverse my mighty structure?",
        "Inorder, preorder, postorder - choose wisely!",
      ],
    },
    {
      id: "graph-giant",
      name: "Graph Giant",
      type: "graphGiant",
      health: 80,
      maxHealth: 80,
      damage: 25,
      weakness: "graph traversal",
      skillType: "graphs",
      ascii: [
        "GRAPH GIANT",
        "    A ──── B      ",
        "   /│\\    /│\\     ",
        "  / │ \\  / │ \\    ",
        " C  │  D   │  E   ",
        "  \\ │ /    │ /    ",
        "   \\│/     │/     ",
        "    F ──── G      ",
        "      \\   /       ",
        "       \\ /        ",
        "        H         ",
      ],
      dialogue: [
        "My connections span infinite networks!",
        "Can you find the shortest path through me?",
        "DFS and BFS are your only hope!",
      ],
    },
    {
      id: "sorting-sorcerer",
      name: "Sorting Sorcerer",
      type: "sortingSorcerer",
      health: 60,
      maxHealth: 60,
      damage: 18,
      weakness: "efficient sorting",
      skillType: "sorting",
      ascii: [
        "SORTING SORCERER",
        "  [9][2][7][1][5][8]   ",
        "   ↓  ↓  ↓  ↓  ↓  ↓   ",
        "  --- CHAOS MAGIC ---  ",
        "   ↓  ↓  ↓  ↓  ↓  ↓   ",
        "  [?][?][?][?][?][?]   ",
        "                       ",
        "  ORDER FROM CHAOS     ",
      ],
      dialogue: [
        "My elements dance in chaotic disorder!",
        "Can you bring order to my realm?",
        "Quick sort, merge sort - show me your power!",
      ],
    },
    {
      id: "searching-sage",
      name: "Searching Sage",
      type: "searchingSage",
      health: 55,
      maxHealth: 55,
      damage: 16,
      weakness: "binary search",
      skillType: "searching",
      ascii: [
        "SEARCHING SAGE",
        "  [1][3][5][7][9][11]  ",
        "   ↑           ↑      ",
        "  Low         High     ",
        "       ↓               ",
        "     Target: 7         ",
        "       ↓               ",
        "   --- FIND ME! ---    ",
      ],
      dialogue: ["I hide in sorted arrays!", "Can you find me efficiently?", "Linear search is too slow for my taste!"],
    },
  ]

  // Coding Challenges
  const challenges = [
    {
      id: "two-sum",
      title: "Two Sum Challenge",
      type: "arrays",
      description: "Find two numbers that add up to a target sum.",
      hint: "Use a hash map to store seen numbers and their indices.",
      keywords: ["hash", "map", "target", "two", "sum"],
      xpReward: 30,
      skillBoost: 3,
    },
    {
      id: "reverse-string",
      title: "String Reversal",
      type: "strings",
      description: "Reverse a string using optimal space complexity.",
      hint: "Two pointers from start and end, swap characters.",
      keywords: ["two", "pointer", "swap", "reverse"],
      xpReward: 25,
      skillBoost: 2,
    },
    {
      id: "palindrome",
      title: "Palindrome Detector",
      type: "strings",
      description: "Check if a string reads the same forwards and backwards.",
      hint: "Clean the string first, then compare with its reverse.",
      keywords: ["palindrome", "clean", "reverse", "same"],
      xpReward: 25,
      skillBoost: 2,
    },
    {
      id: "binary-search",
      title: "Binary Search Master",
      type: "searching",
      description: "Find a target element in a sorted array efficiently.",
      hint: "Divide the search space in half each iteration.",
      keywords: ["binary", "search", "sorted", "divide", "half"],
      xpReward: 35,
      skillBoost: 3,
    },
    {
      id: "tree-traversal",
      title: "Tree Walker",
      type: "trees",
      description: "Traverse a binary tree in different orders.",
      hint: "Inorder: Left -> Root -> Right. Use recursion or stack.",
      keywords: ["inorder", "traversal", "left", "root", "right"],
      xpReward: 40,
      skillBoost: 4,
    },
    {
      id: "bubble-sort",
      title: "Bubble Sort Champion",
      type: "sorting",
      description: "Sort an array using the bubble sort algorithm.",
      hint: "Compare adjacent elements and swap if needed.",
      keywords: ["bubble", "sort", "adjacent", "swap", "compare"],
      xpReward: 20,
      skillBoost: 2,
    },
    {
      id: "dfs-graph",
      title: "Graph Explorer",
      type: "graphs",
      description: "Explore all nodes in a graph using depth-first search.",
      hint: "Use recursion or a stack. Mark visited nodes.",
      keywords: ["dfs", "depth", "first", "visited", "stack"],
      xpReward: 45,
      skillBoost: 4,
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const input = inputValue.toLowerCase().trim()
    addLog(`> ${inputValue}`)
    setInputValue("")

    if (gamePhase === "setup") {
      if (!gameStarted) {
        setPlayer((prev) => ({ ...prev, name: inputValue }))
        setPlayerName(inputValue)
        setGameStarted(true)
        setGamePhase("exploring")
        addLogWithEffect(`Welcome to crack'd, ${inputValue}!`, "fire")
        addLog("")
        addLog("You enter the coding academy...")
        addLog("Six powerful Code Bosses guard different algorithm realms...")
        addLog("")
        addLog("Commands:")
        addLog("• 'explore' - Find Code Bosses to challenge")
        addLog("• 'stats' - Check your coding progress")
        addLog("• 'help' - Show all commands")
      }
    } else if (gamePhase === "exploring") {
      if (input === "explore") {
        const randomBoss = codeBosses[Math.floor(Math.random() * codeBosses.length)]
        setCurrentBoss({ ...randomBoss })
        setGamePhase("battle")
        addLog("")
        addLogWithEffect(`A wild ${randomBoss.name} appears!`, "fire")
        randomBoss.ascii.forEach((line) => addLog(line))
        addLog("")
        addLog(randomBoss.dialogue[Math.floor(Math.random() * randomBoss.dialogue.length)])
        addLog("")
        addLog("Battle Commands:")
        addLog("• 'attack' - Direct algorithm attack")
        addLog("• 'defend' - Reduce incoming damage")
        addLog("• 'code' - Solve a coding challenge for massive damage!")
      } else if (input === "stats") {
        showPlayerStats()
      } else if (input === "help") {
        showHelp()
      } else {
        addLogWithEffect("Unknown command. Type 'help' for available commands.", "error")
      }
    } else if (gamePhase === "battle") {
      if (input === "attack") {
        const damage = 15 + Math.floor(player.experience / 50)
        const newBossHealth = Math.max(0, currentBoss!.health - damage)
        setCurrentBoss((prev) => (prev ? { ...prev, health: newBossHealth } : null))
        addLogWithEffect(`You attack with algorithm power for ${damage} damage!`, "success")

        if (newBossHealth <= 0) {
          defeatBoss()
        } else {
          // Boss counterattack
          setTimeout(() => {
            bossAttack()
          }, 1000)
        }
      } else if (input === "defend") {
        addLogWithEffect("You optimize your code defenses!", "info")
        setTimeout(() => {
          bossAttack(0.5) // Reduced damage
        }, 1000)
      } else if (input === "code") {
        startCodingChallenge()
      } else {
        addLogWithEffect("Battle commands: 'attack', 'defend', 'code'", "info")
      }
    } else if (gamePhase === "challenge") {
      if (currentChallenge) {
        if (input === "hint") {
          if (player.health >= 10) {
            setPlayer((prev) => ({ ...prev, health: prev.health - 10 }))
            addLogWithEffect(`Hint: ${currentChallenge.hint}`, "info")
            addLogWithEffect("(-10 health for hint)", "error")
          } else {
            addLogWithEffect("Not enough health for a hint!", "error")
          }
        } else if (input === "skip") {
          addLogWithEffect("Challenge skipped. Returning to battle.", "error")
          setCurrentChallenge(null)
          setGamePhase("battle")
        } else {
          // Check solution
          const foundKeywords = currentChallenge.keywords.filter((keyword: string) =>
            input.includes(keyword.toLowerCase()),
          )

          if (foundKeywords.length >= 2) {
            // Success!
            solveCodingChallenge()
          } else {
            addLogWithEffect("Incorrect approach. Try again or type 'hint'.", "error")
            addLogWithEffect(`Keywords found: ${foundKeywords.join(", ") || "none"}`, "info")
          }
        }
      }
    }
  }

  const startCodingChallenge = () => {
    if (!currentBoss) return

    // Get challenge based on boss type
    const bossType = currentBoss.skillType
    const relevantChallenges = challenges.filter((c) => c.type === bossType)
    const challenge =
      relevantChallenges.length > 0
        ? relevantChallenges[Math.floor(Math.random() * relevantChallenges.length)]
        : challenges[Math.floor(Math.random() * challenges.length)]

    setCurrentChallenge(challenge)
    setGamePhase("challenge")

    addLog("")
    addLogWithEffect("CODING CHALLENGE INITIATED!", "fire")
    addLog("═══════════════════════════════")
    addLog(`Title: ${challenge.title}`)
    addLog(`Description: ${challenge.description}`)
    addLog("")
    addLog("Commands:")
    addLog("• Type keywords from your solution approach")
    addLog("• 'hint' - Get a hint (costs 10 health)")
    addLog("• 'skip' - Skip this challenge")
  }

  const solveCodingChallenge = () => {
    if (!currentChallenge || !currentBoss) return

    const xpGain = currentChallenge.xpReward
    const skillBoost = currentChallenge.skillBoost
    const damage = 40 + skillBoost * 5

    setPlayer((prev) => ({
      ...prev,
      experience: prev.experience + xpGain,
      solvedProblems: prev.solvedProblems + 1,
      skills: {
        ...prev.skills,
        [currentBoss!.skillType]: prev.skills[currentBoss!.skillType] + skillBoost,
      },
    }))

    const newBossHealth = Math.max(0, currentBoss.health - damage)
    setCurrentBoss((prev) => (prev ? { ...prev, health: newBossHealth } : null))

    addLog("")
    addLogWithEffect("CODING CHALLENGE SOLVED!", "success")
    addLogWithEffect(`Your solution deals ${damage} damage!`, "fire")
    addLogWithEffect(`+${xpGain} XP gained!`, "star")
    addLogWithEffect(`+${skillBoost} ${currentBoss.skillType} skill!`, "star")

    // Check for level up
    checkLevelUp()

    setCurrentChallenge(null)

    if (newBossHealth <= 0) {
      setTimeout(() => {
        defeatBoss()
      }, 1500)
    } else {
      setGamePhase("battle")
      addLog("")
      addLogWithEffect("Back to battle! The boss is weakened but still fighting!", "info")
    }
  }

  const bossAttack = (damageMultiplier = 1) => {
    if (!currentBoss) return

    const damage = Math.floor(currentBoss.damage * damageMultiplier)
    const newPlayerHealth = Math.max(0, player.health - damage)

    setPlayer((prev) => ({ ...prev, health: newPlayerHealth }))
    addLogWithEffect(`${currentBoss.name} attacks you for ${damage} damage!`, "error")

    if (newPlayerHealth <= 0) {
      gameOver()
    }
  }

  const defeatBoss = () => {
    if (!currentBoss) return

    const xpGain = 50 + currentBoss.maxHealth
    setPlayer((prev) => ({
      ...prev,
      experience: prev.experience + xpGain,
    }))

    addLog("")
    addLogWithEffect(`You defeated the ${currentBoss.name}!`, "success")
    addLogWithEffect(`+${xpGain} XP gained!`, "star")

    // Check for badges
    checkForBadges()
    checkLevelUp()

    setCurrentBoss(null)
    setGamePhase("exploring")
    addLog("")
    addLogWithEffect("Type 'explore' to find your next coding challenge!", "info")
  }

  const checkLevelUp = () => {
    const currentLevel = Math.floor(player.experience / 200)
    const newLevel = Math.floor(player.experience / 200)

    if (newLevel > currentLevel) {
      const levelNames: PlayerLevel[] = ["novice", "apprentice", "expert", "master", "grandmaster"]
      const newLevelName = levelNames[Math.min(newLevel, levelNames.length - 1)]

      setPlayer((prev) => ({
        ...prev,
        level: newLevelName,
        maxHealth: prev.maxHealth + 25,
        health: prev.maxHealth + 25,
      }))

      addLog("")
      addLogWithEffect("LEVEL UP!", "fire")
      addLogWithEffect(`You are now a ${newLevelName} coder!`, "star")
      addLogWithEffect("+25 Max Health!", "success")
    }
  }

  const checkForBadges = () => {
    const newBadges: string[] = []

    if (player.solvedProblems === 0 && !player.badges.includes("First Solution")) {
      newBadges.push("First Solution")
    }

    if (player.solvedProblems + 1 === 5 && !player.badges.includes("Problem Solver")) {
      newBadges.push("Problem Solver")
    }

    if (player.solvedProblems + 1 === 10 && !player.badges.includes("Code Warrior")) {
      newBadges.push("Code Warrior")
    }

    if (newBadges.length > 0) {
      setPlayer((prev) => ({
        ...prev,
        badges: [...prev.badges, ...newBadges],
      }))

      newBadges.forEach((badge) => {
        addLogWithEffect(`New Badge: ${badge}!`, "star")
      })
    }
  }

  const gameOver = () => {
    addLog("")
    addLogWithEffect("GAME OVER!", "error")
    addLogWithEffect("Your coding journey ends here... for now.", "error")
    addLogWithEffect("Refresh the page to start a new adventure!", "info")
  }

  const showPlayerStats = () => {
    addLog("")
    addLog("CODING STATISTICS")
    addLog("═══════════════════")
    addLog(`Name: ${player.name}`)
    addLog(`Level: ${Math.floor(player.experience / 200) + 1} (${player.level})`)
    addLog(`Health: ${player.health}/${player.maxHealth}`)
    addLog(`Experience: ${player.experience}`)
    addLog(`Problems Solved: ${player.solvedProblems}`)
    addLog("")
    addLog("CODING SKILLS:")
    Object.entries(player.skills).forEach(([skill, level]) => {
      const skillName = skill.charAt(0).toUpperCase() + skill.slice(1)
      addLog(`   ${skillName}: ${level}`)
    })
    if (player.badges.length > 0) {
      addLog("")
      addLog("BADGES:")
      player.badges.forEach((badge) => {
        addLog(`   ${badge}`)
      })
    }
    addLog("")
  }

  const showHelp = () => {
    addLog("")
    addLog("HELP & COMMANDS")
    addLog("═════════════════")
    addLog("Academy Commands:")
    addLog("   • explore - Find Code Bosses to challenge")
    addLog("   • stats - View your coding statistics")
    addLog("")
    addLog("Battle Commands:")
    addLog("   • attack - Direct algorithm attack")
    addLog("   • defend - Reduce incoming damage")
    addLog("   • code - Start a coding challenge")
    addLog("")
    addLog("Challenge Commands:")
    addLog("   • [solution keywords] - Submit your approach")
    addLog("   • hint - Get a hint (costs health)")
    addLog("   • skip - Skip current challenge")
    addLog("")
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="h-6 w-6 text-green-400" />
        <h1 className="text-2xl font-bold text-green-400">crack'd</h1>
        <span className="text-green-400 text-sm">- Coding Academy</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Terminal */}
        <div className="lg:col-span-3">
          <div
            ref={logRef}
            className="bg-black border-2 border-green-400 rounded-lg p-4 h-[500px] overflow-y-auto font-mono text-green-400 text-sm shadow-lg shadow-green-400/20"
          >
            {gameLog.map((line, index) => (
              <div key={index} className="mb-1 whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <div className="flex-1 flex items-center bg-black border-2 border-green-400 rounded-lg px-3 shadow-lg shadow-green-400/20">
              <span className="text-green-400 mr-2">$</span>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-none text-green-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Type command..."
              />
            </div>
            <Button type="submit" className="bg-green-400 text-black hover:bg-green-300 shadow-lg shadow-green-400/20">
              Execute
            </Button>
          </form>
        </div>

        {/* Status Panel */}
        <div className="bg-black border-2 border-green-400 rounded-lg p-4 shadow-lg shadow-green-400/20">
          <h2 className="text-green-400 font-bold mb-4 flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Coder Profile
          </h2>

          {gameStarted && (
            <>
              <div className="mb-4">
                <div className="text-green-400 text-sm font-bold">{player.name}</div>
                <div className="text-green-400 text-xs">
                  Level {Math.floor(player.experience / 200) + 1} {player.level}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-green-400 mb-1">
                  <span className="flex items-center gap-1">Health</span>
                  <span>
                    {player.health}/{player.maxHealth}
                  </span>
                </div>
                <Progress value={(player.health / player.maxHealth) * 100} className="h-2" />
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-green-400 mb-1">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" /> XP
                  </span>
                  <span>{player.experience}</span>
                </div>
                <Progress value={player.experience % 200} className="h-2" />
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-green-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Code className="h-3 w-3" /> Problems
                  </span>
                  <span>{player.solvedProblems}</span>
                </div>
              </div>

              {/* Top Skills */}
              <div className="mb-4">
                <h3 className="text-green-400 font-bold text-sm mb-2">Top Skills</h3>
                <div className="grid grid-cols-1 gap-1">
                  {Object.entries(player.skills)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 3)
                    .map(([skill, level]) => {
                      const skillName = skill.charAt(0).toUpperCase() + skill.slice(1)
                      return (
                        <div key={skill} className="text-green-400 text-xs">
                          <div className="flex justify-between">
                            <span>{skillName}</span>
                            <span>{level}</span>
                          </div>
                          <Progress value={Math.min(level * 3, 100)} className="h-1 mt-1" />
                        </div>
                      )
                    })}
                </div>
              </div>

              {/* Current Boss */}
              {currentBoss && (
                <div className="border border-red-400 rounded p-2 mb-4">
                  <h3 className="text-red-400 font-bold text-sm mb-2">{currentBoss.name}</h3>
                  <div className="flex justify-between text-xs text-red-400 mb-1">
                    <span>Boss HP</span>
                    <span>
                      {currentBoss.health}/{currentBoss.maxHealth}
                    </span>
                  </div>
                  <Progress
                    value={(currentBoss.health / currentBoss.maxHealth) * 100}
                    className="h-2 bg-red-900"
                    indicatorClassName="bg-red-500"
                  />
                  <div className="text-xs text-yellow-400 mt-1">Weakness: {currentBoss.weakness}</div>
                </div>
              )}

              {/* Latest Badge */}
              {player.badges.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-green-400 font-bold text-sm mb-2">Latest Badge</h3>
                  <div className="text-yellow-400 text-xs">{player.badges[player.badges.length - 1]}</div>
                </div>
              )}
            </>
          )}

          <div className="mt-4 text-xs text-green-400">
            <div className="mb-2 flex items-center gap-1">
              <Zap className="h-3 w-3" /> Phase: {gamePhase}
            </div>
            <div>Type 'help' for commands</div>
          </div>
        </div>
      </div>
    </div>
  )
}
