if (typeof process !== "undefined" && typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile();
  } catch {
    // ignore
  }
}

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  DEFAULT_ANALYSIS,
  sanitizeBlock,
  trimBlocksToWordBudget,
  CHAPTER_WORD_CAPS,
  type Block,
  type ChapterId,
} from "./report-types";
import { generateFigureForProject } from "./figure-generator";
import {
  determineFigureType,
  generateFigure31Svg,
  generateFigure32Svg,
  generateFigure41Svg,
  generateFigure42SvgFallback,
  generateFigure43SvgFallback,
} from "./figure-svg";

/* ------------------------------------------------------------------ */
/* AI Configuration & Status                                          */
/* ------------------------------------------------------------------ */

export const getAiStatus = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        aiConfig: z
          .object({
            apiKey: z.string().optional(),
            baseUrl: z.string().optional(),
            model: z.string().optional(),
            provider: z.string().optional(),
          })
          .optional(),
      })
      .optional()
      .parse(data),
  )
  .handler(async ({ data }) => {
    const envGemini = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
    const envGroq = process.env.GROQ_API_KEY;
    const envOpenAI = process.env.OPENAI_API_KEY;

    const clientKey = data?.aiConfig?.apiKey?.trim();
    const clientProvider = data?.aiConfig?.provider?.trim();

    const activeKey = clientKey || envGemini || envGroq || envOpenAI || "";
    const hasKey = Boolean(activeKey);

    let provider = "offline";
    if (clientProvider && clientProvider !== "offline" && activeKey) {
      provider = clientProvider;
    } else if (activeKey) {
      if (activeKey.startsWith("AIza") || envGemini) {
        provider = "gemini";
      } else if (activeKey.startsWith("gsk_") || envGroq) {
        provider = "groq";
      } else if (envOpenAI || activeKey.startsWith("sk-")) {
        provider = "openai";
      } else {
        provider = "gemini";
      }
    }

    const defaultModel =
      data?.aiConfig?.model ||
      process.env.AI_MODEL ||
      (provider === "gemini"
        ? "gemini-2.5-flash"
        : provider === "groq"
          ? "llama-3.3-70b-versatile"
          : provider === "openai"
            ? "gpt-4o-mini"
            : "offline-template-engine");

    const defaultBaseUrl =
      data?.aiConfig?.baseUrl ||
      process.env.AI_BASE_URL ||
      (provider === "offline" ? "local://deterministic-content-engine" : "");

    return {
      hasKey,
      provider:
        provider === "gemini"
          ? "Google Gemini API"
          : provider === "groq"
            ? "Groq Cloud API"
            : provider === "openai"
              ? "OpenAI API"
              : "Offline / Local Engine",
      providerId: provider,
      defaultModel,
      defaultBaseUrl,
    };
  });

/* ------------------------------------------------------------------ */
/* Call hosted AI API (Gemini / Groq / OpenAI)                        */
/* ------------------------------------------------------------------ */

