import { useRef } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  size: 4 + (index % 4) * 2,
  left: `${(index * 17) % 100}%`,
  top: `${(index * 11) % 100}%`,
  delay: index * 0.2
}));

export function AnimatedBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return;
      }

      const particlesElements = gsap.utils.toArray<HTMLSpanElement>("[data-bg-particle]", rootRef.current);

      particlesElements.forEach((particle, index) => {
        gsap.to(particle, {
          y: -18 - (index % 3) * 5,
          x: index % 2 === 0 ? 10 : -10,
          opacity: 0.82,
          duration: 3.8 + index * 0.18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: particles[index]?.delay ?? 0
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 surface-grid opacity-40" />
      <div className="absolute left-[8%] top-[8%] h-72 w-72 rounded-full bg-cyan-400/15 blur-[120px]" />
      <div className="absolute right-[6%] top-[12%] h-80 w-80 rounded-full bg-violet-500/15 blur-[140px]" />
      <div className="absolute bottom-[4%] left-[28%] h-64 w-64 rounded-full bg-blue-500/15 blur-[120px]" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          data-bg-particle
          className="absolute rounded-full bg-white/60"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top
          }}
        />
      ))}
    </div>
  );
}
