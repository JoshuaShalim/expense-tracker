import React from 'react';

import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import CustomLegend from './CustomLegend';
import CustomTooltip from './CustomTooltip';

const MergedChart = ({ data }) => {
  // Map dataKeys → friendly labels
  const legendFormatter = (value) => {
    if (value === "bar") return "Top Category";
    if (value === "line") return "This Month Trend";
    return value;
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

          {/* ✅ Use your custom tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* ✅ Custom legend with renamed labels */}
          <Legend
            content={(props) => {
              if (!props.payload) return null;

              // filter only bar + line once (exclude Area duplicates)
              const seen = new Set();
              const filtered = props.payload.filter((entry) => {
                if (seen.has(entry.dataKey)) return false;
                seen.add(entry.dataKey);
                return entry.dataKey === "bar" || entry.dataKey === "line";
              });

              // rename labels to meaningful ones
              const labelMap = {
                bar: "Top Category",
                line: "This Month Trend",
              };

              const newPayload = filtered.map((entry) => ({
                ...entry,
                value: labelMap[entry.dataKey] || entry.value,
              }));

              return <CustomLegend {...props} payload={newPayload} />;
            }}
          />

          {/* Bar (top category) */}
          <Bar
            dataKey="bar"
            barSize={40}
            fill="#cfbefb"
            radius={[6, 6, 0, 0]}
          />

          {/* Gradient under line - hidden from tooltip/legend */}
          <Area
            type="monotone"
            dataKey="line"
            stroke="none"
            fill="url(#lineGradient)"
            legendType="none" // ✅ hides it from the legend
          />

          {/* Line on top */}
          <Line
            type="monotone"
            dataKey="line"
            stroke="#875cf5"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ab8df8" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MergedChart;
