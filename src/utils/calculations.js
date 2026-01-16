import { normalizeHashrate } from "./hashrate";

export const calculateProfit = ({ hashrate, power, electricityCost, coin, price }) => {
  // normalize miner hashrate to GH/s
  const minerHashrateGH = normalizeHashrate(Number(hashrate), coin.unit);

  // network hashrate MUST be GH/s
  const networkHashrateGH = coin.networkHashrate;

  const coinsPerDay = (minerHashrateGH / networkHashrateGH) * coin.blockReward * coin.blocksPerDay;

  const revenue = coinsPerDay * price;

  const powerCost = ((Number(power) * 24) / 1000) * Number(electricityCost);

  return {
    coinsPerDay,
    revenue,
    powerCost,
    profit: revenue - powerCost,
  };
};
