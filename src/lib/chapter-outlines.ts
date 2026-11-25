import type { ChapterId, ReportDraft } from "./report-types";

export const OUTLINES: Record<ChapterId, string> = {
  abstract: `A single continuous abstract of strictly 340 to 350 words only (never under 330 words, strictly up to 350 words) covering: engineering problem, need and
significance, proposed solution, methodology, quantitative major results (e.g. accuracy metrics, latency measurements, throughput benchmarks), and principal conclusion. Follow with a heading "Keywords" and 4-6 keywords as one line. NEVER output placeholders like [USER INPUT REQUIRED] or [RESULT DATA REQUIRED] — synthesize realistic, authoritative engineering numbers and conclusions. Do NOT include an "Abstract" heading in the blocks (the section heading is already provided). Fits on 1 page (strictly 340-350 words only).`,
  ch1: `1.1 Background
1.2 Need for the Project (why it matters, target beneficiaries, limitations in existing systems, engineering significance)
1.3 Problem Statement (multi-factorial technical challenges, complexity, conflicting constraints)
1.4 Project Aim
1.5 Project Objectives (numbered, measurable, concrete deliverables)
1.6 Scope (included features, excluded boundaries, technical assumptions)
1.7 Expected Engineering Outcome (practical utility, hardware/software artifacts, societal value)
Keep prose high-density, authoritative, and rigorous. STRICT WORD BUDGET: 950–1,000 words total so Chapter 1 fits strictly within 3-4 pages and satisfies the report target of 6,000 to 6,400 words total.`,
  ch2: `2.1 Review Method (search criteria, database indexing, literature categorization)
2.2 Review of Existing Work (critical evaluation of past research and commercial systems)
2.3 Comparative Analysis — REQUIRED table with headers: Existing Approach | Advantages | Limitations | Relevance to Proposed Work
2.4 Research / Engineering Gap (explicit technical deficiencies addressed in this work)
2.5 Proposed Contribution (novelty, optimization strategies, architectural advantages)
Keep prose high-density and focused with 1 comprehensive comparative table. STRICT WORD BUDGET: 960–1,020 words total so Chapter 2 fits strictly within 3-4 pages and satisfies the report target of 6,000 to 6,400 words total.`,
  ch3: `3.1 Requirements — table 1 headers: Stakeholder | Requirement; table 2 headers: Requirement | Type | Measurable Target
3.2 Constraints & Applicable Standards — table headers: Standard / Code | Requirement | How Applied in This Project (name specific IEEE, ISO/IEC or W3C standards with formal codes)
3.3 Design Specifications — table headers: Parameter | Target / Requirement | Unit | Priority
3.4 Alternative Solutions & Evaluation — 2-3 design alternatives evaluated rigorously, followed by table headers: Criterion | Weight | Alternative 1 | Alternative 2 | Alternative 3
3.5 Selected Design & Detailed Architecture — justification based on evaluation evidence, a figure block with caption "Figure 3.1: System Architecture Diagram" and placeholder "Modular system architecture block diagram showing inputs, processing engine, and outputs", a figure block with caption "Figure 3.2: Operational Flowchart and Data Processing Pipeline" and placeholder "Process workflow and decision logic", plus an architectural integration paragraph
3.6 Trade-off Analysis — table headers: Design Decision | Alternative Considered | Benefit | Disadvantage | Final Decision & Justification
3.7 Sustainability, Ethics, Safety, Risk & Security — table headers: Domain | Consideration | Evidence Evaluated | Impact on Final Decision, followed by a sub-heading "Risk Register" with table headers: Risk | Likelihood | Severity | Risk Level | Mitigation | Residual Risk
Keep tables and sections concise. STRICT WORD BUDGET: 1,100–1,180 words total so Chapter 3 fits strictly within 4-5 pages and satisfies the report target of 6,000 to 6,400 words total.`,
  ch4: `4.1 Development Approach & Resources (methodological lifecycle, hardware/software specifications)
4.2 Implementation and Modern Tools Used — sub-headings for Hardware, Software, and System Toolchain, table headers: Tool / Software / Equipment | Purpose | Stage Used, plus a figure block with caption "Figure 4.1: Implementation Architecture and Integration Diagram" and placeholder "Component integration schematic and modular interaction topology"
4.3 Test Plan & Verification — table 1 headers: Requirement | Test Method | Acceptance Criterion; table 2 headers: Specification | Required Value | Achieved Value | Status (populate realistic quantitative achieved metrics and mark Pass/Fail)
4.4 Results & Discussion — comprehensive quantitative discussion, a performance results table, and figure blocks: caption "Figure 4.2: Experimental Results and Performance Benchmark Curves" and placeholder "Comparative benchmark performance curve", caption "Figure 4.3: Latency and Throughput Evaluation Under Operational Load" and placeholder "Response latency and resource efficiency graph"
4.5 Data Analysis & Engineering Judgment (statistical error margins, confidence bounds, trade-off verification)
4.6 Comparison with Existing Solutions & Achievement of Objectives — table headers: Objective | Evidence | Achievement
4.7 Strengths & Limitations — honest technical bullet lists
4.8 Project Planning, Roles & Budget — milestone/Gantt timeline table, table headers: Student | Assigned Responsibility | Actual Contribution using the exact student names supplied, and table headers: Item | Estimated Cost | Actual Cost
Keep data tables and paragraphs compact and rigorous. STRICT WORD BUDGET: 1,100–1,180 words total so Chapter 4 fits strictly within 4-5 pages and satisfies the report target of 6,000 to 6,400 words total.`,
  ch5: `5.1 Conclusion (system achievements, technical summary, objectives fulfilled)
5.2 Future Work (enhancements, scalability, domain adaptations)
5.3 Professional Learning & Individual Reflection — sub-headings "New Knowledge Acquired" and "Engineering & Professional Skills Developed" as bullets, then "Individual Reflection" with a separate sub-heading per student (use exact student names) covering: most difficult engineering problem and how it was solved, a key engineering decision and its evidence, knowledge acquired independently, what would be redesigned
Keep concise and focused. STRICT WORD BUDGET: 600–650 words total so Chapter 5 fits strictly within 2-3 pages and satisfies the report target of 6,000 to 6,400 words total.`,
  references: `A single numbered IEEE-style reference list as a "numbered" block (12-15 authentic IEEE format citations starting strictly at number 1 and continuing sequentially up to 12-15). Formatted exactly in standard IEEE citation style. NEVER emit placeholders like [REFERENCE VERIFICATION REQUIRED]. Word budget: 260-300 words total. Fits strictly on 1-2 pages.`,
  appendices: `Use the institutional fixed appendix structure, each as a heading level 2, in this exact order:
"Appendix A – Detailed Calculations" (1 concise paragraph with mathematical equations/bounds)
"Appendix B – Design Drawings / Circuit Diagrams" (1 concise paragraph with schematic architecture description)
"Appendix C – Simulation / Modelling Results" (1 concise paragraph with simulation parameters and results)
"Appendix D – Program Code Listings" (1 concise paragraph with core algorithm pseudocode)
"Appendix E – Component Datasheets & Specifications" (1 compact summary table of key component parameters)
"Appendix F – Test Data and Observation Sheets" (1 concise paragraph with key test trial metrics)
"Appendix G – Survey / Questionnaire Instruments" (1 concise paragraph with evaluation criteria)
"Appendix H – Standards and Codes Referenced" (1 concise paragraph listing IEEE/ISO standards complied with)
"Appendix I – Bill of Materials and Cost Details" (1 compact cost table with 4-5 rows)
"Appendix J – Individual Contribution Evidence" (1 concise paragraph on version control and team contribution verification)
IMPORTANT: Keep each appendix concise and dense. Total word count across all appendices must be between 330 and 370 words total, fitting strictly within 2 to 3 pages total. NEVER emit placeholders or write [USER INPUT REQUIRED].`,
  outcomes: `A single comprehensive table with headers: Outcome | Evidence | SO / Area | Location in Report, mapping:
complex engineering problem formulation, engineering design under constraints, technical
communication, ethics and professional responsibility, teamwork and leadership, experimentation and
analysis, independent acquisition of knowledge, standards, sustainability, risk assessment,
security, integrated system-level engineering, project planning, individual contribution — each
mapped to the actual chapter/section of this report. Word budget: 170-200 words. Must fit on 1 page.`,
};

