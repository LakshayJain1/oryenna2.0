"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "USD" | "INR";

const STORAGE_KEY = "oryenna-currency";

function detectRegionCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.startsWith("Asia/Kolkata") || tz === "Asia/Calcutta") return "INR";
    const lang = typeof navigator !== "undefined" ? navigator.language || "" : "";
    if (/^en-IN/i.test(lang)) return "INR";
  } catch {
    // fall through to default
  }
  return "USD";
}

interface CurrencyContextType {
  currency: Currency;
  /** Region code for labels, e.g. "USD" / "INR". */
  code: Currency;
  /** Active symbol, "$" / "₹". */
  symbol: string;
  setCurrency: (c: Currency) => void;
  /** Format a region-variable price: format(78, 2400). */
  format: (usd: number, inr?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "USD" || saved === "INR") {
      setCurrencyState(saved);
    } else {
      setCurrencyState(detectRegionCurrency());
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // private mode — session-only currency
    }
  };

  /**
   * Format a region-variable price. Pass both numbers —
   * e.g. format(78, 2400) renders $78.00 in Europe, ₹2,400 in India.
   * When the INR number is omitted it falls back to the USD number.
   */
  const format = (usd: number, inr: number = usd) => {
    if (currency === "INR") {
      return `₹${Math.round(inr).toLocaleString("en-IN")}`;
    }
    return `$${usd.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        code: currency,
        symbol: currency === "INR" ? "₹" : "$",
        setCurrency,
        format,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
