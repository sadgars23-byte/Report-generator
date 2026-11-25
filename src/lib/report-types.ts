export type Student = {
  id: string;
  name: string;
  regNo: string;
  responsibilities?: string;
  contribution?: string;
};

export type AcademicDetails = {
  projectTitle: string;
  courseCode: string;
  courseName: string;
  degree: string;
  department: string;
  slot?: string;
  branch?: string;
  institution: string;
  institutionLine2: string;
  academicYear?: string;
  submissionMonthYear: string;
};

export type FacultyDetails = {
  guideName: string;
  guideDepartment: string;
  courseCoordinator: string;
  courseCoordinatorDepartment: string;
  guideDesignation?: string;
  courseFaculty?: string;
};

export type ProjectDetails = {
  domain: string;
  description: string;
  problemStatement: string;
  objectives: string;
  methodology: string;
  technologies: string;
  dataset: string;
  hardware: string;
  software: string;
  expectedResults: string;
  supportingNotes: string;
};

export type AIWorkerConfig = {
  apiKey: string;
  model: string;
  baseUrl?: string;
};

export type MultiAIConfig = {
  reportWorker1: AIWorkerConfig;
  reportWorker2: AIWorkerConfig;
  reportWorker3: AIWorkerConfig;
  imageWorker: AIWorkerConfig;
};

export type GenerationOptions = {
  length: "short" | "standard" | "detailed";
  style: "academic" | "technical" | "professional" | "research";
  mode: "complete" | "selected" | "improve";
  selectedChapters: string[];
  referenceStyle: "IEEE";
};

export type ReferenceFile = {
  name: string;
  type: string;
  size: number;
  status: "idle" | "reading" | "analyzing" | "ready" | "error";
  message?: string;
  excerpt?: string;
};

export type TemplateAnalysis = {
  sections: string[];
  headingHierarchy: string[];
  tables: string[];
  pageLayout: {
    pageSize: string;
    marginsInches: { top: number; bottom: number; left: number; right: number };
    bodyFont: string;
    bodyFontSizePt: number;
    lineSpacing: number;
    alignment: "justified" | "left";
    headingFont: string;
  };
  referenceStyle: string;
  notes: string[];
};

/* ---------- Generated content blocks ---------- */

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: string[] }
  | { type: "table"; caption: string; headers: string[]; rows: string[][] }
  | {
      type: "figure";
      caption: string;
      placeholder: string;
      imageUrl?: string;
      imageData?: string;
      imageSourceTitle?: string;
      imageSourceUrl?: string;
      imageLicense?: string;
    }
  | { type: "placeholder"; text: string };

export type ChapterId =
  | "abstract"
  | "ch1"
  | "ch2"
  | "ch3"
  | "ch4"
  | "ch5"
  | "references"
  | "appendices"
  | "outcomes";

export type ChapterStatus = "queued" | "writing" | "done" | "error";

export type Chapter = {
  id: ChapterId;
  number: number | null;
  title: string;
  status: ChapterStatus;
  blocks: Block[];
  error?: string | undefined;
};

export type OnePageWriteUp = {
  slot: string;
  geotagImage?: string;
  pptTitleImage?: string;
  modelImage?: string;
  projectDescription?: string;
};

export type ReportDraft = {
  id: string;
  createdAt: number;
  updatedAt: number;
  step: number;
  reference: ReferenceFile | null;
  analysis: TemplateAnalysis | null;
  academic: AcademicDetails;
  students: Student[];
  faculty: FacultyDetails;
  project: ProjectDetails;
  options: GenerationOptions;
  chapters: Chapter[];
  onePageWriteUp?: OnePageWriteUp;
};

export const CHAPTER_SPEC: { id: ChapterId; number: number | null; title: string }[] = [
  { id: "abstract", number: null, title: "Abstract" },
  { id: "ch1", number: 1, title: "Introduction and Engineering Problem" },
  { id: "ch2", number: 2, title: "Literature Review and Existing Solutions" },
  {
    id: "ch3",
    number: 3,
    title:
      "Engineering Design & Trade-offs, Sustainability, Ethics, Safety, Risk & Security",
  },
  {
    id: "ch4",
    number: 4,
    title: "Implementation, Testing & Results, Project Management",
  },
  { id: "ch5", number: 5, title: "Conclusion, Future Work and Reflection" },
  { id: "references", number: null, title: "References" },
  { id: "appendices", number: null, title: "Appendices" },
  { id: "outcomes", number: null, title: "Capstone Project Outcome Mapping Sheet" },
];

