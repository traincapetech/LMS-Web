import React, { useState, useEffect } from 'react';
import { getCurrencySettings, setCurrencySettings } from '../utils/helpers';

const currencies = [
  { code: 'USD', locale: 'en-US', label: 'USD ($)' },
  { code: 'INR', locale: 'en-IN', label: 'INR (₹)' },
  { code: 'EUR', locale: 'en-EU', label: 'EUR (€)' },
  { code: 'GBP', locale: 'en-GB', label: 'GBP (£)' }
];

/**
 * Currency selector component that allows users to change the currency format globally
 */
const CurrencySelector = () => {
  const [currentCurrency, setCurrentCurrency] = useState(() => getCurrencySettings().currency);

  useEffect(() => {
    // Initialize with stored settings if available
    const storedCurrency = localStorage.getItem('preferred_currency');
    if (storedCurrency) {
      const currency = currencies.find(c => c.code === storedCurrency);
      if (currency) {
        setCurrencySettings({ currency: currency.code, locale: currency.locale });
        setCurrentCurrency(currency.code);
      }
    }
  }, []);

  const handleCurrencyChange = (e) => {
    const selectedCode = e.target.value;
    const currency = currencies.find(c => c.code === selectedCode);
    
    if (currency) {
      // Update global currency settings
      setCurrencySettings({ currency: currency.code, locale: currency.locale });
      setCurrentCurrency(currency.code);
      
      // Store preference
      localStorage.setItem('preferred_currency', currency.code);
      
      // Reload the page to apply changes everywhere
      // This is a simple approach - for a more sophisticated solution,
      // you could use a context provider to update components without reload
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center">
      <label htmlFor="currency-selector" className="text-sm text-gray-600 mr-2">
        Currency:
      </label>
      <select
        id="currency-selector"
        value={currentCurrency}
        onChange={handleCurrencyChange}
        className="text-sm border border-gray-300 rounded p-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector; 