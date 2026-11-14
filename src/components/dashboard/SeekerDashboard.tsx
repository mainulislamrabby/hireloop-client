import Link from "next/link";
import {
  Bookmark,
  Send,
  CalendarDays,
  Trophy,
  RefreshCw,
  Megaphone,
  Mail,
  Plus,
  Search,
  Bell,
  MessageSquare,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const dashboardStats = [
  {
    title: "Saved Jobs",
    value: 12,
    icon: Bookmark,
    color: "text-white",
  },
  {
    title: "Applications Submitted",
    value: 24,
    icon: Send,
    color: "text-white",
  },
  {
    title: "Interviews Scheduled",
    value: 3,
    icon: CalendarDays,
    color: "text-amber-500",
  },
  {
    title: "Offers Received",
    value: 1,
    icon: Trophy,
    color: "text-emerald-500",
  },
];

const activities = [
  {
    id: 1,
    type: "application",
    message: (
      <>
        Application for Senior Product Designer at TechFlow updated to{" "}
        <span className="font-semibold text-amber-400">Under Review</span>
      </>
    ),
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "alert",
    message: (
      <>
        New Job Alert: Lead Frontend Engineer at FinGrid matches your profile.
      </>
    ),
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "message",
    message: (
      <>
        You have a new message from Sarah Jenkins (Hiring Manager at CloudOps).
      </>
    ),
    time: "1 day ago",
  },
  {
    id: 4,
    type: "application",
    message: (
      <>
        Application for Senior Product Designer at TechFlow updated to{" "}
        <span className="font-semibold text-amber-400">Under Review</span>
      </>
    ),
    time: "2 hours ago",
  },
  {
    id: 5,
    type: "alert",
    message: (
      <>
        New Job Alert: Lead Frontend Engineer at FinGrid matches your profile.
      </>
    ),
    time: "5 hours ago",
  },
  {
    id: 6,
    type: "message",
    message: (
      <>
        You have a new message from Sarah Jenkins (Hiring Manager at CloudOps).
      </>
    ),
    time: "1 day ago",
  },
];

const ActivityIcon = ({ type }: { type: string }) => {
  const iconClass =
    "flex size-9 shrink-0 items-center justify-center rounded-full bg-white/5";

  if (type === "application") {
    return (
      <div className={iconClass}>
        <RefreshCw className="size-4 text-white/80" />
      </div>
    );
  }

  if (type === "alert") {
    return (
      <div className={iconClass}>
        <Megaphone className="size-4 text-emerald-500" />
      </div>
    );
  }

  return (
    <div className={iconClass}>
      <Mail className="size-4 text-white/80" />
    </div>
  );
};

const DashboardTopbar = () => {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
        <Input
          placeholder="Search for opportunities..."
          className="h-10 border-white/10 bg-[#111113] pl-10 text-sm text-white placeholder:text-white/40"
        />
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <button
          type="button"
          aria-label="Messages"
          className="relative text-white/70 transition-colors hover:text-white"
        >
          <MessageSquare className="size-5" />
          <span className="absolute -top-1 -right-1 size-2 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative text-white/70 transition-colors hover:text-white"
        >
          <Bell className="size-5" />
          <span className="absolute -top-1 -right-1 size-2 rounded-full bg-emerald-500" />
        </button>

        <Avatar className="size-8 border border-white/10">
          <AvatarImage src="/images/profile.png" alt="Profile" />
          <AvatarFallback className="bg-[#635bff] text-white">U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) => {
  return (
    <Card className="gap-4 rounded-xl border border-white/10 bg-[#151518] py-4 text-white shadow-none">
      <CardContent className="flex items-center justify-between px-4">
        <p className="text-xs text-white/50">{title}</p>
        <Icon className={`size-4 ${color}`} />
      </CardContent>

      <CardContent className="px-4">
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
};

const RecentActivity = () => {
  return (
    <section className="mt-7">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>

        <Link
          href="/dashboard/activities"
          className="text-xs text-white/50 transition-colors hover:text-white"
        >
          View All Activity
        </Link>
      </div>

      <div className="space-y-2">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className="rounded-lg border border-white/10 bg-[#151518] py-2 text-white shadow-none"
          >
            <CardContent className="flex items-center gap-3 px-3 sm:px-4">
              <ActivityIcon type={activity.type} />

              <p className="min-w-0 flex-1 text-xs leading-relaxed text-white/70">
                {activity.message}
              </p>

              <span className="shrink-0 text-[10px] text-white/40 sm:text-xs">
                {activity.time}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

const SeekerDashboard = () => {
  return (
    <div className="relative min-h-full bg-[#0c0c0e] p-3 text-white sm:p-5">
      <DashboardTopbar />

      {/* Dashboard Statistics */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Recent Activities */}
      <RecentActivity />

      {/* Floating Action Button */}
      <Link
        href="/dashboard/resume"
        aria-label="Post Resume"
        className="fixed right-6 bottom-6 flex size-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-white/90"
      >
        <Plus className="size-6" />
      </Link>
    </div>
  );
};

export default SeekerDashboard;
