import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { XY } from "./instruments/types";
import { hplcChromatogram } from "./instruments/hplc";
import { uvVisSpectrum } from "./instruments/uvvis";
import { titrationCurve } from "./instruments/titration";
import { dissolutionProfile } from "./instruments/dissolution";
import { parseCSV } from "./lib/csv";
import { exportNodePNG } from "./lib/export";
import ChartView from "./components/ChartView";
import ControlsPanel from "./components/ControlsPanel";
import DataEntryTable from "./components/DataEntryTable";
import ThemeToggle from "./components/ThemeToggle";
import Header from "./components/Header";

type Theme = "system" | "light" | "dark";

export default function App() {
  const [data, setData] = useState<XY[]>([
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 4 },
  ]);
  const [chartType, setChartType] = useState<"line" | "area" | "bar" | "scatter">("line");
  const [xLabel, setXLabel] = useState("X");
  const [yLabel, setYLabel] = useState("Y");
  const [title, setTitle] = useState("Mock Instrument Report");
  const [skin, setSkin] = useState<"classic" | "darklab" | "minimal">("classic");
  const [showLegend, setShowLegend] = useState(false);
  const [showRefLine, setShowRefLine] = useState(false);
  const [refY, setRefY] = useState(50);
  const [pasteText, setPasteText] = useState("");
  const [meta, setMeta] = useState({
    instrument: "Generic Analyzer",
    method: "Method-001",
    sampleId: "S-001",
    analyst: "",
    date: new Date().toLocaleString(),
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("pharmagraph-theme") as Theme | null;
    return saved ?? "system";
  });

  const [aspectRatio, setAspectRatio] = useState<string>("auto");

  const [includeTitle, setIncludeTitle] = useState(true);
  const [includeInstrument, setIncludeInstrument] = useState(true);
  const [includeMethod, setIncludeMethod] = useState(true);
  const [includeSampleId, setIncludeSampleId] = useState(true);
  const [includeAnalyst, setIncludeAnalyst] = useState(true);
  const [includeDate, setIncludeDate] = useState(true);

  const exportRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(() => [...data].sort((a, b) => a.x - b.x), [data]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
  }, [theme]);

  function loadPreset(kind: string) {
    if (kind === "hplc") {
      const p = hplcChromatogram();
      setData(p.data);
      setXLabel(p.xLabel);
      setYLabel(p.yLabel);
      setTitle(p.title);
      setMeta((m) => ({ ...m, instrument: "HPLC" }));
    } else if (kind === "uvvis") {
      const p = uvVisSpectrum();
      setData(p.data);
      setXLabel(p.xLabel);
      setYLabel(p.yLabel);
      setTitle(p.title);
      setMeta((m) => ({ ...m, instrument: "UV–Vis" }));
    } else if (kind === "titration") {
      const p = titrationCurve();
      setData(p.data);
      setXLabel(p.xLabel);
      setYLabel(p.yLabel);
      setTitle(p.title);
      setMeta((m) => ({ ...m, instrument: "Titration" }));
    } else if (kind === "dissolution") {
      const p = dissolutionProfile();
      setData(p.data);
      setXLabel(p.xLabel);
      setYLabel(p.yLabel);
      setTitle(p.title);
      setMeta((m) => ({ ...m, instrument: "Dissolution" }));
    }
  }

  function handlePaste() {
    const parsed = parseCSV(pasteText);
    if (parsed.length) setData(parsed);
  }

  const pageBg =
    theme === "dark"
      ? "bg-slate-950 text-slate-100"
      : "bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900";

  return (
    <div className={`min-h-screen w-full ${pageBg}`}>
      <Header />

      <main className="p-3 sm:p-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left controls */}
          <div className="lg:col-span-4 space-y-4">
            <ThemeToggle theme={theme} setTheme={setTheme} />

            <ControlsPanel
              chartType={chartType}
              setChartType={(v) => setChartType(v as any)}
              skin={skin}
              setSkin={(v) => setSkin(v as any)}
              xLabel={xLabel}
              setXLabel={setXLabel}
              yLabel={yLabel}
              setYLabel={setYLabel}
              title={title}
              setTitle={setTitle}
              showLegend={showLegend}
              setShowLegend={setShowLegend}
              showRefLine={showRefLine}
              setShowRefLine={setShowRefLine}
              refY={refY}
              setRefY={setRefY}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
            />

            {/* Report meta & presets */}
            <div className="panel space-y-3 p-4">
              <h3 className="heading">Report Meta</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <label className="flex flex-col">
                  Instrument
                  <input
                    className="mt-1 p-2 border rounded bg-transparent"
                    value={meta.instrument}
                    onChange={(e) => setMeta({ ...meta, instrument: e.target.value })}
                  />
                </label>
                <label className="flex flex-col">
                  Method
                  <input
                    className="mt-1 p-2 border rounded bg-transparent"
                    value={meta.method}
                    onChange={(e) => setMeta({ ...meta, method: e.target.value })}
                  />
                </label>
                <label className="flex flex-col">
                  Sample ID
                  <input
                    className="mt-1 p-2 border rounded bg-transparent"
                    value={meta.sampleId}
                    onChange={(e) => setMeta({ ...meta, sampleId: e.target.value })}
                  />
                </label>
                <label className="flex flex-col">
                  Analyst
                  <input
                    className="mt-1 p-2 border rounded bg-transparent"
                    value={meta.analyst}
                    onChange={(e) => setMeta({ ...meta, analyst: e.target.value })}
                  />
                </label>
                <label className="flex flex-col col-span-2">
                  Date
                  <input
                    className="mt-1 p-2 border rounded bg-transparent"
                    value={meta.date}
                    onChange={(e) => setMeta({ ...meta, date: e.target.value })}
                    placeholder="e.g., 2025-08-25 14:05"
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="btn btn-outline" onClick={() => loadPreset("hplc")}>
                  HPLC Chromatogram
                </button>
                <button className="btn btn-outline" onClick={() => loadPreset("uvvis")}>
                  UV–Vis Spectrum
                </button>
                <button className="btn btn-outline" onClick={() => loadPreset("titration")}>
                  Titration Curve
                </button>
                <button className="btn btn-outline" onClick={() => loadPreset("dissolution")}>
                  Dissolution Profile
                </button>
              </div>
            </div>

            {/* Export display toggles */}
            <div className="panel space-y-2 p-4">
              <h3 className="heading">Export Display</h3>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={includeTitle} onChange={(e) => setIncludeTitle(e.target.checked)} />
                Include Title
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={includeInstrument} onChange={(e) => setIncludeInstrument(e.target.checked)} />
                  Instrument
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={includeMethod} onChange={(e) => setIncludeMethod(e.target.checked)} />
                  Method
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={includeSampleId} onChange={(e) => setIncludeSampleId(e.target.checked)} />
                  Sample ID
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={includeAnalyst} onChange={(e) => setIncludeAnalyst(e.target.checked)} />
                  Analyst
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={includeDate} onChange={(e) => setIncludeDate(e.target.checked)} />
                  Date
                </label>
              </div>
              <p className="text-xs opacity-70">
                These options control what appears above the chart and in the exported PNG.
              </p>
            </div>

            {/* Data entry */}
            <DataEntryTable data={data} setData={setData} />

            {/* Paste CSV */}
            <div className="panel space-y-2 p-4">
              <h3 className="heading">Paste CSV/TSV</h3>
              <textarea
                rows={6}
                className="w-full p-2 border rounded bg-transparent"
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={`0, 10\n1, 15\n2, 23`}
              />
              <div className="flex gap-2">
                <button className="btn btn-primary" onClick={handlePaste}>
                  Parse & Load
                </button>
                <button className="btn btn-outline" onClick={() => setPasteText("")}>
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right chart */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8 space-y-4">
            <div className="panel p-4 flex items-center justify-between">
              <h3 className="heading">Preview & Export</h3>
              <div className="flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => exportNodePNG(exportRef.current!, `${title.replace(/\s+/g, "_")}.png`)}
                >
                  Export PNG
                </button>
              </div>
            </div>

            <ChartView
              data={sorted}
              xLabel={xLabel}
              yLabel={yLabel}
              title={title}
              meta={meta}
              chartType={chartType}
              skin={skin}
              showLegend={showLegend}
              showRefLine={showRefLine}
              refY={refY}
              exportRef={exportRef}
              aspectRatio={aspectRatio}
              includeTitle={includeTitle}
              includeInstrument={includeInstrument}
              includeMethod={includeMethod}
              includeSampleId={includeSampleId}
              includeAnalyst={includeAnalyst}
              includeDate={includeDate}
            />

            <div className="text-xs opacity-70 p-2 text-center">
              Responsive • Desktop & Mobile • Open Source
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}