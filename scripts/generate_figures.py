#!/usr/bin/env python3
"""
Academic Figure Generator for Capstone Project Reports.
Generates:
  - Figure 3.1: System Architecture Diagram (SVG)
  - Figure 3.2: Operational Flowchart & Data Processing Pipeline (SVG)
  - Figure 4.1: Implementation Architecture & Integration Schematic (SVG)
  - Figure 4.2: Experimental Results & Performance Benchmark Curves (Matplotlib PNG)
  - Figure 4.3: Latency & Throughput Evaluation Under Operational Load (Matplotlib PNG)

All figures dynamically adapt to the user's project title with varied color palettes,
different flowchart topologies (linear vs serpentine vs parallel), and diversified
Matplotlib scientific plot styles.
"""

import sys
import os
import io
import json
import base64
import argparse
import re
import html

# Ensure headless matplotlib backend
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np


# ---------------------------------------------------------------------------
# Deterministic Seeding & Color Themes
# ---------------------------------------------------------------------------

def get_project_seed(title):
    str_val = (title or "Capstone Project").lower().strip()
    h = 0
    for ch in str_val:
        h = ((h << 5) - h + ord(ch)) & 0xFFFFFFFF
    return abs(h)


COLOR_THEMES = [
    # 0: Cobalt Sapphire (Tech / AI)
    {
        "name": "Cobalt Sapphire",
        "primary": "#1D4ED8",
        "primary_dark": "#1E3A8A",
        "secondary": "#0284C7",
        "accent": "#D97706",
        "border": "#2563EB",
        "cards": [
            ("#EFF6FF", "#1E40AF", "#DBEAFE"),
            ("#F0FDF4", "#166534", "#DCFCE7"),
            ("#FAF5FF", "#6B21A8", "#F3E8FF"),
            ("#FFF7ED", "#C2410C", "#FFEDD5"),
            ("#F8FAFC", "#334155", "#E2E8F0"),
        ],
        "bus_bg": "#F8FAFC",
        "bus_border": "#64748B",
        "bus_text": "#1E293B",
        "eval_bg": "#FAF5FF",
        "eval_border": "#9333EA",
        "eval_text": "#581C87",
        "arrow": "#2563EB",
        "arrow_alt": "#DC2626",
        "chart_line": "#1D4ED8",
        "chart_line_alt": "#DC2626",
        "fill_color": "#DBEAFE",
    },
    # 1: Emerald Forest (Bio / Environmental / IoT)
    {
        "name": "Emerald Forest",
        "primary": "#059669",
        "primary_dark": "#064E3B",
        "secondary": "#0D9488",
        "accent": "#D97706",
        "border": "#10B981",
        "cards": [
            ("#ECFDF5", "#047857", "#D1FAE5"),
            ("#F0FDFA", "#0F766E", "#CCFBF1"),
            ("#EFF6FF", "#2563EB", "#DBEAFE"),
            ("#FEF3C7", "#D97706", "#FDE68A"),
            ("#F9FAFB", "#4B5563", "#E5E7EB"),
        ],
        "bus_bg": "#F0FDF4",
        "bus_border": "#059669",
        "bus_text": "#064E3B",
        "eval_bg": "#ECFDF5",
        "eval_border": "#047857",
        "eval_text": "#065F46",
        "arrow": "#059669",
        "arrow_alt": "#B45309",
        "chart_line": "#059669",
        "chart_line_alt": "#B45309",
        "fill_color": "#D1FAE5",
    },
    # 2: Royal Indigo (Computing / Data Science)
    {
        "name": "Royal Indigo",
        "primary": "#6D28D9",
        "primary_dark": "#4C1D95",
        "secondary": "#4F46E5",
        "accent": "#0891B2",
        "border": "#8B5CF6",
        "cards": [
            ("#EEF2FF", "#4338CA", "#E0E7FF"),
            ("#F5F3FF", "#6D28D9", "#EDE9FE"),
            ("#ECFEFF", "#0E7490", "#CFFAFE"),
            ("#FFF1F2", "#E11D48", "#FFE4E6"),
            ("#F8FAFC", "#334155", "#E2E8F0"),
        ],
        "bus_bg": "#F5F3FF",
        "bus_border": "#7C3AED",
        "bus_text": "#4C1D95",
        "eval_bg": "#EEF2FF",
        "eval_border": "#4F46E5",
        "eval_text": "#312E81",
        "arrow": "#6D28D9",
        "arrow_alt": "#E11D48",
        "chart_line": "#6D28D9",
        "chart_line_alt": "#E11D48",
        "fill_color": "#EDE9FE",
    },
    # 3: Crimson Copper (Security / Hardware / Robotics)
    {
        "name": "Crimson Copper",
        "primary": "#BE123C",
        "primary_dark": "#881337",
        "secondary": "#C2410C",
        "accent": "#1D4ED8",
        "border": "#E11D48",
        "cards": [
            ("#FFF1F2", "#BE123C", "#FFE4E6"),
            ("#FFF7ED", "#C2410C", "#FFEDD5"),
            ("#FEF3C7", "#B45309", "#FDE68A"),
            ("#EFF6FF", "#1D4ED8", "#DBEAFE"),
            ("#F8FAFC", "#475569", "#E2E8F0"),
        ],
        "bus_bg": "#FFF7ED",
        "bus_border": "#EA580C",
        "bus_text": "#7C2D12",
        "eval_bg": "#FFF1F2",
        "eval_border": "#BE123C",
        "eval_text": "#881337",
        "arrow": "#C2410C",
        "arrow_alt": "#1D4ED8",
        "chart_line": "#BE123C",
        "chart_line_alt": "#1D4ED8",
        "fill_color": "#FFE4E6",
    },
    # 4: Steel Slate & Ocean Cyan (Enterprise / Cloud / Web)
    {
        "name": "Steel Cyan",
        "primary": "#0284C7",
        "primary_dark": "#0F172A",
        "secondary": "#0D9488",
        "accent": "#7C3AED",
        "border": "#0284C7",
        "cards": [
            ("#F0F9FF", "#0284C7", "#E0F2FE"),
            ("#F8FAFC", "#334155", "#E2E8F0"),
            ("#F0FDFA", "#0D9488", "#CCFBF1"),
            ("#FAF5FF", "#7C3AED", "#F3E8FF"),
            ("#FFFBEB", "#D97706", "#FEF3C7"),
        ],
        "bus_bg": "#F8FAFC",
        "bus_border": "#475569",
        "bus_text": "#0F172A",
        "eval_bg": "#F0F9FF",
        "eval_border": "#0284C7",
        "eval_text": "#0C4A6E",
        "arrow": "#0284C7",
        "arrow_alt": "#DC2626",
        "chart_line": "#0284C7",
        "chart_line_alt": "#DC2626",
        "fill_color": "#E0F2FE",
    },
]


def get_report_theme(title):
    seed = get_project_seed(title)
    return COLOR_THEMES[seed % len(COLOR_THEMES)]


# ---------------------------------------------------------------------------
# Domain Analysis Helper
# ---------------------------------------------------------------------------

def detect_domain(title):
    t = (title or "").lower()
    
    is_cv = any(w in t for w in ['skin', 'cancer', 'plant', 'leaf', 'disease', 'vision', 'image', 'face', 'object', 'detection', 'yolo', 'cnn', 'segmentation', 'retina', 'mri', 'ct scan', 'x-ray'])
    is_nlp = any(w in t for w in ['nlp', 'text', 'language', 'chat', 'summariz', 'sentiment', 'bert', 'gpt', 'llm', 'translation', 'speech', 'voice'])
    is_iot = any(w in t for w in ['iot', 'sensor', 'smart', 'arduino', 'esp32', 'raspberry', 'hardware', 'embedded', 'wearable', 'water', 'crop', 'soil', 'home automation', 'rfid', 'agriculture', 'irrigation'])
    is_robot = any(w in t for w in ['robot', 'drone', 'autonomous', 'vehicle', 'uav', 'quadcopter', 'slam', 'path planning', 'navigation', 'rover', 'obstacle'])
    is_crypto = any(w in t for w in ['blockchain', 'crypto', 'voting', 'smart contract', 'ethereum', 'solidity', 'decentralized', 'nft', 'consensus', 'supply chain'])
    is_sec = any(w in t for w in ['security', 'cyber', 'intrusion', 'malware', 'phishing', 'firewall', 'attack', 'fraud', 'biometric', 'steganography'])
    is_health = any(w in t for w in ['health', 'medical', 'patient', 'hospital', 'ecg', 'heart', 'eeg', 'vital', 'clinical', 'diagnosis', 'doctor', 'telemedicine'])
    is_cloud = any(w in t for w in ['cloud', 'web', 'portal', 'management', 'e-commerce', 'microservice', 'distributed', 'app', 'platform', 'database'])

    if is_cv:
        return 'computer_vision'
    elif is_nlp:
        return 'nlp_ai'
    elif is_robot:
        return 'robotics'
    elif is_iot:
        return 'iot_embedded'
    elif is_crypto:
        return 'blockchain'
    elif is_sec:
        return 'cybersecurity'
    elif is_health:
        return 'healthcare'
    elif any(w in t for w in ['deep learning', 'machine learning', 'neural', 'ai', 'model', 'classification', 'prediction']):
        return 'machine_learning'
    elif is_cloud:
        return 'cloud_web'
    else:
        return 'general_engineering'


