export const COINS = {
  BTC: {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    algorithm: "SHA-256",
    unit: "TH/s",
    blocksPerDay: 144,
    blockReward: 3.125,
    blockTime: 600, // seconds
  },
  KAS: {
    id: "kaspa",
    name: "Kaspa",
    symbol: "KAS",
    algorithm: "kHeavyHash",
    unit: "GH/s",
    blocksPerDay: 86400,
    blockReward: 50,
    blockTime: 1, // seconds
  },
  LTC: {
    id: "litecoin",
    name: "Litecoin",
    symbol: "LTC",
    algorithm: "Scrypt",
    unit: "MH/s",
    blocksPerDay: 576,
    blockReward: 6.25,
    blockTime: 150, // seconds
  },
  DOGE: {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    algorithm: "Scrypt",
    unit: "MH/s",
    blocksPerDay: 1440,
    blockReward: 10000,
    blockTime: 60, // seconds
  },
  ETC: {
    id: "ethereum-classic",
    name: "Ethereum Classic",
    symbol: "ETC",
    algorithm: "Ethash",
    unit: "MH/s",
    blocksPerDay: 6500,
    blockReward: 2.56,
    blockTime: 13, // seconds
  },
};
