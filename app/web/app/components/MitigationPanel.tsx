"use client";
import { Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { SimulationResult } from "@/services/apiService";
import { SEVERITY_BADGE_CLASS } from "@/utils/constants";

interface MitigationPanelProps {
  simulation: SimulationResult;
  running: boolean;
  onSimulate: (vendor: string, severity: string) => void;
}

export default function MitigationPanel({ simulation, running, onSimulate }: MitigationPanelProps) {
  const reductionPct = simulation.risk_reduction_percentage;

  return (
    <div className="cyber-card p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-4 h-4 text-cyber-green" />
        <h2 className="font-display font-semibold text-cyber-text">Mitigation Panel</h2>
      </div>

      <div className="flex items-center justify-between mb-4 pb-4 border-b border-cyber-border">
        <div className="text-center">
          <p className="font-mono text-[10px] text-cyber-dim mb-1">BLAST RADIUS</p>
          <p className="font-display text-2xl font-bold text-cyber-red">{simulation.initial_blast_radius}</p>
          <p className="font-mono text-[10px] text-cyber-dim">BEFORE</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-1 bg-linear-to-r from-cyber-red via-cyber-orange to-cyber-green rounded" />
          <p className="font-mono text-[10px] text-cyber-green font-bold">-{reductionPct.toFixed(1)}%</p>
        </div>
        <div className="text-center">
          <p className="font-mono text-[10px] text-cyber-dim mb-1">BLAST RADIUS</p>
          <p className="font-display text-2xl font-bold text-cyber-green">{simulation.reduced_blast_radius}</p>
          <p className="font-mono text-[10px] text-cyber-dim">AFTER</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="font-mono text-[10px] text-cyber-dim">SEVERITY CHANGE</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`${SEVERITY_BADGE_CLASS[simulation.severity_before] || "badge-critical"} font-mono text-[10px] px-2 py-0.5 rounded`}>
            {simulation.severity_before}
          </span>
          <span className="text-cyber-dim text-sm">→</span>
          <span className={`${SEVERITY_BADGE_CLASS[simulation.severity_after] || "badge-medium"} font-mono text-[10px] px-2 py-0.5 rounded`}>
            {simulation.severity_after}
          </span>
        </div>
      </div>

      <div className="flex-1 mb-4">
        <p className="font-mono text-[10px] text-cyber-dim mb-2 tracking-widest">RECOMMENDED ACTIONS</p>
        <ul className="space-y-2">
          {simulation.mitigations.map((m, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-cyber-green mt-0.5 shrink-0" />
              <span className="font-sans text-xs text-cyber-text">{m}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => onSimulate(simulation.attack_origin, simulation.severity_before)}
        disabled={running}
        className="w-full py-2.5 rounded-lg bg-cyber-accent/10 border border-cyber-accent/40 text-cyber-accent font-mono text-xs font-semibold hover:bg-cyber-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {running ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            SIMULATING...
          </>
        ) : (
          <>
            <AlertCircle className="w-3.5 h-3.5" />
            RE-RUN SIMULATION
          </>
        )}
      </button>
    </div>
  );
}
