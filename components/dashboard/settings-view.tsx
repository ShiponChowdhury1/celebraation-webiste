"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  User, Bell, CreditCard, ShieldCheck, Camera, Check, 
  FileText, Link2, Key, Lock, Laptop, Smartphone, LogOut, 
  Trash2, Trash, ChevronRight 
} from "lucide-react";

interface SettingsViewProps {
  userProfile: { name: string; email: string; avatar: string };
  setUserProfile: React.Dispatch<React.SetStateAction<{ name: string; email: string; avatar: string }>>;
  profileName: string;
  setProfileName: (val: string) => void;
  profileEmail: string;
  setProfileEmail: (val: string) => void;
  profilePhone: string;
  setProfilePhone: (val: string) => void;
  profileBio: string;
  setProfileBio: (val: string) => void;
  profileWebsite: string;
  setProfileWebsite: (val: string) => void;
  profileAvatar: string;
  setProfileAvatar: (val: string) => void;
  notifNewContrib: boolean;
  setNotifNewContrib: (val: boolean) => void;
  notifGoalReached: boolean;
  setNotifGoalReached: (val: boolean) => void;
  notifUpcomingReminder: boolean;
  setNotifUpcomingReminder: (val: boolean) => void;
  notifContribMsgs: boolean;
  setNotifContribMsgs: (val: boolean) => void;
  currentPassword: string;
  setCurrentPassword: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  is2FAEnabled: boolean;
  setIs2FAEnabled: (val: boolean) => void;
  sessions: any[];
  handleRevokeSession: (sessId: string) => void;
  handleSaveProfile: (e: React.FormEvent) => void;
  handleUpdatePassword: (e: React.FormEvent) => void;
  triggerToast: (msg: string) => void;
}

