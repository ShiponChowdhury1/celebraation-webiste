"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Edit2, Gift, Plus, Mail, Phone, Calendar, Trash2, X, Check, Save, LucideIcon,
  Cake, ShieldAlert, Award, Star, Compass, Clock, GraduationCap, Sparkles, AlertCircle,
  FileText
} from "lucide-react";

interface Milestone {
  type: string;
  date: string;
  recurring: boolean;
  remindMe: string;
  notes: string;
}

interface PersonDetailViewProps {
  person: any;
  networkPeople: any[];
  setNetworkPeople: React.Dispatch<React.SetStateAction<any[]>>;
  setActiveTab: (tab: string) => void;
  setModalEvent: (ev: any) => void;
  setWTitle: (val: string) => void;
  setWRecipient: (val: string) => void;
  setWType: (val: string) => void;
  setWDescription: (val: string) => void;
  setWizardStep: (step: number) => void;
}

export default function PersonDetailView({
  person,
  networkPeople,
  setNetworkPeople,
  setActiveTab,
  setModalEvent,
  setWTitle,
  setWRecipient,
  setWType,
  setWDescription,
  setWizardStep,
}: PersonDetailViewProps) {
  
  // Modal State for Add Milestone
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [mType, setMType] = useState("Birthday");
  const [mDate, setMDate] = useState("");
  const [mRecurring, setMRecurring] = useState(true);
  const [mRemindMe, setMRemindMe] = useState("1 month before");
  const [mNotes, setMNotes] = useState("");

  // Notes Editing States
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [localNotes, setLocalNotes] = useState(person.notes || "Loves surprise parties. Favourite colour is purple. Allergic to nuts — keep away from cake ingredients.");

  // Get matching current details from state array
  const currentPerson = networkPeople.find(p => p.id === person.id) || person;

  // Derive counts
  const milestonesList = currentPerson.milestones || [
    { type: "Birthday", date: "2025-07-15", recurring: true, remindMe: "1 month before, 1 week before", notes: "Loves surprise parties" },
    { type: "Work Anniversary at Figma", date: "2025-03-01", recurring: true, remindMe: "2 weeks before", notes: "Figma designer" }
  ];
  
  const pastCelebrations = currentPerson.pastCelebrations || [
    { title: "Emma's 29th Birthday", date: "July 15, 2024", contributors: 11, raised: 620 }
  ];

  const totalRaised = pastCelebrations.reduce((sum: number, c: any) => sum + c.raised, 0);

  const handleSaveNotes = () => {
    setNetworkPeople(prev => prev.map(p => {
      if (p.id === person.id) {
        return { ...p, notes: localNotes };
      }
      return p;
    }));
    setIsEditingNotes(false);
  };

  const handleAddMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mDate) return;

    const newMilestone: Milestone = {
      type: mType,
      date: mDate,
      recurring: mRecurring,
      remindMe: mRemindMe,
      notes: mNotes
    };

    setNetworkPeople(prev => prev.map(p => {
      if (p.id === person.id) {
        const existing = p.milestones || [];
        return { ...p, milestones: [...existing, newMilestone] };
      }
      return p;
    }));

    // Reset inputs & close modal
    setMType("Birthday");
    setMDate("");
    setMRecurring(true);
    setMRemindMe("1 month before");
    setMNotes("");
    setShowAddMilestone(false);
  };

  const handleCelebrate = () => {
    setWTitle(`${currentPerson.name}'s Celebration`);
    setWRecipient(currentPerson.name);
    setWType("Birthday");
    setWDescription(`${currentPerson.name}'s milestone is coming up. Help them celebrate!`);
    setActiveTab("create-celebration");
    setWizardStep(1);
  };

  // Helper for milestone categories icons
  const getMilestoneIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "birthday": return "🎂";
      case "anniversary": return "💍";
      case "wedding": return "💍";
      case "graduation": return "🎓";
      case "promotion": return "🏆";
      case "work anniversary": return "💼";
      case "baby shower": return "👶";
      case "retirement": return "🌅";
      default: return "✨";
    }
  };

  return (
    <div className="flex-grow overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full text-left font-sans">
      
      {/* 1. Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-405 select-none">
        <button 
          onClick={() => setActiveTab("network")} 
          className="hover:text-[#7C3AED] transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft className="size-3.5" /> Network
        </button>
        <span>/</span>
        <span className="text-zinc-650">{currentPerson.name}</span>
      </div>

      {/* 2. Main 2-Column Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (col-span-8) */}
        <div className="xl:col-span-8 flex flex-col gap-6 w-full">
          
          {/* Card 1: Person Profile Card */}
          <div className="bg-white border border-purple-50 rounded-[32px] p-8 shadow-2xs text-left relative flex flex-col gap-6">
            
            {/* Action buttons (top right) */}
            <div className="absolute top-8 right-8 flex items-center gap-3.5 select-none">
              <Button 
                onClick={handleCelebrate}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl px-5 h-[40px] text-xs font-bold transition-all shadow-md shadow-purple-600/10 flex items-center gap-1.5 cursor-pointer border-none"
              >
                <Gift className="size-4" /> Celebrate
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Profile Avatar */}
              <img 
                src={currentPerson.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"} 
                alt={currentPerson.name} 
                className="size-20 rounded-2xl object-cover border border-purple-100/60 shadow-3xs shrink-0" 
              />
              
              {/* Name Details */}
              <div className="flex flex-col text-left">
                <h1 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 tracking-tight font-serif leading-tight">{currentPerson.name}</h1>
                <span className="text-xs text-zinc-400 font-medium mt-1 uppercase tracking-wider">{currentPerson.relation} · {currentPerson.group}</span>
                
                {/* Visual Tags */}
                <div className="flex flex-wrap gap-2 mt-3 select-none">
                  {(currentPerson.tags || ["close", "birthday-planner"]).map((tag: string, idx: number) => (
                    <span 
                      key={idx}
                      className="bg-[#F8F6FF] border border-purple-55 text-[#7C3AED]/70 text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full uppercase"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Email and Phone Capsules */}
            <div className="flex flex-wrap gap-3 mt-1.5 select-all">
              <div className="bg-[#FAF8FF] border border-purple-50 rounded-full h-[40px] px-4 flex items-center gap-2 text-xs text-zinc-650">
                <Mail className="size-4 text-[#7C3AED]" />
                <span>{currentPerson.email || "emma@example.com"}</span>
              </div>
              <div className="bg-[#FAF8FF] border border-purple-50 rounded-full h-[40px] px-4 flex items-center gap-2 text-xs text-zinc-650">
                <Phone className="size-4 text-[#7C3AED]" />
                <span>{currentPerson.phone || "+1 (555) 234-5678"}</span>
              </div>
            </div>

            {/* Next Milestone Sub-Card */}
            <div className="bg-[#FAF8FF] border border-purple-50 rounded-2xl p-4.5 flex justify-between items-center mt-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl select-none">🎂</span>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Next milestone</span>
                  <span className="text-sm font-bold text-zinc-800 mt-0.5">Birthday</span>
                  <span className="text-[10px] text-zinc-400 font-light">Jul 15</span>
                </div>
              </div>
              
              <span className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full text-[10px] font-extrabold select-none flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                17 days
              </span>
            </div>

          </div>

          {/* Card 2: Important Dates */}
          <div className="bg-white border border-purple-50 rounded-[32px] p-8 shadow-2xs text-left flex flex-col gap-5">
            <div className="flex justify-between items-center border-b border-purple-50/50 pb-4">
              <span className="text-base font-extrabold text-zinc-900 flex items-center gap-2">
                <Calendar className="size-5 text-[#7C3AED]" /> Important Dates 
                <span className="bg-purple-100 text-[#7C3AED] font-extrabold text-[10px] size-5 rounded-full flex items-center justify-center">{milestonesList.length}</span>
              </span>
              <button 
                onClick={() => setShowAddMilestone(true)}
                className="text-[#7C3AED] hover:text-[#6D28D9] text-xs font-bold flex items-center gap-1.5 cursor-pointer bg-transparent border-none"
              >
                <Plus className="size-4" /> Add
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {milestonesList.map((m: any, idx: number) => (
                <div key={idx} className="bg-white border border-purple-50/60 rounded-2xl p-5 flex justify-between items-center hover:shadow-3xs transition-shadow">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl select-none shrink-0">{getMilestoneIcon(m.type)}</span>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-zinc-850">{m.type}</span>
                        {idx === 0 && (
                          <span className="bg-[#7C3AED] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Next up</span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-400 font-light mt-1">
                        {m.date ? new Date(m.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Jul 15"} · {m.recurring ? "Annually" : "One-time"}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-light mt-1 select-none flex items-center gap-1">
                        <Clock className="size-3 text-zinc-300" /> Reminder: {m.remindMe || "1 month before"}
                      </span>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold select-none ${
                    idx === 0 
                      ? "bg-amber-50 text-amber-600 border border-amber-100" 
                      : "bg-purple-50 text-[#7C3AED] border border-purple-100"
                  }`}>
                    ● {idx === 0 ? "17 days" : "246 days"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Past Celebrations */}
          <div className="bg-white border border-purple-50 rounded-[32px] p-8 shadow-2xs text-left flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-purple-50/50 pb-4">
              <span className="text-base font-extrabold text-zinc-900 flex items-center gap-2">
                <Gift className="size-5 text-[#7C3AED]" /> Past Celebrations
                <span className="bg-purple-100 text-[#7C3AED] font-extrabold text-[10px] size-5 rounded-full flex items-center justify-center">{pastCelebrations.length}</span>
              </span>
              <button 
                onClick={handleCelebrate}
                className="text-[#7C3AED] hover:text-[#6D28D9] text-xs font-bold flex items-center gap-1.5 cursor-pointer bg-transparent border-none"
              >
                <Plus className="size-4" /> New
              </button>
            </div>

            {/* Past stats banner row */}
            <div className="grid grid-cols-3 gap-3 border-b border-purple-50/30 pb-5 text-center select-none font-mono">
              <div className="flex flex-col gap-1.5">
                <span className="text-xl font-extrabold text-zinc-800">{pastCelebrations.length}</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-400">Celebrations</span>
              </div>
              <div className="flex flex-col gap-1.5 border-x border-purple-50/40">
                <span className="text-xl font-extrabold text-[#7C3AED]">${totalRaised}</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-400">Total raised</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xl font-extrabold text-zinc-800">
                  {pastCelebrations.reduce((sum: number, c: any) => sum + c.contributors, 0)}
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-400">Contributors</span>
              </div>
            </div>

            {/* Past Celebrations List */}
            <div className="flex flex-col gap-4">
              {pastCelebrations.map((c: any, idx: number) => (
                <div key={idx} className="bg-white border border-purple-50/60 rounded-2xl p-5 flex justify-between items-center">
                  <div className="flex items-center gap-3.5">
                    <span className="text-3xl select-none">🎉</span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-sm text-zinc-850">{c.title}</span>
                      <span className="text-xs text-zinc-400 font-light mt-0.5">{c.date} · {c.contributors} contributors</span>
                    </div>
                  </div>
                  
                  <span className="text-sm font-bold text-zinc-850 font-mono">${c.raised} <span className="text-zinc-400 text-[10px] font-normal">raised</span></span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (col-span-4) */}
        <div className="xl:col-span-4 flex flex-col gap-6 w-full">
          
          {/* Card 1: Overview */}
          <div className="bg-white border border-purple-50 rounded-[28px] p-6 text-left shadow-2xs flex flex-col gap-5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 select-none">Overview</span>
            
            <div className="flex flex-col divide-y divide-purple-50/30 text-xs select-none">
              <div className="py-3 flex justify-between items-center">
                <span className="text-zinc-450">In network since</span>
                <span className="font-bold text-zinc-800">Jan 2024</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-zinc-450">Milestones tracked</span>
                <span className="font-bold text-zinc-800">{milestonesList.length}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-zinc-450">Celebrations created</span>
                <span className="font-bold text-zinc-800">{pastCelebrations.length}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-zinc-450">Total raised for them</span>
                <span className="font-bold text-[#7C3AED] font-mono">${totalRaised}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Upcoming (90 days) */}
          <div className="bg-[#FAF8FF] border border-purple-50 rounded-[28px] p-6 text-left shadow-2xs flex flex-col gap-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#7C3AED] flex items-center gap-1.5 select-none">
              <Clock className="size-4" /> Upcoming (90 days)
            </span>
            
            <div className="flex flex-col gap-3">
              {milestonesList.filter((m: any) => m.type.toLowerCase() === "birthday").map((m: any, idx: number) => (
                <div key={idx} className="bg-white border border-purple-100/30 rounded-xl p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🎂</span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-xs text-zinc-800">{m.type}</span>
                      <span className="text-[10px] text-zinc-400 font-light mt-0.5">Jul 15</span>
                    </div>
                  </div>
                  
                  <span className="bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full text-[9px] font-bold">
                    ● 17 days
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Private Notes */}
          <div className="bg-white border border-purple-50 rounded-[28px] p-6 text-left shadow-2xs flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-1.5 select-none">
                <FileText className="size-4 text-[#7C3AED]" /> Private Notes
              </span>
              {!isEditingNotes && (
                <button 
                  onClick={() => setIsEditingNotes(true)}
                  className="text-[#7C3AED] hover:text-[#6D28D9] text-xs font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none"
                >
                  Edit
                </button>
              )}
            </div>

            {isEditingNotes ? (
              <div className="flex flex-col gap-3">
                <textarea 
                  rows={4}
                  value={localNotes}
                  onChange={(e) => setLocalNotes(e.target.value)}
                  className="w-full border border-purple-100 focus:border-[#7C3AED] bg-[#FAF8FF] rounded-xl p-3 text-xs text-zinc-800 outline-none resize-none leading-relaxed"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSaveNotes}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10px] font-bold px-3 py-1.5 h-[32px] rounded-lg flex items-center gap-1 border-none cursor-pointer"
                  >
                    <Save className="size-3.5" /> Save
                  </Button>
                  <Button 
                    onClick={() => {
                      setLocalNotes(person.notes || "");
                      setIsEditingNotes(false);
                    }}
                    variant="outline" 
                    className="border-purple-100 text-zinc-550 hover:bg-zinc-50 text-[10px] font-bold px-3 py-1.5 h-[32px] rounded-lg cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-zinc-650 leading-relaxed font-light select-text">
                {localNotes}
              </p>
            )}
          </div>

        </div>

      </div>

      {/* 3. MODAL: ADD MILESTONE (from 2nd screenshot) */}
      {showAddMilestone && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-55 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100 max-h-[90vh] overflow-y-auto font-sans">
            <button 
              type="button"
              onClick={() => setShowAddMilestone(false)}
              className="absolute right-5 top-5 p-2 text-zinc-400 hover:text-zinc-700 rounded-full cursor-pointer bg-transparent border-none"
            >
              <X className="size-5" />
            </button>

            <div className="flex flex-col text-left border-b border-zinc-100 pb-4.5 mb-5">
              <h2 className="text-xl font-extrabold text-zinc-900 leading-none">Add milestone</h2>
              <span className="text-xs text-zinc-400 font-light mt-1.5">for {currentPerson.name}</span>
            </div>

            <form onSubmit={handleAddMilestoneSubmit} className="flex flex-col gap-4.5">
              
              {/* Type Category Grid (3 columns) */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-700 select-none">Type</label>
                <div className="grid grid-cols-3 gap-2.5 select-none">
                  {[
                    { id: "Birthday", icon: "🎂" },
                    { id: "Anniversary", icon: "💍" },
                    { id: "Wedding", icon: "💍" },
                    { id: "Graduation", icon: "🎓" },
                    { id: "Promotion", icon: "🏆" },
                    { id: "Work Anniversary", icon: "💼" },
                    { id: "Baby Shower", icon: "👶" },
                    { id: "Retirement", icon: "🌅" },
                    { id: "Custom", icon: "✨" },
                  ].map(cat => {
                    const isSel = mType === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setMType(cat.id)}
                        className={`h-[56px] rounded-xl border flex flex-col items-center justify-center text-[10px] font-semibold transition-all gap-1 cursor-pointer select-none ${
                          isSel 
                            ? "bg-purple-50/50 border-[#7C3AED] text-[#7C3AED] scale-102 font-extrabold shadow-3xs" 
                            : "bg-white border-zinc-150 hover:bg-zinc-50 text-zinc-650"
                        }`}
                      >
                        <span className="text-base leading-none">{cat.icon}</span>
                        <span className="leading-none mt-0.5">{cat.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Recurring */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-700">Date <span className="text-[#FF2056]">*</span></label>
                  <input 
                    type="date" 
                    required
                    value={mDate}
                    onChange={(e) => setMDate(e.target.value)}
                    className="w-full bg-[#FAF8FF] border border-purple-50 focus:border-[#7C3AED] rounded-xl h-[42px] px-3.5 text-xs text-zinc-800 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2 select-none">
                  <label className="text-xs font-bold text-zinc-700">Recurring</label>
                  <button
                    type="button"
                    onClick={() => setMRecurring(!mRecurring)}
                    className={`w-full h-[42px] border rounded-xl text-xs font-bold transition-all flex items-center justify-start gap-2.5 px-4 cursor-pointer ${
                      mRecurring 
                        ? "bg-[#FAF8FF] border-[#7C3AED] text-[#7C3AED]" 
                        : "bg-white border-zinc-150 text-zinc-550"
                    }`}
                  >
                    <div className={`w-8 h-4.5 rounded-full relative transition-all border-none ${
                      mRecurring ? "bg-[#7C3AED]" : "bg-zinc-200"
                    }`}>
                      <div className={`size-3.5 bg-white rounded-full absolute top-[2px] transition-all ${
                        mRecurring ? "left-[15px]" : "left-[2px]"
                      }`} />
                    </div>
                    <span>Annual</span>
                  </button>
                </div>
              </div>

              {/* Remind Me Options */}
              <div className="flex flex-col gap-2 select-none">
                <label className="text-xs font-bold text-zinc-700">Remind me</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {["1 week before", "2 weeks before", "1 month before", "3 months before"].map(rem => {
                    const isSel = mRemindMe === rem;
                    return (
                      <button
                        key={rem}
                        type="button"
                        onClick={() => setMRemindMe(rem)}
                        className={`h-[40px] rounded-xl border flex items-center gap-2.5 px-4 text-xs font-semibold cursor-pointer ${
                          isSel 
                            ? "bg-purple-50/40 border-[#7C3AED] text-[#7C3AED] font-bold" 
                            : "bg-white border-zinc-150 hover:bg-zinc-50 text-zinc-650"
                        }`}
                      >
                        <div className={`size-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSel ? "border-[#7C3AED] bg-[#7C3AED] text-white" : "border-zinc-300 bg-white"
                        }`}>
                          {isSel && <Check className="size-2.5 stroke-[4px]" />}
                        </div>
                        <span>{rem}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-700">Notes <span className="text-zinc-400 font-normal lowercase">— optional</span></label>
                <textarea 
                  rows={3}
                  value={mNotes}
                  onChange={(e) => setMNotes(e.target.value)}
                  placeholder={`Any context about this milestone for ${currentPerson.name.split(" ")[0]}...`}
                  className="w-full bg-[#FAF8FF] border border-purple-55 focus:border-[#7C3AED] rounded-xl p-3 text-xs text-zinc-800 outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Action buttons */}
              <div className="flex justify-between items-center gap-4 mt-3 select-none">
                <Button 
                  type="button" 
                  onClick={() => setShowAddMilestone(false)}
                  variant="outline"
                  className="w-full max-w-[120px] border-zinc-200 text-zinc-550 hover:bg-zinc-50 h-[42px] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </Button>

                <Button 
                  type="submit"
                  className="w-full max-w-[180px] bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[42px] rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer border-none shadow-sm"
                >
                  + Add milestone
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
