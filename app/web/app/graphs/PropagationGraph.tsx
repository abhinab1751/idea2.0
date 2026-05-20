"use client";
import { useMemo } from "react";
import type { ReactNode } from "react";

type NodeProps = { data: unknown };
type NodeTypes = Record<string, (props: NodeProps) => ReactNode>;

enum Position {
  Left = "left",
  Right = "right",
}

enum BackgroundVariant {
  Dots = "dots",
}

type HandleProps = {
  type?: string;
  position?: Position;
  style?: React.CSSProperties;
};

function Handle(_props: HandleProps) {
  return null;
}

function Background(props: { color?: string; gap?: number; size?: number; variant?: BackgroundVariant }) {
  return null;
}

function Controls(props: { style?: React.CSSProperties }) {
  return null;
}

function ReactFlow(props: any) {
  const { children } = props as { children?: React.ReactNode };
  return <div className="h-full w-full">{children}</div>;
}
import { SimulationResult } from "@/services/apiService";
import { buildPropagationNodes, buildPropagationEdges } from "./GraphUtils";
import { Network } from "lucide-react";

function CyberNode({ data }: NodeProps) {
  const { label, infected, isOrigin } = data as { label: string; infected: boolean; isOrigin: boolean };

  let borderColor = "#1a2340";
  let bgColor = "#0a0f1e";
  let textColor = "#8892a4";
  let dotColor = "#4a5568";

  if (isOrigin) {
    borderColor = "#ff3b5c";
    bgColor = "rgba(255,59,92,0.1)";
    textColor = "#ff3b5c";
    dotColor = "#ff3b5c";
  } else if (infected) {
    borderColor = "#ff8c00";
    bgColor = "rgba(255,140,0,0.08)";
    textColor = "#ff8c00";
    dotColor = "#ff8c00";
  }

  return (
    <div
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 10,
        padding: "10px 16px",
        minWidth: 120,
        fontFamily: "Ubuntu Mono, monospace",
        boxShadow: infected || isOrigin ? `0 0 16px ${borderColor}40` : "none",
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: dotColor, border: "none", width: 8, height: 8 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
        <span style={{ color: textColor, fontSize: 11, fontWeight: 600 }}>{label}</span>
      </div>
      {(infected || isOrigin) && (
        <div style={{ marginTop: 4, fontSize: 9, color: isOrigin ? "#ff3b5c" : "#ff8c00", letterSpacing: 1 }}>
          {isOrigin ? "⚠ ORIGIN" : "INFECTED"}
        </div>
      )}
      <Handle type="source" position={Position.Right} style={{ background: dotColor, border: "none", width: 8, height: 8 }} />
    </div>
  );
}

const nodeTypes: NodeTypes = { cyber: CyberNode };

interface PropagationGraphProps {
  simulation: SimulationResult;
}

export default function PropagationGraph({ simulation }: PropagationGraphProps) {
  const nodes = useMemo(() => buildPropagationNodes(simulation), [simulation]);
  const edges = useMemo(() => buildPropagationEdges(simulation), [simulation]);

  return (
    <div className="cyber-card h-full flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-cyber-border">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-cyber-accent" />
          <h2 className="font-display font-semibold text-cyber-text">Propagation Graph</h2>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-cyber-red inline-block" />
            <span className="text-cyber-dim">Attack Path</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-cyber-red/20 border border-cyber-red inline-block" />
            <span className="text-cyber-dim">Origin</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-cyber-orange/20 border border-cyber-orange inline-block" />
            <span className="text-cyber-dim">Infected</span>
          </span>
        </div>
      </div>

      <div className="flex-1" style={{ minHeight: 320 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
          style={{ background: "transparent" }}
        >
          <Background
            color="#1a2340"
            gap={24}
            size={1}
            variant={BackgroundVariant.Dots}
          />
          <Controls
            style={{
              background: "#0a0f1e",
              border: "1px solid #1a2340",
              borderRadius: 8,
            }}
          />
        </ReactFlow>
      </div>

      <div className="px-5 py-3 border-t border-cyber-border">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[10px] text-cyber-dim">ATTACK PATH:</span>
          {simulation.attack_path.map((node, i) => (
            <span key={node} className="flex items-center gap-1">
              <span className="font-mono text-[10px] text-cyber-accent font-bold">{node}</span>
              {i < simulation.attack_path.length - 1 && (
                <span className="text-cyber-red text-[10px]">→</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
