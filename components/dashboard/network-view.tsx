"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  UserPlus, Search, ArrowUpDown, ChevronDown, Check, MoreHorizontal,
  Eye, Edit2, Gift, Trash2, CalendarRange, Clock, Megaphone, Users
} from "lucide-react";

interface NetworkViewProps {
  networkPeople: any[];
  networkSearchQuery: string;
  setNetworkSearchQuery: (val: string) => void;
  networkFilter: string;
  setNetworkFilter: (val: string) => void;
  networkSort: string;
  setNetworkSort: (val: string) => void;
  setActiveModal: (modal: string | null) => void;
  setModalEvent: (ev: any) => void;
  activeDropdownId: string | null;
  setActiveDropdownId: (val: string | null) => void;
  isSortDropdownOpen: boolean;
  setIsSortDropdownOpen: (val: boolean) => void;
  setWTitle: (val: string) => void;
  setWRecipient: (val: string) => void;
  setWType: (val: string) => void;
  setWDescription: (val: string) => void;
  setActiveTab: (tab: string) => void;
  setWizardStep: (step: number) => void;
  setPersonName: (val: string) => void;
  setPersonRole: (val: string) => void;
  setPersonGroup: (val: string) => void;
  setPersonBirthday: (val: string) => void;
  setPersonTags: (val: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  sortDropdownRef: React.RefObject<HTMLDivElement | null>;
}

export default function NetworkView({
  networkPeople,
  networkSearchQuery,
  setNetworkSearchQuery,
  networkFilter,
  setNetworkFilter,
  networkSort,
  setNetworkSort,
  setActiveModal,
  setModalEvent,
  activeDropdownId,
  setActiveDropdownId,
  isSortDropdownOpen,
  setIsSortDropdownOpen,
  setWTitle,
  setWRecipient,
  setWType,
  setWDescription,
  setActiveTab,
  setWizardStep,
  setPersonName,
  setPersonRole,
  setPersonGroup,
  setPersonBirthday,
  setPersonTags,
  dropdownRef,
  sortDropdownRef
}: NetworkViewProps) {

  // Network calculation variables
  const netCountAll = networkPeople.length;
  const netCountFamily = networkPeople.filter(p => p.group === "family").length;
  const netCountFriend = networkPeople.filter(p => p.group === "friend").length;
  const netCountColleague = networkPeople.filter(p => p.group === "colleague").length;
  const netCountPartner = networkPeople.filter(p => p.group === "partner").length;
  const netCountCustom = networkPeople.filter(p => p.group === "custom").length;

  const filteredNetwork = networkPeople.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(networkSearchQuery.toLowerCase()) ||
                          p.relation.toLowerCase().includes(networkSearchQuery.toLowerCase()) ||
                          p.tags.some((tag: string) => tag.toLowerCase().includes(networkSearchQuery.toLowerCase()));
    
    if (networkFilter === "all") return matchesSearch;
    return matchesSearch && p.group === networkFilter;
  }).sort((a, b) => {
    if (networkSort === "name") {
      return a.name.localeCompare(b.name);
    }
    if (networkSort === "recent") {
      return b.id.localeCompare(a.id);
    }
    return a.daysLeft - b.daysLeft;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full text-left font-sans">
      
      {/* Network Header Row */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold text-zinc-955 tracking-tight leading-tight select-none">Celebration Network</h1>
          <span className="text-xs text-purple-650 font-bold mt-1 select-none">{netCountAll} people · Track milestones and create celebrations</span>
        </div>
        <Button 
          onClick={() => {
            setPersonName("");
            setPersonRole("Friend");
            setPersonGroup("friend");
            setPersonBirthday("");
            setPersonTags("");
            setActiveTab("add-person");
          }}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-2 cursor-pointer"
        >
          <UserPlus className="size-4.5" /> Add Person
        </Button>
      </div>

      {/* Network Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        
        {/* Metric Card 1: Total People */}
        <div className="w-full h-[147.67px] bg-[#009966] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-emerald-600/10 transition-transform hover:scale-[1.02] duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Total People</span>
            <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
              <Users className="size-4.5" />
            </div>
          </div>
          <div className="flex flex-col gap-[9.84px]">
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">{netCountAll}</span>
            <span className="text-[11px] font-medium opacity-80">Contacts saved</span>
          </div>
        </div>

        {/* Metric Card 2: Milestones Tracked */}
        <div className="w-full h-[147.67px] bg-[#FF2056] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-rose-600/10 transition-transform hover:scale-[1.02] duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Milestones Tracked</span>
            <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
              <CalendarRange className="size-4.5" />
            </div>
          </div>
          <div className="flex flex-col gap-[9.84px]">
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-mono">14</span>
            <span className="text-[11px] font-medium opacity-80">Dates active</span>
          </div>
        </div>

        {/* Metric Card 3: Coming Up (30d) */}
        <div className="w-full h-[147.67px] bg-[#7C3AED] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-purple-600/10 transition-transform hover:scale-[1.02] duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Coming Up (30d)</span>
            <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
              <Clock className="size-4.5" />
            </div>
          </div>
          <div className="flex flex-col gap-[9.84px]">
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-mono">
              {networkPeople.filter(p => p.daysLeft <= 30).length}
            </span>
            <span className="text-[11px] font-medium opacity-80">Next 30 days</span>
          </div>
        </div>

        {/* Metric Card 4: Past Celebrations */}
        <div className="w-full h-[147.67px] bg-[#E17100] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-orange-600/10 transition-transform hover:scale-[1.02] duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Past Celebrations</span>
            <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
              <Megaphone className="size-4.5" />
            </div>
          </div>
          <div className="flex flex-col gap-[9.84px]">
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-mono">3</span>
            <span className="text-[11px] font-medium opacity-80">Completed registry pools</span>
          </div>
        </div>

      </div>

      {/* Network Filters and Search bar row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between w-full">
        
        {/* Search Bar */}
        <div className="relative flex-grow max-w-2xl">
          <input 
            type="text" 
            placeholder="Search by name, relationship, or tag..." 
            value={networkSearchQuery}
            onChange={(e) => setNetworkSearchQuery(e.target.value)}
            className="w-full bg-white border border-purple-100/60 focus:border-[#7C3AED] rounded-full h-[50px] pl-11 pr-6 text-xs text-zinc-900 placeholder:text-zinc-400 outline-none transition-all shadow-2xs"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
        </div>

        {/* Sort Dropdown */}
        <div className="relative shrink-0" ref={sortDropdownRef as any}>
          <button
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            className="bg-white border border-purple-100/60 hover:border-[#7C3AED] rounded-full px-5 h-[50px] text-xs font-bold text-zinc-700 transition-colors flex items-center gap-2 justify-between min-w-[160px] shadow-2xs cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="size-3.5 text-zinc-400" />
              <span>
                {networkSort === "milestone" ? "Next milestone" : networkSort === "name" ? "Name A-Z" : "Recently added"}
              </span>
            </div>
            <ChevronDown className="size-4 text-zinc-400" />
          </button>

          {isSortDropdownOpen && (
            <div className="absolute right-0 top-13 bg-white border border-purple-100 rounded-xl shadow-xl w-[170px] py-1.5 z-30 animate-in fade-in slide-in-from-top-3 duration-200">
              <button 
                onClick={() => { setNetworkSort("milestone"); setIsSortDropdownOpen(false); }}
                className={`w-full h-[36px] px-3.5 text-left text-xs font-semibold hover:bg-purple-50 hover:text-[#7C3AED] flex items-center justify-between transition-colors cursor-pointer ${
                  networkSort === "milestone" ? "text-[#7C3AED] bg-purple-50/50" : "text-zinc-700"
                }`}
              >
                <span>Next milestone</span>
                {networkSort === "milestone" && <Check className="size-3.5" />}
              </button>
              <button 
                onClick={() => { setNetworkSort("name"); setIsSortDropdownOpen(false); }}
                className={`w-full h-[36px] px-3.5 text-left text-xs font-semibold hover:bg-purple-50 hover:text-[#7C3AED] flex items-center justify-between transition-colors cursor-pointer ${
                  networkSort === "name" ? "text-[#7C3AED] bg-purple-50/50" : "text-zinc-700"
                }`}
              >
                <span>Name A-Z</span>
                {networkSort === "name" && <Check className="size-3.5" />}
              </button>
              <button 
                onClick={() => { setNetworkSort("recent"); setIsSortDropdownOpen(false); }}
                className={`w-full h-[36px] px-3.5 text-left text-xs font-semibold hover:bg-purple-50 hover:text-[#7C3AED] flex items-center justify-between transition-colors cursor-pointer ${
                  networkSort === "recent" ? "text-[#7C3AED] bg-purple-50/50" : "text-zinc-700"
                }`}
              >
                <span>Recently added</span>
                {networkSort === "recent" && <Check className="size-3.5" />}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Filter Category pills row */}
      <div className="flex flex-wrap gap-2.5 select-none border-b border-purple-100/30 pb-4">
        {[
          { filterId: "all", label: "All", count: netCountAll },
          { filterId: "family", label: "Family", count: netCountFamily },
          { filterId: "friend", label: "Friend", count: netCountFriend },
          { filterId: "colleague", label: "Colleague", count: netCountColleague },
          { filterId: "partner", label: "Partner", count: netCountPartner },
          { filterId: "custom", label: "Custom", count: netCountCustom },
        ].map((pill) => (
          <button
            key={pill.filterId}
            onClick={() => setNetworkFilter(pill.filterId)}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              networkFilter === pill.filterId
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "bg-white text-zinc-550 border border-purple-55 hover:bg-purple-50/50"
            }`}
          >
            <span>{pill.label}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
              networkFilter === pill.filterId
                ? "bg-white/20 text-white"
                : "bg-purple-50 text-zinc-550"
            }`}>{pill.count}</span>
          </button>
        ))}
      </div>

      {/* Network Contact Cards Grid */}
      {filteredNetwork.length === 0 ? (
        <div className="w-full py-24 bg-white border border-dashed border-purple-100 rounded-3xl flex flex-col items-center justify-center gap-3 text-center">
          <Users className="size-12 text-zinc-300" />
          <span className="font-bold text-zinc-800 text-base mt-2">No contacts found</span>
          <p className="text-xs text-zinc-400 font-light max-w-xs leading-relaxed">
            Add some friends or family members to start tracking their milestones!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredNetwork.map((p) => {
            
            // Days left countdown color indicator
            const isSoon = p.daysLeft <= 40;
            const countdownBadgeStyles = isSoon 
              ? "bg-amber-50 text-amber-600 border border-amber-100" 
              : "bg-purple-50 text-[#7C3AED] border border-purple-100";

            return (
              <div
                key={p.id}
                onClick={() => {
                  setModalEvent(p);
                  setActiveTab("person-detail");
                }}
                className="bg-white border border-purple-55/70 hover:border-purple-200 rounded-[24px] p-6 text-left shadow-2xs hover:shadow-xs transition-all relative flex flex-col gap-4 select-none cursor-pointer"
              >
                {/* Top profile segment */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <img src={p.avatar} alt={p.name} className="size-12 rounded-full object-cover border border-purple-100 shrink-0" />
                    <div className="flex flex-col text-left">
                      <h3 className="font-extrabold text-[#0D0A1A] text-[15px] leading-tight">{p.name}</h3>
                      <span className="text-[11.5px] text-zinc-400 font-light mt-0.5">{p.relation} · {p.group}</span>
                    </div>
                  </div>

                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdownId(activeDropdownId === p.id ? null : p.id);
                      }}
                      className="size-8.5 rounded-full bg-zinc-50 hover:bg-purple-50 text-zinc-400 hover:text-[#7C3AED] flex items-center justify-center border border-zinc-100 transition-colors"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>

                    {activeDropdownId === p.id && (
                      <div 
                        ref={dropdownRef as any}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-10 bg-white border border-purple-100 rounded-xl shadow-xl w-[170px] py-1.5 z-30 animate-in fade-in slide-in-from-top-3 duration-200"
                      >
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalEvent(p);
                            setActiveTab("person-detail");
                            setActiveDropdownId(null);
                          }}
                          className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                        >
                          <Eye className="size-4" /> View profile
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalEvent(p);
                            setPersonName(p.name);
                            setPersonRole(p.relation);
                            setPersonGroup(p.group);
                            setPersonBirthday("");
                            setPersonTags(p.tags.join(", "));
                            setActiveModal("edit-person");
                            setActiveDropdownId(null);
                          }}
                          className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                        >
                          <Edit2 className="size-4" /> Edit
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setWTitle(`${p.name}'s Celebration`);
                            setWRecipient(p.name);
                            setWType("Birthday");
                            setWDescription(`${p.name}'s milestone is coming up. Help them celebrate!`);
                            setActiveTab("create-celebration");
                            setWizardStep(1);
                            setActiveDropdownId(null);
                          }}
                          className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                        >
                          <Gift className="size-4" /> Create celebration
                        </button>
                        <div className="border-t border-zinc-100 my-1" />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalEvent(p);
                            setActiveModal("remove-person");
                            setActiveDropdownId(null);
                          }}
                          className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                        >
                          <Trash2 className="size-4" /> Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tag list row */}
                <div className="flex flex-wrap gap-1.5 select-none">
                  {p.tags.map((tag: string, tIdx: number) => (
                    <span 
                      key={tIdx}
                      className="bg-[#F8F6FF] border border-purple-55 text-[#7C3AED]/70 text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Milestone visual block */}
                <div className="bg-[#FAF8FF] border border-purple-100/30 rounded-2xl p-3.5 flex items-center justify-between mt-1 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{p.milestoneType.includes("Wedding") ? "💍" : "🎂"}</span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-xs text-zinc-805 leading-tight">{p.milestoneType}</span>
                      <span className="text-[10px] text-zinc-400 font-light mt-0.5">{p.milestoneDate}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full select-none ${countdownBadgeStyles}`}>
                    • {p.daysLeft}d
                  </span>
                </div>

                {/* Bottom row: past activity logs */}
                {p.pastCelebration ? (
                  <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-100 rounded-full px-3 py-1 text-[10px] font-medium text-zinc-400 select-none w-max">
                    <span>{p.pastCelebration.icon}</span>
                    <span>{p.pastCelebration.date}</span>
                  </div>
                ) : (
                  <div className="h-[21px]" />
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
