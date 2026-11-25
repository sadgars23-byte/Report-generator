import { emptyDraft, sanitizeDraft, type ReportDraft } from "./report-types";

// Veritas report drafts storage
const KEY_LEGACY = "veritas.drafts.v1";
const KEY_INDEX = "veritas.drafts.index.v2";
const DRAFT_KEY_PREFIX = "veritas.draft.v2.";

// In-memory store guaranteeing session data is NEVER lost due to localStorage quota limits
const memoryDrafts = new Map<string, ReportDraft>();
let isInitialized = false;

function initFromDisk() {
  if (isInitialized || typeof window === "undefined") return;
  isInitialized = true;

  try {
    // 1. Try to load modern per-draft index
    const indexRaw = window.localStorage.getItem(KEY_INDEX);
    if (indexRaw) {
      const ids = JSON.parse(indexRaw) as string[];
      if (Array.isArray(ids)) {
        for (const id of ids) {
          try {
            const raw = window.localStorage.getItem(`${DRAFT_KEY_PREFIX}${id}`);
            if (raw) {
              const d = sanitizeDraft(JSON.parse(raw));
              memoryDrafts.set(d.id, d);
            }
          } catch {
            // ignore corrupt individual draft
          }
        }
      }
    }

    // 2. Fall back / migrate legacy multi-draft bundle if present
    if (memoryDrafts.size === 0) {
      const legacyRaw = window.localStorage.getItem(KEY_LEGACY);
      if (legacyRaw) {
        const parsed = JSON.parse(legacyRaw);
        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            const d = sanitizeDraft(item);
            memoryDrafts.set(d.id, d);
          }
        }
      }
    }
  } catch {
    // Start fresh in-memory if disk is unreadable
  }
}

function persistToDisk() {
  if (typeof window === "undefined") return;
  try {
    const drafts = Array.from(memoryDrafts.values());
    const ids = drafts.map((d) => d.id);

    // Save lightweight index
    try {
      window.localStorage.setItem(KEY_INDEX, JSON.stringify(ids));
    } catch {
      // ignore
    }

    // Save each draft independently so a single large report doesn't fail everything
    for (const d of drafts) {
      try {
        window.localStorage.setItem(`${DRAFT_KEY_PREFIX}${d.id}`, JSON.stringify(d));
      } catch {
        // If single draft exceeds quota (e.g. huge images), keep full version in memory
      }
    }

    // Also attempt backward-compatible legacy key if space permits
    try {
      window.localStorage.setItem(KEY_LEGACY, JSON.stringify(drafts));
    } catch {
      // Legacy key quota exceeded, individual per-draft keys and memory handle persistence
    }
  } catch {
    // Handled gracefully in memory
  }
}

export function listDrafts(): ReportDraft[] {
  initFromDisk();
  return Array.from(memoryDrafts.values()).sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getDraft(id: string): ReportDraft | null {
  initFromDisk();
  if (memoryDrafts.has(id)) {
    return memoryDrafts.get(id)!;
  }
  // Direct disk lookup fallback
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(`${DRAFT_KEY_PREFIX}${id}`);
      if (raw) {
        const d = sanitizeDraft(JSON.parse(raw));
        memoryDrafts.set(d.id, d);
        return d;
      }
    } catch {
      // ignore
    }
  }
  return null;
}

export function saveDraft(draft: ReportDraft) {
  initFromDisk();
  const sanitized = sanitizeDraft(draft);
  const next: ReportDraft = { ...sanitized, updatedAt: Date.now() };
  // Immediately persist in memory
  memoryDrafts.set(next.id, next);
  // Asynchronously flush to disk
  persistToDisk();
}

export function deleteDraft(id: string) {
  initFromDisk();
  memoryDrafts.delete(id);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(`${DRAFT_KEY_PREFIX}${id}`);
    } catch {
      // ignore
    }
    persistToDisk();
  }
}

export function createDraft(): ReportDraft {
  initFromDisk();
  const draft = emptyDraft(typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `draft-${Date.now()}`);
  saveDraft(draft);
  return draft;
}
