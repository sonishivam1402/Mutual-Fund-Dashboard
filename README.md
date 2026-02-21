# Mutual Fund Dashboard

A professional mutual fund discovery and comparison platform with fund details, SIP calculator, and light/dark theme. Built with Next.js, React, and TypeScript.

**Live demo:** [https://mutual-funds-dashboard.vercel.app/](https://mutual-funds-dashboard.vercel.app/)

## Features

### Fund Discovery (`/discovery`)
- **Browse funds** with cards showing image, name, symbol, category, 1Y return, risk score, volatility, and AUM
- **Search & filter** by fund name or symbol; filter by category (pill buttons)
- **Select for comparison** – choose up to 3 funds via “Select to Compare” on each card
- **View Detail** – open a dedicated page for any fund
- **Compare Funds** – navigate to comparison only when 2+ funds are selected (prompt to “Select at least 2 funds” if only one is selected)
- **Unselect all** – clear all selected funds at once (button next to Compare Funds)
- **Selection bar** – shows count and names of selected funds, with Compare and Unselect all actions

### Fund Detail (`/fund/[id]`)
- **Header** with fund image, name, symbol, and category badge
- **Key metrics** – NAV, AUM, expense ratio, risk, volatility, manager, inception
- **Returns** – 1Y, 3Y, 5Y, 10Y with color-coded values
- **SIP Calculator (Returns Estimator)** – monthly amount (₹), duration (1–30 years) slider, expected return (8–30%) slider; outputs total invested, estimated returns, and maturity amount with a donut chart (purple/green) and “INVEST NOW” button
- **Asset allocation** – pie chart by sector
- **Top holdings** – list with name, symbol, and percentage

### Fund Comparison (`/comparison`)
- **Summary cards** for each selected fund (image, name, symbol, manager, inception)
- **Returns comparison** – line chart across 1Y, 3Y, 5Y, 10Y with theme-aligned colors
- **Asset allocation** – pie charts per fund
- **Detailed comparison table** – category, AUM, NAV, expense ratio, returns, risk score, volatility
- **Top holdings** – per fund with image and holding list

### Theme & UX
- **Light / dark theme** – toggle in the top-right (sun/moon). Preference stored in `localStorage`; default follows system or falls back to dark
- **Dark theme default** – charcoal background, purple accent, green for positive returns
- **Charts** – purple/blue/green palette; tooltips and axes styled for current theme
- **Pointer cursor** on buttons, links, and other interactive elements

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: shadcn/ui (Radix primitives), Tailwind CSS v4
- **State**: Zustand with `localStorage` persistence (selected funds + theme)
- **Charts**: Recharts (line, pie, donut)
- **Icons**: Lucide React

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   pnpm install
   ```

2. **Run the dev server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   pnpm dev
   ```

3. **Open in browser**  
   Go to `http://localhost:3000` – you’ll be redirected to `/discovery`.

## Project Structure

```
├── app/
│   ├── page.tsx              # Redirects to /discovery
│   ├── layout.tsx            # Root layout, theme script, ThemeProvider, ThemeToggle
│   ├── globals.css           # Theme variables (light/dark), base styles
│   ├── discovery/
│   │   └── page.tsx          # Fund list, filters, selection bar, Compare / Unselect all
│   ├── fund/
│   │   └── [id]/page.tsx     # Fund detail, metrics, returns, SIP calculator, allocation, holdings
│   └── comparison/
│       └── page.tsx          # Compare selected funds, charts, table, holdings
├── components/
│   ├── fund-card.tsx         # Fund card with image, metrics, View Detail & Select to Compare
│   ├── filter-bar.tsx        # Search input and category pills
│   ├── compare-chart.tsx     # Returns line chart
│   ├── compare-table.tsx     # Metrics comparison table
│   ├── allocation-chart.tsx  # Allocation pie chart
│   ├── theme-provider.tsx    # Theme context, localStorage, apply class to document
│   ├── theme-toggle.tsx      # Sun/moon toggle button
│   └── ui/                   # shadcn components (button, card, input, slider, etc.)
├── lib/
│   ├── store.ts              # Zustand store: selectedFunds, addFund, removeFund, clearSelected
│   ├── fund-utils.ts         # formatPercent, getReturnColor, getRiskBadgeColor, CHART_COLORS, etc.
│   └── utils.ts              # cn() and helpers
└── public/
    └── funds.json            # Fund data (id, name, symbol, image, category, metrics, allocation, holdings)
```

## Design System

- **Dark theme (default)**: Charcoal background, lighter cards, purple primary/accent, muted text; green for positive returns, red for negative
- **Light theme**: Light background and cards, purple primary, semantic borders and muted text
- **Charts**: Purple, blue, green, orange, teal (shared palette in `lib/fund-utils.ts`)
- **Risk badges**: Low (green), Moderate (blue), High (amber), Very High (red) with transparent backgrounds for dark mode
- **Responsive**: Stacked on mobile; side-by-side buttons and grids on larger breakpoints; rounded-2xl cards and consistent spacing

## Data

Fund data lives in `public/funds.json`. Each fund has:

- **Identity**: `id`, `name`, `symbol`, `image` (URL), `category`
- **Metrics**: `aum`, `nav`, `expenseRatio`, `returns` (oneYear, threeYear, fiveYear, tenYear), `riskScore`, `volatility`
- **Structure**: `allocation` (sector percentages), `holdings` (name, symbol, percentage)
- **Meta**: `inception`, `manager`

Sample funds include SBI Bluechip, Axis Midcap, Nippon India Small Cap, and others (structure supports any number of funds).

## State Management

- **Zustand** (`lib/store.ts`) with `persist`:
  - `selectedFunds` – up to 3 funds for comparison
  - `addFund` / `removeFund` / `clearSelected`
  - `canAddMore()` – true when fewer than 3 selected
- **Theme** – stored in `localStorage` under `mutual-fund-theme` (`"light"` | `"dark"`); applied via class on `<html>` and an inline script to avoid flash.

## License

MIT
