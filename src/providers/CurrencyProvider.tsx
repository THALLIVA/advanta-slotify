
import * as React from "react";

// Define currency types and conversion rates
type CurrencyCode = "inr" | "usd" | "eur" | "gbp";

type CurrencyInfo = {
  code: CurrencyCode;
  symbol: string;
  name: string;
};

// Average conversion rates - in a real app these would come from an API
const CONVERSION_RATES: Record<CurrencyCode, number> = {
  inr: 1,
  usd: 0.012, // 1 INR = 0.012 USD
  eur: 0.011, // 1 INR = 0.011 EUR
  gbp: 0.0095 // 1 INR = 0.0095 GBP
};

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  inr: { code: "inr", symbol: "₹", name: "Indian Rupee" },
  usd: { code: "usd", symbol: "$", name: "US Dollar" },
  eur: { code: "eur", symbol: "€", name: "Euro" },
  gbp: { code: "gbp", symbol: "£", name: "British Pound" }
};

type CurrencyContextType = {
  currency: CurrencyInfo;
  setCurrency: (currency: CurrencyCode) => void;
  formatCurrency: (amount: string | number) => string;
  convertCurrency: (amount: string | number, from?: CurrencyCode, to?: CurrencyCode) => string;
};

const CurrencyContext = React.createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currencyCode, setCurrencyCode] = React.useState<CurrencyCode>(() => {
    const savedCurrency = localStorage.getItem("currency") as CurrencyCode;
    return (savedCurrency && CURRENCIES[savedCurrency]) ? savedCurrency : "inr";
  });

  const currency = CURRENCIES[currencyCode];

  React.useEffect(() => {
    localStorage.setItem("currency", currencyCode);
  }, [currencyCode]);

  // Convert a number from INR to the target currency
  const convertCurrency = React.useCallback((
    amount: string | number, 
    from: CurrencyCode = "inr",
    to: CurrencyCode = currencyCode
  ): string => {
    // Parse amount to number
    const numericAmount = typeof amount === 'string' 
      ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) 
      : amount;

    if (isNaN(numericAmount)) return currency.symbol + "0";

    // Convert from source to INR (if needed)
    const amountInInr = from === "inr" 
      ? numericAmount 
      : numericAmount / CONVERSION_RATES[from];

    // Convert from INR to target currency
    const convertedAmount = to === "inr" 
      ? amountInInr 
      : amountInInr * CONVERSION_RATES[to];

    return convertedAmount.toFixed(2);
  }, [currency, currencyCode]);

  // Format currency with the appropriate symbol
  const formatCurrency = React.useCallback((
    amount: string | number
  ): string => {
    const convertedAmount = typeof amount === 'string' 
      ? parseFloat(convertCurrency(amount)) 
      : parseFloat(convertCurrency(amount));
    
    if (isNaN(convertedAmount)) return currency.symbol + "0";
    
    // Format with commas for thousands
    return currency.symbol + convertedAmount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }, [convertCurrency, currency]);

  const value = React.useMemo(() => ({
    currency,
    setCurrency: setCurrencyCode,
    formatCurrency,
    convertCurrency
  }), [currency, formatCurrency, convertCurrency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

// Custom hook for using the currency
export const useCurrency = (): CurrencyContextType => {
  const context = React.useContext(CurrencyContext);
  
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  
  return context;
};
