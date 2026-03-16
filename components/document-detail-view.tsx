"use client"

import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Globe,
  Calendar,
  HardDrive,
  Hash,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  type Document,
  mockExtractedContent,
  mockImageAnalyses,
  mockUrlEnrichments,
} from "@/lib/mock-data"

interface DocumentDetailViewProps {
  document: Document
  onBack: () => void
}

export function DocumentDetailView({
  document,
  onBack,
}: DocumentDetailViewProps) {
  const processedDate = new Date(document.processedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  )

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Back + Title */}
      <div className="flex flex-col gap-3">
        <Button
          variant="ghost"
          onClick={onBack}
          className="h-8 w-fit gap-1.5 px-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Documents
        </Button>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-bold tracking-tight text-foreground lg:text-2xl">
              {document.name}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {document.pages} pages
              </span>
              <span className="flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                {document.images} images
              </span>
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {document.urls} URLs
              </span>
              <span className="flex items-center gap-1">
                <HardDrive className="h-3 w-3" />
                {document.fileSize}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {processedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-secondary/50">
          <TabsTrigger value="overview" className="gap-1.5 text-xs">
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-1.5 text-xs">
            <Hash className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Extracted Content</span>
          </TabsTrigger>
          <TabsTrigger value="images" className="gap-1.5 text-xs">
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Images Analyzed</span>
          </TabsTrigger>
          <TabsTrigger value="urls" className="gap-1.5 text-xs">
            <Globe className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">URLs Found</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-4">
          <div className="animate-fade-in flex flex-col gap-4 lg:flex-row lg:gap-6">
            {/* Summary */}
            <div className="flex-1 rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground">
                Document Summary
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {document.summary || "Summary will be available once processing is complete."}
              </p>
            </div>
            {/* Entities */}
            <div className="rounded-xl border bg-card p-5 lg:w-80">
              <h3 className="text-sm font-semibold text-foreground">
                Key Entities Extracted
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {document.entities ? (
                  document.entities.map((entity) => (
                    <Badge
                      key={entity}
                      variant="outline"
                      className="border-primary/30 bg-primary/5 text-xs text-primary"
                    >
                      {entity}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Entities will appear after processing.
                  </p>
                )}
              </div>

              {/* Quick stats */}
              <div className="mt-5 flex flex-col gap-2.5 border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Processing</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px]",
                      document.status === "completed"
                        ? "border-[hsl(var(--success))]/30 text-[hsl(var(--success))]"
                        : "border-[hsl(var(--warning))]/30 text-[hsl(var(--warning))]"
                    )}
                  >
                    {document.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Vision Analysis</span>
                  <span className="text-xs font-medium text-foreground">
                    {document.images} images
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">URL Enrichment</span>
                  <span className="text-xs font-medium text-foreground">
                    {document.urls} URLs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Extracted Content Tab */}
        <TabsContent value="content" className="mt-4">
          <div className="animate-fade-in rounded-xl border bg-card">
            <div className="border-b px-5 py-3">
              <h3 className="text-sm font-semibold text-foreground">
                Extracted Text Content
              </h3>
              <p className="text-xs text-muted-foreground">
                Full text extraction with structural preservation
              </p>
            </div>
            <ScrollArea className="h-[500px]">
              <pre className="whitespace-pre-wrap p-5 font-mono text-xs leading-relaxed text-muted-foreground">
                {mockExtractedContent}
              </pre>
            </ScrollArea>
          </div>
        </TabsContent>

        {/* Images Analyzed Tab */}
        <TabsContent value="images" className="mt-4">
          <div className="animate-fade-in grid gap-4 sm:grid-cols-2">
            {mockImageAnalyses.map((img) => (
              <div
                key={img.id}
                className="rounded-xl border bg-card transition-all hover:border-primary/30"
              >
                {/* Placeholder image */}
                <div className="relative flex h-48 items-center justify-center rounded-t-xl bg-secondary">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-10 w-10 opacity-40" />
                    <span className="text-xs">
                      Diagram from page {img.pageNumber}
                    </span>
                  </div>
                  <Badge
                    className="absolute right-3 top-3 bg-primary/90 text-[10px] text-primary-foreground"
                  >
                    Page {img.pageNumber}
                  </Badge>
                </div>
                <div className="p-4">
                  <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    <Eye className="h-3 w-3" />
                    AI Vision Analysis
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* URLs Found Tab */}
        <TabsContent value="urls" className="mt-4">
          <div className="animate-fade-in flex flex-col gap-3">
            {mockUrlEnrichments.map((urlItem) => (
              <div
                key={urlItem.id}
                className="rounded-xl border bg-card p-4 transition-all hover:border-primary/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-foreground">
                      {urlItem.title}
                    </h4>
                    <a
                      href={urlItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3 shrink-0" />
                      <span className="truncate">{urlItem.url}</span>
                    </a>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "shrink-0 text-[10px]",
                      urlItem.status === "fetched"
                        ? "border-[hsl(var(--success))]/30 text-[hsl(var(--success))]"
                        : urlItem.status === "pending"
                          ? "border-[hsl(var(--warning))]/30 text-[hsl(var(--warning))]"
                          : "border-destructive/30 text-destructive"
                    )}
                  >
                    {urlItem.status === "fetched" && (
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                    )}
                    {urlItem.status === "pending" && (
                      <Clock className="mr-1 h-3 w-3" />
                    )}
                    {urlItem.status === "failed" && (
                      <AlertCircle className="mr-1 h-3 w-3" />
                    )}
                    {urlItem.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {urlItem.summary}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
