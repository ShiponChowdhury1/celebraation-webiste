"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  X, Save, Check, LockKeyhole, Globe, ArrowLeft, ArrowRight, 
  User, ChevronDown, Clock, ShieldCheck, Gift, Send,
  Link2, Bell, LayoutDashboard, Info, CreditCard, Sparkles
} from "lucide-react";

interface CreateCelebrationWizardProps {
  wizardStep: number;
  setWizardStep: React.Dispatch<React.SetStateAction<number>>;
  wTitle: string;
  setWTitle: (val: string) => void;
  wType: string;
  setWType: (val: string) => void;
  wRecipient: string;
  setWRecipient: (val: string) => void;
  wRecipientCustom: string;
  setWRecipientCustom: (val: string) => void;
  isRecipientDropdownOpen: boolean;
  setIsRecipientDropdownOpen: (val: boolean) => void;
  wDate: string;
  setWDate: (val: string) => void;
  wDescription: string;
  setWDescription: (val: string) => void;
  wTheme: string;
  setWTheme: (val: string) => void;
  wInviteEmail: string;
  setWInviteEmail: (val: string) => void;
  wInvitees: string[];
  setWInvitees: React.Dispatch<React.SetStateAction<string[]>>;
  wPrivacy: string;
  setWPrivacy: (val: string) => void;
  wHeadline: string;
  setWHeadline: (val: string) => void;
  wWelcomeMsg: string;
  setWWelcomeMsg: (val: string) => void;
  wEnableWishPool: boolean;
  setWEnableWishPool: (val: boolean) => void;
  wGoalFund: number;
  setWGoalFund: (val: number) => void;
  wDeadlineDate: string;
  setWDeadlineDate: (val: string) => void;
  wDeadlineTime: string;
  setWDeadlineTime: (val: string) => void;
  wSuggestedAmounts: number[];
  setWSuggestedAmounts: React.Dispatch<React.SetStateAction<number[]>>;
  wCustomAmountVal: string;
  setWCustomAmountVal: (val: string) => void;
  wMinContribution: number;
  setWMinContribution: (val: number) => void;
  wAllowCustomAmount: boolean;
  setWAllowCustomAmount: (val: boolean) => void;
  wStripeConnected: boolean;
  setWStripeConnected: (val: boolean) => void;
  isPublishModalOpen: boolean;
  setIsPublishModalOpen: (val: boolean) => void;
  previewTab: string;
  setPreviewTab: (val: string) => void;
  handlePublishCelebration: () => void;
  handleSelectRecipient: (name: string) => void;
  handleAddInvitee: (e: React.FormEvent) => void;
  handleRemoveInvitee: (email: string) => void;
  handleToggleAmountChip: (amount: number) => void;
  handleAddCustomPreset: (e: React.FormEvent) => void;
  setActiveTab: (tab: string) => void;
  networkPeople: any[];
  themeGradients: Record<string, string>;
  toastMessage: string | null;
  triggerToast: (msg: string) => void;
  recipientDropdownRef: React.RefObject<HTMLDivElement | null>;
}