export const DEFAULT_ANALYSIS: TemplateAnalysis = {
  sections: [
    "Cover Page",
    "Bonafide Certificate",
    "Declaration",
    "Individual Contribution Statement",
    "Abstract",
    "Table of Contents",
    "List of Figures",
    "List of Tables",
    "List of Abbreviations / Symbols",
    "Chapters 1–5",
    "References",
    "Appendices",
    "Outcome Mapping Sheet",
  ],
  headingHierarchy: ["CHAPTER n", "n.n Section", "n.n.n Sub-section"],
  tables: [
    "Individual Contribution Statement",
    "Comparative Analysis",
    "Requirements",
    "Standards",
    "Design Specifications",
    "Evaluation Matrix",
    "Trade-off Analysis",
    "Risk Register",
    "Tools Used",
    "Test Plan",
    "Objective Achievement",
    "Roles & Budget",
  ],
  pageLayout: {
    pageSize: "A4",
    marginsInches: { top: 1, bottom: 1, left: 1.25, right: 1 },
    bodyFont: "Times New Roman",
    bodyFontSizePt: 12,
    lineSpacing: 1.5,
    alignment: "justified",
    headingFont: "Times New Roman",
  },
  referenceStyle: "IEEE",
  notes: ["Default SIMATS-style capstone structure applied."],
};

export const DEFAULT_INSTITUTION = "SIMATS Engineering";
export const DEFAULT_INSTITUTION_LINE_2 = "Saveetha Institute of Medical and Technical Sciences, Chennai-602105";

