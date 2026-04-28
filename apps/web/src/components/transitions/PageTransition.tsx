import { useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Per-page entrance animation.
 *
 * Each direct child section rises in sequentially with a silky ease curve.
 * The motion is intentionally subtle — a gentle 24 px upward travel + a brief
 * opacity fade — so the content feels like it arrives, not jumps.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const page = root?.firstElementChild as HTMLElement | null;

      if (!root || !page) return;

      const sections = Array.from(page.children).filter(
        (section) => !section.hasAttribute("data-skip-page-transition")
      ) as HTMLElement[];

      if (prefersReducedMotion()) {
        gsap.set(root, { autoAlpha: 1 });
        gsap.set(sections, { autoAlpha: 1, clearProps: "all" });
        return;
      }

      gsap.set(root, { autoAlpha: 1 });

      gsap.fromTo(
        sections,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          ease: "power4.out",
          stagger: {
            each: 0.09,
            from: "start",
          },
          clearProps: "transform",
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}
