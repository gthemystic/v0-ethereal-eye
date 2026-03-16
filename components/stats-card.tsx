"use client"

import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change: string
  icon: React.ReactNode
  index?: number
}

export function StatsCard({ title, value, change, icon, index = 0 }: StatsCardProps) {
  const isPositive = change.startsWith("+")

  return (
    <div
      className="animate-fade-in rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <p className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        <span
          className={cn(
            "mb-1 text-xs font-semibold",
            isPositive ? "text-[hsl(var(--success))]" : "text-[hsl(var(--destructive))]"
          )}
        >
          {change}
        </span>
      </div>
    </div>
  )
}
