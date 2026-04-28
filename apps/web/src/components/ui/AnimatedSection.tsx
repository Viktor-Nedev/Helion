import { useRef, type HTMLAttributes, type ReactNode } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  delay?: number;
}

export function AnimatedSection({ children, className, delay = 0, ...props }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set(sectionRef.current, { autoAlpha: 1, clearProps: "all" });
        return;
      }

      gsap.fromTo(
        sectionRef.current,
        {
          autoAlpha: 0,
          y: 32,
          filter: "blur(12px)"
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          delay,
          ease: "power3.out",
          clearProps: "filter,transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 86%",
            once: true
          }
        }
      );
    },
    { scope: sectionRef, dependencies: [delay] }
  );

  return (
    <section
      ref={sectionRef}
      data-skip-page-transition
      className={cn(className)}
      {...props}
    >
      {children}
    </section>
  );
}
