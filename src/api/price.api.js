const cache = {};

// static fallback coin images
const COIN_IMAGES = {
  bitcoin: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  kaspa: "https://assets.coingecko.com/coins/images/25751/small/kaspa.png",
  litecoin: "https://assets.coingecko.com/coins/images/2/small/litecoin.png",
  dogecoin: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
  "ethereum-classic": "https://assets.coingecko.com/coins/images/453/small/ethereum_classic_logo.png",
};

export const getCoinData = async (coinId) => {
  const now = Date.now();

  // cache for 60 seconds
  if (cache[coinId] && now - cache[coinId].time < 60000) {
    return cache[coinId];
  }

  // 🔹 SAFE endpoint (almost never blocked)
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
  );

  if (!res.ok) {
    throw new Error("CoinGecko price fetch failed");
  }

  const data = await res.json();

  const result = {
    price: data[coinId]?.usd || 0,
    image: COIN_IMAGES[coinId] || null, // fallback image
    time: now,
  };

  cache[coinId] = result;
  return result;
};
