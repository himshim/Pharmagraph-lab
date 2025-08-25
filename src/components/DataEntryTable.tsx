import React from "react";
import type { XY } from "../instruments/types";

type Props = {
  data: XY[];
  setData: (d: XY[]) => void;
};

export default function DataEntryTable({ data, setData }: Props) {
  function addRow() {
    setData([...data, { x: data.length ? data[data.length - 1].x + 1 : 0, y: 0 }]);
  }
  function removeRow(i: number) {
    setData(data.filter((_, idx) => idx !== i));
  }
  function updateCell(i: number, key: keyof XY, value: string) {
    const n = Number(value);
    setData(data.map((r, idx) => (idx === i ? { ...r, [key]: n } : r)));
  }

  return (
    <div className="p-4 rounded-2xl bg-white shadow border">
      <h3 className="font-semibold text-lg mb-3">Data Entry</h3>
      <div className="max-h-64 overflow-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 sticky top-0">
            <tr>
              <th className="text-left p-2 w-1/3">X</th>
              <th className="text-left p-2 w-1/3">Y</th>
              <th className="p-2 w-1/3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2"><input type="number" className="p-2 border rounded w-full" value={row.x} onChange={(e) => updateCell(idx, "x", e.target.value)} /></td>
                <td className="p-2"><input type="number" className="p-2 border rounded w-full" value={row.y} onChange={(e) => updateCell(idx, "y", e.target.value)} /></td>
                <td className="p-2 text-center">
                  <button className="px-3 py-1 border rounded hover:bg-slate-50" onClick={() => removeRow(idx)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mt-2">
        <button className="px-3 py-2 rounded bg-slate-900 text-white" onClick={addRow}>Add Row</button>
        <button className="px-3 py-2 rounded border" onClick={() => setData([])}>Clear</button>
      </div>
    </div>
  );
}