export interface Document {
  id: string
  name: string
  pages: number
  images: number
  urls: number
  fileSize: string
  processedAt: string
  status: "processing" | "completed" | "failed"
  summary?: string
  entities?: string[]
}

export interface QueryMessage {
  id: string
  role: "user" | "assistant"
  content: string
  citations?: Citation[]
  confidence?: number
  timestamp: string
}

export interface Citation {
  type: "page" | "diagram" | "external"
  value: string
  preview: string
  url?: string
}

export interface ImageAnalysis {
  id: string
  src: string
  description: string
  pageNumber: number
}

export interface UrlEnrichment {
  id: string
  url: string
  title: string
  summary: string
  status: "fetched" | "failed" | "pending"
}

export const mockDocuments: Document[] = [
  {
    id: "doc-1",
    name: "ASTM_A992_Structural_Steel_Spec.pdf",
    pages: 47,
    images: 12,
    urls: 8,
    fileSize: "14.2 MB",
    processedAt: "2026-02-13T14:30:00Z",
    status: "completed",
    summary:
      "Comprehensive specification for structural steel shapes used in building construction. Covers chemical composition requirements, tensile properties, testing methods, and permissible variations. Includes detailed tables for minimum yield and tensile strength values across different shape groups.",
    entities: [
      "ASTM A992",
      "Yield Strength: 50 ksi",
      "Tensile Strength: 65 ksi",
      "Carbon: 0.23% max",
      "W-shapes",
      "Hot-rolled",
    ],
  },
  {
    id: "doc-2",
    name: "Bridge_Load_Analysis_Report_Q4.pdf",
    pages: 128,
    images: 34,
    urls: 15,
    fileSize: "42.7 MB",
    processedAt: "2026-02-13T11:15:00Z",
    status: "completed",
    summary:
      "Quarterly load analysis for the Highway 101 overpass bridge rehabilitation project. Contains finite element analysis results, load distribution factors, and fatigue assessments for all primary structural members.",
    entities: [
      "Highway 101 Overpass",
      "HL-93 Loading",
      "Fatigue Category B",
      "Span: 45m",
    ],
  },
  {
    id: "doc-3",
    name: "Concrete_Mix_Design_Specifications.docx",
    pages: 23,
    images: 6,
    urls: 4,
    fileSize: "3.8 MB",
    processedAt: "2026-02-13T09:45:00Z",
    status: "completed",
    summary:
      "Mix design specifications for high-performance concrete used in marine environments. Details water-cement ratios, admixture proportions, and curing requirements for Class S concrete.",
    entities: [
      "Class S Concrete",
      "W/C Ratio: 0.40",
      "f'c = 5000 psi",
      "28-day cure",
    ],
  },
  {
    id: "doc-4",
    name: "Seismic_Retrofit_Guidelines_v3.pdf",
    pages: 89,
    images: 28,
    urls: 12,
    fileSize: "28.1 MB",
    processedAt: "2026-02-12T16:20:00Z",
    status: "completed",
    summary:
      "Updated seismic retrofit guidelines for pre-1975 reinforced concrete buildings. Covers fiber-reinforced polymer (FRP) wrapping procedures, steel jacketing alternatives, and performance-based assessment methods.",
    entities: [
      "Zone 4 Seismic",
      "FRP Wrapping",
      "ASCE 41-17",
      "Life Safety Performance",
    ],
  },
  {
    id: "doc-5",
    name: "Environmental_Impact_Assessment_Draft.pdf",
    pages: 156,
    images: 42,
    urls: 23,
    fileSize: "67.3 MB",
    processedAt: "2026-02-12T08:00:00Z",
    status: "processing",
    summary: undefined,
    entities: undefined,
  },
]

