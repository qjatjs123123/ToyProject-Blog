"use client";

import { motion } from "framer-motion";
import { useProgress } from "../model/ProgressProvider";

interface ProgressBarProps {
  height?: number;
  color?: string;
  bgColor?: string;
}

export function ProgressBar({ height = 10, color, bgColor }: ProgressBarProps) {
  const { progress } = useProgress();

  return (
    <div className="w-full overflow-hidden" style={{ height }}>
      <div
        className="w-full h-full rounded-2xl"
        style={{ backgroundColor: bgColor || "var(--color-background-alternative)" }}
      >
        <motion.div
          className="h-full rounded-2xl"
          style={{ backgroundColor: color || "var(--color-primary)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
