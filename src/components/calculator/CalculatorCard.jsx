import { useEffect, useState } from "react";
import { calculateProfit } from "../../utils/calculations";
import { getCoinData } from "../../api/price.api";
import { getNetworkStats, clearNetworkCache } from "../../api/network.api";
import { formatCurrency, formatNumber, formatHashrate, formatTimestamp } from "../../utils/formatters";

export default function CalculatorCard({ coin }) {
  const [price, setPrice] = useState(0);
  const [hashrate, setHashrate] = useState(100);
  const [power, setPower] = useState(3000);
  const [electricity, setElectricity] = useState(0.06);
  const [poolFee, setPoolFee] = useState(1);
  
  const [coinImage, setCoinImage] = useState("");
  const [networkHashrate, setNetworkHashrate] = useState(0);
  const [networkDifficulty, setNetworkDifficulty] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, [coin.id]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch coin price and image
      const coinData = await getCoinData(coin.id);
      setPrice(coinData.price);
      setCoinImage(coinData.image);

      // Fetch network statistics
      const networkStats = await getNetworkStats(coin.symbol);
      setNetworkHashrate(networkStats.hashrate);
      setNetworkDifficulty(networkStats.difficulty);
      setLastUpdated(networkStats.lastUpdated);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Failed to load data. Using cached values.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    clearNetworkCache();
    loadData();
  };

  const result = calculateProfit({
    hashrate,
    power,
    electricityCost: electricity,
    poolFee,
    coin,
    price,
    networkHashrate,
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {coinImage && <img src={coinImage} alt={coin.name} className="h-10 w-10" />}
          <div>
            <h1 className="text-2xl font-semibold">{coin.name} Mining Calculator</h1>
            <p className="text-sm text-gray-500">
              Algorithm: {coin.algorithm}
            </p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors text-sm"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {/* Current Price & Network Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
        <div>
          <p className="text-xs text-gray-500 uppercase">Current Price</p>
          <p className="text-lg font-bold text-green-600">${formatNumber(price, 2)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Network Hashrate</p>
          <p className="text-lg font-bold">{formatHashrate(networkHashrate, coin.unit)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Last Updated</p>
          <p className="text-sm font-medium">{formatTimestamp(lastUpdated)}</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          ⚠️ {error}
        </div>
      )}

      {/* Input Fields */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hashrate ({coin.unit})
          </label>
          <input
            type="number"
            value={hashrate}
            onChange={(e) => setHashrate(e.target.value)}
            placeholder={`Hashrate (${coin.unit})`}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Power (W)
          </label>
          <input
            type="number"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            placeholder="Power (W)"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Electricity ($/kWh)
          </label>
          <input
            type="number"
            step="0.01"
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
            placeholder="Electricity $/kWh"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pool Fee (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={poolFee}
            onChange={(e) => setPoolFee(e.target.value)}
            placeholder="Pool Fee %"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Results - Daily */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase">Daily Estimates</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <Result 
            label={`${coin.symbol} / day`} 
            value={formatNumber(result.coinsPerDay, 6)} 
          />
          <Result 
            label="Revenue / day" 
            value={formatCurrency(result.revenue)} 
          />
          <Result 
            label="Power cost / day" 
            value={formatCurrency(result.powerCost)} 
          />
          <Result 
            label="Profit / day" 
            value={formatCurrency(result.profit)} 
            highlight 
            isProfit
          />
        </div>
      </div>

      {/* Results - Monthly & Yearly */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-600 font-medium mb-1">Monthly Profit</p>
          <p className="text-2xl font-bold text-blue-700">{formatCurrency(result.monthly)}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
          <p className="text-sm text-purple-600 font-medium mb-1">Yearly Profit</p>
          <p className="text-2xl font-bold text-purple-700">{formatCurrency(result.yearly)}</p>
        </div>
      </div>
    </div>
  );
}

const Result = ({ label, value, highlight, isProfit }) => {
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[$,]/g, '')) : value;
  const isNegative = numValue < 0;
  
  return (
    <div className={`p-4 rounded-xl ${
      highlight 
        ? isNegative 
          ? "bg-red-50 border border-red-200" 
          : "bg-green-50 border border-green-200"
        : "bg-gray-50"
    }`}>
      <p className="text-xs text-gray-600 uppercase mb-1">{label}</p>
      <p className={`text-lg font-bold ${
        highlight 
          ? isNegative 
            ? "text-red-600" 
            : "text-green-600"
          : "text-gray-900"
      }`}>
        {value}
      </p>
    </div>
  );
};
