"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface FadeProps {
  children: ReactNode;
  delay?: number;
}

export default function Fade({ children, delay = 0 }: FadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, delay }}
    >
      {children}
    </motion.div>
  );
}
