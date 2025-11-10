"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useAutoResetToast } from "../model/useAutoResetToast";

export function Toast() {
  const msg = useAutoResetToast();
  const isShow = msg === '' ? false : true;

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          key="snackbar"
          data-cy="toast"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-5 rounded shadow-xl z-50 text-sm"
        >
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
