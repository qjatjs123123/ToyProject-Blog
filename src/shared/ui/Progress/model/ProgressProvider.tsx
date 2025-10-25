"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  MutableRefObject,
  useCallback,
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

  const handleProgress = useCallback(
    (plus: number, result: boolean, ref: refProps) => {
      const store = ref.current;

      if (result) {
        if (!store.isIncreased) return;
        if (!store.isLocked) return;

        setProgress((prev) => prev - plus);
        store.isLocked = false;
      } else {
        if (store.isLocked) return;

        setProgress((prev) => prev + plus);
        store.isLocked = true;
        store.isIncreased = true;
      }
    },
    [setProgress]
  );

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
