"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  X, Edit2, UserPlus, Eye, Link2, Trash2, Archive, 
  Clock, ShieldCheck, Check
} from "lucide-react";

interface ModalsContainerProps {
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  modalEvent: any;
  formTitle: string;
  setFormTitle: (val: string) => void;
  formRecipient: string;
  setFormRecipient: (val: string) => void;
  formRelation: string;
  setFormRelation: (val: string) => void;
  formStatus: string;
  setFormStatus: (val: string) => void;
  formDate: string;
  setFormDate: (val: string) => void;
  formTarget: string;
  setFormTarget: (val: string) => void;
  handleEditSubmit: (e: React.FormEvent) => void;
  handleDeleteConfirm: () => void;
  handleArchiveConfirm: () => void;
  personName: string;
  setPersonName: (val: string) => void;
  personRole: string;
  setPersonRole: (val: string) => void;
  personGroup: string;
  setPersonGroup: (val: string) => void;
  personBirthday: string;
  setPersonBirthday: (val: string) => void;
  personTags: string;
  setPersonTags: (val: string) => void;
  handleAddPerson: (e: React.FormEvent) => void;
  handleRemovePersonConfirm: () => void;
  handleCopyLink: (title: string) => void;
  setWTitle: (val: string) => void;
  setWRecipient: (val: string) => void;
  setWType: (val: string) => void;
  setWDescription: (val: string) => void;
  setActiveTab: (tab: string) => void;
  setWizardStep: (step: number) => void;
}

