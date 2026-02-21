'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateAllocationChart, CHART_COLORS } from '@/lib/fund-utils';

interface AllocationChartProps {
  fundName: string;
  allocation: Record<string, number>;
}

export function AllocationChart({ fundName, allocation }: AllocationChartProps) {
  const data = generateAllocationChart(allocation);

  return (
    <Card className="rounded-2xl border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg tracking-tight">{fundName}</CardTitle>
        <CardDescription>Asset allocation breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill={CHART_COLORS[0]}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '0.75rem',
                color: '#f1f5f9',
              }}
              formatter={(value) => `${value}%`}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