# ---------------------------------------------------------------------------
# Figure 3.1: System Architecture Diagram (SVG)
# ---------------------------------------------------------------------------

def generate_figure_3_1_svg(project_title, caption=None, placeholder=None):
    clean_title = (project_title or "Advanced Engineering Capstone System").strip()
    domain = detect_domain(clean_title)
    theme = get_report_theme(clean_title)

    # Domain-specific architecture subsystems
    if domain in ['computer_vision', 'machine_learning', 'nlp_ai']:
        subsystems = [
            ("INPUT & SENSORY LAYER", ["High-Res Image / Signal Stream", "Standardized Benchmark Datasets", "Real-Time Acquisition Buffers"]),
            ("PREPROCESSING & AUGMENTATION", ["Spatial Normalization (RGB / Grayscale)", "Affine & Perspective Transforms", "Feature Vector Formatting"]),
            ("DEEP COMPUTATIONAL CORE", ["Convolutional / Attention Backbone", "Residual Feature Pyramid Blocks", "Softmax / Multi-Class Classifier"]),
            ("PERSISTENCE & MODEL REGISTRY", ["Trained Weights (.onnx / .pt)", "Inference Telemetry DB", "Performance Metric Store"]),
            ("PRESENTATION & CLINICAL UI", ["Diagnostic Heatmaps / Class Score", "Automated Analytical Summary", "Secure Clinician Dashboard"]),
        ]
        layer_bus = "High-Speed CUDA / Tensor Acceleration & Data Bus"
    elif domain in ['iot_embedded', 'healthcare']:
        subsystems = [
            ("SENSING & TRANSDUCTION", ["Biosensor / Physical Transducers", "Signal Conditioning (Filter/ADC)", "Local Edge Buffer & Calibration"]),
            ("EDGE PROCESSING NODE", ["ESP32 / ARM Cortex Firmware", "Statistical Anomaly Filter", "Low-Power Duty-Cycle Controller"]),
            ("COMMUNICATION GATEWAY", ["Encrypted MQTT / BLE Bridge", "JSON Payload Formatter", "Cellular / Wi-Fi Ingestion Pipe"]),
            ("CLOUD DATABASE & ANALYTICS", ["Time-Series InfluxDB Store", "Automated Threshold Evaluator", "Historical Trend Analyzer"]),
            ("TELEMETRY & ALERT UI", ["Real-Time Sensor Dashboard", "SMS / Push Emergency Dispatch", "Remote Configuration Portal"]),
        ]
        layer_bus = "Secure IEEE 802.11 / MQTT 5.0 Low-Latency Wireless Pipeline"
    elif domain in ['blockchain', 'cybersecurity']:
        subsystems = [
            ("CLIENT / IDENTITY LAYER", ["Cryptographic Wallet Ingestion", "Voter / Client Biometric Auth", "Zero-Knowledge Proof Generator"]),
            ("CONSENSUS & VERIFICATION", ["Smart Contract Execution Engine", "Proof-of-Stake / PBFT Consensus", "Double-Spend Prevention Filter"]),
            ("IMMUTABLE LEDGER CORE", ["Distributed Block Ledger Node", "Merkle Tree State Storage", "Cryptographic Hash Chaining"]),
            ("OFF-CHAIN STORAGE & AUDIT", ["IPFS Content-Addressed Storage", "Tamper-Evident Audit Logs", "Validator Key Vault"]),
            ("AUDIT & TALLY PORTAL", ["Real-Time Ballot / Event Monitor", "Cryptographic Receipt Verifier", "Governance Transparency Portal"]),
        ]
        layer_bus = "Cryptographic Peer-to-Peer Protocol & RPC Interaction Layer"
    elif domain == 'robotics':
        subsystems = [
            ("SENSORY PERCEPTION", ["LiDAR / Stereo Vision Cameras", "IMU & Wheel Odometry Sensors", "Ultrasonic Proximity Arrays"]),
            ("STATE ESTIMATION & SLAM", ["Extended Kalman Filter (EKF)", "Occupancy Grid Mapping", "Point Cloud Filtering & Normalization"]),
            ("MOTION & PATH PLANNER", ["Global A* / Dijkstra Trajectory", "Local Dynamic Window Obstacle Avoid", "Kinematic Constraints Solver"]),
            ("ACTUATOR CONTROL LAYER", ["PID Motor Velocity Controller", "PWM Driver & Servo Actuators", "Emergency Deceleration Braking"]),
            ("TELEOPERATION & TELEMETRY", ["ROS2 RViz Telemetry Stream", "Waypoint Mission Dispatcher", "Ground Control Station (GCS)"]),
        ]
        layer_bus = "Real-Time Micro-ROS / DDS Publish-Subscribe Middleware"
    else:
        subsystems = [
            ("DATA INGESTION LAYER", ["Client Interface & User Payloads", "Parameter & Configuration Stream", "Validation & Sanitization Engine"]),
            ("PREPROCESSING SUBSYSTEM", ["Data Transformation & Encoding", "Input Feature Normalization", "Security Barrier Verification"]),
            ("CORE COMPUTATION ENGINE", ["Domain Algorithmic Processor", "State & Optimization Logic", "Dynamic Resource Allocator"]),
            ("PERSISTENCE & CACHE LAYER", ["Relational & Vector Data Vault", "In-Memory Session Caching", "Audit Logging & Transactions"]),
            ("PRESENTATION & UI TIER", ["Responsive Analytics Dashboard", "Export & Reporting Engine", "System Notification & Logs"]),
        ]
        layer_bus = "Secure RESTful & WebSocket Real-Time Communication Backbone"

    # Build boxes using theme cards
    box_w = 170
    box_h = 175
    gap = 22
    start_x = 22
    y_pos = 55

    boxes_svg = []
    for i, (name, items) in enumerate(subsystems):
        bg_color, border_color = theme["cards"][i % len(theme["cards"])][:2]
        x = start_x + i * (box_w + gap)
        items_svg = "\n".join([
            f'<text x="{x + 12}" y="{y_pos + 64 + idx * 26}" font-family="Times New Roman, serif" font-size="10.5" fill="#334155">• {html.escape(item)}</text>'
            for idx, item in enumerate(items)
        ])
        
        arrow_svg = ""
        if i < len(subsystems) - 1:
            ax = x + box_w
            ay = y_pos + box_h // 2
            arrow_svg = f'''
            <line x1="{ax}" y1="{ay}" x2="{ax + gap - 6}" y2="{ay}" stroke="{theme['arrow']}" stroke-width="2.5" />
            <polygon points="{ax + gap - 6},{ay - 5} {ax + gap},{ay} {ax + gap - 6},{ay + 5}" fill="{theme['arrow']}" />
            '''

        boxes_svg.append(f'''
        <g id="subsystem_{i+1}">
          <rect x="{x}" y="{y_pos}" width="{box_w}" height="{box_h}" rx="6" fill="{bg_color}" stroke="{border_color}" stroke-width="2" />
          <rect x="{x}" y="{y_pos}" width="{box_w}" height="38" rx="6" fill="{border_color}" />
          <rect x="{x}" y="{y_pos + 28}" width="{box_w}" height="10" fill="{border_color}" />
          <text x="{x + box_w//2}" y="{y_pos + 23}" font-family="Times New Roman, serif" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">{html.escape(name)}</text>
          {items_svg}
          {arrow_svg}
        </g>
        ''')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="1000" height="560">
  <!-- Outer Canvas Border -->
  <rect width="1000" height="560" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>

  <!-- Architectural Subsystem Blocks -->
  {"".join(boxes_svg)}

  <!-- Inter-modular Communication Bus -->
  <rect x="22" y="270" width="946" height="70" rx="6" fill="{theme['bus_bg']}" stroke="{theme['bus_border']}" stroke-width="1.8" stroke-dasharray="6,4" />
  <text x="500" y="298" font-family="'Times New Roman', serif" font-size="13" font-weight="bold" fill="{theme['bus_text']}" text-anchor="middle">SYSTEM COMMUNICATION &amp; SYNCHRONIZATION BUS: {html.escape(layer_bus)}</text>
  <text x="500" y="322" font-family="'Times New Roman', serif" font-size="11" font-style="italic" fill="#475569" text-anchor="middle">Bi-directional telemetry, state synchronization, secure tokens, and fault-tolerant interrupt channels</text>

  <!-- Safety & Feedback Loop Sub-Panel -->
  <rect x="22" y="365" width="946" height="78" rx="6" fill="{theme['eval_bg']}" stroke="{theme['eval_border']}" stroke-width="1.8" />
  <text x="500" y="396" font-family="'Times New Roman', serif" font-size="13" font-weight="bold" fill="{theme['eval_text']}" text-anchor="middle">CONTINUOUS EVALUATION, ERROR COMPENSATION &amp; SAFETY BOUNDARY VERIFICATION</text>
  <text x="500" y="422" font-family="'Times New Roman', serif" font-size="11.5" fill="{theme['eval_text']}" text-anchor="middle">Automated self-diagnostics, boundary checks, exception logging, and telemetry persistence conforming to IEEE standards</text>

  <!-- Verification Footer -->
  <text x="500" y="500" font-family="'Times New Roman', serif" font-size="12" font-style="italic" fill="#475569" text-anchor="middle">IEEE Engineering Standard Architecture Schematic — Designed for: {html.escape(clean_title)}</text>
