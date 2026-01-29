import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { STAGE_COLORS } from '../../utils/constants';

const FunnelChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, bottom: 80 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-40}
          textAnchor="end"
          height={90}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="count"
          name="Papers"
          fill={STAGE_COLORS['Abstract Read']}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FunnelChart;
