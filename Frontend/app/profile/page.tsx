"use client";

import { useEffect, useState } from "react";
import {
  getMyProfile,
  getMyComplaintSummary,
  getMyRecentComplaints,
} from "@/lib/api";

import ProfileCard from "@/components/civic/ProfileCard";
import ComplaintStats from "@/components/civic/ComplaintStats";
import RecentComplaints from "@/components/RecentComplaints";
import ProfileActions from "@/components/ProfileActions";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    getMyProfile().then(res => setUser(res.data));
    getMyComplaintSummary().then(res => setStats(res.data));
    getMyRecentComplaints().then(res => setComplaints(res.data));
  }, []);

  if (!user || !stats) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <ProfileCard user={user} />

      <ComplaintStats stats={stats} />

      <RecentComplaints complaints={complaints} />

      <ProfileActions />
    </div>
  );
}
