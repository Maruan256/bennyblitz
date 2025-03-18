"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useState, useEffect } from "react"
import { Github, Mail, Linkedin, ChevronDown, ExternalLink, Code, Briefcase, GraduationCap, User, Layers, Menu, X, Maximize2, Minimize2, Circle, ChevronRight, FolderOpen, Folder, FileText, File, Settings, Search, GitBranch, Play, Package, Heart, Coffee, Clock } from 'lucide-react'
import { useTheme } from "@/components/theme-provider"
import Chatbot from "@/components/chatbot"
import Terminal from "@/components/terminal"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("about")
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["portfolio"])
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [terminalVisible, setTerminalVisible] = useState(true)
  const [terminalMinimized, setTerminalMinimized] = useState(false)

  const fullscreenStyles = {
    container: isFullscreen ? "max-w-none mx-0 h-screen" : "max-w-6xl mx-auto",
    editor: isFullscreen ? "h-screen rounded-none border-0" : "rounded-lg border",
    content: isFullscreen ? "p-6 md:p-8" : "p-4 md:p-6",
    lineNumbers: isFullscreen ? "text-xs md:text-sm" : "text-xs",
    code: isFullscreen ? "text-sm md:text-base lg:text-lg" : "text-sm md:text-base",
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    console.log("Current theme:", theme)
  }, [theme])

  const handleThemeChange = (newTheme: string) => {
    console.log("Changing theme to:", newTheme)
    setTheme(newTheme)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const toggleFolder = (folderName: string) => {
    if (expandedFolders.includes(folderName)) {
      setExpandedFolders(expandedFolders.filter((f) => f !== folderName))
    } else {
      setExpandedFolders([...expandedFolders, folderName])
    }
  }

  const openFile = (fileName: string) => {
    setActiveFile(fileName)
  }

  const closeFile = () => {
    setActiveFile(null)
  }

  if (!mounted) {
    return null
  }

  const tabs = [
    { id: "about", icon: User, label: "about" },
    { id: "experience", icon: Briefcase, label: "experience" },
    { id: "education", icon: GraduationCap, label: "education" },
    { id: "skills", icon: Code, label: "skills" },
    { id: "projects", icon: Layers, label: "projects" },
  ]

  // Generate line numbers for the code editor
  const lineNumbers = Array.from({ length: 100 }, (_, i) => i + 1)

  return (
    <div key={theme} className={fullscreenStyles.container}>
      {/* VSCode-like editor container */}
      <div
        className={`${fullscreenStyles.editor} bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col`}
      >
        {/* Editor header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-3 py-2">
          <div className="flex items-center">
            {/* Window controls */}
            <div className="flex space-x-2 mr-4">
              <Circle className="h-3 w-3 text-red-500 fill-red-500" />
              <Circle className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              <Circle className="h-3 w-3 text-green-500 fill-green-500" />
            </div>

            {/* File tabs */}
            <div className="flex">
              {activeFile && (
                <div className="flex items-center">
                  <div className="px-3 py-1 bg-background border-t border-l border-r border-border rounded-t-md text-xs flex items-center">
                    {activeFile === "portfolio/page.tsx" ? (
                      <FileText className="h-3 w-3 mr-1" />
                    ) : (
                      <File className="h-3 w-3 mr-1" />
                    )}
                    {activeFile}
                    <button onClick={closeFile} className="ml-2 text-muted-foreground hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={toggleFullscreen} className="text-muted-foreground hover:text-foreground">
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-muted-foreground hover:text-foreground"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* VSCode-like topbar */}
        <div className="border-b border-border bg-muted/30 text-xs">
          <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 hover:bg-accent/50 focus:outline-none">
                File
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => openFile("portfolio/page.tsx")}>Open Portfolio</DropdownMenuItem>
                <DropdownMenuItem onClick={() => openFile("components/game.tsx")}>Open Game</DropdownMenuItem>
                <DropdownMenuItem onClick={() => openFile("components/database.tsx")}>Open Database</DropdownMenuItem>
                <DropdownMenuItem onClick={() => openFile("components/cssBattle.tsx")}>
                  Open CSS Battle
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Save</DropdownMenuItem>
                <DropdownMenuItem>Save As...</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Exit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 hover:bg-accent/50 focus:outline-none">
                Edit
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Undo</DropdownMenuItem>
                <DropdownMenuItem>Redo</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Cut</DropdownMenuItem>
                <DropdownMenuItem>Copy</DropdownMenuItem>
                <DropdownMenuItem>Paste</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Find</DropdownMenuItem>
                <DropdownMenuItem>Replace</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 hover:bg-accent/50 focus:outline-none">
                View
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSidebarOpen(!sidebarOpen)}>
                  {sidebarOpen ? "Hide Explorer" : "Show Explorer"}
                </DropdownMenuItem>
                <DropdownMenuItem>Command Palette</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Appearance</DropdownMenuItem>
                <DropdownMenuItem onClick={toggleFullscreen}>
                  {isFullscreen ? "Exit Full Screen" : "Enter Full Screen"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 hover:bg-accent/50 focus:outline-none">
                Go
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Back</DropdownMenuItem>
                <DropdownMenuItem>Forward</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Go to File</DropdownMenuItem>
                <DropdownMenuItem>Go to Symbol</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 hover:bg-accent/50 focus:outline-none">
                Run
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Start Debugging</DropdownMenuItem>
                <DropdownMenuItem>Run Without Debugging</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Toggle Breakpoint</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 hover:bg-accent/50 focus:outline-none">
                Terminal
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTerminalVisible(!terminalVisible)}>
                  {terminalVisible ? "Hide Terminal" : "Show Terminal"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTerminalMinimized(!terminalMinimized)}>
                  {terminalMinimized ? "Expand Terminal" : "Minimize Terminal"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>New Terminal</DropdownMenuItem>
                <DropdownMenuItem>Split Terminal</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Run Task</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="hidden sm:block px-3 py-1.5 hover:bg-accent/50 focus:outline-none">
                Help
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Welcome</DropdownMenuItem>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>About</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 hover:bg-accent/50 focus:outline-none">
                Theme
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleThemeChange("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleThemeChange("neon-nights")}>Neon Nights</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("pastel-dreams")}>Pastel Dreams</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("forest-green")}>Forest Green</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("ocean-blue")}>Ocean Blue</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Editor body with sidebar and content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar */}
          <div
            className={`${sidebarOpen ? "block" : "hidden"} md:block border-r border-border bg-muted/20 w-full md:w-56 shrink-0`}
          >
            {/* Sidebar header */}
            <div className="p-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Explorer</div>

            {/* Sidebar activity bar */}
            <div className="hidden md:flex flex-col items-center py-4 absolute left-0 top-20 bottom-0 w-10 bg-muted/30 border-r border-border">
              <button className="p-2 mb-2 text-primary">
                <FileText className="h-5 w-5" />
              </button>
              <button className="p-2 mb-2 text-muted-foreground hover:text-foreground">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 mb-2 text-muted-foreground hover:text-foreground">
                <GitBranch className="h-5 w-5" />
              </button>
              <button className="p-2 mb-2 text-muted-foreground hover:text-foreground">
                <Play className="h-5 w-5" />
              </button>
              <button className="p-2 mb-2 text-muted-foreground hover:text-foreground">
                <Package className="h-5 w-5" />
              </button>

              <div className="mt-auto">
                <button className="p-2 mb-2 text-muted-foreground hover:text-foreground">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* File tree */}
            <div className="ml-0 md:ml-10 p-2">
              <div className="mb-1">
                <button
                  onClick={() => toggleFolder("portfolio")}
                  className="flex items-center w-full text-left px-2 py-1 rounded hover:bg-accent/50 text-sm"
                >
                  {expandedFolders.includes("portfolio") ? (
                    <ChevronDown className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronRight className="h-3 w-3 mr-1" />
                  )}
                  {expandedFolders.includes("portfolio") ? (
                    <FolderOpen className="h-4 w-4 mr-1 text-blue-400" />
                  ) : (
                    <Folder className="h-4 w-4 mr-1 text-blue-400" />
                  )}
                  <span>portfolio</span>
                </button>

                {expandedFolders.includes("portfolio") && (
                  <div className="ml-4 mt-1">
                    <button
                      onClick={() => openFile("portfolio/page.tsx")}
                      className={`flex items-center w-full text-left px-2 py-1 rounded ${
                        activeFile === "portfolio/page.tsx" ? "bg-accent/50" : "hover:bg-accent/50"
                      } text-sm`}
                    >
                      <FileText
                        className={`h-4 w-4 mr-1 ${
                          activeFile === "portfolio/page.tsx" ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span>page.tsx</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-1">
                <button
                  onClick={() => toggleFolder("components")}
                  className="flex items-center w-full text-left px-2 py-1 rounded hover:bg-accent/50 text-sm"
                >
                  {expandedFolders.includes("components") ? (
                    <ChevronDown className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronRight className="h-3 w-3 mr-1" />
                  )}
                  {expandedFolders.includes("components") ? (
                    <FolderOpen className="h-4 w-4 mr-1 text-yellow-400" />
                  ) : (
                    <Folder className="h-4 w-4 mr-1 text-yellow-400" />
                  )}
                  <span>components</span>
                </button>

                {expandedFolders.includes("components") && (
                  <div className="ml-4 mt-1">
                    <button
                      onClick={() => openFile("components/game.tsx")}
                      className={`flex items-center w-full text-left px-2 py-1 rounded ${
                        activeFile === "components/game.tsx" ? "bg-accent/50" : "hover:bg-accent/50"
                      } text-sm`}
                    >
                      <File
                        className={`h-4 w-4 mr-1 ${
                          activeFile === "components/game.tsx" ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span>game.tsx</span>
                    </button>
                    <button
                      onClick={() => openFile("components/database.tsx")}
                      className={`flex items-center w-full text-left px-2 py-1 rounded ${
                        activeFile === "components/database.tsx" ? "bg-accent/50" : "hover:bg-accent/50"
                      } text-sm`}
                    >
                      <File
                        className={`h-4 w-4 mr-1 ${
                          activeFile === "components/database.tsx" ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span>database.tsx</span>
                    </button>
                    <button
                      onClick={() => openFile("components/cssBattle.tsx")}
                      className={`flex items-center w-full text-left px-2 py-1 rounded ${
                        activeFile === "components/cssBattle.tsx" ? "bg-accent/50" : "hover:bg-accent/50"
                      } text-sm`}
                    >
                      <File
                        className={`h-4 w-4 mr-1 ${
                          activeFile === "components/cssBattle.tsx" ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span>cssBattle.tsx</span>
                    </button>
                    <button
                      onClick={() => openFile("components/chatbot.tsx")}
                      className={`flex items-center w-full text-left px-2 py-1 rounded ${
                        activeFile === "components/chatbot.tsx" ? "bg-accent/50" : "hover:bg-accent/50"
                      } text-sm`}
                    >
                      <File
                        className={`h-4 w-4 mr-1 ${
                          activeFile === "components/chatbot.tsx" ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span>chatbot.tsx</span>
                    </button>
                    <button
                      onClick={() => openFile("components/terminal.tsx")}
                      className={`flex items-center w-full text-left px-2 py-1 rounded ${
                        activeFile === "components/terminal.tsx" ? "bg-accent/50" : "hover:bg-accent/50"
                      } text-sm`}
                    >
                      <File
                        className={`h-4 w-4 mr-1 ${
                          activeFile === "components/terminal.tsx" ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span>terminal.tsx</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-1">
                <button
                  onClick={() => toggleFolder("public")}
                  className="flex items-center w-full text-left px-2 py-1 rounded hover:bg-accent/50 text-sm"
                >
                  {expandedFolders.includes("public") ? (
                    <ChevronDown className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronRight className="h-3 w-3 mr-1" />
                  )}
                  {expandedFolders.includes("public") ? (
                    <FolderOpen className="h-4 w-4 mr-1 text-green-400" />
                  ) : (
                    <Folder className="h-4 w-4 mr-1 text-green-400" />
                  )}
                  <span>public</span>
                </button>

                {expandedFolders.includes("public") && (
                  <div className="ml-4 mt-1">
                    <button
                      onClick={() => openFile("public/favicon.svg")}
                      className={`flex items-center w-full text-left px-2 py-1 rounded ${
                        activeFile === "public/favicon.svg" ? "bg-accent/50" : "hover:bg-accent/50"
                      } text-sm`}
                    >
                      <File
                        className={`h-4 w-4 mr-1 ${
                          activeFile === "public/favicon.svg" ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span>favicon.svg</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main content area with integrated terminal */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile sidebar toggle */}
            <div className="md:hidden flex items-center border-b border-border p-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-muted-foreground hover:text-foreground"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Folder className="h-4 w-4" />}
                <span className="ml-2 text-xs">{sidebarOpen ? "Close Explorer" : "Show Explorer"}</span>
              </button>
            </div>

            {/* Code content - takes remaining space but allows terminal below */}
            <div className="flex flex-1 overflow-auto min-h-0">
              {activeFile === "portfolio/page.tsx" ? (
                <>
                  {/* Line numbers */}
                  <div
                    className={`hidden sm:flex flex-col items-end pr-2 py-4 bg-muted/30 text-muted-foreground ${fullscreenStyles.lineNumbers} font-mono`}
                  >
                    {lineNumbers.slice(0, 40).map((num) => (
                      <div key={num} className="h-6 w-6 text-right">
                        {num}
                      </div>
                    ))}
                  </div>

                  {/* Portfolio content */}
                  <div className={`w-full ${fullscreenStyles.content} overflow-auto`}>
                    <div className={`${fullscreenStyles.code} leading-relaxed font-mono`}>
                      <div className="text-[hsl(var(--syntax-highlight))]">
                        <span className="text-accent-foreground">import</span>{" "}
                        <span className="text-primary">React</span> <span className="text-accent-foreground">from</span>{" "}
                        <span className="text-secondary">&apos;react&apos;</span>
                      </div>

                      <div className="mb-4 mt-2">
                        <span className="text-accent-foreground">const</span>{" "}
                        <span className="text-[hsl(var(--syntax-highlight))]">Portfolio</span>{" "}
                        <span className="text-primary">=</span> <span className="text-accent-foreground">()</span>{" "}
                        <span className="text-primary">=&gt;</span> <span className="text-primary">{"{"}</span>
                      </div>

                      <div className="ml-4 mb-4">
                        <span className="text-accent-foreground">return</span> <span className="text-primary">(</span>
                      </div>

                      <div className="ml-8 mb-4">
                        <span className="text-[hsl(var(--syntax-highlight))]">&lt;</span>
                        <span className="text-secondary">div</span>
                        <span className="text-accent-foreground"> theme</span>
                        <span className="text-primary">=</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex items-center text-primary hover:text-primary/80 focus:outline-none">
                            &apos;{theme}&apos;
                            <ChevronDown className="h-3 w-3 ml-1" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                              &apos;light&apos;
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                              &apos;dark&apos;
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleThemeChange("neon-nights")}>
                              &apos;neon-nights&apos;
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleThemeChange("pastel-dreams")}>
                              &apos;pastel-dreams&apos;
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleThemeChange("forest-green")}>
                              &apos;forest-green&apos;
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleThemeChange("ocean-blue")}>
                              &apos;ocean-blue&apos;
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <span className="text-[hsl(var(--syntax-highlight))]">&gt;</span>
                      </div>

                      {/* Developer Info */}
                      <div className="ml-12 mb-4">
                        <span className="text-[hsl(var(--syntax-highlight))]">&lt;</span>
                        <span className="text-secondary">Developer</span>
                        <span className="text-accent-foreground"> name</span>
                        <span className="text-primary">=</span>
                        <span className="text-secondary">&apos;Benny Blitz&apos;</span>
                        <span className="text-accent-foreground"> title</span>
                        <span className="text-primary">=</span>
                        <span className="text-secondary">&apos;Web Developer&apos;</span>
                        <span className="text-[hsl(var(--syntax-highlight))]">&gt;</span>
                      </div>

                      {/* Mobile Menu */}
                      <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
                        <div className="ml-16 mb-4 space-y-2">
                          {tabs.map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => {
                                setActiveTab(tab.id)
                                setMobileMenuOpen(false)
                              }}
                              className={`w-full text-left px-3 py-1 rounded-md flex items-center ${
                                activeTab === tab.id
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
                              }`}
                            >
                              <tab.icon className="h-3 w-3 mr-1" />
                              <span>{tab.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Desktop Tabs Navigation */}
                      <div className="hidden md:flex ml-16 mb-4 space-x-1 border-b border-border">
                        {tabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 py-1 rounded-t-md flex items-center ${
                              activeTab === tab.id
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            }`}
                          >
                            <tab.icon className="h-3 w-3 mr-1" />
                            <span>{tab.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Tab Content */}
                      <div className="ml-16 mb-4">
                        {activeTab === "about" && (
                          <div className="py-2">
                            <div className="text-sm text-muted-foreground mb-2">/* About me */</div>
                            <p className="text-sm mb-2 text-foreground">
                              Not really "passionate" about anything. Just a web developer who loves building things
                              that live on the internet.
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mt-4">
                              <a
                                href="mailto:blitzbenny8@gmail.com"
                                className="flex items-center text-sm text-primary hover:text-primary/80"
                              >
                                <Mail className="h-4 w-4 mr-1" />
                                <span>blitzbenny8@gmail.com</span>
                              </a>
                              <a
                                href="https://github.com/Maruan256"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-sm text-primary hover:text-primary/80"
                              >
                                <Github className="h-4 w-4 mr-1" />
                                <span>github.com/Maruan256</span>
                              </a>
                              <a
                                href="https://www.linkedin.com/in/maruan-paschen/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-sm text-primary hover:text-primary/80"
                              >
                                <Linkedin className="h-4 w-4 mr-1" />
                                <span>linkedin.com/in/maruan-paschen</span>
                              </a>
                            </div>
                          </div>
                        )}

                        {activeTab === "experience" && (
                          <div className="py-2">
                            <div className="text-sm text-muted-foreground mb-2">/* Work experience */</div>
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="item-1">
                                <AccordionTrigger className="text-sm">
                                  <div>
                                    <div className="font-medium text-foreground">Frontend Developer</div>
                                    <div className="text-xs text-muted-foreground">
                                      HSH Kommunalsoftware| 2024 - Present
                                    </div>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-foreground">
                                  <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>Maintaining the front-end portion of a large code base</li>
                                    <li>Implemented responsive designs and improved performance</li>
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-2">
                                <AccordionTrigger className="text-sm">
                                  <div>
                                    <div className="font-medium text-foreground">Full Stack Developer</div>
                                    <div className="text-xs text-muted-foreground">
                                      Lufthansa Industry Solutions | 2022 - 2024
                                    </div>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-foreground">
                                  <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>Developed and maintained different fullstack Applications</li>
                                    <li>Collaborated with designers to implement pixel-perfect UIs</li>
                                    <li>Optimized applications for maximum speed and scalability</li>
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        )}

                        {activeTab === "education" && (
                          <div className="py-2">
                            <div className="text-sm text-muted-foreground mb-2">/* Education */</div>
                            <div className="mb-4">
                              <h3 className="text-sm font-medium text-foreground">Master of Arts</h3>
                              <p className="text-xs text-muted-foreground">University of Leipzig | 2012 - 2014</p>
                              <p className="text-sm mt-1 text-foreground">
                                Written two novels actually, one was my thesis.
                              </p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-foreground">
                                Bachelor of fine Arts in creative writing
                              </h3>
                              <p className="text-xs text-muted-foreground">Hochschule der Künste Bern | 2009 - 2012</p>
                              <p className="text-sm mt-1 text-foreground">Keen focus on digital Arts</p>
                            </div>
                          </div>
                        )}

                        {activeTab === "skills" && (
                          <div className="py-2">
                            <div className="text-sm text-muted-foreground mb-2">/* Technical skills */</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium text-foreground mb-2">Frontend</h3>
                                <div className="flex flex-wrap gap-2">
                                  {[
                                    "React",
                                    "Next.js",
                                    "TypeScript",
                                    "JavaScript",
                                    "HTML",
                                    "CSS",
                                    "Tailwind CSS",
                                    "Angular",
                                    "zod",
                                  ].map((skill) => (
                                    <span
                                      key={skill}
                                      className="px-2 py-1 bg-primary/10 text-xs rounded-md text-primary"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-foreground mb-2">Tools & Others</h3>
                                <div className="flex flex-wrap gap-2">
                                  {[
                                    "Git",
                                    "GitHub",
                                    "VS Code",
                                    "Figma",
                                    "Jest",
                                    "Webpack",
                                    "npm",
                                    "moccha",
                                    "playwright",
                                    "Docker",
                                    "Jenkins",
                                  ].map((skill) => (
                                    <span
                                      key={skill}
                                      className="px-2 py-1 bg-primary/10 text-xs rounded-md text-primary"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === "projects" && (
                          <div className="py-2">
                            <div className="text-sm text-muted-foreground mb-2">/* Projects */</div>
                            <div className="space-y-4">
                              <div className="border border-border rounded-md p-3">
                                <div className="flex justify-between items-start">
                                  <h3 className="text-sm font-medium text-foreground">Portfolio</h3>
                                  <a
                                    href="https://www.johannacharlottehorst.de/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs flex items-center text-primary hover:text-primary/80"
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    View
                                  </a>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">React, Tailwind, Framer Motion</p>
                                <p className="text-sm mt-2 text-foreground">
                                  A Portfolio website with smooth animations and responsive design.
                                </p>
                              </div>

                              <div className="border border-border rounded-md p-3">
                                <div className="flex justify-between items-start">
                                  <h3 className="text-sm font-medium text-foreground">Is this East-Berlin</h3>
                                  <a
                                    href="https://www.isthiseastberlin.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs flex items-center text-primary hover:text-primary/80"
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    View
                                  </a>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Next.js, React, shadcn, tailwind css, posthog, neon postgres, turf.js
                                </p>
                                <p className="text-sm mt-2 text-foreground">
                                  A single purpose Application to find out if you are in East-Berlin or in West-Berlin.
                                  (Or not in Berlin at all).
                                </p>
                              </div>

                              <div className="border border-border rounded-md p-3">
                                <div className="flex justify-between items-start">
                                  <h3 className="text-sm font-medium text-foreground">Portal Pioneer</h3>
                                  <a
                                    href="https://pioneer-sepia.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs flex items-center text-primary hover:text-primary/80"
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    View
                                  </a>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Next.js, Tailwind CSS, Framer Motion, vercel, auth.js, bcrypt, node, drizzle, t3stack
                                </p>
                                <p className="text-sm mt-2 text-foreground">
                                  A website to help you find more stuff on the Internet you didn't know you needed.
                                  Still under construction, but keep visiting, change is happening daily.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="ml-12 mb-4">
                        <span className="text-[hsl(var(--syntax-highlight))]">&lt;/</span>
                        <span className="text-secondary">Developer</span>
                        <span className="text-[hsl(var(--syntax-highlight))]">&gt;</span>
                      </div>

                      <div className="ml-8 mb-4">
                        <span className="text-[hsl(var(--syntax-highlight))]">&lt;/</span>
                        <span className="text-secondary">div</span>
                        <span className="text-[hsl(var(--syntax-highlight))]">&gt;</span>
                      </div>

                      <div className="ml-4 mb-4">
                        <span className="text-primary">)</span>
                      </div>

                      <div className="mb-4">
                        <span className="text-primary">{"}"}</span>
                      </div>

                      <div>
                        <span className="text-accent-foreground">export</span>{" "}
                        <span className="text-accent-foreground">default</span>{" "}
                        <span className="text-secondary">Portfolio</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : activeFile ? (
                // Coming Soon message for other files
                <div
                  className={`flex-1 flex flex-col items-center justify-center ${isFullscreen ? "p-12" : "p-8"} text-center`}
                >
                  <div className="mb-6">
                    <Code className="h-16 w-16 text-primary opacity-20" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    This file is still under development. Check back later for updates!
                  </p>
                  <div className="text-xs text-muted-foreground mb-4">File: {activeFile}</div>
                  <Button variant="outline" onClick={closeFile} className="flex items-center">
                    <X className="h-4 w-4 mr-2" />
                    Close File
                  </Button>
                </div>
              ) : (
                // Welcome screen when no file is selected
                <div className={`flex-1 flex flex-col ${isFullscreen ? "p-12" : "p-8"}`}>
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="mb-6">
                      <Code className="h-20 w-20 text-primary opacity-20" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Welcome to Benny's Portfolio</h1>
                    <p className="text-muted-foreground mb-8 max-w-md">
                      Select a file from the explorer to view its contents or use the quick actions below to get
                      started.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full mb-8">
                      <div
                        onClick={() => openFile("portfolio/page.tsx")}
                        className="flex items-start p-4 border border-border rounded-lg hover:bg-accent/20 cursor-pointer"
                      >
                        <div className="mr-4 mt-1">
                          <FileText className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium mb-1">View Portfolio</h3>
                          <p className="text-sm text-muted-foreground">
                            Open the main portfolio page to see my skills and projects
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start p-4 border border-border rounded-lg hover:bg-accent/20 cursor-pointer">
                        <div className="mr-4 mt-1">
                          <Mail className="h-6 w-6 text-green-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium mb-1">Contact Me</h3>
                          <p className="text-sm text-muted-foreground">
                            Get in touch via email at blitzbenny8@gmail.com
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start p-4 border border-border rounded-lg hover:bg-accent/20 cursor-pointer">
                        <div className="mr-4 mt-1">
                          <Github className="h-6 w-6 text-purple-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium mb-1">GitHub Projects</h3>
                          <p className="text-sm text-muted-foreground">
                            Check out my open source contributions and repositories
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start p-4 border border-border rounded-lg hover:bg-accent/20 cursor-pointer">
                        <div className="mr-4 mt-1">
                          <Linkedin className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium mb-1">LinkedIn Profile</h3>
                          <p className="text-sm text-muted-foreground">Connect with me professionally on LinkedIn</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1 text-red-400" />
                        <span>Built with Next.js & Tailwind</span>
                      </div>
                      <div className="flex items-center">
                        <Coffee className="h-4 w-4 mr-1 text-yellow-600" />
                        <span>Powered by coffee</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Last updated: March 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terminal component integrated into the content area */}
            {terminalVisible && (
              <Terminal
                isMinimized={terminalMinimized}
                onMinimizeToggle={() => setTerminalMinimized(!terminalMinimized)}
              />
            )}

            {/* Editor footer - always at the bottom */}
            <div className="flex items-center justify-between border-t border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground shrink-0">
              <div className="flex items-center space-x-4">
                <div>TypeScript React</div>
                <div>UTF-8</div>
              </div>
              <div className="flex items-center space-x-4">
                <div>Ln 1, Col 1</div>
                <div>Spaces: 2</div>
                <div className="flex items-center">
                  <GitBranch className="h-3 w-3 mr-1" />
                  <span>main</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot component */}
      <Chatbot />
    </div>
  );
}
