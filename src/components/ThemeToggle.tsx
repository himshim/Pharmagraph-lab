import React, { useEffect } from "react";

type Theme = "system" | "light" | "dark";

export default function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  // Apply theme to <html data-theme="...">
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
    localStorage.setItem("pharmagraph-theme", theme);
  }, [theme]);

  return (
    <div className="panel p-3 flex items-center justify-between">
      <span className="heading">Page Theme</span>
      <select
        className="border rounded px-2 py-1"
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        aria-label="Select page theme"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}