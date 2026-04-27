import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorAura() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 90, damping: 20 });

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      mouseX.set(event.clientX - 180);
      mouseY.set(event.clientY - 180);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[360px] w-[360px] rounded-full bg-cyan-400/10 blur-[110px] lg:block"
    />
  );
}
