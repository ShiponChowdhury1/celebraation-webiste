"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, Check } from "lucide-react";

interface NotificationsViewProps {
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
  notifFilter: string;
  setNotifFilter: (val: string) => void;
  handleMarkAllRead: () => void;
  handleToggleRead: (id: string) => void;
  unreadNotifCount: number;
}

export default function NotificationsView({
  notifications,
  setNotifications,
  notifFilter,
  setNotifFilter,
  handleMarkAllRead,
  handleToggleRead,
  unreadNotifCount
}: NotificationsViewProps) {

  const countNotifReminder = notifications.filter(n => n.type === "reminder").length;
  const countNotifContribution = notifications.filter(n => n.type === "contribution").length;
  const countNotifGoal = notifications.filter(n => n.type === "goal").length;
  const countNotifReveal = notifications.filter(n => n.type === "reveal").length;
  const countNotifSystem = notifications.filter(n => n.type === "system").length;

  const filteredNotifs = notifications.filter(n => {
    if (notifFilter === "all") return true;
    return n.type === notifFilter;
  });

  const unreadNotifs = filteredNotifs.filter(n => !n.read);
  const earlierNotifs = filteredNotifs.filter(n => n.read);

  return (
    <div className="flex-grow overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full font-sans">
      
      {/* Header row */}
      <div className="flex items-center justify-between text-left">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-zinc-955 tracking-tight leading-tight select-none">Notifications</h1>
          <span className="text-xs text-zinc-500 font-light select-none">Manage your account, notifications, and preferences</span>
        </div>
        <Button 
          onClick={handleMarkAllRead}
          variant="outline"
          className="border-purple-200 text-zinc-700 bg-white hover:bg-purple-50 rounded-full px-5 h-[40px] text-xs font-bold transition-all shadow-2xs flex items-center gap-2"
        >
          <Check className="size-4" /> Mark all read
        </Button>
      </div>

      {/* Filter categories list */}
      <div className="flex flex-wrap gap-2.5 select-none border-b border-purple-100/30 pb-4">
        {[
          { filterId: "all", label: "All", count: unreadNotifCount },
          { filterId: "reminder", label: "Reminders", count: countNotifReminder },
          { filterId: "contribution", label: "Contributions", count: countNotifContribution },
          { filterId: "goal", label: "Goals", count: countNotifGoal },
          { filterId: "reveal", label: "Reveals", count: countNotifReveal },
          { filterId: "system", label: "System", count: countNotifSystem },
        ].map((pill) => (
          <button
            key={pill.filterId}
            onClick={() => setNotifFilter(pill.filterId)}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              notifFilter === pill.filterId
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "bg-white text-zinc-550 border border-purple-55 hover:bg-purple-50/50"
            }`}
          >
            <span>{pill.label}</span>
            {pill.filterId === "all" ? (
              unreadNotifCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-extrabold bg-white/20 text-white">
                  {unreadNotifCount}
                </span>
              )
            ) : (
              pill.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  notifFilter === pill.filterId ? "bg-white/20 text-white" : "bg-purple-55 text-zinc-500"
                }`}>{pill.count}</span>
              )
            )}
          </button>
        ))}
      </div>

      {/* Notification Lists segments */}
      <div className="flex flex-col gap-6 text-left">
        
        {/* UNREAD SECTION */}
        {unreadNotifs.length > 0 && (
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold text-zinc-400 tracking-wider select-none uppercase">Unread</h4>
            <div className="flex flex-col gap-3">
              {unreadNotifs.map((n) => (
                <div 
                  key={n.id}
                  onClick={() => handleToggleRead(n.id)}
                  className={`p-5 rounded-2xl cursor-pointer hover:opacity-95 transition-all flex items-start justify-between gap-4 ${n.bgClass}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`size-10 rounded-full flex items-center justify-center text-lg shrink-0 ${n.iconBg}`}>
                      {n.icon}
                    </div>
                    <div className="flex flex-col font-sans">
                      <span className="font-extrabold text-zinc-900 text-[14px] leading-tight">{n.title}</span>
                      <p className="text-[13px] text-zinc-650 font-light mt-1.5 leading-relaxed">{n.message}</p>
                      <span className="text-[10px] text-zinc-400 font-light mt-2">{n.time}</span>
                    </div>
                  </div>
                  <span className="size-2 rounded-full bg-[#7C3AED] shrink-0 mt-2.5 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EARLIER SECTION */}
        <div className="flex flex-col gap-3 mt-2">
          <h4 className="text-xs font-extrabold text-zinc-400 tracking-wider select-none uppercase">Earlier</h4>
          {earlierNotifs.length === 0 && unreadNotifs.length === 0 ? (
            <div className="w-full py-20 bg-white border border-dashed border-purple-100 rounded-3xl flex flex-col items-center justify-center gap-3 text-center">
              <Bell className="size-12 text-zinc-200" />
              <span className="font-bold text-zinc-800 text-sm mt-2">All caught up!</span>
              <p className="text-xs text-zinc-400 font-light max-w-xs leading-relaxed">
                You have no notifications in this category.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {earlierNotifs.map((n) => (
                <div 
                  key={n.id}
                  onClick={() => handleToggleRead(n.id)}
                  className="p-5 rounded-2xl bg-white border border-zinc-100 hover:border-purple-100/50 hover:bg-purple-50/10 transition-all flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`size-10 rounded-full flex items-center justify-center text-lg shrink-0 ${n.iconBg}`}>
                      {n.icon}
                    </div>
                    <div className="flex flex-col font-sans">
                      <span className="font-bold text-zinc-850 text-[14px] leading-tight opacity-80">{n.title}</span>
                      <p className="text-[13px] text-zinc-500 font-light mt-1.5 leading-relaxed">{n.message}</p>
                      <span className="text-[10px] text-zinc-400 font-light mt-2">{n.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
