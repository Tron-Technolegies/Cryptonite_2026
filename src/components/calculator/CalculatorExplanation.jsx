export default function CalculatorExplanation({ coin }) {
  return (
    <section className="max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">
        How {coin.name} mining profitability is calculated
      </h2>

      <p className="text-gray-600 mb-4">
        This calculator estimates daily mining profitability based on your hashrate, power
        consumption, electricity cost, and real-time {coin.name} price. It assumes 100% uptime with
        full performance and no downtime.
      </p>

      <ul className="list-disc pl-6 text-gray-600 space-y-2">
        <li>
          <b>Hashrate</b> determines your share of the network rewards.
        </li>
        <li>
          <b>Power consumption</b> defines your daily electricity cost.
        </li>
        <li>
          <b>Electricity price</b> varies by location or hosting provider.
        </li>
        <li>
          <b>Live coin price</b> reflects current market value.
        </li>
      </ul>

      <p className="text-gray-600 mt-4">
        Final profit is calculated by subtracting electricity costs from total mining revenue.
        Actual earnings may vary due to network difficulty and market conditions.
      </p>
    </section>
  );
}