</svg>'''
    return svg_content


# ---------------------------------------------------------------------------
# Figure 3.2: Operational Flowchart & Data Processing Pipeline (SVG)
# ---------------------------------------------------------------------------

def generate_figure_3_2_svg(project_title, caption=None, placeholder=None):
    clean_title = (project_title or "Advanced Engineering Capstone System").strip()
    domain = detect_domain(clean_title)
    theme = get_report_theme(clean_title)
    seed = get_project_seed(clean_title)
    structure_variant = (seed >> 2) % 3  # 0: Horizontal + Loop, 1: Dual-Row Serpentine, 2: Parallel Dual-Stream

    # Tailored steps based on project domain
    if domain in ['computer_vision', 'machine_learning', 'nlp_ai']:
        s1 = ("System Start & Dataset Ingestion", "Load image / query data stream from source")
        s2 = ("Data Validation & Noise Inspection", "Verify resolution, format, and aspect ratio")
        d1 = ("Data Valid &amp; Within Bounds?", "Pass", "Reject &amp; Request Rescan")
        s3 = ("Feature Extraction & Embedding", "Compute normalized feature maps & vectors")
        d2 = ("Inference Confidence &gt; 85%?", "Accept Class", "Trigger Ensemble / Fallback")
        s4 = ("Diagnostic Classification", "Generate prediction logits and heatmaps")
        s5 = ("Report Generation & UI Telemetry", "Publish results to clinician dashboard")
    elif domain in ['iot_embedded', 'healthcare']:
        s1 = ("Sensor Initialization & Boot", "Power on transducers & calibrate ADC registers")
        s2 = ("Acquire Raw Telemetry Samples", "Read temperature, pulse, or environmental pins")
        d1 = ("Signal Noise &lt; Threshold?", "Clean", "Filter &amp; Recalibrate Sensor")
        s3 = ("Moving Average / Kalman Filter", "Smooth readings & compute physical metric units")
        d2 = ("Critical Alert Boundary Exceeded?", "Trigger Alarm", "Normal Log")
        s4 = ("Dispatch Emergency Notification", "Send SMS / Push notification via gateway")
        s5 = ("Cloud Database Sync & Sleep", "Publish MQTT packet and enter low-power sleep")
    elif domain in ['blockchain', 'cybersecurity']:
        s1 = ("Client Access & Handshake", "User connects wallet / node initiates handshake")
        s2 = ("Credential & Nonce Verification", "Validate cryptographic signature and timestamp")
        d1 = ("Signature Valid &amp; Unused Nonce?", "Verified", "Reject &amp; Flag Security Log")
        s3 = ("ZK-Proof Generation / Consensus", "Compile transaction into candidate block pool")
        d2 = ("Validator Consensus Reached?", "Committed", "Retry Fork Resolution")
        s4 = ("Execute Smart Contract State", "Update distributed ledger & sign transaction")
        s5 = ("Issue Cryptographic Receipt", "Notify client with immutable transaction hash")
    elif domain == 'robotics':
        s1 = ("Sensor Suite & Actuator Boot", "Calibrate LiDAR, IMU, and motor encoders")
        s2 = ("LiDAR Scan & Odometry Polling", "Acquire point cloud and update local position")
        d1 = ("Sensor Data Integrity Good?", "Nominal", "Trigger Failsafe Stop")
        s3 = ("Local Costmap & Path Update", "Compute collision risk and A* optimal route")
        d2 = ("Obstacle Detected in Safety Zone?", "Avoid Route", "Follow Path")
        s4 = ("Compute PID Motor Velocities", "Send PWM speed commands to left/right wheels")
        s5 = ("Waypoint Verification & Loop", "Check goal coordinates and repeat operational cycle")
    else:
        s1 = ("System Initialization", "Initialize services, verify config parameters")
        s2 = ("Ingest Request / Data Payload", "Buffer incoming operational transactions")
        d1 = ("Payload Passes Schema Check?", "Pass", "Return 400 Bad Request")
        s3 = ("Algorithmic Core Execution", "Execute main domain logic and optimization")
        d2 = ("Execution Successful?", "Proceed", "Handle Exception &amp; Log")
        s4 = ("State Update & Persistence", "Commit results to transactional database")
        s5 = ("Deliver Output & Ready State", "Transmit payload to client and await next event")

    # STRUCTURE VARIANT 1: Dual-Row Serpentine / S-Curve Flowchart
    if structure_variant == 1:
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="1000" height="560">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="{theme['arrow']}" />
    </marker>
    <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="{theme['arrow_alt']}" />
    </marker>
  </defs>
  <rect width="1000" height="560" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>

  <!-- ROW 1: Acquisition & Verification (Left to Right) -->
  <rect x="40" y="60" width="130" height="60" rx="30" fill="{theme['cards'][0][0]}" stroke="{theme['cards'][0][1]}" stroke-width="2"/>
  <text x="105" y="87" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="{theme['primary_dark']}" text-anchor="middle">START</text>
  <text x="105" y="105" font-family="'Times New Roman', serif" font-size="9" fill="{theme['primary']}" text-anchor="middle">{html.escape(s1[0][:18])}</text>
  <line x1="170" y1="90" x2="215" y2="90" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>

  <rect x="220" y="55" width="180" height="70" rx="5" fill="{theme['cards'][1][0]}" stroke="{theme['cards'][1][1]}" stroke-width="2"/>
  <rect x="220" y="55" width="180" height="24" rx="5" fill="{theme['cards'][1][2]}"/>
  <text x="310" y="71" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">{html.escape(s2[0][:24])}</text>
  <text x="310" y="98" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">{html.escape(s2[1][:26])}</text>
  <line x1="400" y1="90" x2="455" y2="90" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>

  <polygon points="530,50 600,90 530,130 460,90" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
  <text x="530" y="86" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#92400E" text-anchor="middle">Data Valid &amp;</text>
  <text x="530" y="101" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#92400E" text-anchor="middle">Verified?</text>
  <line x1="530" y1="50" x2="530" y2="25" stroke="{theme['arrow_alt']}" stroke-width="2"/>
  <line x1="530" y1="25" x2="310" y2="25" stroke="{theme['arrow_alt']}" stroke-width="2"/>
  <line x1="310" y1="25" x2="310" y2="50" stroke="{theme['arrow_alt']}" stroke-width="2" marker-end="url(#arrowRed)"/>
  <text x="420" y="20" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="{theme['arrow_alt']}">NO (Retry &amp; Cleanse)</text>
  <line x1="600" y1="90" x2="655" y2="90" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>
  <text x="615" y="82" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#16A34A">YES</text>

  <rect x="660" y="55" width="180" height="70" rx="5" fill="{theme['cards'][2][0]}" stroke="{theme['cards'][2][1]}" stroke-width="2"/>
  <rect x="660" y="55" width="180" height="24" rx="5" fill="{theme['cards'][2][2]}"/>
  <text x="750" y="71" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">{html.escape(s3[0][:24])}</text>
  <text x="750" y="98" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">{html.escape(s3[1][:26])}</text>

  <!-- S-Curve Connector down to Row 2 -->
  <path d="M 840 90 L 910 90 Q 940 90 940 160 Q 940 230 910 230 L 850 230" stroke="{theme['arrow']}" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>

  <!-- ROW 2: Processing, Inference & Output (Right to Left) -->
  <rect x="650" y="195" width="195" height="70" rx="5" fill="{theme['cards'][3][0]}" stroke="{theme['cards'][3][1]}" stroke-width="2"/>
  <rect x="650" y="195" width="195" height="24" rx="5" fill="{theme['cards'][3][2]}"/>
  <text x="747" y="211" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">Algorithmic Core</text>
  <text x="747" y="238" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">{html.escape(s4[0][:26])}</text>
  <line x1="650" y1="230" x2="595" y2="230" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>

  <polygon points="525,190 590,230 525,270 460,230" fill="{theme['cards'][2][0]}" stroke="{theme['cards'][2][1]}" stroke-width="2"/>
  <text x="525" y="226" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="{theme['primary_dark']}" text-anchor="middle">Confidence &gt;</text>
  <text x="525" y="241" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="{theme['primary_dark']}" text-anchor="middle">Threshold?</text>
  <line x1="460" y1="230" x2="405" y2="230" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>
  <text x="420" y="222" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#16A34A">YES</text>

  <rect x="220" y="195" width="180" height="70" rx="5" fill="{theme['cards'][4][0]}" stroke="{theme['cards'][4][1]}" stroke-width="2"/>
  <rect x="220" y="195" width="180" height="24" rx="5" fill="{theme['cards'][4][2]}"/>
  <text x="310" y="211" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">State &amp; Telemetry UI</text>
  <text x="310" y="238" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">{html.escape(s5[1][:26])}</text>
  <line x1="220" y1="230" x2="175" y2="230" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>

  <rect x="40" y="200" width="130" height="60" rx="30" fill="{theme['cards'][1][0]}" stroke="{theme['cards'][1][1]}" stroke-width="2"/>
  <text x="105" y="227" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="#064E3B" text-anchor="middle">COMPLETE</text>
  <text x="105" y="245" font-family="'Times New Roman', serif" font-size="9" fill="#059669" text-anchor="middle">Output Broadcast</text>

  <!-- Bottom Architecture Note -->
  <rect x="30" y="320" width="940" height="90" rx="6" fill="{theme['bus_bg']}" stroke="{theme['bus_border']}" stroke-width="1.5"/>
  <text x="500" y="352" font-family="'Times New Roman', serif" font-size="12.5" font-weight="bold" fill="{theme['primary_dark']}" text-anchor="middle">DUAL-ROW SERPENTINE EXECUTION ARCHITECTURE: REPRODUCIBLE IEEE PIPELINE</text>
  <text x="500" y="375" font-family="'Times New Roman', serif" font-size="11" fill="#334155" text-anchor="middle">Continuous S-curve topology enables localized validation and fault tolerance across distributed execution stages.</text>
  <text x="500" y="395" font-family="'Times New Roman', serif" font-size="10.5" font-style="italic" fill="#64748B" text-anchor="middle">Theme: {html.escape(theme['name'])} — Dynamic Architectural Flowchart for: {html.escape(clean_title)}</text>
  <text x="500" y="485" font-family="'Times New Roman', serif" font-size="11.5" font-style="italic" fill="#64748B" text-anchor="middle">Operational Pipeline &amp; Verification Flowchart — {html.escape(clean_title)}</text>
</svg>'''

    # STRUCTURE VARIANT 2: Parallel Dual-Stream Orchestration Pipeline
    if structure_variant == 2:
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="1000" height="560">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="{theme['arrow']}" />
    </marker>
  </defs>
  <rect width="1000" height="560" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>

  <!-- 1. Start Ingestion Pill -->
  <rect x="30" y="165" width="125" height="65" rx="32.5" fill="{theme['cards'][0][0]}" stroke="{theme['cards'][0][1]}" stroke-width="2"/>
  <text x="92" y="195" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="{theme['primary_dark']}" text-anchor="middle">START</text>
  <text x="92" y="213" font-family="'Times New Roman', serif" font-size="8.5" fill="{theme['primary']}" text-anchor="middle">{html.escape(s1[0][:16])}</text>

  <!-- Fork Lines to Parallel Streams -->
  <path d="M 155 197 L 205 197 L 205 110 L 235 110" stroke="{theme['arrow']}" stroke-width="2.2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 155 197 L 205 197 L 205 285 L 235 285" stroke="{theme['arrow']}" stroke-width="2.2" fill="none" marker-end="url(#arrow)"/>

  <!-- BRANCH A (Upper): Analytical / Deep Learning Stream -->
  <rect x="240" y="75" width="200" height="70" rx="5" fill="{theme['cards'][1][0]}" stroke="{theme['cards'][1][1]}" stroke-width="2"/>
  <rect x="240" y="75" width="200" height="24" rx="5" fill="{theme['cards'][1][2]}"/>
  <text x="340" y="91" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">TRACK A: Feature Pipeline</text>
  <text x="340" y="118" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">{html.escape(s3[0][:26])}</text>
  <line x1="440" y1="110" x2="485" y2="110" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>

  <rect x="490" y="75" width="180" height="70" rx="5" fill="{theme['cards'][2][0]}" stroke="{theme['cards'][2][1]}" stroke-width="2"/>
  <rect x="490" y="75" width="180" height="24" rx="5" fill="{theme['cards'][2][2]}"/>
  <text x="580" y="91" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">Inference Engine</text>
  <text x="580" y="118" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">{html.escape(s4[0][:24])}</text>

  <!-- BRANCH B (Lower): Quality, Safety & Sensor Validation Stream -->
  <rect x="240" y="250" width="200" height="70" rx="5" fill="{theme['cards'][3][0]}" stroke="{theme['cards'][3][1]}" stroke-width="2"/>
  <rect x="240" y="250" width="200" height="24" rx="5" fill="{theme['cards'][3][2]}"/>
  <text x="340" y="266" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">TRACK B: Security &amp; Quality</text>
  <text x="340" y="293" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">{html.escape(s2[0][:26])}</text>
  <line x1="440" y1="285" x2="485" y2="285" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>

  <rect x="490" y="250" width="180" height="70" rx="5" fill="{theme['cards'][4][0]}" stroke="{theme['cards'][4][1]}" stroke-width="2"/>
  <rect x="490" y="250" width="180" height="24" rx="5" fill="{theme['cards'][4][2]}"/>
  <text x="580" y="266" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">Boundary Guard</text>
  <text x="580" y="293" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">Safety &amp; Compliance Checks</text>

  <!-- Convergence to Central Fusion Decision Node -->
  <path d="M 670 110 L 710 110 L 710 165 L 735 197" stroke="{theme['arrow']}" stroke-width="2.2" fill="none"/>
  <path d="M 670 285 L 710 285 L 710 230 L 735 197" stroke="{theme['arrow']}" stroke-width="2.2" fill="none"/>

  <polygon points="765,160 830,197 765,235 700,197" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
  <text x="765" y="193" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#92400E" text-anchor="middle">Synchronized</text>
  <text x="765" y="208" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#92400E" text-anchor="middle">State Fusion?</text>
  <line x1="830" y1="197" x2="865" y2="197" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- Output Node -->
  <rect x="870" y="165" width="105" height="65" rx="32.5" fill="{theme['cards'][1][0]}" stroke="{theme['cards'][1][1]}" stroke-width="2"/>
  <text x="922" y="195" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="#064E3B" text-anchor="middle">SUCCESS</text>
  <text x="922" y="213" font-family="'Times New Roman', serif" font-size="8.5" fill="#059669" text-anchor="middle">Publish State</text>

  <!-- Bottom Architecture Note -->
  <rect x="30" y="360" width="940" height="75" rx="6" fill="{theme['bus_bg']}" stroke="{theme['bus_border']}" stroke-width="1.5"/>
  <text x="500" y="390" font-family="'Times New Roman', serif" font-size="12.5" font-weight="bold" fill="{theme['primary_dark']}" text-anchor="middle">PARALLEL MULTI-STREAM ORCHESTRATION PIPELINE — IEEE ARCHITECTURE</text>
  <text x="500" y="412" font-family="'Times New Roman', serif" font-size="10.5" fill="#334155" text-anchor="middle">Dual-channel concurrency separates data transformation from boundary safety verification before state commitment.</text>
  <text x="500" y="485" font-family="'Times New Roman', serif" font-size="11.5" font-style="italic" fill="#64748B" text-anchor="middle">Operational Pipeline &amp; Verification Flowchart — {html.escape(clean_title)}</text>
