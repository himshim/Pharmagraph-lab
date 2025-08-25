import type { Preset } from "./types";
import { gauss } from "./utils";

export function hplcChromatogram(): Preset {
  const data: { x: number; y: number }[] = [];
  const peaks = [
    { mu: 1.2, sigma: 0.05, amp: 80 },
    { mu: 2.8, sigma: 0.08, amp: 120 },
    { mu: 4.5, sigma: 0.09, amp: 60 },
  ];
  for (let x = 0; x <= 6; x += 0.01) {
    const baseline = 2 + Math.random();
    const y = peaks.reduce((s, p) => s + gauss(x, p.mu, p.sigma, p.amp), baseline);
    data.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
  }
  return { data, xLabel: "Time (min)", yLabel: "Signal (mAU)", title: "HPLC Chromatogram" };
}