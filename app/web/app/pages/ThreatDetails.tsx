"use client";
import { ThreatEvent } from "@/services/apiService";
import { SEVERITY_BADGE_CLASS } from "@/utils/constants";
import { formatTimestamp, formatDate } from "@/utils/formatters";
import { X, AlertTriangle, Clock, Shield, Target } from "lucide-react";

interface ThreatDetailsProps {
  threat: ThreatEvent;
  onClose: () => void;
}

export default function ThreatDetails({ threat, onClose }: ThreatDetailsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="cyber-card w-full max-w-lg mx-4 p-6 fade-in-up">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-cyber-red" />
            <div>
              <h2 className="font-display text-lg font-bold text-cyber-text">{threat.vendor}</h2>
              <span className={`${SEVERITY_BADGE_CLASS[threat.severity]} font-mono text-[10px] px-2 py-0.5 rounded`}>
                {threat.severity}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-cyber-dim hover:text-cyber-text transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-cyber-bg rounded-lg p-3 border border-cyber-border">
            <p className="font-mono text-[10px] text-cyber-dim mb-1">RISK SCORE</p>
            <p className="font-display text-xl font-bold text-cyber-accent">{threat.risk_score.toFixed(1)}</p>
          </div>
          <div className="bg-cyber-bg rounded-lg p-3 border border-cyber-border">
            <p className="font-mono text-[10px] text-cyber-dim mb-1">PROPAGATION</p>
            <p className="font-display text-xl font-bold text-cyber-orange">{Math.round(threat.propagation_probability * 100)}%</p>
          </div>
          <div className="bg-cyber-bg rounded-lg p-3 border border-cyber-border">
            <p className="font-mono text-[10px] text-cyber-dim mb-1">CONFIDENCE</p>
            <p className="font-display text-xl font-bold text-cyber-green">{Math.round(threat.confidence_score * 100)}%</p>
          </div>
          <div className="bg-cyber-bg rounded-lg p-3 border border-cyber-border">
            <p className="font-mono text-[10px] text-cyber-dim mb-1">EVENT TYPE</p>
            <p className="font-mono text-sm font-bold text-cyber-text">{threat.event_type}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-3.5 h-3.5 text-cyber-dim" />
            <p className="font-mono text-[10px] text-cyber-dim">
              {formatDate(threat.timestamp)} at {formatTimestamp(threat.timestamp)} · Source: {threat.source || "Unknown"}
            </p>
          </div>
          <p className="font-sans text-sm text-cyber-text leading-relaxed">{threat.executive_summary}</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-3.5 h-3.5 text-cyber-red" />
            <p className="font-mono text-[10px] text-cyber-dim tracking-widest">AFFECTED SYSTEMS</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {threat.affected_systems.map((s) => (
              <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyber-red/10 border border-cyber-red/30 text-cyber-red">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-3.5 h-3.5 text-cyber-green" />
            <p className="font-mono text-[10px] text-cyber-dim tracking-widest">MITIGATIONS</p>
          </div>
          <ul className="space-y-1.5">
            {threat.recommended_mitigations.map((m, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-mono text-[10px] text-cyber-green mt-0.5">✓</span>
                <span className="font-sans text-xs text-cyber-text">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
