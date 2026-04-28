import { useRef } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

interface ProgressRingProps {
  value: number;
  label: string;
  size?: number;
}

export function ProgressRing({ value, label, size = 140 }: ProgressRingProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  useGSAP(
    () => {
      if (!rootRef.current || !circleRef.current || !valueRef.current) {
        return;
      }

      if (prefersReducedMotion()) {
        circleRef.current.style.strokeDashoffset = `${offset}`;
        valueRef.current.textContent = `${value}`;
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

      timeline
        .fromTo(circleRef.current, { strokeDashoffset: circumference }, { strokeDashoffset: offset, duration: 1.35, ease: "power3.out" }, 0)
        .to(
          counter,
          {
            value,
            duration: 1.35,
            ease: "power2.out",
            onUpdate: () => {
              if (valueRef.current) {
                valueRef.current.textContent = `${Math.round(counter.value)}`;
              }
            }
          },
          0
        );
    },
    { scope: rootRef, dependencies: [circumference, offset, value] }
  );

  return (
    <div ref={rootRef} className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="14"
          fill="transparent"
        />
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#helio-ring)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
        <defs>
          <linearGradient id="helio-ring" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#4ee9ff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span ref={valueRef} className="text-3xl font-bold text-white">
          0
        </span>
        <span className="text-xs uppercase tracking-[0.28em] text-slate-400">{label}</span>
      </div>
    </div>
  );
}
