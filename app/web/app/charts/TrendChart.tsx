"use client";
const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} = require("recharts");
import { TrendingUp } from "lucide-react";

const generateMockTrend = () => {
  const now = Date.now();
  return Array.from({ length: 12 }, (_, i) => ({
    time: new Date(now - (11 - i) * 300000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    risk: parseFloat((4 + Math.random() * 6).toFixed(1)),
    propagation: parseFloat((0.2 + Math.random() * 0.7).toFixed(2)),
  }));
};

export default function TrendChart() {
  const data = generateMockTrend();

  return (
    <div className="cyber-card p-5 h-full relative overflow-hidden">
      <div className="scanning-line" />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyber-accent" />
          <h2 className="font-display font-semibold text-cyber-text">Risk Score Trend</h2>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="w-6 h-0.5 bg-cyber-accent inline-block rounded" />
            <span className="text-cyber-dim">Risk</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-6 h-0.5 bg-cyber-orange inline-block rounded" />
            <span className="text-cyber-dim">Propagation</span>
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2340" />
          <XAxis
            dataKey="time"
            tick={{ fill: "#8892a4", fontSize: 9, fontFamily: "JetBrains Mono" }}
            axisLine={false}
            tickLine={false}
            interval={2}
          />
          <YAxis
            tick={{ fill: "#8892a4", fontSize: 9, fontFamily: "JetBrains Mono" }}
            axisLine={false}
            tickLine={false}
            width={24}
          />
          <Tooltip
            contentStyle={{
              background: "#0a0f1e",
              border: "1px solid #1a2340",
              borderRadius: 8,
              fontFamily: "JetBrains Mono",
              fontSize: 11,
              color: "#e2e8f0",
            }}
            cursor={{ stroke: "#1a2340" }}
          />
          <ReferenceLine y={7} stroke="#ff3b5c" strokeDasharray="4 4" strokeOpacity={0.4} />
          <Line
            type="monotone"
            dataKey="risk"
            stroke="#00d4ff"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#00d4ff", stroke: "#050810" }}
          />
          <Line
            type="monotone"
            dataKey="propagation"
            stroke="#ff8c00"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#ff8c00", stroke: "#050810" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
