"use client";
import { Shield, Wifi, WifiOff, Bell, Settings, RefreshCw } from "lucide-react";
import { formatDate } from "@/utils/formatters";

interface HeaderProps {
  connected: boolean;
  alertCount: number;
  onRefresh: () => void;
}

export default function Header({ connected, alertCount, onRefresh }: HeaderProps) {
  const now = Date.now();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-cyber-border bg-cyber-card">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Shield className="w-8 h-8 text-cyber-accent" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-green rounded-full blink border-2 border-cyber-card" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold tracking-widest text-white">
            GARUDA
          </h1>
          <p className="font-mono text-[10px] text-cyber-dim tracking-widest">
            GRAPH-AWARE AUTONOMOUS RISK UNDERSTANDING & DETECTION ARCHITECTURE
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 font-mono text-xs text-cyber-dim">
        <span className="hidden md:block">{formatDate(now)}</span>
        <span className="text-cyber-border mx-2">|</span>
        <span className="text-cyber-accent font-semibold">
          {new Date(now).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-bg border border-cyber-border">
          {connected ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-cyber-green" />
              <span className="font-mono text-[11px] text-cyber-green">LIVE</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-cyber-dim" />
              <span className="font-mono text-[11px] text-cyber-dim">OFFLINE</span>
            </>
          )}
        </div>

        <button
          onClick={onRefresh}
          className="p-2 rounded-lg border border-cyber-border hover:border-cyber-accent hover:text-cyber-accent transition-colors text-cyber-dim"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <div className="relative p-2 rounded-lg border border-cyber-border hover:border-cyber-accent transition-colors text-cyber-dim hover:text-cyber-accent cursor-pointer">
          <Bell className="w-4 h-4" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyber-red text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
              {alertCount > 9 ? "9+" : alertCount}
            </span>
          )}
        </div>

        <button className="p-2 rounded-lg border border-cyber-border hover:border-cyber-accent transition-colors text-cyber-dim hover:text-cyber-accent">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