async function callAiModel(params: {
  systemPrompt: string;
  userPrompt: string;
  aiConfig?: { apiKey?: string; baseUrl?: string; model?: string; provider?: string };
}): Promise<string> {
  const envGemini = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
  const envGroq = process.env.GROQ_API_KEY;
  const envOpenAI = process.env.OPENAI_API_KEY;

  const clientKey = params.aiConfig?.apiKey?.trim();
  const apiKey = clientKey || envGemini || envGroq || envOpenAI;
  if (!apiKey) {
    throw new Error("No AI API key provided or configured in environment.");
  }

  const requestedProvider = params.aiConfig?.provider;
  let provider = "gemini";
  if (requestedProvider && requestedProvider !== "offline") {
    provider = requestedProvider;
  } else if (apiKey.startsWith("AIza") || envGemini) {
    provider = "gemini";
  } else if (apiKey.startsWith("gsk_") || envGroq) {
    provider = "groq";
  } else if (apiKey.startsWith("sk-") || envOpenAI) {
    provider = "openai";
  }

  if (provider === "gemini") {
    const model = params.aiConfig?.model || process.env.AI_MODEL || "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${params.systemPrompt}\n\nTask:\n${params.userPrompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.35,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API error (${res.status}): ${errText.slice(0, 300)}`);
    }

    const data = (await res.json()) as any;
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Gemini returned an empty response.");
    return text;
  }

  // Groq or OpenAI Compatible
  const isGroq = provider === "groq" || apiKey.startsWith("gsk_");
  const baseUrl =
    params.aiConfig?.baseUrl ||
    process.env.AI_BASE_URL ||
    (isGroq ? "https://api.groq.com/openai/v1" : "https://api.openai.com/v1");
  const model =
    params.aiConfig?.model ||
    process.env.AI_MODEL ||
    (isGroq ? "llama-3.3-70b-versatile" : "gpt-4o-mini");

  const endpoint = `${baseUrl.replace(/\/+$/, "")}/chat/completions`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: params.systemPrompt },
        { role: "user", content: params.userPrompt },
      ],
      temperature: 0.35,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`AI API error (${res.status}): ${errText.slice(0, 300)}`);
  }

  const data = (await res.json()) as any;
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("AI returned an empty completion.");
  return content;
}

/* ------------------------------------------------------------------ */
/* Re-export pure generator functions from chapter-generator          */
/* ------------------------------------------------------------------ */

import {
  localChapterBlocks,
  parseProjectMeta,
  detectDomain,
  type ProjectMeta,
} from "./chapter-generator";

export {
  localChapterBlocks,
  parseProjectMeta,
  detectDomain,
  type ProjectMeta,
};

/* ------------------------------------------------------------------ */
/* Template Analysis                                                  */
/* ------------------------------------------------------------------ */

const analyzeSchema = z.object({
  fileName: z.string(),
  text: z.string(),
});

function offlineAnalyze(text: string) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const headings = lines
    .filter((line) =>
      /^(chapter\s+\d+|(?:\d+\.){1,3}\d*\s+|abstract|references|appendix|table of contents|list of figures|list of tables)/i.test(line),
    )
    .slice(0, 45);
  const tableLines = lines
    .filter((line) => /\b(table|comparison|requirements|risk register|test plan|tools used|budget|evaluation)\b/i.test(line))
    .slice(0, 20);
  const font = text.match(/\b(Arial|Calibri|Times New Roman|Cambria|Garamond)\b/i);
  const page = text.match(/\b(A4|Letter|Legal)\b/i);

  return {
    ...DEFAULT_ANALYSIS,
    sections: headings.length >= 4 ? headings : DEFAULT_ANALYSIS.sections,
    tables: tableLines.length ? tableLines : DEFAULT_ANALYSIS.tables,
    pageLayout: {
      ...DEFAULT_ANALYSIS.pageLayout,
      pageSize: page?.[1]?.toUpperCase() || "A4",
      bodyFont: font?.[1] || "Times New Roman",
      headingFont: font?.[1] || "Times New Roman",
    },
    referenceStyle: /\bIEEE\b/i.test(text) ? "IEEE" : /\bAPA\b/i.test(text) ? "APA" : DEFAULT_ANALYSIS.referenceStyle,
    notes: ["Analyzed with structural document heuristics conforming to SIMATS capstone format."],
  };
}

export const analyzeTemplate = createServerFn({ method: "POST" })
  .validator((data: unknown) => analyzeSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.text.trim().length < 40) {
      return {
        ...DEFAULT_ANALYSIS,
        notes: ["Standard format applied."],
      };
    }
    return offlineAnalyze(data.text.slice(0, 24000));
  });

/* ------------------------------------------------------------------ */
/* Chapter Generation Server Function                                 */
/* ------------------------------------------------------------------ */

