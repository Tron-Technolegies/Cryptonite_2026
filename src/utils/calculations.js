import { normalizeHashrate } from "./hashrate";

/**
 * Calculate mining profitability
 * @param {Object} params - Calculation parameters
 * @param {number} params.hashrate - Miner hashrate
 * @param {number} params.power - Power consumption in Watts
 * @param {number} params.electricityCost - Electricity cost per kWh
 * @param {number} params.poolFee - Pool fee percentage (0-100)
 * @param {Object} params.coin - Coin configuration
 * @param {number} params.price - Current coin price
 * @param {number} params.networkHashrate - Real-time network hashrate (in coin's unit)
 * @returns {Object} Profitability calculations
 */
export const calculateProfit = ({ 
  hashrate, 
  power, 
  electricityCost, 
  poolFee = 0,
  coin, 
  price,
  networkHashrate 
}) => {
  // Normalize miner hashrate to the same unit as network hashrate
  const minerHashrate = Number(hashrate);
  const networkHash = Number(networkHashrate);

  if (!minerHashrate || !networkHash || !price) {
    return {
      coinsPerDay: 0,
      revenue: 0,
      powerCost: 0,
      profit: 0,
      profitAfterFee: 0,
      monthly: 0,
      yearly: 0
    };
  }

  // Calculate coins mined per day
  // Formula: (miner_hashrate / network_hashrate) * block_reward * blocks_per_day
  const coinsPerDay = (minerHashrate / networkHash) * coin.blockReward * coin.blocksPerDay;

  // Calculate revenue before pool fee
  const revenueBeforeFee = coinsPerDay * price;

  // Apply pool fee
  const poolFeeAmount = revenueBeforeFee * (Number(poolFee) / 100);
  const revenue = revenueBeforeFee - poolFeeAmount;

  // Calculate power cost per day
  const powerCost = ((Number(power) * 24) / 1000) * Number(electricityCost);

  // Calculate profit
  const profit = revenue - powerCost;

  return {
    coinsPerDay,
    revenue,
    revenueBeforeFee,
    poolFeeAmount,
    powerCost,
    profit,
    monthly: profit * 30,
    yearly: profit * 365,
  };
};

/**
 * Calculate ROI (Return on Investment)
 * @param {number} machinePrice - Initial investment
 * @param {number} dailyProfit - Daily profit
 * @returns {Object} ROI calculations
 */
export const calculateROI = (machinePrice, dailyProfit) => {
  if (!machinePrice || !dailyProfit || dailyProfit <= 0) {
    return {
      days: Infinity,
      months: Infinity,
      years: Infinity,
      breakEven: 'Never'
    };
  }

  const days = machinePrice / dailyProfit;
  const months = days / 30;
  const years = days / 365;

  return {
    days: Math.ceil(days),
    months: months.toFixed(1),
    years: years.toFixed(2),
    breakEven: days < 365 ? `${Math.ceil(days)} days` : `${years.toFixed(1)} years`
  };
};
