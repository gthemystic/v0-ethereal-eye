"use client"

import {
  FileText,
  MessageSquare,
  Eye,
  Globe,
  Upload,
  Search,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/stats-card"
import { statsData, recentActivity } from "@/lib/mock-data"

interface DashboardViewProps {
  onNavigate: (view: string) => void
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor your document intelligence pipeline
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => onNavigate("documents")}
            className="h-10 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate("queries")}
            className="h-10 gap-2"
          >
            <Search className="h-4 w-4" />
            New Query
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatsCard
          title="Documents Processed"
          value={statsData.documentsProcessed}
          change={statsData.documentsChange}
          icon={<FileText className="h-4 w-4" />}
          index={0}
        />
        <StatsCard
          title="Queries Today"
          value={statsData.queriesToday}
          change={statsData.queriesChange}
          icon={<MessageSquare className="h-4 w-4" />}
          index={1}
        />
        <StatsCard
          title="Vision Analyses"
          value={statsData.visionAnalyses}
          change={statsData.visionChange}
          icon={<Eye className="h-4 w-4" />}
          index={2}
        />
        <StatsCard
          title="URLs Enriched"
          value={statsData.urlsEnriched}
          change={statsData.urlsChange}
          icon={<Globe className="h-4 w-4" />}
          index={3}
        />
      </div>

      {/* Recent Activity + Quick Links */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="animate-fade-in rounded-xl border bg-card lg:col-span-2" style={{ animationDelay: "400ms", animationFillMode: "both" }}>
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              Recent Activity
            </h2>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
              View all
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <div className="divide-y">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-secondary/50"
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    item.status === "completed"
                      ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
                      : "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]"
                  )}
                >
                  {item.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-foreground">
                    {item.action}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.target}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px]",
                      item.status === "completed"
                        ? "border-[hsl(var(--success))]/30 text-[hsl(var(--success))]"
                        : "border-[hsl(var(--warning))]/30 text-[hsl(var(--warning))]"
                    )}
                  >
                    {item.status}
                  </Badge>
                  <span className="hidden text-xs text-muted-foreground sm:block">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="animate-fade-in flex flex-col gap-4" style={{ animationDelay: "500ms", animationFillMode: "both" }}>
          {/* Pipeline Status */}
          <div className="rounded-xl border bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground">
              Pipeline Status
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {[
                { label: "Text Extraction", status: "operational" },
                { label: "Vision Analysis (GLM-4V)", status: "operational" },
                { label: "URL Enrichment", status: "operational" },
                { label: "Vector Store", status: "operational" },
              ].map((service) => (
                <div
                  key={service.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-muted-foreground">
                    {service.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[hsl(var(--success))]" />
                    <span className="text-xs font-medium text-[hsl(var(--success))]">
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RAG Comparison CTA */}
          <button
            onClick={() => onNavigate("analytics")}
            className="group rounded-xl border border-primary/20 bg-primary/5 p-5 text-left transition-all hover:border-primary/40 hover:bg-primary/10"
          >
            <h2 className="text-sm font-semibold text-foreground">
              Agentic RAG vs Standard RAG
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              See how vision analysis and URL enrichment improve answer quality
              by up to 3x compared to standard retrieval.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
              View comparison
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
