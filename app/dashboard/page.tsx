"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Calendar, Users, BarChart3, Bell, Settings, 
  LogOut, Plus, Search, Menu, X, DollarSign, Gift, Megaphone, 
  UserPlus, ChevronRight, ShieldCheck, Clock, Check, MoreHorizontal,
  Eye, Link2, Edit2, Archive, Trash2, CalendarDays, Award, User,
  CalendarRange, ArrowUpDown, ChevronDown, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Import Recharts elements for analytics section
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line 
} from "recharts";

// Profile Data
const userProfile = {
  name: "Jamie Rivera",
  email: "jamie@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
};

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

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, events, network, analytics...
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all"); // all, live, draft, closed, revealed, archived

  // Network views filters
  const [networkSearchQuery, setNetworkSearchQuery] = useState("");
  const [networkFilter, setNetworkFilter] = useState("all"); // all, family, friend, colleague, partner, custom
  const [networkSort, setNetworkSort] = useState("milestone"); // milestone, name, recent
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // SSR safety check mounted state
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Interactive events array
  const [events, setEvents] = useState([
    {
      id: "emma-30",
      title: "Emma's 30th Birthday",
      recipient: "Emma Johnson",
      relation: "Sister",
      status: "live",
      date: "Jul 15, 2025",
      contributors: 14,
      raised: 840,
      target: 1000,
      icon: "🎂",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      progress: 84,
    },
    {
      id: "sophie-wedding",
      title: "Sophie & James Wedding",
      recipient: "Sophie & James",
      relation: "Friends",
      status: "live",
      date: "Aug 3, 2025",
      contributors: 38,
      raised: 2450,
      target: 5000,
      icon: "💍",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      progress: 49,
    },
    {
      id: "alex-grad",
      title: "Alex's Graduation",
      recipient: "Alex Rivera",
      relation: "Nephew",
      status: "closed",
      date: "Jun 28, 2025",
      contributors: 12,
      raised: 500,
      target: 500,
      icon: "🎓",
      color: "bg-[#009966]",
      progress: 100,
    },
    {
      id: "dad-retire",
      title: "Dad's Retirement Party",
      recipient: "Robert Rivera",
      relation: "Father",
      status: "revealed",
      date: "May 10, 2025",
      contributors: 22,
      raised: 920,
      target: 800,
      icon: "🌅",
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      progress: 115,
    },
    {
      id: "mia-baby",
      title: "Mia's Baby Shower",
      recipient: "Mia Hoffman",
      relation: "Friend",
      status: "draft",
      date: "Sep 14, 2025",
      contributors: 0,
      raised: 0,
      target: 600,
      icon: "👶",
      color: "bg-purple-100",
      progress: 0,
    },
    {
      id: "marcus-anniv",
      title: "Marcus's Work Anniversary",
      recipient: "Marcus Chen",
      relation: "Colleague",
      status: "archived",
      date: "Mar 1, 2025",
      contributors: 18,
      raised: 310,
      target: 300,
      icon: "🏆",
      color: "bg-[#7C3AED]",
      progress: 103,
    },
  ]);

  // Interactive network array
  const [networkPeople, setNetworkPeople] = useState([
    {
      id: "person-emma",
      name: "Emma Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      relation: "Sister",
      group: "family",
      tags: ["close", "birthday-planner"],
      milestoneType: "Birthday",
      milestoneDate: "Jul 15",
      daysLeft: 17,
      pastCelebration: { icon: "🎂", date: "Mar 1" }
    },
    {
      id: "person-sophie",
      name: "Sophie Laurent",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      relation: "Friend",
      group: "friend",
      tags: ["wedding", "paris"],
      milestoneType: "Wedding Day",
      milestoneDate: "Aug 3",
      daysLeft: 36,
      pastCelebration: { icon: "💍", date: "Aug 3" }
    },
    {
      id: "person-priya",
      name: "Priya Nair",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      relation: "Team Lead",
      group: "colleague",
      tags: ["work", "design-team"],
      milestoneType: "Birthday",
      milestoneDate: "Sep 5",
      daysLeft: 69,
      pastCelebration: { icon: "🎂", date: "Sep 5" }
    },
    {
      id: "person-alex",
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      relation: "Nephew",
      group: "family",
      tags: ["family", "young"],
      milestoneType: "Birthday",
      milestoneDate: "Sep 14",
      daysLeft: 78,
      pastCelebration: { icon: "🎓", date: "Jun 28" }
    },
    {
      id: "person-robert",
      name: "Robert Rivera",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      relation: "Father",
      group: "family",
      tags: ["family", "retired"],
      milestoneType: "Birthday",
      milestoneDate: "Nov 22",
      daysLeft: 147,
      pastCelebration: { icon: "🌅", date: "May 10" }
    },
    {
      id: "person-luca",
      name: "Luca Ferretti",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
      relation: "Friend",
      group: "friend",
      tags: ["europe", "art"],
      milestoneType: "Birthday",
      milestoneDate: "Dec 8",
      daysLeft: 163,
      pastCelebration: { icon: "🎂", date: "Feb 14" }
    },
    {
      id: "person-marcus",
      name: "Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      relation: "Best Friend",
      group: "friend",
      tags: ["close", "tech"],
      milestoneType: "Birthday",
      milestoneDate: "Mar 12",
      daysLeft: 257,
      pastCelebration: null
    },
    {
      id: "person-amara",
      name: "Amara Osei",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80",
      relation: "Close Friend",
      group: "friend",
      tags: ["london", "close"],
      milestoneType: "Birthday",
      milestoneDate: "Apr 22",
      daysLeft: 298,
      pastCelebration: null
    }
  ]);

  // Analytics performance dataset
  const chartData = [
    { month: "Jan", contributions: 300, contributors: 8 },
    { month: "Feb", contributions: 450, contributors: 12 },
    { month: "Mar", contributions: 300, contributors: 18 },
    { month: "Apr", contributions: 920, contributors: 22 },
    { month: "May", contributions: 500, contributors: 12 },
    { month: "Jun", contributions: 840, contributors: 14 },
  ];

  // Toast indicator state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Dropdown event ID
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Modal target event state
  const [modalEvent, setModalEvent] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null); // create, add-person, edit, preview, delete, archive, view-person, edit-person, remove-person

  // Creation / Edit Form Inputs
  const [formTitle, setFormTitle] = useState("");
  const [formRecipient, setFormRecipient] = useState("");
  const [formRelation, setFormRelation] = useState("Friend");
  const [formStatus, setFormStatus] = useState("live");
  const [formDate, setFormDate] = useState("");
  const [formTarget, setFormTarget] = useState("");

  // Add / Edit Person form
  const [personName, setPersonName] = useState("");
  const [personRole, setPersonRole] = useState("Friend");
  const [personGroup, setPersonGroup] = useState("friend");
  const [personBirthday, setPersonBirthday] = useState("");
  const [personTags, setPersonTags] = useState("");

  // Dismiss dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdownId(null);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLink = (eventTitle: string) => {
    navigator.clipboard.writeText(`https://wishpool.com/c/${eventTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}`);
    triggerToast("Link copied to clipboard!");
    setActiveDropdownId(null);
  };

  // Submit edits
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents(prev => prev.map(ev => {
      if (ev.id === modalEvent.id) {
        const raisedVal = ev.raised;
        const targetVal = parseFloat(formTarget) || 1;
        const newProgress = Math.round((raisedVal / targetVal) * 100);
        return {
          ...ev,
          title: formTitle,
          recipient: formRecipient,
          relation: formRelation,
          status: formStatus,
          date: formDate,
          target: targetVal,
          progress: newProgress
        };
      }
      return ev;
    }));
    triggerToast("Celebration updated successfully!");
    setActiveModal(null);
  };

  // Submit new celebration
  const handleCreateCelebration = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `event-${Date.now()}`;
    const targetVal = parseFloat(formTarget) || 500;
    const newEvent = {
      id: newId,
      title: formTitle || "New Celebration",
      recipient: formRecipient || "Someone Special",
      relation: formRelation || "Friend",
      status: "live",
      date: formDate || "Dec 25, 2026",
      contributors: 0,
      raised: 0,
      target: targetVal,
      icon: formTitle.includes("Grad") ? "🎓" : formTitle.includes("Wed") ? "💍" : "🎂",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      progress: 0,
    };
    setEvents(prev => [newEvent, ...prev]);
    triggerToast("New celebration page created!");
    setActiveModal(null);
    // Reset fields
    setFormTitle("");
    setFormRecipient("");
    setFormDate("");
    setFormTarget("");
  };

  // Submit network person additions/edits
  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeModal === "edit-person") {
      setNetworkPeople(prev => prev.map(p => {
        if (p.id === modalEvent.id) {
          const formattedTags = personTags.split(",").map(t => t.trim()).filter(Boolean);
          const parts = personBirthday.split("-"); // yyyy-mm-dd
          let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          let dateStr = p.milestoneDate;
          if (parts.length === 3) {
            const mIdx = parseInt(parts[1]) - 1;
            dateStr = `${monthNames[mIdx]} ${parseInt(parts[2])}`;
          }
          return {
            ...p,
            name: personName,
            relation: personRole,
            group: personGroup,
            tags: formattedTags.length > 0 ? formattedTags : p.tags,
            milestoneDate: dateStr
          };
        }
        return p;
      }));
      triggerToast("Contact updated successfully!");
    } else {
      const newId = `person-${Date.now()}`;
      const formattedTags = personTags.split(",").map(t => t.trim()).filter(Boolean);
      const parts = personBirthday.split("-");
      let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let dateStr = "Dec 25";
      if (parts.length === 3) {
        const mIdx = parseInt(parts[1]) - 1;
        dateStr = `${monthNames[mIdx]} ${parseInt(parts[2])}`;
      }
      const newPerson = {
        id: newId,
        name: personName || "New Contact",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        relation: personRole || "Friend",
        group: personGroup || "friend",
        tags: formattedTags.length > 0 ? formattedTags : ["close"],
        milestoneType: "Birthday",
        milestoneDate: dateStr,
        daysLeft: 120,
        pastCelebration: null
      };
      setNetworkPeople(prev => [newPerson, ...prev]);
      triggerToast(`${personName} added to network!`);
    }
    setActiveModal(null);
    setPersonName("");
    setPersonTags("");
  };

  // Remove person
  const handleRemovePersonConfirm = () => {
    setNetworkPeople(prev => prev.filter(p => p.id !== modalEvent.id));
    triggerToast("Contact removed from network.");
    setActiveModal(null);
  };

  // Confirm delete
  const handleDeleteConfirm = () => {
    setEvents(prev => prev.filter(ev => ev.id !== modalEvent.id));
    triggerToast("Celebration page deleted.");
    setActiveModal(null);
  };

  // Confirm archive
  const handleArchiveConfirm = () => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === modalEvent.id) {
        return { ...ev, status: "archived" };
      }
      return ev;
    }));
    triggerToast("Celebration page archived.");
    setActiveModal(null);
  };

  // Filter calculation variables for Events
  const countAll = events.length;
  const countLive = events.filter(e => e.status === "live").length;
  const countDraft = events.filter(e => e.status === "draft").length;
  const countClosed = events.filter(e => e.status === "closed").length;
  const countRevealed = events.filter(e => e.status === "revealed").length;
  const countArchived = events.filter(e => e.status === "archived").length;

  // Filter events based on selections
  const filteredEvents = events.filter(ev => {
    const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.relation.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    return matchesSearch && ev.status === selectedFilter;
  });

  // Network calculation variables
  const netCountAll = networkPeople.length;
  const netCountFamily = networkPeople.filter(p => p.group === "family").length;
  const netCountFriend = networkPeople.filter(p => p.group === "friend").length;
  const netCountColleague = networkPeople.filter(p => p.group === "colleague").length;
  const netCountPartner = networkPeople.filter(p => p.group === "partner").length;
  const netCountCustom = networkPeople.filter(p => p.group === "custom").length;

  // Filter and Sort network list
  const filteredNetwork = networkPeople.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(networkSearchQuery.toLowerCase()) ||
                          p.relation.toLowerCase().includes(networkSearchQuery.toLowerCase()) ||
                          p.tags.some(tag => tag.toLowerCase().includes(networkSearchQuery.toLowerCase()));
    
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

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: Calendar, badge: countAll },
    { id: "network", label: "Network", icon: Users, badge: netCountAll },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FF] flex font-sans text-zinc-800 relative">
      
      {/* Toast Alert popup */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-[#0D0A1A] text-white px-5 py-3 rounded-full flex items-center gap-2.5 shadow-xl z-[999] animate-in fade-in slide-in-from-top duration-300 font-medium text-xs border border-purple-500/25 select-none">
          <Check className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Sidebar Panel (Desktop / Collapsed Mobile) */}
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
                  {link.badge !== undefined && (
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
                      {link.badge !== undefined && (
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

      {/* 2. Main Content panel */}
      <main className="flex-grow flex flex-col min-w-0 min-h-screen">
        
        {/* Header Row */}
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
                value={activeTab === "network" ? networkSearchQuery : searchQuery}
                onChange={(e) => activeTab === "network" ? setNetworkSearchQuery(e.target.value) : setSearchQuery(e.target.value)}
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

        {/* VIEW CONDITIONAL RENDER: ANALYTICS VIEW */}
        {activeTab === "analytics" ? (
          <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full">
            
            {/* Analytics Header */}
            <div className="text-left">
              <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight leading-tight select-none">Analytics</h1>
              <span className="text-xs text-zinc-500 font-light mt-1 select-none">Performance across all your celebrations</span>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
              
              {/* Card 1: Total raised */}
              <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 text-left flex items-center gap-5 shadow-2xs">
                <div className="size-12 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0">
                  <DollarSign className="size-5.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-zinc-400">Total raised</span>
                  <span className="text-2xl font-extrabold text-zinc-950 mt-1">$8,420</span>
                </div>
              </div>

              {/* Card 2: Avg per event */}
              <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 text-left flex items-center gap-5 shadow-2xs">
                <div className="size-12 rounded-full bg-emerald-50 text-[#009966] flex items-center justify-center shrink-0">
                  <TrendingUp className="size-5.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-zinc-400">Avg per event</span>
                  <span className="text-2xl font-extrabold text-zinc-950 mt-1">$703</span>
                </div>
              </div>

              {/* Card 3: Total contributors */}
              <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 text-left flex items-center gap-5 shadow-2xs">
                <div className="size-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Users className="size-5.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-zinc-400">Total contributors</span>
                  <span className="text-2xl font-extrabold text-zinc-950 mt-1">124</span>
                </div>
              </div>

              {/* Card 4: Events created */}
              <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 text-left flex items-center gap-5 shadow-2xs">
                <div className="size-12 rounded-full bg-rose-50 text-[#FF2056] flex items-center justify-center shrink-0">
                  <Gift className="size-5.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-zinc-400">Events created</span>
                  <span className="text-2xl font-extrabold text-zinc-950 mt-1">6</span>
                </div>
              </div>

            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              
              {/* Chart 1: Monthly contributions */}
              <div className="bg-white border border-purple-50/70 rounded-3xl p-6 shadow-2xs text-left">
                <h3 className="font-extrabold text-zinc-800 text-[15px] mb-6">Monthly contributions ($)</h3>
                <div className="h-[280px] w-full">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 1000]} ticks={[0, 250, 500, 750, 1000]} />
                        <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0' }} />
                        <Bar dataKey="contributions" fill="#7C3AED" radius={[6, 6, 0, 0]} maxBarSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="size-full bg-zinc-50 rounded-xl animate-pulse" />
                  )}
                </div>
              </div>

              {/* Chart 2: Monthly contributors */}
              <div className="bg-white border border-purple-50/70 rounded-3xl p-6 shadow-2xs text-left">
                <h3 className="font-extrabold text-zinc-800 text-[15px] mb-6">Monthly contributors</h3>
                <div className="h-[280px] w-full">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 24]} ticks={[0, 6, 12, 18, 24]} />
                        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0' }} />
                        <Line type="monotone" dataKey="contributors" stroke="#FF2056" strokeWidth={2.5} activeDot={{ r: 6 }} dot={{ stroke: '#FF2056', strokeWidth: 3, r: 4, fill: '#FFFFFF' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="size-full bg-zinc-50 rounded-xl animate-pulse" />
                  )}
                </div>
              </div>

            </div>

          </div>
        ) : activeTab === "network" ? (
          <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full">
            
            {/* Network Header Row */}
            <div className="flex justify-between items-start text-left">
              <div className="flex flex-col">
                <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight leading-tight select-none">Celebration Network</h1>
                <span className="text-xs text-purple-600 font-bold mt-1 select-none">{netCountAll} people · Track milestones and create celebrations</span>
              </div>
              <Button 
                onClick={() => {
                  setPersonName("");
                  setPersonRole("Friend");
                  setPersonGroup("friend");
                  setPersonBirthday("");
                  setPersonTags("");
                  setActiveModal("add-person");
                }}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
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
                <div className="flex flex-col text-left gap-[9.84px]">
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
                <div className="flex flex-col text-left gap-[9.84px]">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">14</span>
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
                <div className="flex flex-col text-left gap-[9.84px]">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">
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
                <div className="flex flex-col text-left gap-[9.84px]">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">3</span>
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
              <div className="relative shrink-0" ref={sortDropdownRef}>
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="bg-white border border-purple-100/60 hover:border-[#7C3AED] rounded-full px-5 h-[50px] text-xs font-bold text-zinc-700 transition-colors flex items-center gap-2 justify-between min-w-[160px] shadow-2xs"
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
                      className={`w-full h-[36px] px-3.5 text-left text-xs font-semibold hover:bg-purple-50 hover:text-[#7C3AED] flex items-center justify-between transition-colors ${
                        networkSort === "milestone" ? "text-[#7C3AED] bg-purple-50/50" : "text-zinc-700"
                      }`}
                    >
                      <span>Next milestone</span>
                      {networkSort === "milestone" && <Check className="size-3.5" />}
                    </button>
                    <button 
                      onClick={() => { setNetworkSort("name"); setIsSortDropdownOpen(false); }}
                      className={`w-full h-[36px] px-3.5 text-left text-xs font-semibold hover:bg-purple-50 hover:text-[#7C3AED] flex items-center justify-between transition-colors ${
                        networkSort === "name" ? "text-[#7C3AED] bg-purple-50/50" : "text-zinc-700"
                      }`}
                    >
                      <span>Name A-Z</span>
                      {networkSort === "name" && <Check className="size-3.5" />}
                    </button>
                    <button 
                      onClick={() => { setNetworkSort("recent"); setIsSortDropdownOpen(false); }}
                      className={`w-full h-[36px] px-3.5 text-left text-xs font-semibold hover:bg-purple-50 hover:text-[#7C3AED] flex items-center justify-between transition-colors ${
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
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    networkFilter === pill.filterId
                      ? "bg-[#7C3AED] text-white shadow-sm"
                      : "bg-white text-zinc-500 border border-purple-50 hover:bg-purple-50/50"
                  }`}
                >
                  <span>{pill.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                    networkFilter === pill.filterId
                      ? "bg-white/20 text-white"
                      : "bg-purple-50 text-zinc-500"
                  }`}>
                    {pill.count}
                  </span>
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
                      className="bg-white border border-purple-50/70 rounded-[24px] p-6 text-left shadow-2xs hover:shadow-xs transition-all relative flex flex-col gap-4 select-none"
                    >
                      {/* Top profile segment */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3.5">
                          <img src={p.avatar} alt={p.name} className="size-12 rounded-full object-cover border border-purple-100 shrink-0" />
                          <div className="flex flex-col">
                            <h3 className="font-extrabold text-[#0D0A1A] text-[15px] leading-tight">{p.name}</h3>
                            <span className="text-[11.5px] text-zinc-400 font-light mt-0.5">{p.relation} · {p.group}</span>
                          </div>
                        </div>

                        <div className="relative">
                          <button 
                            onClick={() => setActiveDropdownId(activeDropdownId === p.id ? null : p.id)}
                            className="size-8.5 rounded-full bg-zinc-50 hover:bg-purple-50 text-zinc-400 hover:text-[#7C3AED] flex items-center justify-center border border-zinc-100 transition-colors"
                          >
                            <MoreHorizontal className="size-4" />
                          </button>

                          {activeDropdownId === p.id && (
                            <div 
                              ref={dropdownRef}
                              className="absolute right-0 top-10 bg-white border border-purple-100 rounded-xl shadow-xl w-[170px] py-1.5 z-30 animate-in fade-in slide-in-from-top-3 duration-200"
                            >
                              <button 
                                onClick={() => { setModalEvent(p); setActiveModal("view-person"); setActiveDropdownId(null); }}
                                className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors"
                              >
                                <Eye className="size-4" /> View profile
                              </button>
                              <button 
                                onClick={() => {
                                  setModalEvent(p);
                                  setPersonName(p.name);
                                  setPersonRole(p.relation);
                                  setPersonGroup(p.group);
                                  setPersonBirthday("");
                                  setPersonTags(p.tags.join(", "));
                                  setActiveModal("edit-person");
                                  setActiveDropdownId(null);
                                }}
                                className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors"
                              >
                                <Edit2 className="size-4" /> Edit
                              </button>
                              <button 
                                onClick={() => {
                                  setFormTitle(`${p.name}'s Celebration`);
                                  setFormRecipient(p.name);
                                  setFormRelation(p.relation);
                                  setFormTarget("1000");
                                  setActiveModal("create");
                                  setActiveDropdownId(null);
                                }}
                                className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors"
                              >
                                <Gift className="size-4" /> Create celebration
                              </button>
                              <div className="border-t border-zinc-100 my-1" />
                              <button 
                                onClick={() => { setModalEvent(p); setActiveModal("remove-person"); setActiveDropdownId(null); }}
                                className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                              >
                                <Trash2 className="size-4" /> Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tag list row */}
                      <div className="flex flex-wrap gap-1.5 select-none">
                        {p.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx}
                            className="bg-[#F8F6FF] border border-purple-50/50 text-[#7C3AED]/70 text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Milestone visual block */}
                      <div className="bg-[#FAF8FF] border border-purple-100/30 rounded-2xl p-3.5 flex items-center justify-between mt-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{p.milestoneType.includes("Wedding") ? "💍" : "🎂"}</span>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-zinc-800 leading-tight">{p.milestoneType}</span>
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
        ) : activeTab === "events" ? (
          <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full">
            
            {/* Events Header row */}
            <div className="flex justify-between items-start text-left">
              <div className="flex flex-col">
                <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight leading-tight select-none">Events</h1>
                <span className="text-xs text-purple-600 font-bold mt-1 select-none">{countAll} total celebrations</span>
              </div>
              <Button 
                onClick={() => {
                  setFormTitle("");
                  setFormRecipient("");
                  setFormTarget("1000");
                  setActiveModal("create");
                }}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
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
                className="w-full bg-white border border-purple-100/60 focus:border-[#7C3AED] rounded-full h-[54px] pl-12 pr-6 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all shadow-2xs"
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
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                    selectedFilter === pill.filterId
                      ? "bg-[#7C3AED] text-white shadow-sm"
                      : "bg-white text-zinc-500 border border-purple-50 hover:bg-purple-50/50"
                  }`}
                >
                  <span>{pill.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                    selectedFilter === pill.filterId
                      ? "bg-white/20 text-white"
                      : "bg-purple-50 text-zinc-500"
                  }`}>
                    {pill.count}
                  </span>
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
                  const isFinished = ev.progress >= 100;
                  const progressTrackColor = ev.status === "closed" ? "bg-[#009966]" : ev.status === "revealed" ? "bg-gradient-to-r from-orange-500 to-red-500" : ev.status === "archived" ? "bg-[#7C3AED]" : "bg-gradient-to-r from-purple-500 to-pink-500";

                  return (
                    <div 
                      key={ev.id}
                      className="bg-white border border-purple-50/70 rounded-[24px] p-6 text-left shadow-2xs hover:shadow-xs transition-all relative flex flex-col gap-5.5 select-none"
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
                              onClick={() => setActiveDropdownId(activeDropdownId === ev.id ? null : ev.id)}
                              className="size-9 rounded-full bg-zinc-50 hover:bg-purple-50 text-zinc-400 hover:text-[#7C3AED] flex items-center justify-center border border-zinc-100 transition-colors"
                            >
                              <MoreHorizontal className="size-4.5" />
                            </button>

                            {activeDropdownId === ev.id && (
                              <div 
                                ref={dropdownRef}
                                className="absolute right-0 top-11 bg-white border border-purple-100 rounded-xl shadow-xl w-[170px] py-1.5 z-30 animate-in fade-in slide-in-from-top-3 duration-200"
                              >
                                <button 
                                  onClick={() => { setModalEvent(ev); setActiveModal("preview"); setActiveDropdownId(null); }}
                                  className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors"
                                >
                                  <Eye className="size-4" /> Preview page
                                </button>
                                <button 
                                  onClick={() => handleCopyLink(ev.title)}
                                  className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors"
                                >
                                  <Link2 className="size-4" /> Copy share link
                                </button>
                                <button 
                                  onClick={() => {
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
                                  className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors"
                                >
                                  <Edit2 className="size-4" /> Edit
                                </button>
                                <button 
                                  onClick={() => { setModalEvent(ev); setActiveModal("archive"); setActiveDropdownId(null); }}
                                  className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors"
                                >
                                  <Archive className="size-4" /> Archive
                                </button>
                                <div className="border-t border-zinc-100 my-1" />
                                <button 
                                  onClick={() => { setModalEvent(ev); setActiveModal("delete"); setActiveDropdownId(null); }}
                                  className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                                >
                                  <Trash2 className="size-4" /> Delete
                                </button>
                              </div>
                            )}
                          </div>

                          <ProgressCircle percentage={ev.progress} />
                        </div>
                      </div>

                      {/* Status and target details row */}
                      <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 mt-1.5">
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
        ) : (
          /* DASHBOARD HOME VIEW */
          <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full">
            
            {/* Greeting Row */}
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
                  onClick={() => setActiveModal("add-person")}
                  variant="outline" 
                  className="border-purple-200 text-zinc-700 bg-white hover:bg-purple-50 rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-2xs flex items-center gap-2"
                >
                  <UserPlus className="size-4" /> Add Person
                </Button>
                <Button 
                  onClick={() => {
                    setFormTitle("");
                    setFormRecipient("");
                    setFormTarget("1000");
                    setActiveModal("create");
                  }}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
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
                <div className="flex flex-col">
                  <span className="font-bold text-[#7C3AED] text-sm">Emma's birthday in 23 days</span>
                  <span className="text-[13px] text-zinc-500 font-light mt-0.5 leading-relaxed">
                    Emma's 30th Birthday is coming up. Your WishPool is at 84% — share the link to hit your goal!
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab("events")}
                className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] shrink-0 border border-purple-200 bg-white hover:bg-purple-50 px-4 py-2 rounded-full transition-colors flex items-center gap-1"
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
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">$5,020</span>
                  <span className="text-[11px] font-medium opacity-80">All time</span>
                </div>
              </div>

              <div className="w-full h-[147.67px] bg-[#FF2056] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-rose-600/10 transition-transform hover:scale-[1.02] duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90">Active Wishpools</span>
                  <div className="size-9 rounded-full bg-white/20 flex items-center justify-center"><Gift className="size-4.5" /></div>
                </div>
                <div className="flex flex-col text-left gap-[9.84px]">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">{countLive}</span>
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
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">6</span>
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
                      <span className="bg-purple-100 text-[#7C3AED] font-bold text-xs size-5 rounded-full flex items-center justify-center">1</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between bg-zinc-50/50 border border-zinc-100 rounded-2xl p-4 transition-all hover:bg-zinc-50">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">🎓</div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-zinc-900">Alex's Graduation</span>
                          <span className="text-[11px] text-zinc-400 font-light mt-0.5">12 contributors • $500 raised</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => setActiveTab("events")}
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs h-[32px] px-4 rounded-full transition-colors"
                      >
                        Reveal
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Active Wishpools List */}
                <div className="bg-white rounded-3xl border border-purple-100/50 shadow-xs overflow-hidden text-left">
                  <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#7C3AED]">Active WishPools</span>
                      <span className="bg-purple-100 text-[#7C3AED] font-bold text-xs size-5 rounded-full flex items-center justify-center">{countLive}</span>
                    </div>
                    <button onClick={() => { setActiveTab("events"); setSelectedFilter("live"); }} className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center">
                      All events <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                  <div className="p-6 flex flex-col gap-6">
                    {events.filter(e => e.status === "live").map((ev) => (
                      <div key={ev.id} className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-[#FAF8FF] border border-purple-100/50 flex items-center justify-center font-bold text-base shrink-0">{ev.icon}</div>
                            <div className="flex flex-col">
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
                    <button onClick={() => setActiveTab("events")} className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center">
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
              <div className="xl:col-span-5 flex flex-col gap-8 w-full">
                
                {/* Promo Card */}
                <div className="bg-[#7C3AED] text-white rounded-3xl p-8 text-left shadow-lg shadow-purple-600/10 flex flex-col gap-5 relative overflow-hidden select-none">
                  <div className="absolute -top-24 -left-24 size-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold tracking-widest text-purple-200 uppercase">Why WishPool?</span>
                    <h3 className="text-2xl font-extrabold leading-tight">This is more than a page.<br />It's your celebration home.</h3>
                  </div>
                  <div className="flex flex-col gap-5.5 mt-2">
                    <div className="flex items-start gap-4">
                      <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Bell className="size-4 text-purple-100" /></div>
                      <div className="flex flex-col"><span className="font-bold text-[14px]">Never miss a birthday</span><span className="text-[11.5px] text-purple-100 font-light mt-0.5 leading-relaxed">Reminders sent weeks in advance — automatically.</span></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Users className="size-4 text-purple-100" /></div>
                      <div className="flex flex-col"><span className="font-bold text-[14px]">Build your Celebration Network</span><span className="text-[11.5px] text-purple-100 font-light mt-0.5 leading-relaxed">Save family & friends. Every date in one place.</span></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Gift className="size-4 text-purple-100" /></div>
                      <div className="flex flex-col"><span className="font-bold text-[14px]">Create unlimited WishPools</span><span className="text-[11.5px] text-purple-100 font-light mt-0.5 leading-relaxed">Celebrate everyone who matters, year after year.</span></div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Events Box */}
                <div className="bg-white rounded-3xl border border-purple-100/50 shadow-xs overflow-hidden text-left">
                  <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100/30 flex items-center justify-between">
                    <span className="font-bold text-sm text-[#7C3AED]">Upcoming Events</span>
                    <button onClick={() => setActiveTab("events")} className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center">
                      All events <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    {events.slice(0, 3).map((ev) => (
                      <div key={ev.id} className="flex items-center justify-between bg-[#FAF8FF] border border-purple-100/20 rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-white flex items-center justify-center text-sm border border-purple-100/50 shrink-0">{ev.icon}</div>
                          <div className="flex flex-col">
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
        )}

      </main>

      {/* 3. MODAL: CREATE CELEBRATION */}
      {activeModal === "create" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100">
            <button 
              onClick={() => setActiveModal(null)}
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
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Emma's 30th Birthday" 
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
                    placeholder="e.g. Emma Johnson" 
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-800 outline-none w-full transition-all"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Relationship</label>
                  <select 
                    value={formRelation}
                    onChange={(e) => setFormRelation(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3 text-sm text-zinc-800 outline-none w-full transition-all"
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
                    placeholder="e.g. Jul 15, 2025" 
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-800 outline-none w-full transition-all"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Goal Fund ($)</label>
                  <input 
                    type="number" 
                    required
                    value={formTarget}
                    onChange={(e) => setFormTarget(e.target.value)}
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

      {/* 4. MODAL: EDIT CELEBRATION */}
      {activeModal === "edit" && modalEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-3.5 border-b border-zinc-100 pb-4 mb-5">
              <div className="size-10 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center">
                <Edit2 className="size-5" />
              </div>
              <h2 className="text-xl font-extrabold text-zinc-900">Edit Celebration</h2>
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
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-800 outline-none w-full transition-all"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Relationship</label>
                  <select 
                    value={formRelation}
                    onChange={(e) => setFormRelation(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3 text-sm text-zinc-800 outline-none w-full transition-all"
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
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] text-sm text-zinc-850 outline-none w-full transition-all rounded-lg h-[44px] px-3"
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
                  className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3 text-sm text-zinc-800 outline-none w-full transition-all"
                >
                  <option value="live">Live</option>
                  <option value="draft">Draft</option>
                  <option value="closed">Closed</option>
                  <option value="revealed">Revealed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] rounded-lg shadow-sm transition-all mt-2">
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: PREVIEW PAGE */}
      {activeModal === "preview" && modalEvent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 select-none">
          <div className="bg-[#FAF8FF] rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100 max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full"
            >
              <X className="size-5.5" />
            </button>

            {/* Mock Landing Banner Preview */}
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

            {/* Mock Contribution panel */}
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

              {/* Progress bar */}
              <div className="w-full h-3 bg-purple-50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${Math.min(modalEvent.progress || 0, 100)}%` }} />
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3 mt-1.5">
                <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] rounded-full text-xs transition-all shadow-sm">
                  Add to WishPool
                </Button>
                <Button 
                  onClick={() => handleCopyLink(modalEvent.title || modalEvent.name)}
                  variant="outline" 
                  className="border-purple-200 text-[#7C3AED] bg-white hover:bg-purple-50 font-bold h-[44px] rounded-full text-xs transition-all flex items-center justify-center gap-1.5"
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
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center animate-in zoom-in-95 duration-250 border border-purple-100">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full"
            >
              <X className="size-5" />
            </button>

            <div className="size-12 rounded-full bg-rose-50 border border-rose-100 text-[#FF2056] flex items-center justify-center mx-auto mb-4 mt-2">
              <Trash2 className="size-6 animate-bounce" />
            </div>

            <h3 className="text-lg font-extrabold text-zinc-950 mb-2">Delete Celebration?</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
              Are you sure you want to delete <span className="font-bold text-zinc-700">"{modalEvent.title}"</span>? This will permanently close the WishPool and cannot be undone.
            </p>

            <div className="flex gap-3">
              <Button 
                onClick={() => setActiveModal(null)}
                variant="outline" 
                className="w-full border-purple-100 text-zinc-500 hover:bg-zinc-50 h-[42px] text-xs font-bold rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDeleteConfirm}
                className="w-full bg-[#FF2056] hover:bg-rose-600 text-white h-[42px] text-xs font-bold rounded-lg shadow-sm"
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
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center animate-in zoom-in-95 duration-250 border border-purple-100">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full"
            >
              <X className="size-5" />
            </button>

            <div className="size-12 rounded-full bg-purple-50 border border-purple-100 text-[#7C3AED] flex items-center justify-center mx-auto mb-4 mt-2">
              <Archive className="size-5" />
            </div>

            <h3 className="text-lg font-extrabold text-zinc-950 mb-2">Archive Celebration?</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
              Are you sure you want to archive <span className="font-bold text-zinc-700">"{modalEvent.title}"</span>? This hides it from active layouts but keeps the page and contributors' messages intact.
            </p>

            <div className="flex gap-3">
              <Button 
                onClick={() => setActiveModal(null)}
                variant="outline" 
                className="w-full border-purple-100 text-zinc-500 hover:bg-zinc-50 h-[42px] text-xs font-bold rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleArchiveConfirm}
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white h-[42px] text-xs font-bold rounded-lg shadow-sm"
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
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full"
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
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3 text-sm text-zinc-800 outline-none w-full transition-all"
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
                    className="bg-[#FAF8FF] border border-purple-100 rounded-lg h-[44px] px-3.5 text-sm text-zinc-800 outline-none w-full transition-all"
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
                    className="bg-[#FAF8FF] border border-purple-100 rounded-lg h-[44px] px-3 text-sm text-zinc-850 outline-none w-full transition-all"
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

              <Button type="submit" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] rounded-lg shadow-sm transition-all mt-2">
                {activeModal === "edit-person" ? "Save Changes" : "Add Contact"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* 9. MODAL: VIEW NETWORK PROFILE */}
      {activeModal === "view-person" && modalEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[#FAF8FF] rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full"
            >
              <X className="size-5" />
            </button>

            <div className="flex flex-col items-center text-center gap-3.5 border-b border-zinc-100 pb-5 mb-5 select-none">
              <img src={modalEvent.avatar} alt={modalEvent.name} className="size-20 rounded-full object-cover border-2 border-[#7C3AED] shadow-md" />
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
              {/* Milestone Details */}
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Active Milestones</h4>
                <div className="bg-white border border-purple-100/50 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{modalEvent.milestoneType.includes("Wedding") ? "💍" : "🎂"}</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-zinc-800 leading-tight">{modalEvent.milestoneType}</span>
                      <span className="text-[10px] text-zinc-400 mt-0.5">{modalEvent.milestoneDate}</span>
                    </div>
                  </div>
                  <span className="bg-rose-50 text-[#FF2056] border border-rose-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    In {modalEvent.daysLeft} days
                  </span>
                </div>
              </div>

              {/* History Event logs */}
              <div className="flex flex-col gap-2 mt-1">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Past pool activity</h4>
                {modalEvent.pastCelebration ? (
                  <div className="bg-white border border-zinc-100 rounded-2xl p-4 flex items-center justify-between">
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

              {/* Action Trigger */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button 
                  onClick={() => {
                    setFormTitle(`${modalEvent.name}'s Celebration`);
                    setFormRecipient(modalEvent.name);
                    setFormRelation(modalEvent.relation);
                    setFormTarget("1000");
                    setActiveModal("create");
                  }}
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[42px] rounded-xl text-xs shadow-sm transition-all"
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
                  className="w-full border-purple-100 text-zinc-600 bg-white hover:bg-purple-50 font-bold h-[42px] rounded-xl text-xs transition-all"
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
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center animate-in zoom-in-95 duration-250 border border-purple-100">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full"
            >
              <X className="size-5" />
            </button>

            <div className="size-12 rounded-full bg-rose-50 border border-rose-100 text-[#FF2056] flex items-center justify-center mx-auto mb-4 mt-2">
              <Trash2 className="size-5 animate-bounce" />
            </div>

            <h3 className="text-lg font-extrabold text-zinc-950 mb-2">Remove Contact?</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
              Are you sure you want to remove <span className="font-bold text-zinc-700">"{modalEvent.name}"</span> from your Celebration Network? This cannot be undone.
            </p>

            <div className="flex gap-3">
              <Button 
                onClick={() => setActiveModal(null)}
                variant="outline" 
                className="w-full border-purple-100 text-zinc-500 hover:bg-zinc-50 h-[42px] text-xs font-bold rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRemovePersonConfirm}
                className="w-full bg-[#FF2056] hover:bg-rose-600 text-white h-[42px] text-xs font-bold rounded-lg shadow-sm"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
