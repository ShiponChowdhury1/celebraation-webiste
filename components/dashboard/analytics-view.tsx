"use client";

import React from "react";
import { DollarSign, TrendingUp, Users, Gift } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line 
} from "recharts";

interface AnalyticsViewProps {
  events: any[];
  networkPeople: any[];
  mounted: boolean;
}

export default function AnalyticsView({
  events,
  networkPeople,
  mounted
}: AnalyticsViewProps) {

  const activeEventsCount = events.filter(e => e.status === "live").length;
  const netCountAll = networkPeople.length;

  const chartData = [
    { month: "Jan", contributions: 300, contributors: 8 },
    { month: "Feb", contributions: 450, contributors: 12 },
    { month: "Mar", contributions: 300, contributors: 18 },
    { month: "Apr", contributions: 920, contributors: 22 },
    { month: "May", contributions: 500, contributors: 12 },
    { month: "Jun", contributions: 840, contributors: 14 },
  ];

  return (
    <div className="flex-grow overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full font-sans">
      
      {/* Analytics Header */}
      <div className="text-left">
        <h1 className="text-3xl font-extrabold text-zinc-955 tracking-tight leading-tight select-none">Analytics</h1>
        <span className="text-xs text-zinc-500 font-light mt-1 select-none">Performance across all your celebrations</span>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        
        {/* Card 1: Total raised */}
        <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 text-left flex items-center gap-5 shadow-2xs">
          <div className="size-12 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0">
            <DollarSign className="size-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-zinc-405">Total raised</span>
            <span className="text-2xl font-extrabold text-zinc-955 mt-1 font-mono">$8,420</span>
          </div>
        </div>

        {/* Card 2: Avg per event */}
        <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 text-left flex items-center gap-5 shadow-2xs">
          <div className="size-12 rounded-full bg-emerald-50 text-[#009966] flex items-center justify-center shrink-0">
            <TrendingUp className="size-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-zinc-405">Avg per event</span>
            <span className="text-2xl font-extrabold text-zinc-955 mt-1 font-mono">$703</span>
          </div>
        </div>

        {/* Card 3: Total contributors */}
        <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 text-left flex items-center gap-5 shadow-2xs">
          <div className="size-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="size-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-zinc-405">Total contributors</span>
            <span className="text-2xl font-extrabold text-zinc-955 mt-1">124</span>
          </div>
        </div>

        {/* Card 4: Events created */}
        <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 text-left flex items-center gap-5 shadow-2xs">
          <div className="size-12 rounded-full bg-rose-50 text-[#FF2056] flex items-center justify-center shrink-0">
            <Gift className="size-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-zinc-405">Events created</span>
            <span className="text-2xl font-extrabold text-zinc-955 mt-1">{events.length}</span>
          </div>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Chart 1: Monthly contributions */}
        <div className="bg-white border border-purple-50/70 rounded-3xl p-6 shadow-2xs text-left">
          <h3 className="font-extrabold text-zinc-800 text-[15px] mb-6">Monthly contributions ($)</h3>
          <div className="h-[280px] w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 1000]} ticks={[0, 250, 500, 750, 1000]} />
                  <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0' }} />
                  <Bar dataKey="contributions" fill="#7C3AED" radius={[6, 6, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="size-full bg-zinc-50 rounded-xl animate-pulse" />
            )}
          </div>
        </div>

        {/* Chart 2: Monthly contributors */}
        <div className="bg-white border border-purple-50/70 rounded-3xl p-6 shadow-2xs text-left">
          <h3 className="font-extrabold text-zinc-800 text-[15px] mb-6">Monthly contributors</h3>
          <div className="h-[280px] w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 24]} ticks={[0, 6, 12, 18, 24]} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0' }} />
                  <Line type="monotone" dataKey="contributors" stroke="#FF2056" strokeWidth={2.5} activeDot={{ r: 6 }} dot={{ stroke: '#FF2056', strokeWidth: 3, r: 4, fill: '#FFFFFF' }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="size-full bg-zinc-50 rounded-xl animate-pulse" />
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
