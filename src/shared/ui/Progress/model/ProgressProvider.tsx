"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  MutableRefObject,
} from "react";

type refProps = MutableRefObject<{
  isIncreased: boolean;
  isLocked: boolean;
}>;

type ProgressContextType = {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  handleProgress: (plus: number, result: boolean, ref: refProps) => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState(0);

  const handleProgress = (plus: number, result: boolean, ref: refProps) => {
    console.log(ref.current)
    if (result) {
      if (ref.current.isIncreased === false) return;
      if (ref.current.isLocked === false) return

      setProgress(progress - plus);
      ref.current.isLocked = false;
    } else {
      if (ref.current.isLocked === true) return;
      setProgress(progress + plus);
      ref.current.isLocked = true;
      ref.current.isIncreased = true;
    }
  };

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
