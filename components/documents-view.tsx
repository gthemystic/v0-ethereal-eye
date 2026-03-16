"use client"

import { useState, useCallback } from "react"
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Globe,
  CheckCircle2,
  Loader2,
  Eye,
  Link2,
  Table2,
  ScanText,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { mockDocuments, type Document } from "@/lib/mock-data"

const processingStages = [
  { label: "Extracting text...", icon: ScanText },
  { label: "Analyzing images...", icon: Eye },
  { label: "Fetching URLs...", icon: Globe },
  { label: "Generating embeddings...", icon: Table2 },
  { label: "Storing vectors...", icon: CheckCircle2 },
]

interface DocumentsViewProps {
  onSelectDocument: (doc: Document) => void
}

export function DocumentsView({ onSelectDocument }: DocumentsViewProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [options, setOptions] = useState({
    visionAnalysis: true,
    followUrls: true,
    extractTables: true,
    ocrOnly: false,
  })

  const simulateUpload = useCallback(() => {
    setIsUploading(true)
    setCurrentStage(0)
    setUploadProgress(0)

    const totalStages = processingStages.length
    let stage = 0

    const interval = setInterval(() => {
      stage++
      const progress = Math.min((stage / totalStages) * 100, 100)
      setCurrentStage(Math.min(stage, totalStages - 1))
      setUploadProgress(progress)

      if (stage >= totalStages) {
        clearInterval(interval)
        setTimeout(() => {
          setIsUploading(false)
          setUploadProgress(0)
          setCurrentStage(0)
        }, 1500)
      }
    }, 1800)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      simulateUpload()
    },
    [simulateUpload]
  )

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          Documents
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload and manage your engineering documents
        </p>
      </div>

      {/* Upload Section */}
      <div className="animate-fade-in rounded-xl border bg-card p-5 lg:p-6">
        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && simulateUpload()}
          role="button"
          tabIndex={0}
          aria-label="Drop files here or click to upload"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              if (!isUploading) simulateUpload()
            }
          }}
          className={cn(
            "flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-all",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-secondary hover:border-primary/40 hover:bg-primary/5",
            isUploading && "pointer-events-none"
          )}
        >
          {isUploading ? (
            <div className="flex w-full max-w-md flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="w-full">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    {processingStages[currentStage].label}
                  </span>
                  <span className="text-muted-foreground">
                    {Math.round(uploadProgress)}%
                  </span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="animate-shimmer h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-700"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
              {/* Stage indicators */}
              <div className="flex w-full flex-col gap-2 pt-2">
                {processingStages.map((stage, i) => {
                  const StageIcon = stage.icon
                  const isComplete = i < currentStage
                  const isCurrent = i === currentStage
                  return (
                    <div
                      key={stage.label}
                      className={cn(
                        "flex items-center gap-2 text-xs transition-all",
                        isComplete
                          ? "text-[hsl(var(--success))]"
                          : isCurrent
                            ? "text-primary"
                            : "text-muted-foreground/40"
                      )}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : isCurrent ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <StageIcon className="h-3.5 w-3.5" />
                      )}
                      {stage.label}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Upload className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Drop files here or click to upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Drag and drop your engineering documents
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {["PDF", "Images", "DOCX"].map((fmt) => (
                  <Badge
                    key={fmt}
                    variant="outline"
                    className="text-[10px] font-medium"
                  >
                    {fmt}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Processing Options */}
        {!isUploading && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              {
                key: "visionAnalysis" as const,
                label: "Enable Vision Analysis",
                desc: "GLM-4V multimodal analysis",
                icon: Eye,
              },
              {
                key: "followUrls" as const,
                label: "Follow & Enrich URLs",
                desc: "Fetch external content",
                icon: Link2,
              },
              {
                key: "extractTables" as const,
                label: "Extract Tables",
                desc: "Structured table extraction",
                icon: Table2,
              },
              {
                key: "ocrOnly" as const,
                label: "OCR Only (No Vision)",
                desc: "Text extraction only",
                icon: ScanText,
              },
            ].map((opt) => {
              const Icon = opt.icon
              return (
                <label
                  key={opt.key}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-secondary/50"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {opt.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                  <Switch
                    checked={options[opt.key]}
                    onCheckedChange={(checked) =>
                      setOptions((prev) => ({ ...prev, [opt.key]: checked }))
                    }
                  />
                </label>
              )
            })}
          </div>
        )}
      </div>

      {/* Document List */}
      <div className="animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          All Documents
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mockDocuments.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelectDocument(doc)}
              className="group flex flex-col rounded-xl border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px]",
                    doc.status === "completed"
                      ? "border-[hsl(var(--success))]/30 text-[hsl(var(--success))]"
                      : doc.status === "processing"
                        ? "border-[hsl(var(--warning))]/30 text-[hsl(var(--warning))]"
                        : "border-destructive/30 text-destructive"
                  )}
                >
                  {doc.status === "processing" && (
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  )}
                  {doc.status}
                </Badge>
              </div>
              <h3 className="mt-3 truncate text-sm font-medium text-foreground">
                {doc.name}
              </h3>
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {doc.pages}p
                </span>
                <span className="flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  {doc.images} img
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {doc.urls} urls
                </span>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">
                {doc.fileSize}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