export const mockQueries: QueryMessage[] = [
  {
    id: "q1",
    role: "user",
    content:
      "What are the load specifications for the primary support beam?",
    timestamp: "2026-02-13T14:35:00Z",
  },
  {
    id: "q2",
    role: "assistant",
    content:
      "Based on the Bridge Load Analysis Report Q4, the primary support beam (W36x194 section) is rated for **50 kN/m distributed load** with a maximum deflection limit of **L/360** under service conditions.\n\nThe beam was analyzed under HL-93 loading per AASHTO LRFD specifications. Key findings include:\n\n- **Maximum moment**: 2,847 kN-m at midspan\n- **Maximum shear**: 423 kN at supports\n- **Deflection under live load**: 12.3mm (limit: 125mm = L/360)\n- **Demand/Capacity ratio**: 0.87 (adequate)\n\nThe analysis also considered dynamic amplification factor of 1.33 for vehicular impact loading. All primary support beams meet the minimum requirements per ASTM A992 Grade 50 steel with Fy = 345 MPa.",
    citations: [
      {
        type: "page",
        value: "23",
        preview:
          "Section 4.2: Primary beam load specifications and design values for the main span.",
      },
      {
        type: "diagram",
        value: "4.2",
        preview:
          "Beam cross-section detail showing W36x194 with stiffener plates at bearing locations.",
      },
      {
        type: "external",
        value: "ASTM A992",
        preview:
          "Standard specification for structural steel shapes used in building construction.",
        url: "https://www.astm.org/a0992_a0992m-11.html",
      },
    ],
    confidence: 0.94,
    timestamp: "2026-02-13T14:35:05Z",
  },
  {
    id: "q3",
    role: "user",
    content:
      "What is the recommended concrete mix for the bridge deck overlay?",
    timestamp: "2026-02-13T14:40:00Z",
  },
  {
    id: "q4",
    role: "assistant",
    content:
      "The recommended concrete mix for the bridge deck overlay is **Class S high-performance concrete** per the Concrete Mix Design Specifications document. Here are the key parameters:\n\n- **Compressive strength**: f'c = 5,000 psi (34.5 MPa) at 28 days\n- **Water-cement ratio**: 0.40 maximum\n- **Slump**: 4-6 inches (100-150mm)\n- **Air content**: 6.0% +/- 1.5% for freeze-thaw resistance\n- **Cement type**: Type I/II Portland cement, 658 lb/yd3\n\nThe mix includes silica fume at 7% cement replacement for reduced permeability in the marine environment exposure conditions.",
    citations: [
      {
        type: "page",
        value: "8",
        preview:
          "Table 3.1: Mix design proportions for Class S concrete bridge deck overlay applications.",
      },
      {
        type: "page",
        value: "12",
        preview:
          "Section 5.1: Curing requirements - minimum 14-day wet cure for bridge deck overlays.",
      },
    ],
    confidence: 0.91,
    timestamp: "2026-02-13T14:40:04Z",
  },
]

export const mockSavedQueries = [
  "Load specs for primary beam",
  "Seismic retrofit requirements",
  "Concrete mix design for deck",
  "Steel grade requirements",
  "Environmental constraints",
]

export const mockImageAnalyses: ImageAnalysis[] = [
  {
    id: "img-1",
    src: "/placeholder-diagram-1.svg",
    description:
      "Cross-sectional diagram of W36x194 steel beam with dimensions. Shows flange width of 303mm, web thickness of 14.7mm, and overall depth of 927mm. Stiffener plates are indicated at bearing locations with 25mm thickness.",
    pageNumber: 23,
  },
  {
    id: "img-2",
    src: "/placeholder-diagram-2.svg",
    description:
      "Finite element mesh visualization of the bridge deck showing stress distribution under HL-93 loading. Red zones indicate maximum stress concentration at midspan, transitioning to blue at supports. Maximum Von Mises stress: 248 MPa.",
    pageNumber: 31,
  },
  {
    id: "img-3",
    src: "/placeholder-diagram-3.svg",
    description:
      "Load-deflection curve for the primary support beam. Linear elastic region up to 35 kN/m with plastic hinge formation beginning at 48 kN/m. Ultimate capacity reached at 52.3 kN/m with 67mm deflection.",
    pageNumber: 35,
  },
  {
    id: "img-4",
    src: "/placeholder-diagram-4.svg",
    description:
      "Plan view of bridge showing sensor placement locations for structural health monitoring. 24 strain gauges, 8 accelerometers, and 4 displacement transducers are indicated across the three-span structure.",
    pageNumber: 42,
  },
]

