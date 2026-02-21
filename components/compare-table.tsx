'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPercent, getReturnColor, getRiskBadgeColor, getRiskLabel, formatAUM, formatNumber } from '@/lib/fund-utils';

interface CompareTableProps {
  funds: Array<{
    name: string;
    symbol: string;
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
  }>;
}

export function CompareTable({ funds }: CompareTableProps) {
  return (
    <Card className="border-slate-200 overflow-hidden">
      <CardHeader>
        <CardTitle>Detailed Comparison</CardTitle>
        <CardDescription>Key metrics across selected funds</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200">
              <TableHead className="bg-slate-50">Metric</TableHead>
              {funds.map((fund) => (
                <TableHead key={fund.symbol} className="bg-slate-50 text-center">
                  <div className="font-semibold">{fund.name}</div>
                  <div className="text-xs text-slate-500">{fund.symbol}</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-slate-200">
              <TableCell className="font-medium text-slate-600">Category</TableCell>
              {funds.map((fund) => (
                <TableCell key={`${fund.symbol}-category`} className="text-center">
                  <Badge variant="outline">{fund.category}</Badge>
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="border-slate-200 bg-slate-50">
              <TableCell className="font-medium text-slate-600">AUM</TableCell>
              {funds.map((fund) => (
                <TableCell key={`${fund.symbol}-aum`} className="text-center text-sm">
                  {formatAUM(fund.aum)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="border-slate-200">
              <TableCell className="font-medium text-slate-600">NAV</TableCell>
              {funds.map((fund) => (
                <TableCell key={`${fund.symbol}-nav`} className="text-center text-sm">
                  ${formatNumber(fund.nav, 2)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="border-slate-200 bg-slate-50">
              <TableCell className="font-medium text-slate-600">Expense Ratio</TableCell>
              {funds.map((fund) => (
                <TableCell key={`${fund.symbol}-expense`} className="text-center text-sm">
                  {formatPercent(fund.expenseRatio)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="border-slate-200">
              <TableCell className="font-medium text-slate-600">1Y Return</TableCell>
              {funds.map((fund) => (
                <TableCell key={`${fund.symbol}-1y`} className={`text-center text-sm font-semibold ${getReturnColor(fund.returns.oneYear)}`}>
                  {fund.returns.oneYear >= 0 ? '+' : ''}{formatPercent(fund.returns.oneYear)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="border-slate-200 bg-slate-50">
              <TableCell className="font-medium text-slate-600">3Y Return</TableCell>
              {funds.map((fund) => (
                <TableCell key={`${fund.symbol}-3y`} className={`text-center text-sm font-semibold ${getReturnColor(fund.returns.threeYear)}`}>
                  {fund.returns.threeYear >= 0 ? '+' : ''}{formatPercent(fund.returns.threeYear)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="border-slate-200">
              <TableCell className="font-medium text-slate-600">5Y Return</TableCell>
              {funds.map((fund) => (
                <TableCell key={`${fund.symbol}-5y`} className={`text-center text-sm font-semibold ${getReturnColor(fund.returns.fiveYear)}`}>
                  {fund.returns.fiveYear >= 0 ? '+' : ''}{formatPercent(fund.returns.fiveYear)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="border-slate-200 bg-slate-50">
              <TableCell className="font-medium text-slate-600">10Y Return</TableCell>
              {funds.map((fund) => (
                <TableCell key={`${fund.symbol}-10y`} className={`text-center text-sm font-semibold ${getReturnColor(fund.returns.tenYear)}`}>
                  {fund.returns.tenYear >= 0 ? '+' : ''}{formatPercent(fund.returns.tenYear)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="border-slate-200">
              <TableCell className="font-medium text-slate-600">Risk Score</TableCell>
              {funds.map((fund) => (
                <TableCell key={`${fund.symbol}-risk`} className="text-center">
                  <Badge className={getRiskBadgeColor(fund.riskScore)}>
                    {getRiskLabel(fund.riskScore)}
                  </Badge>
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="border-slate-200 bg-slate-50">
              <TableCell className="font-medium text-slate-600">Volatility</TableCell>
              {funds.map((fund) => (
                <TableCell key={`${fund.symbol}-volatility`} className="text-center text-sm">
                  {formatPercent(fund.volatility)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
