/**
 * Browser-side extraction of plain text from PDF / DOCX / TXT files.
 * Runs in the client so no file bytes ever leave the user's machine except the
 * text excerpt sent for structural analysis.
 */

export async function extractText(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) {
    const pdfjs = await import("pdfjs-dist");
    const workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url"))
      .default as string;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

    const buf = await file.arrayBuffer();
    const doc = await pdfjs.getDocument({ data: buf }).promise;
    const pages: string[] = [];
    const max = Math.min(doc.numPages, 50);
    for (let i = 1; i <= max; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      pages.push(
        content.items
          .map((it) => ("str" in it ? it.str : ""))
          .join(" ")
          .replace(/\s+/g, " "),
      );
    }
    return pages.join("\n\n");
  }

  if (name.endsWith(".docx")) {
    const mammoth = await import("mammoth/mammoth.browser.js");
    const buf = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buf });
    return result.value;
  }

  if (name.endsWith(".txt") || name.endsWith(".md")) {
    return await file.text();
  }

  throw new Error("Unsupported file type. Upload a PDF, DOCX, TXT or MD file.");
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
