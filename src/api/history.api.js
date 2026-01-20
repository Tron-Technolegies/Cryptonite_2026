const historyCache = {};

/**
 * Format date based on time range
 * @param {Date} date - Date object
 * @param {number} days - Number of days in range
 * @returns {string} Formatted date string
 */
const formatDate = (date, days) => {
  const options = { month: 'short', day: 'numeric' };
  
  if (days <= 1) {
    // For 24h, show time
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  } else if (days <= 7) {
    // For 7 days, show day and month
    return date.toLocaleDateString('en-US', options);
  } else if (days <= 90) {
    // For 30-90 days, show month and day
    return date.toLocaleDateString('en-US', options);
  } else {
    // For longer periods, show month and year
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
};

/**
 * Fetch historical price data from CoinGecko
 * @param {string} coinId - CoinGecko coin ID (e.g., 'bitcoin', 'kaspa')
 * @param {number} days - Number of days of history (1, 7, 30, 90, 365)
 * @returns {Promise<Array>} Array of {date, price} objects
 */
export const getHistoricalPrices = async (coinId, days = 30) => {
  const cacheKey = `${coinId}_${days}`;
  const now = Date.now();
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours to prevent 429 errors

  // Return cached data if still valid
  if (historyCache[cacheKey] && (now - historyCache[cacheKey].timestamp) < CACHE_DURATION) {
    return historyCache[cacheKey].data;
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch historical prices: ${response.status}`);
    }

    const data = await response.json();
    
    // Format data for charts
    const formattedData = data.prices.map(([timestamp, price]) => {
      const date = new Date(timestamp);
      return {
        timestamp,
        date: formatDate(date, days),
        price: parseFloat(price.toFixed(2))
      };
    });

    // Cache the result
    historyCache[cacheKey] = {
      data: formattedData,
      timestamp: now
    };

    return formattedData;
  } catch (error) {
    console.error('Failed to fetch historical prices:', error);
    
    // Return cached data if available, even if expired
    if (historyCache[cacheKey]) {
      console.log('Using expired cache for historical prices');
      return historyCache[cacheKey].data;
    }
    
    // Return empty array as fallback
    return [];
  }
};

/**
 * Get price change percentage
 * @param {Array} priceData - Array of price data
 * @returns {Object} {change, percentage}
 */
export const getPriceChange = (priceData) => {
  if (!priceData || priceData.length < 2) {
    return { change: 0, percentage: 0 };
  }

  const firstPrice = priceData[0].price;
  const lastPrice = priceData[priceData.length - 1].price;
  const change = lastPrice - firstPrice;
  const percentage = ((change / firstPrice) * 100).toFixed(2);

  return {
    change: change.toFixed(2),
    percentage: parseFloat(percentage)
  };
};

/**
 * Clear history cache
 */
export const clearHistoryCache = () => {
  Object.keys(historyCache).forEach(key => delete historyCache[key]);
};
