import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { STAGE_COLORS } from '../../utils/constants';

const StackedBarChart = ({ data }) => {
  const stages = [
    'Abstract Read',
    'Introduction Done',
    'Methodology Done',
    'Results Analyzed',
    'Fully Read',
    'Notes Completed',
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="domain" />
        <YAxis />
        <Tooltip />
        <Legend />

        {stages.map((stage) => (
          <Bar
            key={stage}
            dataKey={stage}
            stackId="a"
            fill={STAGE_COLORS[stage]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