const generateSchema = z.object({
  chapterId: z.string(),
  chapterTitle: z.string(),
  outline: z.string(),
  context: z.string(),
  length: z.string(),
  style: z.string(),
  structureHint: z.string(),
  existingContent: z.string().optional(),
  workerIndex: z.number().optional(),
  aiConfig: z
    .object({
      apiKey: z.string().optional(),
      baseUrl: z.string().optional(),
      model: z.string().optional(),
      provider: z.string().optional(),
    })
    .optional(),
});

export const generateChapter = createServerFn({ method: "POST" })
  .validator((data: unknown) => generateSchema.parse(data))
  .handler(async ({ data }) => {
    const projectMeta = parseProjectMeta(data.context, data.chapterTitle.replace(/^Chapter\s+\d+:\s*/i, "").trim());
    const projectTitle = projectMeta.title;

    // Check if AI is available and configured
    const hasClientKey = Boolean(data.aiConfig?.apiKey?.trim());
    const hasEnvKey = Boolean(process.env.GEMINI_API_KEY || process.env.AI_API_KEY || process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY);
    const useAi = (hasClientKey || hasEnvKey) && data.aiConfig?.provider !== "offline";

    let blocks: Block[] | null = null;

    if (useAi) {
      try {
        const systemPrompt = `You are an expert academic engineering report author for SIMATS Engineering capstone projects.
You must output a JSON object containing a "blocks" array: { "blocks": Block[] }.
Block definition:
type Block =
  | { type: "paragraph", text: string }
  | { type: "heading", level: 2 | 3, text: string }
  | { type: "bullets", items: string[] }
  | { type: "numbered", items: string[] }
  | { type: "table", caption: string, headers: string[], rows: string[][] }
  | { type: "figure", caption: string, placeholder: string };

Rules:
1. For "${data.chapterId}", follow the outline strictly.
2. Clean all heading titles: do NOT include prompt instructions like "— table 1 headers:..." or "— justification based on...". Keep headings clean and professional (e.g. "3.5 Selected Design & Detailed Architecture", "4.2 Implementation and Modern Tools Used").
3. For Chapter 3, include { type: "figure", caption: "Figure 3.1: System Architecture Diagram", placeholder: "Modular system architecture block diagram showing inputs, processing engine, and outputs" } and { type: "figure", caption: "Figure 3.2: Operational Flowchart and Data Processing Pipeline", placeholder: "Process workflow and decision logic" }.
4. For Chapter 4, include { type: "figure", caption: "Figure 4.1: Implementation Architecture and Integration Diagram", placeholder: "Component integration schematic and modular interaction topology" }, { type: "figure", caption: "Figure 4.2: Experimental Results and Performance Benchmark Curves", placeholder: "Comparative benchmark performance curve" }, and { type: "figure", caption: "Figure 4.3: Latency and Throughput Evaluation Under Operational Load", placeholder: "Response latency and resource efficiency graph" }.
5. For references, output 12 to 15 authentic IEEE format citations as a "numbered" block.
6. For appendices, output Appendix A through J with complete detailed text, formulas, pseudocode, and tables.
7. NEVER output placeholders like [USER INPUT REQUIRED] or [RESULT DATA REQUIRED]. Synthesize realistic, authoritative engineering numbers and narrative.`;

        const userPrompt = `Project Title: ${projectTitle}
Chapter: ${data.chapterTitle} (ID: ${data.chapterId})
Context & Team Details:
${data.context}

Outline & Requirements:
${data.outline}

Structure hint:
${data.structureHint}
Generate the complete blocks for this chapter now. Output JSON only.`;

        const rawJson = await callAiModel({
          systemPrompt,
          userPrompt,
          aiConfig: data.aiConfig,
        });

        const cleaned = rawJson.replace(/```json\s*/i, "").replace(/```\s*$/i, "").trim();
        const parsed = JSON.parse(cleaned);
        const rawBlocks: any[] = Array.isArray(parsed) ? parsed : parsed.blocks || [];
        const sanitized = rawBlocks.map((b) => sanitizeBlock(b)).filter((b): b is Block => b !== null);

        if (sanitized.length > 0) {
          // Pre-populate any figure blocks with high-precision SVGs
          for (let i = 0; i < sanitized.length; i++) {
            const b = sanitized[i];
            if (b?.type === "figure" && !b.imageData) {
              const figRes = await generateFigureForProject({
                caption: b.caption,
                placeholder: b.placeholder,
                projectTitle,
              });
              if (figRes.imageData) {
                b.imageData = figRes.imageData;
                b.imageSourceTitle = figRes.source;
              }
            }
          }
          blocks = sanitized;
        }
      } catch (err) {
        console.warn(`[generateChapter] AI call failed for ${data.chapterId}, falling back to local engine:`, err);
        blocks = null;
      }
    }

    // If AI was not used or failed, use the high-performance local generator
    if (!blocks || blocks.length === 0) {
      blocks = localChapterBlocks(data);
    }

    const cap = CHAPTER_WORD_CAPS[data.chapterId as ChapterId] || 1200;
    const sanitized = blocks.map((block) => sanitizeBlock(block)).filter((block): block is Block => block !== null);
    const trimmed = trimBlocksToWordBudget(sanitized, cap);

    return { blocksJson: JSON.stringify(trimmed) };
  });

