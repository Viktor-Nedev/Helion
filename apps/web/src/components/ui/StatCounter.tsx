import { useRef } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

interface StatCounterProps {
  value: number;
  label: string;
}

export function StatCounter({ value, label }: StatCounterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  function formatValue(currentValue: number) {
    const rounded = Math.round(currentValue);

    if (rounded >= 1000000) {
      return `${(rounded / 1000000).toFixed(1)}M+`;
    }

    if (rounded >= 1000) {
      return `${Math.floor(rounded / 1000)}k+`;
    }

    return `${rounded}`;
  }

  useGSAP(
    () => {
      if (!rootRef.current || !valueRef.current) {
        return;
      }

      if (prefersReducedMotion()) {
        valueRef.current.textContent = formatValue(value);
        return;
      }

      const counter = { value: 0 };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 88%",
          once: true
        }
      });

      timeline.to(counter, {
        value,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          if (valueRef.current) {
            valueRef.current.textContent = formatValue(counter.value);
          }
        }
      });
    },
    { scope: rootRef, dependencies: [value] }
  );

  return (
    <div ref={rootRef} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6">
      <div ref={valueRef} className="text-3xl font-bold text-white md:text-4xl">
        0
      </div>
      <p className="mt-2 text-sm text-slate-300">{label}</p>
    </div>
  );
}
