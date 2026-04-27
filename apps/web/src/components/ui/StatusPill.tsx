import { cn } from "@/lib/utils";

interface StatusPillProps {
  label: string;
  tone?: "cyan" | "violet" | "emerald" | "rose" | "amber";
}

export function StatusPill({ label, tone = "cyan" }: StatusPillProps) {
  const tones = {
    cyan: "bg-cyan-400/10 text-cyan-200 ring-cyan-400/20",
    violet: "bg-violet-400/10 text-violet-200 ring-violet-400/20",
    emerald: "bg-emerald-400/10 text-emerald-200 ring-emerald-400/20",
    rose: "bg-rose-400/10 text-rose-200 ring-rose-400/20",
    amber: "bg-amber-400/10 text-amber-200 ring-amber-400/20"
  };

  return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1", tones[tone])}>{label}</span>;
}
