"use client";

import { createContext, useContext, useState, useEffect } from "react";

type FontContextType = {
  font: string;
  setFont: (font: string) => void;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState("sans");

  useEffect(() => {
    const saved = localStorage.getItem("preferredFont");
    if (saved) setFont(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("preferredFont", font);
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      <div className={`font-${font}`}>{children}</div>
    </FontContext.Provider>
  );
}

export function useFont() {
  const ctx = useContext(FontContext);
  if (!ctx) throw new Error("useFont must be used within a FontProvider");
  return ctx;
}
