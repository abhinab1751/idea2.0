"use client";
import { useState, useCallback } from "react";
import { fetchSimulationResults, simulateAttack, SimulationResult } from "@/services/apiService";

const MOCK_SIMULATION: SimulationResult = {
  attack_origin: "CloudServe",
  attack_path: ["CloudServe", "AuthProvider", "PaymentAPI", "FraudSystem"],
  initial_blast_radius: 14,
  severity_before: "CRITICAL",
  mitigations: ["Isolate CloudServe", "Rotate credentials", "Block lateral movement"],
  reduced_blast_radius: 4,
  severity_after: "MEDIUM",
  risk_reduction_percentage: 71.4,
};

export function useSimulationData() {
  const [simulation, setSimulation] = useState<SimulationResult>(MOCK_SIMULATION);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);

  const loadSimulationResults = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchSimulationResults();
      setSimulation(data);
    } catch {
      setSimulation(MOCK_SIMULATION);
    } finally {
      setLoading(false);
    }
  }, []);

  const runSimulation = useCallback(async (vendor: string, severity: string) => {
    setRunning(true);
    try {
      const result = await simulateAttack({ vendor, severity });
      setSimulation(result);
    } catch {
      setSimulation({ ...MOCK_SIMULATION, attack_origin: vendor });
    } finally {
      setRunning(false);
    }
  }, []);

  return { simulation, loading, running, loadSimulationResults, runSimulation };
}
