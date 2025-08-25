import type { Preset } from "./types";

export function titrationCurve(): Preset {
  const data: { x: number; y: number }[] = [];
  for (let V = 0; V <= 50; V += 0.5) {
    const pH =
      3 + 4 / (1 + Math.exp(-(V - 20) / 1.5)) +
      5 / (1 + Math.exp(-(V - 30) / 1.5));
    const noise = (Math.random() - 0.5) * 0.05;
    data.push({ x: Number(V.toFixed(2)), y: Number((pH + noise).toFixed(2)) });
  }
  return { data, xLabel: "Volume base added (mL)", yLabel: "pH", title: "Titration Curve" };
}