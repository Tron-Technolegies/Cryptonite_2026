import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { calculateProfit } from "../../utils/calculations";
import { COINS } from "../../config/coins.config";

// MOCK historical prices (later replace with API)
const priceHistory = [
  { date: "Oct 17", price: 96000 },
  { date: "Oct 25", price: 94500 },
  { date: "Nov 03", price: 93000 },
  { date: "Nov 12", price: 92000 },
  { date: "Nov 21", price: 90500 },
  { date: "Nov 30", price: 91500 },
  { date: "Dec 09", price: 92500 },
  { date: "Dec 18", price: 94000 },
  { date: "Jan 05", price: 95500 },
  { date: "Jan 16", price: 97000 },
];

export default function DailyProfitGraph({ coin }) {
  // example miner assumptions (same as calculator defaults)
  const hashrate = 100;
  const power = 3000;
  const electricityCost = 0.06;

  const chartData = priceHistory.map((p) => {
    const result = calculateProfit({
      hashrate,
      power,
      electricityCost,
      coin,
      price: p.price,
    });

    return {
      date: p.date,
      profit: Number(result.profit.toFixed(2)),
    };
  });

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Estimated daily profit trend</h2>

      <div className="h-72 bg-white rounded-xl shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Profit trend calculated using historical {coin.name} price data.
      </p>
    </section>
  );
}
