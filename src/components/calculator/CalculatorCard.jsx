import { useEffect, useState } from "react";
import { calculateProfit } from "../../utils/calculations";
import { getCoinData } from "../../api/price.api";

export default function CalculatorCard({ coin }) {
  const [price, setPrice] = useState(0);
  const [hashrate, setHashrate] = useState(100);
  const [power, setPower] = useState(3000);
  const [electricity, setElectricity] = useState(0.06);

  const [coinImage, setCoinImage] = useState("");

  useEffect(() => {
    const loadCoin = async () => {
      try {
        const data = await getCoinData(coin.id);
        setPrice(data.price);
        setCoinImage(data.image);
      } catch {
        setPrice(0);
      }
    };

    loadCoin();
  }, [coin.id]);

  const result = calculateProfit({
    hashrate,
    power,
    electricityCost: electricity,
    coin,
    price,
  });

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center gap-3 mb-4">
        {coinImage && <img src={coinImage} alt={coin.name} className="h-8 w-8" />}
        <h1 className="text-2xl font-semibold">{coin.name} Mining Calculator</h1>
      </div>

      <p className="text-gray-500 mb-6">
        Current price: <b>${price}</b>
      </p>

      <div className="grid md:grid-cols-4 gap-4">
        <input
          type="number"
          value={hashrate}
          onChange={(e) => setHashrate(e.target.value)}
          placeholder={`Hashrate (${coin.unit})`}
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          value={power}
          onChange={(e) => setPower(e.target.value)}
          placeholder="Power (W)"
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          step="0.01"
          value={electricity}
          onChange={(e) => setElectricity(e.target.value)}
          placeholder="Electricity $/kWh"
          className="border rounded-lg p-3"
        />
      </div>

      <div className="grid md:grid-cols-4 gap-6 mt-6 text-sm">
        <Result label="Coins / day" value={result.coinsPerDay} />
        <Result label="Revenue / day" value={`$${result.revenue}`} />
        <Result label="Power cost / day" value={`$${result.powerCost}`} />
        <Result label="Profit / day" value={`$${result.profit}`} highlight />
      </div>
    </div>
  );
}

const Result = ({ label, value, highlight }) => (
  <div className={`p-4 rounded-xl ${highlight ? "bg-green-50" : "bg-gray-50"}`}>
    <p className="text-gray-500">{label}</p>
    <p className={`text-lg font-bold ${highlight && "text-green-600"}`}>
      {Number(value).toFixed(2)}
    </p>
  </div>
);
