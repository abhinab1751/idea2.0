"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchLatestThreats, ThreatEvent } from "@/services/apiService";
import { connectLiveAlertsSocket } from "@/services/websocketService";

const MOCK_THREATS: ThreatEvent[] = [
  {
    event_id: "evt-001",
    vendor: "CloudServe",
    event_type: "CVE",
    severity: "CRITICAL",
    risk_score: 9.4,
    confidence_score: 0.91,
    propagation_probability: 0.87,
    affected_systems: ["AuthProvider", "PaymentAPI", "FraudSystem"],
    recommended_mitigations: ["Isolate CloudServe endpoint", "Rotate API keys", "Enable MFA enforcement"],
    executive_summary: "Critical vulnerability in CloudServe infrastructure enables lateral movement across authentication and payment systems.",
    timestamp: new Date().toISOString(),
    source: "NVD CVE",
  },
  {
    event_id: "evt-002",
    vendor: "AuthProvider",
    event_type: "PHISHING",
    severity: "HIGH",
    risk_score: 7.8,
    confidence_score: 0.85,
    propagation_probability: 0.62,
    affected_systems: ["PaymentAPI", "UserDB"],
    recommended_mitigations: ["Block phishing domains", "User awareness training"],
    executive_summary: "Active phishing campaign targeting AuthProvider credentials with high success probability.",
    timestamp: new Date(Date.now() - 180000).toISOString(),
    source: "OpenPhish",
  },
  {
    event_id: "evt-003",
    vendor: "PaymentAPI",
    event_type: "ADVISORY",
    severity: "HIGH",
    risk_score: 7.2,
    confidence_score: 0.78,
    propagation_probability: 0.55,
    affected_systems: ["FraudSystem", "BillingDB"],
    recommended_mitigations: ["Apply CISA patch", "Network segmentation"],
    executive_summary: "CISA advisory on PaymentAPI zero-day exploitation in the wild across financial sector.",
    timestamp: new Date(Date.now() - 420000).toISOString(),
    source: "CISA KEV",
  },
  {
    event_id: "evt-004",
    vendor: "LogisticsHub",
    event_type: "NEWS",
    severity: "MEDIUM",
    risk_score: 5.1,
    confidence_score: 0.67,
    propagation_probability: 0.34,
    affected_systems: ["SupplyChain"],
    recommended_mitigations: ["Monitor vendor communications", "Review SLA agreements"],
    executive_summary: "Ransomware group claims access to LogisticsHub internal systems — verification pending.",
    timestamp: new Date(Date.now() - 900000).toISOString(),
    source: "NewsAPI",
  },
  {
    event_id: "evt-005",
    vendor: "ComplianceDB",
    event_type: "CVE",
    severity: "LOW",
    risk_score: 3.2,
    confidence_score: 0.88,
    propagation_probability: 0.18,
    affected_systems: ["AuditLog"],
    recommended_mitigations: ["Schedule patching window"],
    executive_summary: "Low severity CVE in ComplianceDB third-party library — patch available, no active exploitation.",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    source: "NVD CVE",
  },
];

export function useThreatFeed() {
  const [threats, setThreats] = useState<ThreatEvent[]>(MOCK_THREATS);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const loadThreats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchLatestThreats();
      setThreats(data);
    } catch {
      setThreats(MOCK_THREATS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadThreats();
  }, [loadThreats]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    try {
      cleanup = connectLiveAlertsSocket((data: unknown) => {
        setConnected(true);
        const threat = data as ThreatEvent;
        setThreats((prev) => [threat, ...prev].slice(0, 50));
      });
    } catch {
      setConnected(false);
    }
    return () => cleanup?.();
  }, []);

  return { threats, loading, connected, refresh: loadThreats };
}
