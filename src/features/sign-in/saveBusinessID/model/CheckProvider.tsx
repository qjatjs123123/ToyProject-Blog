"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type CheckContextType = {
  checked: boolean;
  setChecked: (value: boolean) => void;
};

const CheckContext = createContext<CheckContextType | undefined>(undefined);

interface CheckProviderProps {
  children: ReactNode;
}

export const CheckProvider = ({ children }: CheckProviderProps) => {
  const [checked, setChecked] = useState<boolean>(true);

  return (
    <CheckContext.Provider value={{ checked, setChecked }}>
      {children}
    </CheckContext.Provider>
  );
};

export const useCheck = (): CheckContextType => {
  const context = useContext(CheckContext);
  if (!context) {
    throw new Error("useCheck must be used within CheckProvider");
  }
  return context;
};
