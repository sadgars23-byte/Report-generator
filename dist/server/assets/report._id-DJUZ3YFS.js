import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-Tm4EhhXB.js";
import { d as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { a as DEFAULT_INSTITUTION_LINE_2, c as getCurrentSubmissionMonthYear, i as DEFAULT_INSTITUTION, o as countWordsInDraft, r as DEFAULT_ANALYSIS, t as CHAPTER_SPEC, u as sanitizeDraft } from "./report-types-A-vaj4lV.js";
import { a as generateFigure32Svg, c as generateFigure43SvgFallback, i as generateFigure31Svg, o as generateFigure41Svg, r as determineFigureType, s as generateFigure42SvgFallback, t as localChapterBlocks } from "./chapter-generator-BbpK6vVL.js";
import { t as Route } from "./report._id-BmXNFL7G.js";
import { a as saveDraft, o as Button, r as getDraft, s as cn } from "./report-store-BmXOuiaB.js";
import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, isRedirect, useNavigate, useRouter } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { toast } from "sonner";
import { AlertTriangle, ArrowLeft, ArrowRight, Camera, Check, ChevronDown, ChevronRight, ChevronUp, Circle, Cpu, Download, FileText, Globe, ImageIcon, Key, Layers, Loader2, Plus, RefreshCw, RotateCw, ShieldCheck, Sparkles, Trash2, Users, X } from "lucide-react";
import { cva } from "class-variance-authority";
import JSZip from "jszip";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlignmentType, Bookmark, BorderStyle, Document, Footer, HeadingLevel, ImageRun, LevelFormat, NumberFormat, Packer, PageBreak, PageNumber, Paragraph, SectionType, ShadingType, SimpleField, Table, TableCell, TableRow, TextRun, VerticalAlign, WidthType } from "docx";
//#region node_modules/@tanstack/react-start/dist/esm/useServerFn.js
function useServerFn(serverFn) {
	const router = useRouter();
	return React.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
//#endregion
//#region src/assets/simats-seal.png
var simats_seal_default = "/assets/simats-seal-MSZeoTl_.png";
//#endregion
//#region src/assets/simats-excel-logo.png
var simats_excel_logo_default = "/assets/simats-excel-logo-Bjmt_nwZ.png";
//#endregion
//#region src/components/ui/input.tsx
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/ui/label.tsx
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = LabelPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/progress.tsx
var Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(ProgressPrimitive.Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ jsx(ProgressPrimitive.Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = ProgressPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/select.tsx
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		asChild: true,
		children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
		/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ jsx(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
//#endregion
//#region src/components/ui/checkbox.tsx
var Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(CheckboxPrimitive.Root, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/dropdown-menu.tsx
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.SubTrigger, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.SubContent, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.CheckboxItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.RadioItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ jsx("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
//#endregion
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/AiSettingsDialog.tsx
function AiSettingsDialog({ open, onOpenChange, currentConfig, onSave, serverStatus }) {
	const [provider, setProvider] = useState(currentConfig.provider || "offline");
	const [apiKey, setApiKey] = useState(currentConfig.apiKey || "");
	const [model, setModel] = useState(currentConfig.model || "");
	const [baseUrl, setBaseUrl] = useState(currentConfig.baseUrl || "");
	function handleProviderChange(val) {
		setProvider(val);
		if (val === "gemini" && !model) setModel("gemini-2.5-flash");
		else if (val === "groq" && !model) setModel("llama-3.3-70b-versatile");
		else if (val === "openai" && !model) setModel("gpt-4o-mini");
	}
	function handleSave() {
		onSave({
			provider,
			apiKey: provider === "offline" ? "" : apiKey.trim(),
			model: provider === "offline" ? "" : model.trim(),
			baseUrl: provider === "openai" ? baseUrl.trim() : void 0
		});
	}
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-w-md sm:max-w-lg",
			children: [
				/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
					className: "flex items-center gap-2 text-lg font-display tracking-wide",
					children: [/* @__PURE__ */ jsx(Sparkles, { className: "size-5 text-accent" }), "AI Model & Engine Settings"]
				}), /* @__PURE__ */ jsx(DialogDescription, {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "Choose whether to generate reports using Google Gemini, Groq, or OpenAI API, or use the 100% offline local engine. The local engine generates all 5 figures (SVG/Matplotlib), authentic references, and complete Appendices A–J without requiring an API key."
				})] }),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-4 py-2 text-sm",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ jsx(Label, {
							className: "text-xs font-semibold",
							children: "Engine Provider"
						}), /* @__PURE__ */ jsxs(Select, {
							value: provider,
							onValueChange: handleProviderChange,
							children: [/* @__PURE__ */ jsx(SelectTrigger, {
								className: "w-full",
								children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select an AI engine..." })
							}), /* @__PURE__ */ jsxs(SelectContent, { children: [
								/* @__PURE__ */ jsx(SelectItem, {
									value: "offline",
									children: "🟢 Smart Local Engine (100% Offline • No API Key)"
								}),
								/* @__PURE__ */ jsx(SelectItem, {
									value: "gemini",
									children: "✨ Google Gemini API (gemini-2.5-flash / gemini-1.5-flash)"
								}),
								/* @__PURE__ */ jsx(SelectItem, {
									value: "groq",
									children: "⚡ Groq Cloud (Ultra-Fast Llama 3.3 70B)"
								}),
								/* @__PURE__ */ jsx(SelectItem, {
									value: "openai",
									children: "🌐 OpenAI / Custom Endpoint (GPT-4o, Ollama, LocalAI)"
								})
							] })]
						})]
					}), provider === "offline" ? /* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3.5 space-y-2 text-xs",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400",
							children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "size-4 shrink-0" }), /* @__PURE__ */ jsx("span", { children: "Smart Local Deterministic Engine Active" })]
						}), /* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground leading-relaxed",
							children: "Generates high-density, domain-tailored capstone chapters, full high-resolution vector diagrams (Figure 3.1, 3.2, 4.1), scientific benchmark plots (Figure 4.2, 4.3), 14 authentic IEEE citations, and detailed Appendices A–J. Zero network quota or API key required."
						})]
					}) : /* @__PURE__ */ jsxs(Fragment, { children: [
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsxs(Label, {
										className: "text-xs font-semibold flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx(Key, { className: "size-3.5 text-muted-foreground" }), provider === "gemini" ? "Google Gemini API Key" : provider === "groq" ? "Groq API Key" : "API Key"]
									}), serverStatus?.hasKey && !apiKey && /* @__PURE__ */ jsx("span", {
										className: "text-[11px] text-emerald-600 dark:text-emerald-400 font-mono",
										children: "(Server env key detected)"
									})]
								}),
								/* @__PURE__ */ jsx(Input, {
									type: "password",
									placeholder: provider === "gemini" ? "AIzaSy..." : provider === "groq" ? "gsk_..." : "sk-...",
									value: apiKey,
									onChange: (e) => setApiKey(e.target.value),
									className: "font-mono text-xs"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-[11px] text-muted-foreground",
									children: provider === "gemini" ? /* @__PURE__ */ jsxs(Fragment, { children: [
										"Get a free key from",
										" ",
										/* @__PURE__ */ jsx("a", {
											href: "https://aistudio.google.com/app/apikey",
											target: "_blank",
											rel: "noreferrer",
											className: "text-accent underline",
											children: "Google AI Studio"
										}),
										"."
									] }) : provider === "groq" ? /* @__PURE__ */ jsxs(Fragment, { children: [
										"Get a free ultra-fast key from",
										" ",
										/* @__PURE__ */ jsx("a", {
											href: "https://console.groq.com/keys",
											target: "_blank",
											rel: "noreferrer",
											className: "text-accent underline",
											children: "Groq Console"
										}),
										"."
									] }) : "Stored securely in local browser storage."
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsxs(Label, {
								className: "text-xs font-semibold flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx(Cpu, { className: "size-3.5 text-muted-foreground" }), "Model Identifier"]
							}), /* @__PURE__ */ jsx(Input, {
								type: "text",
								placeholder: provider === "gemini" ? "gemini-2.5-flash" : provider === "groq" ? "llama-3.3-70b-versatile" : "gpt-4o-mini",
								value: model,
								onChange: (e) => setModel(e.target.value),
								className: "font-mono text-xs"
							})]
						}),
						provider === "openai" && /* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ jsxs(Label, {
									className: "text-xs font-semibold flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx(Globe, { className: "size-3.5 text-muted-foreground" }), "Base URL (Optional)"]
								}),
								/* @__PURE__ */ jsx(Input, {
									type: "text",
									placeholder: "https://api.openai.com/v1 or http://localhost:11434/v1",
									value: baseUrl,
									onChange: (e) => setBaseUrl(e.target.value),
									className: "font-mono text-xs"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Leave blank for official OpenAI, or point to local Ollama / vLLM endpoint."
								})
							]
						})
					] })]
				}),
				/* @__PURE__ */ jsxs(DialogFooter, {
					className: "gap-2 sm:gap-0",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: () => onOpenChange(false),
						className: "text-xs",
						children: "Cancel"
					}), /* @__PURE__ */ jsxs(Button, {
						onClick: handleSave,
						className: "gap-1.5 text-xs",
						children: [/* @__PURE__ */ jsx(Check, { className: "size-3.5" }), " Save Configuration"]
					})]
				})
			]
		})
	});
}
//#endregion
//#region node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/ai.functions.ts
if (typeof process !== "undefined" && typeof process.loadEnvFile === "function") try {
	process.loadEnvFile();
} catch {}
var getAiStatus = createServerFn({ method: "POST" }).validator((data) => z.object({ aiConfig: z.object({
	apiKey: z.string().optional(),
	baseUrl: z.string().optional(),
	model: z.string().optional(),
	provider: z.string().optional()
}).optional() }).optional().parse(data)).handler(createSsrRpc("ff37bd4a346b92aa36f1ec2ff6ed8b658f41e4d31cf5e569929a78526b554496"));
var analyzeSchema = z.object({
	fileName: z.string(),
	text: z.string()
});
var analyzeTemplate = createServerFn({ method: "POST" }).validator((data) => analyzeSchema.parse(data)).handler(createSsrRpc("3e061d3fb81b6b74383c986268186292686507715e1f748c605d262f35dd0258"));
var generateSchema = z.object({
	chapterId: z.string(),
	chapterTitle: z.string(),
	outline: z.string(),
	context: z.string(),
	length: z.string(),
	style: z.string(),
	structureHint: z.string(),
	existingContent: z.string().optional(),
	workerIndex: z.number().optional(),
	aiConfig: z.object({
		apiKey: z.string().optional(),
		baseUrl: z.string().optional(),
		model: z.string().optional(),
		provider: z.string().optional()
	}).optional()
});
var generateChapter = createServerFn({ method: "POST" }).validator((data) => generateSchema.parse(data)).handler(createSsrRpc("53b8f7e710b7386c4788c0703d263c01245cf82538c30a07c1b5348380a13c3e"));
var imageSchema = z.object({
	caption: z.string(),
	placeholder: z.string().optional(),
	projectTitle: z.string()
});
var generateFigureImage = createServerFn({ method: "POST" }).validator((data) => imageSchema.parse(data)).handler(createSsrRpc("75731372b9cde209304b8ca08cd0cb177a0dc345edf026d24b65989c1476a7f6"));
var writeUpDescriptionSchema = z.object({
	projectTitle: z.string(),
	courseName: z.string().optional(),
	domain: z.string().optional(),
	technologies: z.string().optional(),
	existingDescription: z.string().optional(),
	aiConfig: z.object({
		apiKey: z.string().optional(),
		baseUrl: z.string().optional(),
		model: z.string().optional(),
		provider: z.string().optional()
	}).optional()
});
var generateWriteUpDescription = createServerFn({ method: "POST" }).validator((data) => writeUpDescriptionSchema.parse(data)).handler(createSsrRpc("ba22a3a9d6adb5d61364ddacba06847bfea8ab9c211d50e29b284d1f20a0cc6b"));
//#endregion
//#region src/lib/chapter-outlines.ts
var OUTLINES = {
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
mapped to the actual chapter/section of this report. Word budget: 170-200 words. Must fit on 1 page.`
};
function buildContext(draft) {
	const a = draft.academic;
	const p = draft.project;
	const students = draft.students.map((s, i) => `  ${i + 1}. ${s.name || `Student ${i + 1}`} (Reg. No: ${s.regNo || "N/A"})`).join("\n");
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
${p.supportingNotes ? `Supporting notes: ${p.supportingNotes.slice(0, 4e3)}` : ""}`;
}
function buildStructureHint(draft) {
	const an = draft.analysis;
	if (!an) return "Standard capstone structure: CHAPTER n headings, n.n numbered sections.";
	return `Sections in order: ${an.sections.join(" > ")}
Heading hierarchy: ${an.headingHierarchy.join(" | ")}
Expected tables: ${an.tables.join("; ")}
Reference style: ${an.referenceStyle}
Notes: ${an.notes.join(" ")}`;
}
//#endregion
//#region src/assets/institution-logo.png
var institution_logo_default = "/assets/institution-logo-DkVZI2XI.png";
//#endregion
//#region src/lib/docx-builder.ts
var A4_W = 11906;
var A4_H = 16838;
var BLACK = "000000";
var cellBorder = {
	style: BorderStyle.SINGLE,
	size: 1,
	color: "000000"
};
var cellBorders = {
	top: cellBorder,
	bottom: cellBorder,
	left: cellBorder,
	right: cellBorder
};
var invisibleBorder = {
	style: BorderStyle.NONE,
	size: 0,
	color: "FFFFFF"
};
var invisibleBorders = {
	top: invisibleBorder,
	bottom: invisibleBorder,
	left: invisibleBorder,
	right: invisibleBorder,
	insideHorizontal: invisibleBorder,
	insideVertical: invisibleBorder
};
function layoutOf(draft) {
	return draft.analysis?.pageLayout ?? {
		pageSize: "A4",
		marginsInches: {
			top: 1,
			bottom: 1,
			left: 1.25,
			right: 1
		},
		bodyFont: "Times New Roman",
		bodyFontSizePt: 12,
		lineSpacing: 1.5,
		alignment: "justified",
		headingFont: "Times New Roman"
	};
}
function buildFileName(draft, submitterIndex) {
	const s = submitterIndex !== void 0 && draft.students[submitterIndex] ? draft.students[submitterIndex] : draft.students[0];
	return `${s?.name?.trim().replace(/[/\\?%*:|"<>]/g, "").trim() || (submitterIndex !== void 0 ? `Student ${submitterIndex + 1}` : "Student")} - ${s?.regNo?.trim().replace(/[/\\?%*:|"<>]/g, "").trim() || (submitterIndex !== void 0 ? `Reg ${submitterIndex + 1}` : "Registration Number")}.docx`;
}
function wrapText(ctx, text, maxWidth) {
	const words = text.split(/\s+/).filter(Boolean);
	const lines = [];
	let line = "";
	for (const w of words) {
		const next = line ? `${line} ${w}` : w;
		if (ctx.measureText(next).width > maxWidth && line) {
			lines.push(line);
			line = w;
		} else line = next;
	}
	if (line) lines.push(line);
	return lines;
}
var FIG_W = 1e3;
var FIG_H = 560;
async function renderFigurePng(title, description, projectTitle) {
	try {
		const figType = determineFigureType(title, description);
		const pTitle = (projectTitle || "Advanced Engineering Capstone System").trim();
		let svgRaw = "";
		if (figType === "3.1") svgRaw = generateFigure31Svg(pTitle, title);
		else if (figType === "3.2") svgRaw = generateFigure32Svg(pTitle, title);
		else if (figType === "4.1") svgRaw = generateFigure41Svg(pTitle, title);
		else if (figType === "4.2" || figType === "plot") svgRaw = generateFigure42SvgFallback(pTitle, title);
		else if (figType === "4.3") svgRaw = generateFigure43SvgFallback(pTitle, title);
		else svgRaw = generateFigure31Svg(pTitle, title);
		if (svgRaw) {
			const pngFromSvg = await renderSvgStringToPng(svgRaw);
			if (pngFromSvg) return pngFromSvg;
		}
	} catch {}
	try {
		if (typeof document === "undefined") return null;
		const canvas = document.createElement("canvas");
		canvas.width = FIG_W;
		canvas.height = FIG_H;
		const ctx = canvas.getContext("2d");
		if (!ctx) return null;
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, FIG_W, FIG_H);
		ctx.strokeStyle = "#1E293B";
		ctx.lineWidth = 2;
		ctx.strokeRect(10, 10, 980, 540);
		const stages = [
			{
				name: "DATA INGESTION",
				sub: "Input Streams & Config"
			},
			{
				name: "PRE-PROCESSING",
				sub: "Normalization & Features"
			},
			{
				name: "CORE PROCESSING",
				sub: "Algorithm & Optimization"
			},
			{
				name: "OUTPUT & ANALYTICS",
				sub: "Metrics, Logs & UI"
			}
		];
		const boxW = 200;
		const boxH = 145;
		const gap = 35;
		const totalW = stages.length * boxW + (stages.length - 1) * gap;
		const startX = (FIG_W - totalW) / 2;
		const y = 55;
		stages.forEach((s, i) => {
			const x = startX + i * 235;
			ctx.fillStyle = "#F8FAFC";
			ctx.fillRect(x, y, boxW, boxH);
			ctx.strokeStyle = "#334155";
			ctx.lineWidth = 2;
			ctx.strokeRect(x, y, boxW, boxH);
			ctx.fillStyle = "#E2E8F0";
			ctx.fillRect(x, y, boxW, 36);
			ctx.strokeRect(x, y, boxW, 36);
			ctx.fillStyle = "#0F172A";
			ctx.font = "bold 15px 'Times New Roman', sans-serif";
			const w1 = ctx.measureText(s.name).width;
			ctx.fillText(s.name, x + (boxW - w1) / 2, 75);
			ctx.fillStyle = "#475569";
			ctx.font = "14px 'Times New Roman', sans-serif";
			const w2 = ctx.measureText(s.sub).width;
			ctx.fillText(s.sub, x + (boxW - w2) / 2, 140);
			if (i < stages.length - 1) {
				const ax = x + boxW;
				const ay = 127.5;
				ctx.strokeStyle = "#2563EB";
				ctx.fillStyle = "#2563EB";
				ctx.lineWidth = 3;
				ctx.beginPath();
				ctx.moveTo(ax + 5, ay);
				ctx.lineTo(ax + gap - 10, ay);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(ax + gap - 5, ay);
				ctx.lineTo(ax + gap - 18, 120.5);
				ctx.lineTo(ax + gap - 18, 134.5);
				ctx.closePath();
				ctx.fill();
			}
		});
		ctx.strokeStyle = "#94A3B8";
		ctx.lineWidth = 1.5;
		ctx.setLineDash([6, 6]);
		ctx.strokeRect(startX, 235, totalW, 80);
		ctx.setLineDash([]);
		ctx.fillStyle = "#1E293B";
		ctx.font = "italic 16px 'Times New Roman', serif";
		const feedbackText = "Continuous Feedback, Error Evaluation & Validation Pipeline";
		const fw = ctx.measureText(feedbackText).width;
		ctx.fillText(feedbackText, (FIG_W - fw) / 2, 275);
		ctx.fillStyle = "#334155";
		ctx.font = "15px 'Times New Roman', Georgia, serif";
		wrapText(ctx, description.replace(/^figure[:\s\d.]*/i, "") || "Detailed engineering schematic diagram.", 880).slice(0, 3).forEach((l, i) => {
			const w = ctx.measureText(l).width;
			ctx.fillText(l, (FIG_W - w) / 2, 355 + i * 26);
		});
		const blob = await new Promise((res) => canvas.toBlob((b) => res(b), "image/png"));
		if (!blob) return null;
		return new Uint8Array(await blob.arrayBuffer());
	} catch {
		return null;
	}
}
function decodeBase64ToUtf8(base64) {
	try {
		if (typeof Buffer !== "undefined") return Buffer.from(base64, "base64").toString("utf-8");
	} catch {}
	try {
		const binary = atob(base64);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
		return new TextDecoder("utf-8").decode(bytes);
	} catch {
		return atob(base64);
	}
}
async function renderSvgStringToPng(svgString) {
	try {
		if (typeof document === "undefined") return null;
		return await new Promise((resolve) => {
			const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
			const url = URL.createObjectURL(blob);
			const img = new Image();
			const timeoutId = setTimeout(() => {
				URL.revokeObjectURL(url);
				resolve(null);
			}, 3e3);
			img.onload = () => {
				clearTimeout(timeoutId);
				try {
					const canvas = document.createElement("canvas");
					canvas.width = FIG_W;
					canvas.height = FIG_H;
					const ctx = canvas.getContext("2d");
					if (!ctx) {
						URL.revokeObjectURL(url);
						return resolve(null);
					}
					ctx.fillStyle = "#FFFFFF";
					ctx.fillRect(0, 0, FIG_W, FIG_H);
					ctx.drawImage(img, 0, 0, FIG_W, FIG_H);
					canvas.toBlob(async (b) => {
						URL.revokeObjectURL(url);
						if (b) resolve(new Uint8Array(await b.arrayBuffer()));
						else resolve(null);
					}, "image/png");
				} catch {
					URL.revokeObjectURL(url);
					resolve(null);
				}
			};
			img.onerror = () => {
				clearTimeout(timeoutId);
				URL.revokeObjectURL(url);
				resolve(null);
			};
			img.src = url;
		});
	} catch {
		return null;
	}
}
function estimateBlocksPages(blocks) {
	if (!blocks || blocks.length === 0) return 2;
	let weight = .1;
	for (const b of blocks) {
		if (!b || !b.type) continue;
		switch (b.type) {
			case "heading":
				weight += b.level === 3 ? .05 : .08;
				break;
			case "paragraph":
				weight += Math.max(.04, (b.text || "").trim().split(/\s+/).filter(Boolean).length / 320);
				break;
			case "bullets":
			case "numbered":
				weight += Math.max(.04, (b.items?.length || 0) * .04);
				break;
			case "table":
				weight += .15 + (b.rows?.length || 0) * .035;
				break;
			case "figure":
				weight += .42;
				break;
			default: weight += .05;
		}
	}
	return Math.max(1, Math.ceil(weight));
}
function toRoman(num) {
	const romanMap = [
		[10, "x"],
		[9, "ix"],
		[5, "v"],
		[4, "iv"],
		[1, "i"]
	];
	let res = "";
	let n = Math.max(1, Math.floor(num));
	for (const [val, rom] of romanMap) while (n >= val) {
		res += rom;
		n -= val;
	}
	return res;
}
var LOGO_W = 981;
var LOGO_H = 131;
async function loadAssetPng(url, filename) {
	try {
		const res = await fetch(url);
		if (res.ok) return new Uint8Array(await res.arrayBuffer());
	} catch {}
	try {
		if (typeof process !== "undefined" && process.cwd) {
			const fs = await import("fs");
			const p = (await import("path")).resolve(process.cwd(), `src/assets/${filename}`);
			if (fs.existsSync(p)) return new Uint8Array(fs.readFileSync(p));
		}
	} catch {}
	return null;
}
async function loadLogoPng() {
	return loadAssetPng(institution_logo_default, "institution-logo.png");
}
async function loadSimatsSealPng() {
	return loadAssetPng(simats_seal_default, "simats-seal.png");
}
async function loadSimatsExcelLogoPng() {
	return loadAssetPng(simats_excel_logo_default, "simats-excel-logo.png");
}
async function buildDocxUnbounded(draft, submitterIndex) {
	const L = layoutOf(draft);
	const FONT = L.bodyFont || "Times New Roman";
	const SIZE = Math.round((L.bodyFontSizePt || 12) * 2);
	const H1_SIZE = 28;
	const H2_SIZE = 24;
	const LINE = Math.round((L.lineSpacing || 1.5) * 240);
	const JUSTIFY = L.alignment === "left" ? AlignmentType.LEFT : AlignmentType.JUSTIFIED;
	const m = L.marginsInches;
	const body = (text, opts = {}) => new Paragraph({
		alignment: opts.align ?? JUSTIFY,
		spacing: {
			line: LINE,
			after: 120
		},
		children: [new TextRun({
			text,
			bold: opts.bold ?? false,
			italics: opts.italics ?? false,
			font: FONT,
			size: SIZE,
			color: BLACK
		})]
	});
	const centered = (text, sizePt, bold = false, caps = false, after = 120) => new Paragraph({
		alignment: AlignmentType.CENTER,
		spacing: {
			line: LINE,
			after
		},
		children: [new TextRun({
			text,
			bold,
			allCaps: caps,
			font: FONT,
			size: sizePt * 2,
			color: BLACK
		})]
	});
	const tocEntries = [];
	let bookmarkSeq = 0;
	const newBookmark = () => `sec_${++bookmarkSeq}`;
	const h1 = (text, toc = true, page, pageBreakBefore = false) => {
		const id = newBookmark();
		if (toc) tocEntries.push({
			title: text,
			bookmark: id,
			level: 1,
			...page ? { page } : {}
		});
		return new Paragraph({
			heading: HeadingLevel.HEADING_1,
			alignment: AlignmentType.CENTER,
			pageBreakBefore,
			spacing: {
				before: 240,
				after: 240,
				line: LINE
			},
			children: [new Bookmark({
				id,
				children: [new TextRun({
					text: text.toUpperCase(),
					bold: true,
					font: FONT,
					size: H1_SIZE,
					color: BLACK
				})]
			})]
		});
	};
	const h2 = (text, toc = true, page) => {
		const id = newBookmark();
		if (toc) tocEntries.push({
			title: text,
			bookmark: id,
			level: 2,
			...page ? { page } : {}
		});
		return new Paragraph({
			heading: HeadingLevel.HEADING_2,
			spacing: {
				before: 240,
				after: 120,
				line: LINE
			},
			children: [new Bookmark({
				id,
				children: [new TextRun({
					text,
					bold: true,
					font: FONT,
					size: H2_SIZE,
					color: BLACK
				})]
			})]
		});
	};
	const h3 = (text) => new Paragraph({
		heading: HeadingLevel.HEADING_3,
		spacing: {
			before: 180,
			after: 100,
			line: LINE
		},
		children: [new TextRun({
			text,
			bold: true,
			italics: true,
			font: FONT,
			size: H2_SIZE,
			color: BLACK
		})]
	});
	const contentWidth = A4_W - Math.round((m.left + m.right) * 1440);
	const makeTable = (headers, rows, columnWidths) => {
		const cols = Math.max(headers.length, 1);
		const widths = columnWidths && columnWidths.length === cols ? columnWidths : Array.from({ length: cols }, () => Math.floor(contentWidth / cols));
		const tableWidth = widths.reduce((a, b) => a + b, 0);
		const cell = (content, header, width) => new TableCell({
			borders: cellBorders,
			width: {
				size: width,
				type: WidthType.DXA
			},
			margins: {
				top: 80,
				bottom: 80,
				left: 120,
				right: 120
			},
			verticalAlign: VerticalAlign.CENTER,
			shading: {
				fill: header ? "E8E4DA" : "FFFFFF",
				type: ShadingType.CLEAR,
				color: "auto"
			},
			children: [typeof content === "string" ? new Paragraph({
				spacing: { line: 240 },
				children: [new TextRun({
					text: content ?? "",
					bold: header,
					font: FONT,
					size: SIZE - 4,
					color: BLACK
				})]
			}) : content]
		});
		return new Table({
			width: {
				size: tableWidth,
				type: WidthType.DXA
			},
			columnWidths: widths,
			rows: [new TableRow({
				tableHeader: true,
				children: headers.map((hd, i) => cell(hd, true, widths[i] ?? 0))
			}), ...rows.map((r) => new TableRow({ children: Array.from({ length: cols }, (_, i) => cell(r[i] ?? "", false, widths[i] ?? 0)) }))]
		});
	};
	const makeInvisibleTable = (headers, rows, columnWidths) => {
		const cols = Math.max(headers.length, 1);
		const widths = columnWidths && columnWidths.length === cols ? columnWidths : Array.from({ length: cols }, () => Math.floor(contentWidth / cols));
		const tableWidth = widths.reduce((a, b) => a + b, 0);
		const cell = (content, header, width) => new TableCell({
			borders: invisibleBorders,
			width: {
				size: width,
				type: WidthType.DXA
			},
			margins: {
				top: 100,
				bottom: 100,
				left: 140,
				right: 140
			},
			verticalAlign: VerticalAlign.CENTER,
			shading: {
				fill: "FFFFFF",
				type: ShadingType.CLEAR,
				color: "auto"
			},
			children: [typeof content === "string" ? new Paragraph({
				alignment: AlignmentType.LEFT,
				spacing: {
					line: 260,
					after: 60
				},
				children: [new TextRun({
					text: content ?? "",
					bold: header,
					font: FONT,
					size: header ? SIZE : SIZE - 2,
					color: BLACK
				})]
			}) : content]
		});
		return new Table({
			borders: invisibleBorders,
			width: {
				size: tableWidth,
				type: WidthType.DXA
			},
			columnWidths: widths,
			rows: [new TableRow({
				tableHeader: true,
				children: headers.map((hd, i) => cell(hd, true, widths[i] ?? 0))
			}), ...rows.map((r) => new TableRow({ children: Array.from({ length: cols }, (_, i) => cell(r[i] ?? "", false, widths[i] ?? 0)) }))]
		});
	};
	const caption = (text) => new Paragraph({
		alignment: AlignmentType.CENTER,
		spacing: {
			before: 80,
			after: 200,
			line: 240
		},
		children: [new TextRun({
			text,
			italics: true,
			font: FONT,
			size: SIZE - 4,
			color: BLACK
		})]
	});
	const counters = {
		figure: 0,
		table: 0
	};
	const figures = [];
	const tables = [];
	let listInstanceCounter = 0;
	const renderBlocks = async (blocks, numPrefix, basePage = 1) => {
		const out = [];
		let runningWeight = 0;
		for (const b of blocks || []) {
			if (!b || !b.type) continue;
			const curPage = `${basePage + Math.floor(runningWeight)}`;
			switch (b.type) {
				case "heading":
					out.push(b.level === 3 ? h3(b.text || "") : h2(b.text || "", true, curPage));
					runningWeight += b.level === 3 ? .05 : .08;
					break;
				case "paragraph": {
					out.push(body(b.text || ""));
					const words = (b.text || "").trim().split(/\s+/).filter(Boolean).length;
					runningWeight += Math.max(.04, words / 320);
					break;
				}
				case "bullets":
					for (const item of b.items || []) out.push(new Paragraph({
						numbering: {
							reference: "bullets",
							level: 0
						},
						spacing: {
							line: LINE,
							after: 60
						},
						children: [new TextRun({
							text: item,
							font: FONT,
							size: SIZE,
							color: BLACK
						})]
					}));
					runningWeight += Math.max(.04, (b.items?.length || 0) * .04);
					break;
				case "numbered":
					listInstanceCounter += 1;
					for (const item of b.items || []) out.push(new Paragraph({
						numbering: {
							reference: "numbers",
							level: 0,
							instance: listInstanceCounter
						},
						spacing: {
							line: LINE,
							after: 60
						},
						children: [new TextRun({
							text: item,
							font: FONT,
							size: SIZE,
							color: BLACK
						})]
					}));
					runningWeight += Math.max(.04, (b.items?.length || 0) * .04);
					break;
				case "table": {
					counters.table += 1;
					const label = `Table ${numPrefix}${counters.table}`;
					const text = `${label}: ${(b.caption || "").replace(/^table[:\s\d.]*/i, "")}`;
					tables.push({
						label,
						caption: text,
						page: curPage
					});
					out.push(caption(text));
					out.push(makeTable(b.headers ?? [], b.rows ?? []));
					runningWeight += .15 + (b.rows?.length || 0) * .035;
					break;
				}
				case "figure": {
					counters.figure += 1;
					const label = `Figure ${numPrefix}${counters.figure}`;
					const text = `${label}: ${(b.caption || "").replace(/^figure[:\s\d.]*/i, "")}`;
					figures.push({
						label,
						caption: text,
						page: curPage
					});
					let png = null;
					let imageType = "png";
					if (b.imageData && b.imageData.startsWith("data:image")) try {
						const mimeMatch = b.imageData.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,/i);
						const mime = mimeMatch?.[1] ? mimeMatch[1].toLowerCase() : "png";
						const base64 = b.imageData.split(",")[1];
						if (base64) if (mime.includes("svg")) {
							png = await renderSvgStringToPng(decodeBase64ToUtf8(base64));
							imageType = "png";
						} else {
							const binary = atob(base64);
							png = new Uint8Array(binary.length);
							for (let i = 0; i < binary.length; i++) png[i] = binary.charCodeAt(i);
							imageType = mime === "jpeg" || mime === "jpg" ? "jpg" : "png";
						}
					} catch {
						png = null;
					}
					else if (b.imageUrl) try {
						const res = await fetch(b.imageUrl);
						if (res.ok) {
							png = new Uint8Array(await res.arrayBuffer());
							imageType = b.imageUrl.includes(".jpg") || b.imageUrl.includes(".jpeg") ? "jpg" : "png";
						}
					} catch {
						png = null;
					}
					if (!png) {
						png = await renderFigurePng(text, b.placeholder || b.caption || "", draft.academic.projectTitle);
						imageType = "png";
					}
					if (png) out.push(new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {
							before: 160,
							after: 60
						},
						children: [new ImageRun({
							type: imageType,
							data: png,
							transformation: {
								width: 480,
								height: 270
							},
							altText: {
								title: label,
								description: text,
								name: label
							}
						})]
					}));
					else out.push(new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {
							before: 160,
							after: 60,
							line: LINE
						},
						border: {
							top: {
								style: BorderStyle.DASHED,
								size: 2,
								color: "000000",
								space: 6
							},
							bottom: {
								style: BorderStyle.DASHED,
								size: 2,
								color: "000000",
								space: 6
							},
							left: {
								style: BorderStyle.DASHED,
								size: 2,
								color: "000000",
								space: 6
							},
							right: {
								style: BorderStyle.DASHED,
								size: 2,
								color: "000000",
								space: 6
							}
						},
						children: [new TextRun({
							text: b.caption || b.placeholder || "Engineering Schematic Diagram",
							bold: true,
							font: FONT,
							size: SIZE,
							color: BLACK
						})]
					}));
					out.push(caption(text));
					if (b.imageSourceUrl) {
						const sourceLine = `Image source: ${b.imageSourceTitle || "Wikimedia Commons"}; license: ${b.imageLicense || "see source page"}; ${b.imageSourceUrl}`;
						out.push(new Paragraph({
							alignment: AlignmentType.CENTER,
							spacing: { after: 100 },
							children: [new TextRun({
								text: sourceLine,
								italics: true,
								font: FONT,
								size: Math.max(14, SIZE - 4),
								color: BLACK
							})]
						}));
					}
					runningWeight += .42;
					break;
				}
				case "placeholder": {
					const cleanText = (b.text || "").replace(/\[USER INPUT REQUIRED\]/gi, "").replace(/\[RESULT DATA REQUIRED\]/gi, "").replace(/\[REFERENCE VERIFICATION REQUIRED\]/gi, "").trim();
					if (cleanText) out.push(body(cleanText));
					break;
				}
			}
		}
		return out;
	};
	const a = draft.academic;
	const f = draft.faculty;
	const submitter = submitterIndex !== void 0 && draft.students[submitterIndex] ? draft.students[submitterIndex] : draft.students[0] ?? {
		name: "Student",
		regNo: "Register No."
	};
	const studentJoin = draft.students.map((s) => `${s.name || "Student"} (${s.regNo || "Register No."})`).join(" and ");
	const rawAddr = (a.institutionLine2 || "").trim();
	let addressLine1 = "Saveetha Institute of Medical and Technical Sciences";
	let addressLine2 = "Chennai-602105";
	if (rawAddr) if (rawAddr.includes("\n")) {
		const parts = rawAddr.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
		addressLine1 = parts[0] || addressLine1;
		addressLine2 = parts.slice(1).join(", ");
	} else {
		const match = rawAddr.match(/^(.*?)(?:,\s*|\s+)(Chennai[-\s]?\d*.*)$/i);
		if (match && match[1] && match[2]) {
			addressLine1 = match[1].trim() || addressLine1;
			addressLine2 = match[2].trim() || addressLine2;
		} else {
			const lastComma = rawAddr.lastIndexOf(",");
			if (lastComma > 0) {
				addressLine1 = rawAddr.slice(0, lastComma).trim();
				addressLine2 = rawAddr.slice(lastComma + 1).trim();
			} else {
				addressLine1 = rawAddr;
				addressLine2 = "";
			}
		}
	}
	addressLine2 && `${addressLine1}${addressLine2}`;
	const INSTITUTION = (a.institution || "SIMATS ENGINEERING").toUpperCase();
	const logoPng = await loadLogoPng();
	const projTitle = (a.projectTitle || "CAPSTONE PROJECT TITLE").trim();
	const titleLen = projTitle.length;
	const isTitleTooLong = titleLen > 70;
	const isTitleExtraLong = titleLen > 115;
	const spaceBeforeTitle = isTitleExtraLong ? 200 : isTitleTooLong ? 360 : 460;
	const spaceAfterDegree = isTitleExtraLong ? 280 : 380;
	const spaceAfterStudent = isTitleExtraLong ? 280 : 380;
	const spaceBeforeMonthYear = isTitleExtraLong ? 120 : isTitleTooLong ? 180 : 260;
	const coverLine = 300;
	const coverItem = (text, sizePt, opts = {}) => new Paragraph({
		alignment: AlignmentType.CENTER,
		spacing: {
			line: coverLine,
			after: opts.after ?? 90
		},
		children: [new TextRun({
			text,
			bold: opts.bold ?? false,
			allCaps: opts.caps ?? false,
			font: FONT,
			size: sizePt * 2,
			color: BLACK
		})]
	});
	const coverEmblem = (widthPx = 590) => logoPng ? [new Paragraph({
		alignment: AlignmentType.CENTER,
		spacing: { after: 200 },
		children: [new ImageRun({
			type: "png",
			data: logoPng,
			transformation: {
				width: widthPx,
				height: Math.round(widthPx * LOGO_H / LOGO_W)
			},
			altText: {
				title: "SIMATS Engineering logo",
				description: `${a.institution || "SIMATS Engineering"} official logo`,
				name: "logo"
			}
		})]
	})] : [];
	const cover = [
		...coverEmblem(590),
		coverItem(INSTITUTION, 14, {
			bold: true,
			after: 60
		}),
		coverItem(addressLine1, 12, { after: 30 }),
		...addressLine2 ? [coverItem(addressLine2, 12, { after: 0 })] : [],
		new Paragraph({
			spacing: { after: spaceBeforeTitle },
			children: []
		}),
		coverItem(projTitle, 16, {
			bold: true,
			caps: true,
			after: 280
		}),
		coverItem("A CAPSTONE PROJECT REPORT", 14, {
			bold: true,
			after: 120
		}),
		coverItem("A Capstone Project Report submitted in partial fulfilment of the requirements for the Course of", 12, { after: 90 }),
		coverItem(`${a.courseCode || "Course Code"} — ${a.courseName || "Course Name"}`, 12, {
			bold: true,
			after: 100
		}),
		coverItem("to the award of the degree of", 12, { after: 90 }),
		coverItem((a.degree || "Bachelor of Technology").toUpperCase(), 14, {
			bold: true,
			after: 90
		}),
		coverItem("IN", 12, { after: 90 }),
		coverItem((a.department || a.branch || "ENGINEERING").toUpperCase(), 13, {
			bold: true,
			after: 0
		}),
		new Paragraph({
			spacing: { after: spaceAfterDegree },
			children: []
		}),
		coverItem("Submitted by", 12, { after: 80 }),
		coverItem(`${submitter.name || "Student Name"} (${submitter.regNo || "Register No."})`, 13, {
			bold: true,
			after: 0
		}),
		new Paragraph({
			spacing: { after: spaceAfterStudent },
			children: []
		}),
		coverItem("Under the Supervision of", 12, { after: 80 }),
		coverItem(f.guideName || "Guide / Supervisor Name", 12, {
			bold: true,
			after: 70
		}),
		coverItem(`${f.guideDepartment || a.department || "Department of Engineering"}, ${a.institution || "SIMATS Engineering"}`, 12, { after: 0 }),
		new Paragraph({
			alignment: AlignmentType.CENTER,
			spacing: {
				line: 320,
				after: 0
			},
			run: {
				font: FONT,
				size: 32
			},
			children: [new TextRun({
				font: FONT,
				size: 32,
				text: ""
			})]
		}),
		coverItem(INSTITUTION, 13, {
			bold: true,
			after: 60
		}),
		coverItem(addressLine1, 12, { after: 30 }),
		...addressLine2 ? [coverItem(addressLine2, 12, { after: 0 })] : [],
		new Paragraph({
			spacing: { after: spaceBeforeMonthYear },
			children: []
		}),
		new Paragraph({
			alignment: AlignmentType.CENTER,
			spacing: {
				line: coverLine,
				after: 0
			},
			children: [new TextRun({
				text: (a.submissionMonthYear || "Present Month & Year").toUpperCase(),
				bold: true,
				font: FONT,
				size: 24,
				color: BLACK
			})]
		})
	];
	const certificate = [
		centered(INSTITUTION, 14, true, false, 60),
		centered(addressLine1, 12, false, false, 30),
		...addressLine2 ? [centered(addressLine2, 12, false, false, 120)] : [],
		h1("Bonafide Certificate"),
		body(submitterIndex !== void 0 && submitter ? `This is to certify that the Capstone Project entitled "${a.projectTitle || "Capstone Project"}" has been carried out by ${submitter.name || "Student"} (${submitter.regNo || "Reg. No"})${draft.students.length > 1 ? ` in collaboration with team members (${draft.students.filter((_, idx) => idx !== submitterIndex).map((s) => `${s.name} [${s.regNo}]`).join(", ")})` : ""} under the supervision of ${f.guideName || "Guide / Supervisor"} and is submitted in partial fulfilment of the requirements for the current semester of the ${a.degree || "Bachelor of Technology"} ${a.department || "Engineering"} program at ${a.institution || "SIMATS Engineering"}.` : `This is to certify that the Capstone Project entitled "${a.projectTitle || "Capstone Project"}" has been carried out by ${studentJoin} under the supervision of ${f.guideName || "Guide / Supervisor"} and is submitted in partial fulfilment of the requirements for the current semester of the ${a.degree || "Bachelor of Technology"} ${a.department || "Engineering"} program at ${a.institution || "SIMATS Engineering"}.`),
		new Paragraph({
			spacing: { after: 120 },
			children: []
		}),
		makeInvisibleTable(["COURSE COORDINATOR", "COURSE FACULTY / GUIDE"], [
			["\n\n", "\n\n"],
			[f.courseCoordinator || "Course Coordinator", f.guideName || "Guide / Supervisor"],
			[f.courseCoordinatorDepartment || a.department || "Department of Engineering", f.guideDepartment || a.department || "Department of Engineering"],
			[a.institution || "SIMATS Engineering", a.institution || "SIMATS Engineering"]
		]),
		new Paragraph({ children: [new PageBreak()] })
	];
	const declaration = [
		centered(INSTITUTION, 14, true, false, 60),
		centered(addressLine1, 12, false, false, 30),
		...addressLine2 ? [centered(addressLine2, 12, false, false, 120)] : [],
		h1("Declaration"),
		body(submitterIndex !== void 0 && submitter ? `I, ${submitter.name || "Student"} (${submitter.regNo || "Register No."})${draft.students.length > 1 ? ` alongside team members ${draft.students.filter((_, idx) => idx !== submitterIndex).map((s) => `${s.name} (${s.regNo})`).join(", ")}` : ""}, of the ${a.department || "Engineering"}, ${a.institution || "SIMATS Engineering"}, hereby declare that the Capstone Project Work entitled "${a.projectTitle || "Capstone Project"}" is the result of our own bonafide efforts. To the best of our knowledge, the work presented herein is original, accurate, and has been carried out in accordance with the principles of engineering ethics and academic integrity. All sources, references, data, and other materials used in the project have been appropriately acknowledged. We further declare that the data, results, analysis, and findings presented in this report have not been fabricated, falsified, or manipulated. Any external tools, software, datasets, computational resources, or AI-assisted tools used during the project have been appropriately disclosed. We confirm that all applicable ethical, academic, institutional, and professional requirements have been duly followed throughout the planning, execution, analysis, and documentation of the project.` : `We, ${studentJoin}, of the ${a.department || "Engineering"}, ${a.institution || "SIMATS Engineering"}, hereby declare that the Capstone Project Work entitled "${a.projectTitle || "Capstone Project"}" is the result of our own bonafide efforts. To the best of our knowledge, the work presented herein is original, accurate, and has been carried out in accordance with the principles of engineering ethics and academic integrity. All sources, references, data, and other materials used in the project have been appropriately acknowledged. We further declare that the data, results, analysis, and findings presented in this report have not been fabricated, falsified, or manipulated. Any external tools, software, datasets, computational resources, or AI-assisted tools used during the project have been appropriately disclosed. We confirm that all applicable ethical, academic, institutional, and professional requirements have been duly followed throughout the planning, execution, analysis, and documentation of the project.`),
		new Paragraph({
			spacing: { after: 80 },
			children: []
		}),
		body("Place: Chennai"),
		body(`Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
			month: "long",
			year: "numeric"
		})}`),
		new Paragraph({
			spacing: { after: 120 },
			children: []
		}),
		body("Signature of the Student with Name", { align: AlignmentType.RIGHT }),
		new Paragraph({ children: [new PageBreak()] })
	];
	const defaultContributionsByCount = {
		1: [{
			resp: "Project lead: end-to-end architecture, algorithm formulation, implementation, verification and documentation",
			design: "Complete conceptual model design, system pipeline and implementation",
			testing: "End-to-end testing, benchmark data collection and evaluation",
			report: "Complete manuscript authorship, chapter typesetting and outcome mapping",
			pct: 100
		}],
		2: [{
			resp: "Project lead, system architecture formulation, core algorithm engineering and back-end integration",
			design: "Designed core computational algorithms, service pipeline and data schema",
			testing: "Unit test development, algorithmic performance profiling and error analysis",
			report: "Authored Chapter 1, Chapter 3, and Chapter 4 technical sections",
			pct: 50
		}, {
			resp: "Front-end interface design, API integration, empirical testing and experimental validation",
			design: "Architected user workflows, dashboard interfaces and integration endpoints",
			testing: "Conducted integration verification, user acceptance testing and stress tests",
			report: "Authored Chapter 2 Literature Review, Chapter 5 and Appendix compilation",
			pct: 50
		}],
		3: [
			{
				resp: "System architecture design, core algorithm implementation and technical pipeline coordination",
				design: "System specifications, mathematical formulation and component logic",
				testing: "Algorithmic accuracy verification, latency benchmarks and profiling",
				report: "Chapter 1, Chapter 3 design specifications and IEEE reference indexing",
				pct: 35
			},
			{
				resp: "Data pipeline engineering, dataset synthesis, model training and optimization",
				design: "Data models, feature extraction pipelines and training workflows",
				testing: "Dataset validation, cross-validation metrics and empirical benchmarks",
				report: "Chapter 2 comparative analysis, Chapter 4 implementation details",
				pct: 35
			},
			{
				resp: "Interface integration, prototype development, security verification and outcome mapping",
				design: "UI/UX component layouts, security policies and API endpoints",
				testing: "Functional verification tests, usability surveys and observation logs",
				report: "Chapter 5 conclusion, future scope and Outcome Mapping Sheet",
				pct: 30
			}
		],
		4: [
			{
				resp: "System architecture formulation, requirement specification and core algorithm engineering",
				design: "Architected modular framework, mathematical models and data flow",
				testing: "Performance benchmarks, computational time profiling and complexity analysis",
				report: "Chapter 1 Introduction, Chapter 3 detailed design specifications",
				pct: 25
			},
			{
				resp: "Back-end data pipeline, database design, API controllers and model training",
				design: "Engineered database schemas, query optimization and processing routines",
				testing: "Data pipeline validation, regression tests and error rate quantification",
				report: "Chapter 4 Implementation methodology, modern tools evaluation",
				pct: 25
			},
			{
				resp: "Front-end interface engineering, visualization dashboard and interactive modules",
				design: "Designed interactive graphical components and responsive viewports",
				testing: "UI responsiveness profiling, cross-platform verification and load tests",
				report: "Chapter 2 Literature review, comparative study table synthesis",
				pct: 25
			},
			{
				resp: "Quality assurance, test automation, ethical/security risk assessment and documentation",
				design: "Formulated test plans, risk mitigation registers and compliance standards",
				testing: "Automated test suites, security boundary verification and validation sheets",
				report: "Chapter 5 reflection, Appendices A–J, and Outcome Mapping Sheet",
				pct: 25
			}
		],
		5: [
			{
				resp: "Team lead, overarching system architecture, problem formulation and algorithm design",
				design: "Modular architectural specification, mathematical bounds and logic flow",
				testing: "Algorithmic verification, time complexity measurements and benchmarks",
				report: "Chapter 1 Problem Statement & Objectives, Chapter 3 Selected Design",
				pct: 20
			},
			{
				resp: "Core computational engine, backend processing services and optimization",
				design: "Engineered high-throughput computational pipeline and middleware",
				testing: "System throughput testing, latency profiling and stress analysis",
				report: "Chapter 4 Implementation and modern tool configuration",
				pct: 20
			},
			{
				resp: "Data management, preprocessing routines, model training and feature extraction",
				design: "Dataset ingestion protocols, schema validation and training routines",
				testing: "Statistical validation, cross-validation scoring and error analysis",
				report: "Chapter 2 Literature review, state-of-the-art comparative matrix",
				pct: 20
			},
			{
				resp: "User interface engineering, client applications and data visualization dashboards",
				design: "Interactive client applications, graphical reporting and analytics",
				testing: "Client responsiveness, usability testing and interface validation",
				report: "Chapter 4 Results graphs, UI screenshots and prototype evaluation",
				pct: 20
			},
			{
				resp: "Verification and validation, security analysis, compliance and outcome mapping",
				design: "Formal test plan formulation, risk register and ethical considerations",
				testing: "Test matrix execution, security vulnerability scans and observation logs",
				report: "Chapter 5 Conclusion, Appendices compilation and Outcome Mapping Sheet",
				pct: 20
			}
		]
	};
	const contributionPresets = defaultContributionsByCount[Math.min(Math.max(draft.students.length, 1), 5)] || defaultContributionsByCount[1];
	const contributionRows = draft.students.map((s, i) => {
		const preset = contributionPresets[i] || contributionPresets[0];
		return [
			`${s.name || `Student ${i + 1}`} / ${s.regNo || "Register No."}`,
			s.responsibilities?.trim() || preset.resp,
			s.contribution?.trim() || preset.design,
			preset.testing,
			preset.report,
			`${preset.pct}%`
		];
	});
	const contribution = [
		h1("Individual Contribution Statement"),
		body("(Mandatory for all team projects)", { italics: true }),
		makeTable([
			"Student Name / Register No.",
			"Specific Responsibilities",
			"Design & Development Contribution",
			"Testing & Analysis Contribution",
			"Report Contribution",
			"Approx. Contribution (%)"
		], [...contributionRows, [
			"Total",
			"Balanced Team Collaboration",
			"Comprehensive Implementation",
			"Rigorous Verification",
			"Complete Documentation",
			"100%"
		]]),
		new Paragraph({ children: [new PageBreak()] })
	];
	const chapterOf = (id) => draft.chapters.find((c) => c.id === id);
	const ensureChapterBlocks = (id, fallbackTitle) => {
		const ch = chapterOf(id);
		if (ch && ch.blocks && ch.blocks.length > 0) return ch.blocks;
		const context = `Project Title: ${a.projectTitle || "Capstone Project"}
Department: ${a.department || "Engineering"}
Institution: ${a.institution || "SIMATS Engineering"}
Course: ${a.courseName || a.courseCode || "Capstone Engineering Course"}
Guide / Supervisor: ${a.guideName || "Dr. S. Sankar"}
Students:
${draft.students.map((s, idx) => `${idx + 1}. ${s.name} (Reg. No: ${s.regNo})`).join("\n")}`;
		const spec = CHAPTER_SPEC.find((s) => s.id === id);
		return localChapterBlocks({
			chapterId: id,
			chapterTitle: ch?.title || spec?.title || fallbackTitle,
			outline: spec?.outline || "",
			context,
			length: "detailed",
			style: "academic"
		});
	};
	const abstractBlocks = ensureChapterBlocks("abstract", "Abstract");
	const fallbackAbstract = `This Capstone Project presents the comprehensive formulation, architecture design, empirical development, and rigorous experimental validation of "${a.projectTitle || "an Advanced Engineering Capstone System"}", engineered within the Department of ${a.department || "Engineering"} at ${a.institution || "SIMATS Engineering"}. In contemporary engineering disciplines, complex operational environments demand high computational efficiency, low communication latency, fault-tolerant robustness, and standard-compliant deployment topologies. Conventional baseline systems frequently exhibit performance bottlenecks, elevated computational overhead, and limited adaptability under scaling concurrency. To overcome these critical limitations, an end-to-end modular methodology is systematically formulated, incorporating structured requirement specifications, mathematically formulated core processing blocks, localized error recovery loops, and deterministic verification protocols. The developed architecture establishes a cohesive computational pipeline that coordinates data acquisition, noise filtration, domain algorithmic processing, and persistent state logging. The theoretical framework integrates adaptive optimization routines, formal state verification, and modular interface boundaries to ensure seamless interoperability across heterogeneous environments. Extensive experimental evaluations and benchmarking against traditional state-of-the-art frameworks demonstrate substantial quantitative advancements across critical system performance metrics. The proposed system achieves sustained accuracy metrics exceeding 96.5%, demonstrates an end-to-end response latency maintained below 50 milliseconds across high-concurrency stress regimes, and delivers significantly expanded transaction throughput under continuous operational load. Comprehensive security, stability, and ablation analyses validate the deterministic convergence, resource utilization efficiency, and operational reliability of all integrated subsystems under dynamic stress conditions. Furthermore, rigorous comparative profiling against contemporary industry benchmarks validates an overall reduction of computational resource footprint by 28.4% and an empirical improvement in end-to-end pipeline throughput by 34.2%. Quantitative statistical tests establish that the observed performance gains possess high statistical significance with p-values consistently below 0.001 across all benchmark trials. Additionally, stress testing verifies seamless fault isolation, continuous system uptime, and automated service recovery during edge-case operational disruptions without compromising underlying transaction integrity, persistent system state, or user experience. The completed engineering solution strictly complies with IEEE standards, institutional academic regulations, and professional engineering ethics. Practical field implementations and exhaustive system simulations confirm that the developed framework provides a highly scalable, sustainable, resilient, and readily deployable foundation for next-generation automated engineering applications and modern industrial automation infrastructures.`;
	let abstractParagraphs = [];
	let keywordsStr = `${a.department || "Engineering"}, ${a.projectTitle || "Capstone Project"}, System Architecture, Optimization, Performance Evaluation, IEEE Standards.`;
	if (abstractBlocks && abstractBlocks.length > 0) for (const b of abstractBlocks) {
		if (!b || !b.type) continue;
		if (b.type === "paragraph") {
			const text = (b.text || "").trim();
			if (/^keywords?\s*[:\-—]/i.test(text)) keywordsStr = text.replace(/^keywords?\s*[:\-—]\s*/i, "").trim();
			else if (text && !/^\s*abstract\s*$/i.test(text)) abstractParagraphs.push(text);
		} else if (b.type === "bullets" || b.type === "numbered") for (const it of b.items || []) {
			const text = (it || "").trim();
			if (/^keywords?\s*[:\-—]/i.test(text)) keywordsStr = text.replace(/^keywords?\s*[:\-—]\s*/i, "").trim();
			else if (text) abstractParagraphs.push(text);
		}
		else if (b.type === "heading") {
			const text = (b.text || "").trim();
			if (/keywords?/i.test(text) && text.length > 10) keywordsStr = text.replace(/^keywords?\s*[:\-—]\s*/i, "").trim();
		}
	}
	if (abstractParagraphs.length === 0) abstractParagraphs = [fallbackAbstract];
	let combinedWords = abstractParagraphs.join(" ").split(/\s+/).filter(Boolean);
	if (combinedWords.length > 350) {
		combinedWords = combinedWords.slice(0, 350);
		abstractParagraphs = [combinedWords.join(" ").replace(/[.,;:!?-]+$/, "") + "."];
	}
	const abstractBodyParagraphs = abstractParagraphs.map((pText) => new Paragraph({
		alignment: JUSTIFY,
		spacing: {
			line: 260,
			after: 80
		},
		children: [new TextRun({
			text: pText,
			font: FONT,
			size: SIZE,
			color: BLACK
		})]
	}));
	const keywordsParagraph = new Paragraph({
		alignment: JUSTIFY,
		spacing: {
			before: 120,
			after: 80,
			line: 260
		},
		children: [new TextRun({
			text: "Keywords—",
			bold: true,
			font: FONT,
			size: SIZE,
			color: BLACK
		}), new TextRun({
			text: keywordsStr,
			italics: true,
			font: FONT,
			size: SIZE,
			color: BLACK
		})]
	});
	const abstractSection = [
		h1("Abstract", true, "v"),
		...abstractBodyParagraphs,
		keywordsParagraph,
		new Paragraph({ children: [new PageBreak()] })
	];
	const mainMatter = [];
	const chapterPageOffsets = {};
	let currentMainMatterPage = 1;
	for (const id of [
		"ch1",
		"ch2",
		"ch3",
		"ch4",
		"ch5"
	]) {
		chapterPageOffsets[id] = currentMainMatterPage;
		const pCount = estimateBlocksPages(ensureChapterBlocks(id, chapterOf(id)?.title || id));
		currentMainMatterPage += pCount;
	}
	const refsStartPage = currentMainMatterPage;
	const refsBlocks = ensureChapterBlocks("references", "References");
	const appendicesStartPage = refsStartPage + estimateBlocksPages(refsBlocks);
	const apxBlocks = ensureChapterBlocks("appendices", "Appendices");
	const outcomesStartPage = appendicesStartPage + (apxBlocks.length ? Math.min(3, estimateBlocksPages(apxBlocks)) : 2);
	const chapterIds = [
		"ch1",
		"ch2",
		"ch3",
		"ch4",
		"ch5"
	];
	for (let idx = 0; idx < chapterIds.length; idx++) {
		const id = chapterIds[idx];
		const ch = chapterOf(id);
		counters.figure = 0;
		counters.table = 0;
		const baseP = chapterPageOffsets[id] || 1;
		const isFirstChapter = idx === 0;
		const title = ch?.title || CHAPTER_SPEC.find((s) => s.id === id)?.title || id;
		const num = ch?.number ?? idx + 1;
		mainMatter.push(h1(`CHAPTER ${num} — ${title}`, true, String(baseP), !isFirstChapter));
		const blocksToRender = ensureChapterBlocks(id, title);
		mainMatter.push(...await renderBlocks(blocksToRender, `${num}.`, baseP));
	}
	const APPENDIX_TITLES = [
		"Appendix A – Detailed Calculations",
		"Appendix B – Design Drawings / Circuit Diagrams",
		"Appendix C – Simulation / Modelling Results",
		"Appendix D – Program Code Listings",
		"Appendix E – Component Datasheets & Specifications",
		"Appendix F – Test Data and Observation Sheets",
		"Appendix G – Survey / Questionnaire Instruments",
		"Appendix H – Standards and Codes Referenced",
		"Appendix I – Bill of Materials and Cost Details",
		"Appendix J – Individual Contribution Evidence"
	];
	const APPENDIX_DESCRIPTIONS = [
		"Mathematical models, time complexity equations, statistical confidence intervals, and power dissipation calculations supporting the system design.",
		"System schematics, detailed block diagrams, modular architectural layouts, and pinout interface specifications for all hardware and software modules.",
		"Simulation scripts, hyperparameter configurations, convergence curves, and Monte Carlo simulation outputs validating the proposed methodologies.",
		"Core algorithmic implementations, source code listings, data structure declarations, and API endpoint controllers used across the project.",
		"Manufacturer specifications, operating tolerances, computational throughput ratings, and hardware pin compatibility matrices for selected components.",
		"Empirical test execution logs, sensor observation sheets, stress test data matrices, and raw measurement logs recorded across multiple trial runs.",
		"Survey instruments, stakeholder evaluation questionnaires, heuristic usability feedback metrics, and Likert-scale user satisfaction scores.",
		"Comprehensive mapping and compliance checklists against IEEE, ISO/IEC, and institutional standards governing engineering ethics, security, and safety.",
		"Itemized hardware component costs, software licensing fees, compute resource allocation expenses, and overall project budget summary.",
		"Sprint logs, individual version control commit contributions, peer evaluation sign-offs, and verification logs confirming equitable team participation."
	];
	const backMatter = [];
	{
		counters.figure = 0;
		counters.table = 0;
		backMatter.push(h1("References", true, String(refsStartPage), true));
		const rawRefList = [];
		if (refsBlocks && refsBlocks.length > 0) for (const b of refsBlocks) {
			if (!b || !b.type) continue;
			if (b.type === "numbered" || b.type === "bullets") {
				for (const it of b.items || []) if (typeof it === "string" && it.trim()) rawRefList.push(it.trim());
			} else if (b.type === "paragraph") {
				const t = (b.text || "").trim();
				if (t) rawRefList.push(t);
			}
		}
		const finalRefs = rawRefList.length > 0 ? rawRefList : [
			`IEEE Standard for System and Software Engineering — System Life Cycle Processes, IEEE Std 15288-2015, pp. 1–118, 2015.`,
			`A. Vaswani et al., "Attention Is All You Need," in Advances in Neural Information Processing Systems, vol. 30, pp. 5998–6008, 2017.`,
			`M. Abadi et al., "TensorFlow: A System for Large-Scale Machine Learning," in 12th USENIX Symposium on Operating Systems Design and Implementation (OSDI 16), pp. 265–283, 2016.`,
			`Y. LeCun, Y. Bengio, and G. Hinton, "Deep learning," Nature, vol. 521, no. 7553, pp. 436–444, 2015.`,
			`Saveetha Institute of Medical and Technical Sciences, "Capstone Project Guidelines and Academic Regulations," SIMATS Engineering, Chennai, 2024.`
		];
		for (let idx = 0; idx < finalRefs.length; idx++) {
			const cleaned = finalRefs[idx].replace(/^\[?\d+\]?\.?\s*[-–—]?\s*/, "").trim();
			backMatter.push(new Paragraph({
				alignment: JUSTIFY,
				spacing: {
					line: LINE,
					after: 100
				},
				indent: {
					left: 720,
					hanging: 720
				},
				children: [new TextRun({
					text: `[${idx + 1}]\t`,
					bold: true,
					font: FONT,
					size: SIZE,
					color: BLACK
				}), new TextRun({
					text: cleaned,
					font: FONT,
					size: SIZE,
					color: BLACK
				})]
			}));
		}
	}
	{
		counters.figure = 0;
		counters.table = 0;
		backMatter.push(h1("Appendices", true, String(appendicesStartPage), true));
		const blocks = (apxBlocks ?? []).filter((b) => Boolean(b && b.type));
		if (blocks.length > 0) {
			let headingIdx = 0;
			const remapped = blocks.map((b) => {
				if (b.type === "heading" && b.level === 2 && headingIdx < APPENDIX_TITLES.length) return {
					type: "heading",
					level: 2,
					text: APPENDIX_TITLES[headingIdx++]
				};
				return b;
			});
			backMatter.push(...await renderBlocks(remapped, "A.", appendicesStartPage));
		} else for (let i = 0; i < APPENDIX_TITLES.length; i++) {
			const appPage = String(appendicesStartPage + Math.floor(i / 3));
			backMatter.push(h2(APPENDIX_TITLES[i], true, appPage));
			backMatter.push(body(APPENDIX_DESCRIPTIONS[i]));
		}
	}
	const outc = chapterOf("outcomes");
	if (outc) {
		counters.figure = 0;
		counters.table = 0;
		backMatter.push(h1("Capstone Project Outcome Mapping Sheet", true, String(outcomesStartPage), true));
		backMatter.push(...outc.blocks.length ? await renderBlocks(outc.blocks, "O.", outcomesStartPage) : [makeTable([
			"Outcome",
			"Evidence Provided",
			"SO / Area",
			"Location in Report"
		], [
			[
				"PO1: Engineering Knowledge",
				"Mathematical modeling, complexity analysis and algorithm design",
				"Fundamental Principles",
				"Chapter 1 & 3"
			],
			[
				"PO2: Problem Analysis",
				"Literature review, research gap identification and comparative analysis",
				"Problem Formulation",
				"Chapter 2"
			],
			[
				"PO3: Design / Development",
				"System architecture, trade-off evaluation and modular specification",
				"System Engineering",
				"Chapter 3"
			],
			[
				"PO4: Investigation",
				"Empirical test suite, benchmark evaluation and statistical data",
				"Experimental Rigor",
				"Chapter 4"
			],
			[
				"PO5: Modern Tool Usage",
				"Modern software frameworks, IDEs, profiling and simulation tools",
				"Technical Toolchain",
				"Section 4.2"
			],
			[
				"PO6: Society & Sustainability",
				"Safety analysis, societal impact evaluation and life-cycle considerations",
				"Context & Impact",
				"Section 3.7"
			],
			[
				"PO7: Environment & Ethics",
				"Academic integrity declaration, non-fabrication adherence and ethical code",
				"Professional Integrity",
				"Preliminary Pages"
			],
			[
				"PO8: Individual & Team Work",
				"Individual contribution statement with quantified task allocations",
				"Team Collaboration",
				"Preliminary Pages"
			],
			[
				"PO9: Communication",
				"High-clarity technical report, IEEE referencing and structured documentation",
				"Technical Prose",
				"Full Document"
			],
			[
				"PO10: Project Management",
				"Milestone schedule, cost breakdown and role division tables",
				"Engineering Management",
				"Section 4.8"
			]
		])]);
	}
	const tocPages = tocEntries.length + 3 > 22 ? 2 : 1;
	const listFigPage = toRoman(6 + tocPages);
	const listTabPage = listFigPage;
	const listAbbrPage = toRoman(7 + tocPages);
	const pageNoMap = {
		"Bonafide Certificate": "ii",
		"Declaration": "iii",
		"Individual Contribution Statement": "iv",
		"Abstract": "v",
		"Table of Contents": "vi",
		"List of Figures": listFigPage,
		"List of Tables": listTabPage,
		"List of Abbreviations / Symbols": listAbbrPage,
		"References": String(refsStartPage),
		"Appendices": String(appendicesStartPage),
		"Capstone Project Outcome Mapping Sheet": String(outcomesStartPage)
	};
	const getPageEstimate = (title, level, i) => {
		for (const [key, val] of Object.entries(pageNoMap)) if (title.toLowerCase().includes(key.toLowerCase())) return val;
		if (/chapter 1/i.test(title)) return String(chapterPageOffsets["ch1"] || 1);
		if (/chapter 2/i.test(title)) return String(chapterPageOffsets["ch2"] || 3);
		if (/chapter 3/i.test(title)) return String(chapterPageOffsets["ch3"] || 6);
		if (/chapter 4/i.test(title)) return String(chapterPageOffsets["ch4"] || 9);
		if (/chapter 5/i.test(title)) return String(chapterPageOffsets["ch5"] || 12);
		if (/appendix/i.test(title)) return String(appendicesStartPage);
		return `${Math.max(1, i * 2)}`;
	};
	const defaultFigures = [
		{
			label: "Figure 3.1",
			caption: "System Architecture and Modular Block Diagram",
			page: String(chapterPageOffsets["ch3"] || 6)
		},
		{
			label: "Figure 3.2",
			caption: "End-to-End Operational Flowchart and Data Processing Pipeline",
			page: String((chapterPageOffsets["ch3"] || 6) + 1)
		},
		{
			label: "Figure 4.1",
			caption: "Implementation Framework and Component Integration Schematic",
			page: String(chapterPageOffsets["ch4"] || 9)
		},
		{
			label: "Figure 4.2",
			caption: "Experimental Results and Performance Benchmark Curves",
			page: String((chapterPageOffsets["ch4"] || 9) + 1)
		},
		{
			label: "Figure 4.3",
			caption: "Comparative Latency and Throughput Evaluation Under Load",
			page: String((chapterPageOffsets["ch4"] || 9) + 2)
		}
	];
	const figureData = figures.length > 0 ? figures : defaultFigures;
	const defaultTables = [
		{
			label: "Table 2.1",
			caption: "Comparative Analysis of State-of-the-Art Approaches",
			page: String(chapterPageOffsets["ch2"] || 3)
		},
		{
			label: "Table 3.1",
			caption: "Functional and System Requirements Specification",
			page: String(chapterPageOffsets["ch3"] || 6)
		},
		{
			label: "Table 3.2",
			caption: "Applicable IEEE / Regulatory Standards and Compliance Codes",
			page: String(chapterPageOffsets["ch3"] || 6)
		},
		{
			label: "Table 3.3",
			caption: "Target Design Specifications and Measurable Performance Metrics",
			page: String(chapterPageOffsets["ch3"] || 6)
		},
		{
			label: "Table 3.4",
			caption: "Multi-Criteria Decision Evaluation Matrix for Design Alternatives",
			page: String((chapterPageOffsets["ch3"] || 6) + 1)
		},
		{
			label: "Table 3.5",
			caption: "Engineering Trade-off Analysis and Technical Selection Justifications",
			page: String((chapterPageOffsets["ch3"] || 6) + 1)
		},
		{
			label: "Table 3.6",
			caption: "Project Risk Assessment Register and Mitigation Protocols",
			page: String((chapterPageOffsets["ch3"] || 6) + 2)
		},
		{
			label: "Table 4.1",
			caption: "Hardware and Software Tools and Environment Configuration",
			page: String(chapterPageOffsets["ch4"] || 9)
		},
		{
			label: "Table 4.2",
			caption: "Verification, Validation, and Test Plan Matrix",
			page: String(chapterPageOffsets["ch4"] || 9)
		},
		{
			label: "Table 4.3",
			caption: "Quantitative Experimental Results and Achievement of Objectives",
			page: String((chapterPageOffsets["ch4"] || 9) + 1)
		},
		{
			label: "Table 4.4",
			caption: "Project Milestone Schedule, Roles Allocation, and Budget Breakdown",
			page: String((chapterPageOffsets["ch4"] || 9) + 2)
		},
		{
			label: "Table O.1",
			caption: "ABET / NBA Program Outcomes (POs) and PSOs Mapping Matrix",
			page: String(outcomesStartPage)
		}
	];
	const tableData = tables.length > 0 ? tables : defaultTables;
	const listsSection = [
		h1("List of Figures", true, listFigPage),
		makeTable([
			"Figure No.",
			"Figure Name",
			"Page No."
		], figureData.map((fg) => [
			fg.label,
			fg.caption.replace(/^.*?:\s*/, ""),
			fg.page || "15"
		]), [
			Math.round(contentWidth * .18),
			Math.round(contentWidth * .66),
			contentWidth - Math.round(contentWidth * .18) - Math.round(contentWidth * .66)
		]),
		new Paragraph({
			spacing: { before: 240 },
			children: []
		}),
		h1("List of Tables", true, listTabPage),
		makeTable([
			"Table No.",
			"Table Name",
			"Page No."
		], tableData.map((tb) => [
			tb.label,
			tb.caption.replace(/^.*?:\s*/, ""),
			tb.page || "12"
		]), [
			Math.round(contentWidth * .18),
			Math.round(contentWidth * .66),
			contentWidth - Math.round(contentWidth * .18) - Math.round(contentWidth * .66)
		]),
		new Paragraph({ children: [new PageBreak()] }),
		h1("List of Abbreviations / Symbols", true, listAbbrPage),
		makeTable([
			"Symbol / Abbreviation",
			"Description / Definition",
			"Unit"
		], [
			[
				"AI",
				"Artificial Intelligence",
				"—"
			],
			[
				"ML",
				"Machine Learning",
				"—"
			],
			[
				"API",
				"Application Programming Interface",
				"—"
			],
			[
				"UI / UX",
				"User Interface and User Experience",
				"—"
			],
			[
				"REST",
				"Representational State Transfer",
				"—"
			],
			[
				"JSON",
				"JavaScript Object Notation",
				"—"
			],
			[
				"RMSE",
				"Root Mean Square Error",
				"—"
			],
			[
				"MAPE",
				"Mean Absolute Percentage Error",
				"%"
			],
			[
				"FPS",
				"Frames Per Second",
				"fps / Hz"
			],
			[
				"ms",
				"Millisecond (Response Latency)",
				"ms"
			],
			[
				"MHz / GHz",
				"Clock Frequency / Operating Bandwidth",
				"MHz / GHz"
			],
			[
				"MB / GB",
				"Megabyte / Gigabyte (Memory Footprint)",
				"MB / GB"
			],
			[
				"SNR",
				"Signal-to-Noise Ratio",
				"dB"
			],
			[
				"η",
				"System Computational / Power Efficiency",
				"%"
			],
			[
				"IEEE",
				"Institute of Electrical and Electronics Engineers",
				"—"
			]
		], [
			Math.round(contentWidth * .25),
			Math.round(contentWidth * .55),
			contentWidth - Math.round(contentWidth * .25) - Math.round(contentWidth * .55)
		])
	];
	{
		const lists = tocEntries.filter((e) => /^List of/i.test(e.title));
		if (lists.length) {
			for (const l of lists) tocEntries.splice(tocEntries.indexOf(l), 1);
			const firstChapter = tocEntries.findIndex((e) => /^CHAPTER/i.test(e.title));
			tocEntries.splice(firstChapter === -1 ? tocEntries.length : firstChapter, 0, ...lists);
		}
	}
	const tocColA = Math.round(contentWidth * .16);
	const tocColB = Math.round(contentWidth * .68);
	const tocCol = [
		tocColA,
		tocColB,
		contentWidth - tocColA - tocColB
	];
	const tocCell = (children, header = false) => new TableCell({
		borders: cellBorders,
		width: {
			size: 0,
			type: WidthType.AUTO
		},
		margins: {
			top: 80,
			bottom: 80,
			left: 120,
			right: 120
		},
		verticalAlign: VerticalAlign.CENTER,
		shading: {
			fill: header ? "E8E4DA" : "FFFFFF",
			type: ShadingType.CLEAR,
			color: "auto"
		},
		children
	});
	const tocText = (text, bold = false, indent = false) => new Paragraph({
		spacing: { line: 240 },
		...indent ? { indent: { left: 360 } } : {},
		children: [new TextRun({
			text,
			bold,
			font: FONT,
			size: SIZE - 2,
			color: BLACK
		})]
	});
	const tocRows = tocEntries.map((e, i) => {
		const pageNum = e.page || getPageEstimate(e.title, e.level, i);
		return new TableRow({ children: [
			tocCell([tocText(e.level === 1 ? `${i + 1}` : "", false)]),
			tocCell([tocText(e.title, e.level === 1, e.level === 2)]),
			tocCell([new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: { line: 240 },
				children: [new SimpleField(`PAGEREF ${e.bookmark} \\h`, String(pageNum))]
			})])
		] });
	});
	const tocTable = new Table({
		width: {
			size: contentWidth,
			type: WidthType.DXA
		},
		columnWidths: tocCol,
		rows: [new TableRow({
			tableHeader: true,
			children: [
				tocCell([tocText("S. No.", true)], true),
				tocCell([tocText("Title", true)], true),
				tocCell([new Paragraph({
					alignment: AlignmentType.CENTER,
					spacing: { line: 240 },
					children: [new TextRun({
						text: "Page No.",
						bold: true,
						font: FONT,
						size: SIZE - 2,
						color: BLACK
					})]
				})], true)
			]
		}), ...tocRows]
	});
	const toc = [
		h1("Table of Contents", false),
		tocTable,
		new Paragraph({ children: [new PageBreak()] })
	];
	const doc = new Document({
		creator: "SIMATS Engineering — AI Capstone Report Generator",
		title: a.projectTitle || "Capstone Project Report",
		description: `Capstone project report for ${a.courseCode} ${a.courseName}`,
		features: { updateFields: true },
		styles: {
			default: { document: { run: {
				font: FONT,
				size: SIZE,
				color: BLACK
			} } },
			paragraphStyles: [
				{
					id: "Heading1",
					name: "Heading 1",
					basedOn: "Normal",
					next: "Normal",
					quickFormat: true,
					run: {
						size: H1_SIZE,
						bold: true,
						font: FONT,
						color: BLACK
					},
					paragraph: {
						spacing: {
							before: 240,
							after: 240
						},
						outlineLevel: 0
					}
				},
				{
					id: "Heading2",
					name: "Heading 2",
					basedOn: "Normal",
					next: "Normal",
					quickFormat: true,
					run: {
						size: H2_SIZE,
						bold: true,
						font: FONT,
						color: BLACK
					},
					paragraph: {
						spacing: {
							before: 180,
							after: 120
						},
						outlineLevel: 1
					}
				},
				{
					id: "Heading3",
					name: "Heading 3",
					basedOn: "Normal",
					next: "Normal",
					quickFormat: true,
					run: {
						size: H2_SIZE,
						bold: true,
						italics: true,
						font: FONT,
						color: BLACK
					},
					paragraph: {
						spacing: {
							before: 160,
							after: 100
						},
						outlineLevel: 2
					}
				}
			]
		},
		numbering: { config: [{
			reference: "bullets",
			levels: [{
				level: 0,
				format: LevelFormat.BULLET,
				text: "•",
				alignment: AlignmentType.LEFT,
				style: { paragraph: { indent: {
					left: 720,
					hanging: 360
				} } }
			}]
		}, {
			reference: "numbers",
			levels: [{
				level: 0,
				format: LevelFormat.DECIMAL,
				text: "%1.",
				alignment: AlignmentType.LEFT,
				style: { paragraph: { indent: {
					left: 720,
					hanging: 360
				} } }
			}]
		}] },
		sections: [
			{
				properties: { page: {
					size: {
						width: A4_W,
						height: A4_H
					},
					margin: {
						top: Math.round(1152),
						bottom: Math.round(1080),
						left: Math.round(1440),
						right: Math.round(1440)
					}
				} },
				children: [...cover]
			},
			{
				properties: {
					type: SectionType.NEXT_PAGE,
					page: {
						size: {
							width: A4_W,
							height: A4_H
						},
						margin: {
							top: Math.round(m.top * 1440),
							bottom: Math.round(m.bottom * 1440),
							left: Math.round(m.left * 1440),
							right: Math.round(m.right * 1440)
						},
						pageNumbers: {
							start: 2,
							formatType: NumberFormat.LOWER_ROMAN
						}
					}
				},
				footers: { default: new Footer({ children: [new Paragraph({
					alignment: AlignmentType.CENTER,
					children: [new TextRun({
						children: [PageNumber.CURRENT],
						font: FONT,
						size: SIZE - 4,
						color: BLACK
					})]
				})] }) },
				children: [
					...certificate,
					...declaration,
					...contribution,
					...abstractSection,
					...toc,
					...listsSection
				]
			},
			{
				properties: {
					type: SectionType.NEXT_PAGE,
					page: {
						size: {
							width: A4_W,
							height: A4_H
						},
						margin: {
							top: Math.round(m.top * 1440),
							bottom: Math.round(m.bottom * 1440),
							left: Math.round(m.left * 1440),
							right: Math.round(m.right * 1440)
						},
						pageNumbers: {
							start: 1,
							formatType: NumberFormat.DECIMAL
						}
					}
				},
				footers: { default: new Footer({ children: [new Paragraph({
					alignment: AlignmentType.CENTER,
					children: [new TextRun({
						children: [PageNumber.CURRENT],
						font: FONT,
						size: SIZE - 4,
						color: BLACK
					})]
				})] }) },
				children: [...mainMatter, ...backMatter]
			}
		]
	});
	return await Packer.toBlob(doc);
}
async function generateDocx(draft, submitterIndex) {
	return await buildDocxUnbounded(sanitizeDraft(draft), submitterIndex);
}
function buildOnePageFileName(draft, submitterIndex) {
	const s = submitterIndex !== void 0 && draft.students[submitterIndex] ? draft.students[submitterIndex] : draft.students[0];
	return `${s?.name?.trim().replace(/[/\\?%*:|"<>]/g, "").trim() || (submitterIndex !== void 0 ? `Student ${submitterIndex + 1}` : "Student")} - ${s?.regNo?.trim().replace(/[/\\?%*:|"<>]/g, "").trim() || (submitterIndex !== void 0 ? `Reg ${submitterIndex + 1}` : "Registration Number")} - One Page Write-Up.docx`;
}
function parseImageData(dataUrl) {
	if (!dataUrl || typeof dataUrl !== "string") return null;
	const match = dataUrl.match(/^data:image\/(png|jpeg|jpg|webp);base64,(.+)$/i);
	let ext = "png";
	let base64 = dataUrl;
	if (match) {
		const sub = match[1].toLowerCase();
		ext = sub === "jpeg" || sub === "jpg" ? "jpg" : "png";
		base64 = match[2];
	} else if (dataUrl.includes(",")) base64 = dataUrl.split(",")[1];
	try {
		if (typeof atob === "function") {
			const binary = atob(base64);
			const bytes = new Uint8Array(binary.length);
			for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
			return {
				type: ext,
				bytes
			};
		} else if (typeof Buffer !== "undefined") {
			const buf = Buffer.from(base64, "base64");
			return {
				type: ext,
				bytes: new Uint8Array(buf)
			};
		}
	} catch (err) {
		console.error("Failed to parse image data URL:", err);
	}
	return null;
}
function getPlaceholderDataUrl(label, width = 360, height = 240) {
	if (typeof document === "undefined") return "";
	try {
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");
		if (!ctx) return "";
		ctx.fillStyle = "#f8fafc";
		ctx.fillRect(0, 0, width, height);
		ctx.strokeStyle = "#cbd5e1";
		ctx.lineWidth = 2;
		ctx.strokeRect(1, 1, width - 2, height - 2);
		ctx.fillStyle = "#475569";
		ctx.font = "bold 15px Arial, sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(label, width / 2, height / 2 - 8);
		ctx.font = "12px Arial, sans-serif";
		ctx.fillStyle = "#94a3b8";
		ctx.fillText("(Upload image in write-up tab)", width / 2, height / 2 + 14);
		return canvas.toDataURL("image/png");
	} catch {
		return "";
	}
}
async function getImageSize(dataUrl) {
	return new Promise((resolve) => {
		if (typeof window === "undefined" || typeof Image === "undefined") {
			resolve({
				width: 400,
				height: 300
			});
			return;
		}
		const img = new Image();
		img.onload = () => {
			resolve({
				width: img.naturalWidth || 400,
				height: img.naturalHeight || 300
			});
		};
		img.onerror = () => {
			resolve({
				width: 400,
				height: 300
			});
		};
		img.src = dataUrl;
	});
}
async function generateOnePageWriteUpDocx(draft, submitterIndex) {
	return await buildOnePageWriteUpDocx(sanitizeDraft(draft), submitterIndex);
}
async function buildOnePageWriteUpDocx(draft, submitterIndex) {
	const FONT = "Times New Roman";
	const BLACK_COLOR = "000000";
	const student = submitterIndex !== void 0 && draft.students[submitterIndex] ? draft.students[submitterIndex] : draft.students[0] || {
		name: "",
		regNo: ""
	};
	const studentName = student.name.trim() || "Student Name";
	const regNo = student.regNo.trim() || "Reg. No.";
	const courseCode = draft.academic.courseCode.trim() || "Course Code";
	const courseName = draft.academic.courseName.trim() || "Course Name";
	const slot = draft.onePageWriteUp?.slot?.trim() || draft.academic.slot?.trim() || "C";
	const courseFaculty = draft.faculty.courseFaculty?.trim() || draft.faculty.guideName?.trim() || "Course Faculty Name";
	const projectTitle = draft.academic.projectTitle.trim() || "Project Title";
	let descriptionText = draft.onePageWriteUp?.projectDescription?.trim() || draft.project?.description?.trim() || "";
	if (!descriptionText) {
		const abstractCh = draft.chapters.find((c) => c.id === "abstract");
		if (abstractCh && abstractCh.blocks.length > 0) {
			const p = abstractCh.blocks.find((b) => b.type === "paragraph");
			if (p && "text" in p && p.text) descriptionText = p.text;
		}
	}
	if (!descriptionText) descriptionText = `${projectTitle} is an advanced engineering initiative focused on developing high-accuracy, scalable solutions. The project integrates robust algorithms, modern software architecture, and practical verification methodologies to achieve reliable performance and actionable real-world outcomes.`;
	if (descriptionText.length > 1150) {
		const sub = descriptionText.slice(0, 1145);
		const lastPeriod = sub.lastIndexOf(".");
		if (lastPeriod > 950) descriptionText = sub.slice(0, lastPeriod + 1);
		else descriptionText = sub.trim().replace(/[.,;:!?-]+$/, "") + ".";
	}
	const sealPng = await loadSimatsSealPng();
	const excelLogoPng = await loadSimatsExcelLogoPng();
	const geotagDataUrl = draft.onePageWriteUp?.geotagImage?.trim() || getPlaceholderDataUrl("Geotag Photo", 400, 300);
	const pptTitleDataUrl = draft.onePageWriteUp?.pptTitleImage?.trim() || getPlaceholderDataUrl("PPT Title Page", 400, 240);
	const hasModel = Boolean(draft.onePageWriteUp?.modelImage?.trim());
	const modelDataUrl = draft.onePageWriteUp?.modelImage?.trim();
	const imageItems = [{
		label: "Geotag Photo",
		dataUrl: geotagDataUrl
	}, {
		label: "PPT Title Page",
		dataUrl: pptTitleDataUrl
	}];
	if (hasModel && modelDataUrl) imageItems.push({
		label: "Model Architecture",
		dataUrl: modelDataUrl
	});
	const imageCount = imageItems.length;
	const maxDisplayW = imageCount === 3 ? 155 : 230;
	const maxDisplayH = imageCount === 3 ? 125 : 140;
	const renderedImageCells = [];
	for (let i = 0; i < imageItems.length; i++) {
		const item = imageItems[i];
		const parsed = parseImageData(item.dataUrl);
		const size = await getImageSize(item.dataUrl);
		let imgW = maxDisplayW;
		let imgH = maxDisplayH;
		if (size.width && size.height) {
			const scale = Math.min(maxDisplayW / size.width, maxDisplayH / size.height);
			imgW = Math.max(70, Math.round(size.width * scale));
			imgH = Math.max(55, Math.round(size.height * scale));
		}
		const cellWidthPct = Math.floor(100 / imageCount);
		if (parsed) renderedImageCells.push(new TableCell({
			borders: invisibleBorders,
			width: {
				size: cellWidthPct,
				type: WidthType.PERCENTAGE
			},
			verticalAlign: VerticalAlign.CENTER,
			children: [new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: {
					before: 30,
					after: 30
				},
				children: [new ImageRun({
					type: parsed.type,
					data: parsed.bytes,
					transformation: {
						width: imgW,
						height: imgH
					},
					altText: {
						title: item.label,
						description: item.label,
						name: item.label
					}
				})]
			})]
		}));
		else renderedImageCells.push(new TableCell({
			borders: invisibleBorders,
			width: {
				size: cellWidthPct,
				type: WidthType.PERCENTAGE
			},
			verticalAlign: VerticalAlign.CENTER,
			children: [new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: {
					before: 30,
					after: 30
				},
				children: [new TextRun({
					text: `[ ${item.label} ]`,
					bold: true,
					size: 24,
					font: FONT,
					color: "64748B"
				})]
			})]
		}));
	}
	const TABLE_WIDTH_DXA = 10464;
	const headerCells = [
		new TableCell({
			borders: invisibleBorders,
			width: {
				size: 1120,
				type: WidthType.DXA
			},
			verticalAlign: VerticalAlign.CENTER,
			children: [sealPng ? new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: {
					before: 0,
					after: 0
				},
				children: [new ImageRun({
					type: "png",
					data: sealPng,
					transformation: {
						width: 52,
						height: 51
					},
					altText: {
						title: "SIMATS Seal",
						description: "SIMATS Seal",
						name: "SIMATS Seal"
					}
				})]
			}) : new Paragraph({ children: [] })]
		}),
		new TableCell({
			borders: invisibleBorders,
			width: {
				size: 8224,
				type: WidthType.DXA
			},
			verticalAlign: VerticalAlign.CENTER,
			children: [
				new Paragraph({
					alignment: AlignmentType.CENTER,
					spacing: {
						before: 40,
						after: 0,
						line: 276
					},
					children: [new TextRun({
						text: "SIMATS ENGINEERING",
						bold: true,
						font: FONT,
						size: 24,
						color: BLACK_COLOR
					})]
				}),
				new Paragraph({
					alignment: AlignmentType.CENTER,
					spacing: {
						before: 0,
						after: 0,
						line: 276
					},
					children: [new TextRun({
						text: "Saveetha Institute of Medical and Technical Sciences",
						font: FONT,
						size: 24,
						color: BLACK_COLOR
					})]
				}),
				new Paragraph({
					alignment: AlignmentType.CENTER,
					spacing: {
						before: 0,
						after: 0,
						line: 276
					},
					children: [new TextRun({
						text: "Chennai- 602105",
						font: FONT,
						size: 24,
						color: BLACK_COLOR
					})]
				})
			]
		}),
		new TableCell({
			borders: invisibleBorders,
			width: {
				size: 1120,
				type: WidthType.DXA
			},
			verticalAlign: VerticalAlign.CENTER,
			children: [excelLogoPng ? new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: {
					before: 0,
					after: 0
				},
				children: [new ImageRun({
					type: "png",
					data: excelLogoPng,
					transformation: {
						width: 41,
						height: 48
					},
					altText: {
						title: "SIMATS Engineer to Excel",
						description: "SIMATS Engineer to Excel",
						name: "SIMATS Engineer to Excel"
					}
				})]
			}) : new Paragraph({ children: [] })]
		})
	];
	const headerTable = new Table({
		width: {
			size: TABLE_WIDTH_DXA,
			type: WidthType.DXA
		},
		borders: invisibleBorders,
		rows: [new TableRow({ children: headerCells })]
	});
	const metaAfterSpacing = 80;
	const metaLineSpacing = 260;
	const metaRow = (leftLabel, leftVal, rightLabel, rightVal) => new TableRow({ children: [new TableCell({
		borders: invisibleBorders,
		width: {
			size: 7200,
			type: WidthType.DXA
		},
		children: [new Paragraph({
			spacing: {
				before: 0,
				after: metaAfterSpacing,
				line: metaLineSpacing
			},
			children: [new TextRun({
				text: leftLabel,
				bold: true,
				font: FONT,
				size: 24,
				color: BLACK_COLOR
			}), new TextRun({
				text: leftVal ? ` ${leftVal}` : "",
				font: FONT,
				size: 24,
				color: BLACK_COLOR
			})]
		})]
	}), new TableCell({
		borders: invisibleBorders,
		width: {
			size: 3264,
			type: WidthType.DXA
		},
		children: [rightLabel ? new Paragraph({
			spacing: {
				before: 0,
				after: metaAfterSpacing,
				line: metaLineSpacing
			},
			children: [new TextRun({
				text: rightLabel,
				bold: true,
				font: FONT,
				size: 24,
				color: BLACK_COLOR
			}), new TextRun({
				text: rightVal ? ` ${rightVal}` : "",
				font: FONT,
				size: 24,
				color: BLACK_COLOR
			})]
		}) : new Paragraph({ children: [] })]
	})] });
	const metadataTable = new Table({
		width: {
			size: TABLE_WIDTH_DXA,
			type: WidthType.DXA
		},
		borders: invisibleBorders,
		rows: [
			metaRow("Student Name:", studentName, "Reg. No.:", regNo),
			metaRow("Course Code:", courseCode, "Slot:", slot),
			metaRow("Course Name:", courseName),
			metaRow("Course Faculty:", courseFaculty)
		]
	});
	const singleBorder = {
		style: BorderStyle.SINGLE,
		size: 4,
		color: "000000"
	};
	const boxedTableBorders = {
		top: singleBorder,
		bottom: singleBorder,
		left: singleBorder,
		right: singleBorder,
		insideHorizontal: singleBorder,
		insideVertical: {
			style: BorderStyle.NONE,
			size: 0,
			color: "FFFFFF"
		}
	};
	const imagesTable = new Table({
		width: {
			size: 100,
			type: WidthType.PERCENTAGE
		},
		borders: invisibleBorders,
		rows: [new TableRow({ children: renderedImageCells })]
	});
	const boxedTable = new Table({
		width: {
			size: TABLE_WIDTH_DXA,
			type: WidthType.DXA
		},
		borders: boxedTableBorders,
		rows: [
			new TableRow({ children: [new TableCell({
				width: {
					size: TABLE_WIDTH_DXA,
					type: WidthType.DXA
				},
				margins: {
					top: 80,
					bottom: 80,
					left: 120,
					right: 120
				},
				children: [new Paragraph({
					spacing: {
						before: 20,
						after: 20,
						line: 240
					},
					children: [new TextRun({
						text: "Project Title: ",
						bold: true,
						font: FONT,
						size: 24,
						color: BLACK_COLOR
					}), new TextRun({
						text: projectTitle,
						bold: false,
						font: FONT,
						size: 24,
						color: BLACK_COLOR
					})]
				})]
			})] }),
			new TableRow({ children: [new TableCell({
				width: {
					size: TABLE_WIDTH_DXA,
					type: WidthType.DXA
				},
				margins: {
					top: 80,
					bottom: 80,
					left: 120,
					right: 120
				},
				children: [new Paragraph({
					spacing: {
						before: 30,
						after: 30,
						line: 240
					},
					children: [new TextRun({
						text: "Module Photographs:",
						bold: true,
						font: FONT,
						size: 24,
						color: BLACK_COLOR
					})]
				})]
			})] }),
			new TableRow({ children: [new TableCell({
				width: {
					size: TABLE_WIDTH_DXA,
					type: WidthType.DXA
				},
				margins: {
					top: 60,
					bottom: 60,
					left: 60,
					right: 60
				},
				children: [imagesTable]
			})] }),
			new TableRow({ children: [new TableCell({
				width: {
					size: TABLE_WIDTH_DXA,
					type: WidthType.DXA
				},
				margins: {
					top: 80,
					bottom: 80,
					left: 120,
					right: 120
				},
				children: [new Paragraph({
					spacing: {
						before: 30,
						after: 30,
						line: 240
					},
					children: [new TextRun({
						text: "Project Description:",
						bold: true,
						font: FONT,
						size: 24,
						color: BLACK_COLOR
					})]
				})]
			})] }),
			new TableRow({ children: [new TableCell({
				width: {
					size: TABLE_WIDTH_DXA,
					type: WidthType.DXA
				},
				margins: {
					top: 80,
					bottom: 80,
					left: 120,
					right: 120
				},
				children: (() => {
					const paras = descriptionText.split(/\n+/).map((p) => p.trim()).filter(Boolean);
					const list = paras.length > 0 ? paras : [descriptionText];
					return list.map((pText, idx) => new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						spacing: {
							before: idx === 0 ? 30 : 40,
							after: idx === list.length - 1 ? 30 : 40,
							line: 276
						},
						children: [new TextRun({
							text: pText,
							font: FONT,
							size: 24,
							color: BLACK_COLOR
						})]
					}));
				})()
			})] })
		]
	});
	const signaturesTable = new Table({
		width: {
			size: TABLE_WIDTH_DXA,
			type: WidthType.DXA
		},
		borders: invisibleBorders,
		rows: [new TableRow({ children: [new TableCell({
			borders: invisibleBorders,
			width: {
				size: Math.floor(TABLE_WIDTH_DXA / 2),
				type: WidthType.DXA
			},
			children: [new Paragraph({
				alignment: AlignmentType.LEFT,
				spacing: {
					before: 0,
					after: 0
				},
				children: [new TextRun({
					text: "Student Signature",
					bold: true,
					font: FONT,
					size: 24,
					color: BLACK_COLOR
				})]
			})]
		}), new TableCell({
			borders: invisibleBorders,
			width: {
				size: Math.ceil(TABLE_WIDTH_DXA / 2),
				type: WidthType.DXA
			},
			children: [new Paragraph({
				alignment: AlignmentType.RIGHT,
				spacing: {
					before: 0,
					after: 0
				},
				children: [new TextRun({
					text: "Guide Signature",
					bold: true,
					font: FONT,
					size: 24,
					color: BLACK_COLOR
				})]
			})]
		})] })]
	});
	const doc = new Document({
		defaultStyles: { normal: { run: {
			font: FONT,
			size: 24,
			color: BLACK_COLOR
		} } },
		sections: [{
			properties: { page: {
				size: {
					width: 12240,
					height: 15840
				},
				margin: {
					top: 960,
					bottom: 960,
					left: 888,
					right: 888
				}
			} },
			children: [
				headerTable,
				new Paragraph({ spacing: {
					before: 240,
					after: 0
				} }),
				metadataTable,
				new Paragraph({ spacing: {
					before: 120,
					after: 0
				} }),
				boxedTable,
				new Paragraph({ spacing: {
					before: 480,
					after: 0
				} }),
				signaturesTable
			]
		}]
	});
	return await Packer.toBlob(doc);
}
//#endregion
//#region src/routes/report.$id.tsx?tsr-split=component
var STEPS = [
	"Academic details",
	"Student details",
	"Faculty details",
	"Project details",
	"One Page Write-Up",
	"Generation options"
];
function Workspace() {
	const { id } = Route.useParams();
	useNavigate();
	const [draft, setDraft] = useState(null);
	const [notFound, setNotFound] = useState(false);
	const [busy, setBusy] = useState(null);
	const [downloading, setDownloading] = useState(false);
	const [downloadingWriteUp, setDownloadingWriteUp] = useState(false);
	const [generatingDesc, setGeneratingDesc] = useState(false);
	const [generatingAllFigs, setGeneratingAllFigs] = useState(false);
	const [aiSettingsOpen, setAiSettingsOpen] = useState(false);
	const [aiConfig, setAiConfig] = useState(() => {
		try {
			if (typeof window !== "undefined") {
				const saved = localStorage.getItem("simats_report_ai_config_v2");
				if (saved) return JSON.parse(saved);
			}
		} catch {}
		return { provider: "offline" };
	});
	const [serverAiInfo, setServerAiInfo] = useState(null);
	useServerFn(analyzeTemplate);
	const generate = useServerFn(generateChapter);
	const genImage = useServerFn(generateFigureImage);
	const genWriteUpDesc = useServerFn(generateWriteUpDescription);
	const checkAiStatus = useServerFn(getAiStatus);
	useRef(null);
	const geotagInputRef = useRef(null);
	const pptTitleInputRef = useRef(null);
	const modelInputRef = useRef(null);
	const totalWords = useMemo(() => draft ? countWordsInDraft(draft) : 0, [draft]);
	useEffect(() => {
		checkAiStatus({ data: { aiConfig } }).then((info) => setServerAiInfo(info)).catch(() => {});
	}, [aiConfig]);
	function handleSaveAiConfig(newCfg) {
		setAiConfig(newCfg);
		try {
			localStorage.setItem("simats_report_ai_config_v2", JSON.stringify(newCfg));
		} catch {}
		checkAiStatus({ data: { aiConfig: newCfg } }).then((info) => setServerAiInfo(info)).catch(() => {});
		toast.success("AI Engine configuration saved!");
		setAiSettingsOpen(false);
	}
	useEffect(() => {
		const d = getDraft(id);
		if (d) {
			if (!d.analysis) d.analysis = DEFAULT_ANALYSIS;
			if (!d.academic.institution) d.academic.institution = DEFAULT_INSTITUTION;
			if (!d.academic.institutionLine2 || d.academic.institutionLine2.includes("\n")) d.academic.institutionLine2 = DEFAULT_INSTITUTION_LINE_2;
			if (!d.academic.submissionMonthYear) d.academic.submissionMonthYear = getCurrentSubmissionMonthYear();
			saveDraft(d);
			setDraft(d);
		} else setNotFound(true);
	}, [id]);
	function update(patch) {
		setDraft((prev) => {
			if (!prev) return prev;
			const next = {
				...prev,
				...patch,
				updatedAt: Date.now()
			};
			saveDraft(next);
			return next;
		});
	}
	if (notFound) return /* @__PURE__ */ jsx("main", {
		className: "flex min-h-screen items-center justify-center bg-background px-5",
		children: /* @__PURE__ */ jsxs("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-3xl tracking-wide text-foreground",
					children: "DRAFT NOT FOUND"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This draft no longer exists in this browser."
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "mt-5 inline-block",
					children: /* @__PURE__ */ jsx(Button, { children: "Back to dashboard" })
				})
			]
		})
	});
	if (!draft) return /* @__PURE__ */ jsx("main", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ jsx(Loader2, { className: "size-5 animate-spin text-muted-foreground" })
	});
	const d = draft;
	const step = d.step;
	async function runChapter(chapterId, improve, workerIndex = 1) {
		const current = getDraft(d.id) ?? d;
		const spec = CHAPTER_SPEC.find((c) => c.id === chapterId);
		const setStatus = (patch) => setDraft((prev) => {
			if (!prev) return prev;
			const next = {
				...prev,
				updatedAt: Date.now(),
				chapters: prev.chapters.map((c) => c.id === chapterId ? {
					...c,
					...patch
				} : c)
			};
			saveDraft(next);
			return next;
		});
		const MAX_CHAPTER_ATTEMPTS = 3;
		let lastError;
		for (let attempt = 1; attempt <= MAX_CHAPTER_ATTEMPTS; attempt++) {
			setStatus({
				status: "writing",
				error: attempt > 1 ? `Attempt ${attempt} of ${MAX_CHAPTER_ATTEMPTS}: retrying automatically...` : void 0
			});
			try {
				const existing = current.chapters.find((c) => c.id === chapterId);
				const effectiveWorkerIndex = attempt === 1 ? workerIndex : (workerIndex ?? 1) % 3 + 1;
				const res = await generate({ data: {
					chapterId,
					chapterTitle: spec.number ? `Chapter ${spec.number}: ${spec.title}` : spec.title,
					outline: OUTLINES[chapterId],
					context: buildContext(current),
					length: current.options.length,
					style: current.options.style,
					structureHint: buildStructureHint(current),
					existingContent: improve && existing?.blocks.length ? JSON.stringify(existing.blocks).slice(0, 12e3) : void 0,
					workerIndex: effectiveWorkerIndex,
					aiConfig: aiConfig.apiKey ? aiConfig : aiConfig.provider === "offline" ? { provider: "offline" } : void 0
				} });
				let blocks = (JSON.parse(res.blocksJson) || []).filter((b) => Boolean(b && typeof b === "object" && b.type));
				if (chapterId === "abstract") blocks = blocks.filter((b) => !(b.type === "heading" && /^\s*abstract\s*$/i.test((b.text || "").trim())));
				if (blocks.length === 0) throw new Error("Model returned empty blocks. Retrying chapter generation...");
				setStatus({
					status: "done",
					blocks
				});
				for (let i = 0; i < blocks.length; i++) {
					const b = blocks[i];
					if (b?.type === "figure" && !b.imageData && !b.imageUrl) await triggerFigureImageGen(chapterId, i, b.caption, b.placeholder);
				}
				return;
			} catch (err) {
				lastError = err;
				if (attempt < MAX_CHAPTER_ATTEMPTS) {
					const waitTime = attempt * 1500;
					await new Promise((r) => setTimeout(r, waitTime));
				}
			}
		}
		const message = lastError instanceof Error ? lastError.message : "Generation failed after automatic retries.";
		setStatus({
			status: "error",
			error: message
		});
		throw new Error(message);
	}
	async function triggerFigureImageGen(chapterId, blockIndex, caption, placeholder) {
		try {
			const imgRes = await genImage({ data: {
				caption,
				placeholder: placeholder || caption,
				projectTitle: d.academic.projectTitle || "Capstone Project"
			} });
			if (imgRes.imageData) setDraft((prev) => {
				if (!prev) return prev;
				const next = {
					...prev,
					updatedAt: Date.now(),
					chapters: prev.chapters.map((c) => {
						if (c.id !== chapterId) return c;
						const nextBlocks = [...c.blocks];
						const target = nextBlocks[blockIndex];
						if (target && target.type === "figure") nextBlocks[blockIndex] = {
							...target,
							imageData: imgRes.imageData,
							...imgRes.imageSourceTitle ? { imageSourceTitle: imgRes.imageSourceTitle } : {},
							...imgRes.imageSourceUrl ? { imageSourceUrl: imgRes.imageSourceUrl } : {},
							...imgRes.imageLicense ? { imageLicense: imgRes.imageLicense } : {}
						};
						return {
							...c,
							blocks: nextBlocks
						};
					})
				};
				saveDraft(next);
				return next;
			});
		} catch {}
	}
	async function generateAll() {
		if (!d.academic.projectTitle.trim()) {
			toast.error("Add a project title before generating.");
			return;
		}
		setBusy("all");
		const chaptersToGenerate = d.options.mode === "selected" && d.options.selectedChapters?.length ? d.options.selectedChapters : [
			"abstract",
			"ch1",
			"ch2",
			"ch3",
			"ch4",
			"ch5",
			"references",
			"appendices",
			"outcomes"
		];
		try {
			for (const chapterId of chaptersToGenerate) try {
				await runChapter(chapterId, d.options.mode === "improve", 1);
			} catch (chapErr) {
				console.warn(`[generateAll] Chapter ${chapterId} initial attempt error:`, chapErr);
			}
			let updated = getDraft(d.id);
			let missingOrError = updated?.chapters.filter((c) => chaptersToGenerate.includes(c.id) && (c.status === "error" || c.blocks.length === 0)) || [];
			if (missingOrError.length > 0) {
				toast.info(`Retrying ${missingOrError.length} pending chapter(s)...`);
				for (const errChap of missingOrError) try {
					await runChapter(errChap.id, false, 1);
				} catch {}
			}
			updated = getDraft(d.id);
			const remainingErrors = updated?.chapters.filter((c) => chaptersToGenerate.includes(c.id) && (c.status === "error" || c.blocks.length === 0)) || [];
			if (remainingErrors.length === 0) toast.success("All chapters generated successfully with complete content, figures, and tables!");
			else toast.error(`${remainingErrors.length} chapter(s) could not complete.`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Generation failed.");
		} finally {
			setBusy(null);
		}
	}
	async function regenerate(chapterId) {
		setBusy(chapterId);
		try {
			await runChapter(chapterId, false, chapterId === "abstract" || chapterId === "ch1" || chapterId === "ch2" ? 1 : chapterId === "ch3" || chapterId === "ch4" ? 2 : 3);
			toast.success("Chapter regenerated");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Generation failed.");
		}
		setBusy(null);
	}
	async function downloadSingle(submitterIdx) {
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
			const studentName = submitterIdx !== void 0 && current.students[submitterIdx] ? current.students[submitterIdx].name || `Student ${submitterIdx + 1}` : "";
			toast.success(studentName ? `Downloaded individual report for ${studentName}` : "Word document downloaded");
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
				current.students[i];
				const blob = await generateDocx(current, i);
				const fileName = buildFileName(current, i);
				zip.file(fileName, blob);
			}
			const zipBlob = await zip.generateAsync({ type: "blob" });
			const url = URL.createObjectURL(zipBlob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${current.academic.courseName.trim().replace(/[/\\?%*:|"<>]/g, "").trim() || "Course"} Reports.zip`;
			a.click();
			URL.revokeObjectURL(url);
			toast.success(`Generated ${current.students.length} individual reports with individualized 'Submitted by' in .zip`);
		} catch (err) {
			console.error("[downloadAllIndividualReports] Docx bundle error:", err);
			toast.error(err instanceof Error ? err.message : "Could not bundle individual reports.");
		}
		setDownloading(false);
	}
	async function processAndNormalizeImage(file) {
		if (typeof createImageBitmap === "function") try {
			const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
			const canvas = document.createElement("canvas");
			canvas.width = bitmap.width;
			canvas.height = bitmap.height;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(bitmap, 0, 0);
				return canvas.toDataURL(file.type.includes("png") ? "image/png" : "image/jpeg", .92);
			}
		} catch {}
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				const rawUrl = e.target?.result;
				if (!rawUrl) return reject(/* @__PURE__ */ new Error("Empty file"));
				const img = new Image();
				img.onload = () => {
					const canvas = document.createElement("canvas");
					canvas.width = img.naturalWidth;
					canvas.height = img.naturalHeight;
					const ctx = canvas.getContext("2d");
					if (ctx) {
						ctx.drawImage(img, 0, 0);
						resolve(canvas.toDataURL(file.type.includes("png") ? "image/png" : "image/jpeg", .92));
					} else resolve(rawUrl);
				};
				img.onerror = () => resolve(rawUrl);
				img.src = rawUrl;
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}
	async function rotateImageData(dataUrl, degrees = 90) {
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
				ctx.rotate(degrees * Math.PI / 180);
				ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
				resolve(canvas.toDataURL("image/jpeg", .92));
			};
			img.onerror = reject;
			img.src = dataUrl;
		});
	}
	async function handleWriteUpImageUpload(field, file) {
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			toast.error("Please upload an image file (PNG, JPG, WebP).");
			return;
		}
		if (file.size > 15728640) {
			toast.error("File size is too large (max 15MB).");
			return;
		}
		try {
			const normalizedDataUrl = await processAndNormalizeImage(file);
			update({ onePageWriteUp: {
				...d.onePageWriteUp || { slot: "" },
				[field]: normalizedDataUrl
			} });
			toast.success(`${field === "geotagImage" ? "Geotag photo" : field === "pptTitleImage" ? "PPT title slide" : "Model diagram"} uploaded & orientation normalized!`);
		} catch {
			const reader = new FileReader();
			reader.onload = (e) => {
				const dataUrl = e.target?.result;
				if (dataUrl) update({ onePageWriteUp: {
					...d.onePageWriteUp || { slot: "" },
					[field]: dataUrl
				} });
			};
			reader.readAsDataURL(file);
		}
	}
	async function handleRotateImage(field) {
		const current = d.onePageWriteUp?.[field];
		if (!current) return;
		try {
			const rotated = await rotateImageData(current, 90);
			update({ onePageWriteUp: {
				...d.onePageWriteUp || { slot: "" },
				[field]: rotated
			} });
			toast.success("Image rotated 90° clockwise");
		} catch (err) {
			console.error("Rotation error:", err);
			toast.error("Could not rotate image");
		}
	}
	function handleRemoveImage(field) {
		update({ onePageWriteUp: {
			...d.onePageWriteUp || { slot: "" },
			[field]: ""
		} });
		toast.info("Image removed");
	}
	async function handleGenerateWriteUpDescription() {
		if (!d.academic.projectTitle.trim()) {
			toast.error("Please enter a project title before generating the description.");
			return;
		}
		setGeneratingDesc(true);
		try {
			const res = await genWriteUpDesc({ data: {
				projectTitle: d.academic.projectTitle,
				courseName: d.academic.courseName,
				domain: d.project.domain,
				technologies: d.project.technologies,
				existingDescription: d.project.description,
				aiConfig: aiConfig.apiKey ? aiConfig : void 0
			} });
			if (res?.description) {
				update({ onePageWriteUp: {
					...d.onePageWriteUp || { slot: "" },
					projectDescription: res.description
				} });
				toast.success(`Local template-generated project description (${res.characterCount} chars — fills 1 page up to bottom)!`);
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
		update({ onePageWriteUp: {
			...d.onePageWriteUp || { slot: "" },
			projectDescription: trimmed
		} });
		toast.success(`Trimmed to ${trimmed.length} characters (under 1,150 limit)`);
	}
	async function downloadOnePageWriteUpSingle(submitterIdx) {
		setDownloadingWriteUp(true);
		try {
			let current = getDraft(d.id) ?? d;
			if ((!current.onePageWriteUp?.projectDescription?.trim() || current.onePageWriteUp.projectDescription.trim().length < 40) && current.academic.projectTitle.trim()) try {
				const aiRes = await genWriteUpDesc({ data: {
					projectTitle: current.academic.projectTitle,
					courseName: current.academic.courseName,
					domain: current.project.domain,
					technologies: current.project.technologies,
					existingDescription: current.project.description,
					aiConfig: aiConfig.apiKey ? aiConfig : void 0
				} });
				if (aiRes?.description) {
					current = {
						...current,
						onePageWriteUp: {
							...current.onePageWriteUp || { slot: "" },
							projectDescription: aiRes.description
						}
					};
					saveDraft(current);
					setDraft(current);
				}
			} catch (err) {
				console.warn("[downloadOnePageWriteUpSingle] Local description fallback:", err);
			}
			const blob = await generateOnePageWriteUpDocx(current, submitterIdx);
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = buildOnePageFileName(current, submitterIdx);
			a.click();
			URL.revokeObjectURL(url);
			const studentName = submitterIdx !== void 0 && current.students[submitterIdx] ? current.students[submitterIdx].name || `Student ${submitterIdx + 1}` : "";
			toast.success(studentName ? `Downloaded One Page Write-Up for ${studentName}` : "One Page Write-Up downloaded (.docx)");
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
			if ((!current.onePageWriteUp?.projectDescription?.trim() || current.onePageWriteUp.projectDescription.trim().length < 40) && current.academic.projectTitle.trim()) try {
				const aiRes = await genWriteUpDesc({ data: {
					projectTitle: current.academic.projectTitle,
					courseName: current.academic.courseName,
					domain: current.project.domain,
					technologies: current.project.technologies,
					existingDescription: current.project.description,
					aiConfig: aiConfig.apiKey ? aiConfig : void 0
				} });
				if (aiRes?.description) {
					current = {
						...current,
						onePageWriteUp: {
							...current.onePageWriteUp || { slot: "" },
							projectDescription: aiRes.description
						}
					};
					saveDraft(current);
					setDraft(current);
				}
			} catch (err) {
				console.warn("[downloadAllOnePageWriteUps] Local description fallback:", err);
			}
			const zip = new JSZip();
			for (let i = 0; i < current.students.length; i++) {
				current.students[i];
				const blob = await generateOnePageWriteUpDocx(current, i);
				const fileName = buildOnePageFileName(current, i);
				zip.file(fileName, blob);
			}
			const zipBlob = await zip.generateAsync({ type: "blob" });
			const url = URL.createObjectURL(zipBlob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${current.academic.courseName.trim().replace(/[/\\?%*:|"<>]/g, "").trim() || "Course"} Write-Up Reports.zip`;
			a.click();
			URL.revokeObjectURL(url);
			toast.success(`Generated ${current.students.length} individual write-ups in .zip`);
		} catch (err) {
			console.error("[downloadAllOnePageWriteUps] Zip error:", err);
			toast.error(err instanceof Error ? err.message : "Could not bundle write-ups.");
		}
		setDownloadingWriteUp(false);
	}
	const doneCount = d.chapters.filter((c) => c.status === "done").length;
	const progress = Math.round(doneCount / d.chapters.length * 100);
	return /* @__PURE__ */ jsxs("main", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6",
					children: [
						/* @__PURE__ */ jsxs(Link, {
							to: "/",
							className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground shrink-0",
							children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }), " Dashboard"]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "hidden truncate font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:block min-w-0 flex-1 px-3 text-center",
							children: d.academic.projectTitle || "Untitled capstone project"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 shrink-0",
							children: [d.students.length > 1 ? /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									disabled: downloading || doneCount === 0,
									className: "gap-2 shrink-0",
									children: [
										downloading ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "size-4" }),
										"Download Report ",
										/* @__PURE__ */ jsx(ChevronDown, { className: "size-3.5 opacity-70" })
									]
								})
							}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
								align: "end",
								className: "w-64 bg-card border border-border shadow-xl z-50",
								children: [
									/* @__PURE__ */ jsxs(DropdownMenuItem, {
										onClick: downloadAllIndividualReports,
										className: "font-semibold cursor-pointer text-accent",
										children: [
											/* @__PURE__ */ jsx(Users, { className: "size-4 mr-2" }),
											"Download All ",
											d.students.length,
											" Reports (.zip)"
										]
									}),
									/* @__PURE__ */ jsx("div", { className: "h-px bg-border my-1" }),
									d.students.map((s, idx) => /* @__PURE__ */ jsxs(DropdownMenuItem, {
										onClick: () => downloadSingle(idx),
										className: "cursor-pointer text-xs",
										children: [
											/* @__PURE__ */ jsx(Download, { className: "size-3.5 mr-2 text-muted-foreground" }),
											s.name || `Member ${idx + 1}`,
											" (",
											s.regNo || "No Reg",
											")"
										]
									}, s.id))
								]
							})] }) : /* @__PURE__ */ jsxs(Button, {
								variant: "outline",
								onClick: () => downloadSingle(),
								disabled: downloading || doneCount === 0,
								className: "gap-2 shrink-0",
								children: [downloading ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "size-4" }), "Download Report (.docx)"]
							}), d.students.length > 1 ? /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsxs(Button, {
									disabled: downloadingWriteUp,
									className: "gap-2 shrink-0",
									children: [
										downloadingWriteUp ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsx(FileText, { className: "size-4" }),
										"Download Write-Up ",
										/* @__PURE__ */ jsx(ChevronDown, { className: "size-3.5 opacity-70" })
									]
								})
							}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
								align: "end",
								className: "w-64 bg-card border border-border shadow-xl z-50",
								children: [
									/* @__PURE__ */ jsxs(DropdownMenuItem, {
										onClick: downloadAllOnePageWriteUps,
										className: "font-semibold cursor-pointer text-accent",
										children: [
											/* @__PURE__ */ jsx(Users, { className: "size-4 mr-2" }),
											"Download All ",
											d.students.length,
											" Write-Ups (.zip)"
										]
									}),
									/* @__PURE__ */ jsx("div", { className: "h-px bg-border my-1" }),
									d.students.map((s, idx) => /* @__PURE__ */ jsxs(DropdownMenuItem, {
										onClick: () => downloadOnePageWriteUpSingle(idx),
										className: "cursor-pointer text-xs",
										children: [
											/* @__PURE__ */ jsx(FileText, { className: "size-3.5 mr-2 text-muted-foreground" }),
											s.name || `Member ${idx + 1}`,
											" (",
											s.regNo || "No Reg",
											")"
										]
									}, s.id))
								]
							})] }) : /* @__PURE__ */ jsxs(Button, {
								onClick: () => downloadOnePageWriteUpSingle(),
								disabled: downloadingWriteUp,
								className: "gap-2",
								children: [downloadingWriteUp ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsx(FileText, { className: "size-4" }), "Download Write-Up (.docx)"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ jsxs("section", {
					className: "space-y-5",
					children: [/* @__PURE__ */ jsx("ol", {
						className: "flex flex-wrap gap-1.5",
						children: STEPS.map((label, i) => {
							const n = i + 1;
							return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
								onClick: () => update({ step: n }),
								className: `rounded-sm border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${n === step ? "border-accent bg-accent text-accent-foreground font-semibold" : n < step ? "border-border bg-card text-foreground" : "border-border bg-transparent text-muted-foreground"}`,
								children: [
									n,
									". ",
									label
								]
							}) }, label);
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-border bg-card p-5",
						children: [
							step === 1 && /* @__PURE__ */ jsxs(StepBlock, {
								title: "Academic details",
								hint: "Only essential academic identifiers are kept. Institution and present month-year are automatically locked.",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ jsx(Field, {
											className: "sm:col-span-2",
											label: "Project title",
											value: d.academic.projectTitle,
											onChange: (v) => {
												update({
													academic: {
														...d.academic,
														projectTitle: v
													},
													project: {
														...d.project,
														description: v
													}
												});
											}
										}),
										/* @__PURE__ */ jsx(Field, {
											label: "Course code",
											value: d.academic.courseCode,
											onChange: (v) => update({ academic: {
												...d.academic,
												courseCode: v
											} })
										}),
										/* @__PURE__ */ jsx(Field, {
											label: "Course name",
											value: d.academic.courseName,
											onChange: (v) => update({ academic: {
												...d.academic,
												courseName: v
											} })
										}),
										/* @__PURE__ */ jsx(Field, {
											label: "Degree",
											value: d.academic.degree,
											onChange: (v) => update({ academic: {
												...d.academic,
												degree: v
											} })
										}),
										/* @__PURE__ */ jsx(Field, {
											label: "Department",
											value: d.academic.department,
											onChange: (v) => update({ academic: {
												...d.academic,
												department: v
											} })
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-5 rounded-md border border-border bg-background/60 p-4 space-y-2.5",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.18em] text-accent font-semibold",
										children: "Preset Institutional Parameters"
									}), /* @__PURE__ */ jsxs("div", {
										className: "grid gap-2 text-xs text-muted-foreground sm:grid-cols-2",
										children: [
											/* @__PURE__ */ jsxs("div", { children: [
												/* @__PURE__ */ jsx("span", {
													className: "font-medium text-foreground",
													children: "Institution:"
												}),
												" ",
												"SIMATS Engineering"
											] }),
											/* @__PURE__ */ jsxs("div", { children: [
												/* @__PURE__ */ jsx("span", {
													className: "font-medium text-foreground",
													children: "Submission Month & Year:"
												}),
												" ",
												d.academic.submissionMonthYear || getCurrentSubmissionMonthYear()
											] }),
											/* @__PURE__ */ jsxs("div", {
												className: "sm:col-span-2 text-[11px] leading-relaxed",
												children: [
													/* @__PURE__ */ jsx("span", {
														className: "font-medium text-foreground",
														children: "Institution Line 2:"
													}),
													" ",
													"Saveetha Institute of Medical and Technical Sciences, Chennai-602105"
												]
											})
										]
									})]
								})]
							}),
							step === 2 && /* @__PURE__ */ jsx(StepBlock, {
								title: "Student details",
								hint: "Enter the first person's name, then add team members (up to 5). Individual reports with personalized 'Submitted by' will be generated.",
								children: /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										d.students.map((s, i) => /* @__PURE__ */ jsxs("div", {
											className: "rounded-md border border-border bg-background p-4",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ jsx("p", {
													className: "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold",
													children: i === 0 ? "First Student (Primary)" : `Team Member ${i + 1}`
												}), d.students.length > 1 && /* @__PURE__ */ jsx(Button, {
													variant: "ghost",
													size: "icon",
													"aria-label": "Remove student",
													onClick: () => update({ students: d.students.filter((x) => x.id !== s.id) }),
													children: /* @__PURE__ */ jsx(Trash2, { className: "size-4 text-destructive" })
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "mt-3 grid gap-3 sm:grid-cols-2",
												children: [/* @__PURE__ */ jsx(Field, {
													label: "Student name",
													value: s.name,
													onChange: (v) => update({ students: patch(d.students, i, { name: v }) })
												}), /* @__PURE__ */ jsx(Field, {
													label: "Registration number",
													value: s.regNo,
													onChange: (v) => update({ students: patch(d.students, i, { regNo: v }) })
												})]
											})]
										}, s.id)),
										d.students.length < 5 && /* @__PURE__ */ jsxs(Button, {
											variant: "secondary",
											className: "gap-2",
											onClick: () => update({ students: [...d.students, {
												id: crypto.randomUUID(),
												name: "",
												regNo: ""
											}] }),
											children: [
												/* @__PURE__ */ jsx(Plus, { className: "size-4" }),
												" Add team member (",
												d.students.length,
												"/5)"
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-md border border-accent/30 bg-accent/5 p-3.5 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ jsxs("p", {
												className: "font-medium text-foreground flex items-center gap-1.5",
												children: [/* @__PURE__ */ jsx(Users, { className: "size-3.5 text-accent" }), " Individual Submission Mode Active"]
											}), /* @__PURE__ */ jsxs("p", {
												className: "mt-1",
												children: [
													d.students.length,
													" report",
													d.students.length > 1 ? "s" : "",
													" will be produced for individual submission with the \"Submitted by\" section modified for each member. Student contribution percentages and responsibilities are arranged using the entered team information; verify them with your team."
												]
											})]
										})
									]
								})
							}),
							step === 3 && /* @__PURE__ */ jsx(StepBlock, {
								title: "Faculty details",
								hint: "Used on the Bonafide Certificate with an invisible, clean signature layout.",
								children: /* @__PURE__ */ jsxs("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ jsx(Field, {
											label: "Guide / supervisor name",
											value: d.faculty.guideName,
											onChange: (v) => update({ faculty: {
												...d.faculty,
												guideName: v
											} })
										}),
										/* @__PURE__ */ jsx(Field, {
											label: "Guide / supervisor department",
											value: d.faculty.guideDepartment,
											onChange: (v) => update({ faculty: {
												...d.faculty,
												guideDepartment: v
											} })
										}),
										/* @__PURE__ */ jsx(Field, {
											label: "Course coordinator name",
											value: d.faculty.courseCoordinator,
											onChange: (v) => update({ faculty: {
												...d.faculty,
												courseCoordinator: v
											} })
										}),
										/* @__PURE__ */ jsx(Field, {
											label: "Course coordinator department",
											value: d.faculty.courseCoordinatorDepartment,
											onChange: (v) => update({ faculty: {
												...d.faculty,
												courseCoordinatorDepartment: v
											} })
										})
									]
								})
							}),
							step === 4 && /* @__PURE__ */ jsx(StepBlock, {
								title: "Project details",
								hint: "Enter project details. Information is formatted directly into the official SIMATS capstone structure.",
								children: /* @__PURE__ */ jsxs("div", {
									className: "grid gap-3",
									children: [/* @__PURE__ */ jsx(Field, {
										label: "Project title",
										value: d.academic.projectTitle,
										onChange: (v) => {
											update({
												academic: {
													...d.academic,
													projectTitle: v
												},
												project: {
													...d.project,
													description: v
												}
											});
										}
									}), /* @__PURE__ */ jsxs("div", {
										className: "rounded-md border border-border bg-background p-4 text-xs text-muted-foreground space-y-1.5",
										children: [
											/* @__PURE__ */ jsx("p", {
												className: "font-semibold text-foreground",
												children: "Rule-Based Domain and Architecture Templates"
											}),
											/* @__PURE__ */ jsx("p", { children: "Using project title keywords and entered details, the local template engine drafts:" }),
											/* @__PURE__ */ jsxs("ul", {
												className: "list-disc pl-4 space-y-1",
												children: [
													/* @__PURE__ */ jsx("li", { children: "Domain background and research gap identification" }),
													/* @__PURE__ */ jsx("li", { children: "Multi-parameter problem statements & measurable engineering objectives" }),
													/* @__PURE__ */ jsx("li", { children: "IEEE standard-compliant architecture diagrams & operational flowcharts" }),
													/* @__PURE__ */ jsx("li", { children: "Test plans, measurement templates, and outcome mapping (enter actual measured results)" })
												]
											})
										]
									})]
								})
							}),
							step === 5 && /* @__PURE__ */ jsx(StepBlock, {
								title: "One Page Write-Up",
								hint: "Set the course slot, upload the module photographs, and preview the official single-page write-up sheet.",
								children: /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ jsx(Field, {
												label: "Course Slot (e.g., C, A1)",
												value: d.onePageWriteUp?.slot || d.academic.slot || "",
												onChange: (v) => {
													update({
														academic: {
															...d.academic,
															slot: v
														},
														onePageWriteUp: {
															...d.onePageWriteUp || { slot: "" },
															slot: v
														}
													});
												}
											}), /* @__PURE__ */ jsxs("div", {
												className: "rounded-md border border-border bg-background p-3 text-xs text-muted-foreground flex flex-col justify-center",
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-semibold text-foreground",
													children: "Strict 1-Page Layout Guarantee"
												}), /* @__PURE__ */ jsx("span", { children: "Official SIMATS header, metadata, horizontal photo row, and signatures." })]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ jsx(Label, {
													className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
													children: "Module Photographs (Single Horizontal Row)"
												}), /* @__PURE__ */ jsx("span", {
													className: "text-[11px] text-muted-foreground",
													children: "PNG, JPG, or WebP (Max 12MB each)"
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "grid gap-3 sm:grid-cols-3",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "rounded-md border border-border bg-background p-3 flex flex-col justify-between",
														children: [
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
																className: "flex items-center justify-between mb-1.5",
																children: [/* @__PURE__ */ jsxs("span", {
																	className: "font-semibold text-xs flex items-center gap-1.5",
																	children: [/* @__PURE__ */ jsx(Camera, { className: "size-3.5 text-accent" }), " Geotag Photo"]
																}), /* @__PURE__ */ jsx("span", {
																	className: "text-[10px] font-mono uppercase bg-accent/10 text-accent px-1.5 py-0.5 rounded",
																	children: "Required"
																})]
															}), /* @__PURE__ */ jsx("p", {
																className: "text-[11px] text-muted-foreground mb-3 leading-tight",
																children: "Lab/project photo with GPS Map Camera timestamp."
															})] }),
															/* @__PURE__ */ jsx("input", {
																ref: geotagInputRef,
																type: "file",
																accept: "image/*",
																className: "hidden",
																onChange: (e) => {
																	const f = e.target.files?.[0];
																	if (f) handleWriteUpImageUpload("geotagImage", f);
																	e.target.value = "";
																}
															}),
															d.onePageWriteUp?.geotagImage ? /* @__PURE__ */ jsxs("div", {
																className: "space-y-2",
																children: [/* @__PURE__ */ jsx("div", {
																	className: "relative aspect-[4/3] rounded border border-border overflow-hidden bg-muted/30 flex items-center justify-center",
																	children: /* @__PURE__ */ jsx("img", {
																		src: d.onePageWriteUp.geotagImage,
																		alt: "Geotag Preview",
																		className: "object-contain w-full h-full"
																	})
																}), /* @__PURE__ */ jsxs("div", {
																	className: "flex items-center gap-1.5",
																	children: [
																		/* @__PURE__ */ jsx(Button, {
																			size: "sm",
																			variant: "outline",
																			className: "h-7 text-xs flex-1",
																			onClick: () => geotagInputRef.current?.click(),
																			children: "Replace"
																		}),
																		/* @__PURE__ */ jsx(Button, {
																			size: "sm",
																			variant: "outline",
																			className: "h-7 text-xs px-2",
																			title: "Rotate 90° clockwise",
																			onClick: () => handleRotateImage("geotagImage"),
																			children: /* @__PURE__ */ jsx(RotateCw, { className: "size-3.5" })
																		}),
																		/* @__PURE__ */ jsx(Button, {
																			size: "sm",
																			variant: "ghost",
																			className: "h-7 text-xs text-destructive hover:text-destructive px-2",
																			onClick: () => handleRemoveImage("geotagImage"),
																			children: /* @__PURE__ */ jsx(Trash2, { className: "size-3.5" })
																		})
																	]
																})]
															}) : /* @__PURE__ */ jsxs("button", {
																type: "button",
																onClick: () => geotagInputRef.current?.click(),
																className: "border-2 border-dashed border-border rounded-md p-4 text-center hover:border-accent hover:bg-accent/5 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer",
																children: [
																	/* @__PURE__ */ jsx(Camera, { className: "size-5 text-muted-foreground" }),
																	/* @__PURE__ */ jsx("span", {
																		className: "text-xs font-medium text-foreground",
																		children: "Upload Geotag"
																	}),
																	/* @__PURE__ */ jsx("span", {
																		className: "text-[10px] text-muted-foreground",
																		children: "Click to select photo"
																	})
																]
															})
														]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "rounded-md border border-border bg-background p-3 flex flex-col justify-between",
														children: [
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
																className: "flex items-center justify-between mb-1.5",
																children: [/* @__PURE__ */ jsxs("span", {
																	className: "font-semibold text-xs flex items-center gap-1.5",
																	children: [/* @__PURE__ */ jsx(ImageIcon, { className: "size-3.5 text-accent" }), " PPT Title Page"]
																}), /* @__PURE__ */ jsx("span", {
																	className: "text-[10px] font-mono uppercase bg-accent/10 text-accent px-1.5 py-0.5 rounded",
																	children: "Required"
																})]
															}), /* @__PURE__ */ jsx("p", {
																className: "text-[11px] text-muted-foreground mb-3 leading-tight",
																children: "Snapshot of presentation title slide with guides/presenters."
															})] }),
															/* @__PURE__ */ jsx("input", {
																ref: pptTitleInputRef,
																type: "file",
																accept: "image/*",
																className: "hidden",
																onChange: (e) => {
																	const f = e.target.files?.[0];
																	if (f) handleWriteUpImageUpload("pptTitleImage", f);
																	e.target.value = "";
																}
															}),
															d.onePageWriteUp?.pptTitleImage ? /* @__PURE__ */ jsxs("div", {
																className: "space-y-2",
																children: [/* @__PURE__ */ jsx("div", {
																	className: "relative aspect-[4/3] rounded border border-border overflow-hidden bg-muted/30 flex items-center justify-center",
																	children: /* @__PURE__ */ jsx("img", {
																		src: d.onePageWriteUp.pptTitleImage,
																		alt: "PPT Title Preview",
																		className: "object-contain w-full h-full"
																	})
																}), /* @__PURE__ */ jsxs("div", {
																	className: "flex items-center gap-1.5",
																	children: [
																		/* @__PURE__ */ jsx(Button, {
																			size: "sm",
																			variant: "outline",
																			className: "h-7 text-xs flex-1",
																			onClick: () => pptTitleInputRef.current?.click(),
																			children: "Replace"
																		}),
																		/* @__PURE__ */ jsx(Button, {
																			size: "sm",
																			variant: "outline",
																			className: "h-7 text-xs px-2",
																			title: "Rotate 90° clockwise",
																			onClick: () => handleRotateImage("pptTitleImage"),
																			children: /* @__PURE__ */ jsx(RotateCw, { className: "size-3.5" })
																		}),
																		/* @__PURE__ */ jsx(Button, {
																			size: "sm",
																			variant: "ghost",
																			className: "h-7 text-xs text-destructive hover:text-destructive px-2",
																			onClick: () => handleRemoveImage("pptTitleImage"),
																			children: /* @__PURE__ */ jsx(Trash2, { className: "size-3.5" })
																		})
																	]
																})]
															}) : /* @__PURE__ */ jsxs("button", {
																type: "button",
																onClick: () => pptTitleInputRef.current?.click(),
																className: "border-2 border-dashed border-border rounded-md p-4 text-center hover:border-accent hover:bg-accent/5 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer",
																children: [
																	/* @__PURE__ */ jsx(ImageIcon, { className: "size-5 text-muted-foreground" }),
																	/* @__PURE__ */ jsx("span", {
																		className: "text-xs font-medium text-foreground",
																		children: "Upload PPT Slide"
																	}),
																	/* @__PURE__ */ jsx("span", {
																		className: "text-[10px] text-muted-foreground",
																		children: "Click to select slide"
																	})
																]
															})
														]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "rounded-md border border-border bg-background p-3 flex flex-col justify-between",
														children: [
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
																className: "flex items-center justify-between mb-1.5",
																children: [/* @__PURE__ */ jsxs("span", {
																	className: "font-semibold text-xs flex items-center gap-1.5",
																	children: [/* @__PURE__ */ jsx(Cpu, { className: "size-3.5 text-muted-foreground" }), " Model"]
																}), /* @__PURE__ */ jsx("span", {
																	className: "text-[10px] font-mono uppercase bg-muted text-muted-foreground px-1.5 py-0.5 rounded",
																	children: "Optional"
																})]
															}), /* @__PURE__ */ jsx("p", {
																className: "text-[11px] text-muted-foreground mb-3 leading-tight",
																children: "ML model pipeline, system flowchart, or prototype."
															})] }),
															/* @__PURE__ */ jsx("input", {
																ref: modelInputRef,
																type: "file",
																accept: "image/*",
																className: "hidden",
																onChange: (e) => {
																	const f = e.target.files?.[0];
																	if (f) handleWriteUpImageUpload("modelImage", f);
																	e.target.value = "";
																}
															}),
															d.onePageWriteUp?.modelImage ? /* @__PURE__ */ jsxs("div", {
																className: "space-y-2",
																children: [/* @__PURE__ */ jsx("div", {
																	className: "relative aspect-[4/3] rounded border border-border overflow-hidden bg-muted/30 flex items-center justify-center",
																	children: /* @__PURE__ */ jsx("img", {
																		src: d.onePageWriteUp.modelImage,
																		alt: "Model Preview",
																		className: "object-contain w-full h-full"
																	})
																}), /* @__PURE__ */ jsxs("div", {
																	className: "flex items-center gap-1.5",
																	children: [
																		/* @__PURE__ */ jsx(Button, {
																			size: "sm",
																			variant: "outline",
																			className: "h-7 text-xs flex-1",
																			onClick: () => modelInputRef.current?.click(),
																			children: "Replace"
																		}),
																		/* @__PURE__ */ jsx(Button, {
																			size: "sm",
																			variant: "outline",
																			className: "h-7 text-xs px-2",
																			title: "Rotate 90° clockwise",
																			onClick: () => handleRotateImage("modelImage"),
																			children: /* @__PURE__ */ jsx(RotateCw, { className: "size-3.5" })
																		}),
																		/* @__PURE__ */ jsx(Button, {
																			size: "sm",
																			variant: "ghost",
																			className: "h-7 text-xs text-destructive hover:text-destructive px-2",
																			onClick: () => handleRemoveImage("modelImage"),
																			children: /* @__PURE__ */ jsx(Trash2, { className: "size-3.5" })
																		})
																	]
																})]
															}) : /* @__PURE__ */ jsxs("button", {
																type: "button",
																onClick: () => modelInputRef.current?.click(),
																className: "border-2 border-dashed border-border rounded-md p-4 text-center hover:border-accent hover:bg-accent/5 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer",
																children: [
																	/* @__PURE__ */ jsx(Cpu, { className: "size-5 text-muted-foreground" }),
																	/* @__PURE__ */ jsx("span", {
																		className: "text-xs font-medium text-foreground",
																		children: "Upload Model"
																	}),
																	/* @__PURE__ */ jsx("span", {
																		className: "text-[10px] text-muted-foreground",
																		children: "Optional architecture/diagram"
																	})
																]
															})
														]
													})
												]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ jsxs("div", {
													className: "flex flex-col sm:flex-row sm:items-center justify-between gap-1.5",
													children: [/* @__PURE__ */ jsx(Label, {
														className: "text-xs font-semibold",
														children: "Project Description (Official Single Page Fill • Max 1,500 Characters)"
													}), (() => {
														const charCount = (d.onePageWriteUp?.projectDescription ?? d.project.description ?? "").length;
														const isUnderLimit = charCount <= 1150;
														return /* @__PURE__ */ jsxs("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ jsxs("span", {
																className: `text-[11px] font-mono font-medium flex items-center gap-1 px-2 py-0.5 rounded ${isUnderLimit ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" : "bg-destructive/10 text-destructive border border-destructive/20 font-bold"}`,
																children: [
																	isUnderLimit ? /* @__PURE__ */ jsx(Check, { className: "size-3" }) : /* @__PURE__ */ jsx(AlertTriangle, { className: "size-3" }),
																	charCount,
																	" / 1,150 chars ",
																	isUnderLimit ? "(Valid)" : "(Over limit!)"
																]
															}), !isUnderLimit && /* @__PURE__ */ jsx(Button, {
																size: "sm",
																variant: "outline",
																className: "h-6 text-[10px] text-destructive border-destructive/40 px-2",
																onClick: trimWriteUpDescriptionToLimit,
																children: "Trim to < 1,150"
															})]
														});
													})()]
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "flex flex-wrap items-center gap-2 mb-1",
													children: [/* @__PURE__ */ jsxs(Button, {
														size: "sm",
														onClick: handleGenerateWriteUpDescription,
														disabled: generatingDesc || !d.academic.projectTitle.trim(),
														className: "gap-2 font-semibold",
														children: [generatingDesc ? /* @__PURE__ */ jsx(Loader2, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ jsx(Sparkles, { className: "size-3.5 text-accent" }), d.onePageWriteUp?.projectDescription ? "Regenerate Local Description" : "Generate Description from Project Details"]
													}), (!d.onePageWriteUp?.projectDescription || d.onePageWriteUp.projectDescription !== d.project.description) && /* @__PURE__ */ jsx(Button, {
														variant: "ghost",
														size: "sm",
														className: "h-8 text-xs text-muted-foreground",
														onClick: () => {
															update({ onePageWriteUp: {
																...d.onePageWriteUp || { slot: "" },
																projectDescription: d.project.description || d.academic.projectTitle
															} });
														},
														children: "Sync from Project Details"
													})]
												}),
												/* @__PURE__ */ jsx("textarea", {
													rows: 6,
													className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs leading-relaxed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
													placeholder: "Click 'Generate Local Description' to compose a template-based draft from your project details...",
													value: d.onePageWriteUp?.projectDescription ?? d.project.description ?? "",
													onChange: (e) => {
														update({ onePageWriteUp: {
															...d.onePageWriteUp || { slot: "" },
															projectDescription: e.target.value
														} });
													}
												}),
												/* @__PURE__ */ jsx("p", {
													className: "text-[11px] text-muted-foreground",
													children: "AI drafts an exact-fit academic description (approx 1,000 to 1,140 characters, strictly under 1,150 characters) that fills the official write-up table cleanly down to the signature line."
												})
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-md border border-border bg-card p-4 space-y-3",
											children: [/* @__PURE__ */ jsxs("p", {
												className: "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold flex items-center gap-1.5",
												children: [/* @__PURE__ */ jsx(Layers, { className: "size-3.5 text-accent" }), " Live Sheet Preview (Official 1-Page Format)"]
											}), /* @__PURE__ */ jsxs("div", {
												className: "rounded border border-gray-300 bg-white text-black p-6 sm:p-8 shadow-md max-w-[680px] mx-auto select-none overflow-hidden",
												style: { fontFamily: "\"Times New Roman\", Times, Georgia, serif" },
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between pb-4 text-center",
														children: [
															/* @__PURE__ */ jsx("img", {
																src: "/assets/simats-seal-MSZeoTl_.png",
																alt: "SIMATS Seal",
																className: "w-[52px] h-[51px] object-contain shrink-0"
															}),
															/* @__PURE__ */ jsxs("div", {
																className: "flex-1 px-3",
																children: [
																	/* @__PURE__ */ jsx("p", {
																		className: "font-bold text-[13px] uppercase tracking-normal text-black leading-tight",
																		children: "SIMATS ENGINEERING"
																	}),
																	/* @__PURE__ */ jsx("p", {
																		className: "text-[12px] text-black leading-tight mt-0.5",
																		children: "Saveetha Institute of Medical and Technical Sciences"
																	}),
																	/* @__PURE__ */ jsx("p", {
																		className: "text-[12px] text-black leading-tight mt-0.5",
																		children: "Chennai- 602105"
																	})
																]
															}),
															/* @__PURE__ */ jsx("img", {
																src: "/assets/simats-excel-logo-Bjmt_nwZ.png",
																alt: "SIMATS Engineer to Excel",
																className: "w-[41px] h-[48px] object-contain shrink-0"
															})
														]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-black mb-3",
														children: [
															/* @__PURE__ */ jsxs("div", { children: [
																/* @__PURE__ */ jsx("span", {
																	className: "font-bold",
																	children: "Student Name:"
																}),
																" ",
																d.students[0]?.name || "Student Name"
															] }),
															/* @__PURE__ */ jsxs("div", { children: [
																/* @__PURE__ */ jsx("span", {
																	className: "font-bold",
																	children: "Reg. No.:"
																}),
																" ",
																d.students[0]?.regNo || "192524129"
															] }),
															/* @__PURE__ */ jsxs("div", { children: [
																/* @__PURE__ */ jsx("span", {
																	className: "font-bold",
																	children: "Course Code:"
																}),
																" ",
																d.academic.courseCode || "CSA0821"
															] }),
															/* @__PURE__ */ jsxs("div", { children: [
																/* @__PURE__ */ jsx("span", {
																	className: "font-bold",
																	children: "Slot:"
																}),
																" ",
																d.onePageWriteUp?.slot || d.academic.slot || "C"
															] }),
															/* @__PURE__ */ jsxs("div", {
																className: "col-span-2",
																children: [
																	/* @__PURE__ */ jsx("span", {
																		className: "font-bold",
																		children: "Course Name:"
																	}),
																	" ",
																	d.academic.courseName || "Course Name"
																]
															}),
															/* @__PURE__ */ jsxs("div", {
																className: "col-span-2",
																children: [
																	/* @__PURE__ */ jsx("span", {
																		className: "font-bold",
																		children: "Course Faculty:"
																	}),
																	" ",
																	d.faculty.courseFaculty || d.faculty.guideName || "Dr. G. Nagarajan"
																]
															})
														]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "border border-black divide-y divide-black text-[12px] text-black",
														children: [
															/* @__PURE__ */ jsxs("div", {
																className: "p-2",
																children: [/* @__PURE__ */ jsx("span", {
																	className: "font-bold",
																	children: "Project Title: "
																}), /* @__PURE__ */ jsx("span", { children: d.academic.projectTitle || "Your Project Title Here" })]
															}),
															/* @__PURE__ */ jsx("div", {
																className: "p-2 font-bold",
																children: "Module Photographs:"
															}),
															/* @__PURE__ */ jsx("div", {
																className: "p-2.5",
																children: /* @__PURE__ */ jsxs("div", {
																	className: `grid gap-3 ${d.onePageWriteUp?.modelImage ? "grid-cols-3" : "grid-cols-2"}`,
																	children: [
																		/* @__PURE__ */ jsx("div", {
																			className: "border border-gray-200 bg-gray-50 h-32 sm:h-36 rounded flex items-center justify-center overflow-hidden",
																			children: d.onePageWriteUp?.geotagImage ? /* @__PURE__ */ jsx("img", {
																				src: d.onePageWriteUp.geotagImage,
																				alt: "Geotag",
																				className: "w-full h-full object-cover"
																			}) : /* @__PURE__ */ jsx("span", {
																				className: "text-[11px] text-gray-400",
																				children: "[ Geotag Photo ]"
																			})
																		}),
																		/* @__PURE__ */ jsx("div", {
																			className: "border border-gray-200 bg-gray-50 h-32 sm:h-36 rounded flex items-center justify-center overflow-hidden",
																			children: d.onePageWriteUp?.pptTitleImage ? /* @__PURE__ */ jsx("img", {
																				src: d.onePageWriteUp.pptTitleImage,
																				alt: "PPT",
																				className: "w-full h-full object-cover"
																			}) : /* @__PURE__ */ jsx("span", {
																				className: "text-[11px] text-gray-400",
																				children: "[ PPT Title Page ]"
																			})
																		}),
																		d.onePageWriteUp?.modelImage && /* @__PURE__ */ jsx("div", {
																			className: "border border-gray-200 bg-gray-50 h-32 sm:h-36 rounded flex items-center justify-center overflow-hidden",
																			children: /* @__PURE__ */ jsx("img", {
																				src: d.onePageWriteUp.modelImage,
																				alt: "Model",
																				className: "w-full h-full object-cover"
																			})
																		})
																	]
																})
															}),
															/* @__PURE__ */ jsx("div", {
																className: "p-2 font-bold",
																children: "Project Description:"
															}),
															/* @__PURE__ */ jsx("div", {
																className: "p-3 space-y-2",
																children: (d.onePageWriteUp?.projectDescription || d.project.description || "Project description summary...").split(/\n+/).map((p, idx) => /* @__PURE__ */ jsx("p", {
																	className: "text-[11.5px] text-justify leading-[1.38] text-black",
																	children: p
																}, idx))
															})
														]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "pt-7 pb-2 px-1 text-[12px] font-bold flex justify-between items-center text-black",
														children: [/* @__PURE__ */ jsx("span", { children: "Student Signature" }), /* @__PURE__ */ jsx("span", { children: "Guide Signature" })]
													})
												]
											})]
										})
									]
								})
							}),
							step === 6 && /* @__PURE__ */ jsxs(StepBlock, {
								title: "Generation options",
								hint: "Configure report length and style, then generate your complete SIMATS capstone report.",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 sm:grid-cols-3",
										children: [
											/* @__PURE__ */ jsx(Picker, {
												label: "Length",
												value: d.options.length,
												options: [
													"short",
													"standard",
													"detailed"
												],
												onChange: (v) => update({ options: {
													...d.options,
													length: v
												} })
											}),
											/* @__PURE__ */ jsx(Picker, {
												label: "Style",
												value: d.options.style,
												options: [
													"academic",
													"technical",
													"professional",
													"research"
												],
												onChange: (v) => update({ options: {
													...d.options,
													style: v
												} })
											}),
											/* @__PURE__ */ jsx(Picker, {
												label: "Mode",
												value: d.options.mode,
												options: [
													"complete",
													"selected",
													"improve"
												],
												onChange: (v) => update({ options: {
													...d.options,
													mode: v
												} })
											})
										]
									}),
									d.options.mode !== "complete" && /* @__PURE__ */ jsx("div", {
										className: "mt-4 space-y-2 rounded-md border border-border bg-background p-4",
										children: CHAPTER_SPEC.map((c) => /* @__PURE__ */ jsxs("label", {
											className: "flex items-center gap-2.5 text-sm",
											children: [/* @__PURE__ */ jsx(Checkbox, {
												checked: d.options.selectedChapters.includes(c.id),
												onCheckedChange: (checked) => update({ options: {
													...d.options,
													selectedChapters: checked ? [...d.options.selectedChapters, c.id] : d.options.selectedChapters.filter((x) => x !== c.id)
												} })
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-foreground",
												children: [c.number ? `Chapter ${c.number} — ` : "", c.title]
											})]
										}, c.id))
									}),
									/* @__PURE__ */ jsxs(Button, {
										size: "lg",
										className: "mt-4 w-full gap-2 font-semibold",
										onClick: generateAll,
										disabled: busy !== null || generatingAllFigs,
										children: [busy === "all" ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsx(Sparkles, { className: "size-4" }), "Generate Complete Report"]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-6 flex items-center justify-between border-t border-border pt-4",
								children: [/* @__PURE__ */ jsxs(Button, {
									variant: "ghost",
									className: "gap-2",
									disabled: step === 1,
									onClick: () => update({ step: step - 1 }),
									children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }), " Back"]
								}), /* @__PURE__ */ jsxs(Button, {
									className: "gap-2",
									disabled: step === STEPS.length,
									onClick: () => update({ step: step + 1 }),
									children: ["Next ", /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("section", {
					className: "space-y-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-border bg-card p-5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
									children: "Chapters & Outcomes"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ jsxs("span", {
											className: `font-mono text-[11px] px-2 py-0.5 rounded-sm border ${totalWords >= 6e3 && totalWords <= 6500 ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold" : totalWords > 6500 ? "border-destructive/30 bg-destructive/10 text-destructive font-semibold" : "border-border bg-background text-muted-foreground"}`,
											title: "Target: 6,000 to 6,500 words total across entire report",
											children: [totalWords.toLocaleString(), " / 6,000–6,500 words"]
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-muted-foreground font-mono text-[11px]",
											children: "•"
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "font-mono text-[11px] text-muted-foreground",
											children: [
												doneCount,
												"/",
												d.chapters.length,
												" generated"
											]
										})
									]
								})]
							}),
							/* @__PURE__ */ jsx(Progress, {
								value: progress,
								className: "mt-3 h-1.5"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-4 space-y-1.5",
								children: d.chapters.map((c) => /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 rounded-sm border border-border bg-background px-3 py-2",
									children: [
										/* @__PURE__ */ jsx(StatusDot, { status: c.status }),
										/* @__PURE__ */ jsxs("p", {
											className: "min-w-0 flex-1 truncate text-sm text-foreground",
											children: [c.number ? `Chapter ${c.number}. ` : "", c.title]
										}),
										/* @__PURE__ */ jsx(Button, {
											variant: "ghost",
											size: "icon",
											"aria-label": `Regenerate ${c.title}`,
											disabled: busy !== null,
											onClick: () => regenerate(c.id),
											children: busy === c.id || c.status === "writing" ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsx(RefreshCw, { className: "size-4" })
										})
									]
								}, c.id))
							})
						]
					}), /* @__PURE__ */ jsx(Preview, {
						draft: d,
						onRegenImage: (chapterId, blockIdx, caption, placeholder) => triggerFigureImageGen(chapterId, blockIdx, caption, placeholder),
						onEdit: (chapterId, blocks) => update({ chapters: d.chapters.map((c) => c.id === chapterId ? {
							...c,
							blocks
						} : c) })
					})]
				})]
			}),
			/* @__PURE__ */ jsx(AiSettingsDialog, {
				open: aiSettingsOpen,
				onOpenChange: setAiSettingsOpen,
				currentConfig: aiConfig,
				onSave: handleSaveAiConfig,
				serverStatus: serverAiInfo
			})
		]
	});
}
function Preview({ draft, onEdit, onRegenImage }) {
	const written = useMemo(() => draft.chapters.filter((c) => c.blocks.length > 0), [draft.chapters]);
	if (written.length === 0) return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-dashed border-border bg-card/60 p-10 text-center",
		children: [/* @__PURE__ */ jsx(FileText, { className: "mx-auto size-5 text-muted-foreground" }), /* @__PURE__ */ jsx("p", {
			className: "mt-3 text-sm text-muted-foreground",
			children: "Generated chapters appear here as a document preview with figures, tables, and IEEE references."
		})]
	});
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-4",
		children: written.map((c) => /* @__PURE__ */ jsxs("article", {
			className: "rise-in rounded-md border border-border bg-card p-6 shadow-sm",
			children: [
				/* @__PURE__ */ jsxs("h2", {
					className: "font-display text-xl uppercase tracking-wide text-foreground",
					children: [c.number ? `Chapter ${c.number} — ` : "", c.title]
				}),
				c.error && /* @__PURE__ */ jsxs("p", {
					className: "mt-2 flex items-center gap-2 text-sm text-destructive",
					children: [
						/* @__PURE__ */ jsx(AlertTriangle, { className: "size-4" }),
						" ",
						c.error
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-4 space-y-3",
					children: (c.id === "abstract" ? (c.blocks || []).filter((b) => Boolean(b && b.type && !(b.type === "heading" && /^\s*abstract\s*$/i.test((b.text || "").trim())))) : (c.blocks || []).filter((b) => Boolean(b && b.type))).map((b, i) => /* @__PURE__ */ jsx(BlockView, {
						block: b,
						onRegenImage: () => {
							const realIdx = c.blocks.indexOf(b);
							if (b.type === "figure" && realIdx !== -1) onRegenImage(c.id, realIdx, b.caption, b.placeholder);
						},
						onChange: (next) => {
							const realIdx = c.blocks.indexOf(b);
							if (realIdx !== -1) onEdit(c.id, c.blocks.map((x, j) => j === realIdx ? next : x));
						}
					}, i))
				})
			]
		}, c.id))
	});
}
function BlockView({ block, onChange, onRegenImage }) {
	const [generatingImg, setGeneratingImg] = useState(false);
	if (!block || !block.type) return null;
	if (block.type === "heading") return /* @__PURE__ */ jsx("h3", {
		contentEditable: true,
		suppressContentEditableWarning: true,
		onBlur: (e) => onChange({
			...block,
			text: e.currentTarget.textContent ?? ""
		}),
		className: `font-semibold text-foreground outline-none ${block.level === 2 ? "text-base mt-3" : "text-sm mt-2 italic"}`,
		children: block.text
	});
	if (block.type === "paragraph") return /* @__PURE__ */ jsx("p", {
		contentEditable: true,
		suppressContentEditableWarning: true,
		onBlur: (e) => onChange({
			...block,
			text: e.currentTarget.textContent ?? ""
		}),
		className: "text-justify text-sm leading-relaxed text-foreground/90 outline-none",
		children: block.text
	});
	if (block.type === "bullets") return /* @__PURE__ */ jsx("ul", {
		className: "list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/90",
		children: block.items.map((it, i) => /* @__PURE__ */ jsx("li", { children: it }, i))
	});
	if (block.type === "numbered") return /* @__PURE__ */ jsx("ol", {
		className: "list-decimal space-y-1 pl-5 text-sm leading-relaxed text-foreground/90",
		children: block.items.map((it, i) => /* @__PURE__ */ jsx("li", { children: it }, i))
	});
	if (block.type === "table") return /* @__PURE__ */ jsxs("figure", {
		className: "my-4 overflow-x-auto",
		children: [/* @__PURE__ */ jsx("figcaption", {
			className: "mb-1.5 text-center font-serif text-xs font-semibold text-foreground",
			children: block.caption
		}), /* @__PURE__ */ jsxs("table", {
			className: "w-full border-collapse text-xs",
			children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: block.headers.map((h, i) => /* @__PURE__ */ jsx("th", {
				className: "border border-border bg-secondary/80 px-2.5 py-1.5 text-left font-semibold text-foreground",
				children: h
			}, i)) }) }), /* @__PURE__ */ jsx("tbody", { children: block.rows.map((row, i) => /* @__PURE__ */ jsx("tr", {
				className: "hover:bg-muted/40",
				children: row.map((cell, j) => /* @__PURE__ */ jsx("td", {
					className: "border border-border px-2.5 py-1.5 text-foreground/90",
					children: cell
				}, j))
			}, i)) })]
		})]
	});
	if (block.type === "figure") {
		const combinedDesc = `${block.caption} ${block.placeholder || ""}`.toLowerCase();
		const isMatplotlib = /4\.[23]|latency|throughput|benchmark|curve|plot/i.test(combinedDesc);
		return /* @__PURE__ */ jsx("figure", {
			className: "my-4 rounded-md border border-border bg-background p-4 text-center",
			children: block.imageData || block.imageUrl ? /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-center gap-2 mb-1",
						children: isMatplotlib ? /* @__PURE__ */ jsx("span", {
							className: "inline-flex items-center gap-1 rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400 border border-blue-500/20",
							children: "📊 Python Matplotlib Graph"
						}) : /* @__PURE__ */ jsx("span", {
							className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
							children: "📐 Scalable Vector Graphics (SVG)"
						})
					}),
					/* @__PURE__ */ jsx("img", {
						src: block.imageData || block.imageUrl,
						alt: block.caption,
						className: "mx-auto max-h-72 rounded border border-border shadow-sm object-contain"
					}),
					/* @__PURE__ */ jsx("figcaption", {
						className: "font-serif text-xs italic text-foreground font-medium",
						children: block.caption
					}),
					/* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						size: "sm",
						disabled: generatingImg,
						onClick: async () => {
							setGeneratingImg(true);
							try {
								await onRegenImage();
							} finally {
								setGeneratingImg(false);
							}
						},
						className: "text-[11px] gap-1.5 h-7 mt-1",
						children: [generatingImg ? /* @__PURE__ */ jsx(Loader2, { className: "size-3 animate-spin" }) : /* @__PURE__ */ jsx(Sparkles, { className: "size-3 text-accent" }), isMatplotlib ? "Regenerate with Matplotlib" : "Regenerate SVG Image"]
					})
				]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "py-6 space-y-2",
				children: [
					/* @__PURE__ */ jsx(ImageIcon, { className: "mx-auto size-7 text-accent/80" }),
					/* @__PURE__ */ jsx("p", {
						className: "font-mono text-xs uppercase tracking-[0.14em] text-foreground font-semibold",
						children: block.caption
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-center gap-2",
						children: isMatplotlib ? /* @__PURE__ */ jsx("span", {
							className: "inline-flex items-center gap-1 rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400 border border-blue-500/20",
							children: "📊 Python Matplotlib Graph"
						}) : /* @__PURE__ */ jsx("span", {
							className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
							children: "📐 Scalable Vector Graphics (SVG)"
						})
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground max-w-md mx-auto",
						children: block.placeholder || "Engineering schematic diagram"
					}),
					/* @__PURE__ */ jsxs(Button, {
						variant: "secondary",
						size: "sm",
						disabled: generatingImg,
						onClick: async () => {
							setGeneratingImg(true);
							try {
								await onRegenImage();
							} finally {
								setGeneratingImg(false);
							}
						},
						className: "text-xs gap-1.5 mt-2",
						children: [generatingImg ? /* @__PURE__ */ jsx(Loader2, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ jsx(Sparkles, { className: "size-3.5 text-accent" }), isMatplotlib ? "Generate Graph with Matplotlib" : "Generate SVG Image"]
					})
				]
			})
		});
	}
	return /* @__PURE__ */ jsx("p", {
		className: "rounded-sm border-l-2 border-accent bg-secondary/60 px-3 py-2 font-mono text-[12px] text-foreground",
		children: block.text
	});
}
function StepBlock({ title, hint, children }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("h2", {
			className: "font-display text-2xl uppercase tracking-wide text-foreground",
			children: title
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: hint
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-5",
			children
		})
	] });
}
function Field({ label, value, onChange, className = "" }) {
	return /* @__PURE__ */ jsxs("div", {
		className,
		children: [/* @__PURE__ */ jsx(Label, {
			className: "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-medium",
			children: label
		}), /* @__PURE__ */ jsx(Input, {
			className: "mt-1.5",
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function Picker({ label, value, options, onChange }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
		className: "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-medium",
		children: label
	}), /* @__PURE__ */ jsxs(Select, {
		value,
		onValueChange: onChange,
		children: [/* @__PURE__ */ jsx(SelectTrigger, {
			className: "mt-1.5 w-full capitalize",
			children: /* @__PURE__ */ jsx(SelectValue, {})
		}), /* @__PURE__ */ jsx(SelectContent, { children: options.map((o) => /* @__PURE__ */ jsx(SelectItem, {
			value: o,
			className: "capitalize",
			children: o
		}, o)) })]
	})] });
}
function StatusDot({ status }) {
	if (status === "done") return /* @__PURE__ */ jsx(Check, {
		className: "size-4 text-[color:var(--success)]",
		"aria-label": "Done"
	});
	if (status === "writing") return /* @__PURE__ */ jsx(Loader2, {
		className: "size-4 animate-spin text-accent",
		"aria-label": "Writing"
	});
	if (status === "error") return /* @__PURE__ */ jsx(AlertTriangle, {
		className: "size-4 text-destructive",
		"aria-label": "Error"
	});
	return /* @__PURE__ */ jsx("span", {
		className: "size-2 rounded-full bg-muted-foreground/40",
		"aria-label": "Queued"
	});
}
function patch(students, i, p) {
	return students.map((s, j) => j === i ? {
		...s,
		...p
	} : s);
}
//#endregion
export { Workspace as component };
