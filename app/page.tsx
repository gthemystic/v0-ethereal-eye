"use client"

import { useState } from "react"
import { AppShell, type ViewId } from "@/components/app-shell"
import { DashboardView } from "@/components/dashboard-view"
import { DocumentsView } from "@/components/documents-view"
import { DocumentDetailView } from "@/components/document-detail-view"
import { QueryChatView } from "@/components/query-chat-view"
import { AnalyticsView } from "@/components/analytics-view"
import { SettingsView } from "@/components/settings-view"
import type { Document } from "@/lib/mock-data"

export default function Page() {
  const [activeView, setActiveView] = useState<ViewId>("dashboard")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

  const handleNavigate = (view: string) => {
    setActiveView(view as ViewId)
    if (view !== "documents") {
      setSelectedDocument(null)
    }
  }

  const handleSelectDocument = (doc: Document) => {
    setSelectedDocument(doc)
  }

  const handleBackToDocuments = () => {
    setSelectedDocument(null)
  }

  const renderView = () => {
    if (activeView === "documents" && selectedDocument) {
      return (
        <DocumentDetailView
          document={selectedDocument}
          onBack={handleBackToDocuments}
        />
      )
    }

    switch (activeView) {
      case "dashboard":
        return <DashboardView onNavigate={handleNavigate} />
      case "documents":
        return <DocumentsView onSelectDocument={handleSelectDocument} />
      case "queries":
        return <QueryChatView />
      case "analytics":
        return <AnalyticsView />
      case "settings":
        return <SettingsView />
      default:
        return <DashboardView onNavigate={handleNavigate} />
    }
  }

  return (
    <AppShell activeView={activeView} onNavigate={handleNavigate}>
      {renderView()}
    </AppShell>
  )
}
