const networkCache = {};

/**
 * Fetch Bitcoin network statistics from Blockchain.info
 */
const getBitcoinNetworkStats = async () => {
  try {
    const response = await fetch('https://blockchain.info/q/getdifficulty');
    const difficulty = await response.json();
    
    // Bitcoin network hashrate calculation
    // Hashrate (H/s) = difficulty * 2^32 / 600 (block time in seconds)
    const hashrate = (difficulty * Math.pow(2, 32)) / 600;
    const hashrateInTH = hashrate / 1e12; // Convert to TH/s
    
    return {
      difficulty,
      hashrate: hashrateInTH,
      unit: 'TH/s',
      lastUpdated: Date.now()
    };
  } catch (error) {
    console.error('Failed to fetch Bitcoin network stats:', error);
    // Fallback to approximate values
    return {
      difficulty: 109_000_000_000_000,
      hashrate: 800_000_000, // 800 EH/s in TH/s
      unit: 'TH/s',
      lastUpdated: Date.now(),
      isEstimate: true
    };
  }
};

/**
 * Fetch Kaspa network statistics
 */
const getKaspaNetworkStats = async () => {
  try {
    // Using fallback values for Kaspa as the API endpoint is unreliable
    // These are approximate values as of January 2026
    return {
      difficulty: 1_200_000_000,
      hashrate: 1_200_000, // 1.2 PH/s in GH/s
      unit: 'GH/s',
      lastUpdated: Date.now(),
      isEstimate: true
    };
  } catch (error) {
    console.error('Failed to fetch Kaspa network stats:', error);
    // Fallback values
    return {
      difficulty: 1_200_000_000,
      hashrate: 1_200_000, // GH/s
      unit: 'GH/s',
      lastUpdated: Date.now(),
      isEstimate: true
    };
  }
};

/**
 * Fetch Litecoin network statistics
 */
const getLitecoinNetworkStats = async () => {
  try {
    // Using approximate values for Litecoin
    return {
      difficulty: 50_000_000,
      hashrate: 1_500_000, // TH/s
      unit: 'TH/s',
      lastUpdated: Date.now(),
      isEstimate: true
    };
  } catch (error) {
    console.error('Failed to fetch Litecoin network stats:', error);
    return {
      difficulty: 50_000_000,
      hashrate: 1_500_000, // TH/s
      unit: 'TH/s',
      lastUpdated: Date.now(),
      isEstimate: true
    };
  }
};

/**
 * Fetch Dogecoin network statistics
 */
const getDogecoinNetworkStats = async () => {
  try {
    // Using approximate values for Dogecoin
    return {
      difficulty: 25_000_000,
      hashrate: 1_200_000, // TH/s
      unit: 'TH/s',
      lastUpdated: Date.now(),
      isEstimate: true
    };
  } catch (error) {
    console.error('Failed to fetch Dogecoin network stats:', error);
    return {
      difficulty: 25_000_000,
      hashrate: 1_200_000, // TH/s
      unit: 'TH/s',
      lastUpdated: Date.now(),
      isEstimate: true
    };
  }
};

/**
 * Fetch Ethereum Classic network statistics
 */
const getEthereumClassicNetworkStats = async () => {
  try {
    // Using approximate values for Ethereum Classic
    return {
      difficulty: 2_500_000_000_000_000,
      hashrate: 180_000, // GH/s
      unit: 'GH/s',
      lastUpdated: Date.now(),
      isEstimate: true
    };
  } catch (error) {
    console.error('Failed to fetch Ethereum Classic network stats:', error);
    return {
      difficulty: 2_500_000_000_000_000,
      hashrate: 180_000, // GH/s
      unit: 'GH/s',
      lastUpdated: Date.now(),
      isEstimate: true
    };
  }
};

/**
 * Main function to get network stats for any supported coin
 * @param {string} coinSymbol - Coin symbol (BTC, KAS, LTC, DOGE, ETC)
 * @returns {Promise<Object>} Network statistics
 */
export const getNetworkStats = async (coinSymbol) => {
  const cacheKey = coinSymbol.toUpperCase();
  const now = Date.now();
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours to prevent 429 errors

  // Return cached data if still valid
  if (networkCache[cacheKey] && (now - networkCache[cacheKey].lastUpdated) < CACHE_DURATION) {
    return networkCache[cacheKey];
  }

  let stats;
  
  switch (cacheKey) {
    case 'BTC':
      stats = await getBitcoinNetworkStats();
      break;
    case 'KAS':
      stats = await getKaspaNetworkStats();
      break;
    case 'LTC':
      stats = await getLitecoinNetworkStats();
      break;
    case 'DOGE':
      stats = await getDogecoinNetworkStats();
      break;
    case 'ETC':
      stats = await getEthereumClassicNetworkStats();
      break;
    default:
      throw new Error(`Unsupported coin: ${coinSymbol}`);
  }

  // Cache the result
  networkCache[cacheKey] = stats;
  return stats;
};

/**
 * Clear network stats cache (useful for manual refresh)
 */
export const clearNetworkCache = () => {
  Object.keys(networkCache).forEach(key => delete networkCache[key]);
};
