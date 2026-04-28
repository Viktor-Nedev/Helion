import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  return (
    <div className={cn("inline-flex", className)}>
      {children}
    </div>
  );
}
