"use client";
import { Brain, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ThreatEvent } from "@/services/apiService";

interface ExecutiveSummaryProps {
  topThreat: ThreatEvent | null;
}

export default function ExecutiveSummary({ topThreat }: ExecutiveSummaryProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-cyber-purple" />
          <h2 className="font-display font-semibold text-cyber-text">AI Executive Summary</h2>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple">
            GROQ / GEMINI
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-cyber-dim hover:text-cyber-text transition-colors"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {topThreat ? (
        <>
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] text-cyber-dim">PRIMARY THREAT ACTOR:</span>
              <span className="font-mono text-xs text-cyber-accent font-bold">{topThreat.vendor}</span>
            </div>
            <p className="font-sans text-sm text-cyber-text leading-relaxed">
              {topThreat.executive_summary}
            </p>
          </div>

          {expanded && (
            <div className="mt-3 pt-3 border-t border-cyber-border space-y-2 fade-in-up">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-cyber-dim">CONFIDENCE SCORE</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-cyber-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyber-accent rounded-full transition-all"
                      style={{ width: `${topThreat.confidence_score * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-cyber-accent">{Math.round(topThreat.confidence_score * 100)}%</span>
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] text-cyber-dim mb-1.5">AFFECTED SYSTEMS</p>
                <div className="flex flex-wrap gap-1.5">
                  {topThreat.affected_systems.map((s) => (
                    <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-dim">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="font-mono text-xs text-cyber-dim blink">Awaiting AI analysis...</p>
      )}
    </div>
  );
}
