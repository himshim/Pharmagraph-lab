import type { Preset } from "./types";

export function dissolutionProfile(): Preset {
  const data: { x: number; y: number }[] = [];
  for (let t = 0; t <= 120; t += 5) {
    const y = 100 * (1 - Math.exp(-t / 35)) + (Math.random() - 0.5) * 2;
    data.push({ x: t, y: Number(Math.max(0, Math.min(100, y)).toFixed(1)) });
  }
  return { data, xLabel: "Time (min)", yLabel: "% Release", title: "Dissolution Profile" };
}