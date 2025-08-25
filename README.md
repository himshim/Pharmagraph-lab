# PharmaGraph Lab

Mock graphs for pharmaceutical analysis instruments — enter manual readings and generate clean, presentable charts.

## Quickstart
1. **GitHub Mobile** → New repository → name it `pharmagraph-lab`.
2. Create the folders and files shown above.
3. Commit.
4. **Vercel Deploy (free)**: vercel.com → New Project → Import your repo → Framework preset: **Vite** → Build: `npm run build` → Output: `dist` → Deploy.

## Add a new instrument
- Create `src/instruments/yourInstrument.ts` that exports a function returning `{ data, xLabel, yLabel, title }`.
- Add a button in `src/App.tsx` that calls your new function to load data/labels/title.

## License
MIT