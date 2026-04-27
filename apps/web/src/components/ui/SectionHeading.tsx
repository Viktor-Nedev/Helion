import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="max-w-2xl space-y-3">
        <span className="inline-flex w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
          {eyebrow}
        </span>
        <h2 className="text-3xl font-bold text-white md:text-5xl">{title}</h2>
        <p className="max-w-xl text-sm leading-7 text-slate-300 md:text-base">{description}</p>
      </div>
      {action}
    </div>
  );
}
