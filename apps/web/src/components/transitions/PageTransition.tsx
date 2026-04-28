import { useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const page = root?.firstElementChild as HTMLElement | null;

      if (!root || !page) {
        return;
      }

      const sections = Array.from(page.children).filter((section) => !section.hasAttribute("data-skip-page-transition")) as HTMLElement[];

      if (prefersReducedMotion()) {
        gsap.set(root, { autoAlpha: 1 });
        gsap.set(sections, { autoAlpha: 1, clearProps: "all" });
        return;
      }

      gsap.set(root, { autoAlpha: 1 });

      sections.forEach((section, index) => {
        gsap.fromTo(
          section,
          {
            autoAlpha: 0,
            y: index === 0 ? 20 : 34,
            filter: "blur(12px)"
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            clearProps: "filter,transform",
            scrollTrigger: {
              trigger: section,
              start: index === 0 ? "top bottom" : "top 88%",
              once: true
            }
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}
