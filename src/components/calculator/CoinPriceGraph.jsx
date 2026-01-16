import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// mock price history (replace later)
const priceHistory = [
  { date: "Jan 01", price: 88000 },
  { date: "Jan 05", price: 89500 },
  { date: "Jan 10", price: 91000 },
  { date: "Jan 15", price: 94500 },
  { date: "Jan 20", price: 97000 },
];

export default function CoinPriceGraph({ coin }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">{coin.name} live price chart</h2>

      <div className="h-72 bg-white rounded-xl shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceHistory}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#f97316" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
