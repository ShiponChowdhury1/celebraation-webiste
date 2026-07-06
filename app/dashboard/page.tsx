"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Calendar, Users, BarChart3, Bell, Settings, 
  LogOut, Plus, Search, Menu, X, DollarSign, Gift, Megaphone, 
  UserPlus, ChevronRight, ShieldCheck, Clock, Check 
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Profile Data
const userProfile = {
  name: "Jamie Rivera",
  email: "jamie@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
};

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);

  // Form states for Create Celebration modal
  const [celebrationTitle, setCelebrationTitle] = useState("");
  const [celebrationType, setCelebrationType] = useState("Birthday");
  const [celebrationTarget, setCelebrationTarget] = useState("");

  // Form states for Add Person modal
  const [personName, setPersonName] = useState("");
  const [personRole, setPersonRole] = useState("Friend");
  const [personBirthday, setPersonBirthday] = useState("");

  const handleCreateCelebration = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Success! celebration "${celebrationTitle}" has been created!`);
    setIsCreateModalOpen(false);
    setCelebrationTitle("");
  };

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Success! "${personName}" has been added to your Celebration Network!`);
    setIsAddPersonModalOpen(false);
    setPersonName("");
  };

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: Calendar, badge: 6 },
    { id: "network", label: "Network", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FF] flex font-sans text-zinc-800 relative">
      
      {/* 1. Sidebar Panel (Hidden on mobile, collapses on tablet, full on desktop) */}
      <aside className="hidden lg:flex flex-col justify-between w-[260px] bg-white border-r border-purple-100/50 shrink-0 sticky top-0 h-screen p-6">
        <div className="flex flex-col gap-8">
          
          {/* Logo */}
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <img src="/images/logo.png" alt="WishPool Logo" className="w-auto h-[48px] object-contain ml-2" />
          </Link>

          {/* Nav Items */}
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center justify-between w-full h-[48px] px-4 rounded-full text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-[#7C3AED] text-white shadow-md shadow-purple-600/10" 
                      : "text-zinc-600 hover:text-[#7C3AED] hover:bg-purple-50"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className="size-5" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className={`text-[10px] font-bold size-5 rounded-full flex items-center justify-center ${
                      isActive ? "bg-white text-[#7C3AED]" : "bg-purple-100 text-[#7C3AED]"
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Profile Card Bottom Left */}
        <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
          <div className="flex items-center gap-3">
            <img src={userProfile.avatar} alt={userProfile.name} className="size-10 rounded-full object-cover border border-purple-100" />
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm text-zinc-900 leading-tight">{userProfile.name}</span>
              <span className="text-[11px] text-zinc-400 font-light">{userProfile.email}</span>
            </div>
          </div>
          <Link href="/login" title="Logout">
            <button className="p-2 text-zinc-400 hover:text-[#FF2056] hover:bg-rose-50 rounded-full transition-colors">
              <LogOut className="size-4.5" />
            </button>
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/40 z-50 animate-in fade-in duration-200">
          <div className="w-[270px] bg-white h-full p-6 flex flex-col justify-between shadow-2xl relative animate-in slide-in-from-left duration-300">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-900 rounded-full"
            >
              <X className="size-6" />
            </button>

            <div className="flex flex-col gap-8 mt-4">
              {/* Logo */}
              <Link href="/">
                <img src="/images/logo.png" alt="WishPool Logo" className="w-auto h-[44px] object-contain ml-2" />
              </Link>

              {/* Nav */}
              <nav className="flex flex-col gap-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        setActiveTab(link.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between w-full h-[48px] px-4 rounded-full text-sm font-medium transition-all ${
                        isActive 
                          ? "bg-[#7C3AED] text-white shadow-md shadow-purple-600/10" 
                          : "text-zinc-600 hover:text-[#7C3AED] hover:bg-purple-50"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon className="size-5" />
                        <span>{link.label}</span>
                      </div>
                      {link.badge && (
                        <span className={`text-[10px] font-bold size-5 rounded-full flex items-center justify-center ${
                          isActive ? "bg-white text-[#7C3AED]" : "bg-purple-100 text-[#7C3AED]"
                        }`}>
                          {link.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Profile Bottom */}
            <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
              <div className="flex items-center gap-3">
                <img src={userProfile.avatar} alt={userProfile.name} className="size-10 rounded-full object-cover border border-purple-100" />
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm text-zinc-900 leading-tight">{userProfile.name}</span>
                  <span className="text-[11px] text-zinc-400 font-light">{userProfile.email}</span>
                </div>
              </div>
              <Link href="/login">
                <button className="p-2 text-zinc-400 hover:text-[#FF2056] hover:bg-rose-50 rounded-full transition-colors">
                  <LogOut className="size-4.5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Content Wrapper */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Header Navigation Bar */}
        <header className="h-[80px] bg-white border-b border-purple-100/50 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-zinc-600 hover:text-[#7C3AED] hover:bg-purple-50 rounded-full transition-colors"
            >
              <Menu className="size-6" />
            </button>
            <div className="relative max-w-[320px] w-full hidden md:block">
              <input 
                type="text" 
                placeholder="Search celebrations, people..." 
                className="w-full bg-[#FAF8FF] border border-purple-100/50 focus:border-[#7C3AED] rounded-full h-[40px] pl-10 pr-4 text-xs font-light text-zinc-900 placeholder:text-zinc-400 outline-none transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-400 hover:text-[#7C3AED] relative rounded-full hover:bg-purple-50 transition-colors">
              <Bell className="size-5.5" />
              <span className="absolute top-1 right-1.5 size-2 bg-[#FF2056] rounded-full" />
            </button>
            <img src={userProfile.avatar} alt="Profile" className="size-10 rounded-full object-cover border border-purple-100" />
          </div>
        </header>

        {/* Dashboard Panels Scroll */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 max-w-[1440px] mx-auto w-full">
          
          {/* Greeting Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left border-b border-purple-100/50 pb-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight select-none">
                Good morning, <span className="italic font-serif text-[#7C3AED]">Jamie</span>
              </h1>
              <p className="text-sm text-zinc-500 font-light">
                You have <span className="font-bold text-[#7C3AED]">2</span> active WishPools and <span className="font-bold text-[#FF2056]">3</span> unread notifications.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setIsAddPersonModalOpen(true)}
                variant="outline" 
                className="border-purple-200 text-zinc-700 bg-white hover:bg-purple-50 rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-2xs flex items-center gap-2"
              >
                <UserPlus className="size-4" /> Add Person
              </Button>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
              >
                <Plus className="size-4.5" /> Create Celebration
              </Button>
            </div>
          </div>

          {/* Announcement Alert Banner */}
          <div className="w-full bg-[#F9F3FF] border border-purple-100/80 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left shadow-2xs">
            <div className="flex items-start md:items-center gap-3.5">
              <div className="size-10 rounded-full bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0">
                <Clock className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#7C3AED] text-sm">Emma's birthday in 23 days</span>
                <span className="text-[13px] text-zinc-500 font-light mt-0.5 leading-relaxed">
                  Emma's 30th Birthday is coming up. Your WishPool is at 84% — share the link to hit your goal!
                </span>
              </div>
            </div>
            <button className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] shrink-0 border border-purple-200 bg-white hover:bg-purple-50 px-4 py-2 rounded-full transition-colors flex items-center gap-1">
              View <ChevronRight className="size-3.5" />
            </button>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
            
            {/* Metric Card 1: Total Raised */}
            <div 
              className="w-full h-[147.67px] bg-[#7C3AED] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-purple-600/10 transition-transform hover:scale-[1.02] duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Total Raised</span>
                <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
                  <DollarSign className="size-4.5" />
                </div>
              </div>
              <div className="flex flex-col text-left gap-[9.84px]">
                <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">$5,020</span>
                <span className="text-[11px] font-medium opacity-80">All time</span>
              </div>
            </div>

            {/* Metric Card 2: Active Wishpools */}
            <div 
              className="w-full h-[147.67px] bg-[#FF2056] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-rose-600/10 transition-transform hover:scale-[1.02] duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Active Wishpools</span>
                <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Gift className="size-4.5" />
                </div>
              </div>
              <div className="flex flex-col text-left gap-[9.84px]">
                <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">2</span>
                <span className="text-[11px] font-medium opacity-80">In progress</span>
              </div>
            </div>

            {/* Metric Card 3: Contributors */}
            <div 
              className="w-full h-[147.67px] bg-[#009966] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-emerald-600/10 transition-transform hover:scale-[1.02] duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Contributors</span>
                <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="size-4.5" />
                </div>
              </div>
              <div className="flex flex-col text-left gap-[9.84px]">
                <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">104</span>
                <span className="text-[11px] font-medium opacity-80">Total across all</span>
              </div>
            </div>

            {/* Metric Card 4: Networks */}
            <div 
              className="w-full h-[147.67px] bg-[#E17100] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-orange-600/10 transition-transform hover:scale-[1.02] duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Networks</span>
                <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Megaphone className="size-4.5" />
                </div>
              </div>
              <div className="flex flex-col text-left gap-[9.84px]">
                <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">6</span>
                <span className="text-[11px] font-medium opacity-80">Important people</span>
              </div>
            </div>

          </div>

          {/* Two Column Panels Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Left Hand Column Panels */}
            <div className="xl:col-span-7 flex flex-col gap-8 w-full">
              
              {/* Ready to Reveal Section */}
              <div className="bg-white rounded-3xl border border-purple-100/50 shadow-xs overflow-hidden text-left">
                {/* Header */}
                <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#7C3AED]">Ready to Reveal</span>
                    <span className="bg-purple-100 text-[#7C3AED] font-bold text-xs size-5 rounded-full flex items-center justify-center">1</span>
                  </div>
                </div>
                {/* Item List */}
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between bg-zinc-50/50 border border-zinc-100 rounded-2xl p-4 transition-all hover:bg-zinc-50">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                        🎓
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-zinc-900">Alex's Graduation</span>
                        <span className="text-[11px] text-zinc-400 font-light mt-0.5">12 contributors • $500 raised</span>
                      </div>
                    </div>
                    <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs h-[32px] px-4 rounded-full transition-colors">
                      Reveal
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Wishpools List */}
              <div className="bg-white rounded-3xl border border-purple-100/50 shadow-xs overflow-hidden text-left">
                {/* Header */}
                <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#7C3AED]">Active WishPools</span>
                    <span className="bg-purple-100 text-[#7C3AED] font-bold text-xs size-5 rounded-full flex items-center justify-center">2</span>
                  </div>
                  <button className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center">
                    All events <ChevronRight className="size-3.5" />
                  </button>
                </div>
                {/* Items */}
                <div className="p-6 flex flex-col gap-6">
                  
                  {/* Item 1 */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-[#FAF8FF] border border-purple-100/50 flex items-center justify-center font-bold text-base shrink-0">
                          🎂
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-zinc-900 leading-tight">Emma's 30th Birthday</span>
                            <span className="bg-rose-50 text-[#FF2056] text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-100 flex items-center gap-1 select-none">
                              <span className="size-1.5 rounded-full bg-[#FF2056] animate-ping" /> Live
                            </span>
                          </div>
                          <span className="text-[11px] text-zinc-400 font-light mt-0.5">Emma Johnson • Jul 15, 2026</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-zinc-500 font-mono">$840 / $1,000</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: "84%" }} />
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex flex-col gap-3 border-t border-zinc-100 pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-[#FAF8FF] border border-purple-100/50 flex items-center justify-center font-bold text-base shrink-0">
                          💍
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-zinc-900 leading-tight">Sophie & James Wedding</span>
                            <span className="bg-rose-50 text-[#FF2056] text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-100 flex items-center gap-1 select-none">
                              <span className="size-1.5 rounded-full bg-[#FF2056] animate-ping" /> Live
                            </span>
                          </div>
                          <span className="text-[11px] text-zinc-400 font-light mt-0.5">Sophie & James • Aug 3, 2026</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-zinc-500 font-mono">$2,450 / $5,000</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: "49%" }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Recent Contributions */}
              <div className="bg-white rounded-3xl border border-purple-100/50 shadow-xs overflow-hidden text-left">
                {/* Header */}
                <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100/30 flex items-center justify-between">
                  <span className="font-bold text-sm text-[#7C3AED]">Recent Contributions</span>
                  <button className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center">
                    View all <ChevronRight className="size-3.5" />
                  </button>
                </div>
                {/* Content */}
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

            {/* Right Hand Column Panels */}
            <div className="xl:col-span-5 flex flex-col gap-8 w-full">
              
              {/* Feature Value Card (Purple) */}
              <div className="bg-[#7C3AED] text-white rounded-3xl p-8 text-left shadow-lg shadow-purple-600/10 flex flex-col gap-5 relative overflow-hidden select-none">
                <div className="absolute -top-24 -left-24 size-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold tracking-widest text-purple-200 uppercase">Why WishPool?</span>
                  <h3 className="text-2xl font-extrabold leading-tight">This is more than a page.<br />It's your celebration home.</h3>
                </div>

                <div className="flex flex-col gap-5.5 mt-2">
                  <div className="flex items-start gap-4">
                    <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Bell className="size-4 text-purple-100" /></div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[14px]">Never miss a birthday</span>
                      <span className="text-[11.5px] text-purple-100 font-light mt-0.5 leading-relaxed">Reminders sent weeks in advance — automatically.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Users className="size-4 text-purple-100" /></div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[14px]">Build your Celebration Network</span>
                      <span className="text-[11.5px] text-purple-100 font-light mt-0.5 leading-relaxed">Save family & friends. Every date in one place.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Gift className="size-4 text-purple-100" /></div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[14px]">Create unlimited WishPools</span>
                      <span className="text-[11.5px] text-purple-100 font-light mt-0.5 leading-relaxed">Celebrate everyone who matters, year after year.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><ShieldCheck className="size-4 text-purple-100" /></div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[14px]">Receive future gifts</span>
                      <span className="text-[11.5px] text-purple-100 font-light mt-0.5 leading-relaxed">Others can create WishPools for you too.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events Box */}
              <div className="bg-white rounded-3xl border border-purple-100/50 shadow-xs overflow-hidden text-left">
                {/* Header */}
                <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100/30 flex items-center justify-between">
                  <span className="font-bold text-sm text-[#7C3AED]">Upcoming Events</span>
                  <button className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center">
                    All events <ChevronRight className="size-3.5" />
                  </button>
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col gap-4">
                  
                  {/* Event 1 */}
                  <div className="flex items-center justify-between bg-[#FAF8FF] border border-purple-100/20 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-white flex items-center justify-center text-sm border border-purple-100/50 shrink-0">🎂</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-zinc-900 leading-tight">Emma's 30th Birthday</span>
                        <span className="text-[10px] text-zinc-400 font-light mt-0.5">Emma Johnson</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 select-none">
                      <span className="bg-rose-50 text-[#FF2056] text-[9px] font-bold px-2 py-0.5 rounded-full border border-rose-100">Live</span>
                      <span className="text-[9px] text-zinc-400 font-semibold uppercase">Past</span>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="flex items-center justify-between bg-[#FAF8FF] border border-purple-100/20 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-white flex items-center justify-center text-sm border border-purple-100/50 shrink-0">💍</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-zinc-900 leading-tight">Sophie & James Wedding</span>
                        <span className="text-[10px] text-zinc-400 font-light mt-0.5">Sophie & James</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 select-none">
                      <span className="bg-rose-50 text-[#FF2056] text-[9px] font-bold px-2 py-0.5 rounded-full border border-rose-100">Live</span>
                      <span className="text-[9px] text-zinc-400 font-semibold uppercase">Past</span>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="flex items-center justify-between bg-zinc-50/50 border border-zinc-100 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-white flex items-center justify-center text-sm border border-zinc-100 shrink-0">👶</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-zinc-900 leading-tight">Mia's Baby Shower</span>
                        <span className="text-[10px] text-zinc-400 font-light mt-0.5">Mia Hoffman</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 select-none">
                      <span className="bg-zinc-100 text-zinc-500 text-[9px] font-bold px-2 py-0.5 rounded-full border border-zinc-200">Draft</span>
                      <span className="text-[9px] text-zinc-400 font-semibold uppercase">Past</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Celebration Network Box */}
              <div className="bg-white rounded-3xl border border-purple-100/50 shadow-xs overflow-hidden text-left">
                {/* Header */}
                <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#7C3AED]">Celebration Network</span>
                    <span className="bg-purple-100 text-[#7C3AED] font-bold text-xs size-5 rounded-full flex items-center justify-center">6</span>
                  </div>
                  <button className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center">
                    View all <ChevronRight className="size-3.5" />
                  </button>
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col gap-5">
                  {[
                    { name: "Emma Johnson", relation: "Sister", date: "Jul 15, 2025", desc: "Birthday • 23d away", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80" },
                    { name: "Marcus Chen", relation: "Friend", date: "Mar 12, 2026", desc: "Birthday • 263d away", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" },
                    { name: "Sophie Laurent", relation: "Friend", date: "Aug 3, 2025", desc: "Wedding • 42d away", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" },
                    { name: "Robert Rivera", relation: "Father", date: "Nov 22, 2025", desc: "Birthday • 153d away", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80" },
                  ].map((person, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={person.img} alt={person.name} className="size-9 rounded-full object-cover border border-purple-100 shrink-0" />
                        <div className="flex flex-col text-left">
                          <span className="font-bold text-sm text-zinc-900 leading-tight">{person.name}</span>
                          <span className="text-[10px] text-zinc-400 font-light mt-0.5">{person.relation}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-0.5 text-right select-none">
                        <span className="text-xs font-bold text-zinc-700">{person.date}</span>
                        <span className="text-[10px] text-zinc-400 font-light">{person.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* 3. MODAL: CREATE CELEBRATION */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100">
            <button 
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-3.5 border-b border-zinc-100 pb-4 mb-5">
              <div className="size-10 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center">
                <Gift className="size-5" />
              </div>
              <h2 className="text-xl font-extrabold text-zinc-900">Create Celebration</h2>
            </div>
            
            <form onSubmit={handleCreateCelebration} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-zinc-700 mb-1.5">Celebration Title</label>
                <input 
                  type="text" 
                  required 
                  value={celebrationTitle}
                  onChange={(e) => setCelebrationTitle(e.target.value)}
                  placeholder="e.g. Alex's Graduation Bash" 
                  className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-900 outline-none w-full transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Occasion Type</label>
                  <select 
                    value={celebrationType}
                    onChange={(e) => setCelebrationType(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3 text-sm text-zinc-800 outline-none w-full transition-all"
                  >
                    <option value="Birthday">Birthday</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Retirement">Retirement</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Fund Target ($)</label>
                  <input 
                    type="number" 
                    required
                    value={celebrationTarget}
                    onChange={(e) => setCelebrationTarget(e.target.value)}
                    placeholder="e.g. 1000" 
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-900 outline-none w-full transition-all"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] rounded-lg shadow-sm transition-all mt-2">
                Create Celebration
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL: ADD PERSON */}
      {isAddPersonModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100">
            <button 
              onClick={() => setIsAddPersonModalOpen(false)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-3.5 border-b border-zinc-100 pb-4 mb-5">
              <div className="size-10 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center">
                <UserPlus className="size-5" />
              </div>
              <h2 className="text-xl font-extrabold text-zinc-900">Add to Network</h2>
            </div>
            
            <form onSubmit={handleAddPerson} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-zinc-700 mb-1.5">Person's Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="e.g. Liam Miller" 
                  className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-900 outline-none w-full transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Relationship</label>
                  <select 
                    value={personRole}
                    onChange={(e) => setPersonRole(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3 text-sm text-zinc-800 outline-none w-full transition-all"
                  >
                    <option value="Friend">Friend</option>
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Colleague">Colleague</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Birthday Date</label>
                  <input 
                    type="date" 
                    required
                    value={personBirthday}
                    onChange={(e) => setPersonBirthday(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3 text-sm text-zinc-800 outline-none w-full transition-all"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] rounded-lg shadow-sm transition-all mt-2">
                Add Person
              </Button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