/* ------------------------------------------------------------------ */
/* Image Generation for Figures                                       */
/* ------------------------------------------------------------------ */

const imageSchema = z.object({
  caption: z.string(),
  placeholder: z.string().optional(),
  projectTitle: z.string(),
});

export const generateFigureImage = createServerFn({ method: "POST" })
  .validator((data: unknown) => imageSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const result = await generateFigureForProject({
        caption: data.caption,
        placeholder: data.placeholder,
        projectTitle: data.projectTitle,
      });

      if (result.imageData) {
        return {
          imageData: result.imageData,
          imageSourceTitle: result.source,
          imageSourceUrl: undefined,
          imageLicense: "Generated IEEE standard technical vector graphic.",
          error: null,
        };
      }
    } catch (error) {
      console.warn("[generateFigureImage] Figure generator fallback:", error);
    }

    const figType = determineFigureType(data.caption, data.placeholder);
    let rawSvg = "";
    if (figType === "3.1") {
      rawSvg = generateFigure31Svg(data.projectTitle, data.caption);
    } else if (figType === "3.2") {
      rawSvg = generateFigure32Svg(data.projectTitle, data.caption);
    } else if (figType === "4.1") {
      rawSvg = generateFigure41Svg(data.projectTitle, data.caption);
    } else if (figType === "4.2" || figType === "plot") {
      rawSvg = generateFigure42SvgFallback(data.projectTitle, data.caption);
    } else if (figType === "4.3") {
      rawSvg = generateFigure43SvgFallback(data.projectTitle, data.caption);
    } else {
      rawSvg = generateFigure31Svg(data.projectTitle, data.caption);
    }

    return {
      imageData: `data:image/svg+xml;base64,${Buffer.from(rawSvg).toString("base64")}`,
      imageSourceTitle: "IEEE Standard Technical Diagram (SVG)",
      imageSourceUrl: undefined,
      imageLicense: "Generated locally using IEEE standard SVG templates.",
      error: null,
    };
  });

/* ------------------------------------------------------------------ */
/* 1-Page Write-Up Description Generator                              */
/* ------------------------------------------------------------------ */

const writeUpDescriptionSchema = z.object({
  projectTitle: z.string(),
  courseName: z.string().optional(),
  domain: z.string().optional(),
  technologies: z.string().optional(),
  existingDescription: z.string().optional(),
  aiConfig: z
    .object({
      apiKey: z.string().optional(),
      baseUrl: z.string().optional(),
      model: z.string().optional(),
      provider: z.string().optional(),
    })
    .optional(),
});

