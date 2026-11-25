export type FigureType = "3.1" | "3.2" | "4.1" | "4.2" | "4.3" | "plot" | "diagram";

/**
 * Robustly detects which figure (3.1, 3.2, 4.1, 4.2, 4.3) is being requested
 * based on caption numbering, placeholder text, and semantic keywords.
 */
export function determineFigureType(caption: string, placeholder?: string): FigureType {
  const combined = `${caption || ""} ${placeholder || ""}`.toLowerCase();

  // Explicit numbering match
  if (/\b3\.1\b/.test(combined)) return "3.1";
  if (/\b3\.2\b/.test(combined)) return "3.2";
  if (/\b4\.1\b/.test(combined)) return "4.1";
  if (/\b4\.2\b/.test(combined)) return "4.2";
  if (/\b4\.3\b/.test(combined)) return "4.3";

  // Semantic keyword heuristics
  if (
    combined.includes("flowchart") ||
    combined.includes("pipeline") ||
    combined.includes("process workflow") ||
    combined.includes("decision logic")
  ) {
    return "3.2";
  }
  if (
    combined.includes("implementation") ||
    combined.includes("toolchain") ||
    combined.includes("integration schematic") ||
    combined.includes("component integration")
  ) {
    return "4.1";
  }
  if (
    combined.includes("latency") ||
    combined.includes("throughput") ||
    combined.includes("load") ||
    combined.includes("stress")
  ) {
    return "4.3";
  }
  if (
    combined.includes("benchmark") ||
    combined.includes("experimental") ||
    combined.includes("accuracy") ||
    combined.includes("loss curve") ||
    combined.includes("roc")
  ) {
    return "4.2";
  }
  if (
    combined.includes("architecture") ||
    combined.includes("modular block") ||
    combined.includes("system diagram")
  ) {
    return "3.1";
  }

  if (combined.includes("plot") || combined.includes("curve") || combined.includes("graph")) {
    return "plot";
  }

  return "3.1";
}

/**
 * Escapes special XML characters for SVG text.
 */
