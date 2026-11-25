import { useState } from "react";
import { Sparkles, ShieldCheck, Key, Cpu, Globe, Check, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface AiSettingsConfig {
  apiKey?: string;
  provider?: string;
  model?: string;
  baseUrl?: string;
}

interface AiSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentConfig: AiSettingsConfig;
  onSave: (config: AiSettingsConfig) => void;
  serverStatus?: {
    hasKey: boolean;
    provider: string;
    defaultModel: string;
    defaultBaseUrl?: string;
  } | null;
}

export function AiSettingsDialog({
  open,
  onOpenChange,
  currentConfig,
  onSave,
  serverStatus,
}: AiSettingsDialogProps) {
  const [provider, setProvider] = useState<string>(currentConfig.provider || "offline");
  const [apiKey, setApiKey] = useState<string>(currentConfig.apiKey || "");
  const [model, setModel] = useState<string>(currentConfig.model || "");
  const [baseUrl, setBaseUrl] = useState<string>(currentConfig.baseUrl || "");

  function handleProviderChange(val: string) {
    setProvider(val);
    if (val === "gemini" && !model) {
      setModel("gemini-2.5-flash");
    } else if (val === "groq" && !model) {
      setModel("llama-3.3-70b-versatile");
    } else if (val === "openai" && !model) {
      setModel("gpt-4o-mini");
    }
  }

  function handleSave() {
    onSave({
      provider,
      apiKey: provider === "offline" ? "" : apiKey.trim(),
      model: provider === "offline" ? "" : model.trim(),
      baseUrl: provider === "openai" ? baseUrl.trim() : undefined,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-display tracking-wide">
            <Sparkles className="size-5 text-accent" />
            AI Model &amp; Engine Settings
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            Choose whether to generate reports using Google Gemini, Groq, or OpenAI API, or use the 100% offline local engine. The local engine generates all 5 figures (SVG/Matplotlib), authentic references, and complete Appendices A–J without requiring an API key.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-sm">
          {/* Provider Selector */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Engine Provider</Label>
            <Select value={provider} onValueChange={handleProviderChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an AI engine..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="offline">
                  🟢 Smart Local Engine (100% Offline • No API Key)
                </SelectItem>
                <SelectItem value="gemini">
                  ✨ Google Gemini API (gemini-2.5-flash / gemini-1.5-flash)
                </SelectItem>
                <SelectItem value="groq">
                  ⚡ Groq Cloud (Ultra-Fast Llama 3.3 70B)
                </SelectItem>
                <SelectItem value="openai">
                  🌐 OpenAI / Custom Endpoint (GPT-4o, Ollama, LocalAI)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {provider === "offline" ? (
            <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3.5 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-4 shrink-0" />
                <span>Smart Local Deterministic Engine Active</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Generates high-density, domain-tailored capstone chapters, full high-resolution vector diagrams (Figure 3.1, 3.2, 4.1), scientific benchmark plots (Figure 4.2, 4.3), 14 authentic IEEE citations, and detailed Appendices A–J. Zero network quota or API key required.
              </p>
            </div>
          ) : (
            <>
              {/* API Key Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <Key className="size-3.5 text-muted-foreground" />
                    {provider === "gemini"
                      ? "Google Gemini API Key"
                      : provider === "groq"
                        ? "Groq API Key"
                        : "API Key"}
                  </Label>
                  {serverStatus?.hasKey && !apiKey && (
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                      (Server env key detected)
                    </span>
                  )}
                </div>
                <Input
                  type="password"
                  placeholder={
                    provider === "gemini"
                      ? "AIzaSy..."
                      : provider === "groq"
                        ? "gsk_..."
                        : "sk-..."
                  }
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="font-mono text-xs"
                />
                <p className="text-[11px] text-muted-foreground">
                  {provider === "gemini" ? (
                    <>
                      Get a free key from{" "}
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent underline"
                      >
                        Google AI Studio
                      </a>
                      .
                    </>
                  ) : provider === "groq" ? (
                    <>
                      Get a free ultra-fast key from{" "}
                      <a
                        href="https://console.groq.com/keys"
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent underline"
                      >
                        Groq Console
                      </a>
                      .
                    </>
                  ) : (
                    "Stored securely in local browser storage."
                  )}
                </p>
              </div>

              {/* Model Input */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  <Cpu className="size-3.5 text-muted-foreground" />
                  Model Identifier
                </Label>
                <Input
                  type="text"
                  placeholder={
                    provider === "gemini"
                      ? "gemini-2.5-flash"
                      : provider === "groq"
                        ? "llama-3.3-70b-versatile"
                        : "gpt-4o-mini"
                  }
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>

              {/* Base URL for OpenAI / Ollama */}
              {provider === "openai" && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <Globe className="size-3.5 text-muted-foreground" />
                    Base URL (Optional)
                  </Label>
                  <Input
                    type="text"
                    placeholder="https://api.openai.com/v1 or http://localhost:11434/v1"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    className="font-mono text-xs"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Leave blank for official OpenAI, or point to local Ollama / vLLM endpoint.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-xs">
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-1.5 text-xs">
            <Check className="size-3.5" /> Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