export function getCurrentSubmissionMonthYear(): string {
  const date = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${monthNames[date.getMonth()]}-${date.getFullYear()}`;
}

export function emptyDraft(id: string): ReportDraft {
  const now = Date.now();
  return {
    id,
    createdAt: now,
    updatedAt: now,
    step: 1,
    reference: null,
    analysis: DEFAULT_ANALYSIS,
    academic: {
      projectTitle: "",
      courseCode: "",
      courseName: "",
      degree: "Bachelor of Technology",
      department: "",
      branch: "",
      institution: DEFAULT_INSTITUTION,
      institutionLine2: DEFAULT_INSTITUTION_LINE_2,
      academicYear: `${new Date().getFullYear() - 1}–${new Date().getFullYear()}`,
      submissionMonthYear: getCurrentSubmissionMonthYear(),
    },
    students: [
      {
        id: crypto.randomUUID(),
        name: "",
        regNo: "",
        responsibilities: "",
        contribution: "",
      },
    ],
    faculty: {
      guideName: "",
      guideDepartment: "",
      courseCoordinator: "",
      courseCoordinatorDepartment: "",
      guideDesignation: "Assistant Professor",
      courseFaculty: "",
    },
    project: {
      domain: "",
      description: "",
      problemStatement: "",
      objectives: "",
      methodology: "",
      technologies: "",
      dataset: "",
      hardware: "",
      software: "",
      expectedResults: "",
      supportingNotes: "",
    },
    options: {
      length: "standard",
      style: "academic",
      mode: "complete",
      selectedChapters: CHAPTER_SPEC.map((c) => c.id),
      referenceStyle: "IEEE",
    },
    chapters: CHAPTER_SPEC.map((c) => ({
      id: c.id,
      number: c.number,
      title: c.title,
      status: "queued" as ChapterStatus,
      blocks: [],
    })),
    onePageWriteUp: {
      slot: "",
      geotagImage: "",
      pptTitleImage: "",
      modelImage: "",
      projectDescription: "",
    },
  };
}

export function countWordsInBlocks(blocks: Block[]): number {
  let count = 0;
  for (const b of (blocks || [])) {
    if (!b || !b.type) continue;
    if (b.type === "paragraph" || b.type === "heading" || b.type === "placeholder") {
      count += (b.text || "").trim().split(/\s+/).filter(Boolean).length;
    } else if (b.type === "bullets" || b.type === "numbered") {
      for (const it of (b.items || [])) {
        count += (it || "").trim().split(/\s+/).filter(Boolean).length;
      }
    } else if (b.type === "table") {
      count += (b.caption || "").trim().split(/\s+/).filter(Boolean).length;
      for (const hd of (b.headers || [])) {
        count += (hd || "").trim().split(/\s+/).filter(Boolean).length;
      }
      for (const row of (b.rows || [])) {
        for (const cell of (row || [])) {
          count += (cell || "").trim().split(/\s+/).filter(Boolean).length;
        }
      }
    } else if (b.type === "figure") {
      count += (b.caption || "").trim().split(/\s+/).filter(Boolean).length;
    }
  }
  return count;
}

export function countWordsInDraft(draft: ReportDraft): number {
  let total = 0;
  for (const ch of (draft?.chapters || [])) {
    total += countWordsInBlocks(ch?.blocks || []);
  }
  return total;
}

export const CHAPTER_WORD_CAPS: Record<ChapterId, number> = {
  abstract: 450,
  ch1: 1250,
  ch2: 1300,
  ch3: 1550,
  ch4: 1650,
  ch5: 1100,
  references: 600,
  appendices: 1800,
  outcomes: 450,
};

export function trimBlocksToWordBudget(blocks: Block[], maxWords: number): Block[] {
  if (!blocks || blocks.length === 0) return [];
  let currentWords = countWordsInBlocks(blocks);
  if (currentWords <= maxWords) return blocks;

  // Clone blocks to avoid mutating originals
  const result: Block[] = JSON.parse(JSON.stringify(blocks));

  // Strategy 1: Trim complete sentences from the end of longer paragraphs
  for (let i = result.length - 1; i >= 0 && currentWords > maxWords; i--) {
    const b = result[i];
    if (b && b.type === "paragraph" && b.text) {
      const words = b.text.trim().split(/\s+/).filter(Boolean);
      if (words.length > 25) {
        const sentences = b.text.match(/[^.!?]+[.!?]+(?:\s+|$)/g);
        if (sentences && sentences.length > 1) {
          const keptSentences: string[] = [];
          let pWords = 0;
          for (const s of sentences) {
            const sw = s.trim().split(/\s+/).filter(Boolean).length;
            if (currentWords - (words.length - pWords) <= maxWords || keptSentences.length === 0) {
              keptSentences.push(s);
              pWords += sw;
            } else {
              break;
            }
          }
          if (keptSentences.length > 0 && keptSentences.length < sentences.length) {
            const wordsSaved = words.length - pWords;
            b.text = keptSentences.join("").trim();
            currentWords -= wordsSaved;
          }
        }
      }
    }
  }

  // Strategy 2: If still over budget, cleanly trim trailing words at sentence boundary
  if (currentWords > maxWords) {
    for (let i = result.length - 1; i >= 0 && currentWords > maxWords; i--) {
      const b = result[i];
      if (b && b.type === "paragraph" && b.text) {
        const words = b.text.trim().split(/\s+/).filter(Boolean);
        const excess = currentWords - maxWords;
        if (words.length > 25) {
          const keepCount = Math.max(20, words.length - excess);
          if (keepCount < words.length) {
            const wordsSaved = words.length - keepCount;
            b.text = words.slice(0, keepCount).join(" ").replace(/[.,;:!?-]+$/, "") + ".";
            currentWords -= wordsSaved;
          }
        }
      }
    }
  }

  return result;
}

export function sanitizeBlock(raw: unknown): Block | null {
  if (!raw || typeof raw !== "object" || !("type" in (raw as object))) return null;
  const b = raw as any;
  switch (b.type) {
    case "paragraph":
      return { type: "paragraph", text: String(b.text ?? "") };
    case "heading":
      return {
        type: "heading",
        level: b.level === 3 ? 3 : 2,
        text: String(b.text ?? ""),
      };
    case "bullets":
      return {
        type: "bullets",
        items: Array.isArray(b.items) ? b.items.map((x: any) => String(x ?? "")) : [],
      };
    case "numbered":
      return {
        type: "numbered",
        items: Array.isArray(b.items) ? b.items.map((x: any) => String(x ?? "")) : [],
      };
    case "table": {
      const headers = Array.isArray(b.headers) ? b.headers.map((x: any) => String(x ?? "")) : [];
      const rows = Array.isArray(b.rows)
        ? b.rows.map((row: any) => (Array.isArray(row) ? row.map((c: any) => String(c ?? "")) : []))
        : [];
      return {
        type: "table",
        caption: String(b.caption ?? "Table"),
        headers,
        rows,
      };
    }
    case "figure": {
      const fig: Block = {
        type: "figure",
        caption: String(b.caption ?? "Figure"),
        placeholder: String(b.placeholder ?? ""),
      };
      if (typeof b.imageUrl === "string") fig.imageUrl = b.imageUrl;
      if (typeof b.imageData === "string") fig.imageData = b.imageData;
      if (typeof b.imageSourceTitle === "string") fig.imageSourceTitle = b.imageSourceTitle;
      if (typeof b.imageSourceUrl === "string") fig.imageSourceUrl = b.imageSourceUrl;
      if (typeof b.imageLicense === "string") fig.imageLicense = b.imageLicense;
      return fig;
    }
    case "placeholder":
      return { type: "placeholder", text: String(b.text ?? "") };
    default:
      if (typeof b.text === "string" && b.text.trim()) {
        return { type: "paragraph", text: b.text.trim() };
      }
      return null;
  }
}

export function sanitizeDraft(draft: unknown): ReportDraft {
  const raw = (draft && typeof draft === "object" ? draft : {}) as any;
  const baseId =
    typeof raw.id === "string" && raw.id
      ? raw.id
      : typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `draft-${Date.now()}`;
  const base = emptyDraft(baseId);

  const academic: AcademicDetails = {
    projectTitle: String(raw.academic?.projectTitle ?? base.academic.projectTitle),
    courseCode: String(raw.academic?.courseCode ?? base.academic.courseCode),
    courseName: String(raw.academic?.courseName ?? base.academic.courseName),
    degree: String(raw.academic?.degree ?? base.academic.degree),
    department: String(raw.academic?.department ?? base.academic.department),
    institution: String(raw.academic?.institution ?? base.academic.institution),
    institutionLine2: String(raw.academic?.institutionLine2 ?? base.academic.institutionLine2),
    submissionMonthYear: String(raw.academic?.submissionMonthYear ?? base.academic.submissionMonthYear),
  };
  if (typeof raw.academic?.slot === "string") {
    academic.slot = raw.academic.slot;
  }
  if (typeof raw.academic?.branch === "string") {
    academic.branch = raw.academic.branch;
  }
  if (typeof raw.academic?.academicYear === "string") {
    academic.academicYear = raw.academic.academicYear;
  }

  const students: Student[] =
    Array.isArray(raw.students) && raw.students.length > 0
      ? raw.students.map((s: any, idx: number) => {
          const st: Student = {
            id: String(s?.id || `student-${idx + 1}`),
            name: String(s?.name || ""),
            regNo: String(s?.regNo || ""),
          };
          if (typeof s?.responsibilities === "string") {
            st.responsibilities = s.responsibilities;
          }
          if (typeof s?.contribution === "string") {
            st.contribution = s.contribution;
          }
          return st;
        })
      : base.students;

  const faculty: FacultyDetails = {
    guideName: String(raw.faculty?.guideName ?? base.faculty.guideName),
    guideDepartment: String(raw.faculty?.guideDepartment ?? base.faculty.guideDepartment),
    courseCoordinator: String(raw.faculty?.courseCoordinator ?? base.faculty.courseCoordinator),
    courseCoordinatorDepartment: String(raw.faculty?.courseCoordinatorDepartment ?? base.faculty.courseCoordinatorDepartment),
  };
  if (typeof raw.faculty?.guideDesignation === "string") {
    faculty.guideDesignation = raw.faculty.guideDesignation;
  }
  if (typeof raw.faculty?.courseFaculty === "string") {
    faculty.courseFaculty = raw.faculty.courseFaculty;
  }

  const project: ProjectDetails = {
    domain: String(raw.project?.domain ?? base.project.domain),
    description: String(raw.project?.description ?? base.project.description),
    problemStatement: String(raw.project?.problemStatement ?? base.project.problemStatement),
    objectives: String(raw.project?.objectives ?? base.project.objectives),
    methodology: String(raw.project?.methodology ?? base.project.methodology),
    technologies: String(raw.project?.technologies ?? base.project.technologies),
    dataset: String(raw.project?.dataset ?? base.project.dataset),
    hardware: String(raw.project?.hardware ?? base.project.hardware),
    software: String(raw.project?.software ?? base.project.software),
    expectedResults: String(raw.project?.expectedResults ?? base.project.expectedResults),
    supportingNotes: String(raw.project?.supportingNotes ?? base.project.supportingNotes),
  };

  const validLengths: GenerationOptions["length"][] = ["short", "standard", "detailed"];
  const validStyles: GenerationOptions["style"][] = ["academic", "technical", "professional", "research"];
  const validModes: GenerationOptions["mode"][] = ["complete", "selected", "improve"];

  const options: GenerationOptions = {
    length: validLengths.includes(raw.options?.length) ? raw.options.length : base.options.length,
    style: validStyles.includes(raw.options?.style) ? raw.options.style : base.options.style,
    mode: validModes.includes(raw.options?.mode) ? raw.options.mode : base.options.mode,
    selectedChapters: Array.isArray(raw.options?.selectedChapters) ? raw.options.selectedChapters : base.options.selectedChapters,
    referenceStyle: "IEEE",
  };

  const chapters: Chapter[] = CHAPTER_SPEC.map((spec) => {
    const existing = Array.isArray(raw.chapters)
      ? raw.chapters.find((c: any) => c && c.id === spec.id)
      : undefined;
    const rawBlocks = Array.isArray(existing?.blocks) ? existing.blocks : [];
    let blocks: Block[] = rawBlocks
      .map((b: any) => sanitizeBlock(b))
      .filter((b: Block | null): b is Block => b !== null);

    const cap = CHAPTER_WORD_CAPS[spec.id as ChapterId] || 1100;
    blocks = trimBlocksToWordBudget(blocks, cap);

    const validStatuses: ChapterStatus[] = ["queued", "writing", "done", "error"];
    const status: ChapterStatus = validStatuses.includes(existing?.status) ? existing.status : "queued";

    const ch: Chapter = {
      id: spec.id,
      number: spec.number,
      title: typeof existing?.title === "string" ? existing.title : spec.title,
      status,
      blocks,
    };
    if (typeof existing?.error === "string") {
      ch.error = existing.error;
    }
    return ch;
  });

  const rawWriteUp = raw.onePageWriteUp || {};
  const onePageWriteUp: OnePageWriteUp = {
    slot: String(rawWriteUp.slot ?? raw.academic?.slot ?? base.onePageWriteUp?.slot ?? ""),
    geotagImage: typeof rawWriteUp.geotagImage === "string" ? rawWriteUp.geotagImage : "",
    pptTitleImage: typeof rawWriteUp.pptTitleImage === "string" ? rawWriteUp.pptTitleImage : "",
    modelImage: typeof rawWriteUp.modelImage === "string" ? rawWriteUp.modelImage : "",
    projectDescription: typeof rawWriteUp.projectDescription === "string" ? rawWriteUp.projectDescription : "",
  };

  return {
    id: baseId,
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : base.createdAt,
    updatedAt: typeof raw.updatedAt === "number" ? raw.updatedAt : base.updatedAt,
    step: typeof raw.step === "number" ? raw.step : base.step,
    reference: raw.reference ?? null,
    analysis: raw.analysis ?? null,
    academic,
    students,
    faculty,
    project,
    options,
    chapters,
    onePageWriteUp,
  };
}


