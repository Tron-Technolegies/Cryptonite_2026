import { useState } from "react";

export default function ProductProfitabilityGraph({ product, btcPrice }) {
  const [numberOfMiners, setNumberOfMiners] = useState(1);
  const [electricityCost, setElectricityCost] = useState(0.058);
  const [timePeriod, setTimePeriod] = useState("month"); // day, week, month

  // Use proper calculation logic from working calculator
  const calculateMetrics = () => {
    const powerKW = (product.power || 2760) / 1000;
    const hashrateInTH = product.hashrate || 120;

    // Bitcoin network parameters
    const networkHashrate = 600000000; // 600 EH/s in TH/s
    const blockReward = 3.125; // Current BTC block reward after halving
    const blocksPerDay = 144; // ~10 min per block

    // Calculate coins mined per day (proper formula)
    const coinsPerDay = (hashrateInTH / networkHashrate) * blockReward * blocksPerDay;

    // Calculate revenue and costs
    const currentBtcPrice = btcPrice || 95000;
    const dailyRevenue = coinsPerDay * currentBtcPrice;
    const dailyElectricityCost = powerKW * 24 * electricityCost;
    const dailyProfit = dailyRevenue - dailyElectricityCost;

    // Multiply by number of miners
    return {
      salesDay: dailyRevenue * numberOfMiners,
      dayCosts: dailyElectricityCost * numberOfMiners,
      winningDay: dailyProfit * numberOfMiners,
      monthlyRevenue: dailyRevenue * numberOfMiners * 30,
      monthlyCosts: dailyElectricityCost * numberOfMiners * 30,
      profitMonth: dailyProfit * numberOfMiners * 30,
      dailyProfit: dailyProfit,
      coinsPerDay: coinsPerDay * numberOfMiners,
    };
  };

  const metrics = calculateMetrics();

  // Generate graph data based on selected time period
  const generateGraphData = () => {
    const data = [];
    const periods = {
      day: { count: 24, label: (i) => `${i}h` },
      week: { count: 7, label: (i) => `Day ${i + 1}` },
      month: { count: 30, label: (i) => `${i + 1}` },
    };

    const period = periods[timePeriod];
    const profitPerPeriod = timePeriod === "day" ? metrics.dailyProfit / 24 : metrics.dailyProfit;

    for (let i = 0; i < period.count; i++) {
      // Add realistic variance
      const variance = (Math.random() - 0.5) * 0.15;
      const profit = profitPerPeriod * (1 + variance);

      data.push({
        label: period.label(i),
        profit: parseFloat(profit.toFixed(2)),
      });
    }
    return data;
  };

  const graphData = generateGraphData();
  const maxProfit = Math.max(...graphData.map((d) => Math.abs(d.profit)));
  const minProfit = Math.min(...graphData.map((d) => d.profit));
  const avgProfit = graphData.reduce((acc, d) => acc + d.profit, 0) / graphData.length;
  const hasLoss = minProfit < 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Inputs and Metrics */}
        <div className="flex-1">
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Number of Miners */}
            <div>
              <label className="block text-sm font-medium mb-2">Number of miners</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNumberOfMiners(Math.max(1, numberOfMiners - 1))}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-lg transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={numberOfMiners}
                  onChange={(e) => setNumberOfMiners(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 text-center border border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2"
                  style={{ focusRingColor: "var(--primary-color)" }}
                  min="1"
                />
                <button
                  onClick={() => setNumberOfMiners(numberOfMiners + 1)}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-lg transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Electricity Costs */}
            <div>
              <label className="block text-sm font-medium mb-2">Electricity costs</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.001"
                  value={electricityCost}
                  onChange={(e) => setElectricityCost(parseFloat(e.target.value) || 0)}
                  className="w-full h-10 px-3 pr-16 border border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2"
                  style={{ focusRingColor: "var(--primary-color)" }}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                  $/kWh
                </span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">Sales Day</div>
              <div className="text-lg font-bold">${metrics.salesDay.toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">Monthly revenue</div>
              <div className="text-lg font-bold">${metrics.monthlyRevenue.toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">Day costs</div>
              <div className="text-lg font-bold text-red-600">${metrics.dayCosts.toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">Monthly costs</div>
              <div className="text-lg font-bold text-red-600">
                ${metrics.monthlyCosts.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">Winning Day</div>
              <div
                className="text-lg font-bold"
                style={{ color: metrics.winningDay >= 0 ? "var(--primary-color)" : "#ef4444" }}
              >
                ${metrics.winningDay.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">Profit Month</div>
              <div
                className="text-lg font-bold"
                style={{ color: metrics.profitMonth >= 0 ? "var(--primary-color)" : "#ef4444" }}
              >
                ${metrics.profitMonth.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Graph */}
        <div className="flex-1 bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-base font-bold">Profit Graph</h4>
            <div className="text-right">
              <div className="text-xs text-gray-600">BTC Price</div>
              <div className="text-sm font-bold" style={{ color: "var(--primary-color)" }}>
                ${(btcPrice || 95000).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Time Period Selector */}
          <div className="flex gap-2 mb-4">
            {["day", "week", "month"].map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  timePeriod === period ? "text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                style={timePeriod === period ? { backgroundColor: "var(--primary-color)" } : {}}
              >
                {period === "day" ? "24 Hours" : period === "week" ? "7 Days" : "30 Days"}
              </button>
            ))}
          </div>

          {/* Area Chart */}
          <div className="relative h-48">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="0" x2="0" y2="200" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="0" y1="200" x2="800" y2="200" stroke="#e5e7eb" strokeWidth="1" />
              <line
                x1="0"
                y1="100"
                x2="800"
                y2="100"
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="5,5"
              />

              {/* Area fill */}
              <defs>
                <linearGradient id="profitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    style={{
                      stopColor: hasLoss ? "#ef4444" : "var(--primary-color)",
                      stopOpacity: 0.3,
                    }}
                  />
                  <stop
                    offset="100%"
                    style={{
                      stopColor: hasLoss ? "#ef4444" : "var(--primary-color)",
                      stopOpacity: 0.05,
                    }}
                  />
                </linearGradient>
              </defs>

              {/* Generate path */}
              <path
                d={
                  graphData
                    .map((point, i) => {
                      const x = (i / (graphData.length - 1)) * 800;
                      const y =
                        200 - ((point.profit - minProfit) / (maxProfit - minProfit)) * 180 - 10;
                      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                    })
                    .join(" ") + ` L 800 200 L 0 200 Z`
                }
                fill="url(#profitGradient)"
              />

              {/* Line */}
              <path
                d={graphData
                  .map((point, i) => {
                    const x = (i / (graphData.length - 1)) * 800;
                    const y =
                      200 - ((point.profit - minProfit) / (maxProfit - minProfit)) * 180 - 10;
                    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke={hasLoss ? "#ef4444" : "var(--primary-color)"}
                strokeWidth="2"
              />

              {/* Data points */}
              {graphData.map((point, i) => {
                const x = (i / (graphData.length - 1)) * 800;
                const y = 200 - ((point.profit - minProfit) / (maxProfit - minProfit)) * 180 - 10;
                const showLabel =
                  timePeriod === "day" ? i % 6 === 0 : timePeriod === "week" ? true : i % 5 === 0;
                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r="2"
                      fill={hasLoss ? "#ef4444" : "var(--primary-color)"}
                    />
                    {showLabel && (
                      <text x={x} y="195" textAnchor="middle" fontSize="9" fill="#6b7280">
                        {point.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Average */}
          <div className="text-center mt-2">
            <span className="text-xs text-gray-600">Avg: </span>
            <span
              className="text-sm font-bold"
              style={{ color: avgProfit >= 0 ? "var(--primary-color)" : "#ef4444" }}
            >
              ${avgProfit.toFixed(2)}/{timePeriod === "day" ? "hr" : "day"}
            </span>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 text-center mt-2">
            * Estimates based on current BTC price and network conditions
          </p>
        </div>
      </div>
    </div>
  );
}
