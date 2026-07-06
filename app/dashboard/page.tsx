"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Calendar, Users, BarChart3, Bell, Settings, 
  LogOut, Plus, Search, Menu, X, DollarSign, Gift, Megaphone, 
  UserPlus, ChevronRight, ShieldCheck, Clock, Check, MoreHorizontal,
  Eye, Link2, Edit2, Archive, Trash2, CalendarDays, Award, User,
  CalendarRange, ArrowUpDown, ChevronDown, TrendingUp, Camera,
  CreditCard, FileText, Laptop, Smartphone, Key, Lock, Trash, Save,
  Palette, Info, ArrowLeft, ArrowRight, Share2, Globe, LockKeyhole, Send, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

// Import Recharts elements for analytics section
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line 
} from "recharts";

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
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, events, network, analytics, notifications, settings, create-celebration
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all"); // all, live, draft, closed, revealed, archived

  // Network views filters
  const [networkSearchQuery, setNetworkSearchQuery] = useState("");
  const [networkFilter, setNetworkFilter] = useState("all"); // all, family, friend, colleague, partner, custom
  const [networkSort, setNetworkSort] = useState("milestone"); // milestone, name, recent
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Notification filters
  const [notifFilter, setNotifFilter] = useState("all"); // all, reminder, contribution, goal, reveal, system

  // Settings Subtabs
  const [settingsSubTab, setSettingsSubTab] = useState("profile"); // profile, notification, billing, security

  // Settings Form States
  const [profileName, setProfileName] = useState("Jamie Rivera");
  const [profileEmail, setProfileEmail] = useState("jamie@example.com");
  const [profilePhone, setProfilePhone] = useState("+1 (555) 012-3456");
  const [profileBio, setProfileBio] = useState("");
  const [profileWebsite, setProfileWebsite] = useState("jamierivera.com");
  const [profileAvatar, setProfileAvatar] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80");

  // Settings Toggles
  const [notifNewContrib, setNotifNewContrib] = useState(true);
  const [notifGoalReached, setNotifGoalReached] = useState(true);
  const [notifUpcomingReminder, setNotifUpcomingReminder] = useState(true);
  const [notifContribMsgs, setNotifContribMsgs] = useState(true);

  // Security States
  const [currentPassword, setCurrentPassword] = useState("password123");
  const [newPassword, setNewPassword] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [sessions, setSessions] = useState([
    { id: "sess-mac", device: "MacBook Pro - Chrome", location: "San Francisco, CA · Now", current: true },
    { id: "sess-iphone", device: "iPhone 15 - Safari", location: "San Francisco, CA · 2 hours ago", current: false }
  ]);

  // Profile state for header / sidebar updating
  const [userProfile, setUserProfile] = useState({
    name: "Jamie Rivera",
    email: "jamie@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  });

  // ----------------------------------------------------
  // MULTI-STEP CREATION WIZARD STATE
  // ----------------------------------------------------
  const [wizardStep, setWizardStep] = useState(1); // 1: Basics, 2: Design, 3: WishPool, 4: Publish
  const [wTitle, setWTitle] = useState("Sohan Birthday");
  const [wType, setWType] = useState("Birthday"); // Birthday, Wedding, Anniversary, Graduation, Baby Shower, Retirement, Promotion, Work Anniversary, Custom
  const [wRecipient, setWRecipient] = useState("Marcus Chen");
  const [wRecipientCustom, setWRecipientCustom] = useState("");
  const [isRecipientDropdownOpen, setIsRecipientDropdownOpen] = useState(false);
  const [wDate, setWDate] = useState("2026-03-23");
  const [wDescription, setWDescription] = useState("Hope you have the most amazing birthday!");
  const [wTheme, setWTheme] = useState("Celestial"); // Celestial, Bloom, Golden, Sky, Garden, Midnight, Peach, Sago
  const [wInviteEmail, setWInviteEmail] = useState("");
  const [wInvitees, setWInvitees] = useState<string[]>(["mdsohanurrohman310@gmail.com"]);
  const [wPrivacy, setWPrivacy] = useState("Public"); // Private, Public

  // Step 2 design
  const [wHeadline, setWHeadline] = useState("Birthday");
  const [wWelcomeMsg, setWWelcomeMsg] = useState("Join us in making this moment extra special!");

  // Step 3 WishPool funds
  const [wEnableWishPool, setWEnableWishPool] = useState(true);
  const [wGoalFund, setWGoalFund] = useState(500);
  const [wDeadlineDate, setWDeadlineDate] = useState("");
  const [wDeadlineTime, setWDeadlineTime] = useState("11:59 PM");
  const [wSuggestedAmounts, setWSuggestedAmounts] = useState<number[]>([25, 50, 100]);
  const [wCustomAmountVal, setWCustomAmountVal] = useState("");
  const [wMinContribution, setWMinContribution] = useState(5);
  const [wAllowCustomAmount, setWAllowCustomAmount] = useState(true);
  const [wStripeConnected, setWStripeConnected] = useState(false);

  // Step 4 preview
  const [previewTab, setPreviewTab] = useState("public-page"); // public-page, contribute-flow, reveal-experience
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  
  const recipientDropdownRef = useRef<HTMLDivElement>(null);

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

  // Notifications Interactive array
  const [notifications, setNotifications] = useState([
    {
      id: "notif-emma-bday",
      title: "Emma's birthday in 23 days",
      message: "Emma's 30th Birthday is coming up. Your WishPool is at 84% — share the link to hit your goal!",
      time: "Just now",
      read: false,
      type: "reminder",
      icon: "⏳",
      iconBg: "bg-amber-50 text-amber-500 border border-amber-100",
      bgClass: "bg-[#FFFDF5] border border-amber-100/70"
    },
    {
      id: "notif-contrib-marcus",
      title: "New contribution received",
      message: "Marcus Chen contributed $75 to Emma's 30th Birthday.",
      time: "2 hours ago",
      read: false,
      type: "contribution",
      icon: "🎁",
      iconBg: "bg-purple-50 text-[#7C3AED] border border-purple-100",
      bgClass: "bg-[#FAF8FF] border border-purple-100/50"
    },
    {
      id: "notif-contrib-sophie",
      title: "New contribution received",
      message: "Sophie Laurent contributed $50 to Emma's 30th Birthday.",
      time: "3 hours ago",
      read: false,
      type: "contribution",
      icon: "🎁",
      iconBg: "bg-purple-50 text-[#7C3AED] border border-purple-100",
      bgClass: "bg-[#FAF8FF] border border-purple-100/50"
    },
    {
      id: "notif-goal-reached",
      title: "Goal reached! 🎉",
      message: "Alex's Graduation WishPool hit $500 — the goal is complete! Ready to reveal.",
      time: "1 day ago",
      read: true,
      type: "goal",
      icon: "🎯",
      iconBg: "bg-emerald-50 text-emerald-500 border border-emerald-100",
      bgClass: "bg-white border border-zinc-100"
    },
    {
      id: "notif-reveal-complete",
      title: "Reveal completed",
      message: "Robert Rivera opened his retirement reveal page and reacted 😄",
      time: "2 days ago",
      read: true,
      type: "reveal",
      icon: "✨",
      iconBg: "bg-fuchsia-50 text-fuchsia-500 border border-fuchsia-100",
      bgClass: "bg-white border border-zinc-100"
    },
    {
      id: "notif-sophie-wedding",
      title: "Sophie's wedding in 42 days",
      message: "You're at 49% of your wedding WishPool goal. Invite more contributors!",
      time: "3 days ago",
      read: true,
      type: "reminder",
      icon: "⏳",
      iconBg: "bg-amber-50 text-amber-500 border border-amber-100",
      bgClass: "bg-white border border-zinc-100"
    },
    {
      id: "notif-welcome",
      title: "Welcome to WishPool! 🎉",
      message: "Your trial is active. Enjoy unlimited celebrations and the confetti reveal.",
      time: "5 days ago",
      read: true,
      type: "system",
      icon: "❄️",
      iconBg: "bg-blue-50 text-blue-500 border border-blue-100",
      bgClass: "bg-white border border-zinc-100"
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
      if (recipientDropdownRef.current && !recipientDropdownRef.current.contains(event.target as Node)) {
        setIsRecipientDropdownOpen(false);
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

  // Mark all as read
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    triggerToast("All notifications marked as read.");
  };

  // Toggle notification read status
  const handleToggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, read: !n.read };
      }
      return n;
    }));
  };

  // Save Settings Changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({
      name: profileName,
      email: profileEmail,
      avatar: profileAvatar
    });
    triggerToast("Profile updated successfully!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      triggerToast("Password must be at least 8 characters!");
      return;
    }
    setCurrentPassword(newPassword);
    setNewPassword("");
    triggerToast("Password updated successfully!");
  };

  // Revoke session
  const handleRevokeSession = (sessId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessId));
    triggerToast("Session revoked.");
  };

  // ----------------------------------------------------
  // ADD PARTICIPANT WIZARD TRIGGER
  // ----------------------------------------------------
  const handleAddInvitee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wInviteEmail || !wInviteEmail.includes("@")) {
      triggerToast("Enter a valid email address!");
      return;
    }
    if (wInvitees.includes(wInviteEmail)) {
      triggerToast("Participant already added.");
      return;
    }
    setWInvitees(prev => [...prev, wInviteEmail]);
    setWInviteEmail("");
    triggerToast("Participant added to invite list!");
  };

  const handleRemoveInvitee = (email: string) => {
    setWInvitees(prev => prev.filter(e => e !== email));
  };

  // Toggle suggested amounts checkboxes
  const handleToggleAmountChip = (amount: number) => {
    if (wSuggestedAmounts.includes(amount)) {
      setWSuggestedAmounts(prev => prev.filter(a => a !== amount));
    } else {
      setWSuggestedAmounts(prev => [...prev, amount].sort((a, b) => a - b));
    }
  };

  // Add custom chip to presets list
  const handleAddCustomPreset = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(wCustomAmountVal);
    if (!val || val <= 0) {
      triggerToast("Enter a valid preset amount!");
      return;
    }
    if (wSuggestedAmounts.includes(val)) {
      triggerToast("Amount already in presets!");
      return;
    }
    setWSuggestedAmounts(prev => [...prev, val].sort((a, b) => a - b));
    setWCustomAmountVal("");
    triggerToast(`Added $${val} to suggested presets!`);
  };

  // ----------------------------------------------------
  // CONFIRM AND PUBLISH NEW CELEBRATION
  // ----------------------------------------------------
  const handlePublishCelebration = () => {
    // Determine details
    const chosenRecipient = wRecipient === "Someone else" ? (wRecipientCustom || "Someone Special") : wRecipient;
    
    // Find relation from network list if available
    const matchedContact = networkPeople.find(p => p.name === chosenRecipient);
    const relation = matchedContact ? matchedContact.relation : "Friend";
    
    // Format Date
    let dateStr = "Dec 25, 2026";
    if (wDate) {
      const parts = wDate.split("-");
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      if (parts.length === 3) {
        const mIdx = parseInt(parts[1]) - 1;
        dateStr = `${monthNames[mIdx]} ${parseInt(parts[2])}, ${parts[0]}`;
      }
    }

    // Determine event emoji icon
    let chosenIcon = "🎂";
    if (wType === "Wedding") chosenIcon = "💍";
    if (wType === "Anniversary") chosenIcon = "🥂";
    if (wType === "Graduation") chosenIcon = "🎓";
    if (wType === "Baby Shower") chosenIcon = "👶";
    if (wType === "Retirement") chosenIcon = "🌅";
    if (wType === "Promotion") chosenIcon = "🏆";
    if (wType === "Work Anniversary") chosenIcon = "🏢";
    if (wType === "Custom") chosenIcon = "✨";

    // Setup color gradients
    let themeBg = "bg-gradient-to-r from-purple-500 to-pink-500";
    if (wTheme === "Bloom") themeBg = "bg-gradient-to-r from-pink-500 to-rose-600";
    if (wTheme === "Golden") themeBg = "bg-gradient-to-r from-amber-500 to-orange-600";
    if (wTheme === "Sky") themeBg = "bg-gradient-to-r from-sky-400 to-blue-500";
    if (wTheme === "Garden") themeBg = "bg-gradient-to-r from-emerald-450 to-teal-600";
    if (wTheme === "Midnight") themeBg = "bg-[#0D0A1A]";

    const newId = `event-${Date.now()}`;
    const newCelebration = {
      id: newId,
      title: wTitle || `${chosenRecipient}'s Celebration`,
      recipient: chosenRecipient,
      relation: relation,
      status: "live",
      date: dateStr,
      contributors: 0,
      raised: 0,
      target: wEnableWishPool ? (wGoalFund || 500) : 0,
      icon: chosenIcon,
      color: themeBg,
      progress: 0
    };

    // Add to state list
    setEvents(prev => [newCelebration, ...prev]);

    // Show Published Modal instead of immediate redirect
    setIsPublishModalOpen(true);

    // Full screen Confetti blast!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  // Theme Gradients configurations
  const themeGradients: Record<string, string> = {
    Celestial: "from-purple-800 via-purple-600 to-indigo-700",
    Bloom: "from-pink-600 via-pink-500 to-rose-600",
    Golden: "from-amber-500 via-orange-500 to-red-500",
    Sky: "from-sky-500 via-blue-500 to-indigo-600",
    Garden: "from-emerald-500 via-teal-500 to-emerald-600",
    Midnight: "from-zinc-900 via-slate-800 to-zinc-950",
    Peach: "from-pink-400 via-rose-450 to-orange-400",
    Sago: "from-teal-500 via-emerald-400 to-emerald-600",
  };

  // Recipient details autofill on select
  const handleSelectRecipient = (name: string) => {
    setWRecipient(name);
    setIsRecipientDropdownOpen(false);

    // If matches a network person, auto pre-fill date
    const matched = networkPeople.find(p => p.name === name);
    if (matched) {
      // birthday details mapper
      const currentYear = new Date().getFullYear();
      let parts = matched.milestoneDate.split(" ");
      if (parts.length === 2) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const mIdx = monthNames.indexOf(parts[0]) + 1;
        const monthStr = mIdx < 10 ? `0${mIdx}` : `${mIdx}`;
        const dayVal = parseInt(parts[1]);
        const dayStr = dayVal < 10 ? `0${dayVal}` : `${dayVal}`;
        setWDate(`${currentYear}-${monthStr}-${dayStr}`);
      }
    }
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

  // Notifications calculation variables
  const unreadNotifCount = notifications.filter(n => !n.read).length;
  
  const countNotifAll = notifications.length;
  const countNotifReminder = notifications.filter(n => n.type === "reminder").length;
  const countNotifContribution = notifications.filter(n => n.type === "contribution").length;
  const countNotifGoal = notifications.filter(n => n.type === "goal").length;
  const countNotifReveal = notifications.filter(n => n.type === "reveal").length;
  const countNotifSystem = notifications.filter(n => n.type === "system").length;

  // Filter notifications list
  const filteredNotifs = notifications.filter(n => {
    if (notifFilter === "all") return true;
    return n.type === notifFilter;
  });

  const unreadNotifs = filteredNotifs.filter(n => !n.read);
  const earlierNotifs = filteredNotifs.filter(n => n.read);

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: Calendar, badge: countAll },
    { id: "network", label: "Network", icon: Users, badge: netCountAll },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell, badge: unreadNotifCount },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // ----------------------------------------------------
  // CONDITIONAL RENDER: MULTI-STEP CREATION WIZARD
  // ----------------------------------------------------
  if (activeTab === "create-celebration") {
    
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

              <h3 className="text-xl font-extrabold text-zinc-950 mb-1.5 leading-snug">Published!</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-[260px] mb-6">
                <span className="font-bold text-zinc-700">"{wTitle}"</span> is now live. Share the link with contributors — every gift and message goes straight to your dashboard.
              </p>

              {/* share link textbox block */}
              <div className="w-full bg-[#FAF8FF] border border-purple-100 rounded-xl p-3 flex items-center justify-between gap-3 mb-6 select-text">
                <span className="text-xs font-semibold text-zinc-500 truncate w-3/4 text-left">
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

        {/* Toast Popup inside wizard */}
        {toastMessage && (
          <div className="fixed top-6 right-6 bg-[#0D0A1A] text-white px-5 py-3 rounded-full flex items-center gap-2.5 shadow-xl z-[999] animate-in fade-in slide-in-from-top duration-300 font-medium text-xs border border-purple-50/25">
            <Check className="size-4 text-emerald-400" />
            <span>{toastMessage}</span>
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
              className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 rounded-full transition-all"
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
                      isActive ? "text-[#7C3AED]" : isCompleted ? "text-[#009966]" : "text-zinc-500"
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
                    <div className="flex flex-col gap-1.5 relative" ref={recipientDropdownRef}>
                      <label className="text-xs font-bold text-zinc-700">Recipient *</label>
                      <button
                        type="button"
                        onClick={() => setIsRecipientDropdownOpen(!isRecipientDropdownOpen)}
                        className="bg-white border border-purple-100 hover:border-[#7C3AED] rounded-lg h-[46px] px-3.5 text-xs text-zinc-700 transition-colors flex items-center justify-between w-full text-left"
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
                            className="w-full h-[38px] px-4 text-left text-xs font-bold hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors border-b border-zinc-100 text-purple-650"
                          >
                            Someone else
                          </button>
                          {networkPeople.map((person) => (
                            <button
                              key={person.id}
                              type="button"
                              onClick={() => handleSelectRecipient(person.name)}
                              className={`w-full h-[38px] px-4 text-left text-xs font-semibold hover:bg-purple-50 hover:text-[#7C3AED] flex items-center justify-between transition-colors ${
                                wRecipient === person.name ? "text-[#7C3AED] bg-purple-50/50" : "text-zinc-700"
                              }`}
                            >
                              <span>{person.name} ({person.relation})</span>
                              {wRecipient === person.name && <Check className="size-3.5 text-[#7C3AED]" />}
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

                  {/* Input 6: Cover theme Gradient Cards selector */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-zinc-700">Cover theme *</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                      {[
                        { name: "Celestial", g: "from-purple-500 to-indigo-600" },
                        { name: "Bloom", g: "from-pink-500 to-rose-600" },
                        { name: "Golden", g: "from-amber-400 to-orange-500" },
                        { name: "Sky", g: "from-sky-400 to-blue-500" },
                        { name: "Garden", g: "from-emerald-400 to-teal-500" },
                        { name: "Midnight", g: "from-zinc-800 to-slate-950" },
                        { name: "Peach", g: "from-pink-300 via-rose-350 to-orange-400" },
                        { name: "Sago", g: "from-teal-400 to-emerald-500" }
                      ].map((th) => {
                        const isThSel = wTheme === th.name;
                        return (
                          <button
                            key={th.name}
                            type="button"
                            onClick={() => setWTheme(th.name)}
                            className={`flex flex-col rounded-xl overflow-hidden border-2 text-center transition-all aspect-square ${
                              isThSel ? "border-[#7C3AED] scale-[1.03] shadow-xs" : "border-purple-100 hover:opacity-90"
                            }`}
                          >
                            <div className={`flex-grow bg-gradient-to-tr ${th.g}`} />
                            <span className="text-[9px] font-bold text-zinc-500 py-1">{th.name}</span>
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
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold h-[44px] px-5 rounded-lg shrink-0 text-xs transition-colors"
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
                            className="hover:text-rose-600 transition-colors"
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
                            className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                              isPrivSel 
                                ? "border-[#7C3AED] bg-purple-50/20 shadow-2xs" 
                                : "border-purple-100 bg-white hover:bg-[#FAF8FF]/30"
                            }`}
                          >
                            <div className={`p-2.5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                              isPrivSel ? "border-purple-200 bg-purple-50 text-[#7C3AED]" : "border-zinc-100 bg-zinc-50 text-zinc-400"
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

                  {/* Copy & Messaging card box */}
                  <div className="bg-white border border-purple-100/60 rounded-[20px] p-6 flex flex-col gap-5 shadow-2xs">
                    <h3 className="font-extrabold text-zinc-900 text-sm border-b border-zinc-100 pb-3">Copy & Messaging</h3>
                    
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
                        className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[46px] px-3 text-sm text-zinc-808 outline-none w-full transition-all"
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
                      <span className="text-[10px] text-zinc-400 font-light mt-0.5">Choose the celebration type to load matching welcome messages</span>
                    </div>

                    {/* Welcome Message templates dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700">Welcome message</label>
                      <select 
                        value={wWelcomeMsg}
                        onChange={(e) => setWWelcomeMsg(e.target.value)}
                        className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[46px] px-3 text-sm text-zinc-808 outline-none w-full transition-all"
                      >
                        <option value="Join us in making this moment extra special!">Join us in making this moment extra special!</option>
                        <option value="Let's make this milestone unforgettable with gifts and wishes!">Let's make this milestone unforgettable with gifts and wishes!</option>
                        <option value="Contribute to the goal and leave a heartfelt wish.">Contribute to the goal and leave a heartfelt wish.</option>
                      </select>
                      <span className="text-[10px] text-zinc-400 font-light mt-0.5">Choose one of the 10 pre-written messages for this category</span>
                    </div>

                  </div>

                  {/* Theme Gradient selector duplicated */}
                  <div className="bg-white border border-purple-100/60 rounded-[20px] p-6 flex flex-col gap-5 shadow-2xs">
                    <h3 className="font-extrabold text-zinc-900 text-sm border-b border-zinc-100 pb-3">Cover Theme</h3>
                    
                    <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-2">
                      {[
                        { name: "Celestial", g: "from-purple-500 to-indigo-600" },
                        { name: "Bloom", g: "from-pink-500 to-rose-600" },
                        { name: "Golden", g: "from-amber-400 to-orange-500" },
                        { name: "Sky", g: "from-sky-400 to-blue-500" },
                        { name: "Garden", g: "from-emerald-400 to-teal-500" },
                        { name: "Midnight", g: "from-zinc-800 to-slate-950" },
                        { name: "Peach", g: "from-pink-300 via-rose-350 to-orange-400" },
                        { name: "Sago", g: "from-teal-400 to-emerald-500" }
                      ].map((th) => {
                        const isThSel = wTheme === th.name;
                        return (
                          <button
                            key={th.name}
                            type="button"
                            onClick={() => setWTheme(th.name)}
                            className={`flex flex-col rounded-xl overflow-hidden border-2 text-center transition-all aspect-square ${
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

              {/* STEP 3: WISHPOOL SETTINGS - OVERHAULED TO MATCH SCREENSHOT */}
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
                      className={`w-11 h-6 rounded-full transition-all flex items-center p-0.5 shrink-0 ${
                        wEnableWishPool ? "bg-[#7C3AED] justify-end" : "bg-zinc-200 justify-start"
                      }`}
                    >
                      <span className="size-5 rounded-full bg-white shadow-md transition-all" />
                    </button>
                  </div>

                  {!wEnableWishPool ? (
                    /* Contributions Disabled state notice */
                    <div className="text-xs text-zinc-400 font-light bg-zinc-50 border border-zinc-150 rounded-xl p-4.5 text-left select-none animate-in fade-in duration-200">
                      Contributions disabled. The page will still be shareable for messages and celebration wishes.
                    </div>
                  ) : (
                    /* Contributions Enabled details cards */
                    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                      
                      {/* fundraising goal card */}
                      <div className="bg-white border border-purple-100/60 rounded-[20px] p-6 flex flex-col gap-5.5 shadow-2xs">
                        <h3 className="font-extrabold text-zinc-900 text-sm border-b border-zinc-100 pb-3 leading-none select-none">Fundraising Goal</h3>
                        
                        {/* Goal amount */}
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
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-extrabold text-zinc-400 font-mono">$</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-light select-none leading-none mt-0.5">No upper limit. Contributors see the progress bar toward this target.</span>
                        </div>

                        {/* Deadline picker */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-zinc-700">Contribution deadline <span className="text-zinc-400 font-normal">(optional)</span></label>
                          <div className="flex gap-3">
                            <input 
                              type="date" 
                              value={wDeadlineDate}
                              onChange={(e) => setWDeadlineDate(e.target.value)}
                              className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[46px] px-3.5 text-xs text-zinc-800 outline-none w-full transition-all"
                            />
                            <div className="h-[46px] rounded-lg border border-purple-100 bg-[#FAF8FF] px-4 flex items-center gap-1.5 shrink-0 text-xs font-semibold text-zinc-400 select-none">
                              <Clock className="size-4" /> 11:59 PM
                            </div>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-light select-none leading-none mt-0.5">Leave blank to close the WishPool manually from your dashboard.</span>
                        </div>

                      </div>

                      {/* Suggested Amounts configuration */}
                      <div className="bg-white border border-purple-100/60 rounded-[20px] p-6 flex flex-col gap-6 shadow-2xs">
                        <div className="border-b border-zinc-100 pb-3">
                          <h3 className="font-extrabold text-zinc-900 text-sm leading-none select-none">Suggested Amounts</h3>
                          <p className="text-[10px] text-zinc-400 font-light mt-1.5 select-none leading-none">Contributors see these as quick-select buttons on the contribution page</p>
                        </div>

                        {/* Toggle presets chips list */}
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
                                    : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                                }`}
                              >
                                {isCheck && <Check className="size-3.5" />}
                                <span>${amt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Add custom suggested value */}
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
                            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold h-[44px] px-5 rounded-lg shrink-0 transition-colors"
                          >
                            Add
                          </Button>
                        </form>

                        {/* Minimum gift option */}
                        <div className="flex flex-col gap-1.5 border-t border-zinc-100 pt-4 mt-2">
                          <label className="text-xs font-bold text-zinc-700">Minimum contribution <span className="text-zinc-450 font-normal">(optional)</span></label>
                          <div className="relative max-w-xs">
                            <input 
                              type="number" 
                              value={wMinContribution}
                              onChange={(e) => setWMinContribution(parseFloat(e.target.value) || 0)}
                              className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] pl-8 pr-3.5 text-xs text-zinc-800 outline-none w-full transition-all font-mono font-bold"
                            />
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 font-mono">$</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-light select-none leading-none mt-0.5">Stripe charges 30c per transaction, so $5 is recommended.</span>
                        </div>

                      </div>

                      {/* Secured by Stripe Card banner */}
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

              {/* STEP 4: REVIEW & PUBLISH - FULL-WIDTH OVERHAULED TO MATCH SCREENSHOT */}
              {wizardStep === 4 && (
                <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200 text-left">
                  <div>
                    <h2 className="text-2xl font-extrabold text-zinc-955 tracking-tight leading-none">Preview & Publish</h2>
                    <span className="text-xs text-zinc-400 font-light mt-1.5 block">Review and go live</span>
                  </div>

                  {/* Status checklist Card banner */}
                  <div className="bg-white border-2 border-[#7C3AED]/70 rounded-2xl p-5 flex items-start gap-4 shadow-2xs select-none">
                    <div className="size-8.5 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0 border border-purple-100">
                      <Check className="size-4.5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-extrabold text-sm text-zinc-900 leading-tight">Everything looks great!</span>
                      <span className="text-xs text-zinc-400 font-light mt-1 leading-normal">Your celebration is ready to publish. Review the previews below and hit the button.</span>
                    </div>
                  </div>

                  {/* Summary Columns Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Col Left: Detail items (Col-span 8) */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                      
                      {/* Summary Block */}
                      <div className="bg-white border border-[#F4F1FB] rounded-[24px] p-6 flex flex-col gap-5 shadow-2xs">
                        
                        {/* Avatar & Title Row */}
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

                        {/* Three stats layout */}
                        <div className="grid grid-cols-3 gap-3 border-t border-zinc-100 pt-4 select-none">
                          <div className="bg-[#FAF8FF] border border-purple-100/25 rounded-xl p-3 flex flex-col gap-1">
                            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Event Date</span>
                            <span className="text-xs font-bold text-zinc-800 mt-0.5 truncate">
                              {wDate ? new Date(wDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Not Set"}
                            </span>
                          </div>
                          <div className="bg-[#FAF8FF] border border-purple-100/25 rounded-xl p-3 flex flex-col gap-1">
                            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Goal amount</span>
                            <span className="text-xs font-extrabold text-zinc-805 mt-0.5 font-mono">${wGoalFund}</span>
                          </div>
                          <div className="bg-[#FAF8FF] border border-purple-100/25 rounded-xl p-3 flex flex-col gap-1">
                            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Theme</span>
                            <span className="text-xs font-bold text-zinc-800 mt-0.5 truncate">{wTheme}</span>
                          </div>
                        </div>

                      </div>

                      {/* pre-publish checklist */}
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
                                <span className="text-zinc-500">{chk.label}</span>
                              </div>
                              <span className="text-zinc-800 font-semibold">{chk.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Col Right: Publish & fees cards (Col-span 4) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                      
                      {/* Ready to go live card */}
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

                      {/* After Publishing checklists card */}
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
                              <div key={idx} className="flex items-start gap-3 text-[11px] font-medium text-zinc-600 leading-normal">
                                <StepIcon className="size-4 text-[#7C3AED] shrink-0 mt-0.5" />
                                <span>{step.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Platform Fee details (Light blue border) */}
                      <div className="bg-white border-2 border-blue-100 rounded-[20px] p-5 shadow-2xs select-none">
                        <p className="text-[10px] text-blue-600 font-medium leading-relaxed">
                          Platform fee: 3% per contribution + Stripe's standard 2.9% + 30c processing fee. No monthly charge on the Free plan.
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Tab Selector Previews */}
                  <div className="bg-white border border-purple-100/60 rounded-[24px] p-6 shadow-2xs flex flex-col gap-6 mt-2">
                    <div className="border-b border-zinc-100 pb-4 text-center select-none">
                      <h3 className="font-extrabold text-zinc-900 text-sm leading-none">Page Previews</h3>
                      <p className="text-[10px] text-zinc-400 font-light mt-1.5 leading-none">Review all three views before publishing</p>
                    </div>

                    {/* Previews tabs bar */}
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
                            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                              isTabSel
                                ? "bg-[#7C3AED] text-white shadow-sm"
                                : "bg-white text-zinc-500 border border-purple-50 hover:bg-purple-50/50"
                            }`}
                          >
                            <TabIcon className="size-4" />
                            <div className="flex flex-col text-left leading-none select-none">
                              <span>{tb.label}</span>
                              <span className={`text-[8.5px] font-light mt-0.5 leading-none ${isTabSel ? "text-purple-100" : "text-zinc-400"}`}>{tb.desc}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Centered phone frame mockup based on preview tab selection */}
                    <div className="flex justify-center py-6 select-none relative">
                      
                      {/* Phone container */}
                      <div className="relative w-[300px] h-[580px] rounded-[40px] bg-zinc-950 border-[10px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col border-zinc-950">
                        
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-900 rounded-b-xl z-50 flex items-center justify-center">
                          <div className="w-9 h-[3px] bg-zinc-800 rounded-full" />
                        </div>

                        {/* Screen */}
                        <div className={`flex-grow bg-gradient-to-tr ${selectedGradient} flex flex-col text-white pt-8 px-4 pb-4 overflow-y-auto select-none no-scrollbar transition-all duration-500`}>
                          
                          {/* Top Status */}
                          <div className="flex justify-between items-center text-[10px] font-bold px-1 opacity-95 mb-6 mt-1.5 font-mono select-none">
                            <span>11:30</span>
                            <div className="flex items-center gap-1">
                              <span>•</span>
                              <span>5G</span>
                              <span>🔋</span>
                            </div>
                          </div>

                          {/* Preview Screen Contents conditional render */}
                          {previewTab === "public-page" ? (
                            /* Contributor Landing Page preview */
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
                            /* Contribution Preset amounts flow screen */
                            <div className="flex-grow flex flex-col justify-start text-center gap-4 py-4 animate-in fade-in duration-200">
                              <span className="text-[9px] tracking-widest font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full text-purple-100 w-max mx-auto">
                                Contribution flow
                              </span>
                              <div className="flex flex-col gap-0.5 text-center mt-3">
                                <span className="text-2xl font-extrabold text-yellow-300 font-mono tracking-tight">$00</span>
                                <span className="text-[9.5px] text-purple-100 opacity-90">Contribute to the wishpool.</span>
                              </div>

                              {/* Presets Chips list */}
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

                              {/* Message box */}
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
                            /* Confetti recipient experience reveal screen */
                            <div className="flex-grow flex flex-col justify-start text-center gap-5 py-4 animate-in fade-in duration-200">
                              <span className="text-[9px] tracking-widest font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full text-purple-100 w-max mx-auto">
                                Recipient Reveal Page
                              </span>
                              
                              <div className="size-16 rounded-full bg-white/10 border border-white/20 shadow-xl flex items-center justify-center text-3xl mx-auto mt-2 select-none animate-bounce duration-1000">
                                🎁
                              </div>

                              <div className="flex flex-col gap-0.5 text-center">
                                <h3 className="text-base font-extrabold tracking-tight leading-tight">{wTitle || "A Special Celebration"}</h3>
                                <p className="text-[10px] text-purple-200 font-light mt-0.5">Hope you have the most amazing birthday!</p>
                              </div>

                              {/* Three Stat Cards Layout */}
                              <div className="grid grid-cols-3 gap-2 select-none px-1.5">
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

              {/* FOOTER WIZARD NAVIGATION BUTTONS ROW */}
              <div className="flex justify-between items-center border-t border-zinc-100 pt-6 mt-6 select-none">
                <Button
                  type="button"
                  disabled={wizardStep === 1}
                  onClick={() => setWizardStep(prev => prev - 1)}
                  variant="outline"
                  className="border-purple-200 text-zinc-700 hover:bg-purple-50 rounded-lg h-[40px] px-5 text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5"
                >
                  <ArrowLeft className="size-4" /> Back
                </Button>

                {wizardStep < 4 ? (
                  <Button
                    type="button"
                    onClick={() => setWizardStep(prev => prev + 1)}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg h-[40px] px-5 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    Next <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handlePublishCelebration}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg h-[40px] px-5 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    Publish
                  </Button>
                )}
              </div>

            </div>

            {/* Right Column: Interactive Mobile Live Preview (Step 1-3 only) */}
            {wizardStep < 4 && (
              <div className="w-full xl:w-[350px] shrink-0 sticky top-[100px] flex flex-col items-center gap-4.5 select-none z-10 self-start">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#7C3AED]/75">Live Preview</span>
                
                {/* iPhone Container mock */}
                <div className="relative w-[300px] h-[580px] rounded-[40px] bg-zinc-950 border-[10px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col z-10 border-zinc-950">
                  
                  {/* Speaker notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-900 rounded-b-xl z-50 flex items-center justify-center">
                    <div className="w-9 h-[3px] bg-zinc-800 rounded-full" />
                  </div>

                  {/* Screen internal wrap */}
                  <div className={`flex-grow bg-gradient-to-tr ${selectedGradient} flex flex-col text-white pt-8 px-4 pb-4 overflow-y-auto select-none no-scrollbar transition-all duration-500`}>
                    
                    {/* Status header time block */}
                    <div className="flex justify-between items-center text-[10px] font-bold px-1 opacity-90 mb-6 mt-1.5 font-mono select-none">
                      <span>11:30</span>
                      <div className="flex items-center gap-1">
                        <span>•</span>
                        <span>5G</span>
                        <span>🔋</span>
                      </div>
                    </div>

                    {/* Preview Screen Contents render based on active settings */}
                    {wizardStep === 3 ? (
                      /* Display contribute form preset chips if configuring settings */
                      <div className="flex-grow flex flex-col justify-start text-center gap-4 py-4 animate-in fade-in duration-200">
                        <span className="text-[9px] tracking-widest font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full text-purple-100 w-max mx-auto">
                          Contribution flow
                        </span>
                        <div className="flex flex-col gap-0.5 text-center mt-3">
                          <span className="text-2xl font-extrabold text-yellow-300 font-mono tracking-tight">$00</span>
                          <span className="text-[9.5px] text-purple-100 opacity-90">Contribute to the wishpool.</span>
                        </div>

                        {/* Suggested chips presets in mockup */}
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

                        {/* message input */}
                        <div className="flex flex-col text-left gap-1 mt-3">
                          <label className="text-[9.5px] font-bold text-purple-100 px-1">Message (Optional)</label>
                          <div className="w-full h-20 bg-white/10 border border-white/20 rounded-xl p-2.5 text-[10.5px] text-purple-105 italic">
                            Leave a heartfelt message...
                          </div>
                        </div>

                        <div className="bg-yellow-400 text-zinc-955 text-xs font-extrabold h-[36px] rounded-full flex items-center justify-center shadow-lg mt-5 leading-none">
                          Pay $100 securely
                        </div>
                      </div>
                    ) : (
                      /* Default landing view for Steps 1 & 2 */
                      <div className="flex-grow flex flex-col justify-start text-center gap-4.5 py-4">
                        
                        <span className="text-[9px] tracking-widest font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full text-purple-100 w-max mx-auto">
                          Live wishpool preview
                        </span>

                        {/* Emoji header box */}
                        <div className="size-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center text-3xl mx-auto mt-2 animate-pulse">
                          {previewIcon}
                        </div>

                        {/* Title & recipient details info */}
                        <div className="flex flex-col gap-1 text-center">
                          <h3 className="text-lg font-extrabold tracking-tight leading-snug">
                            {wTitle || "A Special Celebration"}
                          </h3>
                          <p className="text-[11px] text-purple-105 opacity-90 leading-none">
                            for {resolvedRecipient}
                          </p>
                        </div>

                        {/* Story description paragraph */}
                        <p className="text-[10px] text-purple-200 bg-black/20 px-3 py-3 rounded-xl border border-white/5 max-w-[240px] leading-relaxed font-light mx-auto">
                          {wDescription || "Share the story behind this celebration..."}
                        </p>

                        {/* Target raised Goal fund progress card preview */}
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

                        {/* Mock contribution cards messages feed */}
                        <div className="flex flex-col gap-2 mt-2">
                          <div className="bg-white text-zinc-800 rounded-xl p-2.5 shadow-md flex gap-2 items-start text-left">
                            <div className="size-6.5 rounded-full bg-purple-100 text-purple-700 font-extrabold text-[10px] flex items-center justify-center shrink-0 font-sans">MC</div>
                            <div className="flex flex-col w-full text-left">
                              <div className="flex items-center justify-between font-sans">
                                <span className="font-extrabold text-[9px] text-zinc-900 leading-none">Marcus Chen</span>
                                <span className="font-extrabold text-[9px] text-purple-600 leading-none">$75</span>
                              </div>
                              <span className="text-[9.5px] text-zinc-505 font-light mt-1 italic leading-tight">"Happy birthday! 🎉"</span>
                            </div>
                          </div>
                        </div>

                        {/* Mock bottom cta */}
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

  // Filter calculation variables for Events
  const filteredNotifsAll = filteredNotifs;
  
  return (
    <div className="min-h-screen bg-[#FAF8FF] flex font-sans text-zinc-800 relative font-sans">
      
      {/* Toast Alert popup */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-[#0D0A1A] text-white px-5 py-3 rounded-full flex items-center gap-2.5 shadow-xl z-[999] animate-in fade-in slide-in-from-top duration-300 font-medium text-xs border border-purple-50/25 select-none font-sans">
          <Check className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Sidebar Panel (Desktop / Collapsed Mobile) */}
      <aside className="hidden lg:flex flex-col justify-between w-[260px] bg-white border-r border-purple-100/50 shrink-0 sticky top-0 h-screen p-6 select-none font-sans">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <img src="/images/logo.png" alt="WishPool Logo" className="w-auto h-[48px] object-contain ml-2" />
          </Link>

          {/* Nav Items */}
          <nav className="flex flex-col gap-1 font-sans">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setWizardStep(1); // reset wizard
                  }}
                  className={`flex items-center justify-between w-full h-[48px] px-4 rounded-full text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-[#7C3AED] text-white shadow-md shadow-purple-600/10 animate-in fade-in duration-200" 
                      : "text-zinc-650 hover:text-[#7C3AED] hover:bg-purple-50"
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
            <button className="p-2 text-zinc-450 hover:text-[#FF2056] hover:bg-rose-50 rounded-full transition-colors cursor-pointer">
              <LogOut className="size-4.5" />
            </button>
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/40 z-50 animate-in fade-in duration-200 select-none">
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
              <nav className="flex flex-col gap-1 font-sans">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        setActiveTab(link.id);
                        setIsMobileMenuOpen(false);
                        setWizardStep(1);
                      }}
                      className={`flex items-center justify-between w-full h-[48px] px-4 rounded-full text-sm font-medium transition-all ${
                        isActive 
                          ? "bg-[#7C3AED] text-white shadow-md shadow-purple-600/10" 
                          : "text-zinc-650 hover:text-[#7C3AED] hover:bg-purple-50"
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
                <div className="flex flex-col text-left font-sans">
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
        <header className="h-[80px] bg-white border-b border-purple-100/50 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-40 shrink-0 select-none">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-zinc-650 hover:text-[#7C3AED] hover:bg-purple-50 rounded-full transition-colors cursor-pointer"
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
            <button 
              onClick={() => setActiveTab("notifications")}
              className="p-2 text-zinc-400 hover:text-[#7C3AED] relative rounded-full hover:bg-purple-50 transition-colors cursor-pointer"
            >
              <Bell className="size-5.5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1.5 size-2 bg-[#FF2056] rounded-full animate-pulse" />
              )}
            </button>
            <img src={userProfile.avatar} alt="Profile" className="size-10 rounded-full object-cover border border-purple-100" />
          </div>
        </header>

        {/* VIEW CONDITIONAL RENDER: SETTINGS VIEW */}
        {activeTab === "settings" ? (
          <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full max-w-4xl text-left font-sans">
            
            {/* Settings Header */}
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight leading-tight select-none">Settings</h1>
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
                      <div className="md:col-span-3 flex flex-col text-left font-sans">
                        <label className="text-xs font-bold text-zinc-700">Bio</label>
                        <span className="text-[10px] text-zinc-400 font-light mt-0.5 leading-tight">Shown on your public celebrations</span>
                      </div>
                      <div className="md:col-span-9 w-full">
                        <textarea 
                          rows={3}
                          value={profileBio}
                          onChange={(e) => setProfileBio(e.target.value)}
                          placeholder="Tell us about yourself..."
                          className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg p-3 text-sm text-zinc-800 outline-none w-full transition-all resize-none"
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
                          className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-800 outline-none w-full transition-all"
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
                    <p className="text-xs text-zinc-400 font-light mt-1 font-sans">Choose which emails Celebr sends you.</p>
                  </div>

                  <div className="divide-y divide-zinc-100/80 font-sans">
                    
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
                <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 flex flex-col gap-4 shadow-2xs font-sans">
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
                <div className="bg-white border border-[#F4F1FB] rounded-[20px] shadow-2xs overflow-hidden text-left font-sans">
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
                            <span className="font-bold text-sm text-zinc-800 leading-tight">{bill.plan}</span>
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
                <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 flex flex-col gap-5 shadow-2xs font-sans">
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
                <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 flex flex-col gap-4 shadow-2xs font-sans">
                  <div className="border-b border-zinc-100 pb-3.5">
                    <h3 className="font-extrabold text-zinc-900 text-sm">Two-factor authentication</h3>
                    <p className="text-xs text-zinc-400 font-light mt-1">Add an extra layer of security to your account.</p>
                  </div>
                  <div className="flex items-center justify-between mt-2 font-sans">
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
                <div className="bg-white border border-[#F4F1FB] rounded-[20px] shadow-2xs overflow-hidden text-left font-sans">
                  <div className="px-6 py-4 border-b border-zinc-100">
                    <h3 className="font-extrabold text-zinc-900 text-sm">Active sessions</h3>
                  </div>
                  <div className="divide-y divide-zinc-100/80">
                    {sessions.map((sess) => {
                      const SessionIcon = sess.device.includes("MacBook") ? Laptop : Smartphone;
                      return (
                        <div key={sess.id} className="p-5 flex items-center justify-between hover:bg-zinc-50/10 transition-colors font-sans">
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
                <div className="bg-[#FFF5F6] border border-rose-100 rounded-[20px] p-6 flex flex-col gap-4 text-left select-none font-sans">
                  <div className="flex items-center gap-2 text-rose-650">
                    <Trash className="size-4.5" />
                    <h4 className="text-xs font-bold uppercase tracking-widest font-sans">Danger zone</h4>
                  </div>
                  <div className="flex flex-col gap-3 mt-1.5">
                    
                    <button 
                      onClick={() => triggerToast("Signing out of all other sessions...")}
                      className="bg-white border border-rose-100 hover:border-rose-300 rounded-xl p-4.5 flex items-center justify-between gap-4 cursor-pointer text-left transition-colors font-sans"
                    >
                      <div className="flex items-center gap-3">
                        <LogOut className="size-4.5 text-rose-505" />
                        <span className="text-xs font-bold text-rose-600">Sign out of all devices</span>
                      </div>
                      <ChevronRight className="size-4 text-rose-455" />
                    </button>

                    <button 
                      onClick={() => triggerToast("Account deletion prompt loaded...")}
                      className="bg-white border border-rose-100 hover:border-rose-300 rounded-xl p-4.5 flex items-center justify-between gap-4 cursor-pointer text-left transition-colors font-sans"
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
        ) : activeTab === "notifications" ? (
          <div className="flex-grow overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full font-sans">
            
            {/* Header row */}
            <div className="flex items-center justify-between text-left">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-zinc-955 tracking-tight leading-tight select-none">Notifications</h1>
                <span className="text-xs text-zinc-500 font-light select-none">Manage your account, notifications, and preferences</span>
              </div>
              <Button 
                onClick={handleMarkAllRead}
                variant="outline"
                className="border-purple-200 text-zinc-700 bg-white hover:bg-purple-50 rounded-full px-5 h-[40px] text-xs font-bold transition-all shadow-2xs flex items-center gap-2"
              >
                <Check className="size-4" /> Mark all read
              </Button>
            </div>

            {/* Filter categories list */}
            <div className="flex flex-wrap gap-2.5 select-none border-b border-purple-100/30 pb-4">
              {[
                { filterId: "all", label: "All", count: unreadNotifCount },
                { filterId: "reminder", label: "Reminders", count: countNotifReminder },
                { filterId: "contribution", label: "Contributions", count: countNotifContribution },
                { filterId: "goal", label: "Goals", count: countNotifGoal },
                { filterId: "reveal", label: "Reveals", count: countNotifReveal },
                { filterId: "system", label: "System", count: countNotifSystem },
              ].map((pill) => (
                <button
                  key={pill.filterId}
                  onClick={() => setNotifFilter(pill.filterId)}
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    notifFilter === pill.filterId
                      ? "bg-[#7C3AED] text-white shadow-sm"
                      : "bg-white text-zinc-505 border border-purple-50 hover:bg-purple-50/50"
                  }`}
                >
                  <span>{pill.label}</span>
                  {pill.filterId === "all" ? (
                    unreadNotifCount > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-extrabold bg-white/20 text-white">
                        {unreadNotifCount}
                      </span>
                    )
                  ) : (
                    pill.count > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                        notifFilter === pill.filterId ? "bg-white/20 text-white" : "bg-purple-50 text-zinc-500"
                      }`}>
                        {pill.count}
                      </span>
                    )
                  )}
                </button>
              ))}
            </div>

            {/* Notification Lists segments */}
            <div className="flex flex-col gap-6 text-left">
              
              {/* UNREAD SECTION */}
              {unreadNotifs.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-extrabold text-zinc-400 tracking-wider select-none uppercase">Unread</h4>
                  <div className="flex flex-col gap-3">
                    {unreadNotifs.map((n) => (
                      <div 
                        key={n.id}
                        onClick={() => handleToggleRead(n.id)}
                        className={`p-5 rounded-2xl cursor-pointer hover:opacity-95 transition-all flex items-start justify-between gap-4 ${n.bgClass}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`size-10 rounded-full flex items-center justify-center text-lg shrink-0 ${n.iconBg}`}>
                            {n.icon}
                          </div>
                          <div className="flex flex-col font-sans">
                            <span className="font-extrabold text-zinc-900 text-[14px] leading-tight">{n.title}</span>
                            <p className="text-[13px] text-zinc-650 font-light mt-1.5 leading-relaxed">{n.message}</p>
                            <span className="text-[10px] text-zinc-400 font-light mt-2">{n.time}</span>
                          </div>
                        </div>
                        <span className="size-2 rounded-full bg-[#7C3AED] shrink-0 mt-2.5 animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EARLIER SECTION */}
              <div className="flex flex-col gap-3 mt-2 font-sans">
                <h4 className="text-xs font-extrabold text-zinc-400 tracking-wider select-none uppercase">Earlier</h4>
                {earlierNotifs.length === 0 && unreadNotifs.length === 0 ? (
                  <div className="w-full py-20 bg-white border border-dashed border-purple-100 rounded-3xl flex flex-col items-center justify-center gap-3 text-center">
                    <Bell className="size-12 text-zinc-205" />
                    <span className="font-bold text-zinc-800 text-sm mt-2">All caught up!</span>
                    <p className="text-xs text-zinc-400 font-light max-w-xs leading-relaxed">
                      You have no notifications in this category.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {earlierNotifs.map((n) => (
                      <div 
                        key={n.id}
                        onClick={() => handleToggleRead(n.id)}
                        className="p-5 rounded-2xl bg-white border border-zinc-100 hover:border-purple-100/50 hover:bg-purple-50/10 transition-all flex items-start justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`size-10 rounded-full flex items-center justify-center text-lg shrink-0 ${n.iconBg}`}>
                            {n.icon}
                          </div>
                          <div className="flex flex-col font-sans">
                            <span className="font-bold text-zinc-850 text-[14px] leading-tight opacity-80">{n.title}</span>
                            <p className="text-[13px] text-zinc-500 font-light mt-1.5 leading-relaxed">{n.message}</p>
                            <span className="text-[10px] text-zinc-400 font-light mt-2">{n.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        ) : activeTab === "analytics" ? (
          <div className="flex-grow overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full font-sans">
            
            {/* Analytics Header */}
            <div className="text-left">
              <h1 className="text-3xl font-extrabold text-zinc-955 tracking-tight leading-tight select-none">Analytics</h1>
              <span className="text-xs text-zinc-500 font-light mt-1 select-none font-sans">Performance across all your celebrations</span>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none font-sans">
              
              {/* Card 1: Total raised */}
              <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 text-left flex items-center gap-5 shadow-2xs font-sans">
                <div className="size-12 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0">
                  <DollarSign className="size-5.5" />
                </div>
                <div className="flex flex-col font-sans">
                  <span className="text-[13px] font-semibold text-zinc-400">Total raised</span>
                  <span className="text-2xl font-extrabold text-zinc-955 mt-1 font-mono">$8,420</span>
                </div>
              </div>

              {/* Card 2: Avg per event */}
              <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 text-left flex items-center gap-5 shadow-2xs font-sans">
                <div className="size-12 rounded-full bg-emerald-50 text-[#009966] flex items-center justify-center shrink-0">
                  <TrendingUp className="size-5.5" />
                </div>
                <div className="flex flex-col font-sans">
                  <span className="text-[13px] font-semibold text-zinc-400">Avg per event</span>
                  <span className="text-2xl font-extrabold text-zinc-955 mt-1 font-mono">$703</span>
                </div>
              </div>

              {/* Card 3: Total contributors */}
              <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 text-left flex items-center gap-5 shadow-2xs font-sans">
                <div className="size-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Users className="size-5.5" />
                </div>
                <div className="flex flex-col font-sans">
                  <span className="text-[13px] font-semibold text-zinc-400">Total contributors</span>
                  <span className="text-2xl font-extrabold text-zinc-955 mt-1 font-sans">124</span>
                </div>
              </div>

              {/* Card 4: Events created */}
              <div className="bg-white border border-purple-50/70 rounded-[20px] p-6 text-left flex items-center gap-5 shadow-2xs font-sans">
                <div className="size-12 rounded-full bg-rose-50 text-[#FF2056] flex items-center justify-center shrink-0">
                  <Gift className="size-5.5" />
                </div>
                <div className="flex flex-col font-sans">
                  <span className="text-[13px] font-semibold text-zinc-400">Events created</span>
                  <span className="text-2xl font-extrabold text-zinc-955 mt-1 font-sans">6</span>
                </div>
              </div>

            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 font-sans">
              
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
              <div className="bg-white border border-purple-50/70 rounded-3xl p-6 shadow-2xs text-left font-sans">
                <h3 className="font-extrabold text-zinc-800 text-[15px] mb-6 font-sans">Monthly contributors</h3>
                <div className="h-[280px] w-full font-sans">
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
          <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full text-left font-sans">
            
            {/* Network Header Row */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight leading-tight select-none">Celebration Network</h1>
                <span className="text-xs text-purple-650 font-bold mt-1 select-none">{netCountAll} people · Track milestones and create celebrations</span>
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
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-2 cursor-pointer"
              >
                <UserPlus className="size-4.5" /> Add Person
              </Button>
            </div>

            {/* Network Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none font-sans">
              
              {/* Metric Card 1: Total People */}
              <div className="w-full h-[147.67px] bg-[#009966] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-emerald-600/10 transition-transform hover:scale-[1.02] duration-300">
                <div className="flex items-center justify-between font-sans">
                  <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90 font-sans">Total People</span>
                  <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Users className="size-4.5" />
                  </div>
                </div>
                <div className="flex flex-col gap-[9.84px] font-sans">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-sans">{netCountAll}</span>
                  <span className="text-[11px] font-medium opacity-80 font-sans">Contacts saved</span>
                </div>
              </div>

              {/* Metric Card 2: Milestones Tracked */}
              <div className="w-full h-[147.67px] bg-[#FF2056] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-rose-600/10 transition-transform hover:scale-[1.02] duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90 font-sans">Milestones Tracked</span>
                  <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
                    <CalendarRange className="size-4.5" />
                  </div>
                </div>
                <div className="flex flex-col gap-[9.84px] font-sans">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-mono">14</span>
                  <span className="text-[11px] font-medium opacity-80 font-sans">Dates active</span>
                </div>
              </div>

              {/* Metric Card 3: Coming Up (30d) */}
              <div className="w-full h-[147.67px] bg-[#7C3AED] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-purple-600/10 transition-transform hover:scale-[1.02] duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90 font-sans">Coming Up (30d)</span>
                  <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Clock className="size-4.5" />
                  </div>
                </div>
                <div className="flex flex-col gap-[9.84px] font-sans">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-mono">
                    {networkPeople.filter(p => p.daysLeft <= 30).length}
                  </span>
                  <span className="text-[11px] font-medium opacity-80 font-sans">Next 30 days</span>
                </div>
              </div>

              {/* Metric Card 4: Past Celebrations */}
              <div className="w-full h-[147.67px] bg-[#E17100] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-orange-600/10 transition-transform hover:scale-[1.02] duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90 font-sans">Past Celebrations</span>
                  <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Megaphone className="size-4.5" />
                  </div>
                </div>
                <div className="flex flex-col gap-[9.84px] font-sans">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-mono">3</span>
                  <span className="text-[11px] font-medium opacity-80 font-sans">Completed registry pools</span>
                </div>
              </div>

            </div>

            {/* Network Filters and Search bar row */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between w-full font-sans">
              
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
              <div className="relative shrink-0 font-sans" ref={sortDropdownRef}>
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="bg-white border border-purple-100/60 hover:border-[#7C3AED] rounded-full px-5 h-[50px] text-xs font-bold text-zinc-700 transition-colors flex items-center gap-2 justify-between min-w-[160px] shadow-2xs cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 font-sans">
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
            <div className="flex flex-wrap gap-2.5 select-none border-b border-purple-100/30 pb-4 font-sans">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start font-sans">
                {filteredNetwork.map((p) => {
                  
                  // Days left countdown color indicator
                  const isSoon = p.daysLeft <= 40;
                  const countdownBadgeStyles = isSoon 
                    ? "bg-amber-50 text-amber-600 border border-amber-100" 
                    : "bg-purple-50 text-[#7C3AED] border border-purple-100";

                  return (
                    <div
                      key={p.id}
                      className="bg-white border border-purple-50/70 rounded-[24px] p-6 text-left shadow-2xs hover:shadow-xs transition-all relative flex flex-col gap-4 select-none font-sans"
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
                                className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer"
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
                                className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <Edit2 className="size-4" /> Edit
                              </button>
                              <button 
                                onClick={() => {
                                  setWTitle(`${p.name}'s Celebration`);
                                  setWRecipient(p.name);
                                  setWType("Birthday");
                                  setWDescription(`${p.name}'s milestone is coming up. Help them celebrate!`);
                                  setActiveTab("create-celebration");
                                  setWizardStep(1);
                                  setActiveDropdownId(null);
                                }}
                                className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <Gift className="size-4" /> Create celebration
                              </button>
                              <div className="border-t border-zinc-100 my-1" />
                              <button 
                                onClick={() => { setModalEvent(p); setActiveModal("remove-person"); setActiveDropdownId(null); }}
                                className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
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
                      <div className="bg-[#FAF8FF] border border-purple-100/30 rounded-2xl p-3.5 flex items-center justify-between mt-1 text-left">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{p.milestoneType.includes("Wedding") ? "💍" : "🎂"}</span>
                          <div className="flex flex-col text-left font-sans">
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
        ) : activeTab === "events" ? (
          <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full text-left font-sans">
            
            {/* Events Header row */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h1 className="text-3xl font-extrabold text-zinc-955 tracking-tight leading-tight select-none">Events</h1>
                <span className="text-xs text-purple-650 font-bold mt-1 select-none">{countAll} total celebrations</span>
              </div>
              <Button 
                onClick={() => {
                  setWTitle("Sohan Birthday");
                  setWType("Birthday");
                  setWRecipient("Marcus Chen");
                  setWDate("2026-03-23");
                  setWDescription("Hope you have the most amazing birthday!");
                  setWTheme("Celestial");
                  setWInvitees(["mdsohanurrohman310@gmail.com"]);
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
            <div className="flex flex-wrap gap-2.5 select-none font-sans">
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
                      : "bg-purple-50 text-zinc-550"
                  }`}>
                    {pill.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Events Grid layout */}
            {filteredEvents.length === 0 ? (
              <div className="w-full py-24 bg-white border border-dashed border-purple-100 rounded-3xl flex flex-col items-center justify-center gap-3 text-center font-sans">
                <CalendarDays className="size-12 text-zinc-300" />
                <span className="font-bold text-zinc-800 text-base mt-2">No celebrations found</span>
                <p className="text-xs text-zinc-400 font-light max-w-xs leading-relaxed">
                  Try adjusting your search keywords or filter queries.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start font-sans">
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
                      className="bg-white border border-purple-50/70 rounded-[24px] p-6 text-left shadow-2xs hover:shadow-xs transition-all relative flex flex-col gap-5.5 select-none font-sans"
                    >
                      {/* Top Row: Meta details */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="size-14 rounded-2xl bg-zinc-50 border border-purple-100/50 flex items-center justify-center text-2xl shrink-0 select-none">
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
                                  className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Eye className="size-4" /> Preview page
                                </button>
                                <button 
                                  onClick={() => handleCopyLink(ev.title)}
                                  className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer"
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
                                  className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Edit2 className="size-4" /> Edit
                                </button>
                                <button 
                                  onClick={() => { setModalEvent(ev); setActiveModal("archive"); setActiveDropdownId(null); }}
                                  className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-zinc-700 hover:bg-purple-50 hover:text-[#7C3AED] flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Archive className="size-4" /> Archive
                                </button>
                                <div className="border-t border-zinc-100 my-1" />
                                <button 
                                  onClick={() => { setModalEvent(ev); setActiveModal("delete"); setActiveDropdownId(null); }}
                                  className="w-full h-[36px] px-3.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
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
                      <div className="flex items-center gap-4 text-xs font-medium text-zinc-505 mt-1.5 select-none font-sans">
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
          <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 w-full font-sans">
            
            {/* Greeting Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left border-b border-purple-100/50 pb-6">
              <div className="flex flex-col gap-1 font-sans">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight select-none">
                  Good morning, <span className="italic font-serif text-[#7C3AED]">Jamie</span>
                </h1>
                <p className="text-sm text-zinc-505 font-light">
                  You have <span className="font-bold text-[#7C3AED]">2</span> active WishPools and <span className="font-bold text-[#FF2056]">{unreadNotifCount}</span> unread notifications.
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => setActiveModal("add-person")}
                  variant="outline" 
                  className="border-purple-200 text-zinc-700 bg-white hover:bg-purple-50 rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
                >
                  <UserPlus className="size-4" /> Add Person
                </Button>
                <Button 
                  onClick={() => {
                    setWTitle("Sohan Birthday");
                    setWType("Birthday");
                    setWRecipient("Marcus Chen");
                    setWDate("2026-03-23");
                    setWDescription("Hope you have the most amazing birthday!");
                    setWTheme("Celestial");
                    setWInvitees(["mdsohanurrohman310@gmail.com"]);
                    setActiveTab("create-celebration");
                    setWizardStep(1);
                  }}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-5 h-[44px] text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-2 cursor-pointer"
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
                <div className="flex flex-col text-left font-sans">
                  <span className="font-bold text-[#7C3AED] text-sm">Emma's birthday in 23 days</span>
                  <span className="text-[13px] text-zinc-550 font-light mt-0.5 leading-relaxed">
                    Emma's 30th Birthday is coming up. Your WishPool is at 84% — share the link to hit your goal!
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab("events")}
                className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] shrink-0 border border-purple-200 bg-white hover:bg-purple-50 px-4 py-2 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
              >
                View <ChevronRight className="size-3.5" />
              </button>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none font-sans">
              <div className="w-full h-[147.67px] bg-[#7C3AED] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-purple-600/10 transition-transform hover:scale-[1.02] duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90 font-sans">Total Raised</span>
                  <div className="size-9 rounded-full bg-white/20 flex items-center justify-center"><DollarSign className="size-4.5" /></div>
                </div>
                <div className="flex flex-col text-left gap-[9.84px]">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-mono">$5,020</span>
                  <span className="text-[11px] font-medium opacity-80 font-sans">All time</span>
                </div>
              </div>

              <div className="w-full h-[147.67px] bg-[#FF2056] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-rose-600/10 transition-transform hover:scale-[1.02] duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90 font-sans">Active Wishpools</span>
                  <div className="size-9 rounded-full bg-white/20 flex items-center justify-center"><Gift className="size-4.5" /></div>
                </div>
                <div className="flex flex-col text-left gap-[9.84px]">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-mono">{countLive}</span>
                  <span className="text-[11px] font-medium opacity-80 font-sans">In progress</span>
                </div>
              </div>

              <div className="w-full h-[147.67px] bg-[#009966] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-emerald-600/10 transition-transform hover:scale-[1.02] duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90 font-sans">Contributors</span>
                  <div className="size-9 rounded-full bg-white/20 flex items-center justify-center"><Users className="size-4.5" /></div>
                </div>
                <div className="flex flex-col text-left gap-[9.84px]">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-sans">104</span>
                  <span className="text-[11px] font-medium opacity-80 font-sans">Total across all</span>
                </div>
              </div>

              <div className="w-full h-[147.67px] bg-[#E17100] text-white rounded-[16px] pt-[22.64px] pr-[21.66px] pb-[22.64px] pl-[21.66px] flex flex-col justify-between shadow-lg shadow-orange-600/10 transition-transform hover:scale-[1.02] duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[15.75px] font-medium leading-[19.69px] tracking-[0.3px] uppercase opacity-90 font-sans">Networks</span>
                  <div className="size-9 rounded-full bg-white/20 flex items-center justify-center"><Megaphone className="size-4.5" /></div>
                </div>
                <div className="flex flex-col text-left gap-[9.84px]">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-none font-mono">6</span>
                  <span className="text-[11px] font-medium opacity-80 font-sans">Important people</span>
                </div>
              </div>
            </div>

            {/* Panels Bottom Row */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start font-sans">
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
                      <div className="flex items-center gap-3 font-sans">
                        <div className="size-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">🎓</div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-zinc-905">Alex's Graduation</span>
                          <span className="text-[11px] text-zinc-400 font-light mt-0.5">12 contributors • $500 raised</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => setActiveTab("events")}
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs h-[32px] px-4 rounded-full transition-colors cursor-pointer"
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
                    <button onClick={() => { setActiveTab("events"); setSelectedFilter("live"); }} className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center cursor-pointer">
                      All events <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                  <div className="p-6 flex flex-col gap-6">
                    {events.filter(e => e.status === "live").map((ev) => (
                      <div key={ev.id} className="flex flex-col gap-3 font-sans">
                        <div className="flex items-center justify-between font-sans">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-[#FAF8FF] border border-purple-100/50 flex items-center justify-center font-bold text-base shrink-0">{ev.icon}</div>
                            <div className="flex flex-col text-left">
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
                    <button onClick={() => setActiveTab("events")} className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center cursor-pointer">
                      View all <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                  <div className="divide-y divide-zinc-100/80 font-sans">
                    {[
                      { text: "Happy birthday! 🎉 Wishing you all the joy!", value: "$75", date: "2025-06-12" },
                      { text: "You deserve the world, Emma!", value: "$50", date: "2025-06-11" },
                      { text: "Thirty looks incredible on you 💜", value: "$100", date: "2025-06-10" },
                      { text: "Can't wait to celebrate!", value: "$25", date: "2025-06-09" },
                      { text: "Congrats on 30 fabulous years! 🥂", value: "$50", date: "2025-06-08" },
                    ].map((item, idx) => (
                      <div key={idx} className="p-5 flex items-center justify-between hover:bg-zinc-50/30 transition-colors">
                        <div className="flex flex-col text-left gap-1 font-sans">
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
              <div className="xl:col-span-5 flex flex-col gap-8 w-full text-left font-sans">
                
                {/* Promo Card */}
                <div className="bg-[#7C3AED] text-white rounded-3xl p-8 shadow-lg shadow-purple-600/10 flex flex-col gap-5 relative overflow-hidden select-none font-sans">
                  <div className="absolute -top-24 -left-24 size-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold tracking-widest text-purple-200 uppercase">Why WishPool?</span>
                    <h3 className="text-2xl font-extrabold leading-tight">This is more than a page.<br />It's your celebration home.</h3>
                  </div>
                  <div className="flex flex-col gap-5.5 mt-2">
                    <div className="flex items-start gap-4">
                      <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Bell className="size-4 text-purple-100" /></div>
                      <div className="flex flex-col font-sans"><span className="font-bold text-[14px]">Never miss a birthday</span><span className="text-[11.5px] text-purple-100 font-light mt-0.5 leading-relaxed">Reminders sent weeks in advance — automatically.</span></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Users className="size-4 text-purple-100" /></div>
                      <div className="flex flex-col font-sans"><span className="font-bold text-[14px]">Build your Celebration Network</span><span className="text-[11.5px] text-purple-100 font-light mt-0.5 leading-relaxed">Save family & friends. Every date in one place.</span></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Gift className="size-4 text-purple-100" /></div>
                      <div className="flex flex-col font-sans"><span className="font-bold text-[14px]">Create unlimited WishPools</span><span className="text-[11.5px] text-purple-100 font-light mt-0.5 leading-relaxed">Celebrate everyone who matters, year after year.</span></div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Events Box */}
                <div className="bg-white rounded-3xl border border-purple-100/50 shadow-xs overflow-hidden">
                  <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100/30 flex items-center justify-between">
                    <span className="font-bold text-sm text-[#7C3AED]">Upcoming Events</span>
                    <button onClick={() => setActiveTab("events")} className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center cursor-pointer">
                      All events <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                  <div className="p-6 flex flex-col gap-4 font-sans">
                    {events.slice(0, 3).map((ev) => (
                      <div key={ev.id} className="flex items-center justify-between bg-[#FAF8FF] border border-purple-100/20 rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-white flex items-center justify-center text-sm border border-purple-100/50 shrink-0">{ev.icon}</div>
                          <div className="flex flex-col text-left">
                            <span className="font-bold text-sm text-zinc-900 leading-tight">{ev.title}</span>
                            <span className="text-[10px] text-zinc-400 font-light mt-0.5">{ev.recipient}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 select-none">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                            ev.status === "live" ? "bg-rose-50 text-[#FF2056] border-rose-100" : "bg-zinc-105 text-zinc-505 border-zinc-200"
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

      {/* 3. MODAL: EDIT CELEBRATION */}
      {activeModal === "edit" && modalEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100 font-sans">
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

              <div className="grid grid-cols-2 gap-4 font-sans">
                <div className="flex flex-col font-sans">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Recipient Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formRecipient}
                    onChange={(e) => setFormRecipient(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] rounded-lg h-[44px] px-3.5 text-sm text-zinc-850 outline-none w-full transition-all"
                  />
                </div>
                <div className="flex flex-col font-sans">
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

              <div className="grid grid-cols-2 gap-4 font-sans">
                <div className="flex flex-col font-sans">
                  <label className="text-xs font-bold text-zinc-700 mb-1.5">Target Date</label>
                  <input 
                    type="text" 
                    required 
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="bg-[#FAF8FF] border border-purple-100 focus:border-[#7C3AED] text-sm text-zinc-850 outline-none w-full transition-all rounded-lg h-[44px] px-3"
                  />
                </div>
                <div className="flex flex-col font-sans">
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

              <div className="flex flex-col font-sans">
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
          <div className="bg-[#FAF8FF] rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100 max-h-[85vh] overflow-y-auto font-sans">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-405 hover:text-zinc-850 rounded-full"
            >
              <X className="size-5.5" />
            </button>

            {/* Mock Landing Banner Preview */}
            <div className="w-full bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden mb-6 flex flex-col gap-4.5">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full w-max select-none font-sans">Live wishpool preview</span>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{modalEvent.icon}</span>
                <div className="flex flex-col font-sans">
                  <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">{modalEvent.title}</h2>
                  <span className="text-xs text-purple-200 font-light mt-0.5">Celebrating {modalEvent.recipient} ({modalEvent.relation})</span>
                </div>
              </div>
              <p className="text-xs text-purple-100 font-light max-w-md leading-relaxed mt-1 font-sans">
                "Welcome to {modalEvent.recipient}'s WishPool! Let's fill this pool with love, messages, and help them hit their milestones."
              </p>
            </div>

            {/* Mock Contribution panel */}
            <div className="bg-white border border-purple-100/50 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex justify-between items-start font-sans">
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Amount Raised</span>
                  <span className="text-3xl font-extrabold text-zinc-900 leading-none">${modalEvent.raised ? modalEvent.raised.toLocaleString() : "0"}</span>
                  <span className="text-[11px] text-zinc-400 font-light mt-1">Goal of ${modalEvent.target ? modalEvent.target.toLocaleString() : "1,000"}</span>
                </div>
                <div className="bg-purple-50 text-[#7C3AED] px-4 py-2.5 rounded-2xl text-center flex flex-col shrink-0 border border-purple-100 font-sans">
                  <span className="text-base font-extrabold">{modalEvent.progress || 0}%</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider opacity-75">Reached</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-purple-50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${Math.min(modalEvent.progress || 0, 100)}%` }} />
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3 mt-1.5 font-sans">
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
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center animate-in zoom-in-95 duration-250 border border-purple-100 font-sans">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-805 rounded-full"
            >
              <X className="size-5" />
            </button>

            <div className="size-12 rounded-full bg-rose-50 border border-rose-100 text-[#FF2056] flex items-center justify-center mx-auto mb-4 mt-2">
              <Trash2 className="size-5 animate-bounce" />
            </div>

            <h3 className="text-lg font-extrabold text-zinc-950 mb-2 font-sans">Delete Celebration?</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6 font-sans">
              Are you sure you want to delete <span className="font-bold text-zinc-700">"{modalEvent.title}"</span>? This will permanently close the WishPool and cannot be undone.
            </p>

            <div className="flex gap-3 font-sans w-full">
              <Button 
                onClick={() => setActiveModal(null)}
                variant="outline" 
                className="flex-1 shrink border-purple-100 text-zinc-550 hover:bg-zinc-50 h-[42px] text-xs font-bold rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDeleteConfirm}
                className="flex-1 shrink bg-[#FF2056] hover:bg-rose-600 text-white h-[42px] text-xs font-bold rounded-lg shadow-sm"
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
                className="flex-1 shrink border-purple-105 text-zinc-505 hover:bg-zinc-50 h-[42px] text-xs font-bold rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleArchiveConfirm}
                className="flex-1 shrink bg-[#7C3AED] hover:bg-[#6D28D9] text-white h-[42px] text-xs font-bold rounded-lg shadow-sm"
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
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-3.5 border-b border-zinc-100 pb-4 mb-5 font-sans">
              <div className="size-10 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center">
                <UserPlus className="size-5" />
              </div>
              <h2 className="text-xl font-extrabold text-zinc-900 font-sans">
                {activeModal === "edit-person" ? "Edit Contact" : "Add to Network"}
              </h2>
            </div>
            
            <form onSubmit={handleAddPerson} className="flex flex-col gap-4 font-sans">
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
                <div className="flex flex-col font-sans">
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
          <div className="bg-[#FAF8FF] rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left animate-in zoom-in-95 duration-250 border border-purple-100 font-sans">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full animate-in"
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
              {/* Milestone Details */}
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

              {/* History Event logs */}
              <div className="flex flex-col gap-2 mt-1">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Past pool activity</h4>
                {modalEvent.pastCelebration ? (
                  <div className="bg-white border border-zinc-100 rounded-2xl p-4 flex items-center justify-between font-sans">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{modalEvent.pastCelebration.icon}</span>
                      <span className="font-bold text-sm text-zinc-800 font-sans">Celebration Pool Registry</span>
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
                    setWTitle(`${modalEvent.name}'s Celebration`);
                    setWRecipient(modalEvent.name);
                    setWType("Birthday");
                    setWDescription(`${modalEvent.name}'s milestone is coming up. Help them celebrate!`);
                    setActiveTab("create-celebration");
                    setWizardStep(1);
                    setActiveModal(null);
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
                  className="w-full border-purple-100 text-zinc-655 bg-white hover:bg-purple-50 font-bold h-[42px] rounded-xl text-xs transition-all"
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
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full"
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
                className="flex-1 shrink border-purple-100 text-zinc-500 hover:bg-zinc-50 h-[42px] text-xs font-bold rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRemovePersonConfirm}
                className="flex-1 shrink bg-[#FF2056] hover:bg-rose-600 text-white h-[42px] text-xs font-bold rounded-lg shadow-sm"
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
