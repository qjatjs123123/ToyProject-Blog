'use client';

import { createContext, useContext, useState, ReactNode, MutableRefObject } from "react";

type ProgressContextType = {
  progress: number;
  setProgress: (value: number) => void;
  handleProgress: (plus : number, result: boolean, isIncrease: MutableRefObject<boolean>) => void
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState(0);

    const handleProgress = (plus : number, result: boolean, isIncrease: MutableRefObject<boolean>) => {
    if (result) {
      if (!isIncrease.current) return;

      setProgress(progress - plus);
      isIncrease.current = false;
    } else {
      if (isIncrease.current) return;

      setProgress(progress + plus);
      isIncrease.current = true;
    }
  }

  return (
    <ProgressContext.Provider value={{ progress, setProgress, handleProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
};
