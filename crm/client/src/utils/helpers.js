/**
 * Currency formatting utility functions
 */

// Default currency settings
let currencySettings = {
  currency: 'USD',  // Default currency code
  locale: 'en-US'   // Default locale for formatting
};

/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {Object} options - Optional formatting options
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, options = {}) => {
  const { currency, locale } = { ...currencySettings, ...options };
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount || 0);
};

/**
 * Update global currency settings
 * @param {Object} settings - New currency settings
 * @param {string} settings.currency - Currency code (e.g., 'USD', 'INR')
 * @param {string} settings.locale - Locale string (e.g., 'en-US', 'en-IN')
 */
export const setCurrencySettings = (settings) => {
  currencySettings = { ...currencySettings, ...settings };
};

/**
 * Get current currency settings
 * @returns {Object} Current currency settings
 */
export const getCurrencySettings = () => {
  return { ...currencySettings };
};
