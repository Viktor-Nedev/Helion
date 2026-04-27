import { useEffect, useState } from "react";

interface StatCounterProps {
  value: number;
  label: string;
}

export function StatCounter({ value, label }: StatCounterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 45;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      setDisplay(Math.floor(value * progress));

      if (frame >= totalFrames) {
        window.clearInterval(timer);
        setDisplay(value);
      }
    }, 26);

    return () => window.clearInterval(timer);
  }, [value]);

  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6">
      <div className="text-3xl font-bold text-white md:text-4xl">
        {display >= 1000000 ? `${(display / 1000000).toFixed(1)}M+` : display >= 1000 ? `${Math.floor(display / 1000)}k+` : display}
      </div>
      <p className="mt-2 text-sm text-slate-300">{label}</p>
    </div>
  );
}
