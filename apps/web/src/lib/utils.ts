export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function riskTone(risk: "low" | "moderate" | "high") {
  if (risk === "low") return "bg-emerald-500/15 text-emerald-300 ring-emerald-400/20";
  if (risk === "high") return "bg-rose-500/15 text-rose-300 ring-rose-400/20";
  return "bg-amber-500/15 text-amber-300 ring-amber-400/20";
}

export function trendTone(trend: "up" | "down" | "stable") {
  if (trend === "up") return "text-emerald-300";
  if (trend === "down") return "text-rose-300";
  return "text-slate-300";
}
