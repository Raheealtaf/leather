"use client";

import { motion } from "framer-motion";

export default function AnimateIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Starts invisible and 20px lower
      whileInView={{ opacity: 1, y: 0 }} // Fades in and slides up when you scroll to it
      viewport={{ once: true }} // Only animates once
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth timing
    >
      {children}
    </motion.div>
  );
}
