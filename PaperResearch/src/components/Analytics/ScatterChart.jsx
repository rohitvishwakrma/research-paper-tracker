import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Legend,
} from 'recharts';
import { IMPACT_COLORS } from '../../utils/constants';

const ScatterChartComponent = ({ data }) => {
  const impactGroups = ['High Impact', 'Medium Impact', 'Low Impact', 'Unknown'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow border">
          <p className="font-semibold">{p.title}</p>
          <p className="text-sm text-gray-600">Author: {p.firstAuthor}</p>
          <p className="text-sm text-gray-600">
            Citations: {p.citationCount}
          </p>
          <p
            className="text-sm font-medium"
            style={{ color: IMPACT_COLORS[p.impactScore] }}
          >
            {p.impactScore}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="citationCount"
          name="Citations"
          tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
        />
        <YAxis type="number" dataKey="y" hide />
        <ZAxis range={[80, 200]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />

        {impactGroups.map(
          (impact) =>
            data.filter((d) => d.impactScore === impact).length > 0 && (
              <Scatter
                key={impact}
                name={impact}
                data={data.filter((d) => d.impactScore === impact)}
                fill={IMPACT_COLORS[impact]}
              />
            )
        )}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChartComponent;
