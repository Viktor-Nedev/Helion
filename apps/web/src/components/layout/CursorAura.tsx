import { useRef } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export function CursorAura() {
  const auraRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!auraRef.current || prefersReducedMotion()) {
        return;
      }

      const moveX = gsap.quickTo(auraRef.current, "x", { duration: 0.65, ease: "power3.out" });
      const moveY = gsap.quickTo(auraRef.current, "y", { duration: 0.65, ease: "power3.out" });

      const handleMove = (event: MouseEvent) => {
        moveX(event.clientX - 180);
        moveY(event.clientY - 180);
      };

      window.addEventListener("mousemove", handleMove);

      return () => {
        window.removeEventListener("mousemove", handleMove);
      };
    },
    { scope: auraRef }
  );

  return (
    <div
      ref={auraRef}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[360px] w-[360px] rounded-full bg-cyan-400/10 blur-[110px] lg:block"
    />
  );
}
