import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel mesh-glow relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
