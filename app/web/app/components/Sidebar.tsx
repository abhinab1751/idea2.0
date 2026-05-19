"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  Network,
  AlertTriangle,
  Users,
  Activity,
  Database,
  GitBranch,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Network, label: "Propagation", id: "propagation" },
  { icon: AlertTriangle, label: "Threats", id: "threats", badge: "5" },
  { icon: Activity, label: "Live Feed", id: "feed" },
  { icon: GitBranch, label: "Graph View", id: "graph" },
  { icon: Database, label: "Vendors", id: "vendors" },
  { icon: Users, label: "Team", id: "team" },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-55 shrink-0 flex flex-col bg-cyber-card border-r border-cyber-border">
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans transition-all duration-150 group",
                active
                  ? "bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30"
                  : "text-cyber-dim hover:text-cyber-text hover:bg-white/5 border border-transparent"
              )}
            >
              <Icon className={clsx("w-4 h-4 shrink-0", active ? "text-cyber-accent" : "")} />
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.badge && (
                <span className="badge-critical text-[10px] font-mono px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {active && <ChevronRight className="w-3 h-3 text-cyber-accent" />}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-cyber-border space-y-1">
        <div className="px-3 py-2.5 rounded-lg bg-cyber-accent/5 border border-cyber-accent/20 mb-3">
          <p className="font-mono text-[10px] text-cyber-dim mb-1">SYSTEM STATUS</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyber-green rounded-full blink" />
            <span className="font-mono text-xs text-cyber-green font-semibold">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-cyber-dim hover:text-cyber-text hover:bg-white/5 transition-all text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Help</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-cyber-dim hover:text-cyber-red hover:bg-cyber-red/5 transition-all text-sm">
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
