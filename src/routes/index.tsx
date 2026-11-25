import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, Plus, Trash2, ArrowRight, Layers, ShieldCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createDraft, deleteDraft, listDrafts } from "@/lib/report-store";
import type { ReportDraft } from "@/lib/report-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Capstone Report Generator — Veritas Press" },
      {
        name: "description",
        content:
          "Generate a formatted, editable Capstone Project Report in Word from your project details using standard SIMATS structure.",
      },
      { property: "og:title", content: "Capstone Report Generator" },
      {
        property: "og:description",
        content:
          "Enter your project details and export a complete IEEE-styled SIMATS capstone report as .docx.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState<ReportDraft[]>([]);

  useEffect(() => {
    setDrafts(listDrafts());
  }, []);

  function startNew() {
    const draft = createDraft();
    navigate({ to: "/report/$id", params: { id: draft.id } });
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="chrome flex size-9 items-center justify-center rounded-sm">
              <FileText className="size-4 text-background" />
            </div>
            <div className="leading-none">
              <p className="font-display text-lg tracking-wide text-foreground">
                VERITAS PRESS
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Capstone Report Studio
              </p>
            </div>
          </div>
          <Button onClick={startNew} className="gap-2">
            <Plus className="size-4" /> New report
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          AI document engineering
        </p>
        <h1 className="rise-in mt-4 max-w-3xl font-display text-5xl leading-[0.95] tracking-wide text-foreground sm:text-7xl">
          YOUR CAPSTONE REPORT, TYPESET AND WRITTEN.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground">
          Directly structured according to the official SIMATS Engineering capstone format.
          Enter your project details to draft an original, chapter-by-chapter capstone report
          and export it as an editable Word document with technical diagrams.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" onClick={startNew} className="gap-2">
            Start a report <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Layers,
              title: "SIMATS Format-Faithful",
              body: "Official SIMATS Engineering logo on cover, invisible certificate tables, and IEEE heading hierarchy.",
            },
            {
              icon: ShieldCheck,
              title: "4 AI Models & Figures",
              body: "3 parallel text models draft chapters concurrently, and a dedicated image AI model renders technical figures.",
            },
            {
              icon: Download,
              title: "Individual .docx Reports",
              body: "Generates tailored reports for each team member (up to 5) with personalized 'Submitted by' & balanced roles.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-md border border-border bg-card p-5">
              <f.icon className="size-5 text-accent" />
              <h2 className="mt-3 text-sm font-semibold text-foreground">{f.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Your drafts
          </h2>
          <div className="mt-4 space-y-2">
            {drafts.length === 0 && (
              <p className="rounded-md border border-dashed border-border bg-card/60 p-8 text-center text-sm text-muted-foreground">
                No drafts yet. Start a report to see it here.
              </p>
            )}
            {drafts.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between gap-4 rounded-md border border-border bg-card px-4 py-3"
              >
                <button
                  className="min-w-0 flex-1 text-left"
                  onClick={() => navigate({ to: "/report/$id", params: { id: d.id } })}
                >
                  <p className="truncate text-sm font-medium text-foreground">
                    {d.academic.projectTitle || "Untitled capstone project"}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    Step {d.step} of 6 · updated {new Date(d.updatedAt).toLocaleString()}
                  </p>
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Delete draft"
                  onClick={() => {
                    deleteDraft(d.id);
                    setDrafts(listDrafts());
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
