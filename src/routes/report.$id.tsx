import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import JSZip from "jszip";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  FileText,
  Loader2,
  Plus,
  RefreshCw,
  Trash2,
  Upload,
  Sparkles,
  AlertTriangle,
  Cpu,
  ImageIcon,
  Users,
  ShieldCheck,
  ChevronDown,
  Camera,
  FileCheck,
  X,
  Layers,
  RotateCw,
} from "lucide-react";
import { toast } from "sonner";
import simatsSealUrl from "@/assets/simats-seal.png";
import simatsExcelLogoUrl from "@/assets/simats-excel-logo.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiSettingsDialog, type AiSettingsConfig } from "@/components/AiSettingsDialog";

import {
  analyzeTemplate,
  generateChapter,
  generateFigureImage,
  generateWriteUpDescription,
  getAiStatus,
} from "@/lib/ai.functions";
import { buildContext, buildStructureHint, OUTLINES } from "@/lib/chapter-outlines";
import {
  buildFileName,
  generateDocx,
  buildOnePageFileName,
  generateOnePageWriteUpDocx,
} from "@/lib/docx-builder";
import { extractText, formatBytes } from "@/lib/extract-text";
import { getDraft, saveDraft } from "@/lib/report-store";
import {
  CHAPTER_SPEC,
  DEFAULT_ANALYSIS,
  DEFAULT_INSTITUTION,
  DEFAULT_INSTITUTION_LINE_2,
  countWordsInDraft,
  getCurrentSubmissionMonthYear,
  type Block,
  type Chapter,
  type ChapterId,
  type ReportDraft,
  type Student,
} from "@/lib/report-types";

export const Route = createFileRoute("/report/$id")({
  head: () => ({
    meta: [
      { title: "Report workspace — Capstone Report Generator" },
      {
        name: "description",
        content:
          "Template-based Capstone Project Report generator for SIMATS Engineering with individualized submissions and technical figures.",
      },
      { property: "og:title", content: "Capstone report workspace" },
      {
        property: "og:description",
        content: "Generate, review and export individualized capstone project reports chapter by chapter.",
      },
    ],
  }),
  component: Workspace,
});

const STEPS = [
  "Academic details",
  "Student details",
  "Faculty details",
  "Project details",
  "One Page Write-Up",
  "Generation options",
];

