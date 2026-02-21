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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">No Funds Selected</h1>
          <p className="text-slate-600 mb-6">Select funds from the Discovery page to compare</p>
          <Link href="/discovery">
            <Button className="bg-primary text-white hover:bg-primary/90">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/discovery" className="inline-block mb-4">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Discovery
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Fund Comparison</h1>
          <p className="text-lg text-slate-600">
            Comparing {fundList.length} fund{fundList.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Fund Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {fundList.map((fund) => (
            <div key={fund.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                {fund.image && (
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
                    <img
                      src={fund.image}
                      alt={fund.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{fund.name}</h3>
                  <p className="text-sm text-slate-600">{fund.symbol}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Manager</span>
                  <span className="font-medium text-slate-900">{fund.manager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Inception</span>
                  <span className="font-medium text-slate-900">{new Date(fund.inception).getFullYear()}</span>
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
            <div key={`holdings-${fund.id}`} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                {fund.image && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
                    <img
                      src={fund.image}
                      alt={fund.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-slate-900">{fund.name} - Top Holdings</h3>
              </div>
              <div className="space-y-3">
                {fund.holdings.slice(0, 5).map((holding, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-3 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-700">
                      {holding.name}
                      {holding.symbol && <span className="text-xs text-slate-500 ml-2">({holding.symbol})</span>}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">{holding.percentage}%</span>
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
