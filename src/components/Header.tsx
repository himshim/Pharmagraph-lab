import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 w-full bg-slate-900 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold tracking-wide">
          PharmaGraph Lab
        </h1>
        <nav className="flex gap-4 text-sm sm:text-base">
          <a
            href="https://github.com/himshim/Pharmagraph-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Repo
          </a>
          <a
            href="https://github.com/himshim"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Developer
          </a>
        </nav>
      </div>
    </header>
  );
}