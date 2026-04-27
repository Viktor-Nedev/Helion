import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 text-slate-950 shadow-glow hover:brightness-110",
    secondary:
      "glass-panel text-white hover:border-cyan-300/30 hover:bg-white/10",
    ghost:
      "bg-white/5 text-slate-200 hover:bg-white/10",
    danger:
      "bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/20 hover:bg-rose-500/20"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
