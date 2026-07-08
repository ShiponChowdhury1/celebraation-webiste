"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Eye, Link2, Edit2, Archive, Trash2, CalendarDays, 
  Clock, Users, DollarSign, Gift, Megaphone, X, Copy, Check, Globe, 
  AlertTriangle, Lock, Sparkles, MessageSquare, Send, Share2, 
  Settings, ChevronRight, FileText, Download, CheckCircle2, Play,
  LockKeyhole
} from "lucide-react";

// Mock data for Emma's Birthday contributors and messages
const EMMA_CONTRIBUTORS = [
  { name: "anonymous", amount: 75, message: "Happy birthday! 🎉 Wishing you all the joy!", date: "2025-06-12", status: "Paid" },
  { name: "anonymous", amount: 50, message: "You deserve the world, Emma!", date: "2025-06-11", status: "Paid" },
  { name: "anonymous", amount: 100, message: "Thirty looks incredible on you 💜", date: "2025-06-10", status: "Paid" },
  { name: "anonymous", amount: null, message: "Can't wait to celebrate!", date: "2025-06-09", status: "Pending" },
  { name: "anonymous", amount: 50, message: "Congrats on 30 fabulous years! 🥂", date: "2025-06-08", status: "Paid" },
  { name: "Anonymous", amount: 40, message: "", date: "2025-06-07", status: "Paid" },
  { name: "anonymous", amount: 60, message: "Emma, you're one in a million!", date: "2025-06-06", status: "Paid" },
  { name: "anonymous", amount: 90, message: "So proud of the woman you've become! ✨", date: "2025-06-05", status: "Paid" },
  { name: "anonymous", amount: null, message: "Happy 30th! Make it count!", date: "2025-06-04", status: "Pending" },
  { name: "anonymous", amount: 45, message: "Wishing you the most magical year ahead 🌟", date: "2025-06-03", status: "Paid" },
  { name: "anonymous", amount: null, message: "Thirty and thriving!", date: "2025-06-02", status: "Pending" },
  { name: "anonymous", amount: 80, message: "Can't believe you're 30! Love you loads 💕", date: "2025-06-01", status: "Paid" },
  { name: "anonymous", amount: 35, message: "Here's to you, Emma!", date: "2025-05-31", status: "Paid" },
  { name: "Mia Hoffman", amount: 100, message: "The most generous gift I can give is my love 💜", date: "2025-05-30", status: "Paid" },
];

interface EventDetailViewProps {
  event: any;
  events: any[];
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
  setActiveTab: (tab: string) => void;
  setModalEvent: (ev: any) => void;
  setActiveModal: (modal: string | null) => void;
  handleCopyLink: (title: string) => void;
}

