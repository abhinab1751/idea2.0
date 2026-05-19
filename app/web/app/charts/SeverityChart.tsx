"use client";
declare const require: any;

const {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} = require("recharts");
import { ThreatEvent } from "@/services/apiService";
import { SEVERITY_COLORS } from "@/utils/constants";
import { BarChart2 } from "lucide-react";

interface SeverityChartProps {
  threats: ThreatEvent[];
}

export default function SeverityChart({ threats }: SeverityChartProps) {
  const counts: Record<string, number> = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
  threats.forEach((t) => {
    if (counts[t.severity] !== undefined) counts[t.severity]++;
  });

  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

  return (
    <div className="cyber-card p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-4 h-4 text-cyber-accent" />
        <h2 className="font-display font-semibold text-cyber-text">Severity Distribution</h2>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} barCategoryGap="30%">
          <XAxis
            dataKey="name"
            tick={{ fill: "#8892a4", fontSize: 10, fontFamily: "JetBrains Mono" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#8892a4", fontSize: 10, fontFamily: "JetBrains Mono" }}
            axisLine={false}
            tickLine={false}
            width={20}
          />
          <Tooltip
            contentStyle={{
              background: "#0a0f1e",
              border: "1px solid #1a2340",
              borderRadius: 8,
              fontFamily: "JetBrains Mono",
              fontSize: 11,
              color: "#e2e8f0",
            }}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={SEVERITY_COLORS[entry.name] || "#4a5568"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
