// InsightCard.jsx
import React, {
  useEffect,
  useState,
} from 'react';

import CustomPieChart from '../Charts/CustomPieChart';
import MergedChart from '../Charts/MergedChart'; // new merged chart

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA336A",
  "#8884D8",
];

const InsightCard = ({ insights, className }) => {
  const [pieData, setPieData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!insights) return;

    // Pie Chart
    const pie = (insights.perCategory || []).map((item) => ({
      name: item.category || "Unknown",
      amount: item.total || 0,
    }));
    setPieData(pie);

    // Merged Chart: Bar + Line
    const merged = (insights.trend3Months || []).map((value, index) => ({
      month: ["Month -2", "Month -1", "This Month"][index],
      bar: value || 0, // Bar
      line: value || 0, // Line
    }));
    setChartData(merged);
  }, [insights]);

  if (!insights) return null;

  return (
    <div className={`card ${className || ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg text-semibold">Insights</h5>
      </div>

      {/* Highlighted Summary */}
      <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border-l-4 border-purple-400 shadow-sm">
        <p className="text-sm text-gray-700">{insights.summary}</p>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
  <div className="p-4 rounded-xl bg-purple-50 text-center shadow-sm">
    <h6 className="text-sm text-gray-600">Top Category</h6>
    <p className="text-lg text-semibold text-purple-700">
      {insights.topCategory} (${insights.topCategoryAmount})
    </p>
  </div>
  
  <div className="p-4 rounded-xl bg-green-50 text-center shadow-sm">
    <h6 className="text-sm font-medium text-gray-600">This Month</h6>
    <p className="text-lg text-semibold text-green-700">
      ${insights.thisMonth}
    </p>
  </div>

  <div className="p-4 rounded-xl bg-blue-50 text-center shadow-sm">
    <h6 className="text-sm font-medium text-gray-600">Last Month</h6>
    <p className="text-lg text-semibold text-blue-700">
      ${insights.lastMonth}
    </p>
  </div>

  <div className="p-4 rounded-xl bg-yellow-50 text-center shadow-sm">
    <h6 className="text-sm font-medium text-gray-600">Change %</h6>
    <p className="text-lg text-semibold text-yellow-700">
      {insights.changePercent !== null ? insights.changePercent.toFixed(2) + "%" : "N/A"}
    </p>
  </div>

  <div className="p-4 rounded-xl bg-red-50 text-center shadow-sm">
    <h6 className="text-sm font-medium text-gray-600">Largest Expense</h6>
    <p className="text-lg text-semibold text-red-700">
      {insights.largestExpense?.category} (${insights.largestExpense?.amount})
    </p>
  </div>

  <div className="p-4 rounded-xl bg-indigo-50 text-center shadow-sm">
    <h6 className="text-sm font-medium text-gray-600">Largest Income</h6>
    <p className="text-lg text-semibold text-indigo-700">
      {insights.largestIncome?.source} (${insights.largestIncome?.amount})
    </p>
  </div>
</div>
      {/* Pie Chart */}
      <div className="mt-6 h-[380px]">
        <CustomPieChart
          data={pieData}
          label="This Month"
          totalAmount={`$${insights.thisMonth}`}
          colors={COLORS}
          showTextAnchor
        />
      </div>

      {/* Merged Chart */}
      <div className="mt-6 h-[300px]">
        <MergedChart data={chartData} />
      </div>
    </div>
  );
};

export default InsightCard;