export function escapeXml(unsafe: string): string {
  return (unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Domain categorization based on user project title
 */
export function detectDomain(title: string): string {
  const t = (title || "").toLowerCase();
  if (
    t.includes("skin") ||
    t.includes("cancer") ||
    t.includes("plant") ||
    t.includes("leaf") ||
    t.includes("vision") ||
    t.includes("image") ||
    t.includes("yolo") ||
    t.includes("cnn") ||
    t.includes("retina") ||
    t.includes("mri")
  ) {
    return "computer_vision";
  }
  if (
    t.includes("nlp") ||
    t.includes("text") ||
    t.includes("chat") ||
    t.includes("bert") ||
    t.includes("gpt") ||
    t.includes("llm") ||
    t.includes("sentiment") ||
    t.includes("language")
  ) {
    return "nlp_ai";
  }
  if (
    t.includes("iot") ||
    t.includes("sensor") ||
    t.includes("smart") ||
    t.includes("arduino") ||
    t.includes("esp32") ||
    t.includes("embedded") ||
    t.includes("wearable") ||
    t.includes("agriculture") ||
    t.includes("irrigation")
  ) {
    return "iot_embedded";
  }
  if (
    t.includes("blockchain") ||
    t.includes("crypto") ||
    t.includes("voting") ||
    t.includes("smart contract") ||
    t.includes("ethereum") ||
    t.includes("decentralized")
  ) {
    return "blockchain";
  }
  if (
    t.includes("security") ||
    t.includes("cyber") ||
    t.includes("intrusion") ||
    t.includes("malware") ||
    t.includes("phishing") ||
    t.includes("firewall") ||
    t.includes("attack")
  ) {
    return "cybersecurity";
  }
  if (
    t.includes("robot") ||
    t.includes("drone") ||
    t.includes("autonomous") ||
    t.includes("vehicle") ||
    t.includes("slam") ||
    t.includes("navigation")
  ) {
    return "robotics";
  }
  if (
    t.includes("health") ||
    t.includes("medical") ||
    t.includes("patient") ||
    t.includes("hospital") ||
    t.includes("ecg") ||
    t.includes("heart") ||
    t.includes("diagnostic")
  ) {
    return "healthcare";
  }
  if (
    t.includes("deep learning") ||
    t.includes("machine learning") ||
    t.includes("neural") ||
    t.includes("ai") ||
    t.includes("classification")
  ) {
    return "machine_learning";
  }
  return "general_engineering";
}

/**
 * Deterministic hash from project title to vary styles across different reports
 */
export function getProjectSeed(title: string): number {
  let hash = 0;
  const str = (title || "Capstone Project").toLowerCase().trim();
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export interface ColorTheme {
  name: string;
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  border: string;
  cards: [string, string, string][]; // [bg, border, headerBg]
  busBg: string;
  busBorder: string;
  busText: string;
  evalBg: string;
  evalBorder: string;
  evalText: string;
  arrow: string;
  arrowAlt: string;
  chartLine: string;
  chartLineAlt: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  // 0: Cobalt & Sapphire (Tech/AI)
  {
    name: "Cobalt Sapphire",
    primary: "#1D4ED8",
    primaryDark: "#1E3A8A",
    secondary: "#0284C7",
    accent: "#D97706",
    border: "#2563EB",
    cards: [
      ["#EFF6FF", "#1E40AF", "#DBEAFE"],
      ["#F0FDF4", "#166534", "#DCFCE7"],
      ["#FAF5FF", "#6B21A8", "#F3E8FF"],
      ["#FFF7ED", "#C2410C", "#FFEDD5"],
      ["#F8FAFC", "#334155", "#E2E8F0"],
    ],
    busBg: "#F8FAFC",
    busBorder: "#64748B",
    busText: "#1E293B",
    evalBg: "#FAF5FF",
    evalBorder: "#9333EA",
    evalText: "#581C87",
    arrow: "#2563EB",
    arrowAlt: "#DC2626",
    chartLine: "#1D4ED8",
    chartLineAlt: "#DC2626",
  },
  // 1: Forest Emerald & Teal (Bio/Environmental/IoT)
  {
    name: "Emerald Forest",
    primary: "#059669",
    primaryDark: "#064E3B",
    secondary: "#0D9488",
    accent: "#D97706",
    border: "#10B981",
    cards: [
      ["#ECFDF5", "#047857", "#D1FAE5"],
      ["#F0FDFA", "#0F766E", "#CCFBF1"],
      ["#EFF6FF", "#2563EB", "#DBEAFE"],
      ["#FEF3C7", "#D97706", "#FDE68A"],
      ["#F9FAFB", "#4B5563", "#E5E7EB"],
    ],
    busBg: "#F0FDF4",
    busBorder: "#059669",
    busText: "#064E3B",
    evalBg: "#ECFDF5",
    evalBorder: "#047857",
    evalText: "#065F46",
    arrow: "#059669",
    arrowAlt: "#B45309",
    chartLine: "#059669",
    chartLineAlt: "#B45309",
  },
  // 2: Royal Indigo & Deep Violet (Computing/Data)
  {
    name: "Royal Indigo",
    primary: "#6D28D9",
    primaryDark: "#4C1D95",
    secondary: "#4F46E5",
    accent: "#0891B2",
    border: "#8B5CF6",
    cards: [
      ["#EEF2FF", "#4338CA", "#E0E7FF"],
      ["#F5F3FF", "#6D28D9", "#EDE9FE"],
      ["#ECFEFF", "#0E7490", "#CFFAFE"],
      ["#FFF1F2", "#E11D48", "#FFE4E6"],
      ["#F8FAFC", "#334155", "#E2E8F0"],
    ],
    busBg: "#F5F3FF",
    busBorder: "#7C3AED",
    busText: "#4C1D95",
    evalBg: "#EEF2FF",
    evalBorder: "#4F46E5",
    evalText: "#312E81",
    arrow: "#6D28D9",
    arrowAlt: "#E11D48",
    chartLine: "#6D28D9",
    chartLineAlt: "#E11D48",
  },
  // 3: Warm Crimson & Copper Bronze (Security/Hardware/Robotics)
  {
    name: "Crimson Copper",
    primary: "#BE123C",
    primaryDark: "#881337",
    secondary: "#C2410C",
    accent: "#1D4ED8",
    border: "#E11D48",
    cards: [
      ["#FFF1F2", "#BE123C", "#FFE4E6"],
      ["#FFF7ED", "#C2410C", "#FFEDD5"],
      ["#FEF3C7", "#B45309", "#FDE68A"],
      ["#EFF6FF", "#1D4ED8", "#DBEAFE"],
      ["#F8FAFC", "#475569", "#E2E8F0"],
    ],
    busBg: "#FFF7ED",
    busBorder: "#EA580C",
    busText: "#7C2D12",
    evalBg: "#FFF1F2",
    evalBorder: "#BE123C",
    evalText: "#881337",
    arrow: "#C2410C",
    arrowAlt: "#1D4ED8",
    chartLine: "#BE123C",
    chartLineAlt: "#1D4ED8",
  },
  // 4: Steel Slate & Ocean Cyan (Enterprise/Cloud)
  {
    name: "Steel Cyan",
    primary: "#0284C7",
    primaryDark: "#0F172A",
    secondary: "#0D9488",
    accent: "#7C3AED",
    border: "#0284C7",
    cards: [
      ["#F0F9FF", "#0284C7", "#E0F2FE"],
      ["#F8FAFC", "#334155", "#E2E8F0"],
      ["#F0FDFA", "#0D9488", "#CCFBF1"],
      ["#FAF5FF", "#7C3AED", "#F3E8FF"],
      ["#FFFBEB", "#D97706", "#FEF3C7"],
    ],
    busBg: "#F8FAFC",
    busBorder: "#475569",
    busText: "#0F172A",
    evalBg: "#F0F9FF",
    evalBorder: "#0284C7",
    evalText: "#0C4A6E",
    arrow: "#0284C7",
    arrowAlt: "#DC2626",
    chartLine: "#0284C7",
    chartLineAlt: "#DC2626",
  },
];

export function getReportTheme(projectTitle: string): ColorTheme {
  const seed = getProjectSeed(projectTitle);
  return COLOR_THEMES[seed % COLOR_THEMES.length]!;
}

/**
 * Pure SVG generator for Figure 3.1: System Architecture Diagram
 * Dynamically styled with distinct color themes based on the report.
 */
export function generateFigure31Svg(projectTitle: string, caption?: string): string {
  const cleanTitle = (projectTitle || "Advanced Engineering Capstone System").trim();
  const domain = detectDomain(cleanTitle);
  const theme = getReportTheme(cleanTitle);

  let subsystems: [string, string[]][];
  let layerBus = "High-Speed CUDA / Tensor Acceleration & Data Bus";

  if (domain === "computer_vision" || domain === "machine_learning" || domain === "nlp_ai") {
    subsystems = [
      ["SENSORY & INPUT LAYER", ["High-Res Signal Stream", "Standard Benchmark Data", "Real-Time Image Buffers"]],
      ["PREPROCESSING TIER", ["Spatial Normalization", "Affine Transforms", "Feature Vector Encoding"]],
      ["DEEP COMPUTATIONAL CORE", ["CNN / Attention Backbone", "Feature Pyramid Blocks", "Softmax Classification"]],
      ["PERSISTENCE & REGISTRY", ["Trained Weights (.pt)", "Inference Telemetry DB", "Performance Metric Store"]],
      ["PRESENTATION & UI TIER", ["Diagnostic Heatmaps", "Analytical Summaries", "Secure Web Dashboard"]],
    ];
  } else if (domain === "iot_embedded" || domain === "healthcare") {
    subsystems = [
      ["SENSING & TRANSDUCTION", ["Biosensor Transducers", "Signal Conditioning", "Edge Buffer & Calibration"]],
      ["EDGE PROCESSING NODE", ["ESP32 / ARM Firmware", "Statistical Anomaly Filter", "Low-Power Duty Controller"]],
      ["COMMUNICATION GATEWAY", ["Encrypted MQTT / BLE", "JSON Payload Formatter", "Cellular / Wi-Fi Bridge"]],
      ["CLOUD DATABASE CORE", ["Time-Series Metric Store", "Automated Thresholds", "Historical Trend Analyzer"]],
      ["TELEMETRY & ALERT UI", ["Real-Time Sensor Dashboard", "SMS / Push Dispatch", "Remote Control Portal"]],
    ];
    layerBus = "Secure IEEE 802.11 / MQTT 5.0 Low-Latency Wireless Pipeline";
  } else if (domain === "blockchain" || domain === "cybersecurity") {
    subsystems = [
      ["CLIENT & IDENTITY", ["Cryptographic Wallet", "Biometric Authentication", "Zero-Knowledge Proofs"]],
      ["CONSENSUS & VERIFY", ["Smart Contract Engine", "Proof-of-Stake Consensus", "Double-Spend Prevention"]],
      ["IMMUTABLE LEDGER CORE", ["Distributed Block Ledger", "Merkle State Storage", "Cryptographic Hash Chain"]],
      ["OFF-CHAIN AUDIT STORE", ["IPFS Content Storage", "Tamper-Evident Logs", "Validator Key Vault"]],
      ["AUDIT & MONITOR PORTAL", ["Real-Time Event Monitor", "Cryptographic Receipts", "Governance Portal"]],
    ];
    layerBus = "Cryptographic Peer-to-Peer Protocol & RPC Interaction Layer";
  } else if (domain === "robotics") {
    subsystems = [
      ["SENSORY PERCEPTION", ["LiDAR & Stereo Cameras", "IMU & Odometry Sensors", "Ultrasonic Sensor Arrays"]],
      ["STATE ESTIMATION & SLAM", ["Extended Kalman Filter", "Occupancy Grid Mapping", "Point Cloud Filter"]],
      ["MOTION & PATH PLANNER", ["Global Path Planning", "Local Obstacle Avoid", "Kinematic Constraints"]],
      ["ACTUATOR CONTROL LAYER", ["PID Velocity Control", "PWM & Servo Drivers", "Emergency Braking Guard"]],
      ["TELEOPERATION & UI", ["ROS2 Telemetry Stream", "Waypoint Mission Planner", "Ground Station (GCS)"]],
    ];
    layerBus = "Real-Time Micro-ROS / DDS Publish-Subscribe Middleware";
  } else {
    subsystems = [
      ["DATA INGESTION LAYER", ["Client Interface Stream", "Parameter Stream Data", "Validation & Sanitizing"]],
      ["PREPROCESSING TIER", ["Data Transformation", "Feature Normalization", "Security Barrier Guards"]],
      ["CORE COMPUTATION ENGINE", ["Domain Processing Logic", "Optimization Algorithms", "Dynamic Resource Alloc"]],
      ["PERSISTENCE & CACHE", ["Relational & Vector Vault", "In-Memory Session Cache", "Audit Logging Database"]],
      ["PRESENTATION & UI", ["Responsive Analytics UI", "Export & Report Engine", "System Notification Logs"]],
    ];
    layerBus = "Secure RESTful & WebSocket Real-Time Communication Backbone";
  }

  const boxW = 178;
  const boxH = 175;
  const gap = 16;
  const startX = 20;
  const yPos = 55;

  const boxesSvg = subsystems
    .map(([name, items], i) => {
      const [bgC, borderC] = theme.cards[i % theme.cards.length]!;
      const x = startX + i * (boxW + gap);
      const itemsSvg = items
        .map(
          (it, idx) =>
            `<text x="${x + 10}" y="${yPos + 64 + idx * 26}" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155">• ${escapeXml(it.slice(0, 24))}</text>`,
        )
        .join("\n");

      let arrowSvg = "";
      if (i < subsystems.length - 1) {
        const ax = x + boxW;
        const ay = yPos + boxH / 2;
        arrowSvg = `
          <line x1="${ax}" y1="${ay}" x2="${ax + gap - 6}" y2="${ay}" stroke="${theme.arrow}" stroke-width="2.5" />
          <polygon points="${ax + gap - 6},${ay - 5} ${ax + gap},${ay} ${ax + gap - 6},${ay + 5}" fill="${theme.arrow}" />
        `;
      }

      const headerFontSize = name.length > 20 ? 8.5 : 9.5;

      return `
        <g id="subsystem_${i + 1}">
          <rect x="${x}" y="${yPos}" width="${boxW}" height="${boxH}" rx="6" fill="${bgC}" stroke="${borderC}" stroke-width="2" />
          <rect x="${x}" y="${yPos}" width="${boxW}" height="38" rx="6" fill="${borderC}" />
          <rect x="${x}" y="${yPos + 28}" width="${boxW}" height="10" fill="${borderC}" />
          <text x="${x + boxW / 2}" y="${yPos + 23}" font-family="'Times New Roman', serif" font-size="${headerFontSize}" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${escapeXml(name)}</text>
          ${itemsSvg}
          ${arrowSvg}
        </g>
      `;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="1000" height="560">
    <rect width="1000" height="560" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>
    ${boxesSvg}
    <rect x="22" y="270" width="946" height="70" rx="6" fill="${theme.busBg}" stroke="${theme.busBorder}" stroke-width="1.8" stroke-dasharray="6,4" />
    <text x="500" y="298" font-family="'Times New Roman', serif" font-size="13" font-weight="bold" fill="${theme.busText}" text-anchor="middle">SYSTEM COMMUNICATION &amp; SYNCHRONIZATION BUS: ${escapeXml(layerBus)}</text>
    <text x="500" y="322" font-family="'Times New Roman', serif" font-size="11" font-style="italic" fill="#475569" text-anchor="middle">Bi-directional telemetry, state synchronization, secure tokens, and fault-tolerant interrupt channels</text>
    <rect x="22" y="365" width="946" height="78" rx="6" fill="${theme.evalBg}" stroke="${theme.evalBorder}" stroke-width="1.8" />
    <text x="500" y="396" font-family="'Times New Roman', serif" font-size="13" font-weight="bold" fill="${theme.evalText}" text-anchor="middle">CONTINUOUS EVALUATION, ERROR COMPENSATION &amp; SAFETY BOUNDARY VERIFICATION</text>
    <text x="500" y="422" font-family="'Times New Roman', serif" font-size="11.5" fill="${theme.evalText}" text-anchor="middle">Automated self-diagnostics, boundary checks, exception logging, and telemetry persistence conforming to IEEE standards</text>
    <text x="500" y="500" font-family="'Times New Roman', serif" font-size="12" font-style="italic" fill="#475569" text-anchor="middle">IEEE Engineering Standard Architecture Schematic — Designed for: ${escapeXml(cleanTitle)}</text>
  </svg>`;
}

/**
 * Pure SVG generator for Figure 3.2: Operational Flowchart & Data Processing Pipeline
 * Supports 3 completely distinct flowchart structures and 5 color themes, varied by report!
 */
export function generateFigure32Svg(projectTitle: string, caption?: string): string {
  const cleanTitle = (projectTitle || "Advanced Engineering Capstone System").trim();
  const domain = detectDomain(cleanTitle);
  const theme = getReportTheme(cleanTitle);
  const seed = getProjectSeed(cleanTitle);
  const structureVariant = (seed >> 2) % 3; // 0: Linear + Exception Loop, 1: Dual-Row Serpentine, 2: Parallel Dual-Stream

  let s1: [string, string] = ["System Start & Ingestion", "Acquire initial sensor/data input"];
  let s2: [string, string] = ["Format & Quality Validation", "Check boundaries and format integrity"];
  let d1: [string, string, string] = ["Valid & Within Bounds?", "Pass", "Trigger Exception Log & Retry"];
  let s3: [string, string] = ["Core Processing & Extraction", "Transform features and compute state"];
  let d2: [string, string, string] = ["Confidence Threshold Met?", "Accept", "Ensemble Alternative Fallback"];
  let s4: [string, string] = ["Execute Target Action", "Produce inference / actuation command"];
  let s5: [string, string] = ["Database Persistence & Telemetry", "Log result and update dashboard"];

  if (domain === "computer_vision" || domain === "machine_learning" || domain === "nlp_ai") {
    s1 = ["System Start & Dataset Ingestion", "Load image / query data stream from source"];
    s2 = ["Data Validation & Noise Inspection", "Verify resolution, format, and aspect ratio"];
    d1 = ["Data Valid & Within Bounds?", "Pass", "Reject & Request Rescan"];
    s3 = ["Feature Extraction & Embedding", "Compute normalized feature maps & vectors"];
    d2 = ["Inference Confidence > 85%?", "Accept Class", "Trigger Ensemble / Fallback"];
    s4 = ["Diagnostic Classification", "Generate prediction logits and heatmaps"];
    s5 = ["Report Generation & UI Telemetry", "Publish results to clinician dashboard"];
  } else if (domain === "iot_embedded" || domain === "healthcare") {
    s1 = ["Sensor Initialization & Boot", "Power on transducers & calibrate ADC registers"];
    s2 = ["Acquire Raw Telemetry Samples", "Read temperature, pulse, or environmental pins"];
    d1 = ["Signal Noise < Threshold?", "Clean", "Filter & Recalibrate Sensor"];
    s3 = ["Moving Average / Kalman Filter", "Smooth readings & compute physical metric units"];
    d2 = ["Critical Alert Boundary Exceeded?", "Trigger Alarm", "Normal Log"];
    s4 = ["Dispatch Emergency Notification", "Send SMS / Push notification via gateway"];
    s5 = ["Cloud Database Sync & Sleep", "Publish MQTT packet and enter low-power sleep"];
  }

  // --- STRUCTURE VARIANT 1: Dual-Row Serpentine / S-Curve Flowchart ---
  if (structureVariant === 1) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="1000" height="560">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${theme.arrow}" />
        </marker>
        <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${theme.arrowAlt}" />
        </marker>
      </defs>
      <rect width="1000" height="560" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>

      <!-- ROW 1: Acquisition & Verification (Left to Right) -->
      <!-- 1. Start Pill -->
      <rect x="40" y="60" width="130" height="60" rx="30" fill="${theme.cards[0]![0]}" stroke="${theme.cards[0]![1]}" stroke-width="2"/>
      <text x="105" y="87" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="${theme.primaryDark}" text-anchor="middle">START</text>
      <text x="105" y="105" font-family="'Times New Roman', serif" font-size="9" fill="${theme.primary}" text-anchor="middle">${escapeXml(s1[0].slice(0, 18))}</text>
      <line x1="170" y1="90" x2="215" y2="90" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>

      <!-- 2. Step 1 (Ingestion) -->
      <rect x="220" y="55" width="180" height="70" rx="5" fill="${theme.cards[1]![0]}" stroke="${theme.cards[1]![1]}" stroke-width="2"/>
      <rect x="220" y="55" width="180" height="24" rx="5" fill="${theme.cards[1]![2]}"/>
      <text x="310" y="71" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">${escapeXml(s2[0].slice(0, 24))}</text>
      <text x="310" y="98" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">${escapeXml(s2[1].slice(0, 26))}</text>
      <line x1="400" y1="90" x2="455" y2="90" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>

      <!-- 3. Decision 1 (Quality Gate) -->
      <polygon points="530,50 600,90 530,130 460,90" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
      <text x="530" y="86" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#92400E" text-anchor="middle">Data Valid &amp;</text>
      <text x="530" y="101" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#92400E" text-anchor="middle">Verified?</text>
      <line x1="530" y1="50" x2="530" y2="25" stroke="${theme.arrowAlt}" stroke-width="2"/>
      <line x1="530" y1="25" x2="310" y2="25" stroke="${theme.arrowAlt}" stroke-width="2"/>
      <line x1="310" y1="25" x2="310" y2="50" stroke="${theme.arrowAlt}" stroke-width="2" marker-end="url(#arrowRed)"/>
      <text x="420" y="20" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="${theme.arrowAlt}">NO (Retry &amp; Cleanse)</text>
      <line x1="600" y1="90" x2="655" y2="90" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>
      <text x="615" y="82" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#16A34A">YES</text>

      <!-- 4. Step 2 (Feature Transform) -->
      <rect x="660" y="55" width="180" height="70" rx="5" fill="${theme.cards[2]![0]}" stroke="${theme.cards[2]![1]}" stroke-width="2"/>
      <rect x="660" y="55" width="180" height="24" rx="5" fill="${theme.cards[2]![2]}"/>
      <text x="750" y="71" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">${escapeXml(s3[0].slice(0, 24))}</text>
      <text x="750" y="98" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">${escapeXml(s3[1].slice(0, 26))}</text>

      <!-- S-Curve Connector down to Row 2 -->
      <path d="M 840 90 L 910 90 Q 940 90 940 160 Q 940 230 910 230 L 850 230" stroke="${theme.arrow}" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>

      <!-- ROW 2: Processing, Inference & Output (Right to Left) -->
      <!-- 5. Step 3 (Core Processing) -->
      <rect x="650" y="195" width="195" height="70" rx="5" fill="${theme.cards[3]![0]}" stroke="${theme.cards[3]![1]}" stroke-width="2"/>
      <rect x="650" y="195" width="195" height="24" rx="5" fill="${theme.cards[3]![2]}"/>
      <text x="747" y="211" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">Algorithmic Core</text>
      <text x="747" y="238" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">${escapeXml(s4[0].slice(0, 26))}</text>
      <line x1="650" y1="230" x2="595" y2="230" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>

      <!-- 6. Decision 2 (Confidence Threshold) -->
      <polygon points="525,190 590,230 525,270 460,230" fill="${theme.cards[2]![0]}" stroke="${theme.cards[2]![1]}" stroke-width="2"/>
      <text x="525" y="226" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="${theme.primaryDark}" text-anchor="middle">Confidence &gt;</text>
      <text x="525" y="241" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="${theme.primaryDark}" text-anchor="middle">Threshold?</text>
      <line x1="460" y1="230" x2="405" y2="230" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>
      <text x="420" y="222" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#16A34A">YES</text>

      <!-- 7. Step 4 (Persistence & UI) -->
      <rect x="220" y="195" width="180" height="70" rx="5" fill="${theme.cards[4]![0]}" stroke="${theme.cards[4]![1]}" stroke-width="2"/>
      <rect x="220" y="195" width="180" height="24" rx="5" fill="${theme.cards[4]![2]}"/>
      <text x="310" y="211" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">State &amp; Telemetry UI</text>
      <text x="310" y="238" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">${escapeXml(s5[1].slice(0, 26))}</text>
      <line x1="220" y1="230" x2="175" y2="230" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>

      <!-- 8. Finish Pill -->
      <rect x="40" y="200" width="130" height="60" rx="30" fill="${theme.cards[1]![0]}" stroke="${theme.cards[1]![1]}" stroke-width="2"/>
      <text x="105" y="227" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="#064E3B" text-anchor="middle">COMPLETE</text>
      <text x="105" y="245" font-family="'Times New Roman', serif" font-size="9" fill="#059669" text-anchor="middle">Output Broadcast</text>

      <!-- Bottom Architecture Note -->
      <rect x="30" y="320" width="940" height="90" rx="6" fill="${theme.busBg}" stroke="${theme.busBorder}" stroke-width="1.5"/>
      <text x="500" y="352" font-family="'Times New Roman', serif" font-size="12.5" font-weight="bold" fill="${theme.primaryDark}" text-anchor="middle">DUAL-ROW SERPENTINE EXECUTION ARCHITECTURE: REPRODUCIBLE IEEE PIPELINE</text>
      <text x="500" y="375" font-family="'Times New Roman', serif" font-size="11" fill="#334155" text-anchor="middle">Continuous S-curve topology enables localized validation and fault tolerance across distributed execution stages.</text>
      <text x="500" y="395" font-family="'Times New Roman', serif" font-size="10.5" font-style="italic" fill="#64748B" text-anchor="middle">Theme: ${escapeXml(theme.name)} — Dynamic Architectural Flowchart for: ${escapeXml(cleanTitle)}</text>
      <text x="500" y="485" font-family="'Times New Roman', serif" font-size="11.5" font-style="italic" fill="#64748B" text-anchor="middle">Operational Pipeline &amp; Verification Flowchart — ${escapeXml(cleanTitle)}</text>
    </svg>`;
  }

  // --- STRUCTURE VARIANT 2: Parallel Dual-Stream Orchestration Pipeline ---
  if (structureVariant === 2) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="1000" height="560">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${theme.arrow}" />
        </marker>
      </defs>
      <rect width="1000" height="560" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>

      <!-- 1. Start Ingestion Pill -->
      <rect x="30" y="165" width="125" height="65" rx="32.5" fill="${theme.cards[0]![0]}" stroke="${theme.cards[0]![1]}" stroke-width="2"/>
      <text x="92" y="195" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="${theme.primaryDark}" text-anchor="middle">START</text>
      <text x="92" y="213" font-family="'Times New Roman', serif" font-size="8.5" fill="${theme.primary}" text-anchor="middle">${escapeXml(s1[0].slice(0, 16))}</text>

      <!-- Fork Lines to Parallel Streams -->
      <path d="M 155 197 L 205 197 L 205 110 L 235 110" stroke="${theme.arrow}" stroke-width="2.2" fill="none" marker-end="url(#arrow)"/>
      <path d="M 155 197 L 205 197 L 205 285 L 235 285" stroke="${theme.arrow}" stroke-width="2.2" fill="none" marker-end="url(#arrow)"/>

      <!-- BRANCH A (Upper): Analytical / Deep Learning Stream -->
      <rect x="240" y="75" width="200" height="70" rx="5" fill="${theme.cards[1]![0]}" stroke="${theme.cards[1]![1]}" stroke-width="2"/>
      <rect x="240" y="75" width="200" height="24" rx="5" fill="${theme.cards[1]![2]}"/>
      <text x="340" y="91" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">TRACK A: Feature Pipeline</text>
      <text x="340" y="118" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">${escapeXml(s3[0].slice(0, 26))}</text>
      <line x1="440" y1="110" x2="485" y2="110" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>

      <rect x="490" y="75" width="180" height="70" rx="5" fill="${theme.cards[2]![0]}" stroke="${theme.cards[2]![1]}" stroke-width="2"/>
      <rect x="490" y="75" width="180" height="24" rx="5" fill="${theme.cards[2]![2]}"/>
      <text x="580" y="91" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">Inference Engine</text>
      <text x="580" y="118" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">${escapeXml(s4[0].slice(0, 24))}</text>

      <!-- BRANCH B (Lower): Quality, Safety & Sensor Validation Stream -->
      <rect x="240" y="250" width="200" height="70" rx="5" fill="${theme.cards[3]![0]}" stroke="${theme.cards[3]![1]}" stroke-width="2"/>
      <rect x="240" y="250" width="200" height="24" rx="5" fill="${theme.cards[3]![2]}"/>
      <text x="340" y="266" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">TRACK B: Security &amp; Quality</text>
      <text x="340" y="293" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">${escapeXml(s2[0].slice(0, 26))}</text>
      <line x1="440" y1="285" x2="485" y2="285" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>

      <rect x="490" y="250" width="180" height="70" rx="5" fill="${theme.cards[4]![0]}" stroke="${theme.cards[4]![1]}" stroke-width="2"/>
      <rect x="490" y="250" width="180" height="24" rx="5" fill="${theme.cards[4]![2]}"/>
      <text x="580" y="266" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">Boundary Guard</text>
      <text x="580" y="293" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">Safety &amp; Compliance Checks</text>

      <!-- Convergence to Central Fusion Decision Node -->
      <path d="M 670 110 L 710 110 L 710 165 L 735 197" stroke="${theme.arrow}" stroke-width="2.2" fill="none"/>
      <path d="M 670 285 L 710 285 L 710 230 L 735 197" stroke="${theme.arrow}" stroke-width="2.2" fill="none"/>

      <polygon points="765,160 830,197 765,235 700,197" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
      <text x="765" y="193" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#92400E" text-anchor="middle">Synchronized</text>
      <text x="765" y="208" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#92400E" text-anchor="middle">State Fusion?</text>
      <line x1="830" y1="197" x2="865" y2="197" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>

      <!-- Output Node -->
      <rect x="870" y="165" width="105" height="65" rx="32.5" fill="${theme.cards[1]![0]}" stroke="${theme.cards[1]![1]}" stroke-width="2"/>
      <text x="922" y="195" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="#064E3B" text-anchor="middle">SUCCESS</text>
      <text x="922" y="213" font-family="'Times New Roman', serif" font-size="8.5" fill="#059669" text-anchor="middle">Publish State</text>

      <!-- Bottom Architecture Note -->
      <rect x="30" y="360" width="940" height="75" rx="6" fill="${theme.busBg}" stroke="${theme.busBorder}" stroke-width="1.5"/>
      <text x="500" y="390" font-family="'Times New Roman', serif" font-size="12.5" font-weight="bold" fill="${theme.primaryDark}" text-anchor="middle">PARALLEL MULTI-STREAM ORCHESTRATION PIPELINE — IEEE ARCHITECTURE</text>
      <text x="500" y="412" font-family="'Times New Roman', serif" font-size="10.5" fill="#334155" text-anchor="middle">Dual-channel concurrency separates data transformation from boundary safety verification before state commitment.</text>
      <text x="500" y="485" font-family="'Times New Roman', serif" font-size="11.5" font-style="italic" fill="#64748B" text-anchor="middle">Operational Pipeline &amp; Verification Flowchart — ${escapeXml(cleanTitle)}</text>
    </svg>`;
  }

  // --- STRUCTURE VARIANT 0: Horizontal Pipeline with Bottom Recovery Loop ---
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="1000" height="560">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${theme.arrow}" />
      </marker>
      <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${theme.arrowAlt}" />
      </marker>
    </defs>
    <rect width="1000" height="560" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>

    <!-- 1. Start -->
    <rect x="30" y="75" width="125" height="65" rx="32.5" fill="${theme.cards[0]![0]}" stroke="${theme.cards[0]![1]}" stroke-width="2"/>
    <text x="92" y="103" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="${theme.primaryDark}" text-anchor="middle">START</text>
    <text x="92" y="121" font-family="'Times New Roman', serif" font-size="9" fill="${theme.primary}" text-anchor="middle">${escapeXml(s1[0].slice(0, 18))}</text>
    <line x1="155" y1="107" x2="185" y2="107" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>

    <!-- 2. Step 1 -->
    <rect x="190" y="70" width="145" height="75" rx="5" fill="${theme.cards[1]![0]}" stroke="${theme.cards[1]![1]}" stroke-width="2"/>
    <rect x="190" y="70" width="145" height="24" rx="5" fill="${theme.cards[1]![2]}"/>
    <text x="262" y="86" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">${escapeXml(s2[0].slice(0, 20))}</text>
    <text x="262" y="113" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">${escapeXml(s2[1].slice(0, 24))}</text>
    <line x1="335" y1="107" x2="365" y2="107" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>

    <!-- 3. Decision 1 -->
    <polygon points="435,65 495,107 435,150 375,107" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
    <text x="435" y="103" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#92400E" text-anchor="middle">Data Valid &amp;</text>
    <text x="435" y="117" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#92400E" text-anchor="middle">Verified?</text>
    <line x1="435" y1="150" x2="435" y2="205" stroke="${theme.arrowAlt}" stroke-width="2" marker-end="url(#arrowRed)"/>
    <text x="445" y="175" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="${theme.arrowAlt}">NO</text>
    <rect x="365" y="210" width="140" height="48" rx="4" fill="#FEF2F2" stroke="${theme.arrowAlt}" stroke-width="1.8"/>
    <text x="435" y="230" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#991B1B" text-anchor="middle">Exception Handler</text>
    <text x="435" y="246" font-family="'Times New Roman', serif" font-size="8.5" fill="#B91C1C" text-anchor="middle">${escapeXml(d1[2].slice(0, 22))}</text>
    <line x1="495" y1="107" x2="525" y2="107" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>
    <text x="505" y="99" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#16A34A">YES</text>

    <!-- 4. Step 2 -->
    <rect x="530" y="70" width="145" height="75" rx="5" fill="${theme.cards[2]![0]}" stroke="${theme.cards[2]![1]}" stroke-width="2"/>
    <rect x="530" y="70" width="145" height="24" rx="5" fill="${theme.cards[2]![2]}"/>
    <text x="602" y="86" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">${escapeXml(s3[0].slice(0, 20))}</text>
    <text x="602" y="113" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">${escapeXml(s3[1].slice(0, 24))}</text>
    <line x1="675" y1="107" x2="705" y2="107" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>

    <!-- 5. Decision 2 -->
    <polygon points="770,65 830,107 770,150 710,107" fill="${theme.cards[3]![0]}" stroke="${theme.cards[3]![1]}" stroke-width="2"/>
    <text x="770" y="103" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="${theme.primaryDark}" text-anchor="middle">Confidence</text>
    <text x="770" y="117" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="${theme.primaryDark}" text-anchor="middle">&gt; 85% Metric?</text>
    <line x1="770" y1="150" x2="770" y2="205" stroke="${theme.arrow}" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="780" y="175" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#4B5563">ALT</text>
    <rect x="700" y="210" width="140" height="48" rx="4" fill="#F3F4F6" stroke="#6B7280" stroke-width="1.8"/>
    <text x="770" y="230" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#374151" text-anchor="middle">Ensemble Fallback</text>
    <text x="770" y="246" font-family="'Times New Roman', serif" font-size="8.5" fill="#4B5563" text-anchor="middle">${escapeXml(d2[2].slice(0, 22))}</text>
    <line x1="830" y1="107" x2="855" y2="107" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>

    <!-- 6. Step 3 Outcome -->
    <rect x="860" y="70" width="115" height="75" rx="5" fill="${theme.cards[0]![0]}" stroke="${theme.cards[0]![1]}" stroke-width="2"/>
    <text x="917" y="100" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" fill="${theme.primaryDark}" text-anchor="middle">EXECUTE</text>
    <text x="917" y="120" font-family="'Times New Roman', serif" font-size="8.5" fill="${theme.primary}" text-anchor="middle">${escapeXml(s4[0].slice(0, 16))}</text>
    <path d="M 917 145 L 917 310 L 610 310" stroke="${theme.arrow}" stroke-width="2.2" fill="none" marker-end="url(#arrow)"/>
    <path d="M 770 258 L 770 310 L 610 310" stroke="${theme.arrow}" stroke-width="1.8" fill="none"/>

    <!-- 7. Persistence -->
    <rect x="420" y="285" width="185" height="55" rx="6" fill="${theme.cards[4]![0]}" stroke="${theme.cards[4]![1]}" stroke-width="2"/>
    <text x="512" y="308" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="#0F172A" text-anchor="middle">AUDIT &amp; TELEMETRY LOG</text>
    <text x="512" y="326" font-family="'Times New Roman', serif" font-size="9" fill="#334155" text-anchor="middle">${escapeXml(s5[1].slice(0, 30))}</text>
    <line x1="420" y1="312" x2="350" y2="312" stroke="${theme.arrow}" stroke-width="2.2" marker-end="url(#arrow)"/>

    <!-- 8. Finish -->
    <rect x="220" y="285" width="125" height="55" rx="27.5" fill="${theme.cards[1]![0]}" stroke="${theme.cards[1]![1]}" stroke-width="2"/>
    <text x="282" y="310" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="#065F46" text-anchor="middle">STANDBY / END</text>
    <text x="282" y="326" font-family="'Times New Roman', serif" font-size="8.5" fill="#047857" text-anchor="middle">Await Next Trigger</text>

    <!-- Bottom summary -->
    <rect x="30" y="370" width="940" height="54" rx="4" fill="${theme.busBg}" stroke="${theme.busBorder}" stroke-width="1.2"/>
    <text x="500" y="394" font-family="'Times New Roman', serif" font-size="12" font-weight="bold" fill="#1E293B" text-anchor="middle">Operational State Flow: Input Acquisition → Deterministic Validation → Core Processing → Safety Verification → Log &amp; UI</text>
    <text x="500" y="412" font-family="'Times New Roman', serif" font-size="10.5" font-style="italic" fill="#64748B" text-anchor="middle">Theme: ${escapeXml(theme.name)} — IEEE Standard cyclic operational model with error mitigation branches.</text>
    <text x="500" y="485" font-family="'Times New Roman', serif" font-size="11.5" font-style="italic" fill="#64748B" text-anchor="middle">Operational Pipeline &amp; Verification Flowchart — ${escapeXml(cleanTitle)}</text>
  </svg>`;
}

/**
 * Pure SVG generator for Figure 4.1: Implementation Architecture & Integration Schematic
 * Uses report color themes.
 */
export function generateFigure41Svg(projectTitle: string, caption?: string): string {
  const cleanTitle = (projectTitle || "Advanced Engineering Capstone System").trim();
  const domain = detectDomain(cleanTitle);
  const theme = getReportTheme(cleanTitle);

  let tiers: [string, string[]][];
  if (domain === "computer_vision" || domain === "machine_learning" || domain === "nlp_ai") {
    tiers = [
      ["CLIENT & INGESTION TIER", ["High-Res Image Stream", "Standard Datasets", "Axios & WebSocket Stream"]],
      ["API GATEWAY TIER", ["FastAPI Microservice", "OpenCV Image Normalizer", "JWT Token Validator"]],
      ["COMPUTATIONAL CORE", ["PyTorch Deep Backbone", "CUDA Acceleration", "TensorRT / ONNX Runtime"]],
      ["STORAGE & DEPLOYMENT", ["PostgreSQL Database", "Redis Inference Cache", "Docker & NGINX Proxy"]],
    ];
  } else if (domain === "iot_embedded" || domain === "healthcare" || domain === "robotics") {
    tiers = [
      ["SENSORY & EDGE TIER", ["Sensors & Transducers", "Edge Controller Node", "Real-Time Task Scheduler"]],
      ["COMMUNICATION TIER", ["MQTT 5.0 Broker", "TLS 1.3 Encryption", "REST Ingress Gateway"]],
      ["APPLICATION SERVICE", ["Telemetry Dispatcher", "Threshold Evaluator", "Push Alert Service"]],
      ["STORAGE & MONITORING", ["Time-Series Metric Store", "React Live Dashboard", "Docker Compose Runtime"]],
    ];
  } else {
    tiers = [
      ["PRESENTATION TIER", ["Single Page Client", "Tailwind Component UI", "HTTPS Session Manager"]],
      ["API GATEWAY TIER", ["Reverse Proxy Gateway", "Auth & Security Guard", "Validation Middleware"]],
      ["APPLICATION LOGIC", ["Core Compute Engine", "Task Queue Engine", "Optimization Logic"]],
      ["PERSISTENCE & DEPLOY", ["Relational Database", "In-Memory Cache", "CI/CD & Docker Runtime"]],
    ];
  }

  const tierW = 215;
  const tierH = 265;
  const gap = 25;
  const startX = 30;
  const yPos = 45;

  const cardsSvg = tiers
    .map(([tName, items], i) => {
      const [bgC, borderC] = theme.cards[i % theme.cards.length]!;
      const x = startX + i * (tierW + gap);
      const itemsSvg = items
        .map(
          (it, idx) => `
        <rect x="${x + 12}" y="${yPos + 58 + idx * 64}" width="${tierW - 24}" height="50" rx="4" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
        <text x="${x + 20}" y="${yPos + 88 + idx * 64}" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#0F172A">${escapeXml(it.slice(0, 24))}</text>
      `,
        )
        .join("\n");

      let busArrow = "";
      if (i < tiers.length - 1) {
        const ax = x + tierW;
        const ay = yPos + tierH / 2;
        busArrow = `
        <line x1="${ax}" y1="${ay - 15}" x2="${ax + gap - 6}" y2="${ay - 15}" stroke="${theme.arrow}" stroke-width="2" marker-end="url(#arrow)" />
        <line x1="${ax + gap - 6}" y1="${ay + 15}" x2="${ax}" y2="${ay + 15}" stroke="${theme.arrow}" stroke-width="2" marker-end="url(#arrow)" />
        <text x="${ax + gap / 2}" y="${ay + 3}" font-family="'Times New Roman', serif" font-size="8" fill="#64748B" text-anchor="middle">BUS</text>
      `;
      }

      const tierFontSize = tName.length > 20 ? 9 : 10;

      return `
      <g id="tier_${i + 1}">
        <rect x="${x}" y="${yPos}" width="${tierW}" height="${tierH}" rx="6" fill="${bgC}" stroke="${borderC}" stroke-width="2"/>
        <rect x="${x}" y="${yPos}" width="${tierW}" height="42" rx="6" fill="${borderC}"/>
        <rect x="${x}" y="${yPos + 32}" width="${tierW}" height="10" fill="${borderC}"/>
        <text x="${x + tierW / 2}" y="${yPos + 26}" font-family="'Times New Roman', serif" font-size="${tierFontSize}" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${escapeXml(tName.slice(0, 24))}</text>
        ${itemsSvg}
        ${busArrow}
      </g>
    `;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="1000" height="560">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${theme.arrow}" />
      </marker>
    </defs>
    <rect width="1000" height="560" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>
    ${cardsSvg}
    <rect x="30" y="335" width="935" height="95" rx="6" fill="${theme.busBg}" stroke="${theme.busBorder}" stroke-width="1.8"/>
    <text x="500" y="362" font-family="'Times New Roman', serif" font-size="12.5" font-weight="bold" fill="#0F172A" text-anchor="middle">END-TO-END SYSTEM TOOLCHAIN &amp; HARDWARE/SOFTWARE INTEGRATION TOPOLOGY</text>
    <text x="500" y="385" font-family="'Times New Roman', serif" font-size="11" fill="#334155" text-anchor="middle">Seamless interoperability via bidirectional JSON-RPC / RESTful endpoints, secure token auth, and low-latency serialization.</text>
    <text x="500" y="405" font-family="'Times New Roman', serif" font-size="10.5" font-style="italic" fill="#64748B" text-anchor="middle">Theme: ${escapeXml(theme.name)} — Docker container orchestration ensures deterministic deployment reproducibility.</text>
    <text x="500" y="485" font-family="'Times New Roman', serif" font-size="11.5" font-style="italic" fill="#475569" text-anchor="middle">Engineering Implementation Architecture Schematic conforming to IEEE Standards</text>
  </svg>`;
}

/**
 * Fallback SVG plot for 4.2: Experimental Results and Benchmark Curves
 * Uses report color theme.
 */
export function generateFigure42SvgFallback(projectTitle: string, caption?: string): string {
  const cleanTitle = (projectTitle || "Advanced Engineering Capstone System").trim();
  const theme = getReportTheme(cleanTitle);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="1000" height="560">
    <rect width="1000" height="560" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>

    <g transform="translate(100, 45)">
      <!-- Grid -->
      <line x1="0" y1="50" x2="820" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="0" y1="120" x2="820" y2="120" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="0" y1="190" x2="820" y2="190" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="0" y1="260" x2="820" y2="260" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="0" y1="330" x2="820" y2="330" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4,4"/>

      <!-- Axes -->
      <line x1="0" y1="330" x2="830" y2="330" stroke="#1E293B" stroke-width="2"/>
      <line x1="0" y1="330" x2="0" y2="10" stroke="#1E293B" stroke-width="2"/>

      <!-- Ticks -->
      <text x="-15" y="334" font-family="'Times New Roman', serif" font-size="12" fill="#475569" text-anchor="end">40.0%</text>
      <text x="-15" y="260" font-family="'Times New Roman', serif" font-size="12" fill="#475569" text-anchor="end">55.0%</text>
      <text x="-15" y="190" font-family="'Times New Roman', serif" font-size="12" fill="#475569" text-anchor="end">70.0%</text>
      <text x="-15" y="120" font-family="'Times New Roman', serif" font-size="12" fill="#475569" text-anchor="end">85.0%</text>
      <text x="-15" y="50" font-family="'Times New Roman', serif" font-size="12" fill="#475569" text-anchor="end">100.0%</text>

      <text x="0" y="352" font-family="'Times New Roman', serif" font-size="12" fill="#475569" text-anchor="middle">Epoch 1</text>
      <text x="200" y="352" font-family="'Times New Roman', serif" font-size="12" fill="#475569" text-anchor="middle">Epoch 12</text>
      <text x="400" y="352" font-family="'Times New Roman', serif" font-size="12" fill="#475569" text-anchor="middle">Epoch 25</text>
      <text x="600" y="352" font-family="'Times New Roman', serif" font-size="12" fill="#475569" text-anchor="middle">Epoch 38</text>
      <text x="800" y="352" font-family="'Times New Roman', serif" font-size="12" fill="#475569" text-anchor="middle">Epoch 50</text>

      <text x="410" y="385" font-family="'Times New Roman', serif" font-size="13" font-weight="bold" fill="#0F172A" text-anchor="middle">Training Iterations / Experimental Epochs</text>
      <text x="-60" y="170" font-family="'Times New Roman', serif" font-size="13" font-weight="bold" fill="#0F172A" text-anchor="middle" transform="rotate(-90 -60 170)">Objective Model Accuracy / Precision (%)</text>

      <!-- Baseline Curve -->
      <path d="M 0 310 Q 200 280 400 220 T 800 135" fill="none" stroke="${theme.chartLineAlt}" stroke-width="2.5" stroke-dasharray="6,4"/>
      <!-- Proposed Curve -->
      <path d="M 0 300 Q 180 250 400 110 T 800 48" fill="none" stroke="${theme.chartLine}" stroke-width="3"/>

      <!-- Optimal Callout -->
      <circle cx="800" cy="48" r="6" fill="${theme.accent}"/>
      <rect x="580" y="20" width="190" height="40" rx="4" fill="#FEF3C7" stroke="${theme.accent}" stroke-width="1.2"/>
      <text x="675" y="38" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">Optimal Accuracy: 96.8%</text>
      <text x="675" y="52" font-family="'Times New Roman', serif" font-size="9.5" fill="#B45309" text-anchor="middle">Convergence at Epoch 48</text>

      <!-- Legend -->
      <rect x="530" y="240" width="280" height="65" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2" rx="4"/>
      <line x1="545" y1="260" x2="585" y2="260" stroke="${theme.chartLine}" stroke-width="3"/>
      <text x="595" y="264" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="#0F172A">Proposed System (Theme: ${escapeXml(theme.name)})</text>
      <line x1="545" y1="285" x2="585" y2="285" stroke="${theme.chartLineAlt}" stroke-width="2.5" stroke-dasharray="6,4"/>
      <text x="595" y="289" font-family="'Times New Roman', serif" font-size="11" fill="#475569">Conventional Baseline Standard</text>
    </g>
    <text x="500" y="525" font-family="'Times New Roman', serif" font-size="12" font-style="italic" fill="#475569" text-anchor="middle">Empirical Benchmark Verification conforming to IEEE Standard — Project: ${escapeXml(cleanTitle)}</text>
  </svg>`;
}

/**
 * Fallback SVG plot for 4.3: Latency & Throughput Evaluation Under Operational Load
 * Uses report color theme.
 */
export function generateFigure43SvgFallback(projectTitle: string, caption?: string): string {
  const cleanTitle = (projectTitle || "Advanced Engineering Capstone System").trim();
  const theme = getReportTheme(cleanTitle);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="1000" height="560">
    <rect width="1000" height="560" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>

    <g transform="translate(100, 45)">
      <!-- Grid -->
      <line x1="0" y1="60" x2="800" y2="60" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="0" y1="130" x2="800" y2="130" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="0" y1="200" x2="800" y2="200" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="0" y1="270" x2="800" y2="270" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="0" y1="330" x2="800" y2="330" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4,4"/>

      <!-- Axes -->
      <line x1="0" y1="330" x2="810" y2="330" stroke="#1E293B" stroke-width="2"/>
      <line x1="0" y1="330" x2="0" y2="20" stroke="#1E293B" stroke-width="2"/>
      <line x1="800" y1="330" x2="800" y2="20" stroke="${theme.primary}" stroke-width="2"/>

      <!-- Ticks Left: Latency -->
      <text x="-15" y="334" font-family="'Times New Roman', serif" font-size="11" fill="#475569" text-anchor="end">0 ms</text>
      <text x="-15" y="270" font-family="'Times New Roman', serif" font-size="11" fill="#475569" text-anchor="end">50 ms</text>
      <text x="-15" y="200" font-family="'Times New Roman', serif" font-size="11" fill="#475569" text-anchor="end">120 ms</text>
      <text x="-15" y="130" font-family="'Times New Roman', serif" font-size="11" fill="#475569" text-anchor="end">220 ms</text>
      <text x="-15" y="60" font-family="'Times New Roman', serif" font-size="11" fill="#475569" text-anchor="end">350 ms</text>

      <!-- Ticks Right: Throughput -->
      <text x="815" y="334" font-family="'Times New Roman', serif" font-size="11" fill="${theme.primary}" text-anchor="start">0 tps</text>
      <text x="815" y="230" font-family="'Times New Roman', serif" font-size="11" fill="${theme.primary}" text-anchor="start">400 tps</text>
      <text x="815" y="130" font-family="'Times New Roman', serif" font-size="11" fill="${theme.primary}" text-anchor="start">800 tps</text>
      <text x="815" y="60" font-family="'Times New Roman', serif" font-size="11" fill="${theme.primary}" text-anchor="start">1100 tps</text>

      <!-- Ticks X -->
      <text x="50" y="352" font-family="'Times New Roman', serif" font-size="11" fill="#475569" text-anchor="middle">100</text>
      <text x="250" y="352" font-family="'Times New Roman', serif" font-size="11" fill="#475569" text-anchor="middle">300</text>
      <text x="450" y="352" font-family="'Times New Roman', serif" font-size="11" fill="#475569" text-anchor="middle">500</text>
      <text x="650" y="352" font-family="'Times New Roman', serif" font-size="11" fill="#475569" text-anchor="middle">750</text>
      <text x="780" y="352" font-family="'Times New Roman', serif" font-size="11" fill="#475569" text-anchor="middle">1000</text>

      <text x="400" y="385" font-family="'Times New Roman', serif" font-size="12" font-weight="bold" fill="#0F172A" text-anchor="middle">Concurrent Operational Workload (Requests / sec)</text>
      <text x="-60" y="170" font-family="'Times New Roman', serif" font-size="12" font-weight="bold" fill="#0F172A" text-anchor="middle" transform="rotate(-90 -60 170)">Response Latency (ms)</text>
      <text x="860" y="170" font-family="'Times New Roman', serif" font-size="12" font-weight="bold" fill="${theme.primary}" text-anchor="middle" transform="rotate(90 860 170)">Throughput Capacity (Transactions / sec)</text>

      <!-- Baseline Latency Spike -->
      <path d="M 0 310 Q 300 290 500 210 T 780 40" fill="none" stroke="${theme.chartLineAlt}" stroke-width="2.5" stroke-dasharray="6,4"/>
      <!-- Proposed Latency (Low, stable) -->
      <path d="M 0 320 Q 300 315 500 300 T 780 250" fill="none" stroke="${theme.chartLine}" stroke-width="2.8"/>
      <!-- Throughput -->
      <path d="M 0 330 Q 300 240 500 160 T 780 80" fill="none" stroke="${theme.secondary}" stroke-width="2.2" stroke-dasharray="8,4"/>

      <!-- Legend -->
      <rect x="40" y="30" width="310" height="85" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2" rx="4"/>
      <line x1="55" y1="50" x2="95" y2="50" stroke="${theme.chartLine}" stroke-width="3"/>
      <text x="105" y="54" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A">Proposed Architecture: Latency (ms)</text>
      <line x1="55" y1="72" x2="95" y2="72" stroke="${theme.chartLineAlt}" stroke-width="2.5" stroke-dasharray="6,4"/>
      <text x="105" y="76" font-family="'Times New Roman', serif" font-size="10.5" fill="#475569">Baseline System: Latency (ms)</text>
      <line x1="55" y1="95" x2="95" y2="95" stroke="${theme.secondary}" stroke-width="2.2" stroke-dasharray="8,4"/>
      <text x="105" y="99" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="${theme.secondary}">Proposed Throughput (Trans/sec)</text>
    </g>
    <text x="500" y="525" font-family="'Times New Roman', serif" font-size="12" font-style="italic" fill="#475569" text-anchor="middle">Scalability &amp; Stress Testing under Concurrency — Project: ${escapeXml(cleanTitle)}</text>
  </svg>`;
}
