"use client"

import { useState, useRef, useEffect } from "react"
import {
  Send,
  Paperclip,
  Mic,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Clock,
  Star,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import {
  mockQueries,
  mockSavedQueries,
  type QueryMessage,
  type Citation,
} from "@/lib/mock-data"

function ConfidenceIndicator({ score }: { score: number }) {
  const percent = Math.round(score * 100)
  const color =
    score >= 0.85
      ? "text-[hsl(var(--success))] bg-[hsl(var(--success))]/10 border-[hsl(var(--success))]/30"
      : score >= 0.6
        ? "text-[hsl(var(--warning))] bg-[hsl(var(--warning))]/10 border-[hsl(var(--warning))]/30"
        : "text-destructive bg-destructive/10 border-destructive/30"

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        color
      )}
    >
      <div
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "currentColor" }}
      />
      {percent}% confidence
    </div>
  )
}

function CitationChip({
  citation,
  expanded,
  onToggle,
}: {
  citation: Citation
  expanded: boolean
  onToggle: () => void
}) {
  const icon =
    citation.type === "page" ? (
      <FileText className="h-3 w-3" />
    ) : citation.type === "diagram" ? (
      <ImageIcon className="h-3 w-3" />
    ) : (
      <ExternalLink className="h-3 w-3" />
    )

  const label =
    citation.type === "page"
      ? `Page ${citation.value}`
      : citation.type === "diagram"
        ? `Diagram ${citation.value}`
        : citation.value

  return (
    <div className="inline-flex flex-col">
      <button
        onClick={onToggle}
        className={cn(
          "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-all",
          expanded
            ? "border-primary bg-primary/10 text-primary"
            : "border-secondary bg-secondary text-muted-foreground hover:border-primary/40 hover:text-foreground"
        )}
      >
        {icon}
        {label}
        {expanded ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
      </button>
      {expanded && (
        <div className="mt-1.5 max-w-xs rounded-lg border bg-card p-3 text-xs text-muted-foreground shadow-lg">
          <p>{citation.preview}</p>
          {citation.url && (
            <a
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 flex items-center gap-1 text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              View source
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export function QueryChatView() {
  const [messages, setMessages] = useState<QueryMessage[]>(mockQueries)
  const [input, setInput] = useState("")
  const [deepAnalysis, setDeepAnalysis] = useState(false)
  const [expandedCitations, setExpandedCitations] = useState<Set<string>>(
    new Set()
  )
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const toggleCitation = (messageId: string, citationIdx: number) => {
    const key = `${messageId}-${citationIdx}`
    setExpandedCitations((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: QueryMessage = {
      id: `q-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: QueryMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content:
          "Based on the analyzed documents, I found relevant information across multiple sources. The structural analysis indicates compliance with current standards, though specific values depend on the loading conditions specified in your design basis.\n\nFurther details are available in the referenced sections below.",
        citations: [
          {
            type: "page",
            value: "15",
            preview: "Design basis and loading assumptions section.",
          },
          {
            type: "diagram",
            value: "2.1",
            preview: "General arrangement drawing with key dimensions.",
          },
        ],
        confidence: 0.87,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row lg:h-[calc(100vh-8rem)]">
      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="h-10 gap-2 lg:hidden"
      >
        <BookOpen className="h-4 w-4" />
        {sidebarOpen ? "Hide" : "Show"} Query History
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "shrink-0 overflow-hidden rounded-xl border bg-card lg:mr-4 lg:w-64 lg:rounded-xl",
          sidebarOpen ? "block" : "hidden lg:block"
        )}
      >
        <div className="border-b px-4 py-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent Queries
          </h3>
        </div>
        <ScrollArea className="h-48 lg:h-[calc(100%-7rem)]">
          <div className="flex flex-col gap-0.5 p-2">
            {mockQueries
              .filter((m) => m.role === "user")
              .map((m) => (
                <button
                  key={m.id}
                  className="flex items-start gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span className="line-clamp-2 text-xs">{m.content}</span>
                </button>
              ))}
          </div>
        </ScrollArea>
        <div className="border-t px-4 py-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Saved Queries
          </h3>
        </div>
        <ScrollArea className="h-32 lg:h-auto">
          <div className="flex flex-col gap-0.5 p-2">
            {mockSavedQueries.map((q, i) => (
              <button
                key={i}
                className="flex items-start gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--warning))]" />
                <span className="line-clamp-2 text-xs">{q}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Chat Area */}
      <div className="flex min-w-0 flex-1 flex-col rounded-xl border bg-card">
        {/* Chat header */}
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Query Interface
            </h2>
            <p className="text-xs text-muted-foreground">
              Ask questions about your documents
            </p>
          </div>
          <Badge variant="outline" className="text-[10px]">
            {messages.filter((m) => m.role === "user").length} queries
          </Badge>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-4 lg:px-5">
          <div className="flex flex-col gap-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col animate-fade-in",
                  message.role === "user" ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[90%] rounded-2xl px-4 py-3 lg:max-w-[75%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  )}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </p>
                </div>

                {/* Citations & Confidence for assistant messages */}
                {message.role === "assistant" && (
                  <div className="mt-2 flex flex-col gap-2">
                    {message.confidence != null && (
                      <ConfidenceIndicator score={message.confidence} />
                    )}
                    {message.citations && message.citations.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {message.citations.map((citation, idx) => (
                          <CitationChip
                            key={idx}
                            citation={citation}
                            expanded={expandedCitations.has(
                              `${message.id}-${idx}`
                            )}
                            onToggle={() => toggleCitation(message.id, idx)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {deepAnalysis
                      ? "Running deep analysis with multiple agents..."
                      : "Analyzing documents..."}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t px-4 py-3 lg:px-5">
          <div className="flex items-end gap-2">
            <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-xl border bg-background p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Ask a question about your documents..."
                className="min-h-[44px] w-full resize-none bg-transparent px-2 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                rows={1}
                style={{ fontSize: "16px" }}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    aria-label="Attach document"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    aria-label="Voice input"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1.5 rounded-lg border px-2 py-1">
                    <Zap className="h-3 w-3 text-[hsl(var(--warning))]" />
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Deep
                    </span>
                    <Switch
                      checked={deepAnalysis}
                      onCheckedChange={setDeepAnalysis}
                      className="scale-75"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="h-8 gap-1.5 bg-primary px-3 text-xs text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
