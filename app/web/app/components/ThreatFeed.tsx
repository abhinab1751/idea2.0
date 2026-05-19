"use client";
import { formatTimestamp, truncate } from "@/utils/formatters";
import { SEVERITY_BADGE_CLASS } from "@/utils/constants";
import { ThreatEvent } from "@/services/apiService";
import { ExternalLink, Zap } from "lucide-react";

interface ThreatFeedProps {
  threats: ThreatEvent[];
  loading: boolean;
}

export default function ThreatFeed({ threats, loading }: ThreatFeedProps) {
  return (
    <div className="cyber-card flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-cyber-border">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyber-accent" />
          <h2 className="font-display font-semibold text-cyber-text">Live Threat Feed</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-cyber-green rounded-full blink" />
          <span className="font-mono text-[11px] text-cyber-green">LIVE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="p-6 text-center font-mono text-xs text-cyber-dim">
            <span className="blink">Fetching intelligence...</span>
          </div>
        )}
        {!loading && threats.length === 0 && (
          <div className="p-6 text-center font-mono text-xs text-cyber-dim">No threats detected</div>
        )}
        {threats.map((t, i) => (
          <div
            key={t.event_id}
            className="px-5 py-3.5 border-b border-cyber-border/50 hover:bg-white/3 transition-colors cursor-pointer slide-in-left group"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`${SEVERITY_BADGE_CLASS[t.severity] || "badge-low"} font-mono text-[10px] px-2 py-0.5 rounded shrink-0`}>
                  {t.severity}
                </span>
                <span className="font-semibold text-sm text-cyber-text truncate">{t.vendor}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[10px] text-cyber-dim">{formatTimestamp(t.timestamp)}</span>
                <ExternalLink className="w-3 h-3 text-cyber-dim opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <p className="font-mono text-[11px] text-cyber-dim mb-1.5">{truncate(t.executive_summary, 90)}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-cyber-dim">
                  RISK: <span className="text-cyber-accent font-bold">{t.risk_score.toFixed(1)}</span>
                </span>
                <span className="font-mono text-[10px] text-cyber-dim">
                  PROP: <span className="text-cyber-orange font-bold">{Math.round(t.propagation_probability * 100)}%</span>
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-dim">
                {t.event_type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
