import type { Preset } from "./types";
import { gauss } from "./utils";

export function uvVisSpectrum(): Preset {
  const data: { x: number; y: number }[] = [];
  for (let x = 190; x <= 800; x += 2) {
    const band1 = gauss(x, 262, 18, 1);
    const band2 = gauss(x, 340, 25, 0.6);
    const noise = 0.005 * (Math.random() - 0.5);
    const y = Math.max(0, band1 + band2 + noise);
    data.push({ x, y: Number(y.toFixed(3)) });
  }
  return { data, xLabel: "Wavelength (nm)", yLabel: "Absorbance (AU)", title: "UV–Vis Spectrum" };
}