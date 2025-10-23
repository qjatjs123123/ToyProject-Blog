"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { checkBoxList } from "../config/constants";

export type SelectedItem = {
  id: string;
};

type SelectedContextType = {
  selected: string[];
  setSelected: (value: string[]) => void;
  enabled: boolean;
};

const SelectedContext = createContext<SelectedContextType | undefined>(
  undefined
);

interface SelectedProviderProps {
  children: ReactNode;
}

export const SelectedProvider = ({ children }: SelectedProviderProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const enabled = checkBoxList
    .filter((item) => item.required)
    .map((item) => item.id)
    .every((item) => selected.includes(item));

  return (
    <SelectedContext.Provider value={{ selected, setSelected, enabled }}>
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