export default function SettingsView({
  userProfile,
  setUserProfile,
  profileName,
  setProfileName,
  profileEmail,
  setProfileEmail,
  profilePhone,
  setProfilePhone,
  profileBio,
  setProfileBio,
  profileWebsite,
  setProfileWebsite,
  profileAvatar,
  setProfileAvatar,
  notifNewContrib,
  setNotifNewContrib,
  notifGoalReached,
  setNotifGoalReached,
  notifUpcomingReminder,
  setNotifUpcomingReminder,
  notifContribMsgs,
  setNotifContribMsgs,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  is2FAEnabled,
  setIs2FAEnabled,
  sessions,
  handleRevokeSession,
  handleSaveProfile,
  handleUpdatePassword,
  triggerToast
}: SettingsViewProps) {
  
  const [settingsSubTab, setSettingsSubTab] = useState("profile"); // profile, notification, billing, security

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full max-w-4xl text-left font-sans">
      
      {/* Settings Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-zinc-955 tracking-tight leading-tight select-none">Settings</h1>
        <span className="text-xs text-zinc-500 font-light select-none">Manage your account, notifications, and preferences</span>
      </div>

      {/* Subtabs horizontal bar */}
      <div className="flex flex-wrap gap-2.5 select-none border-b border-purple-100/30 pb-4">
        {[
          { filterId: "profile", label: "Profile", icon: User },
          { filterId: "notification", label: "Notification", icon: Bell },
          { filterId: "billing", label: "Billing", icon: CreditCard },
          { filterId: "security", label: "Security", icon: ShieldCheck },
        ].map((subTab) => {
          const TabIcon = subTab.icon;
          const isSelected = settingsSubTab === subTab.filterId;
          return (
            <button
              key={subTab.filterId}
              onClick={() => setSettingsSubTab(subTab.filterId)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#7C3AED] text-white shadow-sm"
                  : "bg-white text-zinc-505 border border-purple-50 hover:bg-purple-50/50"
              }`}
            >
              <TabIcon className="size-4" />
              <span>{subTab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUBTAB DETAILS: PROFILE */}
      {settingsSubTab === "profile" && (
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
          {/* Profile Photo card */}
          <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 flex flex-col gap-4 shadow-2xs">
            <h3 className="font-extrabold text-zinc-900 text-sm">Profile photo</h3>
            <div className="flex items-center gap-5.5 mt-2">
              <div className="relative">
                <img src={profileAvatar} alt="Profile avatar" className="size-20 rounded-2xl object-cover border border-purple-100 shadow-sm" />
                <button 
                  onClick={() => triggerToast("Avatar picker opened")}
                  className="absolute -bottom-1 -right-1 size-7 bg-white hover:bg-purple-50 text-zinc-650 rounded-full border border-purple-100 shadow-md flex items-center justify-center hover:text-[#7C3AED] transition-colors"
                >
                  <Camera className="size-3.5" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={() => triggerToast("Avatar uploader triggered")}
                  variant="outline"
                  className="border-purple-200 text-zinc-700 bg-white hover:bg-purple-50 h-[38px] rounded-lg text-xs font-bold px-4"
                >
                  Upload new photo
                </Button>
                <span className="text-[10px] text-zinc-400 font-light">JPG, PNG or GIF. Max 5MB</span>
              </div>
            </div>
          </div>

          {/* Personal Information form */}
          <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 flex flex-col gap-6 shadow-2xs">
            <div className="border-b border-zinc-100 pb-4">
              <h3 className="font-extrabold text-zinc-900 text-sm">Personal information</h3>
              <p className="text-xs text-zinc-400 font-light mt-1">Update your name and public profile details.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
              
              {/* Full Name */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-center">
                <label className="md:col-span-3 text-xs font-bold text-zinc-700">Full name</label>
                <div className="md:col-span-9 w-full">
                  <input 
                    type="text" 
                    required 
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-800 outline-none w-full transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-start">
                <div className="md:col-span-3 flex flex-col text-left">
                  <label className="text-xs font-bold text-zinc-700">Email</label>
                  <span className="text-[10px] text-zinc-400 font-light mt-0.5 leading-tight font-sans">Used for login and receipts</span>
                </div>
                <div className="md:col-span-9 w-full">
                  <input 
                    type="email" 
                    required 
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-800 outline-none w-full transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-center">
                <label className="md:col-span-3 text-xs font-bold text-zinc-700">Phone</label>
                <div className="md:col-span-9 w-full">
                  <input 
                    type="text" 
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-800 outline-none w-full transition-all"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-start">
                <div className="md:col-span-3 flex flex-col text-left">
                  <label className="text-xs font-bold text-zinc-700">Bio</label>
                  <span className="text-[10px] text-zinc-400 font-light mt-0.5 leading-tight">Shown on your public celebrations</span>
                </div>
                <div className="md:col-span-9 w-full">
                  <textarea 
                    rows={3}
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg p-3 text-sm text-zinc-808 outline-none w-full transition-all resize-none"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-center">
                <label className="md:col-span-3 text-xs font-bold text-zinc-700">Website</label>
                <div className="md:col-span-9 w-full">
                  <input 
                    type="text" 
                    value={profileWebsite}
                    onChange={(e) => setProfileWebsite(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-808 outline-none w-full transition-all"
                  />
                </div>
              </div>

              {/* Submit Row */}
              <div className="flex justify-end mt-4">
                <Button 
                  type="submit" 
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[42px] px-6 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Check className="size-4" /> Save changes
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* SUBTAB DETAILS: NOTIFICATION */}
      {settingsSubTab === "notification" && (
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
          <div className="bg-white border border-purple-50/70 rounded-[20px] shadow-2xs overflow-hidden">
            
            <div className="px-6 py-5 border-b border-zinc-100">
              <h3 className="font-extrabold text-zinc-900 text-sm">Email notifications</h3>
              <p className="text-xs text-zinc-400 font-light mt-1">Choose which emails Celebr sends you.</p>
            </div>

            <div className="divide-y divide-zinc-100/80">
              
              {/* Toggle item 1: New contribution */}
              <div className="p-6 flex items-center justify-between gap-6 hover:bg-zinc-50/10 transition-colors">
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm text-zinc-800 leading-tight">New contribution</span>
                  <span className="text-xs text-zinc-400 font-light mt-1">When someone contributes to your WishPool</span>
                </div>
                <button 
                  onClick={() => setNotifNewContrib(!notifNewContrib)}
                  className={`w-11 h-6 rounded-full transition-all flex items-center p-0.5 shrink-0 cursor-pointer ${
                    notifNewContrib ? "bg-[#7C3AED] justify-end" : "bg-zinc-200 justify-start"
                  }`}
                >
                  <span className="size-5 rounded-full bg-white shadow-md transition-all" />
                </button>
              </div>

              {/* Toggle item 2: Goal reached */}
              <div className="p-6 flex items-center justify-between gap-6 hover:bg-zinc-50/10 transition-colors">
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm text-zinc-850 leading-tight">Goal reached</span>
                  <span className="text-xs text-zinc-400 font-light mt-1">When your WishPool hits 100%</span>
                </div>
                <button 
                  onClick={() => setNotifGoalReached(!notifGoalReached)}
                  className={`w-11 h-6 rounded-full transition-all flex items-center p-0.5 shrink-0 cursor-pointer ${
                    notifGoalReached ? "bg-[#7C3AED] justify-end" : "bg-zinc-200 justify-start"
                  }`}
                >
                  <span className="size-5 rounded-full bg-white shadow-md transition-all" />
                </button>
              </div>

              {/* Toggle item 3: Upcoming event reminder */}
              <div className="p-6 flex items-center justify-between gap-6 hover:bg-zinc-50/10 transition-colors">
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm text-zinc-800 leading-tight">Upcoming event reminder</span>
                  <span className="text-xs text-zinc-400 font-light mt-1">3 days and 1 day before an event</span>
                </div>
                <button 
                  onClick={() => setNotifUpcomingReminder(!notifUpcomingReminder)}
                  className={`w-11 h-6 rounded-full transition-all flex items-center p-0.5 shrink-0 cursor-pointer ${
                    notifUpcomingReminder ? "bg-[#7C3AED] justify-end" : "bg-zinc-200 justify-start"
                  }`}
                >
                  <span className="size-5 rounded-full bg-white shadow-md transition-all" />
                </button>
              </div>

              {/* Toggle item 4: Contributor messages */}
              <div className="p-6 flex items-center justify-between gap-6 hover:bg-zinc-50/10 transition-colors">
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm text-zinc-800 leading-tight">Contributor messages</span>
                  <span className="text-xs text-zinc-400 font-light mt-1">When a message is attached to a contribution</span>
                </div>
                <button 
                  onClick={() => setNotifContribMsgs(!notifContribMsgs)}
                  className={`w-11 h-6 rounded-full transition-all flex items-center p-0.5 shrink-0 cursor-pointer ${
                    notifContribMsgs ? "bg-[#7C3AED] justify-end" : "bg-zinc-200 justify-start"
                  }`}
                >
                  <span className="size-5 rounded-full bg-white shadow-md transition-all" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SUBTAB DETAILS: BILLING */}
      {settingsSubTab === "billing" && (
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
          
          {/* Payment Method card */}
          <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 flex flex-col gap-4 shadow-2xs">
            <h3 className="font-extrabold text-zinc-900 text-sm">Payment method</h3>
            <div className="bg-[#FAF8FF] border border-purple-100/30 rounded-xl p-4.5 flex items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3.5">
                <div className="size-10 rounded-lg bg-white border border-purple-100/50 flex items-center justify-center shrink-0">
                  <CreditCard className="size-5 text-[#7C3AED]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-zinc-800 leading-tight">Visa ending in 4521</span>
                  <span className="text-[10px] text-zinc-400 font-light mt-0.5">Expires 09/2027</span>
                </div>
              </div>
              <button 
                onClick={() => triggerToast("Update payment uploader triggered")}
                className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>

          {/* Billing History list */}
          <div className="bg-white border border-[#F4F1FB] rounded-[20px] shadow-2xs overflow-hidden text-left">
            <div className="px-6 py-4 border-b border-zinc-100">
              <h3 className="font-extrabold text-zinc-900 text-sm">Billing history</h3>
            </div>
            <div className="divide-y divide-zinc-100/80">
              {[
                { plan: "Pro Plan", date: "Jul 1, 2025", price: "$9.00" },
                { plan: "Pro Plan", date: "Jun 1, 2025", price: "$9.00" },
                { plan: "Pro Plan", date: "May 1, 2025", price: "$9.00" },
              ].map((bill, idx) => (
                <div key={idx} className="p-5 flex items-center justify-between hover:bg-zinc-50/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400">
                      <FileText className="size-4.5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-sm text-zinc-805 leading-tight">{bill.plan}</span>
                      <span className="text-[10px] text-zinc-400 mt-0.5">{bill.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-extrabold text-zinc-800 font-mono">{bill.price}</span>
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full select-none">
                      Paid
                    </span>
                    <button 
                      onClick={() => triggerToast(`Downloading PDF for ${bill.date}`)}
                      className="text-xs font-bold text-zinc-450 hover:text-[#7C3AED] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Link2 className="size-3.5" /> PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUBTAB DETAILS: SECURITY */}
      {settingsSubTab === "security" && (
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
          
          {/* Change Password Box */}
          <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 flex flex-col gap-5 shadow-2xs">
            <h3 className="font-extrabold text-zinc-900 text-sm">Change password</h3>
            
            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4.5 mt-2">
              
              {/* Current Password */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-center">
                <label className="md:col-span-3 text-xs font-bold text-zinc-700">Current password</label>
                <div className="md:col-span-9 w-full relative">
                  <input 
                    type="password" 
                    required 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 pl-10 text-sm text-zinc-800 outline-none w-full transition-all"
                  />
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                </div>
              </div>

              {/* New Password */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-center">
                <label className="md:col-span-3 text-xs font-bold text-zinc-700">New password</label>
                <div className="md:col-span-9 w-full relative">
                  <input 
                    type="password" 
                    required 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 pl-10 text-sm text-zinc-800 outline-none w-full transition-all"
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                </div>
              </div>

              <div className="flex justify-start mt-2">
                <Button 
                  type="submit" 
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[42px] px-6 rounded-lg shadow-sm transition-all"
                >
                  Update password
                </Button>
              </div>

            </form>
          </div>

          {/* 2FA Card */}
          <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 flex flex-col gap-4 shadow-2xs">
            <div className="border-b border-zinc-100 pb-3.5">
              <h3 className="font-extrabold text-zinc-900 text-sm">Two-factor authentication</h3>
              <p className="text-xs text-zinc-400 font-light mt-1">Add an extra layer of security to your account.</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-col text-left">
                <span className="font-bold text-sm text-zinc-850">Authenticator app</span>
                <span className="text-xs text-zinc-400 font-light mt-0.5">Not enabled</span>
              </div>
              <Button 
                onClick={() => {
                  setIs2FAEnabled(!is2FAEnabled);
                  triggerToast(is2FAEnabled ? "2FA Disabled" : "2FA Setup Wizard Opened");
                }}
                variant="outline"
                className="border-purple-200 text-zinc-700 bg-white hover:bg-purple-50 h-[38px] rounded-lg text-xs font-bold px-4"
              >
                {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
              </Button>
            </div>
          </div>

          {/* Active Sessions list */}
          <div className="bg-white border border-[#F4F1FB] rounded-[20px] shadow-2xs overflow-hidden text-left">
            <div className="px-6 py-4 border-b border-zinc-100">
              <h3 className="font-extrabold text-zinc-900 text-sm">Active sessions</h3>
            </div>
            <div className="divide-y divide-zinc-100/80">
              {sessions.map((sess) => {
                const SessionIcon = sess.device.includes("MacBook") ? Laptop : Smartphone;
                return (
                  <div key={sess.id} className="p-5 flex items-center justify-between hover:bg-zinc-50/10 transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className="size-9 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400">
                        <SessionIcon className="size-4.5" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-sm text-zinc-800 leading-tight">{sess.device}</span>
                        <span className="text-[10px] text-zinc-400 mt-0.5">{sess.location}</span>
                      </div>
                    </div>
                    {sess.current ? (
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full select-none">
                        Current
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleRevokeSession(sess.id)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Danger zone warning block */}
          <div className="bg-[#FFF5F6] border border-rose-100 rounded-[20px] p-6 flex flex-col gap-4 text-left select-none">
            <div className="flex items-center gap-2 text-rose-655">
              <Trash className="size-4.5" />
              <h4 className="text-xs font-bold uppercase tracking-widest">Danger zone</h4>
            </div>
            <div className="flex flex-col gap-3 mt-1.5">
              
              <button 
                onClick={() => triggerToast("Signing out of all other sessions...")}
                className="bg-white border border-rose-100 hover:border-rose-300 rounded-xl p-4.5 flex items-center justify-between gap-4 cursor-pointer text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="size-4.5 text-rose-505" />
                  <span className="text-xs font-bold text-rose-600">Sign out of all devices</span>
                </div>
                <ChevronRight className="size-4 text-rose-455" />
              </button>

              <button 
                onClick={() => triggerToast("Account deletion prompt loaded...")}
                className="bg-white border border-rose-100 hover:border-rose-300 rounded-xl p-4.5 flex items-center justify-between gap-4 cursor-pointer text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Trash2 className="size-4.5 text-rose-500" />
                  <span className="text-xs font-bold text-rose-600">Delete account permanently</span>
                </div>
                <ChevronRight className="size-4 text-rose-455" />
              </button>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
