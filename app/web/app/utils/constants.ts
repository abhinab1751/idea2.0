export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";

export const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: "#111111",
  HIGH: "#262626",
  MEDIUM: "#525252",
  LOW: "#a3a3a3",
};

export const SEVERITY_BADGE_CLASS: Record<string, string> = {
  CRITICAL: "badge-critical",
  HIGH: "badge-high",
  MEDIUM: "badge-medium",
  LOW: "badge-low",
};
