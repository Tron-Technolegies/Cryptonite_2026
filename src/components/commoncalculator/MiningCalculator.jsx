import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CgSoftwareDownload } from "react-icons/cg";
import { FiClock } from "react-icons/fi";
import { CiCalculator1 } from "react-icons/ci";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

export default function MiningCalculator() {
  // Inputs
  const [hashrate, setHashrate] = useState("");
  const [power, setPower] = useState("");
  const [electricityCost, setElectricityCost] = useState("");
  const [poolFee, setPoolFee] = useState("");

  const [hashValue, setHashValue] = useState(0.00000042);
  const [useCustom, setUseCustom] = useState(false);

  const [currency, setCurrency] = useState("EUR");
  const [btcPrices, setBtcPrices] = useState({ eur: 0, usd: 0 });

  const symbol = currency === "EUR" ? "€" : "$";

  // Results
  const EMPTY_RESULT = {
    revenue: null,
    electricity: null,
    profit: null,
    btc: null,
  };

  const [results, setResults] = useState({
    daily: EMPTY_RESULT,
    weekly: EMPTY_RESULT,
    monthly: EMPTY_RESULT,
    yearly: EMPTY_RESULT,
  });

  const [hasCalculated, setHasCalculated] = useState(false);

  // Fetch BTC price
  useEffect(() => {
    fetchBTCPrice();
    const interval = setInterval(fetchBTCPrice, 86400000);
    return () => clearInterval(interval);
  }, []);

  const fetchBTCPrice = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur,usd",
      );
      const data = await res.json();
      setBtcPrices(data.bitcoin);
    } catch {
      console.error("BTC fetch failed");
    }
  };

  // Calculation
  const calculatePeriod = (days) => {
    const h = Number(hashrate) || 0;
    const p = Number(power) || 0;
    const e = Number(electricityCost) || 0;
    const fee = Number(poolFee) || 0;

    const dailyBTC = h * hashValue;
    const btcAfterFee = dailyBTC * (1 - fee / 100);
    const btcPrice = currency === "EUR" ? btcPrices.eur : btcPrices.usd;

    const revenue = btcAfterFee * btcPrice * days;
    const electricity = (p / 1000) * 24 * e * days;

    return {
      revenue,
      electricity,
      profit: revenue - electricity,
      btc: btcAfterFee * days,
    };
  };

  const handleCalculate = () => {
    setResults({
      daily: calculatePeriod(1),
      weekly: calculatePeriod(7),
      monthly: calculatePeriod(30),
      yearly: calculatePeriod(365),
    });
    setHasCalculated(true);
  };

  // PDF
  const safe = (value, decimals = 2) => (Number.isFinite(value) ? value.toFixed(decimals) : "0.00");

  const loadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => resolve(img);
    });

  const downloadPDF = async () => {
    if (!hasCalculated) return;

    const doc = new jsPDF();

    const logo = await loadImage("/logos/cryptonitelogoupdated.png");
    doc.addImage(logo, "PNG", 14, 10, 40, 15);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("BITCOIN MINING PROFIT CALCULATION", 60, 20);

    doc.setFontSize(11);
    doc.text("Estimated mining returns based on provided inputs.", 60, 28);

    autoTable(doc, {
      startY: 40,
      head: [["Input Parameter", "Value"]],
      body: [
        ["Hashrate", `${hashrate} TH/s`],
        ["Power Consumption", `${power} W`],
        ["Electricity Cost", `${electricityCost} ${symbol}/kWh`],
        ["Pool Fee", `${poolFee} %`],
        ["Bitcoin Price", `${symbol}${currency === "EUR" ? btcPrices.eur : btcPrices.usd}`],
        ["Hash Value", `${hashValue} BTC`],
      ],
      theme: "grid",
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [
        ["Period", `Revenue (${symbol})`, `Electricity (${symbol})`, `Profit (${symbol})`, "BTC"],
      ],
      body: [
        [
          "Daily",
          safe(results.daily.revenue),
          safe(results.daily.electricity),
          safe(results.daily.profit),
          safe(results.daily.btc, 6),
        ],
        [
          "Weekly",
          safe(results.weekly.revenue),
          safe(results.weekly.electricity),
          safe(results.weekly.profit),
          safe(results.weekly.btc, 6),
        ],
        [
          "Monthly",
          safe(results.monthly.revenue),
          safe(results.monthly.electricity),
          safe(results.monthly.profit),
          safe(results.monthly.btc, 6),
        ],
        [
          "Yearly",
          safe(results.yearly.revenue),
          safe(results.yearly.electricity),
          safe(results.yearly.profit),
          safe(results.yearly.btc, 6),
        ],
      ],
      theme: "grid",
    });

    doc.save("cryptonite-mining-profit.pdf");
  };

  return (
    <div className="bg-[#f6faf7] rounded-xl p-6">
      {/* INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <Input label="Hashrate" unit="TH/s" value={hashrate} setValue={setHashrate} />
        <Input label="Power Consumption" unit="W" value={power} setValue={setPower} />
        <Input
          label="Electricity Cost"
          unit={`${symbol}/kWh`}
          value={electricityCost}
          setValue={setElectricityCost}
        />
        <Input label="Pool Fee" unit="%" value={poolFee} setValue={setPoolFee} />
        <Input
          label="Bitcoin Price"
          unit={symbol}
          value={currency === "EUR" ? btcPrices.eur : btcPrices.usd}
          setValue={(val) =>
            setBtcPrices((prev) => ({
              ...prev,
              [currency.toLowerCase()]: val,
            }))
          }
          disabled={!useCustom}
        />
        <Input
          label="Hash Value"
          unit="BTC"
          value={hashValue}
          setValue={setHashValue}
          disabled={!useCustom}
        />
      </div>

      <div className="mt-4">
        {!useCustom ? (
          <button onClick={() => setUseCustom(true)} className="text-sm underline text-green-700">
            Use custom Bitcoin price & hash value
          </button>
        ) : (
          <button onClick={() => setUseCustom(false)} className="text-sm underline text-red-600">
            Reset to live values
          </button>
        )}
      </div>

      <div className="flex gap-2 my-4">
        <button
          onClick={() => setCurrency("EUR")}
          className={
            currency === "EUR"
              ? "bg-green-600 text-white px-4 py-1 rounded"
              : "bg-gray-200 px-4 py-1 rounded"
          }
        >
          EUR €
        </button>
        <button
          onClick={() => setCurrency("USD")}
          className={
            currency === "USD"
              ? "bg-green-600 text-white px-4 py-1 rounded"
              : "bg-gray-200 px-4 py-1 rounded"
          }
        >
          USD $
        </button>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleCalculate}
          className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <CiCalculator1 /> Calculate Profits
        </button>
        <button
          onClick={downloadPDF}
          disabled={!hasCalculated}
          className="px-5 flex items-center gap-2 py-2 border rounded-lg"
        >
          PDF <CgSoftwareDownload />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
        <ResultCard title="Daily" subtitle="24 hours" data={results.daily} currency={currency} />
        <ResultCard title="Weekly" subtitle="7 days" data={results.weekly} currency={currency} />
        <ResultCard title="Monthly" subtitle="30 days" data={results.monthly} currency={currency} />
        <ResultCard title="Yearly" subtitle="365 days" data={results.yearly} currency={currency} />
      </div>
    </div>
  );
}

function ResultCard({ title, subtitle, data, currency }) {
  const symbol = currency === "EUR" ? "€" : "$";
  const format = (v) => (v === null ? "-" : `${symbol}${v.toFixed(2)}`);

  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <FiClock className="text-green-600" />
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span>Revenue</span>
          <span>{format(data.revenue)}</span>
        </div>
        <div className="flex justify-between">
          <span>Electricity</span>
          <span>{format(data.electricity)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Profit</span>
          <span className="text-green-600">{format(data.profit)}</span>
        </div>
      </div>
    </div>
  );
}

function Input({ label, unit, value, setValue, disabled = false }) {
  return (
    <div>
      <label className="text-sm font-medium text-[#7A7A7A]">{label}</label>
      <div
        className={`flex items-center bg-white rounded-2xl px-3 py-2 mt-1 ${
          disabled ? "opacity-60" : ""
        }`}
      >
        <input
          type="number"
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          className="w-full outline-none"
        />
        <span className="text-xs px-1 ml-2 rounded-full bg-[#E9E9E9]">{unit}</span>
      </div>
    </div>
  );
}
