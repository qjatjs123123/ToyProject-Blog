"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { StepStatus } from "./type";

type StepContextType = {
  step: StepStatus;
  setStep: (value: StepStatus) => void;
};

const StepContext = createContext<StepContextType | undefined>(undefined);

interface StepProviderProps {
  children: ReactNode;
}

export const StepProvider = ({ children }: StepProviderProps) => {
  const [step, setStep] = useState<StepStatus>("policy");

  return (
    <StepContext.Provider value={{ step, setStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStep = (): StepContextType => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within StepProvider");
  }
  return context;
};
