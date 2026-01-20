/**
 * Format a number with specified decimal places
 * @param {number} value - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
export const formatNumber = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00';
  }
  return Number(value).toFixed(decimals);
};

/**
 * Format currency value
 * @param {number} value - Currency value
 * @param {string} currency - Currency symbol (default: USD)
 * @returns {string} Formatted currency
 */
export const formatCurrency = (value, currency = 'USD') => {
  if (value === null || value === undefined || isNaN(value)) {
    return '$0.00';
  }

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1_000_000) {
    return `${sign}$${(absValue / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    return `${sign}$${(absValue / 1_000).toFixed(2)}K`;
  } else {
    return `${sign}$${absValue.toFixed(2)}`;
  }
};

/**
 * Format hashrate with appropriate unit
 * @param {number} value - Hashrate value
 * @param {string} currentUnit - Current unit (H/s, KH/s, MH/s, GH/s, TH/s, PH/s, EH/s)
 * @returns {string} Formatted hashrate
 */
export const formatHashrate = (value, currentUnit = 'H/s') => {
  if (value === null || value === undefined || isNaN(value)) {
    return `0 ${currentUnit}`;
  }

  const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s'];
  const currentIndex = units.indexOf(currentUnit);
  
  if (currentIndex === -1) {
    return `${formatNumber(value)} ${currentUnit}`;
  }

  let scaledValue = value;
  let unitIndex = currentIndex;

  // Scale up if value is >= 1000
  while (scaledValue >= 1000 && unitIndex < units.length - 1) {
    scaledValue /= 1000;
    unitIndex++;
  }

  // Scale down if value is < 1
  while (scaledValue < 1 && unitIndex > 0) {
    scaledValue *= 1000;
    unitIndex--;
  }

  return `${formatNumber(scaledValue, 2)} ${units[unitIndex]}`;
};

/**
 * Format percentage
 * @param {number} value - Percentage value
 * @param {boolean} includeSign - Include + sign for positive values
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, includeSign = true) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00%';
  }

  const sign = value > 0 && includeSign ? '+' : '';
  return `${sign}${formatNumber(value, 2)}%`;
};

/**
 * Format time duration
 * @param {number} days - Number of days
 * @returns {string} Formatted duration
 */
export const formatDuration = (days) => {
  if (days === null || days === undefined || isNaN(days) || days < 0) {
    return 'N/A';
  }

  if (days < 1) {
    const hours = Math.round(days * 24);
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else if (days < 30) {
    return `${Math.round(days)} day${Math.round(days) !== 1 ? 's' : ''}`;
  } else if (days < 365) {
    const months = Math.round(days / 30);
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    const years = (days / 365).toFixed(1);
    return `${years} year${years !== '1.0' ? 's' : ''}`;
  }
};

/**
 * Format large numbers with K, M, B suffixes
 * @param {number} value - Number to format
 * @returns {string} Formatted number
 */
export const formatLargeNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1_000_000_000) {
    return `${sign}${(absValue / 1_000_000_000).toFixed(2)}B`;
  } else if (absValue >= 1_000_000) {
    return `${sign}${(absValue / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    return `${sign}${(absValue / 1_000).toFixed(2)}K`;
  } else {
    return `${sign}${absValue.toFixed(2)}`;
  }
};

/**
 * Format timestamp to readable date
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
};