export default function EventDetailView({
  event,
  events,
  setEvents,
  setActiveTab,
  setModalEvent,
  setActiveModal,
  handleCopyLink,
}: EventDetailViewProps) {
  const [subTab, setSubTab] = useState("overview"); // overview, editor, wishpool, contributors, messages, share, reveal
  
  // Page Editor States
  const [localTitle, setLocalTitle] = useState(event.title);
  const [localDesc, setLocalDesc] = useState(event.description || "Emma is turning 30 and we want to make it unforgettable! Join us in contributing to a special birthday fund.");
  const [localIcon, setLocalIcon] = useState(event.icon || "🎂");
  const [isSaved, setIsSaved] = useState(false);

  // Goal Editor States
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [localGoal, setLocalGoal] = useState(event.target.toString());

  // Search Filter State for Contributors Table
  const [searchContrib, setSearchContrib] = useState("");

  // Share States
  const [copiedLink, setCopiedLink] = useState(false);

  // Reveal Tab States
  const [selectedTheme, setSelectedTheme] = useState("Celestial");
  const [showRevealSlideshow, setShowRevealSlideshow] = useState(false);

  // Get data specifically for this event or fallback
  const isEmma = event.id === "emma-30" || event.title.toLowerCase().includes("emma");
  
  // Base contributors array
  const baseContributors = isEmma ? EMMA_CONTRIBUTORS : [
    { name: "anonymous", amount: 50, message: "So happy for you!", date: "2025-06-10", status: "Paid" },
    { name: "anonymous", amount: 100, message: "Wishing you the best! 🌟", date: "2025-06-08", status: "Paid" },
    { name: "anonymous", amount: null, message: "Hope this helps!", date: "2025-06-07", status: "Pending" },
    { name: "anonymous", amount: 25, message: "Cheers! 🥂", date: "2025-06-05", status: "Paid" },
  ];

  const totalContributorsCount = baseContributors.length;
  const paidCount = baseContributors.filter(c => c.status === "Paid").length;
  const pendingCount = baseContributors.filter(c => c.status === "Pending").length;
  const msgCount = baseContributors.filter(c => c.message).length;

  const filteredContributors = baseContributors.filter(c => 
    c.name.toLowerCase().includes(searchContrib.toLowerCase()) ||
    c.message.toLowerCase().includes(searchContrib.toLowerCase())
  );

  const handleCopyPublicLink = () => {
    navigator.clipboard.writeText(`celebr.app/wishpool/${event.id || "emmas-30t"}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSavePageChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents(prev => prev.map(ev => {
      if (ev.id === event.id) {
        return { ...ev, title: localTitle, icon: localIcon };
      }
      return ev;
    }));
    setModalEvent({ ...event, title: localTitle, icon: localIcon, description: localDesc });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSaveGoalChanges = (e: React.FormEvent) => {
    e.preventDefault();
    const newTarget = parseFloat(localGoal) || 1000;
    const newProgress = Math.round((event.raised / newTarget) * 100);
    setEvents(prev => prev.map(ev => {
      if (ev.id === event.id) {
        return { ...ev, target: newTarget, progress: newProgress };
      }
      return ev;
    }));
    setModalEvent({ ...event, target: newTarget, progress: newProgress });
    setIsEditingGoal(false);
  };

  // Status Badge Styling helper
  let badgeStyles = "bg-rose-50 text-[#FF2056] border-rose-100";
  if (event.status === "closed") badgeStyles = "bg-amber-50 text-amber-600 border-amber-100";
  if (event.status === "revealed") badgeStyles = "bg-purple-50 text-[#7C3AED] border-purple-100";
  if (event.status === "draft") badgeStyles = "bg-zinc-50 text-zinc-500 border-zinc-200";
  if (event.status === "archived") badgeStyles = "bg-slate-50 text-slate-500 border-slate-200";

  return (
    <div className="flex-grow overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full text-left font-sans">
      
      {/* 1. Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 select-none">
        <button 
          onClick={() => setActiveTab("events")} 
          className="hover:text-[#7C3AED] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="size-3.5" /> Events
        </button>
        <span>/</span>
        <span className="text-zinc-650">{event.title}</span>
      </div>

      {/* 2. Top Banner Card */}
      <div className="w-full bg-[#7C3AED] rounded-3xl p-8 text-white flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-4.5 z-10">
          <div className="size-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl shrink-0 backdrop-blur-xs select-none">
            {localIcon}
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border flex items-center gap-1.5 select-none bg-white text-[#7C3AED] border-white">
                <span className="size-1.5 rounded-full bg-[#FF2056] animate-pulse" />
                {event.status}
              </span>
              <span className="text-[11px] font-bold text-purple-100 uppercase tracking-wider">{event.type || "Birthday"}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight mt-1.5 font-serif leading-tight">{event.title}</h1>
            <span className="text-xs text-purple-100 font-light mt-1">{event.recipient} · {event.relation} · {event.date}</span>
          </div>
        </div>

        {/* Dynamic Metric Boxes */}
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0 select-none z-10 shrink-0">
          <div className="flex-1 lg:flex-initial min-w-[100px] bg-white/10 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-xs flex flex-col justify-center">
            <span className="text-xl font-extrabold font-mono">${event.raised.toLocaleString()}</span>
            <span className="text-[9px] text-purple-200 uppercase tracking-widest font-bold mt-1.5">Raised</span>
          </div>
          <div className="flex-1 lg:flex-initial min-w-[100px] bg-white/10 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-xs flex flex-col justify-center">
            <span className="text-xl font-extrabold">{totalContributorsCount}</span>
            <span className="text-[9px] text-purple-200 uppercase tracking-widest font-bold mt-1.5">Contributors</span>
          </div>
          <div className="flex-1 lg:flex-initial min-w-[100px] bg-white/10 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-xs flex flex-col justify-center">
            <span className="text-xl font-extrabold">{event.progress}%</span>
            <span className="text-[9px] text-purple-200 uppercase tracking-widest font-bold mt-1.5">Progress</span>
          </div>
        </div>

        {/* Decorative subtle background shape */}
        <div className="absolute -right-20 -bottom-20 size-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      </div>

      {/* 3. Navigation Tabs */}
      <div className="border-b border-purple-100/50 flex items-center gap-1 select-none overflow-x-auto w-full pb-px shrink-0 scrollbar-none">
        {[
          { id: "overview", label: "Overview" },
          { id: "editor", label: "Page Editor" },
          { id: "wishpool", label: "WishPool" },
          { id: "contributors", label: "Contributors" },
          { id: "messages", label: "Messages" },
          { id: "share", label: "Share" },
          { id: "reveal", label: "Reveal" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`px-5 py-3 text-xs font-bold transition-all border-b-2 relative -bottom-[1px] cursor-pointer whitespace-nowrap ${
              subTab === tab.id 
                ? "border-[#7C3AED] text-[#7C3AED]" 
                : "border-transparent text-zinc-400 hover:text-zinc-650"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Tab Content */}
      <div className="w-full flex-grow">
        
        {/* SUBTAB: OVERVIEW */}
        {subTab === "overview" && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            {/* Left Column (col-span-7) */}
            <div className="xl:col-span-7 flex flex-col gap-6 w-full">
              
              {/* Event Status Card */}
              <div className="bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs">
                <div className="flex items-center justify-between border-b border-purple-50/50 pb-4 mb-5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Event Status</span>
                  <button 
                    onClick={() => {
                      setEvents(prev => prev.map(ev => ev.id === event.id ? { ...ev, status: "closed" } : ev));
                      setModalEvent({ ...event, status: "closed" });
                    }}
                    className="border border-rose-100 hover:bg-rose-50 text-[#FF2056] text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lock className="size-3.5" /> Close
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Event date</span>
                    <span className="text-sm font-bold text-zinc-800 mt-1 select-all">{event.date}</span>
                    <span className="text-[10px] text-zinc-400 font-light mt-0.5">Past</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Reveal date</span>
                    <span className="text-sm font-bold text-zinc-800 mt-1">Not scheduled</span>
                    <span className="text-[10px] text-[#7C3AED] font-medium mt-0.5">Set when closing</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Contributors</span>
                    <span className="text-sm font-bold text-zinc-800 mt-1">{totalContributorsCount}</span>
                    <span className="text-[10px] text-zinc-400 font-light mt-0.5">{paidCount} paid</span>
                  </div>
                </div>
              </div>

              {/* WishPool Progress Card */}
              <div className="bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-1.5">
                    <Gift className="size-4 text-[#7C3AED]" /> WishPool Progress
                  </span>
                  <span className="bg-purple-50 text-[#7C3AED] px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-purple-100">{event.progress}%</span>
                </div>

                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-3xl font-extrabold text-zinc-900 font-mono">${event.raised.toLocaleString()}</span>
                  <span className="text-xs text-zinc-400">of ${event.target.toLocaleString()} goal</span>
                </div>

                <div className="w-full h-3.5 bg-purple-50 rounded-full overflow-hidden mb-6">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(event.progress, 100)}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#FAF8FF] border border-purple-50/50 rounded-2xl p-4 text-center">
                    <span className="block text-base font-extrabold text-zinc-800 font-mono">${Math.round(event.raised / (paidCount || 1))}</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mt-1">Average gift</span>
                  </div>
                  <div className="bg-[#FAF8FF] border border-purple-50/50 rounded-2xl p-4 text-center">
                    <span className="block text-base font-extrabold text-zinc-800 font-mono">$100</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mt-1">Largest gift</span>
                  </div>
                  <div className="bg-[#FAF8FF] border border-purple-50/50 rounded-2xl p-4 text-center">
                    <span className="block text-base font-extrabold text-zinc-800 font-mono">${Math.max(event.target - event.raised, 0)}</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mt-1">Remaining</span>
                  </div>
                </div>
              </div>

              {/* Recent Messages Card */}
              <div className="bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs">
                <div className="flex justify-between items-center border-b border-purple-50/50 pb-4 mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-1.5">
                    <MessageSquare className="size-4 text-[#7C3AED]" /> Recent Messages
                    <span className="bg-purple-100 text-[#7C3AED] font-extrabold text-[9px] size-4 rounded-full flex items-center justify-center">{msgCount}</span>
                  </span>
                  <button 
                    onClick={() => setSubTab("messages")} 
                    className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-0.5 cursor-pointer border-none bg-transparent"
                  >
                    View all <ChevronRight className="size-3.5" />
                  </button>
                </div>

                <div className="flex flex-col divide-y divide-purple-50/30">
                  {baseContributors.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-zinc-800 capitalize">{item.name}</span>
                        {item.amount && (
                          <span className="bg-purple-50 text-[#7C3AED] text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-purple-100/60 font-mono">${item.amount}</span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-550 italic font-light">"{item.message || "Contributed without message."}"</p>
                      <span className="text-[10px] text-zinc-400 font-light mt-0.5">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (col-span-5) */}
            <div className="xl:col-span-5 flex flex-col gap-6 w-full">
              
              {/* Public Page Box */}
              <div className="bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs flex flex-col gap-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <Globe className="size-4 text-[#7C3AED]" /> Public Page
                </span>
                
                <div className="w-full relative flex items-center">
                  <input 
                    type="text" 
                    readOnly
                    value={`celebr.app/wishpool/${event.id || "emmas-30t"}`} 
                    className="w-full bg-[#FAF8FF] border border-purple-50 rounded-xl h-[46px] pl-4 pr-20 text-xs font-mono text-zinc-650 outline-none select-all"
                  />
                  <Button
                    onClick={handleCopyPublicLink}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-[38px] px-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[11px] font-bold rounded-lg flex items-center gap-1.5 cursor-pointer border-none"
                  >
                    {copiedLink ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    {copiedLink ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              {/* Description Box */}
              <div className="bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs flex flex-col gap-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Description</span>
                <p className="text-xs text-zinc-600 leading-relaxed font-light select-text">
                  {localDesc}
                </p>
              </div>

              {/* Danger Zone Box */}
              <div className="bg-white border border-[#FF2056]/10 rounded-3xl p-6 text-left shadow-2xs flex flex-col gap-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF2056] flex items-center gap-1.5">
                  <AlertTriangle className="size-4 animate-pulse" /> Danger Zone
                </span>

                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={() => {
                      setEvents(prev => prev.map(ev => ev.id === event.id ? { ...ev, status: "closed" } : ev));
                      setModalEvent({ ...event, status: "closed" });
                    }}
                    variant="outline" 
                    className="w-full border-rose-100 hover:bg-rose-50 text-[#FF2056] font-bold h-[42px] rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="size-4" /> Close WishPool
                  </Button>
                  <Button 
                    onClick={() => {
                      setModalEvent(event);
                      setActiveModal("delete");
                    }}
                    variant="outline" 
                    className="w-full border-rose-100 hover:bg-rose-50 text-[#FF2056] font-bold h-[42px] rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="size-4" /> Delete event
                  </Button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SUBTAB: PAGE EDITOR */}
        {subTab === "editor" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            {/* Form Editor Column */}
            <form onSubmit={handleSavePageChanges} className="lg:col-span-6 bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs flex flex-col gap-5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Page Content</span>
              
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-zinc-700">Title</label>
                <input 
                  type="text" 
                  value={localTitle}
                  onChange={(e) => setLocalTitle(e.target.value)}
                  className="w-full border border-purple-100 focus:border-[#7C3AED] bg-white rounded-xl h-[44px] px-4 text-xs text-zinc-800 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-zinc-700">Description</label>
                <textarea 
                  rows={4}
                  value={localDesc}
                  onChange={(e) => setLocalDesc(e.target.value)}
                  className="w-full border border-purple-100 focus:border-[#7C3AED] bg-white rounded-xl p-4 text-xs text-zinc-800 outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="flex flex-col gap-2 text-left">
                <label className="text-xs font-bold text-zinc-700">Event emoji</label>
                <div className="flex flex-wrap gap-2.5">
                  {["🎂", "💍", "🎓", "🎆", "👶", "🏆", "🎉", "✨"].map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setLocalIcon(emoji)}
                      className={`size-11 rounded-full text-xl flex items-center justify-center border transition-all cursor-pointer ${
                        localIcon === emoji 
                          ? "bg-purple-50 border-[#7C3AED] scale-105" 
                          : "bg-white border-zinc-150 hover:bg-zinc-50"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors border-none mt-2"
              >
                {isSaved ? <CheckCircle2 className="size-4" /> : <SaveIcon className="size-4" />}
                {isSaved ? "Saved changes" : "Save changes"}
              </Button>
            </form>

            {/* Live Phone Mockup Preview Column */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center w-full select-none">
              <div className="w-[320px] bg-white border-[8px] border-zinc-900 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col h-[520px]">
                {/* Speaker/Camera block notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[18px] bg-zinc-900 rounded-b-2xl z-20" />
                
                {/* Browser address header mockup */}
                <div className="h-[44px] bg-zinc-50 border-b border-zinc-100 flex items-center justify-center text-[10px] text-zinc-400 font-mono pt-3 px-4 w-full select-none">
                  celebr.app/wishpool/{event.id || "emmas-30t"}
                </div>

                {/* Simulated Web View Page Scroll */}
                <div className="flex-grow overflow-y-auto bg-gradient-to-b from-purple-50/50 to-white flex flex-col p-4 gap-4 text-left">
                  
                  {/* Purple header card */}
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-5 text-white flex flex-col gap-4 shadow-sm relative overflow-hidden">
                    <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                      {localIcon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-extrabold text-base tracking-tight leading-tight">{localTitle}</h3>
                      <span className="text-[10px] text-purple-200 font-light mt-0.5">{event.recipient} · {event.date}</span>
                    </div>
                  </div>

                  {/* Main text block */}
                  <div className="bg-white border border-purple-50/50 rounded-2xl p-4.5 text-[11px] text-zinc-550 font-light leading-relaxed select-text shadow-2xs">
                    "{localDesc}"
                  </div>

                  {/* Contribute Button */}
                  <Button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold h-[40px] rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm mt-auto pointer-events-none border-none">
                    🎁 Contribute
                  </Button>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB: WISHPOOL */}
        {subTab === "wishpool" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            {/* Goal & Progress Editor */}
            <div className="lg:col-span-6 bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Goal & Progress</span>
                {!isEditingGoal && (
                  <button 
                    onClick={() => setIsEditingGoal(true)}
                    className="text-[#7C3AED] hover:text-[#6D28D9] text-xs font-bold flex items-center gap-1.5 cursor-pointer border-none bg-transparent"
                  >
                    <Edit2 className="size-3.5" /> Edit goal
                  </button>
                )}
              </div>

              {isEditingGoal ? (
                <form onSubmit={handleSaveGoalChanges} className="flex flex-col gap-3 text-left">
                  <label className="text-xs font-bold text-zinc-700">Target Goal ($)</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      value={localGoal}
                      onChange={(e) => setLocalGoal(e.target.value)}
                      className="border border-purple-100 focus:border-[#7C3AED] bg-white rounded-xl h-[42px] px-3.5 text-xs text-zinc-800 outline-none flex-grow"
                    />
                    <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold px-4 h-[42px] rounded-xl cursor-pointer border-none">
                      Save
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setIsEditingGoal(false)}
                      variant="outline" 
                      className="border border-purple-100 text-zinc-550 hover:bg-zinc-50 text-xs font-bold px-4 h-[42px] rounded-xl cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-2.5 select-none">
                  <span className="text-3xl font-extrabold text-[#0D0A1A] font-mono leading-none">
                    ${event.raised.toLocaleString()} <span className="text-zinc-400 font-normal text-sm">raised of ${event.target.toLocaleString()} goal</span>
                  </span>
                  <div className="w-full h-3 bg-purple-50 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${Math.min(event.progress, 100)}%` }} />
                  </div>
                  <span className="text-xs font-bold text-[#7C3AED] mt-1">{event.progress}% funded</span>
                </div>
              )}
            </div>

            {/* WishPool Settings Box */}
            <div className="lg:col-span-6 bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs flex flex-col gap-5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">WishPool settings</span>
              
              <div className="flex flex-col divide-y divide-purple-50/40 text-xs select-none">
                <div className="py-3 flex justify-between items-center">
                  <span className="text-zinc-500">Minimum contribution</span>
                  <span className="font-bold text-zinc-800 font-mono">$5.00</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-zinc-500">Allow anonymous contributions</span>
                  <span className="font-bold text-zinc-800">Yes</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-zinc-500">Show contributor names publicly</span>
                  <span className="font-bold text-zinc-800">No</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-zinc-500">Stripe payout method</span>
                  <span className="font-bold text-zinc-800 font-mono">Bank account ****4521</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-zinc-500">Platform fee</span>
                  <span className="font-bold text-[#7C3AED]">3%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB: CONTRIBUTORS */}
        {subTab === "contributors" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Top row of mini statistics cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 select-none">
              <div className="bg-white border border-purple-50/55 rounded-2xl p-4.5 text-left shadow-2xs">
                <span className="text-2xl font-extrabold text-zinc-900 leading-none">{totalContributorsCount}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mt-2">Total contributors</span>
              </div>
              <div className="bg-white border border-purple-50/55 rounded-2xl p-4.5 text-left shadow-2xs">
                <span className="text-2xl font-extrabold text-emerald-600 leading-none">{paidCount}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mt-2">Paid</span>
              </div>
              <div className="bg-white border border-purple-50/55 rounded-2xl p-4.5 text-left shadow-2xs">
                <span className="text-2xl font-extrabold text-amber-500 leading-none">{pendingCount}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mt-2">Pending</span>
              </div>
              <div className="bg-white border border-purple-50/55 rounded-2xl p-4.5 text-left shadow-2xs">
                <span className="text-2xl font-extrabold text-[#7C3AED] leading-none">{msgCount}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mt-2">With message</span>
              </div>
            </div>

            {/* Table wrapper block */}
            <div className="bg-white border border-purple-50 rounded-3xl p-6 shadow-2xs flex flex-col gap-5.5">
              <div className="flex flex-col sm:flex-row justify-between gap-4 items-stretch sm:items-center">
                <input 
                  type="text" 
                  placeholder="Search contributors..." 
                  value={searchContrib}
                  onChange={(e) => setSearchContrib(e.target.value)}
                  className="bg-[#FAF8FF] border border-purple-50 focus:border-[#7C3AED] rounded-full h-[40px] px-5 text-xs text-zinc-800 outline-none max-w-[280px]"
                />
                <Button className="border border-purple-200 text-[#7C3AED] hover:bg-purple-50 bg-white font-semibold text-xs h-[40px] px-4 rounded-full flex items-center gap-1.5 cursor-pointer">
                  <FileText className="size-4" /> Export CSV
                </Button>
              </div>

              {/* Table rendering */}
              <div className="overflow-x-auto w-full border border-purple-50 rounded-2xl">
                <table className="min-w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-purple-50/30 text-zinc-550 font-bold uppercase border-b border-purple-50/60">
                      <th className="py-3.5 px-4.5">Contributor</th>
                      <th className="py-3.5 px-4.5">Amount</th>
                      <th className="py-3.5 px-4.5">Message</th>
                      <th className="py-3.5 px-4.5">Date</th>
                      <th className="py-3.5 px-4.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50/20 font-light text-zinc-650">
                    {filteredContributors.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-10 text-center font-bold text-zinc-400 bg-white">
                          No matching contributors found.
                        </td>
                      </tr>
                    ) : (
                      filteredContributors.map((contrib, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50/30 transition-colors">
                          <td className="py-3.5 px-4.5 font-bold text-zinc-900 capitalize">{contrib.name}</td>
                          <td className="py-3.5 px-4.5 font-mono font-bold text-zinc-800">{contrib.amount ? `$${contrib.amount}` : "—"}</td>
                          <td className="py-3.5 px-4.5 max-w-[200px] truncate select-all">{contrib.message || "—"}</td>
                          <td className="py-3.5 px-4.5 font-light">{contrib.date}</td>
                          <td className="py-3.5 px-4.5">
                            {contrib.status === "Paid" ? (
                              <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full text-[9px] font-bold">Paid</span>
                            ) : (
                              <span className="text-zinc-400">—</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB: MESSAGES */}
        {subTab === "messages" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Stats Counter */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 select-none">
              <div className="bg-white border border-purple-50/50 rounded-2xl p-4.5 text-left shadow-2xs">
                <span className="text-2xl font-extrabold text-zinc-900 leading-none">{totalContributorsCount}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mt-2">Total contributors</span>
              </div>
              <div className="bg-white border border-purple-50/50 rounded-2xl p-4.5 text-left shadow-2xs">
                <span className="text-2xl font-extrabold text-emerald-600 leading-none">{paidCount}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mt-2">Paid</span>
              </div>
              <div className="bg-white border border-purple-50/50 rounded-2xl p-4.5 text-left shadow-2xs">
                <span className="text-2xl font-extrabold text-amber-500 leading-none">{pendingCount}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mt-2">Pending</span>
              </div>
              <div className="bg-white border border-purple-50/50 rounded-2xl p-4.5 text-left shadow-2xs">
                <span className="text-2xl font-extrabold text-[#7C3AED] leading-none">{msgCount}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mt-2">With message</span>
              </div>
            </div>

            <div className="flex justify-between items-center select-none border-b border-purple-50/50 pb-2.5">
              <span className="text-xs font-bold text-zinc-700">{msgCount} messages from contributors</span>
              <Button className="border border-purple-200 text-[#7C3AED] hover:bg-purple-50 bg-white font-semibold text-xs h-[32px] px-3.5 rounded-full flex items-center gap-1 cursor-pointer">
                <Download className="size-3.5" /> Export
              </Button>
            </div>

            {/* Grid of Message Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
              {baseContributors.filter(c => c.message).map((contrib, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-purple-50 rounded-2xl p-5 text-left shadow-2xs flex flex-col gap-3 select-text"
                >
                  <div className="flex justify-between items-center border-b border-purple-50/20 pb-2.5">
                    <span className="font-bold text-xs text-zinc-800 capitalize select-none">{contrib.name}</span>
                    <div className="flex items-center gap-2 select-none">
                      {contrib.amount && (
                        <span className="bg-purple-50 text-[#7C3AED] text-[9.5px] font-extrabold px-2 py-0.5 rounded border border-purple-100/60 font-mono">${contrib.amount}</span>
                      )}
                      <span className="text-[9px] text-zinc-400 font-light">{contrib.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-650 italic font-light leading-relaxed">
                    "{contrib.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB: SHARE */}
        {subTab === "share" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="bg-white border border-purple-50 rounded-[24px] p-8 max-w-2xl w-full shadow-2xs text-left">
              <span className="text-sm font-bold text-zinc-900">Public WishPool link</span>
              
              <div className="w-full bg-[#FAF8FF] border border-purple-100/60 focus-within:border-[#7C3AED] rounded-2xl h-[54px] flex items-center justify-between pl-4 pr-3.5 mt-4 transition-all">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Link2 className="size-4 text-[#7C3AED]" />
                  <span className="text-xs font-mono text-zinc-600 select-all">
                    {`celebr.app/wishpool/${event.id === "emma-30" || event.title.toLowerCase().includes("emma") ? "emmas-30th" : (event.id || "celebration")}`}
                  </span>
                </div>
                <Button
                  onClick={handleCopyPublicLink}
                  className="bg-white border border-purple-200 text-[#7C3AED] hover:bg-purple-50 h-[36px] px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-3xs"
                >
                  {copiedLink ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copiedLink ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB: REVEAL */}
        {subTab === "reveal" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="bg-white border border-purple-55 rounded-[24px] p-8 max-w-2xl w-full shadow-2xs text-center flex flex-col items-center justify-center min-h-[260px]">
              {event.status === "live" || event.status === "draft" ? (
                <div className="flex flex-col items-center justify-center text-center max-w-md w-full">
                  <div className="size-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-450 mb-4.5 shadow-3xs">
                    <LockKeyhole className="size-5 text-zinc-500" />
                  </div>
                  <h3 className="text-[15px] font-extrabold text-zinc-900">WishPool must be closed first</h3>
                  <p className="text-[12px] text-zinc-400 font-light mt-2 leading-relaxed">
                    Close the WishPool to stop accepting contributions, then send the reveal to {event.recipient}.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center max-w-md w-full animate-in zoom-in-95 duration-200">
                  <span className="text-4xl mb-4.5 select-none animate-bounce">🎉</span>
                  <h3 className="text-[15px] font-extrabold text-zinc-900">Ready to reveal!</h3>
                  <p className="text-[12px] text-zinc-400 font-light mt-2 leading-relaxed">
                    Send {event.recipient} a magical reveal experience with all {totalContributorsCount} messages and the total of ${event.raised.toLocaleString()}.
                  </p>
                  <Button 
                    onClick={() => setShowRevealSlideshow(true)}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold h-[44px] px-6 rounded-2xl text-xs transition-all shadow-md shadow-purple-600/20 cursor-pointer mt-5 border-none"
                  >
                    ✨ Send Reveal to {event.recipient.split(" ")[0]}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* 5. SLIDESHOW INTERACTIVE PREVIEW MODAL */}
      {showRevealSlideshow && (
        <div className="fixed inset-0 bg-black/95 z-55 flex items-center justify-center select-none animate-in fade-in duration-300">
          {/* Confetti decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute left-[10%] top-[20%] text-5xl animate-bounce">🎉</div>
            <div className="absolute right-[12%] top-[15%] text-5xl animate-bounce duration-1000">🎂</div>
            <div className="absolute left-[15%] bottom-[25%] text-4xl animate-pulse">✨</div>
            <div className="absolute right-[20%] bottom-[20%] text-5xl animate-bounce">🎈</div>
          </div>

          <button 
            type="button"
            onClick={() => setShowRevealSlideshow(false)}
            className="absolute top-6 right-6 text-white/50 hover:text-white p-2.5 hover:bg-white/10 rounded-full transition-colors z-30 cursor-pointer border-none bg-transparent"
          >
            <X className="size-7" />
          </button>

          {/* Centered Slideshow Content */}
          <div className="max-w-xl w-full p-8 text-center text-white flex flex-col items-center gap-6 animate-in zoom-in-90 duration-300">
            <span className="text-xs font-bold text-indigo-300 tracking-widest uppercase mb-1">Interactive Reveal Slideshow</span>
            <div className="size-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-4xl shadow-lg mb-2">
              {localIcon}
            </div>

            <div className="flex flex-col gap-1 text-center">
              <h2 className="text-4xl font-extrabold tracking-tight font-serif">{event.recipient}'s</h2>
              <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 font-serif leading-none mt-1">{localTitle}</h1>
            </div>

            {/* Total Funds Screen */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6.5 w-full flex flex-col gap-3 mt-4.5 shadow-2xl backdrop-blur-sm">
              <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Total WishPool Raised</span>
              <span className="text-6xl font-extrabold text-white font-mono leading-none tracking-tight">${event.raised.toLocaleString()}</span>
              <span className="text-xs text-[#7C3AED] font-bold bg-[#FAF8FF] px-3.5 py-1 rounded-full w-max mx-auto mt-2 shadow-sm select-none">
                {totalContributorsCount} contributors contributed!
              </span>
            </div>

            <p className="text-zinc-400 text-xs font-light max-w-sm mt-3 leading-relaxed">
              "Every message, wish and gift are now unlocked! Hope you have the most beautiful day."
            </p>

            <Button 
              onClick={() => setShowRevealSlideshow(false)}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] px-6 rounded-full text-xs transition-colors mt-6 shadow-md shadow-purple-600/30 cursor-pointer border-none"
            >
              Close Presentation
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}

// Inline mini Save Icon component
function SaveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
  );
}
