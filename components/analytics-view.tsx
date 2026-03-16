"use client"

import {
  Check,
  X,
  Eye,
  Globe,
  FileText,
  Brain,
  Zap,
  ArrowRight,
  BarChart3,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const comparisonFeatures = [
  {
    label: "Text Extraction",
    standard: true,
    agentic: true,
    description: "Basic text content extraction from documents",
  },
  {
    label: "Chunk-based Retrieval",
    standard: true,
    agentic: true,
    description: "Vector similarity search on text chunks",
  },
  {
    label: "Vision / Image Analysis",
    standard: false,
    agentic: true,
    description: "AI-powered analysis of diagrams, charts, and images",
  },
  {
    label: "URL Enrichment",
    standard: false,
    agentic: true,
    description: "Automatic fetching and indexing of referenced URLs",
  },
  {
    label: "Table Extraction",
    standard: false,
    agentic: true,
    description: "Structured extraction of tabular data",
  },
  {
    label: "Citation Sources",
    standard: false,
    agentic: true,
    description: "Inline page, diagram, and external source citations",
  },
  {
    label: "Multi-agent Reasoning",
    standard: false,
    agentic: true,
    description: "Multiple specialized agents collaborating on complex queries",
  },
  {
    label: "Confidence Scoring",
    standard: false,
    agentic: true,
    description: "Calibrated confidence scores for each response",
  },
]

const metrics = [
  {
    label: "Answer Accuracy",
    standard: "62%",
    agentic: "94%",
    improvement: "+52%",
  },
  {
    label: "Source Coverage",
    standard: "Text only",
    agentic: "Text + Images + URLs",
    improvement: "3x",
  },
  {
    label: "Citation Quality",
    standard: "None",
    agentic: "Page-level + Diagrams",
    improvement: "N/A",
  },
  {
    label: "Response Completeness",
    standard: "Basic",
    agentic: "Comprehensive",
    improvement: "+87%",
  },
]

export function AnalyticsView() {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl text-balance">
          Analytics & Comparison
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          See how Agentic RAG outperforms standard retrieval approaches
        </p>
      </div>

      {/* Performance Metrics */}
      <div
        className="animate-fade-in grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
        style={{ animationDelay: "100ms", animationFillMode: "both" }}
      >
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className="rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <p className="text-xs font-medium text-muted-foreground">
              {metric.label}
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground lg:text-xl">
                {metric.agentic}
              </span>
              {metric.improvement !== "N/A" && (
                <Badge className="bg-success/10 text-success text-[10px] hover:bg-success/10">
                  <TrendingUp className="mr-0.5 h-3 w-3" />
                  {metric.improvement}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              vs. Standard: {metric.standard}
            </p>
          </div>
        ))}
      </div>

      {/* Side-by-Side Comparison */}
      <div
        className="animate-fade-in"
        style={{ animationDelay: "200ms", animationFillMode: "both" }}
      >
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          Feature Comparison
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Standard RAG Card */}
          <div className="rounded-xl border border-secondary bg-card">
            <div className="flex items-center gap-3 border-b px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Standard RAG
                </h3>
                <p className="text-xs text-muted-foreground">
                  Basic text retrieval only
                </p>
              </div>
            </div>
            <div className="p-5">
              {/* Example response */}
              <div className="rounded-lg border bg-secondary/50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Example Response
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {'"'}The primary support beam has load specifications as described
                  in the document. Please refer to the relevant sections for
                  more details.{'"'}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-destructive/30 text-destructive text-[10px]"
                  >
                    No citations
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-destructive/30 text-destructive text-[10px]"
                  >
                    No confidence score
                  </Badge>
                </div>
              </div>

              {/* Feature list */}
              <div className="mt-4 flex flex-col gap-2.5">
                {comparisonFeatures.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2.5"
                  >
                    {feature.standard ? (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10">
                        <Check className="h-3 w-3 text-success" />
                      </div>
                    ) : (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/10">
                        <X className="h-3 w-3 text-destructive" />
                      </div>
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.standard
                          ? "text-foreground"
                          : "text-muted-foreground line-through"
                      )}
                    >
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agentic RAG Card */}
          <div className="rounded-xl border border-primary/30 bg-card shadow-lg shadow-primary/5">
            <div className="flex items-center gap-3 border-b border-primary/20 px-5 py-4">
              <div className="animate-pulse-glow flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    Agentic RAG
                  </h3>
                  <Badge className="bg-primary/10 text-primary text-[10px] hover:bg-primary/10">
                    <Zap className="mr-0.5 h-3 w-3" />
                    EtherealEye
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Vision + URLs + Multi-agent analysis
                </p>
              </div>
            </div>
            <div className="p-5">
              {/* Example response */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  Example Response
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {'"'}The primary support beam (W36x194) is rated for{" "}
                  <span className="font-semibold text-primary">
                    50 kN/m distributed load
                  </span>{" "}
                  with a maximum deflection of L/360. Analysis per HL-93 loading
                  shows D/C ratio of 0.87.{'"'}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 text-primary text-[10px]"
                  >
                    <FileText className="mr-1 h-3 w-3" />
                    Page 23
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 text-primary text-[10px]"
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    Diagram 4.2
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 text-primary text-[10px]"
                  >
                    <Globe className="mr-1 h-3 w-3" />
                    ASTM A992
                  </Badge>
                  <Badge className="bg-success/10 text-success text-[10px] hover:bg-success/10">
                    94% confidence
                  </Badge>
                </div>
              </div>

              {/* Feature list */}
              <div className="mt-4 flex flex-col gap-2.5">
                {comparisonFeatures.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2.5"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10">
                      <Check className="h-3 w-3 text-success" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground">
                        {feature.label}
                      </span>
                      {!feature.standard && (
                        <span className="text-[10px] text-primary">
                          Agentic exclusive
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div
        className="animate-fade-in"
        style={{ animationDelay: "300ms", animationFillMode: "both" }}
      >
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          How Agentic RAG Works
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "01",
              title: "Document Ingestion",
              desc: "Upload PDF, DOCX, or images. The system extracts text, tables, and identifies embedded images.",
              icon: FileText,
            },
            {
              step: "02",
              title: "Vision Analysis",
              desc: "GLM-4V multimodal model analyzes every diagram, chart, and figure with detailed descriptions.",
              icon: Eye,
            },
            {
              step: "03",
              title: "URL Enrichment",
              desc: "Referenced URLs are fetched, parsed, and indexed alongside the document content.",
              icon: Globe,
            },
            {
              step: "04",
              title: "Agentic Query",
              desc: "Multiple specialized agents collaborate to find the most accurate answer with citations.",
              icon: Brain,
            },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="group relative rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="font-mono text-xs font-bold text-primary/40">
                  {item.step}
                </span>
                <div className="mt-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                {i < 3 && (
                  <ArrowRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground/30 lg:block" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
