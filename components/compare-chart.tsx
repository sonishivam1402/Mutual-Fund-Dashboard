'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateChartData } from '@/lib/fund-utils';

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

const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export function CompareChart({ funds }: CompareChartProps) {
  const data = generateChartData(funds);

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle>Returns Comparison</CardTitle>
        <CardDescription>Annual returns across different periods</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
              }}
              formatter={(value) => `${value.toFixed(2)}%`}
            />
            <Legend />
            {funds.map((fund, idx) => (
              <Line
                key={fund.name}
                type="monotone"
                dataKey={fund.name}
                stroke={colors[idx % colors.length]}
                strokeWidth={2}
                dot={{ fill: colors[idx % colors.length], r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
