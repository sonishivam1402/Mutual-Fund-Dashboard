'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CompareChart } from '@/components/compare-chart';
import { CompareTable } from '@/components/compare-table';
import { AllocationChart } from '@/components/allocation-chart';
import { useFundStore } from '@/lib/store';
import { ArrowLeft } from 'lucide-react';

interface Fund {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  category: string;
  aum: number;
  nav: number;
  expenseRatio: number;
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
    tenYear: number;
  };
  riskScore: number;
  volatility: number;
  holdings: Array<{ name: string; symbol?: string; percentage: number }>;
  allocation: Record<string, number>;
  inception: string;
  manager: string;
}

export default function ComparisonPage() {
  const { selectedFunds } = useFundStore();

  if (selectedFunds.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-3">No Funds Selected</h1>
          <p className="text-muted-foreground mb-6">Select funds from the Discovery page to compare</p>
          <Link href="/discovery">
            <Button className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Discovery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const fundList = selectedFunds as Fund[];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Header */}
        <div className="mb-8">
          <Link href="/discovery" className="inline-block mb-4">
            <Button variant="outline" className="gap-2 rounded-xl">
              <ArrowLeft className="w-4 h-4" />
              Back to Discovery
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-2">Fund Comparison</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Comparing {fundList.length} fund{fundList.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Fund Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {fundList.map((fund) => (
            <div key={fund.id} className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                {fund.image && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
                    <img
                      src={fund.image}
                      alt={fund.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground tracking-tight mb-1">{fund.name}</h3>
                  <p className="text-sm text-muted-foreground">{fund.symbol}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Manager</span>
                  <span className="font-medium text-foreground">{fund.manager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Inception</span>
                  <span className="font-medium text-foreground tabular-nums">{new Date(fund.inception).getFullYear()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CompareChart funds={fundList} />
          {fundList.length === 1 && (
            <AllocationChart fundName={fundList[0].name} allocation={fundList[0].allocation} />
          )}
          {fundList.length > 1 && fundList[0] && (
            <AllocationChart fundName={fundList[0].name} allocation={fundList[0].allocation} />
          )}
        </div>

        {/* Allocation Charts for Multiple Funds */}
        {fundList.length > 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {fundList.slice(1).map((fund) => (
              <AllocationChart key={fund.id} fundName={fund.name} allocation={fund.allocation} />
            ))}
          </div>
        )}

        {/* Comparison Table */}
        <CompareTable funds={fundList} />

        {/* Top Holdings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {fundList.map((fund) => (
            <div key={`holdings-${fund.id}`} className="bg-card rounded-2xl shadow-sm border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                {fund.image && (
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
                    <img
                      src={fund.image}
                      alt={fund.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-foreground tracking-tight">{fund.name} – Top Holdings</h3>
              </div>
              <div className="space-y-3">
                {fund.holdings.slice(0, 5).map((holding, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-3 border-b border-border/50 last:border-0 last:pb-0">
                    <span className="text-sm text-foreground">
                      {holding.name}
                      {holding.symbol && <span className="text-xs text-muted-foreground ml-2">({holding.symbol})</span>}
                    </span>
                    <span className="text-sm font-semibold tabular-nums">{holding.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
