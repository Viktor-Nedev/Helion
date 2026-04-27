import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { GlassCard } from "../ui/GlassCard";

export function AnalyticsChart({
  data,
  title,
  description
}: {
  data: Array<{ label: string; value: number; secondary?: number }>;
  title: string;
  description: string;
}) {
  return (
    <GlassCard className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="helio-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4ee9ff" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#4ee9ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(11, 16, 32, 0.92)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18,
                color: "#fff"
              }}
            />
            <Area type="monotone" dataKey="value" stroke="#4ee9ff" fill="url(#helio-area)" strokeWidth={3} />
            <Line type="monotone" dataKey="secondary" stroke="#a78bfa" strokeWidth={2.2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
