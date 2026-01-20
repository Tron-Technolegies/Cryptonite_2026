import { useParams } from "react-router-dom";
import { COINS } from "../config/coins.config";

import CalculatorCard from "../components/calculator/CalculatorCard";
import CalculatorExplanation from "../components/calculator/CalculatorExplanation";
import DailyProfitGraph from "../components/calculator/DailyProfitGraph";
import CoinPriceGraph from "../components/calculator/CoinPriceGraph";
import ProductGrid from "../components/products/ProductGrid";
import { useEffect } from "react";

export default function CoinCalculator() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { coin } = useParams();
  const coinData = COINS[coin];

  if (!coinData) return <p>Coin not supported</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
      {/* 1️⃣ CALCULATOR */}
      <CalculatorCard coin={coinData} />

      {/* 2️⃣ EXPLANATION */}
      <CalculatorExplanation coin={coinData} />

      {/* 3️⃣ DAILY PROFIT GRAPH */}
      <DailyProfitGraph coin={coinData} />

      {/* 4️⃣ LIVE PRICE GRAPH */}
      <CoinPriceGraph coin={coinData} />

      {/* 5️⃣ PRODUCTS */}
      <ProductGrid coin={coin} />
    </div>
  );
}
