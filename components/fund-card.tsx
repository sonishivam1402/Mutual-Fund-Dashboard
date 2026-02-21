'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPercent, getReturnColor, getRiskBadgeColor, getRiskLabel, formatAUM } from '@/lib/fund-utils';
import { useFundStore } from '@/lib/store';
import { Check, ExternalLink } from 'lucide-react';

interface FundCardProps {
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

export function FundCard({
  id,
  name,
  symbol,
  image,
  category,
  aum,
  nav,
  expenseRatio,
  returns,
  riskScore,
  volatility,
  holdings,
  allocation,
  inception,
  manager,
}: FundCardProps) {
  const { selectedFunds, addFund, removeFund, canAddMore } = useFundStore();
  const isSelected = selectedFunds.some(f => f.id === id);

  const handleToggleSelect = () => {
    if (isSelected) {
      removeFund(id);
    } else if (canAddMore()) {
      addFund({
        id,
        name,
        symbol,
        image,
        category,
        aum,
        nav,
        expenseRatio,
        returns,
        riskScore,
        volatility,
        holdings,
        allocation,
        inception,
        manager,
      });
    }
  };

  return (
    <Card className="group rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          {image && (
            <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-muted border border-border">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold tracking-tight">{name}</CardTitle>
            <CardDescription className="text-sm">{symbol}</CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs shrink-0 rounded-full font-medium">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">1Y Return</span>
            <span className={`text-sm font-semibold tabular-nums ${getReturnColor(returns.oneYear)}`}>
              {returns.oneYear >= 0 ? '+' : ''}{formatPercent(returns.oneYear)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Risk Score</span>
            <Badge className={getRiskBadgeColor(riskScore)}>
              {getRiskLabel(riskScore)} ({riskScore}/10)
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Volatility</span>
            <span className="text-sm font-medium tabular-nums">{formatPercent(volatility)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">AUM</span>
            <span className="text-sm font-medium tabular-nums">{formatAUM(aum)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button variant="outline" className="w-full sm:flex-1 rounded-xl" asChild>
            <Link href={`/fund/${id}`} className="flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Detail
            </Link>
          </Button>
          <Button
            onClick={handleToggleSelect}
            className={`w-full sm:flex-1 rounded-xl transition-all ${
              isSelected
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
            disabled={!isSelected && !canAddMore()}
          >
            {isSelected ? (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Selected
              </span>
            ) : (
              'Select to Compare'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
