import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getHistoricalPrices, getPriceChange } from "../../api/history.api";
import { formatPercentage } from "../../utils/formatters";
import SectionHeading from "../ui/SectionHeading";

export default function CoinPriceGraph({ coin }) {
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30);
  const [priceChange, setPriceChange] = useState({ change: 0, percentage: 0 });

  useEffect(() => {
    loadData();
  }, [coin.id, timeRange]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getHistoricalPrices(coin.id, timeRange);
      setPriceHistory(data);

      const change = getPriceChange(data);
      setPriceChange(change);
    } catch (error) {
      console.error("Failed to load price history:", error);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-700">{payload[0].payload.date}</p>
          <p className="text-sm text-orange-600">
            Price: <span className="font-bold">${payload[0].value.toFixed(2)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold">
            <SectionHeading>{coin.name} Live Price Chart</SectionHeading>
          </h2>
          {priceChange.percentage !== 0 && (
            <p
              className={`text-sm font-medium mt-1 ${
                priceChange.percentage > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatPercentage(priceChange.percentage)} ({timeRange} days)
            </p>
          )}
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {[7, 30, 90, 365].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === days
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {days >= 365 ? "1Y" : `${days}D`}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80 bg-white rounded-xl shadow-lg p-6">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading price data...</p>
            </div>
          </div>
        ) : priceHistory.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#f97316"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-3">
        Historical price data for {coin.name} over the last {timeRange} days.
      </p>
    </section>
  );
}
