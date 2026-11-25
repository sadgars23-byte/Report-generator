import { i as listDrafts, n as deleteDraft, o as Button, t as createDraft } from "./report-store-BmXOuiaB.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Download, FileText, Layers, Plus, ShieldCheck, Trash2 } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
function Dashboard() {
	const navigate = useNavigate();
	const [drafts, setDrafts] = useState([]);
	useEffect(() => {
		setDrafts(listDrafts());
	}, []);
	function startNew() {
		const draft = createDraft();
		navigate({
			to: "/report/$id",
			params: { id: draft.id }
		});
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ jsx("header", {
			className: "border-b border-border",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx("div", {
						className: "chrome flex size-9 items-center justify-center rounded-sm",
						children: /* @__PURE__ */ jsx(FileText, { className: "size-4 text-background" })
					}), /* @__PURE__ */ jsxs("div", {
						className: "leading-none",
						children: [/* @__PURE__ */ jsx("p", {
							className: "font-display text-lg tracking-wide text-foreground",
							children: "VERITAS PRESS"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "Capstone Report Studio"
						})]
					})]
				}), /* @__PURE__ */ jsxs(Button, {
					onClick: startNew,
					className: "gap-2",
					children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), " New report"]
				})]
			})
		}), /* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-6xl px-5 py-14",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.28em] text-accent",
					children: "AI document engineering"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "rise-in mt-4 max-w-3xl font-display text-5xl leading-[0.95] tracking-wide text-foreground sm:text-7xl",
					children: "YOUR CAPSTONE REPORT, TYPESET AND WRITTEN."
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-5 max-w-2xl text-base text-muted-foreground",
					children: "Directly structured according to the official SIMATS Engineering capstone format. Enter your project details to draft an original, chapter-by-chapter capstone report and export it as an editable Word document with technical diagrams."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: /* @__PURE__ */ jsxs(Button, {
						size: "lg",
						onClick: startNew,
						className: "gap-2",
						children: ["Start a report ", /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-14 grid gap-4 sm:grid-cols-3",
					children: [
						{
							icon: Layers,
							title: "SIMATS Format-Faithful",
							body: "Official SIMATS Engineering logo on cover, invisible certificate tables, and IEEE heading hierarchy."
						},
						{
							icon: ShieldCheck,
							title: "4 AI Models & Figures",
							body: "3 parallel text models draft chapters concurrently, and a dedicated image AI model renders technical figures."
						},
						{
							icon: Download,
							title: "Individual .docx Reports",
							body: "Generates tailored reports for each team member (up to 5) with personalized 'Submitted by' & balanced roles."
						}
					].map((f) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-border bg-card p-5",
						children: [
							/* @__PURE__ */ jsx(f.icon, { className: "size-5 text-accent" }),
							/* @__PURE__ */ jsx("h2", {
								className: "mt-3 text-sm font-semibold text-foreground",
								children: f.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-muted-foreground",
								children: f.body
							})
						]
					}, f.title))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-16",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground",
						children: "Your drafts"
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-4 space-y-2",
						children: [drafts.length === 0 && /* @__PURE__ */ jsx("p", {
							className: "rounded-md border border-dashed border-border bg-card/60 p-8 text-center text-sm text-muted-foreground",
							children: "No drafts yet. Start a report to see it here."
						}), drafts.map((d) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between gap-4 rounded-md border border-border bg-card px-4 py-3",
							children: [/* @__PURE__ */ jsxs("button", {
								className: "min-w-0 flex-1 text-left",
								onClick: () => navigate({
									to: "/report/$id",
									params: { id: d.id }
								}),
								children: [/* @__PURE__ */ jsx("p", {
									className: "truncate text-sm font-medium text-foreground",
									children: d.academic.projectTitle || "Untitled capstone project"
								}), /* @__PURE__ */ jsxs("p", {
									className: "mt-0.5 font-mono text-[11px] text-muted-foreground",
									children: [
										"Step ",
										d.step,
										" of 6 · updated ",
										new Date(d.updatedAt).toLocaleString()
									]
								})]
							}), /* @__PURE__ */ jsx(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Delete draft",
								onClick: () => {
									deleteDraft(d.id);
									setDrafts(listDrafts());
								},
								children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
							})]
						}, d.id))]
					})]
				})
			]
		})]
	});
}
//#endregion
export { Dashboard as component };