export const mockUrlEnrichments: UrlEnrichment[] = [
  {
    id: "url-1",
    url: "https://www.astm.org/a0992_a0992m-11.html",
    title: "ASTM A992/A992M - Standard Specification for Structural Steel Shapes",
    summary:
      "Covers structural steel shapes for building framing. Specifies Fy = 50 ksi minimum yield, Fu = 65 ksi minimum tensile. Applies to W, S, M, HP, and structural tee shapes. Supplement to ASTM A6/A6M general requirements.",
    status: "fetched",
  },
  {
    id: "url-2",
    url: "https://www.aisc.org/publications/steel-construction-manual",
    title: "AISC Steel Construction Manual, 16th Edition",
    summary:
      "Comprehensive reference for structural steel design including design tables, specifications, and connection details. Contains LRFD and ASD design provisions aligned with ANSI/AISC 360-22.",
    status: "fetched",
  },
  {
    id: "url-3",
    url: "https://www.fhwa.dot.gov/bridge/lrfd/",
    title: "FHWA LRFD Bridge Design Resources",
    summary:
      "Federal Highway Administration resources for AASHTO LRFD bridge design, including design examples, training materials, and policy guidance for highway bridge structures.",
    status: "fetched",
  },
  {
    id: "url-4",
    url: "https://www.concrete.org/store/productdetail.aspx?ItemID=31814",
    title: "ACI 318-14: Building Code Requirements for Structural Concrete",
    summary:
      "American Concrete Institute building code covering design and construction of structural concrete. Includes provisions for strength, serviceability, and durability requirements.",
    status: "pending",
  },
]

export const mockExtractedContent = `SECTION 4.2 — PRIMARY SUPPORT BEAM SPECIFICATIONS

4.2.1 General Requirements
The primary support beams shall conform to ASTM A992/A992M Grade 50 structural steel. All wide-flange shapes shall meet the minimum mechanical property requirements specified in Table 4.2.1.

Table 4.2.1 - Minimum Mechanical Properties
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Property                    | Value
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Yield Strength (Fy)         | 50 ksi (345 MPa)
Tensile Strength (Fu)       | 65 ksi (450 MPa)
Yield-to-Tensile Ratio      | ≤ 0.85
Elongation (8")             | 21% minimum
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4.2.2 Load Specifications
The primary support beam is designed for the following load conditions:

a) Dead Load:
   - Self-weight: 2.87 kN/m
   - Bridge deck: 12.5 kN/m
   - Wearing surface: 2.2 kN/m
   - Utilities and barriers: 3.8 kN/m

b) Live Load (HL-93):
   - Design truck: 325 kN (AASHTO)
   - Design lane: 9.3 kN/m
   - Dynamic amplification: 33%

c) Combined factored load:
   - Strength I: 1.25DC + 1.50DW + 1.75(LL+IM)
   - Maximum distributed: 50 kN/m

4.2.3 Deflection Limits
   - Live load deflection: L/800
   - Live load + impact: L/360
   - Maximum allowable: 125 mm at midspan

4.2.4 Connection Requirements
All beam-to-column connections shall be designed as fully restrained moment connections per AISC 358-16 Prequalified Connections. Bolted end-plate connections with ASTM A490 high-strength bolts are specified for all primary beam connections.`

export const statsData = {
  documentsProcessed: 247,
  queriesToday: 89,
  visionAnalyses: 1_432,
  urlsEnriched: 3_218,
  documentsChange: "+12%",
  queriesChange: "+23%",
  visionChange: "+8%",
  urlsChange: "+15%",
}

export const recentActivity = [
  {
    id: "act-1",
    action: "Document processed",
    target: "ASTM_A992_Structural_Steel_Spec.pdf",
    time: "14 min ago",
    status: "completed" as const,
  },
  {
    id: "act-2",
    action: "Query answered",
    target: "Load specifications for primary support beam",
    time: "18 min ago",
    status: "completed" as const,
  },
  {
    id: "act-3",
    action: "Vision analysis",
    target: "Bridge_Load_Analysis_Report_Q4.pdf (34 images)",
    time: "2 hours ago",
    status: "completed" as const,
  },
  {
    id: "act-4",
    action: "URL enrichment",
    target: "8 external references fetched",
    time: "2 hours ago",
    status: "completed" as const,
  },
  {
    id: "act-5",
    action: "Document processing",
    target: "Environmental_Impact_Assessment_Draft.pdf",
    time: "6 hours ago",
    status: "processing" as const,
  },
  {
    id: "act-6",
    action: "Document processed",
    target: "Seismic_Retrofit_Guidelines_v3.pdf",
    time: "Yesterday",
    status: "completed" as const,
  },
]