export default function CreateCelebrationWizard({
  wizardStep,
  setWizardStep,
  wTitle,
  setWTitle,
  wType,
  setWType,
  wRecipient,
  setWRecipient,
  wRecipientCustom,
  setWRecipientCustom,
  isRecipientDropdownOpen,
  setIsRecipientDropdownOpen,
  wDate,
  setWDate,
  wDescription,
  setWDescription,
  wTheme,
  setWTheme,
  wInviteEmail,
  setWInviteEmail,
  wInvitees,
  setWInvitees,
  wPrivacy,
  setWPrivacy,
  wHeadline,
  setWHeadline,
  wWelcomeMsg,
  setWWelcomeMsg,
  wEnableWishPool,
  setWEnableWishPool,
  wGoalFund,
  setWGoalFund,
  wDeadlineDate,
  setWDeadlineDate,
  wDeadlineTime,
  setWDeadlineTime,
  wSuggestedAmounts,
  setWSuggestedAmounts,
  wCustomAmountVal,
  setWCustomAmountVal,
  wMinContribution,
  setWMinContribution,
  wAllowCustomAmount,
  setWAllowCustomAmount,
  wStripeConnected,
  setWStripeConnected,
  isPublishModalOpen,
  setIsPublishModalOpen,
  previewTab,
  setPreviewTab,
  handlePublishCelebration,
  handleSelectRecipient,
  handleAddInvitee,
  handleRemoveInvitee,
  handleToggleAmountChip,
  handleAddCustomPreset,
  setActiveTab,
  networkPeople,
  themeGradients,
  toastMessage,
  triggerToast,
  recipientDropdownRef
}: CreateCelebrationWizardProps) {

  // Choose selected type icon for preview
  let previewIcon = "🎂";
  if (wType === "Wedding") previewIcon = "💍";
  if (wType === "Anniversary") previewIcon = "🥂";
  if (wType === "Graduation") previewIcon = "🎓";
  if (wType === "Baby Shower") previewIcon = "👶";
  if (wType === "Retirement") previewIcon = "🌅";
  if (wType === "Promotion") previewIcon = "🏆";
  if (wType === "Work Anniversary") previewIcon = "🏢";
  if (wType === "Custom") previewIcon = "✨";

  const selectedGradient = themeGradients[wTheme] || "from-purple-800 via-purple-600 to-indigo-700";
  const resolvedRecipient = wRecipient === "Someone else" ? (wRecipientCustom || "Someone Special") : wRecipient;

  return (
    <div className="min-h-screen bg-[#FAF8FF] flex flex-col font-sans text-zinc-800 relative select-none">
      
      {/* Published Success modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 bg-[#0D0A1A]/70 backdrop-blur-xs flex items-center justify-center p-4 z-[999] animate-in fade-in duration-200 select-none">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl relative text-center border border-purple-100 animate-in zoom-in-95 duration-250 flex flex-col items-center">
            
            {/* Paper airplane success icon */}
            <div className="size-14 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center mb-5 border border-purple-100 shadow-sm">
              <Send className="size-6 text-[#7C3AED] -rotate-12 translate-x-0.5 -translate-y-0.5" />
            </div>

            <h3 className="text-xl font-extrabold text-zinc-955 mb-1.5 leading-snug">Published!</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-[260px] mb-6">
              <span className="font-bold text-zinc-700">"{wTitle}"</span> is now live. Share the link with contributors — every gift and message goes straight to your dashboard.
            </p>

            {/* share link textbox block */}
            <div className="w-full bg-[#FAF8FF] border border-purple-100 rounded-xl p-3 flex items-center justify-between gap-3 mb-6 select-text">
              <span className="text-xs font-semibold text-zinc-505 truncate w-3/4 text-left">
                celebr.app/{wTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`celebr.app/${wTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}`);
                  triggerToast("Published link copied!");
                }}
                className="text-xs font-extrabold text-[#7C3AED] hover:text-[#6D28D9] bg-white border border-purple-150 rounded-lg px-3 py-1.5 shrink-0 transition-colors cursor-pointer"
              >
                Copy
              </button>
            </div>

            {/* Actions navigation footer */}
            <div className="flex gap-3 w-full">
              <Button 
                onClick={() => {
                  setIsPublishModalOpen(false);
                  setActiveTab("dashboard");
                  setWizardStep(1);
                }}
                variant="outline"
                className="flex-1 shrink border-purple-150 text-zinc-500 bg-white hover:bg-zinc-50 h-[42px] text-xs font-bold rounded-lg"
              >
                Dashboard
              </Button>
              <Button 
                onClick={() => {
                  setIsPublishModalOpen(false);
                  setActiveTab("events");
                  setWizardStep(1);
                }}
                className="flex-1 shrink bg-[#7C3AED] hover:bg-[#6D28D9] text-white h-[42px] text-xs font-bold rounded-lg shadow-sm"
              >
                View event
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* Wizard Topbar header */}
      <header className="h-[80px] bg-white border-b border-purple-100/50 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-40 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setActiveTab("events");
              setWizardStep(1);
            }} 
            className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 rounded-full transition-all cursor-pointer"
          >
            <X className="size-5" />
          </button>
          <span className="font-extrabold text-sm text-zinc-955 tracking-tight">New Celebration</span>
        </div>
        <Button 
          onClick={() => {
            triggerToast("Draft saved successfully!");
            setActiveTab("events");
            setWizardStep(1);
          }}
          variant="outline" 
          className="border-purple-200 text-zinc-700 bg-white hover:bg-purple-50 rounded-lg px-4 h-[38px] text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
        >
          <Save className="size-4" /> Save draft
        </Button>
      </header>

      {/* Wizard Main Grid layout */}
      <div className="flex-grow flex flex-col lg:flex-row relative">
        
        {/* Wizard Steps indicator Sidebar */}
        <aside className="w-full lg:w-[260px] bg-[#FAF8FF] lg:bg-white border-b lg:border-r border-purple-100/50 shrink-0 p-6 flex flex-row lg:flex-col gap-4 lg:gap-7 items-start overflow-x-auto lg:overflow-x-visible">
          {[
            { num: 1, label: "Basics", desc: "Name, date, and type" },
            { num: 2, label: "Design", desc: "Headline, theme, and layout" },
            { num: 3, label: "WishPool", desc: "Goal, amounts, and payments" },
            { num: 4, label: "Publish", desc: "Review and go live" }
          ].map((stepItem) => {
            const isActive = wizardStep === stepItem.num;
            const isCompleted = wizardStep > stepItem.num;
            return (
              <div key={stepItem.num} className="flex items-center gap-3.5 text-left min-w-[150px] lg:min-w-0">
                <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                  isActive 
                    ? "bg-[#7C3AED] text-white shadow-md shadow-purple-600/10" 
                    : isCompleted 
                      ? "bg-[#009966] text-white" 
                      : "bg-purple-50 text-zinc-400 border border-purple-100/30"
                }`}>
                  {isCompleted ? <Check className="size-3.5" /> : stepItem.num}
                </div>
                <div className="flex flex-col text-left">
                  <span className={`text-xs font-bold transition-colors ${
                    isActive ? "text-[#7C3AED]" : isCompleted ? "text-[#009966]" : "text-zinc-505"
                  }`}>{stepItem.label}</span>
                  <span className="text-[10px] text-zinc-400 font-light hidden lg:block mt-0.5 leading-none">{stepItem.desc}</span>
                </div>
              </div>
            );
          })}
        </aside>

        {/* Form Content + Preview container */}
        <div className="flex-1 flex flex-col xl:flex-row p-6 lg:p-12 gap-8 lg:gap-12 overflow-y-auto max-h-[calc(100vh-80px)] items-start">
          
          {/* Left Column: Form Blocks */}
          <div className="flex-1 w-full text-left flex flex-col gap-8 pb-10">
            
            {/* STEP 1: BASICS FORM */}
            {wizardStep === 1 && (
              <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
                <div>
                  <h2 className="text-2xl font-extrabold text-zinc-955 tracking-tight leading-none">Event Basics</h2>
                  <span className="text-xs text-zinc-400 font-light mt-1.5 block">Name, date, and type</span>
                </div>

                {/* Input 1: Event Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-700">Event title *</label>
                  <input 
                    type="text" 
                    required 
                    value={wTitle}
                    onChange={(e) => setWTitle(e.target.value)}
                    placeholder="e.g. Emma's 30th Birthday" 
                    className="bg-white border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[46px] px-3.5 text-sm text-zinc-900 outline-none w-full transition-all"
                  />
                </div>

                {/* Input 2: Event Type Category Buttons Grid */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-700">Event type *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {[
                      { label: "Birthday", emoji: "🎂" },
                      { label: "Wedding", emoji: "💍" },
                      { label: "Anniversary", emoji: "🥂" },
                      { label: "Graduation", emoji: "🎓" },
                      { label: "Baby Shower", emoji: "👶" },
                      { label: "Retirement", emoji: "🌅" },
                      { label: "Promotion", emoji: "🏆" },
                      { label: "Work Anniversary", emoji: "🏢" },
                      { label: "Custom", emoji: "✨" },
                    ].map((item) => {
                      const isSel = wType === item.label;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            setWType(item.label);
                            setWHeadline(item.label);
                          }}
                          className={`h-[48px] rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                            isSel 
                              ? "border-[#7C3AED] bg-purple-50/50 text-[#7C3AED] shadow-2xs" 
                              : "border-purple-100 bg-white hover:bg-purple-50/10 text-zinc-650"
                          }`}
                        >
                          <span>{item.emoji}</span>
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Input 3 & 4: Recipient Select Dropdown + Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5">
                  
                  {/* Recipient Dropdown */}
                  <div className="flex flex-col gap-1.5 relative" ref={recipientDropdownRef as any}>
                    <label className="text-xs font-bold text-zinc-700">Recipient *</label>
                    <button
                      type="button"
                      onClick={() => setIsRecipientDropdownOpen(!isRecipientDropdownOpen)}
                      className="bg-white border border-purple-100 hover:border-[#7C3AED] rounded-lg h-[46px] px-3.5 text-xs text-zinc-700 transition-colors flex items-center justify-between w-full text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <User className="size-4 text-zinc-400" />
                        <span>{wRecipient || "Select recipient..."}</span>
                      </div>
                      <ChevronDown className="size-4 text-zinc-400" />
                    </button>

                    {isRecipientDropdownOpen && (
                      <div className="absolute left-0 top-[74px] bg-white border border-purple-100 rounded-xl shadow-xl w-full py-1.5 z-50 max-h-[220px] overflow-y-auto animate-in fade-in slide-in-from-top-3 duration-200">
                        <button 
                          type="button"
                          onClick={() => handleSelectRecipient("Someone else")}
                          className="w-full h-[38px] px-4 text-left text-xs font-bold hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors border-b border-zinc-100 text-purple-650 cursor-pointer"
                        >
                          Someone else
                        </button>
                        {networkPeople.map((person) => (
                          <button
                            key={person.id}
                            type="button"
                            onClick={() => handleSelectRecipient(person.name)}
                            className={`w-full h-[38px] px-4 text-left text-xs font-semibold hover:bg-purple-50 hover:text-[#7C3AED] flex items-center justify-between transition-colors cursor-pointer ${
                              wRecipient === person.name ? "text-[#7C3AED] bg-purple-50/50" : "text-zinc-700"
                            }`}
                          >
                            <span>{person.name} ({person.relation})</span>
                            {wRecipient === person.name && <Check className="size-3.5" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Target Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-700">Event date *</label>
                    <input 
                      type="date" 
                      required 
                      value={wDate}
                      onChange={(e) => setWDate(e.target.value)}
                      className="bg-white border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[46px] px-3.5 text-sm text-zinc-900 outline-none w-full transition-all"
                    />
                  </div>

                </div>

                {/* Conditionally show Custom Recipient name input */}
                {wRecipient === "Someone else" && (
                  <div className="flex flex-col gap-1.5 animate-in slide-in-from-top-2 duration-200">
                    <label className="text-xs font-bold text-[#7C3AED]">Recipient name *</label>
                    <input 
                      type="text" 
                      required 
                      value={wRecipientCustom}
                      onChange={(e) => setWRecipientCustom(e.target.value)}
                      placeholder="Enter their full name..." 
                      className="bg-white border border-[#7C3AED] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[46px] px-3.5 text-sm text-zinc-900 outline-none w-full transition-all"
                    />
                  </div>
                )}

                {/* Input 5: Description Story */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-zinc-700">Description</label>
                    <span className="text-[10px] text-zinc-400">{wDescription.length}/400</span>
                  </div>
                  <textarea 
                    rows={3}
                    maxLength={400}
                    value={wDescription}
                    onChange={(e) => setWDescription(e.target.value)}
                    placeholder="Share the story behind this celebration. Why is it special? What will the gift be used for?"
                    className="bg-white border border-purple-100 focus:border-[#7C3AED] rounded-lg p-3 text-sm text-zinc-800 outline-none w-full transition-all resize-none"
                  />
                </div>

                {/* Input 6: Theme Gradients */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-bold text-zinc-700">Cover theme *</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                    {[
                      { name: "Celestial", g: "from-purple-500 to-indigo-600" },
                      { name: "Bloom", g: "from-pink-500 to-rose-600" },
                      { name: "Golden", g: "from-amber-400 to-orange-500" },
                      { name: "Sky", g: "from-sky-400 to-blue-500" },
                      { name: "Garden", g: "from-emerald-400 to-teal-500" },
                      { name: "Midnight", g: "from-zinc-800 to-slate-955" },
                      { name: "Peach", g: "from-pink-300 via-rose-350 to-orange-400" },
                      { name: "Sago", g: "from-teal-400 to-emerald-500" }
                    ].map((th) => {
                      const isThSel = wTheme === th.name;
                      return (
                        <button
                          key={th.name}
                          type="button"
                          onClick={() => setWTheme(th.name)}
                          className={`flex flex-col rounded-xl overflow-hidden border-2 text-center transition-all aspect-square cursor-pointer ${
                            isThSel ? "border-[#7C3AED] scale-[1.03] shadow-xs" : "border-purple-100 hover:opacity-90"
                          }`}
                        >
                          <div className={`flex-grow bg-gradient-to-tr ${th.g}`} />
                          <span className="text-[9px] font-bold text-zinc-505 py-1">{th.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Input 7: Participant Invite tags */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-700">Invite Participants</label>
                  <form onSubmit={handleAddInvitee} className="flex gap-2 w-full">
                    <input 
                      type="email" 
                      value={wInviteEmail}
                      onChange={(e) => setWInviteEmail(e.target.value)}
                      placeholder="participant@example.com" 
                      className="bg-white border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 text-xs text-zinc-800 outline-none w-full transition-all"
                    />
                    <Button 
                      type="submit"
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] px-5 rounded-lg shrink-0 text-xs transition-colors cursor-pointer"
                    >
                      + Add
                    </Button>
                  </form>

                  {/* Invite tags list container */}
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {wInvitees.map((email) => (
                      <div 
                        key={email}
                        className="bg-[#F8F6FF] border border-purple-100 text-[#7C3AED] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 select-none"
                      >
                        <span>{email}</span>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveInvitee(email)}
                          className="hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-zinc-400 font-light mt-1">1 participant will receive an invitation email when the WishPool is published.</span>
                </div>

                {/* Input 8: Privacy Box Selector Cards */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-bold text-zinc-700">Privacy *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { val: "Private", title: "Private", desc: "Only invited contributors can see it", icon: LockKeyhole },
                      { val: "Public", title: "Public", desc: "Anyone with the link can view and contribute", icon: Globe }
                    ].map((priv) => {
                      const isPrivSel = wPrivacy === priv.val;
                      const PrivIcon = priv.icon;
                      return (
                        <button
                          key={priv.val}
                          type="button"
                          onClick={() => setWPrivacy(priv.val)}
                          className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                            isPrivSel 
                              ? "border-[#7C3AED] bg-purple-50/20 shadow-2xs" 
                              : "border-purple-100 bg-white hover:bg-[#FAF8FF]/30"
                          }`}
                        >
                          <div className={`p-2.5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                            isPrivSel ? "border-purple-200 bg-purple-50 text-[#7C3AED]" : "border-zinc-100 bg-zinc-50 text-zinc-450"
                          }`}>
                            <PrivIcon className="size-4.5" />
                          </div>
                          <div className="flex flex-col select-none">
                            <span className="text-xs font-extrabold text-zinc-800">{priv.title}</span>
                            <span className="text-[10.5px] text-zinc-450 mt-1 leading-normal font-light">{priv.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* STEP 2: DESIGN FORM */}
            {wizardStep === 2 && (
              <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
                <div>
                  <h2 className="text-2xl font-extrabold text-zinc-955 tracking-tight leading-none">Public Page Design</h2>
                  <span className="text-xs text-zinc-400 font-light mt-1.5 block">Headline, theme, and layout</span>
                </div>

                <div className="bg-white border border-purple-100/60 rounded-[20px] p-6 flex flex-col gap-5 shadow-2xs">
                  <h3 className="font-extrabold text-zinc-900 text-sm border-b border-zinc-100 pb-3 select-none">Copy & Messaging</h3>
                  
                  {/* Page Headline */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-700">Page headline</label>
                    <input 
                      type="text" 
                      value={wHeadline}
                      onChange={(e) => setWHeadline(e.target.value)}
                      placeholder="e.g. A Special Celebration" 
                      className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[46px] px-3.5 text-sm text-zinc-900 outline-none w-full transition-all"
                    />
                  </div>

                  {/* Category info */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-700">Category</label>
                    <select 
                      value={wType}
                      onChange={(e) => {
                        setWType(e.target.value);
                        setWHeadline(e.target.value);
                      }}
                      className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[46px] px-3 text-sm text-zinc-808 outline-none w-full transition-all cursor-pointer"
                    >
                      <option value="Birthday">Birthday</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Graduation">Graduation</option>
                      <option value="Baby Shower">Baby Shower</option>
                      <option value="Retirement">Retirement</option>
                      <option value="Promotion">Promotion</option>
                      <option value="Work Anniversary">Work Anniversary</option>
                      <option value="Custom">Custom</option>
                    </select>
                    <span className="text-[10px] text-zinc-400 font-light mt-0.5 select-none">Choose the celebration type to load matching welcome messages</span>
                  </div>

                  {/* Welcome Message templates dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-700">Welcome message</label>
                    <select 
                      value={wWelcomeMsg}
                      onChange={(e) => setWWelcomeMsg(e.target.value)}
                      className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[46px] px-3 text-sm text-zinc-808 outline-none w-full transition-all cursor-pointer"
                    >
                      <option value="Join us in making this moment extra special!">Join us in making this moment extra special!</option>
                      <option value="Let's make this milestone unforgettable with gifts and wishes!">Let's make this milestone unforgettable with gifts and wishes!</option>
                      <option value="Contribute to the goal and leave a heartfelt wish.">Contribute to the goal and leave a heartfelt wish.</option>
                    </select>
                    <span className="text-[10px] text-zinc-400 font-light mt-0.5 select-none">Choose one of the pre-written messages for this category</span>
                  </div>

                </div>

                {/* Theme Gradient selector */}
                <div className="bg-white border border-purple-100/60 rounded-[20px] p-6 flex flex-col gap-5 shadow-2xs">
                  <h3 className="font-extrabold text-zinc-900 text-sm border-b border-zinc-100 pb-3 select-none">Cover Theme</h3>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-2">
                    {[
                      { name: "Celestial", g: "from-purple-500 to-indigo-600" },
                      { name: "Bloom", g: "from-pink-500 to-rose-600" },
                      { name: "Golden", g: "from-amber-400 to-orange-500" },
                      { name: "Sky", g: "from-sky-400 to-blue-500" },
                      { name: "Garden", g: "from-emerald-400 to-teal-500" },
                      { name: "Midnight", g: "from-zinc-800 to-slate-955" },
                      { name: "Peach", g: "from-pink-300 via-rose-350 to-orange-400" },
                      { name: "Sago", g: "from-teal-400 to-emerald-500" }
                    ].map((th) => {
                      const isThSel = wTheme === th.name;
                      return (
                        <button
                          key={th.name}
                          type="button"
                          onClick={() => setWTheme(th.name)}
                          className={`flex flex-col rounded-xl overflow-hidden border-2 text-center transition-all aspect-square cursor-pointer ${
                            isThSel ? "border-[#7C3AED] scale-[1.03]" : "border-purple-100 hover:opacity-90"
                          }`}
                        >
                          <div className={`flex-grow bg-gradient-to-tr ${th.g}`} />
                          <span className="text-[8.5px] font-bold text-zinc-500 py-1 leading-none">{th.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* STEP 3: WISHPOOL SETTINGS */}
            {wizardStep === 3 && (
              <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200 text-left">
                <div>
                  <h2 className="text-2xl font-extrabold text-zinc-955 tracking-tight leading-none">WishPool Setup</h2>
                  <span className="text-xs text-zinc-400 font-light mt-1.5 block">Goal, amounts, and payments</span>
                </div>

                {/* Enable WishPool Toggle box (Purple Bordered) */}
                <div className="bg-white border-2 border-[#7C3AED] rounded-2xl p-5 flex items-center justify-between gap-6 shadow-2xs select-none">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-purple-50 text-[#7C3AED] border border-purple-100 flex items-center justify-center shrink-0">
                      <Gift className="size-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-extrabold text-sm text-zinc-900 leading-tight">Enable WishPool</span>
                      <span className="text-xs text-zinc-400 font-light mt-0.5">Collect group contributions via Stripe</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setWEnableWishPool(!wEnableWishPool)}
                    className={`w-11 h-6 rounded-full transition-all flex items-center p-0.5 shrink-0 cursor-pointer ${
                      wEnableWishPool ? "bg-[#7C3AED] justify-end" : "bg-zinc-200 justify-start"
                    }`}
                  >
                    <span className="size-5 rounded-full bg-white shadow-md transition-all" />
                  </button>
                </div>

                {!wEnableWishPool ? (
                  <div className="text-xs text-zinc-400 font-light bg-zinc-50 border border-zinc-150 rounded-xl p-4.5 text-left select-none animate-in fade-in duration-200">
                    Contributions disabled. The page will still be shareable for messages and celebration wishes.
                  </div>
                ) : (
                  <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                    
                    {/* Fundraising Goal */}
                    <div className="bg-white border border-purple-100/60 rounded-[20px] p-6 flex flex-col gap-5.5 shadow-2xs">
                      <h3 className="font-extrabold text-zinc-900 text-sm border-b border-zinc-100 pb-3 leading-none select-none">Fundraising Goal</h3>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-zinc-700">Goal amount *</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            required 
                            value={wGoalFund}
                            onChange={(e) => setWGoalFund(parseFloat(e.target.value) || 0)}
                            className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[46px] pl-8 pr-3.5 text-sm text-zinc-900 outline-none w-full transition-all font-mono font-extrabold"
                          />
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-extrabold text-zinc-405 font-mono">$</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 font-light mt-0.5 select-none leading-none">No upper limit. Contributors see the progress bar toward this target.</span>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-zinc-700">Contribution deadline <span className="text-zinc-400 font-normal">(optional)</span></label>
                        <div className="flex gap-3">
                          <input 
                            type="date" 
                            value={wDeadlineDate}
                            onChange={(e) => setWDeadlineDate(e.target.value)}
                            className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[46px] px-3.5 text-xs text-zinc-808 outline-none w-full transition-all"
                          />
                          <div className="h-[46px] rounded-lg border border-purple-100 bg-[#FAF8FF] px-4 flex items-center gap-1.5 shrink-0 text-xs font-semibold text-zinc-400 select-none">
                            <Clock className="size-4" /> 11:59 PM
                          </div>
                        </div>
                        <span className="text-[10px] text-zinc-400 font-light mt-0.5 select-none leading-none">Leave blank to close the WishPool manually from your dashboard.</span>
                      </div>

                    </div>

                    {/* Suggested Amounts */}
                    <div className="bg-white border border-purple-100/60 rounded-[20px] p-6 flex flex-col gap-6 shadow-2xs">
                      <div className="border-b border-zinc-100 pb-3">
                        <h3 className="font-extrabold text-zinc-900 text-sm leading-none select-none">Suggested Amounts</h3>
                        <p className="text-[10px] text-zinc-400 font-light mt-1.5 leading-none select-none">Contributors see these as quick-select buttons on the contribution page</p>
                      </div>

                      <div className="flex flex-wrap gap-2 select-none">
                        {[10, 25, 50, 100, 150, 200, 500].map((amt) => {
                          const isCheck = wSuggestedAmounts.includes(amt);
                          return (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => handleToggleAmountChip(amt)}
                              className={`h-[36px] px-4 rounded-full border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                isCheck 
                                  ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-3xs" 
                                  : "bg-white text-zinc-650 border-zinc-200 hover:bg-zinc-50"
                              }`}
                            >
                              {isCheck && <Check className="size-3.5" />}
                              <span>${amt}</span>
                            </button>
                          );
                        })}
                      </div>

                      <form onSubmit={handleAddCustomPreset} className="flex gap-2">
                        <div className="relative flex-grow">
                          <input 
                            type="number" 
                            value={wCustomAmountVal}
                            onChange={(e) => setWCustomAmountVal(e.target.value)}
                            placeholder="Custom amount..." 
                            className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] pl-7 pr-3.5 text-xs text-zinc-800 outline-none w-full transition-all"
                          />
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 font-mono">$</span>
                        </div>
                        <Button 
                          type="submit"
                          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold h-[44px] px-5 rounded-lg shrink-0 transition-colors cursor-pointer"
                        >
                          Add
                        </Button>
                      </form>

                      <div className="flex flex-col gap-1.5 border-t border-zinc-100 pt-4 mt-2">
                        <label className="text-xs font-bold text-zinc-700">Minimum contribution <span className="text-zinc-450 font-normal">(optional)</span></label>
                        <div className="relative max-w-xs">
                          <input 
                            type="number" 
                            value={wMinContribution}
                            onChange={(e) => setWMinContribution(parseFloat(e.target.value) || 0)}
                            className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[44px] pl-8 pr-3.5 text-xs text-zinc-800 outline-none w-full transition-all font-mono font-bold"
                          />
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 font-mono">$</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 font-light mt-0.5 select-none leading-none">Stripe charges 30c per transaction, so $5 is recommended.</span>
                      </div>

                    </div>

                    {/* Secured by Stripe Card */}
                    <div className="bg-[#FFF5F6] border border-rose-100 rounded-2xl p-5 select-none text-left">
                      <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs">
                        <ShieldCheck className="size-4" /> Secured by Stripe
                      </div>
                      <p className="text-[10.5px] text-zinc-500 font-light leading-relaxed mt-2.5">
                        All payments are processed through Stripe. Celebr never stores card details. Funds are transferred to your connected bank account within 2–7 days of the event date. A 3% platform fee applies per contribution.
                      </p>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* STEP 4: REVIEW & PUBLISH */}
            {wizardStep === 4 && (
              <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200 text-left">
                <div>
                  <h2 className="text-2xl font-extrabold text-zinc-955 tracking-tight leading-none">Preview & Publish</h2>
                  <span className="text-xs text-zinc-400 font-light mt-1.5 block">Review and go live</span>
                </div>

                <div className="bg-white border-2 border-[#7C3AED]/70 rounded-2xl p-5 flex items-start gap-4 shadow-2xs select-none">
                  <div className="size-8.5 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0 border border-purple-100">
                    <Check className="size-4.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-extrabold text-sm text-zinc-900 leading-tight">Everything looks great!</span>
                    <span className="text-xs text-zinc-400 font-light mt-1 leading-normal">Your celebration is ready to publish. Review the previews below and hit the button.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Block summaries */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    
                    <div className="bg-white border border-[#F4F1FB] rounded-[24px] p-6 flex flex-col gap-5 shadow-2xs">
                      
                      <div className="flex items-center gap-4.5">
                        <div className="size-14 rounded-2xl bg-zinc-50 border border-purple-100/50 flex items-center justify-center text-2xl shrink-0 select-none">
                          {previewIcon}
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-extrabold text-zinc-900 text-base leading-tight">{wTitle}</h3>
                          <div className="flex items-center gap-2 mt-1.5 select-none">
                            <span className="text-[10px] text-zinc-400 font-light">for {resolvedRecipient}</span>
                            <span className="bg-purple-100 text-[#7C3AED] text-[9px] font-extrabold px-2.5 py-0.5 rounded-full capitalize">{wType}</span>
                            <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full capitalize">{wPrivacy}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 border-t border-zinc-100 pt-4 select-none">
                        <div className="bg-[#FAF8FF] border border-purple-100/25 rounded-xl p-3 flex flex-col gap-1">
                          <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Event Date</span>
                          <span className="text-xs font-bold text-zinc-808 mt-0.5 truncate">
                            {wDate ? new Date(wDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Not Set"}
                          </span>
                        </div>
                        <div className="bg-[#FAF8FF] border border-purple-100/25 rounded-xl p-3 flex flex-col gap-1">
                          <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Goal amount</span>
                          <span className="text-xs font-extrabold text-zinc-808 mt-0.5 font-mono">${wGoalFund}</span>
                        </div>
                        <div className="bg-[#FAF8FF] border border-purple-100/25 rounded-xl p-3 flex flex-col gap-1">
                          <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Theme</span>
                          <span className="text-xs font-bold text-zinc-808 mt-0.5 truncate">{wTheme}</span>
                        </div>
                      </div>

                    </div>

                    <div className="bg-white border border-[#F4F1FB] rounded-[24px] p-6 shadow-2xs">
                      <h4 className="text-xs font-extrabold text-zinc-450 uppercase tracking-widest border-b border-zinc-100 pb-3.5 mb-4 select-none">Pre-publish checklist</h4>
                      <div className="flex flex-col gap-3.5 select-none">
                        {[
                          { label: "Event title", val: wTitle },
                          { label: "Event date", val: wDate ? new Date(wDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Not scheduled" },
                          { label: "Recipient", val: resolvedRecipient },
                          { label: "Description", val: `${wDescription.length} chars` },
                          { label: "Cover theme", val: wTheme },
                          { label: "WishPool", val: wEnableWishPool ? `$${wGoalFund} goal` : "Disabled" },
                          { label: "Privacy", val: `${wPrivacy} — anyone with link` },
                        ].map((chk, cIdx) => (
                          <div key={cIdx} className="flex items-center justify-between gap-4 text-xs font-medium border-b border-zinc-50 pb-2.5 last:border-0 last:pb-0">
                            <div className="flex items-center gap-2">
                              <Check className="size-4 text-emerald-500 shrink-0" />
                              <span className="text-zinc-505">{chk.label}</span>
                            </div>
                            <span className="text-zinc-800 font-semibold">{chk.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Block summaries */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    
                    <div className="bg-[#7C3AED] text-white rounded-3xl p-6 shadow-md shadow-purple-500/10 text-center flex flex-col items-center gap-3.5 select-none relative overflow-hidden">
                      <div className="absolute -top-12 -left-12 size-28 rounded-full bg-white/5 blur-xl pointer-events-none" />
                      <div className="size-11 rounded-full bg-white/10 flex items-center justify-center shadow-inner">
                        <Send className="size-5 text-white -rotate-12 translate-x-0.5 -translate-y-0.5" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-extrabold text-sm leading-tight">Ready to go live?</span>
                        <p className="text-[10px] text-purple-100 font-light leading-normal max-w-[200px] mt-1">Publishing creates your public page and generates the shareable link.</p>
                      </div>
                    </div>

                    <div className="bg-white border border-[#F4F1FB] rounded-[24px] p-5 shadow-2xs text-left select-none">
                      <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-3 mb-3.5">After Publishing</h4>
                      <div className="flex flex-col gap-3.5">
                        {[
                          { icon: Link2, text: "Get a shareable link to send to contributors" },
                          { icon: Bell, text: "Email notifications on each contribution" },
                          { icon: LayoutDashboard, text: "Live WishPool dashboard to track progress" },
                          { icon: Send, text: "Send the reveal when you're ready" }
                        ].map((step, idx) => {
                          const StepIcon = step.icon;
                          return (
                            <div key={idx} className="flex items-start gap-3 text-[11px] font-medium text-zinc-650 leading-normal">
                              <StepIcon className="size-4 text-[#7C3AED] shrink-0 mt-0.5" />
                              <span>{step.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-white border-2 border-blue-100 rounded-[20px] p-5 shadow-2xs select-none">
                      <p className="text-[10px] text-blue-600 font-medium leading-relaxed">
                        Platform fee: 3% per contribution + Stripe's standard 2.9% + 30c processing fee. No monthly charge on the Free plan.
                      </p>
                    </div>

                  </div>

                </div>

                {/* Previews display container */}
                <div className="bg-white border border-purple-100/60 rounded-[24px] p-6 shadow-2xs flex flex-col gap-6 mt-2">
                  <div className="border-b border-zinc-100 pb-4 text-center select-none">
                    <h3 className="font-extrabold text-zinc-900 text-sm leading-none">Page Previews</h3>
                    <p className="text-[10px] text-zinc-400 font-light mt-1.5 leading-none">Review all three views before publishing</p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 justify-center select-none">
                    {[
                      { tabId: "public-page", label: "Public page", desc: "What contributors see", icon: Globe },
                      { tabId: "contribute-flow", label: "Contribute", desc: "Payment flow", icon: CreditCard },
                      { tabId: "reveal-experience", label: "Reveal", desc: "Recipient experience", icon: Sparkles }
                    ].map((tb) => {
                      const TabIcon = tb.icon;
                      const isTabSel = previewTab === tb.tabId;
                      return (
                        <button
                          key={tb.tabId}
                          type="button"
                          onClick={() => setPreviewTab(tb.tabId)}
                          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isTabSel ? "bg-[#7C3AED] text-white shadow-sm" : "bg-white text-zinc-500 border border-purple-50 hover:bg-purple-50/50"
                          }`}
                        >
                          <TabIcon className="size-4" />
                          <div className="flex flex-col text-left leading-none">
                            <span>{tb.label}</span>
                            <span className={`text-[8.5px] font-light mt-0.5 leading-none ${isTabSel ? "text-purple-100" : "text-zinc-400"}`}>{tb.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Centered phone inside tab */}
                  <div className="flex justify-center py-6 select-none relative">
                    
                    <div className="relative w-[300px] h-[580px] rounded-[40px] bg-zinc-950 border-[10px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col border-zinc-950">
                      
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-900 rounded-b-xl z-50 flex items-center justify-center">
                        <div className="w-9 h-[3px] bg-zinc-800 rounded-full" />
                      </div>

                      <div className={`flex-grow bg-gradient-to-tr ${selectedGradient} flex flex-col text-white pt-8 px-4 pb-4 overflow-y-auto select-none no-scrollbar transition-all duration-500`}>
                        <div className="flex justify-between items-center text-[10px] font-bold px-1 opacity-95 mb-6 mt-1.5 font-mono">
                          <span>11:30</span>
                          <div className="flex items-center gap-1">
                            <span>•</span>
                            <span>5G</span>
                            <span>🔋</span>
                          </div>
                        </div>

                        {previewTab === "public-page" ? (
                          <div className="flex-grow flex flex-col justify-start text-center gap-4.5 py-4">
                            <span className="text-[9px] tracking-widest font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full text-purple-100 w-max mx-auto">
                              Live wishpool preview
                            </span>
                            <div className="size-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center text-3xl mx-auto mt-2">
                              {previewIcon}
                            </div>
                            <div className="flex flex-col gap-1 text-center">
                              <h3 className="text-lg font-extrabold tracking-tight leading-snug">{wTitle || "A Special Celebration"}</h3>
                              <p className="text-[11px] text-purple-100 opacity-90 leading-none">for {resolvedRecipient}</p>
                            </div>
                            <p className="text-[10px] text-purple-200 bg-black/20 px-3 py-3 rounded-xl border border-white/5 max-w-[240px] leading-relaxed font-light mx-auto">
                              {wDescription || "Share the story behind this celebration..."}
                            </p>
                            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-left shadow-lg mt-2 flex flex-col gap-2">
                              <div className="flex justify-between items-start">
                                <div className="flex flex-col text-left">
                                  <span className="text-[8.5px] uppercase font-bold tracking-wider text-purple-200 leading-none">Amount Raised</span>
                                  <span className="text-xl font-extrabold mt-1 tracking-tight font-mono text-yellow-300">$0</span>
                                </div>
                                <span className="text-[9px] text-purple-200 font-medium">Goal: ${wGoalFund}</span>
                              </div>
                              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-300 w-[0%]" />
                              </div>
                            </div>
                            <div className="bg-yellow-400 text-zinc-955 text-xs font-extrabold h-[36px] rounded-full flex items-center justify-center shadow-lg mt-4 leading-none">
                              Contribute Now
                            </div>
                          </div>
                        ) : previewTab === "contribute-flow" ? (
                          <div className="flex-grow flex flex-col justify-start text-center gap-4 py-4 animate-in fade-in duration-200">
                            <span className="text-[9px] tracking-widest font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full text-purple-100 w-max mx-auto">
                              Contribution flow
                            </span>
                            <div className="flex flex-col gap-0.5 text-center mt-3">
                              <span className="text-2xl font-extrabold text-yellow-300 font-mono tracking-tight">$00</span>
                              <span className="text-[9.5px] text-purple-100 opacity-90">Contribute to the wishpool.</span>
                            </div>

                            <div className="flex flex-wrap gap-1.5 justify-center select-none mt-2">
                              {wSuggestedAmounts.map((amt) => (
                                <span 
                                  key={amt}
                                  className="bg-white/15 border border-white/20 text-white text-[10px] font-extrabold px-3.5 py-1.5 rounded-full"
                                >
                                  ${amt}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-col text-left gap-1 mt-3">
                              <label className="text-[9.5px] font-bold text-purple-100 px-1">Message (Optional)</label>
                              <div className="w-full h-20 bg-white/10 border border-white/20 rounded-xl p-2.5 text-[10.5px] text-purple-100 italic">
                                Leave a heartfelt message...
                              </div>
                            </div>

                            <div className="bg-yellow-400 text-zinc-955 text-xs font-extrabold h-[36px] rounded-full flex items-center justify-center shadow-lg mt-5 leading-none">
                              Pay $100 securely
                            </div>
                          </div>
                        ) : (
                          <div className="flex-grow flex flex-col justify-start text-center gap-5 py-4 animate-in fade-in duration-200">
                            <span className="text-[9px] tracking-widest font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full text-purple-100 w-max mx-auto">
                              Recipient Reveal Page
                            </span>
                            <div className="size-16 rounded-full bg-white/10 border border-white/20 shadow-xl flex items-center justify-center text-3xl mx-auto mt-2 animate-bounce duration-1000">
                              🎁
                            </div>
                            <div className="flex flex-col gap-0.5 text-center">
                              <h3 className="text-base font-extrabold tracking-tight leading-tight">{wTitle || "A Special Celebration"}</h3>
                              <p className="text-[10px] text-purple-205 font-light mt-0.5">Hope you have the most amazing birthday!</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2 px-1.5 select-none">
                              <div className="bg-white/10 border border-white/10 rounded-xl p-2 flex flex-col items-center justify-center">
                                <span className="text-[18px] font-extrabold leading-none text-yellow-300 font-mono">12</span>
                                <span className="text-[7.5px] font-bold tracking-wider text-purple-200 mt-1 uppercase">Days Left</span>
                              </div>
                              <div className="bg-white/10 border border-white/10 rounded-xl p-2 flex flex-col items-center justify-center">
                                <span className="text-[18px] font-extrabold leading-none text-yellow-300 font-mono">14</span>
                                <span className="text-[7.5px] font-bold tracking-wider text-purple-200 mt-1 uppercase">Wishes</span>
                              </div>
                              <div className="bg-white/10 border border-white/10 rounded-xl p-2 flex flex-col items-center justify-center">
                                <span className="text-[18px] font-extrabold leading-none text-yellow-300 font-mono">$840</span>
                                <span className="text-[7.5px] font-bold tracking-wider text-purple-200 mt-1 uppercase">Raised</span>
                              </div>
                            </div>
                            <div className="bg-yellow-400 text-zinc-955 text-xs font-extrabold h-[36.5px] rounded-full flex items-center justify-center shadow-lg mt-6 leading-none cursor-pointer">
                              Open my celebration
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* FOOTER NAVIGATION */}
            <div className="flex justify-between items-center border-t border-zinc-100 pt-6 mt-6 select-none">
              <Button
                type="button"
                disabled={wizardStep === 1}
                onClick={() => setWizardStep(prev => prev - 1)}
                variant="outline"
                className="border-purple-200 text-zinc-700 hover:bg-purple-50 rounded-lg h-[40px] px-5 text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="size-4" /> Back
              </Button>

              {wizardStep < 4 ? (
                <Button
                  type="button"
                  onClick={() => setWizardStep(prev => prev + 1)}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg h-[40px] px-5 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Next <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handlePublishCelebration}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg h-[40px] px-5 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Publish
                </Button>
              )}
            </div>

          </div>

          {/* Right Column: Mobile Live Preview (Step 1-3 only) */}
          {wizardStep < 4 && (
            <div className="w-full xl:w-[350px] shrink-0 sticky top-[100px] flex flex-col items-center gap-4.5 select-none z-10 self-start">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#7C3AED]/75">Live Preview</span>
              
              <div className="relative w-[300px] h-[580px] rounded-[40px] bg-zinc-955 border-[10px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col z-10 border-zinc-950">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-900 rounded-b-xl z-50 flex items-center justify-center">
                  <div className="w-9 h-[3px] bg-zinc-800 rounded-full" />
                </div>

                <div className={`flex-grow bg-gradient-to-tr ${selectedGradient} flex flex-col text-white pt-8 px-4 pb-4 overflow-y-auto select-none no-scrollbar transition-all duration-500`}>
                  <div className="flex justify-between items-center text-[10px] font-bold px-1 opacity-90 mb-6 mt-1.5 font-mono">
                    <span>11:30</span>
                    <div className="flex items-center gap-1">
                      <span>•</span>
                      <span>5G</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {wizardStep === 3 ? (
                    <div className="flex-grow flex flex-col justify-start text-center gap-4 py-4 animate-in fade-in duration-200">
                      <span className="text-[9px] tracking-widest font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full text-purple-100 w-max mx-auto">
                        Contribution flow
                      </span>
                      <div className="flex flex-col gap-0.5 text-center mt-3">
                        <span className="text-2xl font-extrabold text-yellow-300 font-mono tracking-tight">$00</span>
                        <span className="text-[9.5px] text-purple-100 opacity-90">Contribute to the wishpool.</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 justify-center select-none mt-2">
                        {wSuggestedAmounts.map((amt) => (
                          <span 
                            key={amt}
                            className="bg-white/15 border border-white/20 text-white text-[10px] font-extrabold px-3.5 py-1.5 rounded-full"
                          >
                            ${amt}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col text-left gap-1 mt-3">
                        <label className="text-[9.5px] font-bold text-purple-100 px-1">Message (Optional)</label>
                        <div className="w-full h-20 bg-white/10 border border-white/20 rounded-xl p-2.5 text-[10.5px] text-purple-100 italic">
                          Leave a heartfelt message...
                        </div>
                      </div>

                      <div className="bg-yellow-400 text-zinc-955 text-xs font-extrabold h-[36px] rounded-full flex items-center justify-center shadow-lg mt-5 leading-none">
                        Pay $100 securely
                      </div>
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col justify-start text-center gap-4.5 py-4">
                      <span className="text-[9px] tracking-widest font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full text-purple-100 w-max mx-auto">
                        Live wishpool preview
                      </span>

                      <div className="size-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center text-3xl mx-auto mt-2 animate-pulse">
                        {previewIcon}
                      </div>

                      <div className="flex flex-col gap-1 text-center">
                        <h3 className="text-lg font-extrabold tracking-tight leading-snug">{wTitle || "A Special Celebration"}</h3>
                        <p className="text-[11px] text-purple-100 opacity-90 leading-none">for {resolvedRecipient}</p>
                      </div>

                      <p className="text-[10px] text-purple-200 bg-black/20 px-3 py-3 rounded-xl border border-white/5 max-w-[240px] leading-relaxed font-light mx-auto">
                        {wDescription || "Share the story behind this celebration..."}
                      </p>

                      <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-left shadow-lg mt-2 flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col text-left">
                            <span className="text-[8.5px] uppercase font-bold tracking-wider text-purple-200 leading-none">Amount Raised</span>
                            <span className="text-xl font-extrabold mt-1 tracking-tight font-mono text-yellow-300">$0</span>
                          </div>
                          <span className="text-[9px] text-purple-200 font-medium">Goal: ${wGoalFund}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-300 w-[0%]" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 mt-2">
                        <div className="bg-white text-zinc-800 rounded-xl p-2.5 shadow-md flex gap-2 items-start text-left">
                          <div className="size-6.5 rounded-full bg-purple-100 text-purple-700 font-extrabold text-[10px] flex items-center justify-center shrink-0">MC</div>
                          <div className="flex flex-col w-full text-left">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-[9px] text-zinc-900 leading-none">Marcus Chen</span>
                              <span className="font-extrabold text-[9px] text-purple-600 leading-none">$75</span>
                            </div>
                            <span className="text-[9.5px] text-zinc-500 font-light mt-1 italic leading-tight">"Happy birthday! 🎉"</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-400 hover:bg-yellow-300 text-zinc-955 text-xs font-extrabold h-[36px] rounded-full flex items-center justify-center shadow-lg mt-4 cursor-pointer leading-none">
                        Contribute Now
                      </div>

                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
