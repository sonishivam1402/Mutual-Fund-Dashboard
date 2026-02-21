'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateChartData, CHART_COLORS } from '@/lib/fund-utils';

interface CompareChartProps {
  funds: Array<{
    name: string;
    returns: {
      oneYear: number;
      threeYear: number;
      fiveYear: number;
      tenYear: number;
    };
  }>;
}

export function CompareChart({ funds }: CompareChartProps) {
  const data = generateChartData(funds);

  return (
    <Card className="rounded-2xl border border-border shadow-sm">
      <CardHeader>
        <CardTitle>Returns Comparison</CardTitle>
        <CardDescription>Annual returns across different periods</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '0.75rem',
                color: '#f1f5f9',
              }}
              formatter={(value) => `${Number(value).toFixed(2)}%`}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {funds.map((fund, idx) => (
              <Line
                key={fund.name}
                type="monotone"
                dataKey={fund.name}
                stroke={CHART_COLORS[idx % CHART_COLORS.length]}
                strokeWidth={2.5}
                dot={{ fill: CHART_COLORS[idx % CHART_COLORS.length], r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
