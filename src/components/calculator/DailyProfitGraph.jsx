import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { calculateProfit } from "../../utils/calculations";
import { getHistoricalPrices } from "../../api/history.api";
import { getNetworkStats } from "../../api/network.api";
import SectionHeading from "../ui/SectionHeading";

export default function DailyProfitGraph({ coin }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30);
  const [networkHashrate, setNetworkHashrate] = useState(0);

  // Example miner assumptions (same as calculator defaults)
  const hashrate = 100;
  const power = 3000;
  const electricityCost = 0.06;
  const poolFee = 1;

  useEffect(() => {
    loadData();
  }, [coin.id, timeRange]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch historical prices
      const priceHistory = await getHistoricalPrices(coin.id, timeRange);
      
      // Fetch network stats
      const networkStats = await getNetworkStats(coin.symbol);
      setNetworkHashrate(networkStats.hashrate);

      // Calculate profit for each historical price point
      const data = priceHistory.map((p) => {
        const result = calculateProfit({
          hashrate,
          power,
          electricityCost,
          poolFee,
          coin,
          price: p.price,
          networkHashrate: networkStats.hashrate,
        });

        return {
          date: p.date,
          profit: Number(result.profit.toFixed(2)),
          price: p.price,
        };
      });

      setChartData(data);
    } catch (error) {
      console.error('Failed to load profit graph data:', error);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-700">{payload[0].payload.date}</p>
          <p className="text-sm text-green-600">
            Profit: <span className="font-bold">${payload[0].value}</span>
          </p>
          <p className="text-xs text-gray-500">
            Price: ${payload[0].payload.price.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          <SectionHeading>Estimated Daily Profit Trend</SectionHeading>
        </h2>
        
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === days
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {days}D
            </button>
          ))}
        </div>
      </div>

      <div className="h-80 bg-white rounded-xl shadow-lg p-6">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading profit data...</p>
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#colorProfit)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-3">
        Profit trend calculated using historical {coin.name} price data with {hashrate} {coin.unit} hashrate, 
        {power}W power consumption, and ${electricityCost}/kWh electricity cost.
      </p>
    </section>
  );
}