export default function ModalsContainer({
  activeModal,
  setActiveModal,
  modalEvent,
  formTitle,
  setFormTitle,
  formRecipient,
  setFormRecipient,
  formRelation,
  setFormRelation,
  formStatus,
  setFormStatus,
  formDate,
  setFormDate,
  formTarget,
  setFormTarget,
  handleEditSubmit,
  handleDeleteConfirm,
  handleArchiveConfirm,
  personName,
  setPersonName,
  personRole,
  setPersonRole,
  personGroup,
  setPersonGroup,
  personBirthday,
  setPersonBirthday,
  personTags,
  setPersonTags,
  handleAddPerson,
  handleRemovePersonConfirm,
  handleCopyLink,
  setWTitle,
  setWRecipient,
  setWType,
  setWDescription,
  setActiveTab,
  setWizardStep
}: ModalsContainerProps) {

  if (!activeModal) return null;

  return (
    <>
      {/* 3. MODAL: EDIT CELEBRATION */}
      {activeModal === "edit" && modalEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100 font-sans">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-808 rounded-full cursor-pointer"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-3.5 border-b border-zinc-100 pb-4 mb-5">
              <div className="size-10 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center">
                <Edit2 className="size-5" />
              </div>
              <h2 className="text-xl font-extrabold text-zinc-900 font-sans">Edit Celebration</h2>
            </div>
            
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-zinc-700 mb-1.5">Celebration Title</label>
                <input 
                  type="text" 
                  required 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-900 outline-none w-full transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Recipient Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formRecipient}
                    onChange={(e) => setFormRecipient(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-850 outline-none w-full transition-all"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Relationship</label>
                  <select 
                    value={formRelation}
                    onChange={(e) => setFormRelation(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3 text-sm text-zinc-800 outline-none w-full transition-all cursor-pointer"
                  >
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                    <option value="Friend">Friend</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Nephew">Nephew</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Target Date</label>
                  <input 
                    type="text" 
                    required 
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] text-sm text-zinc-855 outline-none w-full transition-all rounded-lg h-[44px] px-3"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Goal Fund ($)</label>
                  <input 
                    type="number" 
                    required
                    value={formTarget}
                    onChange={(e) => setFormTarget(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-900 outline-none w-full transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-zinc-700 mb-1.5">Status</label>
                <select 
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                  className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3 text-sm text-zinc-808 outline-none w-full transition-all cursor-pointer"
                >
                  <option value="live">Live</option>
                  <option value="draft">Draft</option>
                  <option value="closed">Closed</option>
                  <option value="revealed">Revealed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] rounded-lg shadow-sm transition-all mt-2 cursor-pointer">
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: PREVIEW PAGE */}
      {activeModal === "preview" && modalEvent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 select-none">
          <div className="bg-[#FAF8FF] rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100 max-h-[85vh] overflow-y-auto font-sans">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-405 hover:text-zinc-850 rounded-full cursor-pointer"
            >
              <X className="size-5.5" />
            </button>

            <div className="w-full bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden mb-6 flex flex-col gap-4.5">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full w-max select-none">Live wishpool preview</span>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{modalEvent.icon}</span>
                <div className="flex flex-col">
                  <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">{modalEvent.title}</h2>
                  <span className="text-xs text-purple-200 font-light mt-0.5">Celebrating {modalEvent.recipient} ({modalEvent.relation})</span>
                </div>
              </div>
              <p className="text-xs text-purple-100 font-light max-w-md leading-relaxed mt-1">
                "Welcome to {modalEvent.recipient}'s WishPool! Let's fill this pool with love, messages, and help them hit their milestones."
              </p>
            </div>

            <div className="bg-white border border-purple-100/50 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Amount Raised</span>
                  <span className="text-3xl font-extrabold text-zinc-900 leading-none">${modalEvent.raised ? modalEvent.raised.toLocaleString() : "0"}</span>
                  <span className="text-[11px] text-zinc-400 font-light mt-1">Goal of ${modalEvent.target ? modalEvent.target.toLocaleString() : "1,000"}</span>
                </div>
                <div className="bg-purple-50 text-[#7C3AED] px-4 py-2.5 rounded-2xl text-center flex flex-col shrink-0 border border-purple-100">
                  <span className="text-base font-extrabold">{modalEvent.progress || 0}%</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider opacity-75">Reached</span>
                </div>
              </div>

              <div className="w-full h-3 bg-purple-50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${Math.min(modalEvent.progress || 0, 100)}%` }} />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-1.5">
                <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] rounded-full text-xs transition-all shadow-sm cursor-pointer">
                  Add to WishPool
                </Button>
                <Button 
                  onClick={() => handleCopyLink(modalEvent.title || modalEvent.name)}
                  variant="outline" 
                  className="border-purple-200 text-[#7C3AED] bg-white hover:bg-purple-50 font-bold h-[44px] rounded-full text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Link2 className="size-4" /> Share Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL: DELETE CONFIRMATION */}
      {activeModal === "delete" && modalEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center animate-in zoom-in-95 duration-250 border border-purple-100 font-sans">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-805 rounded-full cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="size-12 rounded-full bg-rose-50 border border-rose-100 text-[#FF2056] flex items-center justify-center mx-auto mb-4 mt-2">
              <Trash2 className="size-5 animate-bounce" />
            </div>

            <h3 className="text-lg font-extrabold text-zinc-955 mb-2">Delete Celebration?</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
              Are you sure you want to delete <span className="font-bold text-zinc-700">"{modalEvent.title}"</span>? This will permanently close the WishPool and cannot be undone.
            </p>

            <div className="flex gap-3 font-sans w-full">
              <Button 
                onClick={() => setActiveModal(null)}
                variant="outline" 
                className="flex-1 shrink border-purple-100 text-zinc-550 hover:bg-zinc-50 h-[42px] text-xs font-bold rounded-lg cursor-pointer"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDeleteConfirm}
                className="flex-1 shrink bg-[#FF2056] hover:bg-rose-600 text-white h-[42px] text-xs font-bold rounded-lg shadow-sm cursor-pointer"
              >
                Delete Page
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: ARCHIVE CONFIRMATION */}
      {activeModal === "archive" && modalEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center animate-in zoom-in-95 duration-250 border border-purple-100 font-sans">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-450 hover:text-[#0D0A1A] rounded-full cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="size-12 rounded-full bg-purple-50 border border-purple-100 text-[#7C3AED] flex items-center justify-center mx-auto mb-4 mt-2">
              <Archive className="size-5" />
            </div>

            <h3 className="text-lg font-extrabold text-zinc-955 mb-2">Archive Celebration?</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
              Are you sure you want to archive <span className="font-bold text-zinc-750">"{modalEvent.title}"</span>? This hides it from active layouts but keeps the page and contributors' messages intact.
            </p>

            <div className="flex gap-3 w-full">
              <Button 
                onClick={() => setActiveModal(null)}
                variant="outline" 
                className="flex-1 shrink border-purple-105 text-zinc-505 hover:bg-zinc-50 h-[42px] text-xs font-bold rounded-lg cursor-pointer"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleArchiveConfirm}
                className="flex-1 shrink bg-[#7C3AED] hover:bg-[#6D28D9] text-white h-[42px] text-xs font-bold rounded-lg shadow-sm cursor-pointer"
              >
                Archive Page
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 8. MODAL: ADD / EDIT PERSON TO NETWORK */}
      {(activeModal === "add-person" || activeModal === "edit-person") && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100 font-sans">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full cursor-pointer"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-3.5 border-b border-zinc-100 pb-4 mb-5">
              <div className="size-10 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center">
                <UserPlus className="size-5" />
              </div>
              <h2 className="text-xl font-extrabold text-zinc-900">
                {activeModal === "edit-person" ? "Edit Contact" : "Add to Network"}
              </h2>
            </div>
            
            <form onSubmit={handleAddPerson} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-zinc-700 mb-1.5">Person's Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="e.g. Emma Johnson" 
                  className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-900 outline-none w-full transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Relationship Group</label>
                  <select 
                    value={personGroup}
                    onChange={(e) => setPersonGroup(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3 text-sm text-zinc-800 outline-none w-full transition-all cursor-pointer"
                  >
                    <option value="family">Family</option>
                    <option value="friend">Friend</option>
                    <option value="colleague">Colleague</option>
                    <option value="partner">Partner</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Specific Relation</label>
                  <input 
                    type="text" 
                    required 
                    value={personRole}
                    onChange={(e) => setPersonRole(e.target.value)}
                    placeholder="e.g. Sister, Best Friend" 
                    className="bg-[#FAF8FF] border border-purple-100 rounded-lg h-[44px] px-3.5 text-sm text-zinc-808 outline-none w-full transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Birthday Date</label>
                  <input 
                    type="date" 
                    required={activeModal === "add-person"}
                    value={personBirthday}
                    onChange={(e) => setPersonBirthday(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 rounded-lg h-[44px] px-3 text-sm text-zinc-850 outline-none w-full transition-all animate-in"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    value={personTags}
                    onChange={(e) => setPersonTags(e.target.value)}
                    placeholder="e.g. close, tech, paris" 
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-900 outline-none w-full transition-all"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] rounded-lg shadow-sm transition-all mt-2 cursor-pointer">
                {activeModal === "edit-person" ? "Save Changes" : "Add Contact"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* 9. MODAL: VIEW NETWORK PROFILE */}
      {activeModal === "view-person" && modalEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[#FAF8FF] rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100 font-sans">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full animate-in cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="flex flex-col items-center text-center gap-3.5 border-b border-zinc-100 pb-5 mb-5 select-none">
              <img src={modalEvent.avatar} alt={modalEvent.name} className="size-20 rounded-full object-cover border-2 border-[#7C3AED] shadow-md animate-in" />
              <div className="flex flex-col">
                <h2 className="text-xl font-extrabold text-zinc-900 leading-tight">{modalEvent.name}</h2>
                <span className="text-xs text-zinc-400 font-medium mt-1 uppercase tracking-widest">{modalEvent.relation} ({modalEvent.group})</span>
              </div>
              <div className="flex gap-1.5 flex-wrap justify-center mt-0.5">
                {modalEvent.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="bg-purple-100 text-[#7C3AED] text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 select-none">
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Active Milestones</h4>
                <div className="bg-white border border-purple-100/50 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3 font-sans">
                    <span className="text-2xl">{modalEvent.milestoneType.includes("Wedding") ? "💍" : "🎂"}</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-zinc-800 leading-tight">{modalEvent.milestoneType}</span>
                      <span className="text-[10px] text-zinc-400 mt-0.5">{modalEvent.milestoneDate}</span>
                    </div>
                  </div>
                  <span className="bg-rose-50 text-[#FF2056] border border-rose-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono">
                    In {modalEvent.daysLeft} days
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-1">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Past pool activity</h4>
                {modalEvent.pastCelebration ? (
                  <div className="bg-white border border-zinc-100 rounded-2xl p-4 flex items-center justify-between font-sans">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{modalEvent.pastCelebration.icon}</span>
                      <span className="font-bold text-sm text-zinc-800">Celebration Pool Registry</span>
                    </div>
                    <span className="text-xs font-semibold text-zinc-400 font-mono">{modalEvent.pastCelebration.date}</span>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-400 font-light italic">No previous WishPool activity logged.</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button 
                  onClick={() => {
                    setWTitle(`${modalEvent.name}'s Celebration`);
                    setWRecipient(modalEvent.name);
                    setWType("Birthday");
                    setWDescription(`${modalEvent.name}'s milestone is coming up. Help them celebrate!`);
                    setActiveTab("create-celebration");
                    setWizardStep(1);
                    setActiveModal(null);
                  }}
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[42px] rounded-xl text-xs shadow-sm transition-all cursor-pointer"
                >
                  Create WishPool
                </Button>
                <Button 
                  onClick={() => {
                    setPersonName(modalEvent.name);
                    setPersonRole(modalEvent.relation);
                    setPersonGroup(modalEvent.group);
                    setPersonBirthday("");
                    setPersonTags(modalEvent.tags.join(", "));
                    setActiveModal("edit-person");
                  }}
                  variant="outline"
                  className="w-full border-purple-100 text-zinc-655 bg-white hover:bg-purple-50 font-bold h-[42px] rounded-xl text-xs transition-all cursor-pointer"
                >
                  Edit Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. MODAL: REMOVE NETWORK CONTACT */}
      {activeModal === "remove-person" && modalEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center animate-in zoom-in-95 duration-250 border border-purple-100 font-sans">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="size-12 rounded-full bg-rose-50 border border-rose-100 text-[#FF2056] flex items-center justify-center mx-auto mb-4 mt-2">
              <Trash2 className="size-5 animate-bounce" />
            </div>

            <h3 className="text-lg font-extrabold text-zinc-955 mb-2">Remove Contact?</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
              Are you sure you want to remove <span className="font-bold text-zinc-700">"{modalEvent.name}"</span> from your Celebration Network? This cannot be undone.
            </p>

            <div className="flex gap-3 w-full">
              <Button 
                onClick={() => setActiveModal(null)}
                variant="outline" 
                className="flex-1 shrink border-purple-100 text-zinc-500 hover:bg-zinc-50 h-[42px] text-xs font-bold rounded-lg cursor-pointer"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRemovePersonConfirm}
                className="flex-1 shrink bg-[#FF2056] hover:bg-rose-600 text-white h-[42px] text-xs font-bold rounded-lg shadow-sm cursor-pointer"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
