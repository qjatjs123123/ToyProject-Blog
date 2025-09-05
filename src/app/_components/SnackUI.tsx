"use client";

import { useAtom } from "jotai";
import { snackMsg } from "@/utils/atoms";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Snackbar() {
  const [msg, setMsg] = useAtom(snackMsg);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!msg) return;

    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [msg]);

  const handleAnimationComplete = () => {
    if (!show) setMsg("");
  };

  return (
    <AnimatePresence>
      {msg && show && (
        <motion.div
          key="snackbar"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-5 rounded shadow-xl z-50 text-sm"
        >
          {msg ? msg.split("_")[0] : ""}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
