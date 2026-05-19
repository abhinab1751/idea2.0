"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import RiskCard from "@/components/RiskCard";
import ThreatFeed from "@/components/ThreatFeed";
import MitigationPanel from "@/components/MitigationPanel";
import ExecutiveSummary from "@/components/ExecutiveSummary";
import ThreatDetails from "@/pages/ThreatDetails";
import PropagationGraph from "@/graphs/PropagationGraph";
import AttackAnimation from "@/graphs/AttackAnimation";
import SeverityChart from "@/charts/SeverityChart";
import TrendChart from "@/charts/TrendChart";
import RiskHeatmap from "@/charts/RiskHeatmap";
import { useThreatFeed } from "@/hooks/useThreatFeed";
import { useSimulationData } from "@/hooks/useSimulationData";
import { ThreatEvent } from "@/services/apiService";
import {
  AlertTriangle,
  Shield,
  Activity,
  Zap,
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedThreat, setSelectedThreat] = useState<ThreatEvent | null>(null);
  const { threats, loading, connected, refresh } = useThreatFeed();
  const { simulation, running, runSimulation } = useSimulationData();

  const criticalCount = threats.filter((t) => t.severity === "CRITICAL").length;
  const avgRisk =
    threats.length > 0
      ? (threats.reduce((s, t) => s + t.risk_score, 0) / threats.length).toFixed(1)
      : "0.0";
  const topThreat = threats[0] || null;
  const totalAffected = threats.reduce((s, t) => s + t.affected_systems.length, 0);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-cyber-bg">
      <Header
        connected={connected}
        alertCount={criticalCount}
        onRefresh={refresh}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Top greeting row like reference image */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Threat Intelligence Center
              </h2>
              <p className="font-sans text-sm text-cyber-dim mt-0.5">
                Real-time vendor risk monitoring · {threats.length} events tracked
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 cyber-card">
              <span className="font-mono text-[11px] text-cyber-dim">THREAT LEVEL:</span>
              <span className={`font-mono text-sm font-bold ${criticalCount > 0 ? "text-cyber-red" : "text-cyber-green"}`}>
                {criticalCount > 0 ? "CRITICAL" : "NOMINAL"}
              </span>
              <span className={`w-2 h-2 rounded-full blink ${criticalCount > 0 ? "bg-cyber-red" : "bg-cyber-green"}`} />
            </div>
          </div>

          {/* Metric cards row - mirrors the reference dashboard layout */}
          <div className="grid grid-cols-4 gap-4">
            <RiskCard
              label="Critical Threats"
              value={criticalCount}
              delta={criticalCount > 0 ? `+${criticalCount} active` : "None active"}
              deltaType={criticalCount > 0 ? "up" : "neutral"}
              icon={<AlertTriangle className="w-5 h-5" />}
              accent="red"
            />
            <RiskCard
              label="Avg Risk Score"
              value={avgRisk}
              delta="Real-time"
              deltaType="neutral"
              icon={<Activity className="w-5 h-5" />}
              accent="accent"
            />
            <RiskCard
              label="Systems at Risk"
              value={totalAffected}
              delta={`${simulation.initial_blast_radius} blast radius`}
              deltaType="up"
              icon={<Zap className="w-5 h-5" />}
              accent="orange"
            />
            <RiskCard
              label="Risk Reduction"
              value={`${simulation.risk_reduction_percentage.toFixed(0)}%`}
              delta="Post-mitigation"
              deltaType="down"
              icon={<Shield className="w-5 h-5" />}
              accent="green"
            />
          </div>

          {/* Executive Summary */}
          <ExecutiveSummary topThreat={topThreat} />

          {/* Attack Animation bar */}
          <AttackAnimation simulation={simulation} />

          {/* Main content: Propagation graph + Threat Feed + Mitigation */}
          <div className="grid grid-cols-12 gap-4">
            {/* Propagation Graph - large center */}
            <div className="col-span-7 h-100">
              <PropagationGraph simulation={simulation} />
            </div>

            {/* Threat Feed - right side */}
            <div className="col-span-3 h-100">
              <ThreatFeed threats={threats} loading={loading} />
            </div>

            {/* Mitigation Panel */}
            <div className="col-span-2 h-100">
              <MitigationPanel
                simulation={simulation}
                running={running}
                onSimulate={runSimulation}
              />
            </div>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-3 gap-4">
            <TrendChart />
            <SeverityChart threats={threats} />
            <RiskHeatmap threats={threats} />
          </div>

          {/* Current Tasks style table like reference image */}
          <div className="cyber-card">
            <div className="flex items-center justify-between px-5 py-4 border-b border-cyber-border">
              <div>
                <h2 className="font-display font-semibold text-cyber-text">Active Vendor Threats</h2>
                <p className="font-mono text-[11px] text-cyber-dim mt-0.5">
                  Done {Math.round((threats.filter(t => t.severity === "LOW").length / Math.max(threats.length, 1)) * 100)}% mitigated
                </p>
              </div>
              <button className="font-mono text-[11px] text-cyber-accent border border-cyber-accent/30 px-3 py-1.5 rounded-lg hover:bg-cyber-accent/10 transition-colors">
                VIEW ALL
              </button>
            </div>

            <div className="divide-y divide-cyber-border/50">
              {threats.slice(0, 5).map((t, i) => (
                <div
                  key={t.event_id}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 cursor-pointer transition-colors fade-in-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => setSelectedThreat(t)}
                >
                  <div className="w-7 h-7 rounded-lg bg-cyber-bg border border-cyber-border flex items-center justify-center shrink-0">
                    <AlertTriangle className={`w-3.5 h-3.5 ${
                      t.severity === "CRITICAL" ? "text-cyber-red" :
                      t.severity === "HIGH" ? "text-cyber-orange" :
                      t.severity === "MEDIUM" ? "text-yellow-400" : "text-cyber-green"
                    }`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-cyber-text truncate">{t.vendor}</p>
                    <p className="font-mono text-[10px] text-cyber-dim truncate">{t.event_type} · {t.source}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      t.severity === "CRITICAL" ? "bg-cyber-red blink" :
                      t.severity === "HIGH" ? "bg-cyber-orange" :
                      t.severity === "MEDIUM" ? "bg-yellow-400" : "bg-cyber-green"
                    }`} />
                    <span className={`font-mono text-xs ${
                      t.severity === "CRITICAL" ? "text-cyber-red" :
                      t.severity === "HIGH" ? "text-cyber-orange" :
                      t.severity === "MEDIUM" ? "text-yellow-400" : "text-cyber-green"
                    }`}>{t.severity}</span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 w-16">
                    <Activity className="w-3 h-3 text-cyber-dim" />
                    <span className="font-mono text-xs text-cyber-dim">{t.risk_score.toFixed(1)}</span>
                  </div>

                  <span className="font-mono text-[10px] text-cyber-dim w-14 text-right shrink-0">
                    {t.affected_systems.length}h sys
                  </span>

                  <button className="text-cyber-dim hover:text-cyber-accent transition-colors ml-2">
                    <span className="font-mono text-base leading-none">···</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {selectedThreat && (
        <ThreatDetails threat={selectedThreat} onClose={() => setSelectedThreat(null)} />
      )}
    </div>
  );
}