</svg>'''

    # STRUCTURE VARIANT 0: Horizontal Multi-Stage Pipeline with Exception Recovery Loop
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="1000" height="560">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="{theme['arrow']}" />
    </marker>
    <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="{theme['arrow_alt']}" />
    </marker>
  </defs>

  <!-- Canvas Border -->
  <rect width="1000" height="560" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>

  <!-- 1. Start Pill -->
  <rect x="30" y="75" width="125" height="65" rx="32.5" fill="{theme['cards'][0][0]}" stroke="{theme['cards'][0][1]}" stroke-width="2"/>
  <text x="92" y="103" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="{theme['primary_dark']}" text-anchor="middle">START</text>
  <text x="92" y="121" font-family="'Times New Roman', serif" font-size="9" fill="{theme['primary']}" text-anchor="middle">{html.escape(s1[0][:18])}</text>

  <!-- Arrow 1 -> 2 -->
  <line x1="155" y1="107" x2="185" y2="107" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- 2. Step 1 (Ingest) -->
  <rect x="190" y="70" width="145" height="75" rx="5" fill="{theme['cards'][1][0]}" stroke="{theme['cards'][1][1]}" stroke-width="2"/>
  <rect x="190" y="70" width="145" height="24" rx="5" fill="{theme['cards'][1][2]}"/>
  <text x="262" y="86" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">{html.escape(s2[0][:20])}</text>
  <text x="262" y="113" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">{html.escape(s2[1][:24])}</text>

  <!-- Arrow 2 -> 3 -->
  <line x1="335" y1="107" x2="365" y2="107" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- 3. Decision 1 (Diamond) -->
  <polygon points="435,65 495,107 435,150 375,107" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
  <text x="435" y="103" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#92400E" text-anchor="middle">Data Valid &amp;</text>
  <text x="435" y="117" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#92400E" text-anchor="middle">Verified?</text>

  <!-- Decision 1 Branch NO (Down to Exception) -->
  <line x1="435" y1="150" x2="435" y2="205" stroke="{theme['arrow_alt']}" stroke-width="2" marker-end="url(#arrowRed)"/>
  <text x="445" y="175" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="{theme['arrow_alt']}">NO</text>
  <rect x="365" y="210" width="140" height="48" rx="4" fill="#FEF2F2" stroke="{theme['arrow_alt']}" stroke-width="1.8"/>
  <text x="435" y="230" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#991B1B" text-anchor="middle">Exception Handler</text>
  <text x="435" y="246" font-family="'Times New Roman', serif" font-size="8.5" fill="#B91C1C" text-anchor="middle">{html.escape(d1[2][:22])}</text>

  <!-- Decision 1 Branch YES (To 4) -->
  <line x1="495" y1="107" x2="525" y2="107" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>
  <text x="505" y="99" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#16A34A">YES</text>

  <!-- 4. Step 2 (Process) -->
  <rect x="530" y="70" width="145" height="75" rx="5" fill="{theme['cards'][2][0]}" stroke="{theme['cards'][2][1]}" stroke-width="2"/>
  <rect x="530" y="70" width="145" height="24" rx="5" fill="{theme['cards'][2][2]}"/>
  <text x="602" y="86" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#0F172A" text-anchor="middle">{html.escape(s3[0][:20])}</text>
  <text x="602" y="113" font-family="'Times New Roman', serif" font-size="9.5" fill="#334155" text-anchor="middle">{html.escape(s3[1][:24])}</text>

  <!-- Arrow 4 -> 5 -->
  <line x1="675" y1="107" x2="705" y2="107" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- 5. Decision 2 (Diamond) -->
  <polygon points="770,65 830,107 770,150 710,107" fill="{theme['cards'][3][0]}" stroke="{theme['cards'][3][1]}" stroke-width="2"/>
  <text x="770" y="103" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="{theme['primary_dark']}" text-anchor="middle">Confidence</text>
  <text x="770" y="117" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="{theme['primary_dark']}" text-anchor="middle">&gt; 85% Metric?</text>

  <!-- Decision 2 Branch Secondary (Down) -->
  <line x1="770" y1="150" x2="770" y2="205" stroke="{theme['arrow']}" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="780" y="175" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#4B5563">ALT</text>
  <rect x="700" y="210" width="140" height="48" rx="4" fill="#F3F4F6" stroke="#6B7280" stroke-width="1.8"/>
  <text x="770" y="230" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" fill="#374151" text-anchor="middle">Ensemble Fallback</text>
  <text x="770" y="246" font-family="'Times New Roman', serif" font-size="8.5" fill="#4B5563" text-anchor="middle">{html.escape(d2[2][:22])}</text>

  <!-- Decision 2 Branch YES (To 6) -->
  <line x1="830" y1="107" x2="855" y2="107" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- 6. Step 3 (Outcome) -->
  <rect x="860" y="70" width="115" height="75" rx="5" fill="{theme['cards'][0][0]}" stroke="{theme['cards'][0][1]}" stroke-width="2"/>
  <text x="917" y="100" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" fill="{theme['primary_dark']}" text-anchor="middle">EXECUTE</text>
  <text x="917" y="120" font-family="'Times New Roman', serif" font-size="8.5" fill="{theme['primary']}" text-anchor="middle">{html.escape(s4[0][:16])}</text>

  <!-- Second Row Integration Bus: Connecting 6 & Alternatives to Terminal State -->
  <path d="M 917 145 L 917 310 L 610 310" stroke="{theme['arrow']}" stroke-width="2.2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 770 258 L 770 310 L 610 310" stroke="{theme['arrow']}" stroke-width="1.8" fill="none"/>

  <!-- 7. Database Persistence & Log -->
  <rect x="420" y="285" width="185" height="55" rx="6" fill="{theme['cards'][4][0]}" stroke="{theme['cards'][4][1]}" stroke-width="2"/>
  <text x="512" y="308" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="#0F172A" text-anchor="middle">AUDIT &amp; TELEMETRY LOG</text>
  <text x="512" y="326" font-family="'Times New Roman', serif" font-size="9" fill="#334155" text-anchor="middle">{html.escape(s5[1][:30])}</text>

  <!-- Arrow to Terminal Finish -->
  <line x1="420" y1="312" x2="350" y2="312" stroke="{theme['arrow']}" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- 8. Finish Pill -->
  <rect x="220" y="285" width="125" height="55" rx="27.5" fill="{theme['cards'][1][0]}" stroke="{theme['cards'][1][1]}" stroke-width="2"/>
  <text x="282" y="310" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="#065F46" text-anchor="middle">STANDBY / END</text>
  <text x="282" y="326" font-family="'Times New Roman', serif" font-size="8.5" fill="#047857" text-anchor="middle">Await Next Trigger</text>

  <!-- Bottom Explanatory Banner -->
  <rect x="30" y="370" width="940" height="54" rx="4" fill="{theme['bus_bg']}" stroke="{theme['bus_border']}" stroke-width="1.2"/>
  <text x="500" y="394" font-family="'Times New Roman', serif" font-size="12" font-weight="bold" fill="#1E293B" text-anchor="middle">Operational State Flow: Input Acquisition → Deterministic Validation → Core Processing → Safety Verification → Log &amp; UI</text>
  <text x="500" y="412" font-family="'Times New Roman', serif" font-size="10.5" font-style="italic" fill="#64748B" text-anchor="middle">Theme: {html.escape(theme['name'])} — Complete cyclic operational model with error mitigation branches designed for IEEE Capstone compliance.</text>

  <!-- Footer Verification -->
  <text x="500" y="485" font-family="'Times New Roman', serif" font-size="11.5" font-style="italic" fill="#64748B" text-anchor="middle">Operational Pipeline &amp; Verification Flowchart — {html.escape(clean_title)}</text>
</svg>'''


