"use client"

import { useState, useRef, useEffect, JSX } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import type React from "react"

type Command = {
  id: string
  input: string
  output: string | JSX.Element
}

const INITIAL_COMMANDS: Command[] = [
  {
    id: "welcome",
    input: "",
    output: (
      <>
        <span className="text-primary font-bold">Benny Blitz Terminal v1.0.0</span>
        <br />
        <span className="text-muted-foreground">Type 'help' to see available commands.</span>
      </>
    ),
  },
]

interface TerminalProps {
  isMinimized: boolean
  onMinimizeToggle: () => void
}

export default function Terminal({ isMinimized, onMinimizeToggle }: TerminalProps) {
  const [commands, setCommands] = useState<Command[]>(INITIAL_COMMANDS)
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [commands, isMinimized])

  useEffect(() => {
    // Focus input when terminal is opened or maximized
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isMinimized])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    let output: string | JSX.Element = "Command not found. Type 'help' for available commands."

    // Add to command history
    if (trimmedCmd) {
      setCommandHistory((prev) => [trimmedCmd, ...prev.slice(0, 19)])
      setHistoryIndex(-1)
    }

    // Process commands
    if (trimmedCmd === "help") {
      output = (
        <>
          <div className="mb-1 text-primary font-bold">Available Commands:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div>
              <span className="text-secondary">help</span> - Show available commands
            </div>
            <div>
              <span className="text-secondary">clear</span> - Clear terminal
            </div>
            <div>
              <span className="text-secondary">about</span> - About Benny Blitz
            </div>
            <div>
              <span className="text-secondary">skills</span> - List skills
            </div>
            <div>
              <span className="text-secondary">projects</span> - List projects
            </div>
            <div>
              <span className="text-secondary">contact</span> - Contact information
            </div>
            <div>
              <span className="text-secondary">github</span> - Open GitHub profile
            </div>
            <div>
              <span className="text-secondary">linkedin</span> - Open LinkedIn profile
            </div>
            <div>
              <span className="text-secondary">date</span> - Show current date
            </div>
            <div>
              <span className="text-secondary">time</span> - Show current time
            </div>
            <div>
              <span className="text-secondary">echo [text]</span> - Echo text
            </div>
            <div>
              <span className="text-secondary">whoami</span> - Who are you?
            </div>
          </div>
        </>
      )
    } else if (trimmedCmd === "clear") {
      setCommands([])
      return
    } else if (trimmedCmd === "about") {
      output = (
        <>
          <div className="text-primary font-bold">Benny Blitz</div>
          <div>Web Developer based in Berlin, Germany</div>
          <div className="mt-1 text-muted-foreground">
            Not really "passionate" about anything. Just a web developer who loves building things that live on the
            internet.
          </div>
        </>
      )
    } else if (trimmedCmd === "skills") {
      output = (
        <>
          <div className="mb-1 text-primary font-bold">Skills:</div>
          <div className="mb-1">
            <span className="text-secondary">Frontend:</span> React, Next.js, TypeScript, JavaScript, HTML, CSS,
            Tailwind CSS, Angular, zod
          </div>
          <div>
            <span className="text-secondary">Tools:</span> Git, GitHub, VS Code, Figma, Jest, Webpack, npm, moccha,
            playwright, Docker, Jenkins
          </div>
        </>
      )
    } else if (trimmedCmd === "projects") {
      output = (
        <>
          <div className="mb-1 text-primary font-bold">Projects:</div>
          <div className="mb-2">
            <div className="text-secondary">Portfolio</div>
            <div className="text-sm text-muted-foreground">React, Tailwind, Framer Motion</div>
            <div className="text-sm">A Portfolio website with smooth animations and responsive design.</div>
          </div>
          <div className="mb-2">
            <div className="text-secondary">Is this East-Berlin</div>
            <div className="text-sm text-muted-foreground">
              Next.js, React, shadcn, tailwind css, posthog, neon postgres, turf.js
            </div>
            <div className="text-sm">
              A single purpose Application to find out if you are in East-Berlin or in West-Berlin.
            </div>
          </div>
          <div>
            <div className="text-secondary">Portal Pioneer</div>
            <div className="text-sm text-muted-foreground">
              Next.js, Tailwind CSS, Framer Motion, vercel, auth.js, bcrypt, node, drizzle, t3stack
            </div>
            <div className="text-sm">
              A website to help you find more stuff on the Internet you didn't know you needed.
            </div>
          </div>
        </>
      )
    } else if (trimmedCmd === "contact") {
      output = (
        <>
          <div className="mb-1 text-primary font-bold">Contact Information:</div>
          <div>
            <span className="text-secondary">Email:</span> blitzbenny8@gmail.com
          </div>
          <div>
            <span className="text-secondary">GitHub:</span> github.com/Maruan256
          </div>
          <div>
            <span className="text-secondary">LinkedIn:</span> linkedin.com/in/maruan-paschen
          </div>
        </>
      )
    } else if (trimmedCmd === "github") {
      window.open("https://github.com/Maruan256", "_blank")
      output = "Opening GitHub profile..."
    } else if (trimmedCmd === "linkedin") {
      window.open("https://www.linkedin.com/in/maruan-paschen/", "_blank")
      output = "Opening LinkedIn profile..."
    } else if (trimmedCmd === "date") {
      output = new Date().toLocaleDateString()
    } else if (trimmedCmd === "time") {
      output = new Date().toLocaleTimeString()
    } else if (trimmedCmd.startsWith("echo ")) {
      output = trimmedCmd.substring(5)
    } else if (trimmedCmd === "whoami") {
      output = "You are a visitor to Benny Blitz's portfolio website."
    } else if (trimmedCmd === "") {
      output = ""
    }

    const newCommand: Command = {
      id: Date.now().toString(),
      input: cmd,
      output,
    }

    setCommands((prev) => [...prev, newCommand])
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <div className="flex flex-col border-t border-border shrink-0">
      {/* Terminal header */}
      <div className="flex items-center justify-between bg-muted/50 border-b border-border px-3 py-1">
        <div className="text-sm font-medium">Terminal</div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onMinimizeToggle}
            className="text-muted-foreground hover:text-foreground"
            aria-label={isMinimized ? "Expand terminal" : "Minimize terminal"}
          >
            {isMinimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Terminal content */}
      {!isMinimized && (
        <div ref={terminalRef} className="h-48 overflow-y-auto p-3 font-mono text-sm bg-black/90 text-green-400">
          {commands.map((command) => (
            <div key={command.id} className="mb-2">
              {command.input && (
                <div className="flex">
                  <span className="text-primary mr-1">$</span>
                  <span>{command.input}</span>
                </div>
              )}
              <div className="ml-2">{command.output}</div>
            </div>
          ))}
          <div className="flex items-center">
            <span className="text-primary mr-1">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  )
}

