"use client"

import { useState } from "react"
import {
  Key,
  Globe,
  Database,
  Shield,
  Bell,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const apiKeys = [
  {
    name: "Production API Key",
    key: "ee_live_sk_a3f8...x9d2",
    created: "Jan 15, 2026",
    lastUsed: "2 hours ago",
    active: true,
  },
  {
    name: "Development API Key",
    key: "ee_test_sk_7b1c...m4e6",
    created: "Feb 1, 2026",
    lastUsed: "Yesterday",
    active: true,
  },
]

export function SettingsView() {
  const [showKeys, setShowKeys] = useState(false)
  const [notifications, setNotifications] = useState({
    processingComplete: true,
    queryAlerts: false,
    weeklyDigest: true,
    pipelineErrors: true,
  })

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, API keys, and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* API Keys */}
        <div
          className="animate-fade-in rounded-xl border bg-card"
          style={{ animationDelay: "100ms", animationFillMode: "both" }}
        >
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">
                API Keys
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowKeys(!showKeys)}
              className="h-7 gap-1.5 text-xs text-muted-foreground"
            >
              {showKeys ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
              {showKeys ? "Hide" : "Show"}
            </Button>
          </div>
          <div className="divide-y">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.name} className="px-5 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {apiKey.name}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <code className="font-mono text-xs text-muted-foreground">
                        {showKeys ? apiKey.key : "ee_****...****"}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                        aria-label="Copy API key"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-success/30 text-success text-[10px]"
                  >
                    Active
                  </Badge>
                </div>
                <div className="mt-2 flex gap-4 text-[10px] text-muted-foreground">
                  <span>Created: {apiKey.created}</span>
                  <span>Last used: {apiKey.lastUsed}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t px-5 py-3">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <RefreshCw className="h-3.5 w-3.5" />
              Generate New Key
            </Button>
          </div>
        </div>

        {/* Pipeline Configuration */}
        <div
          className="animate-fade-in rounded-xl border bg-card"
          style={{ animationDelay: "200ms", animationFillMode: "both" }}
        >
          <div className="flex items-center gap-2 border-b px-5 py-4">
            <Database className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">
              Pipeline Configuration
            </h2>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">
                Vector Store Endpoint
              </Label>
              <Input
                defaultValue="https://vectors.etherealeye.io"
                className="h-9 bg-background font-mono text-xs"
                style={{ fontSize: "16px" }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">
                n8n Webhook URL
              </Label>
              <Input
                defaultValue="https://n8n.example.com/webhook/rag-pipeline"
                className="h-9 bg-background font-mono text-xs"
                style={{ fontSize: "16px" }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">
                Vision Model
              </Label>
              <Input
                defaultValue="glm-4v-flash"
                className="h-9 bg-background font-mono text-xs"
                style={{ fontSize: "16px" }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">
                Embedding Model
              </Label>
              <Input
                defaultValue="text-embedding-3-large"
                className="h-9 bg-background font-mono text-xs"
                style={{ fontSize: "16px" }}
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div
          className="animate-fade-in rounded-xl border bg-card"
          style={{ animationDelay: "300ms", animationFillMode: "both" }}
        >
          <div className="flex items-center gap-2 border-b px-5 py-4">
            <Bell className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">
              Notifications
            </h2>
          </div>
          <div className="flex flex-col divide-y">
            {[
              {
                key: "processingComplete" as const,
                label: "Processing Complete",
                desc: "Notify when document processing finishes",
              },
              {
                key: "queryAlerts" as const,
                label: "Query Alerts",
                desc: "Alert on low-confidence query results",
              },
              {
                key: "weeklyDigest" as const,
                label: "Weekly Digest",
                desc: "Summary of usage and processing stats",
              },
              {
                key: "pipelineErrors" as const,
                label: "Pipeline Errors",
                desc: "Alert when pipeline encounters errors",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={notifications[item.key]}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: checked,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div
          className="animate-fade-in rounded-xl border bg-card"
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          <div className="flex items-center gap-2 border-b px-5 py-4">
            <Shield className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">
              Security
            </h2>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Two-factor Authentication
                </p>
                <p className="text-xs text-muted-foreground">
                  Add extra security to your account
                </p>
              </div>
              <Badge variant="outline" className="text-[10px]">
                Not configured
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Session Timeout
                </p>
                <p className="text-xs text-muted-foreground">
                  Auto-logout after inactivity
                </p>
              </div>
              <span className="text-xs font-medium text-foreground">
                30 minutes
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  IP Allowlist
                </p>
                <p className="text-xs text-muted-foreground">
                  Restrict API access by IP
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-success/30 text-success text-[10px]"
              >
                Enabled
              </Badge>
            </div>
            <Button variant="outline" className="mt-2 h-9 text-xs">
              Manage Security Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