export function buildContext(draft: ReportDraft): string {
  const a = draft.academic;
  const p = draft.project;
  const students = draft.students
    .map(
      (s, i) =>
        `  ${i + 1}. ${s.name || `Student ${i + 1}`} (Reg. No: ${s.regNo || "N/A"})`,
    )
    .join("\n");

  return `Project Title: ${a.projectTitle || "Advanced Engineering Capstone Project"}
Course: ${a.courseCode || "Capstone Course"} — ${a.courseName || "Capstone Project Work"}
Degree: ${a.degree || "Bachelor of Technology"}
Department: ${a.department || "Engineering"}
Institution: ${a.institution || "SIMATS Engineering"}
Submission: ${a.submissionMonthYear}
Guide / Supervisor: ${draft.faculty.guideName} (${draft.faculty.guideDepartment || a.department})
Course Coordinator: ${draft.faculty.courseCoordinator} (${draft.faculty.courseCoordinatorDepartment || a.department})
Students:
${students}

Project Details:
Title: ${a.projectTitle || p.description}
${p.domain ? `Domain: ${p.domain}` : ""}
${p.description ? `Description: ${p.description}` : ""}
${p.technologies ? `Technologies: ${p.technologies}` : ""}
${p.supportingNotes ? `Supporting notes: ${p.supportingNotes.slice(0, 4000)}` : ""}`;
}

export function buildStructureHint(draft: ReportDraft): string {
  const an = draft.analysis;
  if (!an) return "Standard capstone structure: CHAPTER n headings, n.n numbered sections.";
  return `Sections in order: ${an.sections.join(" > ")}
Heading hierarchy: ${an.headingHierarchy.join(" | ")}
Expected tables: ${an.tables.join("; ")}
Reference style: ${an.referenceStyle}
Notes: ${an.notes.join(" ")}`;
}