# ---------------------------------------------------------------------------
# Figure 4.1: Implementation Architecture & Integration Schematic (SVG)
# ---------------------------------------------------------------------------

def generate_figure_4_1_svg(project_title, caption=None, placeholder=None):
    clean_title = (project_title or "Advanced Engineering Capstone System").strip()
    domain = detect_domain(clean_title)
    theme = get_report_theme(clean_title)

    # 4 distinct horizontal tiers tailored to project domain
    if domain in ['computer_vision', 'machine_learning', 'nlp_ai']:
        t1 = ("CLIENT & DATA INGESTION TIER", ["High-Res Cameras / File Upload", "React 19 / Vite Web Frontend", "Axios Client & WebSocket Stream"])
        t2 = ("API GATEWAY & PRE-PROCESSING TIER", ["FastAPI REST Microservice (Python 3.8+)", "OpenCV 4.8 / Pillow Image Normalizer", "JWT Bearer Token Security Validator"])
        t3 = ("COMPUTATIONAL INFERENCE CORE", ["PyTorch 2.2 / torchvision Backbone", "CUDA 12.2 GPU Acceleration", "TensorRT / ONNX Optimized Runtime"])
        t4 = ("DATABASE, STORAGE & DEPLOYMENT", ["PostgreSQL 15 (Relational Metadata)", "Redis 7 (In-Memory Inference Cache)", "Docker Container & NGINX Reverse Proxy"])
    elif domain in ['iot_embedded', 'healthcare']:
        t1 = ("SENSORY & EDGE HARDWARE TIER", ["MAX30102 / DHT22 / Soil Moisture Sensors", "ESP32-WROOM-32 Microcontroller", "FreeRTOS Dual-Core Real-Time Task Scheduler"])
        t2 = ("COMMUNICATION & PROTOCOL TIER", ["MQTT 5.0 Broker (Eclipse Mosquitto)", "TLS 1.3 End-to-End Encryption", "HTTP/2 REST Telemetry Ingress Gateway"])
        t3 = ("APPLICATION & ANALYTICS SERVICE", ["Node.js / Express Telemetry Dispatcher", "Automated Threshold Evaluation Daemon", "Twilio / Firebase Alerting Push Service"])
        t4 = ("STORAGE & MONITORING DASHBOARD", ["InfluxDB 2.7 Time-Series Metric Database", "Grafana / React Live Telemetry Dashboard", "Docker Compose Isolated Deployment"])
    elif domain in ['blockchain', 'cybersecurity']:
        t1 = ("USER & CLIENT WALLET INTERFACE", ["Next.js / Ethers.js Web3 DApp", "MetaMask & Hardware Key Authentication", "Client-Side Zero-Knowledge Prover"])
        t2 = ("JSON-RPC & PROXY ROUTER TIER", ["Infura / Alchemy Dedicated RPC Nodes", "Rate-Limiting API Gateway (NGINX)", "Smart Contract Event Listener"])
        t3 = ("DECENTRALIZED CONSENSUS CORE", ["Solidity 0.8.24 Smart Contracts", "EVM-Compatible Blockchain Network", "Automated Security Assertion Engine"])
        t4 = ("DECENTRALIZED STORAGE & AUDIT", ["IPFS Pinning Cluster (Encrypted Data)", "SubQuery / The Graph Indexing Node", "Hardhat & Slither Verification Toolchain"])
    else:
        t1 = ("PRESENTATION & INTERFACE TIER", ["Modern Single Page Web Client", "Component UI Library (Radix / Tailwind)", "Secure HTTPS Client Session Manager"])
        t2 = ("API ROUTING & SECURITY GATEWAY", ["Reverse Proxy & Load Balancer", "Authentication & CORS Security Guard", "Input Validation & Sanitization Middleware"])
        t3 = ("APPLICATION & BUSINESS LOGIC", ["Core Computational Processing Engine", "Asynchronous Task Queue (Celery/Bull)", "State Machine & Analytical Optimization"])
        t4 = ("PERSISTENCE & DEPLOYMENT TOOLCHAIN", ["Primary Relational Database Engine", "High-Performance In-Memory Cache", "CI/CD Pipeline & Containerized Runtime"])

    tiers = [t1, t2, t3, t4]
    tier_w = 215
    tier_h = 265
    gap = 25
    start_x = 30
    y_pos = 45

    cards_svg = []
    for i, (t_name, items) in enumerate(tiers):
        bg_c, border_c = theme["cards"][i % len(theme["cards"])][:2]
        x = start_x + i * (tier_w + gap)
        items_svg = "\n".join([
            f'''<rect x="{x + 12}" y="{y_pos + 58 + idx * 64}" width="{tier_w - 24}" height="50" rx="4" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
            <text x="{x + 20}" y="{y_pos + 88 + idx * 64}" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" fill="#0F172A">{html.escape(item[:26])}</text>'''
            for idx, item in enumerate(items)
        ])

        bus_arrow = ""
        if i < len(tiers) - 1:
            ax = x + tier_w
            ay = y_pos + tier_h // 2
            bus_arrow = f'''
            <line x1="{ax}" y1="{ay - 15}" x2="{ax + gap - 6}" y2="{ay - 15}" stroke="{theme['arrow']}" stroke-width="2" marker-end="url(#arrow)" />
            <line x1="{ax + gap - 6}" y1="{ay + 15}" x2="{ax}" y2="{ay + 15}" stroke="{theme['arrow']}" stroke-width="2" marker-end="url(#arrow)" />
            <text x="{ax + gap//2}" y="{ay + 3}" font-family="'Times New Roman', serif" font-size="8" fill="#64748B" text-anchor="middle">BUS</text>
            '''

        cards_svg.append(f'''
        <g id="tier_{i+1}">
          <rect x="{x}" y="{y_pos}" width="{tier_w}" height="{tier_h}" rx="6" fill="{bg_c}" stroke="{border_c}" stroke-width="2"/>
          <rect x="{x}" y="{y_pos}" width="{tier_w}" height="42" rx="6" fill="{border_c}"/>
          <rect x="{x}" y="{y_pos + 32}" width="{tier_w}" height="10" fill="{border_c}"/>
          <text x="{x + tier_w//2}" y="{y_pos + 26}" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" fill="#FFFFFF" text-anchor="middle">{html.escape(t_name[:28])}</text>
          {items_svg}
          {bus_arrow}
        </g>
        ''')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="1000" height="560">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="{theme['arrow']}" />
    </marker>
  </defs>

  <!-- Outer Border -->
  <rect width="1000" height="560" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>

  <!-- 4 Component Tiers -->
  {"".join(cards_svg)}

  <!-- Inter-tier Integration Bus Summary -->
  <rect x="30" y="335" width="935" height="95" rx="6" fill="{theme['bus_bg']}" stroke="{theme['bus_border']}" stroke-width="1.8"/>
  <text x="500" y="362" font-family="'Times New Roman', serif" font-size="12.5" font-weight="bold" fill="#0F172A" text-anchor="middle">END-TO-END SYSTEM TOOLCHAIN &amp; HARDWARE/SOFTWARE INTEGRATION TOPOLOGY</text>
  <text x="500" y="385" font-family="'Times New Roman', serif" font-size="11" fill="#334155" text-anchor="middle">Seamless interoperability via bidirectional JSON-RPC / RESTful endpoints, secure token auth, and low-latency serialization.</text>
  <text x="500" y="405" font-family="'Times New Roman', serif" font-size="10.5" font-style="italic" fill="#64748B" text-anchor="middle">Theme: {html.escape(theme['name'])} — Docker container orchestration ensures deterministic deployment reproducibility.</text>

  <!-- Academic Footer -->
  <text x="500" y="485" font-family="'Times New Roman', serif" font-size="11.5" font-style="italic" fill="#475569" text-anchor="middle">Engineering Implementation Architecture Schematic conforming to IEEE Standards</text>
