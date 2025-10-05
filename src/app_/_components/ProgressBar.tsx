"use client";

import { motion } from "framer-motion";
import { useProgress } from "../sign-up/_providers/ProgressProvider";

interface ProgressBarProps {
  height?: number;
  color?: string;
  bgColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({}) => {
  const { progress } = useProgress();

  return (
    <div className="w-full overflow-hidden h-3">
      <div className="w-full h-full rounded-2xl bg-[var(--color-background-alternative)]">
        <motion.div
          className="h-full rounded-2xl bg-[var(--color-primary)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
