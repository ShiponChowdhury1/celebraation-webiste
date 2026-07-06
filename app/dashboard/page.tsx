"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Calendar, Users, BarChart3, Bell, Settings, 
  LogOut, Plus, Search, Menu, X, Check, UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Import modular dashboard sub-components
import DashboardOverview from "@/components/dashboard/dashboard-overview";
import EventsView from "@/components/dashboard/events-view";
import NetworkView from "@/components/dashboard/network-view";
import AnalyticsView from "@/components/dashboard/analytics-view";
import NotificationsView from "@/components/dashboard/notifications-view";
import SettingsView from "@/components/dashboard/settings-view";
import CreateCelebrationWizard from "@/components/dashboard/create-celebration-wizard";
import ModalsContainer from "@/components/dashboard/modals-container";

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
    const chosenRecipient = wRecipient === "Someone else" ? (wRecipientCustom || "Someone Special") : wRecipient;
    const matchedContact = networkPeople.find(p => p.name === chosenRecipient);
    const relation = matchedContact ? matchedContact.relation : "Friend";
    
    let dateStr = "Dec 25, 2026";
    if (wDate) {
      const parts = wDate.split("-");
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      if (parts.length === 3) {
        const mIdx = parseInt(parts[1]) - 1;
        dateStr = `${monthNames[mIdx]} ${parseInt(parts[2])}, ${parts[0]}`;
      }
    }

    let chosenIcon = "🎂";
    if (wType === "Wedding") chosenIcon = "💍";
    if (wType === "Anniversary") chosenIcon = "🥂";
    if (wType === "Graduation") chosenIcon = "🎓";
    if (wType === "Baby Shower") chosenIcon = "👶";
    if (wType === "Retirement") chosenIcon = "🌅";
    if (wType === "Promotion") chosenIcon = "🏆";
    if (wType === "Work Anniversary") chosenIcon = "🏢";
    if (wType === "Custom") chosenIcon = "✨";

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

    setEvents(prev => [newCelebration, ...prev]);
    setIsPublishModalOpen(true);

    import("canvas-confetti").then((module) => {
      const confettiFn = module.default;
      confettiFn({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    });
  };

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

  const handleSelectRecipient = (name: string) => {
    setWRecipient(name);
    setIsRecipientDropdownOpen(false);

    const matched = networkPeople.find(p => p.name === name);
    if (matched) {
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

  // Filter calculation variables for Sidebar badges
  const countAll = events.length;
  const netCountAll = networkPeople.length;
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: Calendar, badge: countAll },
    { id: "network", label: "Network", icon: Users, badge: netCountAll },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell, badge: unreadNotifCount },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // ----------------------------------------------------
  // CONDITIONAL RENDERING OF CREATE CELEBRATION WIZARD
  // ----------------------------------------------------
  if (activeTab === "create-celebration") {
    return (
      <CreateCelebrationWizard
        wizardStep={wizardStep}
        setWizardStep={setWizardStep}
        wTitle={wTitle}
        setWTitle={setWTitle}
        wType={wType}
        setWType={setWType}
        wRecipient={wRecipient}
        setWRecipient={setWRecipient}
        wRecipientCustom={wRecipientCustom}
        setWRecipientCustom={setWRecipientCustom}
        isRecipientDropdownOpen={isRecipientDropdownOpen}
        setIsRecipientDropdownOpen={setIsRecipientDropdownOpen}
        wDate={wDate}
        setWDate={setWDate}
        wDescription={wDescription}
        setWDescription={setWDescription}
        wTheme={wTheme}
        setWTheme={setWTheme}
        wInviteEmail={wInviteEmail}
        setWInviteEmail={setWInviteEmail}
        wInvitees={wInvitees}
        setWInvitees={setWInvitees}
        wPrivacy={wPrivacy}
        setWPrivacy={setWPrivacy}
        wHeadline={wHeadline}
        setWHeadline={setWHeadline}
        wWelcomeMsg={wWelcomeMsg}
        setWWelcomeMsg={setWWelcomeMsg}
        wEnableWishPool={wEnableWishPool}
        setWEnableWishPool={setWEnableWishPool}
        wGoalFund={wGoalFund}
        setWGoalFund={setWGoalFund}
        wDeadlineDate={wDeadlineDate}
        setWDeadlineDate={setWDeadlineDate}
        wDeadlineTime={wDeadlineTime}
        setWDeadlineTime={setWDeadlineTime}
        wSuggestedAmounts={wSuggestedAmounts}
        setWSuggestedAmounts={setWSuggestedAmounts}
        wCustomAmountVal={wCustomAmountVal}
        setWCustomAmountVal={setWCustomAmountVal}
        wMinContribution={wMinContribution}
        setWMinContribution={setWMinContribution}
        wAllowCustomAmount={wAllowCustomAmount}
        setWAllowCustomAmount={setWAllowCustomAmount}
        wStripeConnected={wStripeConnected}
        setWStripeConnected={setWStripeConnected}
        isPublishModalOpen={isPublishModalOpen}
        setIsPublishModalOpen={setIsPublishModalOpen}
        previewTab={previewTab}
        setPreviewTab={setPreviewTab}
        handlePublishCelebration={handlePublishCelebration}
        handleSelectRecipient={handleSelectRecipient}
        handleAddInvitee={handleAddInvitee}
        handleRemoveInvitee={handleRemoveInvitee}
        handleToggleAmountChip={handleToggleAmountChip}
        handleAddCustomPreset={handleAddCustomPreset}
        setActiveTab={setActiveTab}
        networkPeople={networkPeople}
        themeGradients={themeGradients}
        toastMessage={toastMessage}
        triggerToast={triggerToast}
        recipientDropdownRef={recipientDropdownRef}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8FF] flex font-sans text-zinc-800 relative">
      
      {/* Toast Alert popup */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-[#0D0A1A] text-white px-5 py-3 rounded-full flex items-center gap-2.5 shadow-xl z-[999] animate-in fade-in slide-in-from-top duration-300 font-medium text-xs border border-purple-50/25 select-none">
          <Check className="size-4 text-emerald-450" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Sidebar Panel (Desktop) */}
      <aside className="hidden lg:flex flex-col justify-between w-[260px] bg-white border-r border-purple-100/50 shrink-0 sticky top-0 h-screen p-6 select-none">
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
                  onClick={() => {
                    setActiveTab(link.id);
                    setWizardStep(1); // reset wizard
                  }}
                  className={`flex items-center justify-between w-full h-[48px] px-4 rounded-full text-sm font-medium transition-all cursor-pointer ${
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
          <div className="flex items-center gap-3 text-left">
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
              className="absolute right-4 top-4 p-2 text-zinc-405 hover:text-zinc-900 rounded-full cursor-pointer"
            >
              <X className="size-6" />
            </button>

            <div className="flex flex-col gap-8 mt-4">
              <Link href="/">
                <img src="/images/logo.png" alt="WishPool Logo" className="w-auto h-[44px] object-contain ml-2" />
              </Link>

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
                        setWizardStep(1);
                      }}
                      className={`flex items-center justify-between w-full h-[48px] px-4 rounded-full text-sm font-medium transition-all cursor-pointer ${
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

            <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
              <div className="flex items-center gap-3 text-left">
                <img src={userProfile.avatar} alt={userProfile.name} className="size-10 rounded-full object-cover border border-purple-100" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-zinc-900 leading-tight">{userProfile.name}</span>
                  <span className="text-[11px] text-zinc-400 font-light">{userProfile.email}</span>
                </div>
              </div>
              <Link href="/login">
                <button className="p-2 text-zinc-400 hover:text-[#FF2056] hover:bg-rose-50 rounded-full transition-colors cursor-pointer">
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

        {/* Dynamic subtabs render content based on activeTab */}
        {activeTab === "dashboard" && (
          <DashboardOverview
            userProfile={userProfile}
            unreadNotifCount={unreadNotifCount}
            netCountAll={netCountAll}
            activeEventsCount={countAll}
            events={events}
            setActiveTab={setActiveTab}
            setWizardStep={setWizardStep}
            setActiveModal={setActiveModal}
            setWTitle={setWTitle}
            setWType={setWType}
            setWRecipient={setWRecipient}
            setWDate={setWDate}
            setWDescription={setWDescription}
            setWTheme={setWTheme}
            setWInvitees={setWInvitees}
          />
        )}

        {activeTab === "events" && (
          <EventsView
            events={events}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setActiveModal={setActiveModal}
            setModalEvent={setModalEvent}
            setFormTitle={setFormTitle}
            setFormRecipient={setFormRecipient}
            setFormRelation={setFormRelation}
            setFormStatus={setFormStatus}
            setFormDate={setFormDate}
            setFormTarget={setFormTarget}
            activeDropdownId={activeDropdownId}
            setActiveDropdownId={setActiveDropdownId}
            handleCopyLink={handleCopyLink}
            setActiveTab={setActiveTab}
            setWizardStep={setWizardStep}
            dropdownRef={dropdownRef}
          />
        )}

        {activeTab === "network" && (
          <NetworkView
            networkPeople={networkPeople}
            networkSearchQuery={networkSearchQuery}
            setNetworkSearchQuery={setNetworkSearchQuery}
            networkFilter={networkFilter}
            setNetworkFilter={setNetworkFilter}
            networkSort={networkSort}
            setNetworkSort={setNetworkSort}
            setActiveModal={setActiveModal}
            setModalEvent={setModalEvent}
            activeDropdownId={activeDropdownId}
            setActiveDropdownId={setActiveDropdownId}
            isSortDropdownOpen={isSortDropdownOpen}
            setIsSortDropdownOpen={setIsSortDropdownOpen}
            setWTitle={setWTitle}
            setWRecipient={setWRecipient}
            setWType={setWType}
            setWDescription={setWDescription}
            setActiveTab={setActiveTab}
            setWizardStep={setWizardStep}
            setPersonName={setPersonName}
            setPersonRole={setPersonRole}
            setPersonGroup={setPersonGroup}
            setPersonBirthday={setPersonBirthday}
            setPersonTags={setPersonTags}
            dropdownRef={dropdownRef}
            sortDropdownRef={sortDropdownRef}
          />
        )}

        {activeTab === "analytics" && (
          <AnalyticsView
            events={events}
            networkPeople={networkPeople}
            mounted={mounted}
          />
        )}

        {activeTab === "notifications" && (
          <NotificationsView
            notifications={notifications}
            setNotifications={setNotifications}
            notifFilter={notifFilter}
            setNotifFilter={setNotifFilter}
            handleMarkAllRead={handleMarkAllRead}
            handleToggleRead={handleToggleRead}
            unreadNotifCount={unreadNotifCount}
          />
        )}

        {activeTab === "settings" && (
          <SettingsView
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            profileName={profileName}
            setProfileName={setProfileName}
            profileEmail={profileEmail}
            setProfileEmail={setProfileEmail}
            profilePhone={profilePhone}
            setProfilePhone={setProfilePhone}
            profileBio={profileBio}
            setProfileBio={setProfileBio}
            profileWebsite={profileWebsite}
            setProfileWebsite={setProfileWebsite}
            profileAvatar={profileAvatar}
            setProfileAvatar={setProfileAvatar}
            notifNewContrib={notifNewContrib}
            setNotifNewContrib={setNotifNewContrib}
            notifGoalReached={notifGoalReached}
            setNotifGoalReached={setNotifGoalReached}
            notifUpcomingReminder={notifUpcomingReminder}
            setNotifUpcomingReminder={setNotifUpcomingReminder}
            notifContribMsgs={notifContribMsgs}
            setNotifContribMsgs={setNotifContribMsgs}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            is2FAEnabled={is2FAEnabled}
            setIs2FAEnabled={setIs2FAEnabled}
            sessions={sessions}
            handleRevokeSession={handleRevokeSession}
            handleSaveProfile={handleSaveProfile}
            handleUpdatePassword={handleUpdatePassword}
            triggerToast={triggerToast}
          />
        )}

      </main>

      {/* Dynamic modals block */}
      <ModalsContainer
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        modalEvent={modalEvent}
        formTitle={formTitle}
        setFormTitle={setFormTitle}
        formRecipient={formRecipient}
        setFormRecipient={setFormRecipient}
        formRelation={formRelation}
        setFormRelation={setFormRelation}
        formStatus={formStatus}
        setFormStatus={setFormStatus}
        formDate={formDate}
        setFormDate={setFormDate}
        formTarget={formTarget}
        setFormTarget={setFormTarget}
        handleEditSubmit={handleEditSubmit}
        handleDeleteConfirm={handleDeleteConfirm}
        handleArchiveConfirm={handleArchiveConfirm}
        personName={personName}
        setPersonName={setPersonName}
        personRole={personRole}
        setPersonRole={setPersonRole}
        personGroup={personGroup}
        setPersonGroup={setPersonGroup}
        personBirthday={personBirthday}
        setPersonBirthday={setPersonBirthday}
        personTags={personTags}
        setPersonTags={setPersonTags}
        handleAddPerson={handleAddPerson}
        handleRemovePersonConfirm={handleRemovePersonConfirm}
        handleCopyLink={handleCopyLink}
        setWTitle={setWTitle}
        setWRecipient={setWRecipient}
        setWType={setWType}
        setWDescription={setWDescription}
        setActiveTab={setActiveTab}
        setWizardStep={setWizardStep}
      />

    </div>
  );
}