</svg>'''
    return svg_content


# ---------------------------------------------------------------------------
# Figure 4.2: Experimental Results & Benchmark Curves (Matplotlib Graph)
# ---------------------------------------------------------------------------

def generate_figure_4_2_matplotlib(project_title, caption=None, placeholder=None):
    clean_title = (project_title or "Advanced Engineering Capstone System").strip()
    domain = detect_domain(clean_title)
    theme = get_report_theme(clean_title)
    seed = get_project_seed(clean_title)

    # Vary markers and styles by report seed
    marker_pairs = [('o', 's', '^'), ('s', 'o', 'D'), ('^', 'v', 's'), ('D', 's', 'o')]
    m_prop, m_val, m_base = marker_pairs[seed % len(marker_pairs)]

    # Setup publication-quality IEEE figure style
    plt.close('all')
    fig, ax = plt.subplots(figsize=(10, 5.6), dpi=200, facecolor='#FFFFFF')
    ax.set_facecolor('#FAFAFA')

    # Domain-specific metrics and data curves
    if domain in ['computer_vision', 'machine_learning', 'nlp_ai', 'healthcare']:
        epochs = np.arange(1, 51)
        # Proposed system: Rapid convergence to 96.8%
        np.random.seed(seed % 1000)
        proposed_acc = 62.0 + 34.8 * (1.0 - np.exp(-epochs / 7.5)) + np.random.normal(0, 0.35, len(epochs))
        proposed_acc = np.clip(proposed_acc, 60.0, 97.2)
        # Validation accuracy with slight variance
        proposed_val = 58.0 + 37.4 * (1.0 - np.exp(-epochs / 8.2)) + np.random.normal(0, 0.45, len(epochs))
        proposed_val = np.clip(proposed_val, 55.0, 96.4)
        # Baseline model ceiling at 83.5%
        baseline_acc = 50.0 + 33.5 * (1.0 - np.exp(-epochs / 12.0)) + np.random.normal(0, 0.55, len(epochs))
        baseline_acc = np.clip(baseline_acc, 48.0, 84.2)

        # Plot curves with report theme colors & confidence band
        ax.plot(epochs, proposed_acc, color=theme['chart_line'], linewidth=2.4, marker=m_prop, markevery=5, markersize=5, label=f'Proposed Architecture (Train Acc) — {theme["name"]}')
        ax.plot(epochs, proposed_val, color=theme['secondary'], linewidth=2.2, linestyle='--', marker=m_val, markevery=5, markersize=5, label='Proposed Architecture (Validation Acc)')
        ax.plot(epochs, baseline_acc, color=theme['chart_line_alt'], linewidth=2.0, linestyle=':', marker=m_base, markevery=5, markersize=5, label='Standard Conventional Baseline Model')
        ax.fill_between(epochs, proposed_val - 1.2, proposed_val + 1.2, color=theme['fill_color'], alpha=0.35, label='Convergence Stability Bound (±1σ)')

        # Highlight optimal point
        best_epoch = int(np.argmax(proposed_val)) + 1
        best_val = proposed_val[best_epoch - 1]
        ax.scatter([best_epoch], [best_val], color=theme['accent'], s=95, zorder=5, edgecolors=theme['primary_dark'], linewidth=1.5)
        ax.annotate(f'Optimal Convergence: {best_val:.1f}%\n(Epoch {best_epoch})',
                    xy=(best_epoch, best_val), xytext=(best_epoch - 13, best_val - 8.5),
                    arrowprops=dict(facecolor=theme['primary_dark'], shrink=0.08, width=1.5, headwidth=6),
                    fontsize=10, fontfamily='serif', fontweight='bold',
                    bbox=dict(boxstyle='round,pad=0.4', facecolor='#FEF3C7', edgecolor=theme['accent'], alpha=0.92))

        ax.set_xlabel('Training Iterations / Epochs', fontsize=12, fontweight='bold', fontfamily='serif', labelpad=8)
        ax.set_ylabel('Model Accuracy / Precision (%)', fontsize=12, fontweight='bold', fontfamily='serif', labelpad=8)
        ax.set_ylim(45, 102)
        ax.set_xlim(1, 50)
        subtitle = "Empirical Validation Accuracy & Loss Convergence vs Conventional Baseline"

    elif domain in ['iot_embedded', 'robotics']:
        iterations = np.arange(1, 41)
        np.random.seed(seed % 1000)
        proposed_acc = 82.0 + 16.5 * (1.0 - np.exp(-iterations / 6.0)) + np.random.normal(0, 0.25, len(iterations))
        proposed_acc = np.clip(proposed_acc, 80.0, 99.1)
        baseline_acc = 74.0 + 13.0 * (1.0 - np.exp(-iterations / 10.0)) + np.random.normal(0, 0.45, len(iterations))
        baseline_acc = np.clip(baseline_acc, 70.0, 87.5)

        ax.plot(iterations, proposed_acc, color=theme['chart_line'], linewidth=2.4, marker=m_prop, markevery=3, markersize=5, label=f'Proposed Telemetry Filter — {theme["name"]}')
        ax.plot(iterations, baseline_acc, color=theme['chart_line_alt'], linewidth=2.0, linestyle='--', marker=m_base, markevery=3, markersize=5, label='Standard Raw Transducer Sampling')
        ax.fill_between(iterations, baseline_acc, proposed_acc, color=theme['fill_color'], alpha=0.3, label='Noise Filtration Advantage Margin')

        ax.set_xlabel('Operational Stress Cycles / Test Batch', fontsize=12, fontweight='bold', fontfamily='serif', labelpad=8)
        ax.set_ylabel('Data Fidelity & Signal Accuracy (%)', fontsize=12, fontweight='bold', fontfamily='serif', labelpad=8)
        ax.set_ylim(65, 103)
        ax.set_xlim(1, 40)
        subtitle = "Sensor Telemetry Fidelity & Noise Filtration over Continuous Operation"

    else:
        test_runs = np.arange(1, 31)
        np.random.seed(seed % 1000)
        proposed = 75.0 + 23.5 * (1.0 - np.exp(-test_runs / 5.0)) + np.random.normal(0, 0.3, len(test_runs))
        baseline = 65.0 + 18.0 * (1.0 - np.exp(-test_runs / 8.0)) + np.random.normal(0, 0.5, len(test_runs))

        ax.plot(test_runs, proposed, color=theme['chart_line'], linewidth=2.4, marker=m_prop, markevery=2, markersize=5, label=f'Proposed Optimized Architecture — {theme["name"]}')
        ax.plot(test_runs, baseline, color=theme['chart_line_alt'], linewidth=2.0, linestyle='--', marker=m_base, markevery=2, markersize=5, label='Conventional Baseline Standard')
        ax.fill_between(test_runs, baseline, proposed, color=theme['fill_color'], alpha=0.3, label='Fulfillment Performance Margin')

        ax.set_xlabel('Benchmark Execution Round', fontsize=12, fontweight='bold', fontfamily='serif', labelpad=8)
        ax.set_ylabel('Objective Target Metric / Efficiency (%)', fontsize=12, fontweight='bold', fontfamily='serif', labelpad=8)
        ax.set_ylim(60, 102)
        ax.set_xlim(1, 30)
        subtitle = "System Objective Fulfillment & Quantitative Performance Convergence"

    # Styling
    ax.grid(True, linestyle='--', alpha=0.45, color='#94A3B8')
    ax.legend(loc='lower right', frameon=True, framealpha=0.92, facecolor='#FFFFFF', edgecolor='#CBD5E1', fontsize=9.5, prop={'family': 'serif'})
    ax.set_title(subtitle, fontsize=11.5, fontfamily='serif', color='#1E293B', pad=10)

    plt.tight_layout()

    # Save to base64 PNG
    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=200, bbox_inches='tight')
    plt.close(fig)
    buf.seek(0)
    b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    return f"data:image/png;base64,{b64}"


# ---------------------------------------------------------------------------
# Figure 4.3: Latency & Throughput Evaluation Under Operational Load (Matplotlib)
# ---------------------------------------------------------------------------

def generate_figure_4_3_matplotlib(project_title, caption=None, placeholder=None):
    clean_title = (project_title or "Advanced Engineering Capstone System").strip()
    theme = get_report_theme(clean_title)
    seed = get_project_seed(clean_title)

    plt.close('all')
    fig, ax1 = plt.subplots(figsize=(10, 5.6), dpi=200, facecolor='#FFFFFF')
    ax1.set_facecolor('#FAFAFA')

    # Markers by seed
    markers = [('o', 's', '^'), ('D', 'X', 'o'), ('^', 'v', 's'), ('s', 'P', '^')]
    m1, m2, m3 = markers[seed % len(markers)]

    # Workload levels (Concurrent Requests / Transactions per sec)
    load = np.array([50, 100, 200, 300, 400, 500, 600, 750, 900, 1000])

    np.random.seed(seed % 1000)
    proposed_latency = 18.0 + 8.5 * (load / 250.0)**1.3 + np.random.normal(0, 0.9, len(load))
    baseline_latency = 32.0 + 26.0 * (load / 220.0)**1.95 + np.random.normal(0, 2.5, len(load))
    proposed_throughput = load * np.clip(1.0 - (load / 4500.0)**2, 0.75, 1.0)

    color_prop = theme["chart_line"]
    color_base = theme["chart_line_alt"]
    color_tp = theme["secondary"]
    fill_col = theme["fill_color"]

    l1 = ax1.plot(load, proposed_latency, color=color_prop, linewidth=2.5, marker=m1, markersize=6, label=f'Proposed System ({theme["name"]}): Latency (ms)')
    l2 = ax1.plot(load, baseline_latency, color=color_base, linewidth=2.2, linestyle='--', marker=m2, markersize=6, label='Conventional Baseline: Latency (ms)')
    
    # Fill between to show stability margin
    ax1.fill_between(load, proposed_latency, baseline_latency, color=fill_col, alpha=0.35, label='Latency Advantage Region')

    ax1.set_xlabel('Concurrent Operational Workload (Requests / Transducers / Sec)', fontsize=11.5, fontweight='bold', fontfamily='serif', labelpad=8)
    ax1.set_ylabel('End-to-End System Response Latency (ms)', fontsize=11.5, fontweight='bold', fontfamily='serif', color='#0F172A', labelpad=8)
    ax1.tick_params(axis='y', labelcolor='#0F172A')
    ax1.set_xlim(40, 1020)
    ax1.set_ylim(0, max(np.max(baseline_latency) * 1.15, 300))
    ax1.grid(True, linestyle='--', alpha=0.45, color='#94A3B8')

    # Secondary Axis: Throughput
    ax2 = ax1.twinx()
    l3 = ax2.plot(load, proposed_throughput, color=color_tp, linewidth=2.2, linestyle='-.', marker=m3, markersize=6, label='Proposed Sustained Throughput (req/s)')
    ax2.set_ylabel('Throughput Capacity (Transactions / sec)', fontsize=11.5, fontweight='bold', fontfamily='serif', color=color_tp, labelpad=8)
    ax2.tick_params(axis='y', labelcolor=color_tp)
    ax2.set_ylim(0, 1150)

    # Annotate stability limit
    ax1.annotate('Peak Load Saturation Point\n(Sub-50ms Latency Sustained)',
                xy=(750, proposed_latency[7]), xytext=(480, proposed_latency[7] + 80),
                arrowprops=dict(facecolor=theme['primary_dark'], shrink=0.08, width=1.5, headwidth=6),
                fontsize=9.5, fontfamily='serif', fontweight='bold',
                bbox=dict(boxstyle='round,pad=0.4', facecolor='#FEF3C7', edgecolor=theme['accent'], alpha=0.9))

    # Combined Legend
    lines = l1 + l2 + l3
    labels = [l.get_label() for l in lines]
    ax1.legend(lines, labels, loc='upper left', frameon=True, framealpha=0.92, facecolor='#FFFFFF', edgecolor='#CBD5E1', fontsize=9.0, prop={'family': 'serif'})

    ax1.set_title("Operational Stress Benchmarking: Response Latency (ms) and Throughput Under Scaled Concurrency", fontsize=11, fontfamily='serif', color='#1E293B', pad=10)

    plt.tight_layout()

    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=200, bbox_inches='tight')
    plt.close(fig)
    buf.seek(0)
    b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    return f"data:image/png;base64,{b64}"


# ---------------------------------------------------------------------------
# Main CLI & Dispatcher
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Academic Report Figure Generator")
    parser.add_argument("--type", choices=["3.1", "3.2", "4.1", "4.2", "4.3", "all"], required=True, help="Figure number to generate")
    parser.add_argument("--title", required=True, help="User Project Title")
    parser.add_argument("--caption", default=None, help="Custom caption")
    parser.add_argument("--placeholder", default=None, help="Custom description")
    parser.add_argument("--output", default=None, help="Output directory or file path")
    parser.add_argument("--json", action="store_true", help="Output JSON result to stdout")
    args = parser.parse_args()

    project_title = args.title.strip()

    if args.type == "all":
        results = {
            "3.1": generate_figure_3_1_svg(project_title, args.caption, args.placeholder),
            "3.2": generate_figure_3_2_svg(project_title, args.caption, args.placeholder),
            "4.1": generate_figure_4_1_svg(project_title, args.caption, args.placeholder),
            "4.2": generate_figure_4_2_matplotlib(project_title, args.caption, args.placeholder),
            "4.3": generate_figure_4_3_matplotlib(project_title, args.caption, args.placeholder),
        }
        if args.output:
            os.makedirs(args.output, exist_ok=True)
            with open(os.path.join(args.output, "Figure_3_1_System_Architecture.svg"), "w", encoding="utf-8") as f:
                f.write(results["3.1"])
            with open(os.path.join(args.output, "Figure_3_2_Operational_Flowchart.svg"), "w", encoding="utf-8") as f:
                f.write(results["3.2"])
            with open(os.path.join(args.output, "Figure_4_1_Implementation_Architecture.svg"), "w", encoding="utf-8") as f:
                f.write(results["4.1"])
            with open(os.path.join(args.output, "Figure_4_2_Experimental_Results.png"), "wb") as f:
                f.write(base64.b64decode(results["4.2"].split(",")[1]))
            with open(os.path.join(args.output, "Figure_4_3_Latency_Throughput_Evaluation.png"), "wb") as f:
                f.write(base64.b64decode(results["4.3"].split(",")[1]))
            print(f"Successfully saved all 5 figures to {args.output}")

        if args.json:
            print(json.dumps({
                "status": "ok",
                "projectTitle": project_title,
                "figures": {
                    "3.1": {"type": "svg", "data": f"data:image/svg+xml;base64,{base64.b64encode(results['3.1'].encode('utf-8')).decode('utf-8')}"},
                    "3.2": {"type": "svg", "data": f"data:image/svg+xml;base64,{base64.b64encode(results['3.2'].encode('utf-8')).decode('utf-8')}"},
                    "4.1": {"type": "svg", "data": f"data:image/svg+xml;base64,{base64.b64encode(results['4.1'].encode('utf-8')).decode('utf-8')}"},
                    "4.2": {"type": "matplotlib_png", "data": results["4.2"]},
                    "4.3": {"type": "matplotlib_png", "data": results["4.3"]},
                }
            }))
        return

    # Single figure generation
    if args.type == "3.1":
        raw_svg = generate_figure_3_1_svg(project_title, args.caption, args.placeholder)
        b64_data = f"data:image/svg+xml;base64,{base64.b64encode(raw_svg.encode('utf-8')).decode('utf-8')}"
        out_format = "svg"
    elif args.type == "3.2":
        raw_svg = generate_figure_3_2_svg(project_title, args.caption, args.placeholder)
        b64_data = f"data:image/svg+xml;base64,{base64.b64encode(raw_svg.encode('utf-8')).decode('utf-8')}"
        out_format = "svg"
    elif args.type == "4.1":
        raw_svg = generate_figure_4_1_svg(project_title, args.caption, args.placeholder)
        b64_data = f"data:image/svg+xml;base64,{base64.b64encode(raw_svg.encode('utf-8')).decode('utf-8')}"
        out_format = "svg"
    elif args.type == "4.2":
        b64_data = generate_figure_4_2_matplotlib(project_title, args.caption, args.placeholder)
        out_format = "matplotlib_png"
    elif args.type == "4.3":
        b64_data = generate_figure_4_3_matplotlib(project_title, args.caption, args.placeholder)
        out_format = "matplotlib_png"

    if args.output:
        if out_format == "svg":
            with open(args.output, "w", encoding="utf-8") as f:
                f.write(raw_svg)
        else:
            with open(args.output, "wb") as f:
                f.write(base64.b64decode(b64_data.split(",")[1]))
        print(f"Saved {args.type} to {args.output}")

    if args.json:
        print(json.dumps({
            "status": "ok",
            "figure": args.type,
            "format": out_format,
            "data": b64_data
        }))
    elif not args.output:
        print(b64_data)


if __name__ == "__main__":
    main()
