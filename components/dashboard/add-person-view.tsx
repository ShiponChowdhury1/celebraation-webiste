"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, User, Mail, Phone, Calendar, Trash2, Camera, Plus, 
  Sparkles, CheckCircle2, UserPlus, FileText, LockKeyhole, Heart, Info, ClipboardList
} from "lucide-react";

interface Milestone {
  type: string; // Birthday, Anniversary, Wedding, etc.
  date: string; // YYYY-MM-DD
  recurring: boolean;
  remindMe: string; // 1 week before, 2 weeks before, 1 month before, 3 months before
  notes: string;
}

interface AddPersonViewProps {
  setActiveTab: (tab: string) => void;
  setNetworkPeople: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function AddPersonView({
  setActiveTab,
  setNetworkPeople,
}: AddPersonViewProps) {
  // Form States
  const [name, setName] = useState("");
  const [category, setCategory] = useState("friend"); // friend, family, colleague, partner, custom
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  
  // Milestones State
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  // File Input Ref for Avatar
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to handle avatar upload click
  const triggerAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  // Add new blank milestone card
  const addMilestone = () => {
    const newMilestone: Milestone = {
      type: "Birthday",
      date: "",
      recurring: true,
      remindMe: "1 month before",
      notes: "",
    };
    setMilestones([...milestones, newMilestone]);
  };

  // Remove a milestone card
  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, idx) => idx !== index));
  };

  // Update a specific milestone field
  const updateMilestone = (index: number, field: keyof Milestone, value: any) => {
    setMilestones(milestones.map((m, idx) => {
      if (idx === index) {
        return { ...m, [field]: value };
      }
      return m;
    }));
  };

  // Calculate Profile Completeness Score
  const getCompleteness = () => {
    let filledCount = 0;
    const totalChecks = 6;

    if (name.trim()) filledCount += 1;
    if (avatarUrl) filledCount += 1;
    if (email.trim()) filledCount += 1;
    if (phone.trim()) filledCount += 1;
    if (milestones.length > 0 && milestones.every(m => m.date)) filledCount += 1;
    if (notes.trim()) filledCount += 1;

    const percent = Math.round((filledCount / totalChecks) * 100);
    const remaining = totalChecks - filledCount;

    return { percent, remaining, filledCount };
  };

  const { percent, remaining, filledCount } = getCompleteness();

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Build relationship string
    const relationStr = category.charAt(0).toUpperCase() + category.slice(1);

    // Get primary birthday from milestones or default text representation
    const bdayMilestone = milestones.find(m => m.type === "Birthday");
    let displayBirthday = "Not set";
    if (bdayMilestone && bdayMilestone.date) {
      const dateObj = new Date(bdayMilestone.date);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      displayBirthday = `${months[dateObj.getMonth()]} ${dateObj.getDate()}`;
    }

    const newPerson = {
      id: `person-${Date.now()}`,
      name: name,
      group: category,
      relation: relationStr,
      birthday: displayBirthday,
      daysLeft: bdayMilestone && bdayMilestone.date ? 15 : 999, // dummy days count
      avatar: avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      tags: milestones.map(m => m.type.toLowerCase()),
      milestones: milestones.map(m => ({
        type: m.type,
        date: m.date,
        notes: m.notes
      })),
      notes: notes
    };

    setNetworkPeople(prev => [newPerson, ...prev]);
    setActiveTab("network");
  };

  return (
    <div className="flex-grow overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full max-w-3xl mx-auto text-left font-sans">
      
      {/* 1. Back button & Header */}
      <div className="flex items-center gap-4 border-b border-purple-50/50 pb-6 shrink-0">
        <button 
          onClick={() => setActiveTab("network")}
          className="size-10 rounded-full border border-purple-100 hover:bg-purple-50 text-zinc-500 hover:text-[#7C3AED] flex items-center justify-center transition-all cursor-pointer bg-white"
        >
          <ArrowLeft className="size-4.5" />
        </button>
        <div className="flex flex-col text-left">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 tracking-tight font-serif leading-none">Add to Your Network</h1>
          <span className="text-xs text-zinc-400 font-light mt-1.5">Save an important person and their milestones</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">

        {/* 2. Profile Completeness Progress Card */}
        <div className="bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs flex flex-col gap-3.5">
          <div className="flex justify-between items-center text-xs font-bold select-none">
            <span className="text-zinc-500 uppercase tracking-widest">Profile completeness</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#7C3AED] font-extrabold text-sm">{percent}%</span>
              <span className="text-zinc-300 font-normal">|</span>
              <span className="text-zinc-400 font-light">{filledCount} / 6</span>
            </div>
          </div>
          <div className="w-full h-2.5 bg-purple-50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" 
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-400 font-light select-none">
            {remaining > 0 ? `Add ${remaining} more field${remaining > 1 ? "s" : ""} to complete the profile.` : "Profile is fully complete!"}
          </span>
        </div>

        {/* 3. Personal Info Card */}
        <div className="bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs flex flex-col gap-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-1.5 select-none">
            <User className="size-4 text-[#7C3AED]" /> Personal info
          </span>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            {/* Avatar Selector Block */}
            <div 
              onClick={triggerAvatarUpload}
              className="size-20 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-purple-100/50 transition-colors shrink-0"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar Preview" className="size-full object-cover" />
              ) : (
                <div className="size-full bg-[#7C3AED] flex items-center justify-center text-white text-3xl font-bold">
                  {name ? name.charAt(0).toUpperCase() : "?"}
                </div>
              )}
              {/* Overlay small camera circle */}
              <div className="absolute right-1.5 bottom-1.5 bg-white border border-zinc-150 size-6 rounded-full flex items-center justify-center shadow-sm">
                <Camera className="size-3.5 text-zinc-650" />
              </div>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleAvatarChange} 
                className="hidden" 
              />
            </div>

            {/* Inputs Block */}
            <div className="flex-grow w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-zinc-700">Full name <span className="text-[#FF2056]">*</span></label>
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Emma Johnson"
                    className="w-full bg-[#FAF8FF] border border-purple-50 focus:border-[#7C3AED] rounded-xl h-[44px] pl-10 pr-4 text-xs font-light text-zinc-800 outline-none transition-all"
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-zinc-700">Category <span className="text-[#FF2056]">*</span></label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#FAF8FF] border border-purple-50 focus:border-[#7C3AED] rounded-xl h-[44px] px-3.5 text-xs text-zinc-750 outline-none transition-all cursor-pointer"
                >
                  <option value="friend">Friend</option>
                  <option value="family">Family</option>
                  <option value="colleague">Colleague</option>
                  <option value="partner">Partner</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Contact Card */}
        <div className="bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs flex flex-col gap-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-1.5 select-none">
            <Mail className="size-4 text-[#7C3AED]" /> Contact <span className="text-zinc-300 font-normal lowercase">— optional</span>
          </span>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-bold text-zinc-700">Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="emma@example.com"
                  className="w-full bg-[#FAF8FF] border border-purple-50 focus:border-[#7C3AED] rounded-xl h-[44px] pl-10 pr-4 text-xs font-light text-zinc-800 outline-none transition-all"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
              </div>
              <span className="text-[10px] text-zinc-400 font-light select-none">Used to send them the reveal link directly</span>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-bold text-zinc-700">Phone</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 234-5678"
                  className="w-full bg-[#FAF8FF] border border-purple-50 focus:border-[#7C3AED] rounded-xl h-[44px] pl-10 pr-4 text-xs font-light text-zinc-800 outline-none transition-all"
                />
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Milestones & Dates Card */}
        <div className="bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs flex flex-col gap-4">
          <div className="flex justify-between items-center select-none">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-1.5">
              <Calendar className="size-4 text-[#7C3AED]" /> Milestones & dates
            </span>
            <span className="text-[10px] text-zinc-400 font-medium font-mono">{milestones.length} added</span>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {/* Show placeholder if list is empty */}
            {milestones.length === 0 ? (
              <div className="w-full py-8 border border-dashed border-purple-100 rounded-2xl flex flex-col items-center justify-center gap-2.5 text-center select-none">
                <Calendar className="size-7 text-zinc-300" />
                <span className="text-[11px] text-zinc-450 font-bold">No milestones yet. Add a birthday, anniversary, or custom date.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                {milestones.map((milestone, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#FAF8FF]/40 border border-purple-50/70 rounded-2xl p-5 relative text-left flex flex-col gap-4 animate-in fade-in duration-200"
                  >
                    {/* Delete button in top-right */}
                    <button 
                      type="button"
                      onClick={() => removeMilestone(idx)}
                      className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-[#FF2056] hover:bg-rose-50 rounded-full transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <Trash2 className="size-4" />
                    </button>

                    {/* Milestone details row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-zinc-700">Milestone type</label>
                        <select 
                          value={milestone.type}
                          onChange={(e) => updateMilestone(idx, "type", e.target.value)}
                          className="w-full bg-white border border-purple-100 rounded-xl h-[40px] px-3 text-xs text-zinc-700 outline-none cursor-pointer"
                        >
                          {["Birthday", "Anniversary", "Wedding", "Graduation", "Promotion", "Work Anniversary", "Baby Shower", "Retirement", "Custom"].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-zinc-700">Date</label>
                        <input 
                          type="date" 
                          required
                          value={milestone.date}
                          onChange={(e) => updateMilestone(idx, "date", e.target.value)}
                          className="w-full bg-white border border-purple-100 rounded-xl h-[40px] px-3 text-xs text-zinc-800 outline-none"
                        />
                      </div>
                    </div>

                    {/* Toggle row */}
                    <div className="flex items-center gap-3 select-none text-xs">
                      <span className="text-zinc-500 font-bold">Recurring annually</span>
                      {/* Simple custom toggle */}
                      <button
                        type="button"
                        onClick={() => updateMilestone(idx, "recurring", !milestone.recurring)}
                        className={`w-10 h-5.5 rounded-full relative transition-colors cursor-pointer border-none ${
                          milestone.recurring ? "bg-[#7C3AED]" : "bg-zinc-200"
                        }`}
                      >
                        <div 
                          className={`size-4.5 bg-white rounded-full absolute top-[2px] transition-all ${
                            milestone.recurring ? "left-[18px]" : "left-[2px]"
                          }`} 
                        />
                      </button>
                    </div>

                    {/* Remind me tags */}
                    <div className="flex flex-col gap-2.5">
                      <span className="text-xs font-bold text-zinc-700">Remind me</span>
                      <div className="flex flex-wrap gap-2.5">
                        {["1 week before", "2 weeks before", "1 month before", "3 months before"].map(rem => {
                          const isActive = milestone.remindMe === rem;
                          return (
                            <button
                              key={rem}
                              type="button"
                              onClick={() => updateMilestone(idx, "remindMe", rem)}
                              className={`h-8 px-3 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                                isActive 
                                  ? "bg-[#7C3AED] border-[#7C3AED] text-white" 
                                  : "bg-white border-zinc-150 text-zinc-550 hover:bg-zinc-50"
                              }`}
                            >
                              {isActive ? `✓ ${rem}` : rem}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Milestone description notes */}
                    <div className="flex flex-col gap-1.5">
                      <textarea 
                        rows={2}
                        value={milestone.notes}
                        onChange={(e) => updateMilestone(idx, "notes", e.target.value)}
                        placeholder="Notes about this milestone (optional)..."
                        className="w-full bg-white border border-purple-100 rounded-xl p-3 text-xs text-zinc-800 outline-none resize-none leading-relaxed"
                      />
                    </div>

                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={addMilestone}
              className="w-full h-11 border border-dashed border-purple-300 text-[#7C3AED] hover:bg-purple-50/50 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-white"
            >
              <Plus className="size-4" /> Add milestone
            </button>
          </div>
        </div>

        {/* 6. Notes Card */}
        <div className="bg-white border border-purple-50 rounded-3xl p-6 text-left shadow-2xs flex flex-col gap-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-1.5 select-none">
            <ClipboardList className="size-4 text-[#7C3AED]" /> Notes
          </span>

          <div className="flex flex-col gap-1.5 text-left w-full">
            <label className="text-xs font-bold text-zinc-700">Private notes</label>
            <textarea 
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Loves surprise parties. Allergic to nuts. Prefers experiences over physical gifts..."
              className="w-full bg-[#FAF8FF] border border-purple-50 focus:border-[#7C3AED] rounded-xl p-4 text-xs text-zinc-800 outline-none resize-none leading-relaxed"
            />
            <span className="text-[10px] text-zinc-400 font-light select-none">Personal context - favourite gifts, allergies, things to remember. Only you can see this.</span>
          </div>
        </div>

        {/* 7. Footer buttons row */}
        <div className="flex justify-between items-center gap-4 mt-4 select-none">
          <Button 
            type="button"
            onClick={() => setActiveTab("network")}
            variant="outline"
            className="w-full max-w-[140px] border-zinc-200 text-zinc-550 hover:bg-zinc-50 h-[44px] text-xs font-bold rounded-xl cursor-pointer"
          >
            Cancel
          </Button>

          <Button 
            type="submit"
            className="w-full max-w-[200px] bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer border-none shadow-sm"
          >
            <UserPlus className="size-4" /> Add to network
          </Button>
        </div>

      </form>

    </div>
  );
}
