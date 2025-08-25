import React from "react";
import { motion } from "framer-motion";

type Props = {
  chartType: string;
  setChartType: (v: string) => void;
  skin: string;
  setSkin: (v: string) => void;
  xLabel: string;
  setXLabel: (v: string) => void;
  yLabel: string;
  setYLabel: (v: string) => void;
  title: string;
  setTitle: (v: string) => void;
  showLegend: boolean;
  setShowLegend: (v: boolean) => void;
  showRefLine: boolean;
  setShowRefLine: (v: boolean) => void;
  refY: number;
  setRefY: (n: number) => void;
};

export default function ControlsPanel(props: Props) {
  const {
    chartType,
    setChartType,
    skin,
    setSkin,
    xLabel,
    setXLabel,
    yLabel,
    setYLabel,
    title,
    setTitle,
    showLegend,
    setShowLegend,
    showRefLine,
    setShowRefLine,
    refY,
    setRefY,
  } = props;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="p-4 rounded-2xl bg-white shadow border">
        <h3 className="font-semibold text-lg">Configure</h3>
        <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
          <label className="flex flex-col">Chart Type
            <select className="mt-1 p-2 border rounded" value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="line">Line</option>
              <option value="area">Area</option>
              <option value="bar">Bar</option>
              <option value="scatter">Scatter</option>
            </select>
          </label>
          <label className="flex flex-col">Skin
            <select className="mt-1 p-2 border rounded" value={skin} onChange={(e) => setSkin(e.target.value)}>
              <option value="classic">Classic</option>
              <option value="darklab">Dark Lab</option>
              <option value="minimal">Minimal</option>
            </select>
          </label>
          <label className="flex flex-col">X-axis Label
            <input className="mt-1 p-2 border rounded" value={xLabel} onChange={(e) => setXLabel(e.target.value)} />
          </label>
          <label className="flex flex-col">Y-axis Label
            <input className="mt-1 p-2 border rounded" value={yLabel} onChange={(e) => setYLabel(e.target.value)} />
          </label>
          <label className="flex flex-col col-span-2">Report Title
            <input className="mt-1 p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showLegend} onChange={(e) => setShowLegend(e.target.checked)} /> Show Legend
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showRefLine} onChange={(e) => setShowRefLine(e.target.checked)} /> Reference Line
          </label>
          {showRefLine && (
            <label className="flex flex-col col-span-2">Ref Y value
              <input type="number" className="mt-1 p-2 border rounded" value={refY} onChange={(e) => setRefY(Number(e.target.value))} />
            </label>
          )}
        </div>
      </div>
    </motion.div>
  );
}