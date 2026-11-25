# Offline AI-like Assessment and Report Generator

This source version uses local rules, templates, supplied project data, and deterministic SVG figures. Core generation does not require Gemini, Groq, OpenRouter, or other hosted AI API keys. Read `LOCAL_ENGINE_MIGRATION.md` for scope, limitations, setup, and production notes.

# Capstone Report Builder

A React, TypeScript, and TanStack Start application for analyzing report templates and generating capstone report chapters.

## Requirements

- Node.js 20+ (use a current supported LTS release)
- npm

## Install and run

```sh
npm install
npm run dev
```

Vite prints the local URL when the development server starts.

## AI configuration

AI-powered analysis and chapter generation run on the server and require an OpenAI-compatible API provider. Set these environment variables in the server environment: 

- `AI_API_KEY` — secret API key for your provider
- `AI_BASE_URL` — optional API base URL; defaults to `https://api.openai.com/v1`
- `AI_MODEL` — optional model name; defaults to `gpt-4o-mini`

Do not put the API key in client-side code or commit it to source control. A `.env` file may be used locally if your runtime loads it; otherwise set the variables in the shell before starting the server.

## Build

```sh
npm run build
npm run preview
```


## Word count and topic-relevant figures

- The Word export reads the generated DOCX XML and retries with shorter report text until the exported document is below 6,500 words. If fixed front matter alone prevents the limit, export stops with an explicit error.
- Architecture diagrams, flowcharts, pipelines and graph figures use deterministic SVG diagrams rather than relying on an image model to draw labels.
- For suitable illustrative figures, the server searches Wikimedia Commons and only accepts results with license metadata and a close title-token match. The Word report includes image source and license/author attribution. This search requires an internet connection but no image API key.
- If no suitable licensed image is found, the existing configured image-generation fallback or local schematic fallback is used.
- Never distribute `.env`. Configure secrets only in local environment variables or the hosting provider's secret settings. `.env` is intentionally excluded from the supplied archive.
