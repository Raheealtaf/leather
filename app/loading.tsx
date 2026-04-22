"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    // This wrapper centers the loader perfectly on the screen
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      {/* The actual animated spinner */}
      <motion.div
        className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-black"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "linear",
        }}
      />
    </div>
  );
}
