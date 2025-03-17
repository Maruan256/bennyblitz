"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, X, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  isTyping?: boolean
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hi there! I'm Benny's assistant. How can I help you today?",
    sender: "bot",
  },
]

const RESPONSES = [
  "I'm a frontend developer with experience in React, Next.js, and TypeScript.",
  "You can check out my projects in the portfolio section.",
  "Feel free to reach out via email at blitzbenny8@gmail.com or connect on LinkedIn.",
  "I specialize in building responsive and accessible web applications.",
  "I'm currently working as a Frontend Developer at HSH Kommunalsoftware.",
  "I have experience with various frontend frameworks and libraries.",
  "I'm always looking to learn new technologies and improve my skills.",
  "I'm sorry, I don't understand that question. Could you try asking something else?",
]

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)

    // Focus the input field when opening the chat
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)

    // Focus the input field when maximizing
    if (isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Add bot typing indicator
    const typingId = (Date.now() + 1).toString()
    setMessages((prev) => [...prev, { id: typingId, text: "", sender: "bot", isTyping: true }])

    // Simulate bot response after a delay
    setTimeout(() => {
      // Remove typing indicator and add actual response
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== typingId)
        const randomResponse = RESPONSES[Math.floor(Math.random() * RESPONSES.length)]

        return [
          ...filtered,
          {
            id: (Date.now() + 2).toString(),
            text: randomResponse,
            sender: "bot",
          },
        ]
      })
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary/90 transition-all z-50"
        aria-label="Open chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-4 right-4 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 transition-all duration-300 ease-in-out ${
        isMinimized ? "w-72 h-12" : "w-80 sm:w-96 h-96"
      }`}
    >
      {/* Chat header */}
      <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
        <h3 className="font-medium text-sm">Benny's Assistant</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMinimize}
            className="text-primary-foreground/80 hover:text-primary-foreground"
            aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={toggleChat}
            className="text-primary-foreground/80 hover:text-primary-foreground"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      {!isMinimized && (
        <div className="p-3 overflow-y-auto h-[calc(100%-96px)] bg-background">
          {messages.map((message) => (
            <div key={message.id} className={`mb-3 ${message.sender === "user" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block rounded-lg px-3 py-2 max-w-[85%] ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                {message.isTyping ? (
                  <div className="flex space-x-1 items-center h-6">
                    <div
                      className="w-2 h-2 rounded-full bg-current animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-current animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-current animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                ) : (
                  <p className="text-sm break-words">{message.text}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Chat input */}
      {!isMinimized && (
        <div className="p-3 border-t border-border bg-card">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon" disabled={!input.trim()} aria-label="Send message">
              <Send size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

