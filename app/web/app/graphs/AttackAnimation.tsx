"use client";
import { useEffect, useState } from "react";
import { SimulationResult } from "@/services/apiService";
import { Zap } from "lucide-react";

interface AttackAnimationProps {
  simulation: SimulationResult;
}

export default function AttackAnimation({ simulation }: AttackAnimationProps) {
  const [step, setStep] = useState(0);
  const path = simulation.attack_path;

  useEffect(() => {
    setStep(0);
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= path.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [simulation, path.length]);

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-cyber-red" />
        <h3 className="font-display font-semibold text-sm text-cyber-text">Attack Spread Animation</h3>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {path.map((node, i) => (
          <div key={node} className="flex items-center gap-2">
            <div
              className="px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-all duration-500"
              style={{
                borderColor: i <= step ? (i === 0 ? "#ff3b5c" : "#ff8c00") : "#1a2340",
                background: i <= step ? (i === 0 ? "rgba(255,59,92,0.1)" : "rgba(255,140,0,0.08)") : "#0a0f1e",
                color: i <= step ? (i === 0 ? "#ff3b5c" : "#ff8c00") : "#4a5568",
                boxShadow: i === step ? `0 0 12px ${i === 0 ? "#ff3b5c" : "#ff8c00"}40` : "none",
              }}
            >
              {node}
            </div>
            {i < path.length - 1 && (
              <span
                className="font-mono text-sm transition-colors duration-300"
                style={{ color: i < step ? "#ff3b5c" : "#1a2340" }}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] text-cyber-dim mt-3">
        {step < path.length - 1 ? (
          <span className="blink">PROPAGATING... ({step + 1}/{path.length})</span>
        ) : (
          <span className="text-cyber-red">✗ BLAST RADIUS REACHED — {simulation.initial_blast_radius} systems affected</span>
        )}
      </p>
    </div>
  );
}
