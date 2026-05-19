import axios from "axios";
import { API_BASE_URL } from "@/utils/constants";

const api = axios.create({ baseURL: API_BASE_URL, timeout: 10000 });

export interface ThreatEvent {
  event_id: string;
  vendor: string;
  event_type: string;
  severity: string;
  risk_score: number;
  confidence_score: number;
  propagation_probability: number;
  affected_systems: string[];
  recommended_mitigations: string[];
  executive_summary: string;
  timestamp: string;
  source?: string;
}

export interface SimulationResult {
  attack_origin: string;
  attack_path: string[];
  initial_blast_radius: number;
  severity_before: string;
  mitigations: string[];
  reduced_blast_radius: number;
  severity_after: string;
  risk_reduction_percentage: number;
}

export interface GraphNode {
  id: string;
  label: string;
  risk_score: number;
  severity: string;
  type: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export async function fetchLatestThreats(): Promise<ThreatEvent[]> {
  const res = await api.get("/latest-threats");
  return res.data;
}

export async function fetchGraphData(): Promise<GraphData> {
  const res = await api.get("/graph-data");
  return res.data;
}

export async function fetchSimulationResults(): Promise<SimulationResult> {
  const res = await api.get("/simulation-results");
  return res.data;
}

export async function simulateAttack(payload: { vendor: string; severity: string }): Promise<SimulationResult> {
  const res = await api.post("/simulate-attack", payload);
  return res.data;
}