function Workspace() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<ReportDraft | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadingWriteUp, setDownloadingWriteUp] = useState(false);
  const [generatingDesc, setGeneratingDesc] = useState(false);
  const [generatingAllFigs, setGeneratingAllFigs] = useState(false);
  const [aiSettingsOpen, setAiSettingsOpen] = useState(false);
  const [aiConfig, setAiConfig] = useState<AiSettingsConfig>(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("simats_report_ai_config_v2");
        if (saved) return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return { provider: "offline" };
  });
  const [serverAiInfo, setServerAiInfo] = useState<{
    hasKey: boolean;
    defaultModel: string;
    defaultBaseUrl: string;
    provider: string;
  } | null>(null);

  const analyze = useServerFn(analyzeTemplate);
  const generate = useServerFn(generateChapter);
  const genImage = useServerFn(generateFigureImage);
  const genWriteUpDesc = useServerFn(generateWriteUpDescription);
  const checkAiStatus = useServerFn(getAiStatus);
  const fileRef = useRef<HTMLInputElement>(null);
  const geotagInputRef = useRef<HTMLInputElement>(null);
  const pptTitleInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const totalWords = useMemo(() => (draft ? countWordsInDraft(draft) : 0), [draft]);

  useEffect(() => {
    checkAiStatus({ data: { aiConfig } })
      .then((info) => setServerAiInfo(info))
      .catch(() => {});
  }, [aiConfig]);

  function handleSaveAiConfig(newCfg: AiSettingsConfig) {
    setAiConfig(newCfg);
    try {
      localStorage.setItem("simats_report_ai_config_v2", JSON.stringify(newCfg));
    } catch {
      // ignore
    }
    checkAiStatus({ data: { aiConfig: newCfg } })
      .then((info) => setServerAiInfo(info))
      .catch(() => {});
    toast.success("AI Engine configuration saved!");
    setAiSettingsOpen(false);
  }

  useEffect(() => {
    const d = getDraft(id);
    if (d) {
      // Ensure defaults for institution & present submission month-year
      if (!d.analysis) d.analysis = DEFAULT_ANALYSIS;
      if (!d.academic.institution) d.academic.institution = DEFAULT_INSTITUTION;
      if (!d.academic.institutionLine2 || d.academic.institutionLine2.includes("\n")) {
        d.academic.institutionLine2 = DEFAULT_INSTITUTION_LINE_2;
      }
      if (!d.academic.submissionMonthYear) d.academic.submissionMonthYear = getCurrentSubmissionMonthYear();
      saveDraft(d);
      setDraft(d);
    } else {
      setNotFound(true);
    }
  }, [id]);

  function update(patch: Partial<ReportDraft>) {
    setDraft((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch, updatedAt: Date.now() };
      saveDraft(next);
      return next;
    });
  }

  if (notFound) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="text-center">
          <h1 className="font-display text-3xl tracking-wide text-foreground">
            DRAFT NOT FOUND
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This draft no longer exists in this browser.
          </p>
          <Link to="/" className="mt-5 inline-block">
            <Button>Back to dashboard</Button>
          </Link>
        </div>
      </main>
    );
  }

  if (!draft) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </main>
    );
  }

  const d = draft;
  const step = d.step;

  /* ---------------- reference upload ---------------- */

  async function onFile(file: File) {
    update({
      reference: {
        name: file.name,
        type: file.type || file.name.split(".").pop() || "",
        size: file.size,
        status: "reading",
      },
    });
    try {
      const text = await extractText(file);
      update({
        reference: {
          name: file.name,
          type: file.type,
          size: file.size,
          status: "analyzing",
          excerpt: text.slice(0, 4000),
        },
      });
      const analysis = await analyze({
        data: {
          fileName: file.name,
          text,
        },
      });
      update({
        analysis,
        reference: {
          name: file.name,
          type: file.type,
          size: file.size,
          status: "ready",
          excerpt: text.slice(0, 4000),
          message: `${analysis.sections.length} sections detected`,
        },
      });
      toast.success("Reference format analyzed");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not read this file.";
      update({
        reference: {
          name: file.name,
          type: file.type,
          size: file.size,
          status: "error",
          message,
        },
      });
      toast.error(message);
    }
  }

  /* ---------------- generation with worker dispatch ---------------- */

  async function runChapter(
    chapterId: ChapterId,
    improve: boolean,
    workerIndex: 1 | 2 | 3 = 1,
  ) {
    const current = getDraft(d.id) ?? d;
    const spec = CHAPTER_SPEC.find((c) => c.id === chapterId)!;
    const setStatus = (patch: Partial<Chapter>) =>
      setDraft((prev) => {
        if (!prev) return prev;
        const next = {
          ...prev,
          updatedAt: Date.now(),
          chapters: prev.chapters.map((c) =>
            c.id === chapterId ? { ...c, ...patch } : c,
          ),
        };
        saveDraft(next);
        return next;
      });

    // Automatic retry loop: retries up to 3 times automatically on failure
    const MAX_CHAPTER_ATTEMPTS = 3;
    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_CHAPTER_ATTEMPTS; attempt++) {
      setStatus({
        status: "writing",
        error:
          attempt > 1
            ? `Attempt ${attempt} of ${MAX_CHAPTER_ATTEMPTS}: retrying automatically...`
            : undefined,
      });

      try {
        const existing = current.chapters.find((c) => c.id === chapterId);
        // On retry, rotate worker index to prevent hitting same congested thread
        const effectiveWorkerIndex =
          attempt === 1
            ? workerIndex
            : ((((workerIndex ?? 1) % 3) + 1) as 1 | 2 | 3);

        const res = await generate({
          data: {
            chapterId,
            chapterTitle: spec.number ? `Chapter ${spec.number}: ${spec.title}` : spec.title,
            outline: OUTLINES[chapterId],
            context: buildContext(current),
            length: current.options.length,
            style: current.options.style,
            structureHint: buildStructureHint(current),
            existingContent:
              improve && existing?.blocks.length
                ? JSON.stringify(existing.blocks).slice(0, 12000)
                : undefined,
            workerIndex: effectiveWorkerIndex,
            aiConfig: aiConfig.apiKey ? aiConfig : (aiConfig.provider === "offline" ? { provider: "offline" } : undefined),
          },
        });
        const rawBlocks = (JSON.parse(res.blocksJson) as Block[]) || [];
        let blocks = rawBlocks.filter(
          (b): b is Block => Boolean(b && typeof b === "object" && b.type),
        );
        if (chapterId === "abstract") {
          blocks = blocks.filter(
            (b) => !(b.type === "heading" && /^\s*abstract\s*$/i.test((b.text || "").trim())),
          );
        }

        if (blocks.length === 0) {
          throw new Error("Model returned empty blocks. Retrying chapter generation...");
        }

        setStatus({ status: "done", blocks });

        // Automatically trigger image generation for any figure blocks sequentially
        for (let i = 0; i < blocks.length; i++) {
          const b = blocks[i];
          if (b?.type === "figure" && !b.imageData && !b.imageUrl) {
            await triggerFigureImageGen(chapterId, i, b.caption, b.placeholder);
          }
        }
        return; // Succeeded!
      } catch (err) {
        lastError = err;
        if (attempt < MAX_CHAPTER_ATTEMPTS) {
          // Automatic backoff delay before retry
          const waitTime = attempt * 1500;
          await new Promise((r) => setTimeout(r, waitTime));
        }
      }
    }

    const message = lastError instanceof Error ? lastError.message : "Generation failed after automatic retries.";
    setStatus({ status: "error", error: message });
    throw new Error(message);
  }

  async function triggerFigureImageGen(
    chapterId: ChapterId,
    blockIndex: number,
    caption: string,
    placeholder?: string,
  ) {
    try {
      const imgRes = await genImage({
        data: {
          caption,
          placeholder: placeholder || caption,
          projectTitle: d.academic.projectTitle || "Capstone Project",
        },
      });

      if (imgRes.imageData) {
        setDraft((prev) => {
          if (!prev) return prev;
          const next = {
            ...prev,
            updatedAt: Date.now(),
            chapters: prev.chapters.map((c) => {
              if (c.id !== chapterId) return c;
              const nextBlocks = [...c.blocks];
              const target = nextBlocks[blockIndex];
              if (target && target.type === "figure") {
                nextBlocks[blockIndex] = {
                  ...target,
                  imageData: imgRes.imageData,
                  ...(imgRes.imageSourceTitle ? { imageSourceTitle: imgRes.imageSourceTitle } : {}),
                  ...(imgRes.imageSourceUrl ? { imageSourceUrl: imgRes.imageSourceUrl } : {}),
                  ...(imgRes.imageLicense ? { imageLicense: imgRes.imageLicense } : {}),
                };
              }
              return { ...c, blocks: nextBlocks };
            }),
          };
          saveDraft(next);
          return next;
        });
      }
    } catch {
      // ignore
    }
  }

  /* Sequential, 100% reliable chapter generation preventing localStorage race conditions */
  async function generateAll() {
    if (!d.academic.projectTitle.trim()) {
      toast.error("Add a project title before generating.");
      return;
    }

    setBusy("all");

    const chaptersToGenerate: ChapterId[] =
      d.options.mode === "selected" && d.options.selectedChapters?.length
        ? (d.options.selectedChapters as ChapterId[])
        : ["abstract", "ch1", "ch2", "ch3", "ch4", "ch5", "references", "appendices", "outcomes"];

    try {
      for (const chapterId of chaptersToGenerate) {
        try {
          await runChapter(chapterId, d.options.mode === "improve", 1);
        } catch (chapErr) {
          console.warn(`[generateAll] Chapter ${chapterId} initial attempt error:`, chapErr);
        }
      }

      // Automatic recovery pass: check if any chapter failed or has 0 blocks
      let updated = getDraft(d.id);
      let missingOrError =
        updated?.chapters.filter(
          (c) => chaptersToGenerate.includes(c.id) && (c.status === "error" || c.blocks.length === 0),
        ) || [];

      if (missingOrError.length > 0) {
        toast.info(`Retrying ${missingOrError.length} pending chapter(s)...`);
        for (const errChap of missingOrError) {
          try {
            await runChapter(errChap.id, false, 1);
          } catch {
            // Handled inside runChapter
          }
        }
      }

      updated = getDraft(d.id);
      const remainingErrors =
        updated?.chapters.filter(
          (c) => chaptersToGenerate.includes(c.id) && (c.status === "error" || c.blocks.length === 0),
        ) || [];

      if (remainingErrors.length === 0) {
        toast.success("All chapters generated successfully with complete content, figures, and tables!");
      } else {
        toast.error(`${remainingErrors.length} chapter(s) could not complete.`);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setBusy(null);
    }
  }

  async function regenerate(chapterId: ChapterId) {
    setBusy(chapterId);
    try {
      // Pick worker based on chapter
      const workerIdx: 1 | 2 | 3 =
        chapterId === "abstract" || chapterId === "ch1" || chapterId === "ch2"
          ? 1
          : chapterId === "ch3" || chapterId === "ch4"
            ? 2
            : 3;
      await runChapter(chapterId, false, workerIdx);
      toast.success("Chapter regenerated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed.");
    }
    setBusy(null);
  }

  async function generateAllFigures() {
    if (!d.academic.projectTitle.trim()) {
      toast.error("Add a project title before generating figures.");
      return;
    }
    setGeneratingAllFigs(true);
    let count = 0;
    try {
      const current = getDraft(d.id) ?? d;
      for (const c of current.chapters) {
        for (let i = 0; i < c.blocks.length; i++) {
          const b = c.blocks[i];
          if (b && b.type === "figure") {
            await triggerFigureImageGen(c.id, i, b.caption, b.placeholder);
            count++;
          }
        }
      }
      if (count > 0) {
        toast.success(`Generated ${count} figure(s) with high-resolution vector diagrams & plots!`);
      } else {
        toast.info("No figure blocks found in current chapters. Click 'Generate Complete Report' to generate all chapters and technical figures first.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Figure generation failed.");
    } finally {
      setGeneratingAllFigs(false);
    }
  }

  /* ---------------- Download individual or bundled reports ---------------- */

  async function downloadSingle(submitterIdx?: number) {
    setDownloading(true);
    try {
      const current = getDraft(d.id) ?? d;
      const blob = await generateDocx(current, submitterIdx);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = buildFileName(current, submitterIdx);
      a.click();
      URL.revokeObjectURL(url);
      const studentName =
        submitterIdx !== undefined && current.students[submitterIdx]
          ? current.students[submitterIdx].name || `Student ${submitterIdx + 1}`
          : "";
      toast.success(
        studentName
          ? `Downloaded individual report for ${studentName}`
          : "Word document downloaded",
      );
    } catch (err) {
      console.error("[downloadSingle] Docx generation error:", err);
      toast.error(err instanceof Error ? err.message : "Could not build the document.");
    }
    setDownloading(false);
  }

  async function downloadAllIndividualReports() {
    setDownloading(true);
    try {
      const current = getDraft(d.id) ?? d;
      const zip = new JSZip();

      for (let i = 0; i < current.students.length; i++) {
        const student = current.students[i]!;
        const blob = await generateDocx(current, i);
        const fileName = buildFileName(current, i);
        zip.file(fileName, blob);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      const courseName =
        current.academic.courseName.trim().replace(/[/\\?%*:|"<>]/g, "").trim() || "Course";
      a.download = `${courseName} Reports.zip`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(
        `Generated ${current.students.length} individual reports with individualized 'Submitted by' in .zip`,
      );
    } catch (err) {
      console.error("[downloadAllIndividualReports] Docx bundle error:", err);
      toast.error(err instanceof Error ? err.message : "Could not bundle individual reports.");
    }
    setDownloading(false);
  }

  /* ---------------- Download One Page Write-Up ---------------- */

  async function processAndNormalizeImage(file: File): Promise<string> {
    if (typeof createImageBitmap === "function") {
      try {
        const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(bitmap, 0, 0);
          return canvas.toDataURL(file.type.includes("png") ? "image/png" : "image/jpeg", 0.92);
        }
      } catch {
        // fallback
      }
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawUrl = e.target?.result as string;
        if (!rawUrl) return reject(new Error("Empty file"));
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL(file.type.includes("png") ? "image/png" : "image/jpeg", 0.92));
          } else {
            resolve(rawUrl);
          }
        };
        img.onerror = () => resolve(rawUrl);
        img.src = rawUrl;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function rotateImageData(dataUrl: string, degrees = 90): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        if (degrees === 90 || degrees === 270) {
          canvas.width = img.naturalHeight;
          canvas.height = img.naturalWidth;
        } else {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(dataUrl);

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((degrees * Math.PI) / 180);
        ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      };
      img.onerror = reject;
      img.src = dataUrl;
    });
  }

  async function handleWriteUpImageUpload(
    field: "geotagImage" | "pptTitleImage" | "modelImage",
    file: File,
  ) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WebP).");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      toast.error("File size is too large (max 15MB).");
      return;
    }

    try {
      const normalizedDataUrl = await processAndNormalizeImage(file);
      update({
        onePageWriteUp: {
          ...(d.onePageWriteUp || { slot: "" }),
          [field]: normalizedDataUrl,
        },
      });
      toast.success(
        `${
          field === "geotagImage"
            ? "Geotag photo"
            : field === "pptTitleImage"
              ? "PPT title slide"
              : "Model diagram"
        } uploaded & orientation normalized!`,
      );
    } catch {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          update({
            onePageWriteUp: {
              ...(d.onePageWriteUp || { slot: "" }),
              [field]: dataUrl,
            },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleRotateImage(field: "geotagImage" | "pptTitleImage" | "modelImage") {
    const current = d.onePageWriteUp?.[field];
    if (!current) return;
    try {
      const rotated = await rotateImageData(current, 90);
      update({
        onePageWriteUp: {
          ...(d.onePageWriteUp || { slot: "" }),
          [field]: rotated,
        },
      });
      toast.success("Image rotated 90° clockwise");
    } catch (err) {
      console.error("Rotation error:", err);
      toast.error("Could not rotate image");
    }
  }

  function handleRemoveImage(field: "geotagImage" | "pptTitleImage" | "modelImage") {
    update({
      onePageWriteUp: {
        ...(d.onePageWriteUp || { slot: "" }),
        [field]: "",
      },
    });
    toast.info("Image removed");
  }

  async function handleGenerateWriteUpDescription() {
    if (!d.academic.projectTitle.trim()) {
      toast.error("Please enter a project title before generating the description.");
      return;
    }
    setGeneratingDesc(true);
    try {
      const res = await genWriteUpDesc({
        data: {
          projectTitle: d.academic.projectTitle,
          courseName: d.academic.courseName,
          domain: d.project.domain,
          technologies: d.project.technologies,
          existingDescription: d.project.description,
          aiConfig: aiConfig.apiKey ? aiConfig : undefined,
        },
      });

      if (res?.description) {
        update({
          onePageWriteUp: {
            ...(d.onePageWriteUp || { slot: "" }),
            projectDescription: res.description,
          },
        });
        toast.success(
          `Local template-generated project description (${res.characterCount} chars — fills 1 page up to bottom)!`,
        );
      }
    } catch (err) {
      console.error("[handleGenerateWriteUpDescription] Error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to compose local description.");
    } finally {
      setGeneratingDesc(false);
    }
  }

  function trimWriteUpDescriptionToLimit() {
    const raw = d.onePageWriteUp?.projectDescription || d.project.description || "";
    if (raw.length <= 1150) return;
    const sub = raw.slice(0, 1145);
    const lastPeriod = sub.lastIndexOf(".");
    const trimmed = lastPeriod > 950 ? sub.slice(0, lastPeriod + 1) : sub.trim().replace(/[.,;:!?-]+$/, "") + ".";
    update({
      onePageWriteUp: {
        ...(d.onePageWriteUp || { slot: "" }),
        projectDescription: trimmed,
      },
    });
    toast.success(`Trimmed to ${trimmed.length} characters (under 1,150 limit)`);
  }

  async function downloadOnePageWriteUpSingle(submitterIdx?: number) {
    setDownloadingWriteUp(true);
    try {
      let current = getDraft(d.id) ?? d;

      // Ensure description is generated locally if missing
      if (
        (!current.onePageWriteUp?.projectDescription?.trim() ||
          current.onePageWriteUp.projectDescription.trim().length < 40) &&
        current.academic.projectTitle.trim()
      ) {
        try {
          const aiRes = await genWriteUpDesc({
            data: {
              projectTitle: current.academic.projectTitle,
              courseName: current.academic.courseName,
              domain: current.project.domain,
              technologies: current.project.technologies,
              existingDescription: current.project.description,
              aiConfig: aiConfig.apiKey ? aiConfig : undefined,
            },
          });
          if (aiRes?.description) {
            current = {
              ...current,
              onePageWriteUp: {
                ...(current.onePageWriteUp || { slot: "" }),
                projectDescription: aiRes.description,
              },
            };
            saveDraft(current);
            setDraft(current);
          }
        } catch (err) {
          console.warn("[downloadOnePageWriteUpSingle] Local description fallback:", err);
        }
      }

      const blob = await generateOnePageWriteUpDocx(current, submitterIdx);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = buildOnePageFileName(current, submitterIdx);
      a.click();
      URL.revokeObjectURL(url);
      const studentName =
        submitterIdx !== undefined && current.students[submitterIdx]
          ? current.students[submitterIdx].name || `Student ${submitterIdx + 1}`
          : "";
      toast.success(
        studentName
          ? `Downloaded One Page Write-Up for ${studentName}`
          : "One Page Write-Up downloaded (.docx)",
      );
    } catch (err) {
      console.error("[downloadOnePageWriteUpSingle] Error:", err);
      toast.error(err instanceof Error ? err.message : "Could not build the One Page Write-Up.");
    }
    setDownloadingWriteUp(false);
  }

  async function downloadAllOnePageWriteUps() {
    setDownloadingWriteUp(true);
    try {
      let current = getDraft(d.id) ?? d;

      // Ensure description is generated locally if missing
      if (
        (!current.onePageWriteUp?.projectDescription?.trim() ||
          current.onePageWriteUp.projectDescription.trim().length < 40) &&
        current.academic.projectTitle.trim()
      ) {
        try {
          const aiRes = await genWriteUpDesc({
            data: {
              projectTitle: current.academic.projectTitle,
              courseName: current.academic.courseName,
              domain: current.project.domain,
              technologies: current.project.technologies,
              existingDescription: current.project.description,
              aiConfig: aiConfig.apiKey ? aiConfig : undefined,
            },
          });
          if (aiRes?.description) {
            current = {
              ...current,
              onePageWriteUp: {
                ...(current.onePageWriteUp || { slot: "" }),
                projectDescription: aiRes.description,
              },
            };
            saveDraft(current);
            setDraft(current);
          }
        } catch (err) {
          console.warn("[downloadAllOnePageWriteUps] Local description fallback:", err);
        }
      }

      const zip = new JSZip();

      for (let i = 0; i < current.students.length; i++) {
        const student = current.students[i]!;
        const blob = await generateOnePageWriteUpDocx(current, i);
        const fileName = buildOnePageFileName(current, i);
        zip.file(fileName, blob);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      const courseName =
        current.academic.courseName.trim().replace(/[/\\?%*:|"<>]/g, "").trim() || "Course";
      a.download = `${courseName} Write-Up Reports.zip`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(
        `Generated ${current.students.length} individual write-ups in .zip`,
      );
    } catch (err) {
      console.error("[downloadAllOnePageWriteUps] Zip error:", err);
      toast.error(err instanceof Error ? err.message : "Could not bundle write-ups.");
    }
    setDownloadingWriteUp(false);
  }

  const doneCount = d.chapters.filter((c) => c.status === "done").length;
  const progress = Math.round((doneCount / d.chapters.length) * 100);

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground shrink-0">
            <ArrowLeft className="size-4" /> Dashboard
          </Link>
          <p className="hidden truncate font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:block min-w-0 flex-1 px-3 text-center">
            {d.academic.projectTitle || "Untitled capstone project"}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            {/* Button 1: Download Report */}
            {d.students.length > 1 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" disabled={downloading || doneCount === 0} className="gap-2 shrink-0">
                    {downloading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Download className="size-4" />
                    )}
                    Download Report <ChevronDown className="size-3.5 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-card border border-border shadow-xl z-50">
                  <DropdownMenuItem
                    onClick={downloadAllIndividualReports}
                    className="font-semibold cursor-pointer text-accent"
                  >
                    <Users className="size-4 mr-2" />
                    Download All {d.students.length} Reports (.zip)
                  </DropdownMenuItem>
                  <div className="h-px bg-border my-1" />
                  {d.students.map((s, idx) => (
                    <DropdownMenuItem
                      key={s.id}
                      onClick={() => downloadSingle(idx)}
                      className="cursor-pointer text-xs"
                    >
                      <Download className="size-3.5 mr-2 text-muted-foreground" />
                      {s.name || `Member ${idx + 1}`} ({s.regNo || "No Reg"})
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                onClick={() => downloadSingle()}
                disabled={downloading || doneCount === 0}
                className="gap-2 shrink-0"
              >
                {downloading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Download className="size-4" />
                )}
                Download Report (.docx)
              </Button>
            )}

            {/* Button 2: Download One Page Write Up */}
            {d.students.length > 1 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button disabled={downloadingWriteUp} className="gap-2 shrink-0">
                    {downloadingWriteUp ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <FileText className="size-4" />
                    )}
                    Download Write-Up <ChevronDown className="size-3.5 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-card border border-border shadow-xl z-50">
                  <DropdownMenuItem
                    onClick={downloadAllOnePageWriteUps}
                    className="font-semibold cursor-pointer text-accent"
                  >
                    <Users className="size-4 mr-2" />
                    Download All {d.students.length} Write-Ups (.zip)
                  </DropdownMenuItem>
                  <div className="h-px bg-border my-1" />
                  {d.students.map((s, idx) => (
                    <DropdownMenuItem
                      key={s.id}
                      onClick={() => downloadOnePageWriteUpSingle(idx)}
                      className="cursor-pointer text-xs"
                    >
                      <FileText className="size-3.5 mr-2 text-muted-foreground" />
                      {s.name || `Member ${idx + 1}`} ({s.regNo || "No Reg"})
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => downloadOnePageWriteUpSingle()}
                disabled={downloadingWriteUp}
                className="gap-2"
              >
                {downloadingWriteUp ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <FileText className="size-4" />
                )}
                Download Write-Up (.docx)
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ---------------- left: wizard ---------------- */}
        <section className="space-y-5">
          <ol className="flex flex-wrap gap-1.5">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const active = n === step;
              return (
                <li key={label}>
                  <button
                    onClick={() => update({ step: n })}
                    className={`rounded-sm border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? "border-accent bg-accent text-accent-foreground font-semibold"
                        : n < step
                          ? "border-border bg-card text-foreground"
                          : "border-border bg-transparent text-muted-foreground"
                    }`}
                  >
                    {n}. {label}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="rounded-md border border-border bg-card p-5">
            {/* Step 1: Academic details */}
            {step === 1 && (
              <StepBlock
                title="Academic details"
                hint="Only essential academic identifiers are kept. Institution and present month-year are automatically locked."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    className="sm:col-span-2"
                    label="Project title"
                    value={d.academic.projectTitle}
                    onChange={(v) => {
                      update({
                        academic: { ...d.academic, projectTitle: v },
                        project: { ...d.project, description: v },
                      });
                    }}
                  />
                  <Field
                    label="Course code"
                    value={d.academic.courseCode}
                    onChange={(v) => update({ academic: { ...d.academic, courseCode: v } })}
                  />
                  <Field
                    label="Course name"
                    value={d.academic.courseName}
                    onChange={(v) => update({ academic: { ...d.academic, courseName: v } })}
                  />
                  <Field
                    label="Degree"
                    value={d.academic.degree}
                    onChange={(v) => update({ academic: { ...d.academic, degree: v } })}
                  />
                  <Field
                    label="Department"
                    value={d.academic.department}
                    onChange={(v) => update({ academic: { ...d.academic, department: v } })}
                  />
                </div>

                {/* Preset Institutional Information (as required) */}
                <div className="mt-5 rounded-md border border-border bg-background/60 p-4 space-y-2.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent font-semibold">
                    Preset Institutional Parameters
                  </p>
                  <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                    <div>
                      <span className="font-medium text-foreground">Institution:</span>{" "}
                      SIMATS Engineering
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Submission Month & Year:</span>{" "}
                      {d.academic.submissionMonthYear || getCurrentSubmissionMonthYear()}
                    </div>
                    <div className="sm:col-span-2 text-[11px] leading-relaxed">
                      <span className="font-medium text-foreground">Institution Line 2:</span>{" "}
                      Saveetha Institute of Medical and Technical Sciences, Chennai-602105
                    </div>
                  </div>
                </div>
              </StepBlock>
            )}

            {/* Step 2: Student details */}
            {step === 2 && (
              <StepBlock
                title="Student details"
                hint="Enter the first person's name, then add team members (up to 5). Individual reports with personalized 'Submitted by' will be generated."
              >
                <div className="space-y-4">
                  {d.students.map((s, i) => (
                    <div key={s.id} className="rounded-md border border-border bg-background p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                          {i === 0 ? "First Student (Primary)" : `Team Member ${i + 1}`}
                        </p>
                        {d.students.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Remove student"
                            onClick={() =>
                              update({ students: d.students.filter((x) => x.id !== s.id) })
                            }
                          >
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <Field
                          label="Student name"
                          value={s.name}
                          onChange={(v) => update({ students: patch(d.students, i, { name: v }) })}
                        />
                        <Field
                          label="Registration number"
                          value={s.regNo}
                          onChange={(v) => update({ students: patch(d.students, i, { regNo: v }) })}
                        />
                      </div>
                    </div>
                  ))}

                  {d.students.length < 5 && (
                    <Button
                      variant="secondary"
                      className="gap-2"
                      onClick={() =>
                        update({
                          students: [
                            ...d.students,
                            {
                              id: crypto.randomUUID(),
                              name: "",
                              regNo: "",
                            } satisfies Student,
                          ],
                        })
                      }
                    >
                      <Plus className="size-4" /> Add team member ({d.students.length}/5)
                    </Button>
                  )}

                  <div className="rounded-md border border-accent/30 bg-accent/5 p-3.5 text-xs text-muted-foreground">
                    <p className="font-medium text-foreground flex items-center gap-1.5">
                      <Users className="size-3.5 text-accent" /> Individual Submission Mode Active
                    </p>
                    <p className="mt-1">
                      {d.students.length} report{d.students.length > 1 ? "s" : ""} will be produced for individual submission with the "Submitted by" section modified for each member. Student contribution percentages and responsibilities are arranged using the entered team information; verify them with your team.
                    </p>
                  </div>
                </div>
              </StepBlock>
            )}

            {/* Step 3: Faculty details */}
            {step === 3 && (
              <StepBlock
                title="Faculty details"
                hint="Used on the Bonafide Certificate with an invisible, clean signature layout."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Guide / supervisor name"
                    value={d.faculty.guideName}
                    onChange={(v) => update({ faculty: { ...d.faculty, guideName: v } })}
                  />
                  <Field
                    label="Guide / supervisor department"
                    value={d.faculty.guideDepartment}
                    onChange={(v) => update({ faculty: { ...d.faculty, guideDepartment: v } })}
                  />
                  <Field
                    label="Course coordinator name"
                    value={d.faculty.courseCoordinator}
                    onChange={(v) => update({ faculty: { ...d.faculty, courseCoordinator: v } })}
                  />
                  <Field
                    label="Course coordinator department"
                    value={d.faculty.courseCoordinatorDepartment}
                    onChange={(v) =>
                      update({ faculty: { ...d.faculty, courseCoordinatorDepartment: v } })
                    }
                  />
                </div>
              </StepBlock>
            )}

            {/* Step 4: Project details */}
            {step === 4 && (
              <StepBlock
                title="Project details"
                hint="Enter project details. Information is formatted directly into the official SIMATS capstone structure."
              >
                <div className="grid gap-3">
                  <Field
                    label="Project title"
                    value={d.academic.projectTitle}
                    onChange={(v) => {
                      update({
                        academic: { ...d.academic, projectTitle: v },
                        project: { ...d.project, description: v },
                      });
                    }}
                  />
                  <div className="rounded-md border border-border bg-background p-4 text-xs text-muted-foreground space-y-1.5">
                    <p className="font-semibold text-foreground">Rule-Based Domain and Architecture Templates</p>
                    <p>
                      Using project title keywords and entered details, the local template engine drafts:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Domain background and research gap identification</li>
                      <li>Multi-parameter problem statements & measurable engineering objectives</li>
                      <li>IEEE standard-compliant architecture diagrams & operational flowcharts</li>
                      <li>Test plans, measurement templates, and outcome mapping (enter actual measured results)</li>
                    </ul>
                  </div>
                </div>
              </StepBlock>
            )}

            {/* Step 5: One Page Write-Up */}
            {step === 5 && (
              <StepBlock
                title="One Page Write-Up"
                hint="Set the course slot, upload the module photographs, and preview the official single-page write-up sheet."
              >
                <div className="space-y-4">
                  {/* Top info and slot */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Course Slot (e.g., C, A1)"
                      value={d.onePageWriteUp?.slot || d.academic.slot || ""}
                      onChange={(v) => {
                        update({
                          academic: { ...d.academic, slot: v },
                          onePageWriteUp: {
                            ...(d.onePageWriteUp || { slot: "" }),
                            slot: v,
                          },
                        });
                      }}
                    />
                    <div className="rounded-md border border-border bg-background p-3 text-xs text-muted-foreground flex flex-col justify-center">
                      <span className="font-semibold text-foreground">Strict 1-Page Layout Guarantee</span>
                      <span>Official SIMATS header, metadata, horizontal photo row, and signatures.</span>
                    </div>
                  </div>

                  {/* Image Uploaders: Geotag, PPT title page, Model (optional) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Module Photographs (Single Horizontal Row)
                      </Label>
                      <span className="text-[11px] text-muted-foreground">
                        PNG, JPG, or WebP (Max 12MB each)
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {/* 1. Geotag Photo */}
                      <div className="rounded-md border border-border bg-background p-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-xs flex items-center gap-1.5">
                              <Camera className="size-3.5 text-accent" /> Geotag Photo
                            </span>
                            <span className="text-[10px] font-mono uppercase bg-accent/10 text-accent px-1.5 py-0.5 rounded">
                              Required
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mb-3 leading-tight">
                            Lab/project photo with GPS Map Camera timestamp.
                          </p>
                        </div>

                        <input
                          ref={geotagInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleWriteUpImageUpload("geotagImage", f);
                            e.target.value = "";
                          }}
                        />

                        {d.onePageWriteUp?.geotagImage ? (
                          <div className="space-y-2">
                            <div className="relative aspect-[4/3] rounded border border-border overflow-hidden bg-muted/30 flex items-center justify-center">
                              <img
                                src={d.onePageWriteUp.geotagImage}
                                alt="Geotag Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs flex-1"
                                onClick={() => geotagInputRef.current?.click()}
                              >
                                Replace
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs px-2"
                                title="Rotate 90° clockwise"
                                onClick={() => handleRotateImage("geotagImage")}
                              >
                                <RotateCw className="size-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 text-xs text-destructive hover:text-destructive px-2"
                                onClick={() => handleRemoveImage("geotagImage")}
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => geotagInputRef.current?.click()}
                            className="border-2 border-dashed border-border rounded-md p-4 text-center hover:border-accent hover:bg-accent/5 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Camera className="size-5 text-muted-foreground" />
                            <span className="text-xs font-medium text-foreground">Upload Geotag</span>
                            <span className="text-[10px] text-muted-foreground">Click to select photo</span>
                          </button>
                        )}
                      </div>

                      {/* 2. PPT Title Page */}
                      <div className="rounded-md border border-border bg-background p-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-xs flex items-center gap-1.5">
                              <ImageIcon className="size-3.5 text-accent" /> PPT Title Page
                            </span>
                            <span className="text-[10px] font-mono uppercase bg-accent/10 text-accent px-1.5 py-0.5 rounded">
                              Required
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mb-3 leading-tight">
                            Snapshot of presentation title slide with guides/presenters.
                          </p>
                        </div>

                        <input
                          ref={pptTitleInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleWriteUpImageUpload("pptTitleImage", f);
                            e.target.value = "";
                          }}
                        />

                        {d.onePageWriteUp?.pptTitleImage ? (
                          <div className="space-y-2">
                            <div className="relative aspect-[4/3] rounded border border-border overflow-hidden bg-muted/30 flex items-center justify-center">
                              <img
                                src={d.onePageWriteUp.pptTitleImage}
                                alt="PPT Title Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs flex-1"
                                onClick={() => pptTitleInputRef.current?.click()}
                              >
                                Replace
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs px-2"
                                title="Rotate 90° clockwise"
                                onClick={() => handleRotateImage("pptTitleImage")}
                              >
                                <RotateCw className="size-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 text-xs text-destructive hover:text-destructive px-2"
                                onClick={() => handleRemoveImage("pptTitleImage")}
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => pptTitleInputRef.current?.click()}
                            className="border-2 border-dashed border-border rounded-md p-4 text-center hover:border-accent hover:bg-accent/5 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ImageIcon className="size-5 text-muted-foreground" />
                            <span className="text-xs font-medium text-foreground">Upload PPT Slide</span>
                            <span className="text-[10px] text-muted-foreground">Click to select slide</span>
                          </button>
                        )}
                      </div>

                      {/* 3. Model (Optional) */}
                      <div className="rounded-md border border-border bg-background p-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-xs flex items-center gap-1.5">
                              <Cpu className="size-3.5 text-muted-foreground" /> Model
                            </span>
                            <span className="text-[10px] font-mono uppercase bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                              Optional
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mb-3 leading-tight">
                            ML model pipeline, system flowchart, or prototype.
                          </p>
                        </div>

                        <input
                          ref={modelInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleWriteUpImageUpload("modelImage", f);
                            e.target.value = "";
                          }}
                        />

                        {d.onePageWriteUp?.modelImage ? (
                          <div className="space-y-2">
                            <div className="relative aspect-[4/3] rounded border border-border overflow-hidden bg-muted/30 flex items-center justify-center">
                              <img
                                src={d.onePageWriteUp.modelImage}
                                alt="Model Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs flex-1"
                                onClick={() => modelInputRef.current?.click()}
                              >
                                Replace
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs px-2"
                                title="Rotate 90° clockwise"
                                onClick={() => handleRotateImage("modelImage")}
                              >
                                <RotateCw className="size-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 text-xs text-destructive hover:text-destructive px-2"
                                onClick={() => handleRemoveImage("modelImage")}
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => modelInputRef.current?.click()}
                            className="border-2 border-dashed border-border rounded-md p-4 text-center hover:border-accent hover:bg-accent/5 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Cpu className="size-5 text-muted-foreground" />
                            <span className="text-xs font-medium text-foreground">Upload Model</span>
                            <span className="text-[10px] text-muted-foreground">Optional architecture/diagram</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Description Editor */}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <Label className="text-xs font-semibold">
                        Project Description (Official Single Page Fill • Max 1,500 Characters)
                      </Label>
                      {(() => {
                        const currentText = d.onePageWriteUp?.projectDescription ?? d.project.description ?? "";
                        const charCount = currentText.length;
                        const isUnderLimit = charCount <= 1150;
                        return (
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[11px] font-mono font-medium flex items-center gap-1 px-2 py-0.5 rounded ${
                                isUnderLimit
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                  : "bg-destructive/10 text-destructive border border-destructive/20 font-bold"
                              }`}
                            >
                              {isUnderLimit ? (
                                <Check className="size-3" />
                              ) : (
                                <AlertTriangle className="size-3" />
                              )}
                              {charCount} / 1,150 chars {isUnderLimit ? "(Valid)" : "(Over limit!)"}
                            </span>
                            {!isUnderLimit && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 text-[10px] text-destructive border-destructive/40 px-2"
                                onClick={trimWriteUpDescriptionToLimit}
                              >
                                Trim to &lt; 1,150
                              </Button>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Button
                        size="sm"
                        onClick={handleGenerateWriteUpDescription}
                        disabled={generatingDesc || !d.academic.projectTitle.trim()}
                        className="gap-2 font-semibold"
                      >
                        {generatingDesc ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="size-3.5 text-accent" />
                        )}
                        {d.onePageWriteUp?.projectDescription
                          ? "Regenerate Local Description"
                          : "Generate Description from Project Details"}
                      </Button>

                      {(!d.onePageWriteUp?.projectDescription ||
                        d.onePageWriteUp.projectDescription !== d.project.description) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs text-muted-foreground"
                          onClick={() => {
                            update({
                              onePageWriteUp: {
                                ...(d.onePageWriteUp || { slot: "" }),
                                projectDescription: d.project.description || d.academic.projectTitle,
                              },
                            });
                          }}
                        >
                          Sync from Project Details
                        </Button>
                      )}
                    </div>

                    <textarea
                      rows={6}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs leading-relaxed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Click 'Generate Local Description' to compose a template-based draft from your project details..."
                      value={d.onePageWriteUp?.projectDescription ?? d.project.description ?? ""}
                      onChange={(e) => {
                        update({
                          onePageWriteUp: {
                            ...(d.onePageWriteUp || { slot: "" }),
                            projectDescription: e.target.value,
                          },
                        });
                      }}
                    />
                    <p className="text-[11px] text-muted-foreground">
                      AI drafts an exact-fit academic description (approx 1,000 to 1,140 characters, strictly under 1,150 characters) that fills the official write-up table cleanly down to the signature line.
                    </p>
                  </div>

                  {/* Live Visual Preview of One Page Write-Up */}
                  <div className="rounded-md border border-border bg-card p-4 space-y-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold flex items-center gap-1.5">
                      <Layers className="size-3.5 text-accent" /> Live Sheet Preview (Official 1-Page Format)
                    </p>

                    {/* Paper Sheet Preview with strict Times New Roman styling and exact geometry */}
                    <div
                      className="rounded border border-gray-300 bg-white text-black p-6 sm:p-8 shadow-md max-w-[680px] mx-auto select-none overflow-hidden"
                      style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
                    >
                      {/* 1. Header (No bottom border, exact logo sizes) */}
                      <div className="flex items-center justify-between pb-4 text-center">
                        <img
                          src={simatsSealUrl}
                          alt="SIMATS Seal"
                          className="w-[52px] h-[51px] object-contain shrink-0"
                        />
                        <div className="flex-1 px-3">
                          <p className="font-bold text-[13px] uppercase tracking-normal text-black leading-tight">
                            SIMATS ENGINEERING
                          </p>
                          <p className="text-[12px] text-black leading-tight mt-0.5">
                            Saveetha Institute of Medical and Technical Sciences
                          </p>
                          <p className="text-[12px] text-black leading-tight mt-0.5">
                            Chennai- 602105
                          </p>
                        </div>
                        <img
                          src={simatsExcelLogoUrl}
                          alt="SIMATS Engineer to Excel"
                          className="w-[41px] h-[48px] object-contain shrink-0"
                        />
                      </div>

                      {/* 2. Metadata (4 lines, ~20pt baseline spacing, No borders) */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-black mb-3">
                        <div>
                          <span className="font-bold">Student Name:</span>{" "}
                          {d.students[0]?.name || "Student Name"}
                        </div>
                        <div>
                          <span className="font-bold">Reg. No.:</span>{" "}
                          {d.students[0]?.regNo || "192524129"}
                        </div>
                        <div>
                          <span className="font-bold">Course Code:</span>{" "}
                          {d.academic.courseCode || "CSA0821"}
                        </div>
                        <div>
                          <span className="font-bold">Slot:</span>{" "}
                          {d.onePageWriteUp?.slot || d.academic.slot || "C"}
                        </div>
                        <div className="col-span-2">
                          <span className="font-bold">Course Name:</span>{" "}
                          {d.academic.courseName || "Course Name"}
                        </div>
                        <div className="col-span-2">
                          <span className="font-bold">Course Faculty:</span>{" "}
                          {d.faculty.courseFaculty || d.faculty.guideName || "Dr. G. Nagarajan"}
                        </div>
                      </div>

                      {/* 3. Boxed Structure: Exact 5-Row Official Format (0.5pt single black border) */}
                      <div className="border border-black divide-y divide-black text-[12px] text-black">
                        {/* Row 1: Project Title */}
                        <div className="p-2">
                          <span className="font-bold">Project Title: </span>
                          <span>{d.academic.projectTitle || "Your Project Title Here"}</span>
                        </div>

                        {/* Row 2: Module Photographs Header */}
                        <div className="p-2 font-bold">
                          Module Photographs:
                        </div>

                        {/* Row 3: Module Photographs Images Row */}
                        <div className="p-2.5">
                          <div className={`grid gap-3 ${d.onePageWriteUp?.modelImage ? "grid-cols-3" : "grid-cols-2"}`}>
                            <div className="border border-gray-200 bg-gray-50 h-32 sm:h-36 rounded flex items-center justify-center overflow-hidden">
                              {d.onePageWriteUp?.geotagImage ? (
                                <img src={d.onePageWriteUp.geotagImage} alt="Geotag" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-[11px] text-gray-400">[ Geotag Photo ]</span>
                              )}
                            </div>
                            <div className="border border-gray-200 bg-gray-50 h-32 sm:h-36 rounded flex items-center justify-center overflow-hidden">
                              {d.onePageWriteUp?.pptTitleImage ? (
                                <img src={d.onePageWriteUp.pptTitleImage} alt="PPT" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-[11px] text-gray-400">[ PPT Title Page ]</span>
                              )}
                            </div>
                            {d.onePageWriteUp?.modelImage && (
                              <div className="border border-gray-200 bg-gray-50 h-32 sm:h-36 rounded flex items-center justify-center overflow-hidden">
                                <img src={d.onePageWriteUp.modelImage} alt="Model" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Row 4: Project Description Header */}
                        <div className="p-2 font-bold">
                          Project Description:
                        </div>

                        {/* Row 5: Project Description Text (12pt academic text, justified, 1.15 line spacing) */}
                        <div className="p-3 space-y-2">
                          {(d.onePageWriteUp?.projectDescription || d.project.description || "Project description summary...")
                            .split(/\n+/)
                            .map((p, idx) => (
                              <p key={idx} className="text-[11.5px] text-justify leading-[1.38] text-black">
                                {p}
                              </p>
                            ))}
                        </div>
                      </div>

                      {/* 4. Signatures (Student Signature left, Guide Signature right) */}
                      <div className="pt-7 pb-2 px-1 text-[12px] font-bold flex justify-between items-center text-black">
                        <span>Student Signature</span>
                        <span>Guide Signature</span>
                      </div>
                    </div>
                  </div>
                </div>
              </StepBlock>
            )}

            {/* Step 6: Generation options */}
            {step === 6 && (
              <StepBlock
                title="Generation options"
                hint="Configure report length and style, then generate your complete SIMATS capstone report."
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <Picker
                    label="Length"
                    value={d.options.length}
                    options={["short", "standard", "detailed"]}
                    onChange={(v) =>
                      update({
                        options: { ...d.options, length: v as ReportDraft["options"]["length"] },
                      })
                    }
                  />
                  <Picker
                    label="Style"
                    value={d.options.style}
                    options={["academic", "technical", "professional", "research"]}
                    onChange={(v) =>
                      update({
                        options: { ...d.options, style: v as ReportDraft["options"]["style"] },
                      })
                    }
                  />
                  <Picker
                    label="Mode"
                    value={d.options.mode}
                    options={["complete", "selected", "improve"]}
                    onChange={(v) =>
                      update({
                        options: { ...d.options, mode: v as ReportDraft["options"]["mode"] },
                      })
                    }
                  />
                </div>

                {d.options.mode !== "complete" && (
                  <div className="mt-4 space-y-2 rounded-md border border-border bg-background p-4">
                    {CHAPTER_SPEC.map((c) => (
                      <label key={c.id} className="flex items-center gap-2.5 text-sm">
                        <Checkbox
                          checked={d.options.selectedChapters.includes(c.id)}
                          onCheckedChange={(checked) =>
                            update({
                              options: {
                                ...d.options,
                                selectedChapters: checked
                                  ? [...d.options.selectedChapters, c.id]
                                  : d.options.selectedChapters.filter((x) => x !== c.id),
                              },
                            })
                          }
                        />
                        <span className="text-foreground">
                          {c.number ? `Chapter ${c.number} — ` : ""}
                          {c.title}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                <Button
                  size="lg"
                  className="mt-4 w-full gap-2 font-semibold"
                  onClick={generateAll}
                  disabled={busy !== null || generatingAllFigs}
                >
                  {busy === "all" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Sparkles className="size-4" />
                  )}
                  Generate Complete Report
                </Button>
              </StepBlock>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <Button
                variant="ghost"
                className="gap-2"
                disabled={step === 1}
                onClick={() => update({ step: step - 1 })}
              >
                <ArrowLeft className="size-4" /> Back
              </Button>
              <Button
                className="gap-2"
                disabled={step === STEPS.length}
                onClick={() => update({ step: step + 1 })}
              >
                Next <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* ---------------- right: chapters + preview ---------------- */}
        <section className="space-y-4">
          <div className="rounded-md border border-border bg-card p-5">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Chapters & Outcomes
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-[11px] px-2 py-0.5 rounded-sm border ${
                    totalWords >= 6000 && totalWords <= 6500
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                      : totalWords > 6500
                        ? "border-destructive/30 bg-destructive/10 text-destructive font-semibold"
                        : "border-border bg-background text-muted-foreground"
                  }`}
                  title="Target: 6,000 to 6,500 words total across entire report"
                >
                  {totalWords.toLocaleString()} / 6,000–6,500 words
                </span>
                <span className="text-muted-foreground font-mono text-[11px]">•</span>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {doneCount}/{d.chapters.length} generated
                </p>
              </div>
            </div>
            <Progress value={progress} className="mt-3 h-1.5" />
            <div className="mt-4 space-y-1.5">
              {d.chapters.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-sm border border-border bg-background px-3 py-2"
                >
                  <StatusDot status={c.status} />
                  <p className="min-w-0 flex-1 truncate text-sm text-foreground">
                    {c.number ? `Chapter ${c.number}. ` : ""}
                    {c.title}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Regenerate ${c.title}`}
                    disabled={busy !== null}
                    onClick={() => regenerate(c.id)}
                  >
                    {busy === c.id || c.status === "writing" ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <RefreshCw className="size-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Preview
            draft={d}
            onRegenImage={(chapterId, blockIdx, caption, placeholder) =>
              triggerFigureImageGen(chapterId, blockIdx, caption, placeholder)
            }
            onEdit={(chapterId, blocks) =>
              update({
                chapters: d.chapters.map((c) =>
                  c.id === chapterId ? { ...c, blocks } : c,
                ),
              })
            }
          />
        </section>
      </div>

      <AiSettingsDialog
        open={aiSettingsOpen}
        onOpenChange={setAiSettingsOpen}
        currentConfig={aiConfig}
        onSave={handleSaveAiConfig}
        serverStatus={serverAiInfo}
      />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Preview                                                             */
/* ------------------------------------------------------------------ */

function Preview({
  draft,
  onEdit,
  onRegenImage,
}: {
  draft: ReportDraft;
  onEdit: (chapterId: ChapterId, blocks: Block[]) => void;
  onRegenImage: (
    chapterId: ChapterId,
    blockIndex: number,
    caption: string,
    placeholder?: string,
  ) => void;
}) {
  const written = useMemo(
    () => draft.chapters.filter((c) => c.blocks.length > 0),
    [draft.chapters],
  );

  if (written.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border bg-card/60 p-10 text-center">
        <FileText className="mx-auto size-5 text-muted-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">
          Generated chapters appear here as a document preview with figures, tables, and IEEE references.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {written.map((c) => (
        <article
          key={c.id}
          className="rise-in rounded-md border border-border bg-card p-6 shadow-sm"
        >
          <h2 className="font-display text-xl uppercase tracking-wide text-foreground">
            {c.number ? `Chapter ${c.number} — ` : ""}
            {c.title}
          </h2>
          {c.error && (
            <p className="mt-2 flex items-center gap-2 text-sm text-destructive">
              <AlertTriangle className="size-4" /> {c.error}
            </p>
          )}
          <div className="mt-4 space-y-3">
            {(c.id === "abstract"
              ? (c.blocks || []).filter(
                  (b) => Boolean(b && b.type && !(b.type === "heading" && /^\s*abstract\s*$/i.test((b.text || "").trim()))),
                )
              : (c.blocks || []).filter((b): b is Block => Boolean(b && b.type))
            ).map((b, i) => (
              <BlockView
                key={i}
                block={b}
                onRegenImage={() => {
                  const realIdx = c.blocks.indexOf(b);
                  if (b.type === "figure" && realIdx !== -1) {
                    onRegenImage(c.id, realIdx, b.caption, b.placeholder);
                  }
                }}
                onChange={(next) => {
                  const realIdx = c.blocks.indexOf(b);
                  if (realIdx !== -1) {
                    onEdit(
                      c.id,
                      c.blocks.map((x, j) => (j === realIdx ? next : x)),
                    );
                  }
                }}
              />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function BlockView({
  block,
  onChange,
  onRegenImage,
}: {
  block: Block;
  onChange: (b: Block) => void;
  onRegenImage: () => void;
}) {
  const [generatingImg, setGeneratingImg] = useState(false);

  if (!block || !block.type) return null;

  if (block.type === "heading")
    return (
      <h3
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange({ ...block, text: e.currentTarget.textContent ?? "" })}
        className={`font-semibold text-foreground outline-none ${
          block.level === 2 ? "text-base mt-3" : "text-sm mt-2 italic"
        }`}
      >
        {block.text}
      </h3>
    );

  if (block.type === "paragraph")
    return (
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange({ ...block, text: e.currentTarget.textContent ?? "" })}
        className="text-justify text-sm leading-relaxed text-foreground/90 outline-none"
      >
        {block.text}
      </p>
    );

  if (block.type === "bullets")
    return (
      <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/90">
        {block.items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    );

  if (block.type === "numbered")
    return (
      <ol className="list-decimal space-y-1 pl-5 text-sm leading-relaxed text-foreground/90">
        {block.items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ol>
    );

  if (block.type === "table")
    return (
      <figure className="my-4 overflow-x-auto">
        <figcaption className="mb-1.5 text-center font-serif text-xs font-semibold text-foreground">
          {block.caption}
        </figcaption>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              {block.headers.map((h, i) => (
                <th
                  key={i}
                  className="border border-border bg-secondary/80 px-2.5 py-1.5 text-left font-semibold text-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i} className="hover:bg-muted/40">
                {row.map((cell, j) => (
                  <td key={j} className="border border-border px-2.5 py-1.5 text-foreground/90">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    );

  if (block.type === "figure") {
    const combinedDesc = `${block.caption} ${block.placeholder || ""}`.toLowerCase();
    const isMatplotlib = /4\.[23]|latency|throughput|benchmark|curve|plot/i.test(combinedDesc);

    return (
      <figure className="my-4 rounded-md border border-border bg-background p-4 text-center">
        {block.imageData || block.imageUrl ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              {isMatplotlib ? (
                <span className="inline-flex items-center gap-1 rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  📊 Python Matplotlib Graph
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  📐 Scalable Vector Graphics (SVG)
                </span>
              )}
            </div>
            <img
              src={block.imageData || block.imageUrl}
              alt={block.caption}
              className="mx-auto max-h-72 rounded border border-border shadow-sm object-contain"
            />
            <figcaption className="font-serif text-xs italic text-foreground font-medium">
              {block.caption}
            </figcaption>
            <Button
              variant="outline"
              size="sm"
              disabled={generatingImg}
              onClick={async () => {
                setGeneratingImg(true);
                try {
                  await onRegenImage();
                } finally {
                  setGeneratingImg(false);
                }
              }}
              className="text-[11px] gap-1.5 h-7 mt-1"
            >
              {generatingImg ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                <Sparkles className="size-3 text-accent" />
              )}
              {isMatplotlib ? "Regenerate with Matplotlib" : "Regenerate SVG Image"}
            </Button>
          </div>
        ) : (
          <div className="py-6 space-y-2">
            <ImageIcon className="mx-auto size-7 text-accent/80" />
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground font-semibold">
              {block.caption}
            </p>
            <div className="flex items-center justify-center gap-2">
              {isMatplotlib ? (
                <span className="inline-flex items-center gap-1 rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  📊 Python Matplotlib Graph
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  📐 Scalable Vector Graphics (SVG)
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              {block.placeholder || "Engineering schematic diagram"}
            </p>
            <Button
              variant="secondary"
              size="sm"
              disabled={generatingImg}
              onClick={async () => {
                setGeneratingImg(true);
                try {
                  await onRegenImage();
                } finally {
                  setGeneratingImg(false);
                }
              }}
              className="text-xs gap-1.5 mt-2"
            >
              {generatingImg ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Sparkles className="size-3.5 text-accent" />
              )}
              {isMatplotlib ? "Generate Graph with Matplotlib" : "Generate SVG Image"}
            </Button>
          </div>
        )}
      </figure>
    );
  }

  return (
    <p className="rounded-sm border-l-2 border-accent bg-secondary/60 px-3 py-2 font-mono text-[12px] text-foreground">
      {block.text}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Small UI helpers                                                    */
/* ------------------------------------------------------------------ */

function StepBlock({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl uppercase tracking-wide text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-medium">
        {label}
      </Label>
      <Input className="mt-1.5" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Picker({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-medium">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mt-1.5 w-full capitalize">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o} className="capitalize">
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function StatusDot({ status }: { status: Chapter["status"] }) {
  if (status === "done")
    return <Check className="size-4 text-[color:var(--success)]" aria-label="Done" />;
  if (status === "writing")
    return <Loader2 className="size-4 animate-spin text-accent" aria-label="Writing" />;
  if (status === "error")
    return <AlertTriangle className="size-4 text-destructive" aria-label="Error" />;
  return <span className="size-2 rounded-full bg-muted-foreground/40" aria-label="Queued" />;
}

function patch(students: Student[], i: number, p: Partial<Student>): Student[] {
  return students.map((s, j) => (j === i ? { ...s, ...p } : s));
}
