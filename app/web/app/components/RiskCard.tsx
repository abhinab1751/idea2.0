"use client";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import clsx from "clsx";

interface RiskCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  accent?: "accent" | "green" | "red" | "orange";
}

export default function RiskCard({ label, value, delta, deltaType, icon, accent = "accent" }: RiskCardProps) {
  const accentMap = {
    accent: "text-cyber-accent",
    green: "text-cyber-green",
    red: "text-cyber-red",
    orange: "text-cyber-orange",
  };

  const deltaColor = deltaType === "up" ? "text-cyber-red" : deltaType === "down" ? "text-cyber-green" : "text-cyber-dim";

  return (
    <div className="cyber-card p-5 flex items-center gap-4 glow-accent fade-in-up">
      <div className={clsx("p-3 rounded-xl bg-black/5 border border-black/10", accentMap[accent])}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[11px] text-cyber-dim tracking-widest mb-1 uppercase">{label}</p>
        <p className={clsx("font-display text-2xl font-bold", accentMap[accent])}>{value}</p>
        {delta && (
          <div className={clsx("flex items-center gap-1 mt-1 font-mono text-[11px]", deltaColor)}>
            {deltaType === "up" ? <TrendingUp className="w-3 h-3" /> : deltaType === "down" ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            <span>{delta}</span>
          </div>
        )}
      </div>
    </div>
  );
}
