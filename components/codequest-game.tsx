"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Terminal, Code, Brain, Trophy, Zap, Star, Target } from "lucide-react"

type GameState = "intro" | "academy" | "dungeon" | "challenge" | "victory" | "defeat"
type SkillLevel = "novice" | "apprentice" | "expert" | "master" | "grandmaster"

interface Player {
  name: string
  level: SkillLevel
  health: number
  maxHealth: number
  experience: number
  skills: {
    arrays: number
    strings: number
    trees: number
    graphs: number
    dynamicProgramming: number
    sorting: number
  }
  badges: string[]
  solvedProblems: number
}

interface Challenge {
  id: string
  title: string
  type: "arrays" | "strings" | "trees" | "graphs" | "dynamicProgramming" | "sorting"
  difficulty: "easy" | "medium" | "hard"
  description: string
  hint: string
  keywords: string[]
  xpReward: number
  ascii: string[]
}

interface Dungeon {
  id: string
  name: string
  type: "arrays" | "strings" | "trees" | "graphs" | "dynamicProgramming" | "sorting"
  level: number
  challenges: Challenge[]
  ascii: string[]
  description: string
}

export default function CodeQuestGame() {
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
      dynamicProgramming: 1,
      sorting: 1,
    },
    badges: [],
    solvedProblems: 0,
  })
  const [currentDungeon, setCurrentDungeon] = useState<Dungeon | null>(null)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [gameLog, setGameLog] = useState<string[]>([
    "╔══════════════════════════════════════╗",
    "║        CODEQUEST ACADEMY             ║",
    "║     Master Coding Through Adventure  ║",
    "╚══════════════════════════════════════╝",
    "",
    "🎓 Welcome to the ultimate coding academy!",
    "💻 Type your coder name and press Enter...",
  ])
  const [inputValue, setInputValue] = useState("")
  const [gamePhase, setGamePhase] = useState<"setup" | "exploring" | "dungeon" | "challenge">("setup")
  const [isTyping, setIsTyping] = useState(false)
  const [currentText, setCurrentText] = useState("")

  const logRef = useRef<HTMLDivElement>(null)

  // Change document title
  useEffect(() => {
    document.title = "CodeQuest Academy - Master Coding Through Adventure"
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [gameLog])

  // Typing effect
  const typeText = (text: string, delay = 50) => {
    setIsTyping(true)
    setCurrentText("")

    let i = 0
    const timer = setInterval(() => {
      setCurrentText(text.slice(0, i + 1))
      i++
      if (i >= text.length) {
        clearInterval(timer)
        setIsTyping(false)
        addLog(text)
        setCurrentText("")
      }
    }, delay)
  }

  const addLog = (message: string) => {
    setGameLog((prev) => [...prev, message])
  }

  const addLogWithEffect = (message: string, effect = "normal") => {
    switch (effect) {
      case "success":
        addLog(`✅ ${message}`)
        break
      case "error":
        addLog(`❌ ${message}`)
        break
      case "info":
        addLog(`ℹ️  ${message}`)
        break
      case "warning":
        addLog(`⚠️  ${message}`)
        break
      case "star":
        addLog(`⭐ ${message}`)
        break
      default:
        addLog(message)
    }
  }

  // Dungeons database
  const dungeons: Dungeon[] = [
    {
      id: "array-maze",
      name: "Array Maze",
      type: "arrays",
      level: 1,
      description: "Navigate through the fundamental array operations",
      ascii: [
        "┌─────────────────────┐",
        "│    ARRAY MAZE       │",
        "│  [1][2][3][4][5]    │",
        "│   ↑  ↓  ↑  ↓  ↑    │",
        "│  [6][7][8][9][10]   │",
        "│   ↓  ↑  ↓  ↑  ↓    │",
        "│  [11][12][13][14]   │",
        "└─────────────────────┘",
      ],
      challenges: [],
    },
    {
      id: "string-valley",
      name: "String Valley",
      type: "strings",
      level: 1,
      description: "Master the art of string manipulation",
      ascii: [
        "🏔️  STRING VALLEY  🏔️",
        '   "Hello World"     ',
        "  /             \\    ",
        " /   Palindrome  \\   ",
        "/     Kingdom     \\  ",
        "\\                 /  ",
        " \\   Anagram     /   ",
        "  \\   Forest    /    ",
        '   "Goodbye"         ',
      ],
      challenges: [],
    },
    {
      id: "binary-forest",
      name: "Binary Tree Forest",
      type: "trees",
      level: 2,
      description: "Explore the depths of tree structures",
      ascii: [
        "🌲 BINARY TREE FOREST 🌲",
        "        ┌───┐           ",
        "        │ 1 │           ",
        "     ┌──┴───┴──┐        ",
        "  ┌──┴──┐   ┌──┴──┐     ",
        "  │  2  │   │  3  │     ",
        "┌─┴─┐ ┌─┴─┐ ┌─┴─┐ ┌─┴─┐ ",
        "│ 4 │ │ 5 │ │ 6 │ │ 7 │ ",
        "└───┘ └───┘ └───┘ └───┘ ",
      ],
      challenges: [],
    },
    {
      id: "graph-kingdom",
      name: "Graph Kingdom",
      type: "graphs",
      level: 3,
      description: "Rule the connected world of graphs",
      ascii: [
        "👑 GRAPH KINGDOM 👑",
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
      challenges: [],
    },
    {
      id: "dp-castle",
      name: "Dynamic Programming Castle",
      type: "dynamicProgramming",
      level: 4,
      description: "Conquer the fortress of optimal solutions",
      ascii: [
        "🏰 DP CASTLE 🏰",
        "     /\\    /\\     ",
        "    /  \\  /  \\    ",
        "   /____\\/____\\   ",
        "   |    ||    |   ",
        "   | F(n-1)   |   ",
        "   |    +     |   ",
        "   | F(n-2)   |   ",
        "   |    =     |   ",
        "   |  F(n)    |   ",
        "   |__________|   ",
      ],
      challenges: [],
    },
    {
      id: "sort-arena",
      name: "Sorting Arena",
      type: "sorting",
      level: 2,
      description: "Master the art of ordering chaos",
      ascii: [
        "⚔️  SORTING ARENA ⚔️",
        "  [5][2][8][1][9]   ",
        "   ↓  ↓  ↓  ↓  ↓   ",
        "  BUBBLE SORT ZONE  ",
        "   ↓  ↓  ↓  ↓  ↓   ",
        "  [1][2][5][8][9]   ",
        "                    ",
        "  🏆 VICTORY! 🏆    ",
      ],
      challenges: [],
    },
  ]

  // Challenges database
  const challenges: Challenge[] = [
    {
      id: "two-sum",
      title: "Two Sum",
      type: "arrays",
      difficulty: "easy",
      description: "Find two numbers in an array that add up to a target sum.",
      hint: "Use a hash map to store numbers you've seen and their indices.",
      keywords: ["hash", "map", "target", "indices", "two"],
      xpReward: 25,
      ascii: ["🎯 TWO SUM CHALLENGE", "Array: [2, 7, 11, 15]", "Target: 9", "Output: [0, 1]", "Because: 2 + 7 = 9"],
    },
    {
      id: "reverse-string",
      title: "Reverse String",
      type: "strings",
      difficulty: "easy",
      description: "Reverse a string in-place using O(1) extra memory.",
      hint: "Use two pointers from start and end, swap characters.",
      keywords: ["two", "pointer", "swap", "reverse", "inplace"],
      xpReward: 20,
      ascii: [
        "🔄 REVERSE STRING",
        "Input:  ['h','e','l','l','o']",
        "Output: ['o','l','l','e','h']",
        "Method: Two Pointers",
      ],
    },
    {
      id: "binary-tree-inorder",
      title: "Binary Tree Inorder Traversal",
      type: "trees",
      difficulty: "medium",
      description: "Return the inorder traversal of a binary tree.",
      hint: "Left -> Root -> Right. Use recursion or stack.",
      keywords: ["inorder", "left", "root", "right", "recursion", "stack"],
      xpReward: 40,
      ascii: ["🌳 INORDER TRAVERSAL", "    1", "     \\", "      2", "     /", "    3", "Output: [1,3,2]"],
    },
    {
      id: "valid-palindrome",
      title: "Valid Palindrome",
      type: "strings",
      difficulty: "easy",
      description: "Check if a string is a palindrome, ignoring non-alphanumeric characters.",
      hint: "Clean the string first, then use two pointers.",
      keywords: ["palindrome", "clean", "alphanumeric", "two", "pointer"],
      xpReward: 25,
      ascii: [
        "🪞 PALINDROME CHECK",
        'Input: "A man, a plan, a canal: Panama"',
        'Clean: "amanaplanacanalpanama"',
        "Result: true (reads same forwards/backwards)",
      ],
    },
    {
      id: "fibonacci",
      title: "Fibonacci Number",
      type: "dynamicProgramming",
      difficulty: "easy",
      description: "Calculate the nth Fibonacci number efficiently.",
      hint: "Use dynamic programming to avoid recalculating subproblems.",
      keywords: ["fibonacci", "dp", "memoization", "bottom", "up"],
      xpReward: 30,
      ascii: ["🔢 FIBONACCI SEQUENCE", "F(0) = 0, F(1) = 1", "F(n) = F(n-1) + F(n-2)", "0, 1, 1, 2, 3, 5, 8, 13..."],
    },
    {
      id: "bubble-sort",
      title: "Bubble Sort",
      type: "sorting",
      difficulty: "easy",
      description: "Implement the bubble sort algorithm.",
      hint: "Compare adjacent elements and swap if they're in wrong order.",
      keywords: ["bubble", "adjacent", "swap", "compare", "nested"],
      xpReward: 20,
      ascii: [
        "🫧 BUBBLE SORT",
        "[5, 2, 8, 1, 9]",
        "↓ Compare & Swap ↓",
        "[2, 5, 1, 8, 9]",
        "↓ Continue... ↓",
        "[1, 2, 5, 8, 9]",
      ],
    },
    {
      id: "dfs-graph",
      title: "Depth First Search",
      type: "graphs",
      difficulty: "medium",
      description: "Implement DFS traversal for a graph.",
      hint: "Use recursion or a stack. Mark visited nodes.",
      keywords: ["dfs", "depth", "first", "stack", "recursion", "visited"],
      xpReward: 45,
      ascii: ["🔍 DEPTH FIRST SEARCH", "    A", "   / \\", "  B   C", " /   / \\", "D   E   F", "Path: A→B→D→C→E→F"],
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping) return

    const input = inputValue.toLowerCase().trim()
    addLog(`> ${inputValue}`)
    setInputValue("")

    if (gamePhase === "setup") {
      if (!gameStarted) {
        setPlayer((prev) => ({ ...prev, name: inputValue }))
        setPlayerName(inputValue)
        setGameStarted(true)
        setGamePhase("exploring")

        setTimeout(() => {
          typeText(`🎉 Welcome to CodeQuest Academy, ${inputValue}!`)
        }, 500)

        setTimeout(() => {
          addLog("")
          addLog("🏛️  You stand before the grand academy gates...")
          addLog("📚 Multiple coding dungeons await your exploration!")
          addLog("")
          addLog("Available commands:")
          addLog("• 'explore' - View available dungeons")
          addLog("• 'stats' - Check your progress")
          addLog("• 'badges' - View earned achievements")
          addLog("• 'help' - Show all commands")
        }, 2000)
      }
    } else if (gamePhase === "exploring") {
      if (input === "explore") {
        addLog("")
        addLog("🗺️  AVAILABLE DUNGEONS:")
        addLog("═══════════════════════")
        dungeons.forEach((dungeon, index) => {
          const lockStatus = dungeon.level <= Math.floor(player.experience / 100) + 1 ? "🔓" : "🔒"
          addLog(`${index + 1}. ${lockStatus} ${dungeon.name} (Level ${dungeon.level})`)
          addLog(`   ${dungeon.description}`)
        })
        addLog("")
        addLog("Type 'enter [number]' to enter a dungeon (e.g., 'enter 1')")
      } else if (input.startsWith("enter ")) {
        const dungeonIndex = Number.parseInt(input.split(" ")[1]) - 1
        if (dungeonIndex >= 0 && dungeonIndex < dungeons.length) {
          const selectedDungeon = dungeons[dungeonIndex]
          const requiredLevel = selectedDungeon.level
          const playerLevel = Math.floor(player.experience / 100) + 1

          if (playerLevel >= requiredLevel) {
            setCurrentDungeon(selectedDungeon)
            setGamePhase("dungeon")
            addLog("")
            addLog(`🚪 Entering ${selectedDungeon.name}...`)
            selectedDungeon.ascii.forEach((line) => addLog(line))
            addLog("")
            addLog(selectedDungeon.description)
            addLog("")
            addLog("Commands: 'challenge' - Start a coding challenge")
            addLog("         'exit' - Leave this dungeon")
          } else {
            addLogWithEffect(`You need to reach level ${requiredLevel} to enter this dungeon!`, "warning")
            addLogWithEffect(`Current level: ${playerLevel}`, "info")
          }
        } else {
          addLogWithEffect("Invalid dungeon number!", "error")
        }
      } else if (input === "stats") {
        showPlayerStats()
      } else if (input === "badges") {
        showBadges()
      } else if (input === "help") {
        showHelp()
      } else {
        addLogWithEffect("Unknown command. Type 'help' for available commands.", "warning")
      }
    } else if (gamePhase === "dungeon") {
      if (input === "challenge") {
        if (currentDungeon) {
          // Get challenges for current dungeon type
          const dungeonChallenges = challenges.filter((c) => c.type === currentDungeon.type)
          if (dungeonChallenges.length > 0) {
            const randomChallenge = dungeonChallenges[Math.floor(Math.random() * dungeonChallenges.length)]
            setCurrentChallenge(randomChallenge)
            setGamePhase("challenge")

            addLog("")
            addLog("⚔️  CODING CHALLENGE INITIATED!")
            addLog("═══════════════════════════════")
            randomChallenge.ascii.forEach((line) => addLog(line))
            addLog("")
            addLog(`📝 ${randomChallenge.title} (${randomChallenge.difficulty.toUpperCase()})`)
            addLog(`💡 ${randomChallenge.description}`)
            addLog("")
            addLog("Commands:")
            addLog("• Type keywords from your solution")
            addLog("• 'hint' - Get a hint (costs 10 health)")
            addLog("• 'skip' - Skip this challenge")
          }
        }
      } else if (input === "exit") {
        setCurrentDungeon(null)
        setGamePhase("exploring")
        addLog("")
        addLogWithEffect("🚪 You exit the dungeon and return to the academy.", "info")
        addLog("Type 'explore' to see available dungeons.")
      } else {
        addLogWithEffect("Dungeon commands: 'challenge', 'exit'", "info")
      }
    } else if (gamePhase === "challenge") {
      if (currentChallenge) {
        if (input === "hint") {
          if (player.health >= 10) {
            setPlayer((prev) => ({ ...prev, health: prev.health - 10 }))
            addLogWithEffect(`💡 Hint: ${currentChallenge.hint}`, "info")
            addLogWithEffect("(-10 health for hint)", "warning")
          } else {
            addLogWithEffect("Not enough health for a hint!", "error")
          }
        } else if (input === "skip") {
          addLogWithEffect("Challenge skipped. No XP gained.", "warning")
          setCurrentChallenge(null)
          setGamePhase("dungeon")
        } else {
          // Check if input contains solution keywords
          const foundKeywords = currentChallenge.keywords.filter((keyword) => input.includes(keyword.toLowerCase()))

          if (foundKeywords.length >= 2) {
            // Success!
            const xpGain = currentChallenge.xpReward
            setPlayer((prev) => ({
              ...prev,
              experience: prev.experience + xpGain,
              solvedProblems: prev.solvedProblems + 1,
              skills: {
                ...prev.skills,
                [currentChallenge.type]: prev.skills[currentChallenge.type] + 2,
              },
            }))

            addLog("")
            addLogWithEffect("🎉 CHALLENGE COMPLETED!", "success")
            addLogWithEffect(`+${xpGain} XP gained!`, "star")
            addLogWithEffect(`+2 ${currentChallenge.type} skill!`, "star")

            // Check for level up
            const newLevel = Math.floor((player.experience + xpGain) / 100)
            const currentLevel = Math.floor(player.experience / 100)

            if (newLevel > currentLevel) {
              levelUp()
            }

            // Check for badges
            checkForBadges()

            setCurrentChallenge(null)
            setGamePhase("dungeon")
          } else {
            addLogWithEffect("❌ Incorrect solution. Try again or type 'hint'.", "error")
            addLogWithEffect(`Keywords found: ${foundKeywords.join(", ") || "none"}`, "info")
          }
        }
      }
    }
  }

  const showPlayerStats = () => {
    addLog("")
    addLog("📊 PLAYER STATISTICS")
    addLog("═══════════════════")
    addLog(`👤 Name: ${player.name}`)
    addLog(`🎯 Level: ${Math.floor(player.experience / 100) + 1} (${player.level})`)
    addLog(`❤️  Health: ${player.health}/${player.maxHealth}`)
    addLog(`⭐ Experience: ${player.experience}`)
    addLog(`🧩 Problems Solved: ${player.solvedProblems}`)
    addLog("")
    addLog("🛠️  SKILLS:")
    Object.entries(player.skills).forEach(([skill, level]) => {
      const skillName = skill.charAt(0).toUpperCase() + skill.slice(1).replace(/([A-Z])/g, " $1")
      addLog(`   ${skillName}: ${level}`)
    })
    addLog("")
  }

  const showBadges = () => {
    addLog("")
    addLog("🏆 ACHIEVEMENTS & BADGES")
    addLog("═══════════════════════")
    if (player.badges.length === 0) {
      addLog("No badges earned yet. Complete challenges to earn badges!")
    } else {
      player.badges.forEach((badge) => {
        addLog(`🎖️  ${badge}`)
      })
    }
    addLog("")
  }

  const showHelp = () => {
    addLog("")
    addLog("📖 HELP & COMMANDS")
    addLog("═════════════════")
    addLog("🏛️  Academy Commands:")
    addLog("   • explore - View available dungeons")
    addLog("   • enter [number] - Enter a specific dungeon")
    addLog("   • stats - View your statistics")
    addLog("   • badges - View earned achievements")
    addLog("")
    addLog("🏰 Dungeon Commands:")
    addLog("   • challenge - Start a coding challenge")
    addLog("   • exit - Leave current dungeon")
    addLog("")
    addLog("⚔️  Challenge Commands:")
    addLog("   • [solution keywords] - Submit your answer")
    addLog("   • hint - Get a hint (costs health)")
    addLog("   • skip - Skip current challenge")
    addLog("")
  }

  const levelUp = () => {
    const newLevel = Math.floor(player.experience / 100)
    const levelNames: SkillLevel[] = ["novice", "apprentice", "expert", "master", "grandmaster"]
    const newLevelName = levelNames[Math.min(newLevel, levelNames.length - 1)]

    setPlayer((prev) => ({
      ...prev,
      level: newLevelName,
      maxHealth: prev.maxHealth + 25,
      health: prev.maxHealth + 25,
    }))

    addLog("")
    addLogWithEffect("🎊 LEVEL UP! 🎊", "success")
    addLogWithEffect(`You are now a ${newLevelName} coder!`, "star")
    addLogWithEffect("+25 Max Health!", "success")
    addLog("")
  }

  const checkForBadges = () => {
    const newBadges: string[] = []

    // First problem badge
    if (player.solvedProblems === 0 && !player.badges.includes("First Steps")) {
      newBadges.push("First Steps")
    }

    // Problem count badges
    if (player.solvedProblems + 1 === 5 && !player.badges.includes("Problem Solver")) {
      newBadges.push("Problem Solver")
    }

    if (player.solvedProblems + 1 === 10 && !player.badges.includes("Code Warrior")) {
      newBadges.push("Code Warrior")
    }

    // Skill-specific badges
    if (player.skills.arrays >= 10 && !player.badges.includes("Array Master")) {
      newBadges.push("Array Master")
    }

    if (player.skills.trees >= 10 && !player.badges.includes("Tree Whisperer")) {
      newBadges.push("Tree Whisperer")
    }

    if (newBadges.length > 0) {
      setPlayer((prev) => ({
        ...prev,
        badges: [...prev.badges, ...newBadges],
      }))

      newBadges.forEach((badge) => {
        addLogWithEffect(`🎖️  New Badge Earned: ${badge}!`, "star")
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="h-6 w-6 text-cyan-400" />
        <h1 className="text-2xl font-bold text-cyan-400">CodeQuest Academy</h1>
        <Badge variant="outline" className="text-cyan-400 border-cyan-400">
          v2.0
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Terminal */}
        <div className="lg:col-span-3">
          <div
            ref={logRef}
            className="bg-black border-2 border-cyan-400 rounded-lg p-4 h-[500px] overflow-y-auto font-mono text-cyan-400 text-sm shadow-lg shadow-cyan-400/20"
          >
            {gameLog.map((line, index) => (
              <div key={index} className="mb-1 whitespace-pre-wrap">
                {line}
              </div>
            ))}
            {isTyping && (
              <div className="mb-1 whitespace-pre-wrap">
                {currentText}
                <span className="animate-pulse text-yellow-400">▌</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <div className="flex-1 flex items-center bg-black border-2 border-cyan-400 rounded-lg px-3 shadow-lg shadow-cyan-400/20">
              <span className="text-cyan-400 mr-2">$</span>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-none text-cyan-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Type command..."
                disabled={isTyping}
              />
            </div>
            <Button
              type="submit"
              className="bg-cyan-400 text-black hover:bg-cyan-300 shadow-lg shadow-cyan-400/20"
              disabled={isTyping}
            >
              Execute
            </Button>
          </form>
        </div>

        {/* Status Panel */}
        <div className="bg-black border-2 border-cyan-400 rounded-lg p-4 shadow-lg shadow-cyan-400/20">
          <h2 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Coder Profile
          </h2>

          {gameStarted && (
            <>
              <div className="mb-4">
                <div className="text-cyan-400 text-sm font-bold">{player.name}</div>
                <div className="text-cyan-400 text-xs">
                  Level {Math.floor(player.experience / 100) + 1} {player.level}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-cyan-400 mb-1">
                  <span className="flex items-center gap-1">
                    <span>❤️</span> Health
                  </span>
                  <span>
                    {player.health}/{player.maxHealth}
                  </span>
                </div>
                <Progress value={(player.health / player.maxHealth) * 100} className="h-2" />
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-cyan-400 mb-1">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" /> XP
                  </span>
                  <span>{player.experience}</span>
                </div>
                <Progress value={player.experience % 100} className="h-2" />
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-cyan-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Target className="h-3 w-3" /> Problems
                  </span>
                  <span>{player.solvedProblems}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h3 className="text-cyan-400 font-bold text-sm mb-2 flex items-center gap-1">
                  <Code className="h-3 w-3" /> Skills
                </h3>
                <div className="grid grid-cols-1 gap-1">
                  {Object.entries(player.skills)
                    .slice(0, 3)
                    .map(([skill, level]) => {
                      const skillName = skill.charAt(0).toUpperCase() + skill.slice(1).replace(/([A-Z])/g, " $1")
                      return (
                        <div key={skill} className="text-cyan-400 text-xs">
                          <div className="flex justify-between">
                            <span>{skillName.length > 8 ? skillName.substring(0, 8) + "..." : skillName}</span>
                            <span>{level}</span>
                          </div>
                          <Progress value={Math.min(level * 5, 100)} className="h-1 mt-1" />
                        </div>
                      )
                    })}
                </div>
              </div>

              {/* Current Location */}
              <div className="mb-4">
                <h3 className="text-cyan-400 font-bold text-sm mb-2">📍 Location</h3>
                <div className="text-cyan-400 text-xs">{currentDungeon ? currentDungeon.name : "Academy Grounds"}</div>
              </div>

              {/* Recent Badges */}
              {player.badges.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-cyan-400 font-bold text-sm mb-2 flex items-center gap-1">
                    <Trophy className="h-3 w-3" /> Latest Badge
                  </h3>
                  <div className="text-yellow-400 text-xs">🎖️ {player.badges[player.badges.length - 1]}</div>
                </div>
              )}
            </>
          )}

          <div className="mt-4 text-xs text-cyan-400">
            <div className="mb-2 flex items-center gap-1">
              <Zap className="h-3 w-3" /> Phase: {gamePhase}
            </div>
            <div>💡 Type 'help' for commands</div>
          </div>
        </div>
      </div>
    </div>
  )
}
