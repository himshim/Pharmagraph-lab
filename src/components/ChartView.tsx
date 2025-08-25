import React from "react";
import type { XY } from "../instruments/types";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts";

const SKINS = {
  classic: { bg: "bg-white", text: "text-slate-900", grid: true, tick: 12, border: "border" },
  darklab: { bg: "bg-slate-900", text: "text-slate-100", grid: true, tick: 12, border: "border border-slate-700" },
  minimal: { bg: "bg-white", text: "text-slate-900", grid: false, tick: 12, border: "border" },
} as const;

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
};

export default function ChartView(props: Props) {
  const { data, xLabel, yLabel, title, meta, chartType, skin, showLegend, showRefLine, refY, containerRef } = props;
  const sorted = [...data].sort((a, b) => a.x - b.x);
  const S = SKINS[skin];

  return (
    <div ref={containerRef} className={`${S.bg} ${S.text} rounded-2xl shadow-xl ${S.border} p-4 w-full`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="text-lg md:text-xl font-semibold">{title}</div>
        <div className="text-xs md:text-sm opacity-80">
          <span className="mr-3">Instrument: {meta.instrument}</span>
          <span className="mr-3">Method: {meta.method}</span>
          <span className="mr-3">Sample ID: {meta.sampleId}</span>
          <span>Date: {meta.date}</span>
        </div>
      </div>
      <div className="mt-3 h-[320px] sm:h-[420px] md:h-[520px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" && (
            <LineChart data={sorted} margin={{ top: 10, right: 25, left: 10, bottom: 10 }}>
              {S.grid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="x" label={{ value: xLabel, position: "insideBottom", offset: -5 }} tick={{ fontSize: S.tick }} />
              <YAxis label={{ value: yLabel, angle: -90, position: "insideLeft" }} tick={{ fontSize: S.tick }} />
              <Tooltip />
              {showLegend && <Legend />}
              {showRefLine && <ReferenceLine y={refY} strokeDasharray="6 3" />}
              <Line type="monotone" dataKey="y" dot={false} strokeWidth={2} />
            </LineChart>
          )}
          {chartType === "area" && (
            <AreaChart data={sorted} margin={{ top: 10, right: 25, left: 10, bottom: 10 }}>
              {S.grid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="x" label={{ value: xLabel, position: "insideBottom", offset: -5 }} tick={{ fontSize: S.tick }} />
              <YAxis label={{ value: yLabel, angle: -90, position: "insideLeft" }} tick={{ fontSize: S.tick }} />
              <Tooltip />
              {showLegend && <Legend />}
              {showRefLine && <ReferenceLine y={refY} strokeDasharray="6 3" />}
              <Area type="monotone" dataKey="y" strokeWidth={2} fillOpacity={0.2} />
            </AreaChart>
          )}
          {chartType === "bar" && (
            <BarChart data={sorted} margin={{ top: 10, right: 25, left: 10, bottom: 10 }}>
              {S.grid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="x" label={{ value: xLabel, position: "insideBottom", offset: -5 }} tick={{ fontSize: S.tick }} />
              <YAxis label={{ value: yLabel, angle: -90, position: "insideLeft" }} tick={{ fontSize: S.tick }} />
              <Tooltip />
              {showLegend && <Legend />}
              {showRefLine && <ReferenceLine y={refY} strokeDasharray="6 3" />}
              <Bar dataKey="y" />
            </BarChart>
          )}
          {chartType === "scatter" && (
            <ScatterChart margin={{ top: 10, right: 25, left: 10, bottom: 10 }}>
              {S.grid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="x" label={{ value: xLabel, position: "insideBottom", offset: -5 }} tick={{ fontSize: S.tick }} />
              <YAxis dataKey="y" label={{ value: yLabel, angle: -90, position: "insideLeft" }} tick={{ fontSize: S.tick }} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              {showLegend && <Legend />}
              {showRefLine && <ReferenceLine y={refY} strokeDasharray="6 3" />}
              <Scatter data={sorted} line lineType="fitting" />
            </ScatterChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}