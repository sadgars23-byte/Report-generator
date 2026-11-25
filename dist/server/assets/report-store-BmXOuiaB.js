import { s as emptyDraft, u as sanitizeDraft } from "./report-types-A-vaj4lV.js";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region src/lib/report-store.ts
var KEY_LEGACY = "veritas.drafts.v1";
var KEY_INDEX = "veritas.drafts.index.v2";
var DRAFT_KEY_PREFIX = "veritas.draft.v2.";
var memoryDrafts = /* @__PURE__ */ new Map();
var isInitialized = false;
function initFromDisk() {
	if (isInitialized || typeof window === "undefined") return;
	isInitialized = true;
	try {
		const indexRaw = window.localStorage.getItem(KEY_INDEX);
		if (indexRaw) {
			const ids = JSON.parse(indexRaw);
			if (Array.isArray(ids)) for (const id of ids) try {
				const raw = window.localStorage.getItem(`${DRAFT_KEY_PREFIX}${id}`);
				if (raw) {
					const d = sanitizeDraft(JSON.parse(raw));
					memoryDrafts.set(d.id, d);
				}
			} catch {}
		}
		if (memoryDrafts.size === 0) {
			const legacyRaw = window.localStorage.getItem(KEY_LEGACY);
			if (legacyRaw) {
				const parsed = JSON.parse(legacyRaw);
				if (Array.isArray(parsed)) for (const item of parsed) {
					const d = sanitizeDraft(item);
					memoryDrafts.set(d.id, d);
				}
			}
		}
	} catch {}
}
function persistToDisk() {
	if (typeof window === "undefined") return;
	try {
		const drafts = Array.from(memoryDrafts.values());
		const ids = drafts.map((d) => d.id);
		try {
			window.localStorage.setItem(KEY_INDEX, JSON.stringify(ids));
		} catch {}
		for (const d of drafts) try {
			window.localStorage.setItem(`${DRAFT_KEY_PREFIX}${d.id}`, JSON.stringify(d));
		} catch {}
		try {
			window.localStorage.setItem(KEY_LEGACY, JSON.stringify(drafts));
		} catch {}
	} catch {}
}
function listDrafts() {
	initFromDisk();
	return Array.from(memoryDrafts.values()).sort((a, b) => b.updatedAt - a.updatedAt);
}
function getDraft(id) {
	initFromDisk();
	if (memoryDrafts.has(id)) return memoryDrafts.get(id);
	if (typeof window !== "undefined") try {
		const raw = window.localStorage.getItem(`${DRAFT_KEY_PREFIX}${id}`);
		if (raw) {
			const d = sanitizeDraft(JSON.parse(raw));
			memoryDrafts.set(d.id, d);
			return d;
		}
	} catch {}
	return null;
}
function saveDraft(draft) {
	initFromDisk();
	const next = {
		...sanitizeDraft(draft),
		updatedAt: Date.now()
	};
	memoryDrafts.set(next.id, next);
	persistToDisk();
}
function deleteDraft(id) {
	initFromDisk();
	memoryDrafts.delete(id);
	if (typeof window !== "undefined") {
		try {
			window.localStorage.removeItem(`${DRAFT_KEY_PREFIX}${id}`);
		} catch {}
		persistToDisk();
	}
}
function createDraft() {
	initFromDisk();
	const draft = emptyDraft(typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `draft-${Date.now()}`);
	saveDraft(draft);
	return draft;
}
//#endregion
export { saveDraft as a, listDrafts as i, deleteDraft as n, Button as o, getDraft as r, cn as s, createDraft as t };
