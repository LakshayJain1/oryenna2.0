"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const USD_TO_INR = 83;

type Currency = "USD" | "INR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usd: number, inr: number) => string;
  formatTotal: (usd: number, inr: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    const saved = localStorage.getItem("currency") as Currency | null;
    if (saved) setCurrency(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const formatPrice = (usd: number, inr: number) => {
    return currency === "INR" ? `₹${inr.toLocaleString("en-IN")}` : `$${usd.toFixed(2)}`;
  };

  const formatTotal = (usd: number, inr: number) => {
    return currency === "INR" ? `₹${inr.toLocaleString("en-IN")}` : `$${usd.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, formatTotal }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}

export { USD_TO_INR };