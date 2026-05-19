"use client";
import { ThreatEvent } from "@/services/apiService";
import { SEVERITY_COLORS } from "@/utils/constants";
import { Grid3X3 } from "lucide-react";
import clsx from "clsx";

interface RiskHeatmapProps {
  threats: ThreatEvent[];
}

export default function RiskHeatmap({ threats }: RiskHeatmapProps) {
  const topVendors = threats.slice(0, 12);

  return (
    <div className="cyber-card p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Grid3X3 className="w-4 h-4 text-cyber-accent" />
        <h2 className="font-display font-semibold text-cyber-text">Vendor Risk Heatmap</h2>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {topVendors.map((t) => {
          const color = SEVERITY_COLORS[t.severity] || "#4a5568";
          const opacity = 0.15 + t.risk_score / 10 * 0.5;
          return (
            <div
              key={t.event_id}
              className="rounded-lg p-2 border transition-all hover:scale-105 cursor-pointer"
              style={{
                background: `${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}`,
                borderColor: `${color}40`,
              }}
              title={`${t.vendor} — Risk: ${t.risk_score}`}
            >
              <p className="font-mono text-[9px] text-white/70 truncate">{t.vendor}</p>
              <p className="font-display text-sm font-bold" style={{ color }}>
                {t.risk_score.toFixed(1)}
              </p>
            </div>
          );
        })}
        {topVendors.length === 0 &&
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg p-2 border border-cyber-border bg-cyber-bg animate-pulse h-12" />
          ))}
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-cyber-border">
        <div className="flex items-center gap-3">
          {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((s) => (
            <div key={s} className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded" style={{ background: SEVERITY_COLORS[s] }} />
              <span className="font-mono text-[9px] text-cyber-dim">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
