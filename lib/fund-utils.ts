/** Theme chart palette: purple (primary), blue, green, orange, teal - matches dark theme */
export const CHART_COLORS = ['#a855f7', '#3b82f6', '#22c55e', '#f59e0b', '#14b8a6', '#8b5cf6', '#06b6d4'];

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

export const getReturnColor = (value: number): string => {
  if (value >= 15) return 'text-emerald-400';
  if (value >= 10) return 'text-green-400';
  if (value >= 5) return 'text-blue-400';
  if (value >= 0) return 'text-muted-foreground';
  return 'text-red-400';
};

export const getRiskColor = (score: number): string => {
  if (score <= 3) return 'text-emerald-400';
  if (score <= 5) return 'text-blue-400';
  if (score <= 7) return 'text-amber-400';
  return 'text-red-400';
};

export const getRiskBadgeColor = (score: number): string => {
  if (score <= 3) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  if (score <= 5) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  if (score <= 7) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  return 'bg-red-500/20 text-red-400 border-red-500/30';
};

export const getRiskLabel = (score: number): string => {
  if (score <= 3) return 'Low';
  if (score <= 5) return 'Moderate';
  if (score <= 7) return 'High';
  return 'Very High';
};

export const formatAUM = (value: number): string => {
  const billions = value / 1000000000;
  if (billions >= 1) {
    return `₹${billions.toFixed(1)}B`;
  }
  const millions = value / 1000000;
  return `₹${millions.toFixed(1)}M`;
};

export const generateChartData = (funds: Array<{ name: string; returns: { oneYear: number; threeYear: number; fiveYear: number; tenYear: number } }>) => {
  const periods = ['1Y', '3Y', '5Y', '10Y'];
  return periods.map((period, idx) => {
    const data: Record<string, string | number> = { period };
    const keys = ['oneYear', 'threeYear', 'fiveYear', 'tenYear'] as const;
    funds.forEach((fund) => {
      data[fund.name] = fund.returns[keys[idx]];
    });
    return data;
  });
};

export const generateAllocationChart = (allocation: Record<string, number>) => {
  return Object.entries(allocation).map(([name, value]) => ({
    name,
    value,
  }));
};
