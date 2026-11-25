import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";
import {
  type FigureType,
  determineFigureType,
  generateFigure31Svg,
  generateFigure32Svg,
  generateFigure41Svg,
  generateFigure42SvgFallback,
  generateFigure43SvgFallback,
} from "./figure-svg";

export {
  type FigureType,
  determineFigureType,
  generateFigure31Svg,
  generateFigure32Svg,
  generateFigure41Svg,
  generateFigure42SvgFallback,
  generateFigure43SvgFallback,
};

const execFileAsync = promisify(execFile);

export interface GenerateFigureParams {
  caption: string;
  placeholder?: string | undefined;
  projectTitle: string;
}

export interface GenerateFigureResult {
  imageData: string;
  format: "svg" | "matplotlib_png";
  source: string;
  figureType: FigureType;
  error: string | null;
}

let isMatplotlibAvailable: boolean | null = null;
async function hasMatplotlib(): Promise<boolean> {
  if (isMatplotlibAvailable !== null) return isMatplotlibAvailable;
  try {
    await execFileAsync("python", ["-c", "import matplotlib"], { timeout: 2000 });
    isMatplotlibAvailable = true;
  } catch {
    isMatplotlibAvailable = false;
  }
  return isMatplotlibAvailable;
}

function svgToDataUrl(svg: string): string {
  try {
    if (typeof Buffer !== "undefined") {
      return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
    }
  } catch {
    // continue
  }
  try {
    const encoded = encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    );
    return `data:image/svg+xml;base64,${btoa(encoded)}`;
  } catch {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
}

/**
 * Executes the Python matplotlib generator script.
 */
async function runPythonMatplotlib(
  figType: "4.2" | "4.3",
  projectTitle: string,
  caption?: string,
  placeholder?: string,
): Promise<string | null> {
  try {
    const available = await hasMatplotlib();
    if (!available) {
      return null;
    }

    const scriptPath = path.resolve(process.cwd(), "scripts", "generate_figures.py");
    if (!fs.existsSync(scriptPath)) {
      return null;
    }

    const args = [
      scriptPath,
      "--type",
      figType,
      "--title",
      projectTitle,
      "--json",
    ];
    if (caption) args.push("--caption", caption);
    if (placeholder) args.push("--placeholder", placeholder);

    const { stdout } = await execFileAsync("python", args, { timeout: 15000 });
    const parsed = JSON.parse(stdout) as { status: string; data: string };
    if (parsed.status === "ok" && parsed.data && parsed.data.startsWith("data:image/")) {
      return parsed.data;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Main figure generation orchestrator:
 * - Figure 3.1: SVG System Architecture Diagram
 * - Figure 3.2: SVG Operational Flowchart
 * - Figure 4.1: SVG Implementation Architecture
 * - Figure 4.2: Matplotlib Graph (Experimental Benchmark)
 * - Figure 4.3: Matplotlib Graph (Latency & Throughput Evaluation)
 */
export async function generateFigureForProject(params: GenerateFigureParams): Promise<GenerateFigureResult> {
  const figType = determineFigureType(params.caption, params.placeholder);
  const cleanTitle = (params.projectTitle || "Capstone Project").trim();

  // Figure 4.2 or 4.3: Use Matplotlib in Python
  if (figType === "4.2") {
    const mplData = await runPythonMatplotlib("4.2", cleanTitle, params.caption, params.placeholder);
    if (mplData) {
      return {
        imageData: mplData,
        format: "matplotlib_png",
        source: "Python Matplotlib (Scientific Publication Plot)",
        figureType: "4.2",
        error: null,
      };
    }
    // Fallback to high-precision SVG plot if Python unavailable
    const rawSvg = generateFigure42SvgFallback(cleanTitle, params.caption);
    return {
      imageData: svgToDataUrl(rawSvg),
      format: "svg",
      source: "IEEE Standard Benchmark Plot (SVG)",
      figureType: "4.2",
      error: null,
    };
  }

  if (figType === "4.3") {
    const mplData = await runPythonMatplotlib("4.3", cleanTitle, params.caption, params.placeholder);
    if (mplData) {
      return {
        imageData: mplData,
        format: "matplotlib_png",
        source: "Python Matplotlib (Dual-Axis Stress Benchmark)",
        figureType: "4.3",
        error: null,
      };
    }
    // Fallback to high-precision SVG plot if Python unavailable
    const rawSvg = generateFigure43SvgFallback(cleanTitle, params.caption);
    return {
      imageData: svgToDataUrl(rawSvg),
      format: "svg",
      source: "IEEE Standard Latency Evaluation (SVG)",
      figureType: "4.3",
      error: null,
    };
  }

  // Figure 3.1: System Architecture Diagram (SVG)
  if (figType === "3.1") {
    const rawSvg = generateFigure31Svg(cleanTitle, params.caption);
    return {
      imageData: svgToDataUrl(rawSvg),
      format: "svg",
      source: "IEEE Standard System Architecture (SVG)",
      figureType: "3.1",
      error: null,
    };
  }

  // Figure 3.2: Operational Flowchart (SVG)
  if (figType === "3.2") {
    const rawSvg = generateFigure32Svg(cleanTitle, params.caption);
    return {
      imageData: svgToDataUrl(rawSvg),
      format: "svg",
      source: "IEEE Standard Operational Flowchart (SVG)",
      figureType: "3.2",
      error: null,
    };
  }

  // Figure 4.1: Implementation Architecture Schematic (SVG)
  if (figType === "4.1") {
    const rawSvg = generateFigure41Svg(cleanTitle, params.caption);
    return {
      imageData: svgToDataUrl(rawSvg),
      format: "svg",
      source: "IEEE Standard Component Integration Schematic (SVG)",
      figureType: "4.1",
      error: null,
    };
  }

  // General plot heuristic -> Try matplotlib, fallback to SVG
  if (figType === "plot") {
    const mplData = await runPythonMatplotlib("4.2", cleanTitle, params.caption, params.placeholder);
    if (mplData) {
      return {
        imageData: mplData,
        format: "matplotlib_png",
        source: "Python Matplotlib",
        figureType: "4.2",
        error: null,
      };
    }
    const rawSvg = generateFigure42SvgFallback(cleanTitle, params.caption);
    return {
      imageData: svgToDataUrl(rawSvg),
      format: "svg",
      source: "IEEE Benchmark Curve (SVG)",
      figureType: "plot",
      error: null,
    };
  }

  // Default to 3.1 Architecture SVG
  const rawSvg = generateFigure31Svg(cleanTitle, params.caption);
  return {
    imageData: svgToDataUrl(rawSvg),
    format: "svg",
    source: "IEEE Standard Architecture (SVG)",
    figureType: "3.1",
    error: null,
  };
}
