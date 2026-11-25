# Dual-Engine Architecture — Migration & Feature Guide

This application provides dual-engine report generation:
1. **Live Cloud AI Mode**: Supports Google Gemini API, Groq Cloud API, and OpenAI/Custom endpoints. Configurable via `.env` or in-app AI settings.
2. **Smart Local Engine (Offline Mode)**: Works 100% offline without needing any AI API keys or internet connection. Generates high-density academic content, all 5 technical figures (SVG), 14 authentic IEEE citations, and complete Appendices A–J.

## Issues Resolved in this Version

- **AI Engine Support**: Added support for Google Gemini API (`GEMINI_API_KEY`), Groq Cloud (`GROQ_API_KEY`), and OpenAI (`OPENAI_API_KEY`). Added in-app AI Configuration modal to switch providers, set API keys, and test models.
- **Figure / Image Generation**: Fixed missing `{ type: "figure" }` blocks in Chapters 3 & 4. All 5 figures now generate with full high-resolution vector graphics (SVG) and embed into DOCX and browser preview:
  - Figure 3.1: System Architecture Diagram (SVG)
  - Figure 3.2: Operational Flowchart and Data Processing Pipeline (SVG)
  - Figure 4.1: Implementation Architecture and Integration Diagram (SVG)
  - Figure 4.2: Experimental Results and Performance Benchmark Curves (SVG / Matplotlib)
  - Figure 4.3: Latency and Throughput Evaluation Under Operational Load (SVG / Matplotlib)
- **References Generation**: Replaced disclaimer bullets with 14 authentic, domain-tailored IEEE citations formatted according to standard IEEE publication criteria.
- **Appendices Generation**: Replaced single-line placeholders with complete, detailed technical content for all 10 appendices (Appendix A through J), including mathematical formulas, system topology descriptions, simulation parameter grids, pseudocode, component datasheets, test observation logs, SUS usability surveys, IEEE/ISO standards, cost tables, and individual contribution evidence with actual student names.
- **Section Heading Cleanup**: Stripped raw outline instructions and prompt directives from headings, producing clean academic headings across all chapters.

## Local Development

```sh
npm install
npm run dev
```

Build for production:
```sh
npm run build
npm run preview
```
