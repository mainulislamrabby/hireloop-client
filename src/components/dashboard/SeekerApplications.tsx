"use client";

import { useState } from "react";
import {
  Download,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
  Code2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Rejected"
  | "Offered"
  | "Interview";

export interface SeekerApplicationTypes {
  _id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  status: ApplicationStatus;
  jobType: string;
  location: string;
  archived?: boolean;
}

interface SeekerApplicationsProps {
  applications?: SeekerApplicationTypes[];
  onExport?: () => void;
  onViewDetails?: (application: SeekerApplicationTypes) => void;
}

const statusStyles: Record<ApplicationStatus, string> = {
  Applied: "border-white/10 bg-white/5 text-white/60",
  "Under Review": "border-amber-500/20 bg-amber-500/10 text-amber-400",
  Shortlisted: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  Rejected: "border-red-500/20 bg-red-500/10 text-red-400",
  Offered: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Interview: "border-purple-500/20 bg-purple-500/10 text-purple-400",
};

const StatCard = ({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: string | number;
  valueClassName?: string;
}) => (
  <Card className="rounded-xl border border-white/10 bg-[#151518] py-0 shadow-none">
    <CardContent className="p-4">
      <p className="text-xs text-white/40">{label}</p>
      <p className={`mt-1 text-xl font-semibold text-white ${valueClassName}`}>
        {value}
      </p>
    </CardContent>
  </Card>
);

const formatRelativeDate = (date: string) => {
  const timestamp = new Date(date).getTime();

  if (Number.isNaN(timestamp)) return "Unknown";

  const seconds = Math.floor((timestamp - Date.now()) / 1000);
  const formatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  const intervals = [
    { limit: 60, divisor: 1, unit: "second" as const },
    { limit: 3600, divisor: 60, unit: "minute" as const },
    { limit: 86400, divisor: 3600, unit: "hour" as const },
    { limit: 604800, divisor: 86400, unit: "day" as const },
    { limit: 2592000, divisor: 604800, unit: "week" as const },
    { limit: 31536000, divisor: 2592000, unit: "month" as const },
    { limit: Infinity, divisor: 31536000, unit: "year" as const },
  ];

  const absoluteSeconds = Math.abs(seconds);
  const interval = intervals.find((item) => absoluteSeconds < item.limit)!;

  return formatter.format(
    Math.round(seconds / interval.divisor),
    interval.unit,
  );
};

const SeekerApplications = ({
  applications = [],
}: SeekerApplicationsProps) => {
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  // Filter applications
  const filteredApplications = applications.filter((application) =>
    activeTab === "active"
      ? !application.archived
      : application.archived === true,
  );

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / pageSize),
  );

  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // Statistics
  const totalApplied = applications.length;

  const shortlisted = applications.filter(
    (application) => application.status === "Shortlisted",
  ).length;

  const interviews = applications.filter(
    (application) => application.status === "Interview",
  ).length;

  const offered = applications.filter(
    (application) => application.status === "Offered",
  ).length;

  const successRate =
    totalApplied > 0 ? Math.round((offered / totalApplied) * 100) : 0;

  // Event handlers
  const handleTabChange = (tab: "active" | "archived") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleExport = () => {
    window.print();
  };
  return (
    <main className="min-h-screen bg-[#0c0c0e] px-4 py-5 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              My Applications
            </h1>

            <p className="mt-1 text-xs text-white/40">
              Track your job applications and interview progress in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Tabs */}
            <div className="flex h-8 items-center rounded-lg border border-white/10 bg-[#151518] p-0.5">
              <button
                type="button"
                onClick={() => handleTabChange("active")}
                className={`rounded-md px-3 py-1 text-[10px] transition-colors ${
                  activeTab === "active"
                    ? "bg-[#242428] text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Active
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("archived")}
                className={`rounded-md px-3 py-1 text-[10px] transition-colors ${
                  activeTab === "archived"
                    ? "bg-[#242428] text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Archived
              </button>
            </div>

            <Button
              variant="outline"
              onClick={handleExport}
              className="h-8 border-white/10! bg-white! text-[10px] text-black! hover:bg-gray-100!"
            >
              <Download className="size-3" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Total Applied" value={totalApplied} />

          <StatCard label="Shortlisted" value={shortlisted} />

          <StatCard
            label="Interviews"
            value={interviews}
            valueClassName="text-amber-400"
          />

          <StatCard
            label="Success Rate"
            value={`${successRate}%`}
            valueClassName="text-emerald-400"
          />
        </section>

        {/* Applications Table */}
        <Card className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#151518] py-0 shadow-none">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="h-10 min-w-60 px-4 text-[10px] font-normal text-white/35">
                      Job Title
                    </TableHead>

                    <TableHead className="h-10 min-w-40 text-[10px] font-normal text-white/35">
                      Company
                    </TableHead>

                    <TableHead className="h-10 min-w-28 text-[10px] font-normal text-white/35">
                      Applied
                    </TableHead>

                    <TableHead className="h-10 min-w-28 text-[10px] font-normal text-white/35">
                      Status
                    </TableHead>

                    <TableHead className="h-10 w-24 text-right text-[10px] font-normal text-white/35">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedApplications.length > 0 ? (
                    paginatedApplications.map((application) => (
                      <TableRow
                        key={application._id}
                        className="border-white/10 hover:bg-white/2"
                      >
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#242428] text-white/70">
                              <Code2 className="size-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-[11px] font-medium text-white">
                                {application.jobTitle}
                              </p>

                              <p className="mt-0.5 text-[10px] text-white/35">
                                {application.jobType} • {application.location}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="text-[10px] text-white/65">
                          {application.company}
                        </TableCell>

                        <TableCell className="text-[10px] text-white/45">
                          {formatRelativeDate(application.appliedAt)}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`px-2 py-0.5 text-[10px] font-normal ${
                              statusStyles[application.status]
                            }`}
                          >
                            {application.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <Link
                            href={`/jobs/${application.jobId}`}
                            className="inline-flex h-7 items-center rounded-md px-2 text-[10px] text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            Details
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableCell colSpan={5} className="h-48 text-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <BriefcaseBusiness className="size-8 text-white/20" />

                          <p className="text-sm font-medium text-white/70">
                            No {activeTab} applications
                          </p>

                          <p className="text-xs text-white/40">
                            Your applications will appear here.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10px] text-white/40">
                Showing{" "}
                {filteredApplications.length === 0
                  ? 0
                  : (currentPage - 1) * pageSize + 1}
                -{Math.min(currentPage * pageSize, filteredApplications.length)}{" "}
                of {filteredApplications.length} applications
              </p>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="size-7 border-white/10 bg-transparent text-white/50 hover:bg-white/5 hover:text-white"
                >
                  <ChevronLeft className="size-3" />
                </Button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <Button
                    key={page}
                    variant="outline"
                    onClick={() => handlePageChange(page)}
                    className={`size-7 px-0 text-[10px] ${
                      currentPage === page
                        ? "border-white bg-white text-black hover:bg-white/90"
                        : "border-white/10 bg-transparent text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="size-7 border-white/10 bg-transparent text-white/50 hover:bg-white/5 hover:text-white"
                >
                  <ChevronRight className="size-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SeekerApplications;
