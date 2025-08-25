import React, { useMemo } from "react";
import type { XY } from "../instruments/types";
import {
  ResponsiveContainer,
  LineChart, Line,
  AreaChart, Area,
  BarChart, Bar,
  ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine
} from "recharts";

const SKINS = {
  classic: { bg: "bg-white", text: "text-slate-900", grid: true, tick: 12, border: "border" },
  darklab: { bg: "bg-slate-900", text: "text-slate-100", grid: true, tick: 12, border: "border border-slate-700" },
  minimal: { bg: "bg-white", text: "text-slate-900", grid: false, tick: 12, border: "border" },
} as const;

function parseRatio(r: string): number | null {
  if (r === "auto") return null;
  const [w, h] = r.split(":").map(Number);
  if (!w || !h) return null;
  return w / h;
}

type Props = {
  data: XY[];
  xLabel: string;
  yLabel: string;
  title: string;
  meta: { instrument: string; method: string; sampleId: string; analyst: string; date: string };
  chartType: "line" | "area" | "bar" | "scatter";
  skin: keyof typeof SKINS;
  showLegend: boolean;
  showRefLine: boolean;
  refY: number;
  containerRef: React.RefObject<HTMLDivElement>;
  aspectRatio?: string; // "auto" | "16:9" | "4:3" | "1:1" | "3:2"
};

export default function ChartView(props: Props) {
  const {
    data, xLabel, yLabel, title, meta,
    chartType, skin, showLegend, showRefLine, refY,
    containerRef, aspectRatio = "auto"
  } = props;

  const sorted = useMemo(() => [...data].sort((a, b) => a.x - b.x), [data]);
  const S = SKINS[skin];
  const ratio = parseRatio(aspectRatio);

  const margin = { top: 10, right: 25, left: 10, bottom: 10 };

  const chartEl = useMemo(() => {
    if (chartType === "line") {
      return (
        <LineChart data={sorted} margin={margin}>
          {S.grid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis
            dataKey="x"
            label={{ value: xLabel, position: "insideBottom", offset: -5 }}
            tick={{ fontSize: S.tick }}
          />
          <YAxis
            label={{ value: yLabel, angle: -90, position: "insideLeft" }}
            tick={{ fontSize: S.tick }}
          />
          <Tooltip />
          {showLegend && <Legend />}
          {showRefLine && <ReferenceLine y={refY} strokeDasharray="6 3" />}
          <Line type="monotone" dataKey="y" dot={false} strokeWidth={2} />
        </LineChart>
      );
    }

    if (chartType === "area") {
      return (
        <AreaChart data={sorted} margin={margin}>
          {S.grid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis
            dataKey="x"
            label={{ value: xLabel, position: "insideBottom", offset: -5 }}
            tick={{ fontSize: S.tick }}
          />
          <YAxis
            label={{ value: yLabel, angle: -90, position: "insideLeft" }}
            tick={{ fontSize: S.tick }}
          />
          <Tooltip />
          {showLegend && <Legend />}
          {showRefLine && <ReferenceLine y={refY} strokeDasharray="6 3" />}
          <Area type="monotone" dataKey="y" strokeWidth={2} fillOpacity={0.2} />
        </AreaChart>
      );
    }

    if (chartType === "bar") {
      return (
        <BarChart data={sorted} margin={margin}>
          {S.grid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis
            dataKey="x"
            label={{ value: xLabel, position: "insideBottom", offset: -5 }}
            tick={{ fontSize: S.tick }}
          />
          <YAxis
            label={{ value: yLabel, angle: -90, position: "insideLeft" }}
            tick={{ fontSize: S.tick }}
          />
          <Tooltip />
          {showLegend && <Legend />}
          {showRefLine && <ReferenceLine y={refY} strokeDasharray="6 3" />}
          <Bar dataKey="y" />
        </BarChart>
      );
    }

    // scatter
    return (
      <ScatterChart margin={margin}>
        {S.grid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis
          dataKey="x"
          label={{ value: xLabel, position: "insideBottom", offset: -5 }}
          tick={{ fontSize: S.tick }}
        />
        <YAxis
          dataKey="y"
          label={{ value: yLabel, angle: -90, position: "insideLeft" }}
          tick={{ fontSize: S.tick }}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        {showLegend && <Legend />}
        {showRefLine && <ReferenceLine y={refY} strokeDasharray="6 3" />}
        <Scatter data={sorted} line lineType="fitting" />
      </ScatterChart>
    );
  }, [chartType, sorted, S.grid, S.tick, xLabel, yLabel, showLegend, showRefLine, refY]);

  return (
    <div className={`${S.bg} ${S.text} rounded-2xl shadow-xl ${S.border} p-4 w-full`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="text-lg md:text-xl font-semibold">{title}</div>
        <div className="text-xs md:text-sm opacity-80">
          <span className="mr-3">Instrument: {meta.instrument}</span>
          <span className="mr-3">Method: {meta.method}</span>
          <span className="mr-3">Sample ID: {meta.sampleId}</span>
          <span>Date: {meta.date}</span>
        </div>
      </div>

      {/* Chart area: fixed ratio when selected, else responsive heights */}
      <div className="mt-3">
        {ratio ? (
          <div style={{ position: "relative", width: "100%", paddingTop: `${100 / ratio}%` }}>
            <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                {chartEl}
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="h-[320px] sm:h-[420px] md:h-[520px]" ref={containerRef}>
            <ResponsiveContainer width="100%" height="100%">
              {chartEl}
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}