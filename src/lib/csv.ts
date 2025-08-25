import type { XY } from "../instruments/types";

export function parseCSV(text: string): XY[] {
  const rows = text
    .trim()
    .split(/\r?\n/)
    .map((r) => r.trim())
    .filter(Boolean);

  const out: XY[] = [];
  for (const row of rows) {
    const parts = row.split(/\t|,|;|\s{2,}/).map((p) => p.trim());
    if (parts.length >= 2) {
      const x = Number(parts[0]);
      const y = Number(parts[1]);
      if (!Number.isNaN(x) && !Number.isNaN(y)) out.push({ x, y });
    }
  }
  return out;
}