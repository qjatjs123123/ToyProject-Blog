"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type SelectedItem = {
  id: string;
};

type SelectedContextType = {
  selected: SelectedItem[];
  setSelected: (value: SelectedItem[]) => void;
};

const SelectedContext = createContext<SelectedContextType | undefined>(
  undefined
);

interface SelectedProviderProps {
  children: ReactNode;
}

export const SelectedProvider = ({ children }: SelectedProviderProps) => {
  const [selected, setSelected] = useState<SelectedItem[]>([]);

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = (): SelectedContextType => {
  const context = useContext(SelectedContext);
  if (!context) {
    throw new Error("useSelected must be used within SelectedProvider");
  }
  return context;
};
