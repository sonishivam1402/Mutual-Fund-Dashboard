'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { AllocationChart } from '@/components/allocation-chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
  formatPercent,
  formatAUM,
  getReturnColor,
  getRiskBadgeColor,
  getRiskLabel,
  formatNumber,
} from '@/lib/fund-utils';
import { ArrowLeft, Calculator } from 'lucide-react';

function sipMaturity(monthlyInvestment: number, annualReturnPercent: number, years: number): number {
  const r = annualReturnPercent / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthlyInvestment * n;
  return monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

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

export default function FundDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [fund, setFund] = useState<Fund | null>(null);
  const [loading, setLoading] = useState(true);
  const [sipMonthly, setSipMonthly] = useState(1000);
  const [sipReturn, setSipReturn] = useState(10);
  const [sipYears, setSipYears] = useState(1);

  useEffect(() => {
    const fetchFund = async () => {
      try {
        const response = await fetch('/funds.json');
        const data = await response.json();
        const found = data.funds.find((f: Fund) => f.id === id);
        setFund(found ?? null);
      } catch (error) {
        console.error('Error fetching fund:', error);
        setFund(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchFund();
  }, [id]);

  useEffect(() => {
    if (fund) setSipReturn(Math.round(fund.returns.fiveYear * 2) / 2);
  }, [fund?.id]);

  const sipResult = useMemo(() => {
    if (!fund) return null;
    const totalInvested = sipMonthly * 12 * sipYears;
    const maturity = sipMaturity(sipMonthly, sipReturn, sipYears);
    const estimatedReturns = maturity - totalInvested;
    return { totalInvested, maturity, estimatedReturns };
  }, [fund, sipMonthly, sipReturn, sipYears]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!fund) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground tracking-tight mb-3">Fund not found</h1>
          <Link href="/discovery">
            <Button variant="outline" className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Discovery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Link href="/discovery" className="inline-block mb-6">
          <Button variant="ghost" size="sm" className="rounded-xl -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Discovery
          </Button>
        </Link>

        <div className="mb-8">
          <div className="flex items-start gap-4 flex-wrap">
            {fund.image && (
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-card border border-border shadow-sm shrink-0">
                <img
                  src={fund.image}
                  alt={fund.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">{fund.name}</h1>
              <p className="text-lg text-muted-foreground mt-1">{fund.symbol}</p>
              <Badge variant="secondary" className="mt-2 rounded-full">{fund.category}</Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="rounded-2xl border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="tracking-tight">Key metrics</CardTitle>
              <CardDescription>NAV, AUM, expense ratio, risk & volatility</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">NAV</p>
                <p className="text-lg font-semibold tabular-nums">₹{formatNumber(fund.nav, 2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">AUM</p>
                <p className="text-lg font-semibold tabular-nums">{formatAUM(fund.aum)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expense ratio</p>
                <p className="text-lg font-semibold tabular-nums">{formatPercent(fund.expenseRatio)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Risk</p>
                <Badge className={getRiskBadgeColor(fund.riskScore)}>
                  {getRiskLabel(fund.riskScore)} ({fund.riskScore}/10)
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Volatility</p>
                <p className="text-lg font-semibold tabular-nums">{formatPercent(fund.volatility)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Manager</p>
                <p className="text-sm font-medium">{fund.manager}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inception</p>
                <p className="text-sm font-medium tabular-nums">
                  {new Date(fund.inception).toLocaleDateString('en-US')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="tracking-tight">Returns</CardTitle>
              <CardDescription>Trailing returns by period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">1 Year</p>
                  <p className={`text-lg font-semibold tabular-nums ${getReturnColor(fund.returns.oneYear)}`}>
                    {fund.returns.oneYear >= 0 ? '+' : ''}{formatPercent(fund.returns.oneYear)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">3 Year</p>
                  <p className={`text-lg font-semibold tabular-nums ${getReturnColor(fund.returns.threeYear)}`}>
                    {fund.returns.threeYear >= 0 ? '+' : ''}{formatPercent(fund.returns.threeYear)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">5 Year</p>
                  <p className={`text-lg font-semibold tabular-nums ${getReturnColor(fund.returns.fiveYear)}`}>
                    {fund.returns.fiveYear >= 0 ? '+' : ''}{formatPercent(fund.returns.fiveYear)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">10 Year</p>
                  <p className={`text-lg font-semibold tabular-nums ${getReturnColor(fund.returns.tenYear)}`}>
                    {fund.returns.tenYear >= 0 ? '+' : ''}{formatPercent(fund.returns.tenYear)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SIP Calculator - Returns Estimator */}
          <Card className="rounded-2xl border border-border shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                {/* Left: Inputs */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Calculator className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground tracking-tight">Returns Estimator</h3>
                      <p className="text-sm text-muted-foreground">Estimation is based on the past performance</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sip-amount" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Enter Amount
                    </Label>
                    <div className="flex items-baseline rounded-xl border-2 border-border bg-background px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-colors">
                      <span className="text-xl text-muted-foreground align-top">₹</span>
                      <Input
                        id="sip-amount"
                        type="number"
                        min={500}
                        step={500}
                        value={sipMonthly}
                        onChange={(e) => setSipMonthly(Number(e.target.value) || 0)}
                        className="border-0 p-0 md:text-xl text-lg font-bold shadow-none focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label className="text-sm text-foreground">Select Duration</Label>
                      <span className="text-sm font-medium tabular-nums">{sipYears} Yr{sipYears !== 1 ? 's' : ''}</span>
                    </div>
                    <Slider
                      value={[sipYears]}
                      onValueChange={(v) => setSipYears(v[0] ?? 1)}
                      min={1}
                      max={30}
                      className="[&_[data-slot=slider-track]]:bg-muted [&_[data-slot=slider-range]]:bg-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 Yr</span>
                      <span>30 Yrs</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label className="text-sm text-foreground">Expected Rate of Return</Label>
                      <span className="text-sm font-medium tabular-nums">{sipReturn} %</span>
                    </div>
                    <Slider
                      value={[sipReturn]}
                      onValueChange={(v) => setSipReturn(v[0] ?? 8)}
                      min={8}
                      max={30}
                      className="[&_[data-slot=slider-track]]:bg-muted [&_[data-slot=slider-range]]:bg-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>8%</span>
                      <span>30%</span>
                    </div>
                  </div>
                </div>

                {/* Right: Results */}
                {sipResult && (
                  <div className="flex flex-col justify-between rounded-2xl bg-muted/50 border border-border p-6 lg:min-h-[320px]">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        The total value of your investment after <span className="font-semibold text-foreground">{sipYears} Year{sipYears !== 1 ? 's' : ''}</span> will be
                      </p>
                      <p className="text-3xl font-bold text-foreground tracking-tight mb-6 tabular-nums">
                        ₹ {Math.round(sipResult.maturity).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                      <div className="w-44 h-44 shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Invested', value: sipResult.totalInvested, fill: '#a855f7' },
                                { name: 'Returns', value: Math.max(0.01, sipResult.estimatedReturns), fill: '#22c55e' },
                              ]}
                              dataKey="value"
                              innerRadius={56}
                              outerRadius={72}
                              strokeWidth={0}
                              paddingAngle={0}
                            >
                              <Cell fill="#a855f7" />
                              <Cell fill="#22c55e" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3 flex-1 w-full sm:w-auto">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-1 rounded-full bg-orange-500 shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Invested Amount</p>
                            <p className="text-sm font-semibold tabular-nums">
                              ₹ {Math.round(sipResult.totalInvested).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-1 rounded-full bg-[#22c55e] shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Est. Returns</p>
                            <p className="text-sm font-semibold tabular-nums">
                              ₹ {Math.round(Math.max(0, sipResult.estimatedReturns)).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full font-medium py-6 rounded-xl" size="lg">
                      INVEST NOW
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <AllocationChart fundName={fund.name} allocation={fund.allocation} />

          <Card className="rounded-2xl border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="tracking-tight">Top holdings</CardTitle>
              <CardDescription>Largest positions in the fund</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {fund.holdings.slice(0, 10).map((holding, idx) => (
                  <li
                    key={`${holding.name}-${idx}`}
                    className="flex justify-between items-center py-2.5 border-b border-border/50 last:border-0 last:pb-0"
                  >
                    <span className="font-medium text-foreground">
                      {holding.name}
                      {holding.symbol && (
                        <span className="text-muted-foreground ml-1">({holding.symbol})</span>
                      )}
                    </span>
                    <span className="text-muted-foreground tabular-nums">{formatPercent(holding.percentage)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
