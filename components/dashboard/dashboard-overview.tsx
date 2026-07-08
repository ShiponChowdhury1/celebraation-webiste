"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Plus, UserPlus, Clock, ChevronRight, DollarSign, 
  Gift, Users, Megaphone
} from "lucide-react";

interface DashboardOverviewProps {
  userProfile: { name: string; email: string; avatar: string };
  unreadNotifCount: number;
  netCountAll: number;
  activeEventsCount: number;
  events: any[];
  setActiveTab: (tab: string) => void;
  setWizardStep: (step: number) => void;
  setActiveModal: (modalName: string | null) => void;
  setWTitle: (val: string) => void;
  setWType: (val: string) => void;
  setWRecipient: (val: string) => void;
  setWDate: (val: string) => void;
  setWDescription: (val: string) => void;
  setWTheme: (val: string) => void;
  setWInvitees: (val: string[]) => void;
  setModalEvent: (ev: any) => void;
}

export default function DashboardOverview({
  userProfile,
  unreadNotifCount,
  netCountAll,
  activeEventsCount,
  events,
  setActiveTab,
  setWizardStep,
  setActiveModal,
  setWTitle,
  setWType,
  setWRecipient,
  setWDate,
  setWDescription,
  setWTheme,
  setWInvitees,
  setModalEvent
}: DashboardOverviewProps) {
  
  const activeEvents = events.filter(e => e.status === "live");
  const readyToRevealEvents = events.filter(e => e.status === "closed" && e.progress >= 100);

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full font-sans">
      
      {/* Greeting Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left border-b border-purple-100/50 pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight select-none">
            Good morning, <span className="italic font-serif text-[#7C3AED]">Jamie</span>
          </h1>
          <p className="text-sm text-zinc-505 font-light">
            You have <span className="font-bold text-[#7C3AED]">{activeEvents.length}</span> active WishPools and <span className="font-bold text-[#FF2056]">{unreadNotifCount}</span> unread notifications.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setActiveTab("add-person")}
            variant="outline" 
            className="border-purple-200 text-zinc-700 bg-white hover:bg-purple-50 rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="size-4" /> Add Person
          </Button>
          <Button 
            onClick={() => {
              setWTitle("Sohan Birthday");
              setWType("Birthday");
              setWRecipient("Marcus Chen");
              setWDate("2026-03-23");
              setWDescription("Hope you have the most amazing birthday!");
              setWTheme("Celestial");
              setWInvitees(["mdsohanurrohman310@gmail.com"]);
              setActiveTab("create-celebration");
              setWizardStep(1);
            }}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="size-4.5" /> Create Celebration
          </Button>
        </div>
      </div>

      {/* Alert banner */}
      <div className="w-full bg-[#F9F3FF] border border-purple-100/80 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left shadow-2xs">
        <div className="flex items-start md:items-center gap-3.5">
          <div className="size-10 rounded-full bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0">
            <Clock className="size-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-[#7C3AED] text-sm">Emma's birthday in 23 days</span>
            <span className="text-[13px] text-zinc-550 font-light mt-0.5 leading-relaxed">
              Emma's 30th Birthday is coming up. Your WishPool is at 84% — share the link to hit your goal!
            </span>
          </div>
        </div>
        <button 
          onClick={() => {
            const emmaEvent = events.find(e => e.id === "emma-30");
            if (emmaEvent) {
              setModalEvent(emmaEvent);
              setActiveTab("event-detail");
            } else {
              setActiveTab("events");
            }
          }}
          className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] shrink-0 border border-purple-200 bg-white hover:bg-purple-50 px-4 py-2 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
        >
          View <ChevronRight className="size-3.5" />
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        <div className="w-full h-[147.67px] bg-[#7C3AED] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-purple-600/10 transition-transform hover:scale-[1.02] duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Total Raised</span>
            <div className="size-9 rounded-full bg-white/20 flex items-center justify-center"><DollarSign className="size-4.5" /></div>
          </div>
          <div className="flex flex-col text-left gap-[9.84px]">
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-mono">$5,020</span>
            <span className="text-[11px] font-medium opacity-80">All time</span>
          </div>
        </div>

        <div className="w-full h-[147.67px] bg-[#FF2056] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-rose-600/10 transition-transform hover:scale-[1.02] duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Active Wishpools</span>
            <div className="size-9 rounded-full bg-white/20 flex items-center justify-center"><Gift className="size-4.5" /></div>
          </div>
          <div className="flex flex-col text-left gap-[9.84px]">
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-mono">{activeEvents.length}</span>
            <span className="text-[11px] font-medium opacity-80">In progress</span>
          </div>
        </div>

        <div className="w-full h-[147.67px] bg-[#009966] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-emerald-600/10 transition-transform hover:scale-[1.02] duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Contributors</span>
            <div className="size-9 rounded-full bg-white/20 flex items-center justify-center"><Users className="size-4.5" /></div>
          </div>
          <div className="flex flex-col text-left gap-[9.84px]">
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">104</span>
            <span className="text-[11px] font-medium opacity-80">Total across all</span>
          </div>
        </div>

        <div className="w-full h-[147.67px] bg-[#E17100] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-orange-600/10 transition-transform hover:scale-[1.02] duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Networks</span>
            <div className="size-9 rounded-full bg-white/20 flex items-center justify-center"><Megaphone className="size-4.5" /></div>
          </div>
          <div className="flex flex-col text-left gap-[9.84px]">
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-mono">{netCountAll}</span>
            <span className="text-[11px] font-medium opacity-80">Important people</span>
          </div>
        </div>
      </div>

      {/* Panels Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-7 flex flex-col gap-8 w-full">
          
          {/* Ready to Reveal panel */}
          <div className="bg-white rounded-3xl border border-purple-100/50 shadow-xs overflow-hidden text-left">
            <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#7C3AED]">Ready to Reveal</span>
                <span className="bg-purple-100 text-[#7C3AED] font-bold text-xs size-5 rounded-full flex items-center justify-center">
                  {readyToRevealEvents.length || 1}
                </span>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {readyToRevealEvents.length > 0 ? (
                readyToRevealEvents.map((ev) => (
                  <div key={ev.id} className="flex items-center justify-between bg-zinc-50/50 border border-zinc-100 rounded-2xl p-4 transition-all hover:bg-zinc-50">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-amber-50 border border-amber-205 flex items-center justify-center shrink-0">{ev.icon}</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-zinc-905">{ev.title}</span>
                        <span className="text-[11px] text-zinc-400 font-light mt-0.5">{ev.contributors} contributors • ${ev.raised} raised</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setActiveTab("events")}
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs h-[32px] px-4 rounded-full transition-colors cursor-pointer"
                    >
                      Reveal
                    </Button>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between bg-zinc-50/50 border border-zinc-100 rounded-2xl p-4 transition-all hover:bg-zinc-50">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">🎓</div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-zinc-905">Alex's Graduation</span>
                      <span className="text-[11px] text-zinc-400 font-light mt-0.5">12 contributors • $500 raised</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setActiveTab("events")}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs h-[32px] px-4 rounded-full transition-colors cursor-pointer"
                  >
                    Reveal
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Active Wishpools List */}
          <div className="bg-white rounded-3xl border border-purple-100/50 shadow-xs overflow-hidden text-left">
            <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#7C3AED]">Active WishPools</span>
                <span className="bg-purple-100 text-[#7C3AED] font-bold text-xs size-5 rounded-full flex items-center justify-center">{activeEvents.length}</span>
              </div>
              <button onClick={() => setActiveTab("events")} className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center cursor-pointer">
                All events <ChevronRight className="size-3.5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6">
              {activeEvents.map((ev) => (
                <div 
                  key={ev.id} 
                  onClick={() => {
                    setModalEvent(ev);
                    setActiveTab("event-detail");
                  }}
                  className="flex flex-col gap-3 cursor-pointer hover:border-purple-200 hover:opacity-90 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-[#FAF8FF] border border-purple-100/50 flex items-center justify-center font-bold text-base shrink-0">{ev.icon}</div>
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-zinc-900 leading-tight">{ev.title}</span>
                          <span className="bg-rose-50 text-[#FF2056] text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-100 flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-[#FF2056] animate-ping" /> Live
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-400 font-light mt-0.5">{ev.recipient} • {ev.date}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-zinc-500 font-mono">${ev.raised.toLocaleString()} / ${ev.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${ev.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Contributions */}
          <div className="bg-white rounded-3xl border border-purple-100/50 shadow-xs overflow-hidden text-left">
            <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100/30 flex items-center justify-between">
              <span className="font-bold text-sm text-[#7C3AED]">Recent Contributions</span>
              <button onClick={() => setActiveTab("events")} className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center cursor-pointer">
                View all <ChevronRight className="size-3.5" />
              </button>
            </div>
            <div className="divide-y divide-zinc-100/80">
              {[
                { text: "Happy birthday! 🎉 Wishing you all the joy!", value: "$75", date: "2025-06-12" },
                { text: "You deserve the world, Emma!", value: "$50", date: "2025-06-11" },
                { text: "Thirty looks incredible on you 💜", value: "$100", date: "2025-06-10" },
                { text: "Can't wait to celebrate!", value: "$25", date: "2025-06-09" },
                { text: "Congrats on 30 fabulous years! 🥂", value: "$50", date: "2025-06-08" },
              ].map((item, idx) => (
                <div key={idx} className="p-5 flex items-center justify-between hover:bg-zinc-50/30 transition-colors">
                  <div className="flex flex-col text-left gap-1">
                    <span className="font-bold text-sm text-zinc-800">anonymous</span>
                    <p className="text-xs text-zinc-500 font-light italic">"{item.text}"</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 font-mono">
                    <span className="font-bold text-sm text-zinc-800">{item.value}</span>
                    <span className="text-[10px] text-zinc-400 font-light">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column details */}
        <div className="xl:col-span-5 flex flex-col gap-8 w-full text-left">
          
          {/* Promo Card */}
          <div className="bg-[#7C3AED] text-white rounded-3xl p-8 shadow-lg shadow-purple-600/10 flex flex-col gap-5 relative overflow-hidden select-none">
            <div className="absolute -top-24 -left-24 size-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-widest text-purple-200 uppercase">Why WishPool?</span>
              <h3 className="text-2xl font-extrabold leading-tight">This is more than a page.<br />It's your celebration home.</h3>
            </div>
            <div className="flex flex-col gap-5.5 mt-2">
              <div className="flex items-start gap-4">
                <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Clock className="size-4 text-purple-100" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[14px]">Never miss a birthday</span>
                  <span className="text-[11px] text-purple-100 font-light mt-0.5 leading-relaxed">
                    Reminders sent weeks in advance — automatically.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Users className="size-4 text-purple-100" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[14px]">Build your Celebration Network</span>
                  <span className="text-[11.5px] text-purple-100 font-light mt-0.5 leading-relaxed">
                    Save family & friends. Every date in one place.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Gift className="size-4 text-purple-100" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[14px]">Create unlimited WishPools</span>
                  <span className="text-[11.5px] text-purple-100 font-light mt-0.5 leading-relaxed">
                    Celebrate everyone who matters, year after year.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events Box */}
          <div className="bg-white rounded-3xl border border-purple-100/50 shadow-xs overflow-hidden">
            <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100/30 flex items-center justify-between">
              <span className="font-bold text-sm text-[#7C3AED]">Upcoming Events</span>
              <button onClick={() => setActiveTab("events")} className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center cursor-pointer">
                All events <ChevronRight className="size-3.5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {events.slice(0, 3).map((ev) => (
                <div 
                  key={ev.id} 
                  onClick={() => {
                    setModalEvent(ev);
                    setActiveTab("event-detail");
                  }}
                  className="flex items-center justify-between bg-[#FAF8FF] border border-purple-100/20 hover:border-purple-200 rounded-2xl p-4 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-white flex items-center justify-center text-sm border border-purple-100/50 shrink-0">{ev.icon}</div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-sm text-zinc-900 leading-tight">{ev.title}</span>
                      <span className="text-[10px] text-zinc-400 font-light mt-0.5">{ev.recipient}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 select-none">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                      ev.status === "live" ? "bg-rose-50 text-[#FF2056] border-rose-100" : "bg-zinc-100 text-zinc-500 border-zinc-200"
                    }`}>{ev.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
