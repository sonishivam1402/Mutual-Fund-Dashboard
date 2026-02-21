# Mutual Fund Dashboard

A professional fintech mutual fund discovery and comparison platform built with Next.js, React, and TypeScript.

## Features

### Fund Discovery Page (`/discovery`)
- **Browse Funds**: Discover 6+ mutual funds with detailed metrics
- **Search & Filter**: Search by fund name or symbol, filter by category
- **Quick Selection**: Select up to 3 funds for comparison
- **Key Metrics Display**: 1-year returns, risk score, volatility, and AUM at a glance
- **Real-time Status**: See selected funds and navigate to comparison with a single click

### Fund Comparison Page (`/comparison`)
- **Multi-Fund Comparison**: Compare 1-3 funds side-by-side
- **Performance Charts**: Line chart showing returns across 1Y, 3Y, 5Y, and 10Y periods
- **Asset Allocation**: Pie charts showing fund allocation breakdown
- **Comprehensive Table**: Detailed metrics comparison including:
  - Fund information (AUM, NAV, expense ratio)
  - Historical returns (1Y, 3Y, 5Y, 10Y)
  - Risk metrics (risk score, volatility)
- **Top Holdings**: View the top 5 holdings for each fund

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **State Management**: Zustand with localStorage persistence
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Run Development Server**
   ```bash
   pnpm dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000` - you'll be automatically redirected to the discovery page

## Project Structure

```
├── app/
│   ├── discovery/page.tsx      # Fund discovery and browsing
│   ├── comparison/page.tsx     # Fund comparison interface
│   ├── page.tsx                # Redirect to discovery
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles & design tokens
├── components/
│   ├── fund-card.tsx           # Individual fund card with selection
│   ├── filter-bar.tsx          # Search and category filters
│   ├── compare-chart.tsx       # Performance line chart
│   ├── compare-table.tsx       # Detailed comparison table
│   └── allocation-chart.tsx    # Asset allocation pie chart
├── lib/
│   ├── store.ts                # Zustand store for fund selection
│   ├── fund-utils.ts           # Formatting and calculation utilities
│   └── utils.ts                # General utilities
└── public/
    └── funds.json              # Mock fund data
```

## Design System

### Color Palette
- **Primary**: Deep Blue (#3B5DE8) - Primary actions and highlights
- **Accent**: Teal (#40B4B4) - Secondary accents
- **Neutral**: Gray scale - Text, borders, backgrounds
- **Success**: Green - Positive returns
- **Danger**: Red - Negative returns/risk

### Key Design Features
- **Fintech Aesthetic**: Clean, professional interface with soft shadows
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Color-Coded Returns**: Visual indicators for performance metrics
- **Risk Badges**: Color-coded risk indicators (Low, Moderate, High, Very High)
- **Smooth Transitions**: Polished interactions and hover states

## Data

Fund data is stored in `public/funds.json` with 6 sample funds:
1. Vanguard Large-Cap Growth (VLCGX)
2. Fidelity Mid Cap Growth (FMCGX)
3. Schwab U.S. Small-Cap Index (SWTSX)
4. T. Rowe Price New America Growth (PRWAX)
5. Vanguard Dividend Appreciation Index (VIG)
6. PIMCO Total Return Fund (PTTRX)

Each fund includes:
- Basic info (name, symbol, category)
- Performance metrics (1Y, 3Y, 5Y, 10Y returns)
- Risk assessment (risk score, volatility)
- Asset allocation
- Top holdings
- Fund manager info

## State Management

Uses Zustand for persistent fund selection:
- **Max 3 Funds**: Can select up to 3 funds for comparison
- **LocalStorage**: Selection persists across sessions
- **Immediate Updates**: Real-time UI updates on selection/deselection

## Future Enhancements

- Fetch real fund data from an API
- User authentication for saving comparisons
- Portfolio allocation recommendations
- Risk analysis tools
- Historical performance tracking
- Fund rating and reviews system
- Export comparison reports

## License

MIT
