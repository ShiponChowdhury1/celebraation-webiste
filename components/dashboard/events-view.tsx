"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Plus, Search, MoreHorizontal, Eye, Link2, 
  Edit2, Archive, Trash2, CalendarDays, Clock, Users 
} from "lucide-react";

// SVG Circular Progress Ring
const ProgressCircle = ({ percentage }: { percentage: number }) => {
  const radius = 16;
  const strokeWidth = 2.5;
  const circumference = 2 * Math.PI * radius;
  const displayPercentage = Math.min(percentage, 100);
  const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;

  return (
    <div className="relative size-11 flex items-center justify-center shrink-0 select-none">
      <svg className="size-full -rotate-90">
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-purple-100"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-[#7C3AED] transition-all duration-500"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[9.5px] font-extrabold text-[#7C3AED] leading-none">
        {percentage}%
      </span>
    </div>
  );
};

interface EventsViewProps {
  events: any[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedFilter: string;
  setSelectedFilter: (val: string) => void;
  setActiveModal: (modal: string | null) => void;
  setModalEvent: (ev: any) => void;
  setFormTitle: (val: string) => void;
  setFormRecipient: (val: string) => void;
  setFormRelation: (val: string) => void;
  setFormStatus: (val: string) => void;
  setFormDate: (val: string) => void;
  setFormTarget: (val: string) => void;
  activeDropdownId: string | null;
  setActiveDropdownId: (val: string | null) => void;
  handleCopyLink: (title: string) => void;
  setActiveTab: (tab: string) => void;
  setWizardStep: (step: number) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export default function EventsView({
  events,
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  setActiveModal,
  setModalEvent,
  setFormTitle,
  setFormRecipient,
  setFormRelation,
  setFormStatus,
  setFormDate,
  setFormTarget,
  activeDropdownId,
  setActiveDropdownId,
  handleCopyLink,
  setActiveTab,
  setWizardStep,
  dropdownRef
}: EventsViewProps) {

  // Filter calculation variables
  const countAll = events.length;
  const countLive = events.filter(e => e.status === "live").length;
  const countDraft = events.filter(e => e.status === "draft").length;
  const countClosed = events.filter(e => e.status === "closed").length;
  const countRevealed = events.filter(e => e.status === "revealed").length;
  const countArchived = events.filter(e => e.status === "archived").length;

  const filteredEvents = events.filter(ev => {
    const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.relation.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    return matchesSearch && ev.status === selectedFilter;
  });

  return (
    <div className="flex-grow overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full text-left font-sans">
      
      {/* Events Header row */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold text-zinc-955 tracking-tight leading-tight select-none">Events</h1>
          <span className="text-xs text-purple-650 font-bold mt-1 select-none">{countAll} total celebrations</span>
        </div>
        <Button 
          onClick={() => {
            setFormTitle("Emma's 30th Birthday");
            setFormRecipient("Emma Johnson");
            setFormRelation("Sister");
            setFormStatus("live");
            setFormDate("2025-07-15");
            setFormTarget("1000");
            setActiveTab("create-celebration");
            setWizardStep(1);
          }}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-2 cursor-pointer animate-in fade-in"
        >
          <Plus className="size-4.5" /> Create Celebration
        </Button>
      </div>

      {/* Events Search Bar */}
      <div className="w-full relative">
        <input 
          type="text" 
          placeholder="Search by title, recipient, or type..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-purple-100/60 focus:border-[#7C3AED] rounded-full h-[54px] pl-12 pr-6 text-sm text-zinc-905 placeholder:text-zinc-400 outline-none transition-all shadow-2xs"
        />
        <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
      </div>

      {/* Filter categories list */}
      <div className="flex flex-wrap gap-2.5 select-none">
        {[
          { filterId: "all", label: "All", count: countAll },
          { filterId: "live", label: "Live", count: countLive },
          { filterId: "draft", label: "Draft", count: countDraft },
          { filterId: "closed", label: "Closed", count: countClosed },
          { filterId: "revealed", label: "Revealed", count: countRevealed },
          { filterId: "archived", label: "Archived", count: countArchived },
        ].map((pill) => (
          <button
            key={pill.filterId}
            onClick={() => setSelectedFilter(pill.filterId)}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === pill.filterId
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "bg-white text-zinc-550 border border-purple-55 hover:bg-purple-50/50"
            }`}
          >
            <span>{pill.label}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
              selectedFilter === pill.filterId
                ? "bg-white/20 text-white"
                : "bg-purple-50 text-zinc-555"
            }`}>{pill.count}</span>
          </button>
        ))}
      </div>

      {/* Events Grid layout */}
      {filteredEvents.length === 0 ? (
        <div className="w-full py-24 bg-white border border-dashed border-purple-100 rounded-3xl flex flex-col items-center justify-center gap-3 text-center">
          <CalendarDays className="size-12 text-zinc-300" />
          <span className="font-bold text-zinc-800 text-base mt-2">No celebrations found</span>
          <p className="text-xs text-zinc-400 font-light max-w-xs leading-relaxed">
            Try adjusting your search keywords or filter queries.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {filteredEvents.map((ev) => {
            
            // Status Badge Styles
            let badgeStyles = "bg-rose-50 text-[#FF2056] border-rose-100";
            if (ev.status === "closed") badgeStyles = "bg-amber-50 text-amber-600 border-amber-100";
            if (ev.status === "revealed") badgeStyles = "bg-purple-50 text-[#7C3AED] border-purple-100";
            if (ev.status === "draft") badgeStyles = "bg-zinc-50 text-zinc-500 border-zinc-200";
            if (ev.status === "archived") badgeStyles = "bg-slate-50 text-slate-500 border-slate-200";

            // Progress styles
            const displayProgress = Math.min(ev.progress, 100);
            const progressTrackColor = ev.status === "closed" ? "bg-[#009966]" : ev.status === "revealed" ? "bg-gradient-to-r from-orange-500 to-red-500" : ev.status === "archived" ? "bg-[#7C3AED]" : "bg-gradient-to-r from-purple-500 to-pink-500";

            return (
              <div 
                key={ev.id}
                onClick={() => {
                  setModalEvent(ev);
                  setActiveTab("event-detail");
                }}
                className="bg-white border border-purple-55/70 rounded-[24px] p-6 text-left shadow-2xs hover:shadow-xs hover:border-purple-200 transition-all relative flex flex-col gap-5.5 select-none cursor-pointer"
              >
                {/* Top Row: Meta details */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-2xl bg-zinc-50 border border-purple-100/50 flex items-center justify-center text-2xl shrink-0">
                      {ev.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-extrabold text-[#0D0A1A] text-lg leading-snug">{ev.title}</h3>
                      <span className="text-xs text-zinc-400 font-light mt-1">{ev.recipient} · {ev.relation}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 relative">
                    {/* Dropdown Menu block */}
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdownId(activeDropdownId === ev.id ? null : ev.id);
                        }}
                        className="size-9 rounded-full bg-zinc-50 hover:bg-purple-50 text-zinc-400 hover:text-[#7C3AED] flex items-center justify-center border border-zinc-100 transition-colors"
                      >
                        <MoreHorizontal className="size-4.5" />
                      </button>

                      {activeDropdownId === ev.id && (
                        <div 
                          ref={dropdownRef as any}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 top-11 bg-white border border-purple-100 rounded-xl shadow-xl w-[170px] py-1.5 z-30 animate-in fade-in slide-in-from-top-3 duration-200"
                        >
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalEvent(ev);
                              setActiveTab("event-detail");
                              setActiveDropdownId(null);
                            }}
                            className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                          >
                            <Eye className="size-4" /> Preview page
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyLink(ev.title);
                              setActiveDropdownId(null);
                            }}
                            className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                          >
                            <Link2 className="size-4" /> Copy share link
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalEvent(ev);
                              setFormTitle(ev.title);
                              setFormRecipient(ev.recipient);
                              setFormRelation(ev.relation);
                              setFormStatus(ev.status);
                              setFormDate(ev.date);
                              setFormTarget(ev.target.toString());
                              setActiveModal("edit");
                              setActiveDropdownId(null);
                            }}
                            className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                          >
                            <Edit2 className="size-4" /> Edit
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalEvent(ev);
                              setActiveModal("archive");
                              setActiveDropdownId(null);
                            }}
                            className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                          >
                            <Archive className="size-4" /> Archive
                          </button>
                          <div className="border-t border-zinc-100 my-1" />
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalEvent(ev);
                              setActiveModal("delete");
                              setActiveDropdownId(null);
                            }}
                            className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                          >
                            <Trash2 className="size-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>

                    <div onClick={(e) => e.stopPropagation()}>
                      <ProgressCircle percentage={ev.progress} />
                    </div>
                  </div>
                </div>

                {/* Status and target details row */}
                <div className="flex items-center gap-4 text-xs font-medium text-zinc-505 mt-1.5 select-none">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border uppercase flex items-center gap-1.5 select-none ${badgeStyles}`}>
                    {ev.status === "live" && <span className="size-1.5 rounded-full bg-[#FF2056] animate-pulse" />}
                    {ev.status}
                  </span>
                  <span className="flex items-center gap-1 font-light"><Clock className="size-3.5" /> {ev.date}</span>
                  <span className="flex items-center gap-1 font-light"><Users className="size-3.5" /> {ev.contributors}</span>
                </div>

                {/* Progress Bar and raised amounts */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <div className="w-full h-2.5 bg-purple-50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${progressTrackColor} rounded-full transition-all duration-500`} 
                      style={{ width: `${displayProgress}%` }} 
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-light">{ev.contributors} contributors</span>
                    <span className="font-extrabold text-[#0D0A1A] font-mono">
                      ${ev.raised.toLocaleString()} <span className="text-zinc-400 font-normal">/ ${ev.target.toLocaleString()}</span>
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
