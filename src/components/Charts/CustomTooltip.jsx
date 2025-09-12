import React from 'react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    // Map dataKeys → friendly labels
    const labelMap = {
      bar: "Top Category",
      line: "This Month Trend",
    };

    // filter duplicates (ignore area line)
    const uniquePayload = payload.filter(
      (entry, index, self) =>
        index === self.findIndex((e) => e.dataKey === entry.dataKey)
    );

    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1">
          {payload[0].payload.month}
        </p>
        {uniquePayload.map((entry, index) => (
          <p key={index} className="text-sm text-gray-600">
            {labelMap[entry.dataKey] || entry.name}:{" "}
            <span className="text-sm font-medium text-gray-900">
              ${entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
