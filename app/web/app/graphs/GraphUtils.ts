type Node = {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    infected: boolean;
    isOrigin: boolean;
  };
  type: string;
};

type Edge = {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  style?: {
    stroke: string;
    strokeWidth: number;
  };
};
import { SimulationResult } from "@/services/apiService";

export function buildPropagationNodes(simulation: SimulationResult): Node[] {
  const path = simulation.attack_path;
  const isInfected = (id: string) => path.includes(id);

  const positions: Record<string, { x: number; y: number }> = {
    CloudServe: { x: 80, y: 200 },
    AuthProvider: { x: 280, y: 100 },
    PaymentAPI: { x: 480, y: 200 },
    FraudSystem: { x: 680, y: 100 },
    LogisticsHub: { x: 280, y: 320 },
    ComplianceDB: { x: 480, y: 320 },
    UserDB: { x: 680, y: 320 },
    BillingDB: { x: 480, y: 420 },
  };

  const allNodes = ["CloudServe", "AuthProvider", "PaymentAPI", "FraudSystem", "LogisticsHub", "ComplianceDB", "UserDB", "BillingDB"];

  return allNodes.map((id) => ({
    id,
    position: positions[id] || { x: Math.random() * 600, y: Math.random() * 400 },
    data: {
      label: id,
      infected: isInfected(id),
      isOrigin: id === simulation.attack_origin,
    },
    type: "cyber",
  }));
}

export function buildPropagationEdges(simulation: SimulationResult): Edge[] {
  const path = simulation.attack_path;
  const baseEdges = [
    { source: "CloudServe", target: "AuthProvider" },
    { source: "CloudServe", target: "LogisticsHub" },
    { source: "AuthProvider", target: "PaymentAPI" },
    { source: "AuthProvider", target: "UserDB" },
    { source: "PaymentAPI", target: "FraudSystem" },
    { source: "PaymentAPI", target: "BillingDB" },
    { source: "LogisticsHub", target: "ComplianceDB" },
    { source: "ComplianceDB", target: "BillingDB" },
  ];

  return baseEdges.map((e, i) => {
    const inPath =
      path.includes(e.source) && path.includes(e.target) &&
      Math.abs(path.indexOf(e.source) - path.indexOf(e.target)) === 1;
    return {
      id: `e-${i}`,
      source: e.source,
      target: e.target,
      animated: inPath,
      style: {
        stroke: inPath ? "#ff3b5c" : "#1a2340",
        strokeWidth: inPath ? 2.5 : 1.5,
      },
    };
  });
}
