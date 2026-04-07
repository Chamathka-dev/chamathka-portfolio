"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation"; // 1. Import this

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // 2. Get the current URL

  return (
    <motion.div
      key={pathname} // 3. The magic bullet! This forces a re-render on route change
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}