export const generateWriteUpDescription = createServerFn({ method: "POST" })
  .validator((data: unknown) => writeUpDescriptionSchema.parse(data))
  .handler(async ({ data }) => {
    const title = data.projectTitle.trim();
    if (!title) {
      throw new Error("Project title is required to generate the description.");
    }

    const domain = data.domain || "";
    const tech = data.technologies || "PostgreSQL, Python, Scikit-Learn, React";
    const isBank = /bank|deposit|campaign|finance|credit|marketing|churn/i.test(`${title} ${domain}`);

    // Try AI if available
    const hasClientKey = Boolean(data.aiConfig?.apiKey?.trim());
    const hasEnvKey = Boolean(process.env.GEMINI_API_KEY || process.env.AI_API_KEY || process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY);
    const useAi = (hasClientKey || hasEnvKey) && data.aiConfig?.provider !== "offline";

    if (useAi) {
      try {
        const systemPrompt = `You are an academic document engineer writing a capstone project description for an official SIMATS Engineering 1-Page Write-Up.
Write a single continuous academic paragraph of strictly between 1,000 and 1,140 characters (strictly under 1,150 characters total including spaces).
Do NOT include markdown headers, bolding, bullet points, or line breaks. It must fit cleanly in a 1-page table down to the signature line.`;

        const userPrompt = `Project Title: ${title}
Domain: ${domain}
Technologies: ${tech}
Existing context: ${data.existingDescription || ""}
Write the exact 1,000-1,140 character summary now.`;

        const result = await callAiModel({
          systemPrompt,
          userPrompt,
          aiConfig: data.aiConfig,
        });

        const cleaned = result.replace(/["\r\n]+/g, " ").trim();
        if (cleaned.length >= 800) {
          const trimmed = cleaned.slice(0, 1140);
          return { description: trimmed, characterCount: trimmed.length };
        }
      } catch (err) {
        console.warn("[generateWriteUpDescription] AI call failed, using local synthesizer:", err);
      }
    }

    // High quality local description fallback
    let desc = "";
    if (isBank) {
      desc = `${title} is a predictive engineering and database analytics system designed to optimize customer targeting in retail banking deposit campaigns. Traditional telemarketing suffers from low conversion rates (<12%), inflated operational call expenditures, and customer fatigue resulting from indiscriminate outreach. This project implements a robust relational schema in PostgreSQL coupled with a machine learning inference pipeline utilizing ${tech}. The architecture automates data ingestion, categorical one-hot encoding, and synthetic minority over-sampling (SMOTE) to effectively balance 45,211 multi-attribute customer records. Supervised gradient boosting classifiers prioritize prospective depositors, achieving a precision of 87.2%, recall of 85.8%, and an ROC-AUC of 0.942 under 10-fold cross-validation. In operational stress testing, the scoring engine delivers an average query latency of 16.4 ms under 640 requests per second. By eliminating over 62% of non-converting contact attempts, the solution provides banking operators with an auditable, scalable, and GDPR-compliant decision-support framework.`;
    } else {
      desc = `${title} is an engineering project in ${domain || "Computer Science and Engineering"} developed to address core operational challenges through an integrated software and analytical framework. Conventional systems in this domain often experience computational bottlenecks, heuristic fragility, and high response latencies under variable workload conditions. This project implements a modular 4-tier architecture utilizing ${tech} that integrates automated data ingestion, multi-stage feature normalization, and high-performance inference algorithms. The system executes deterministic state validation and maintains full ACID persistence in an indexed relational database. Empirical benchmarking demonstrates an optimal classification accuracy of 96.8% with an average response latency of 18.2 ms under 500 concurrent client transactions per second, outperforming baseline implementations by 14.6%. The final artifact complies strictly with IEEE Std 830 and ISO/IEC 25010 standards, providing a verified, scalable, and production-ready solution that satisfies all institutional engineering requirements.`;
    }

    const trimmed = desc.slice(0, 1140);
    return { description: trimmed, characterCount: trimmed.length };
  });
