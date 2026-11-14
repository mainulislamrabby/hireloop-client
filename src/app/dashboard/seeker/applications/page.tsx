"use client";

import React from "react";
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Cloud,
  BrainCircuit,
  Palette,
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
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type ApplicationStatus =
  | "Applied"
  | "Review"
  | "Shortlisted"
  | "Rejected"
  | "Offered";

type Application = {
  id: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  status: ApplicationStatus;
  jobType: string;
  location: string;
  icon: React.ReactNode;
};

const applications: Application[] = [
  {
    id: "1",
    jobTitle: "Senior Frontend Engineer",
    company: "Stark Industries",
    appliedAt: "2 hours ago",
    status: "Applied",
    jobType: "Full-time",
    location: "Remote",
    icon: <Code2 className="size-4" />,
  },
  {
    id: "2",
    jobTitle: "Product Designer",
    company: "Cyberdyne Systems",
    appliedAt: "1 day ago",
    status: "Review",
    jobType: "Contract",
    location: "Hybrid",
    icon: <Palette className="size-4" />,
  },
  {
    id: "3",
    jobTitle: "Lead Data Scientist",
    company: "Wayne Enterprises",
    appliedAt: "4 days ago",
    status: "Shortlisted",
    jobType: "Full-time",
    location: "On-site",
    icon: <Database className="size-4" />,
  },
  {
    id: "4",
    jobTitle: "Cloud Architect",
    company: "Oscorp Tech",
    appliedAt: "1 week ago",
    status: "Rejected",
    jobType: "Full-time",
    location: "Remote",
    icon: <Cloud className="size-4" />,
  },
  {
    id: "5",
    jobTitle: "AI Research Engineer",
    company: "Hooli Corp",
    appliedAt: "2 weeks ago",
    status: "Offered",
    jobType: "Full-time",
    location: "Hybrid",
    icon: <BrainCircuit className="size-4" />,
  },
];

const statusStyles: Record<ApplicationStatus, string> = {
  Applied:
    "border-white/10 bg-white/5 text-white/60 hover:bg-white/5",
  Review:
    "border-amber-500/20 bg-amber-500/10 text-amber-400 hover:bg-amber-500/10",
  Shortlisted:
    "border-blue-500/20 bg-blue-500/10 text-blue-400 hover:bg-blue-500/10",
  Rejected:
    "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/10",
  Offered:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10",
};

const StatCard = ({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: string | number;
  valueClassName?: string;
}) => {
  return (
    <Card className="border-white/10 bg-[#151518] shadow-none">
      <CardContent className="p-4">
        <p className="text-[10px] text-white/40">{label}</p>

        <p
          className={`mt-1 text-xl font-semibold tracking-tight text-white ${valueClassName}`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
};

const ApplicationIcon = ({
  icon,
}: {
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#242428] text-white/70">
      {icon}
    </div>
  );
};

const ApplicationStatusBadge = ({
  status,
}: {
  status: ApplicationStatus;
}) => {
  return (
    <Badge
      variant="outline"
      className={`px-2 py-0.5 text-[10px] font-normal ${statusStyles[status]}`}
    >
      {status}
    </Badge>
  );
};

const SeekerApplicationPage = () => {
  /*
   * Replace this sample data with your API data later.
   *
   * Example:
   *
   * const applications = await getMyApplications(user.id);
   *
   * Keep the Application type above as the shape expected
   * by this UI.
   */

  const totalApplied = 24;
  const shortlisted = 8;
  const interviews = 3;
  const successRate = 12;

  return (
    <main className="min-h-screen bg-[#0c0c0e] px-4 py-5 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              My Applications
            </h1>

            <p className="mt-1 text-[10px] text-white/40">
              Track your job applications and interview progress in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <Tabs defaultValue="active">
              <TabsList className="h-8 border border-white/10 bg-[#151518]">
                <TabsTrigger
                  value="active"
                  className="h-6 px-3 text-[10px] text-white/50 data-[state=active]:bg-[#242428] data-[state=active]:text-white"
                >
                  Active
                </TabsTrigger>

                <TabsTrigger
                  value="archived"
                  className="h-6 px-3 text-[10px] text-white/40 data-[state=active]:bg-[#242428] data-[state=active]:text-white"
                >
                  Archived
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Export */}
            <Button
              variant="outline"
              className="h-8 border-white/10 bg-white text-black text-[10px] hover:bg-white/90"
              onClick={() => {
                // Add your PDF export logic here.
                console.log("Export applications");
              }}
            >
              <Download className="mr-1.5 size-3" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Total Applied"
            value={totalApplied}
          />

          <StatCard
            label="Shortlisted"
            value={shortlisted}
          />

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
        <Card className="mt-4 overflow-hidden border-white/10 bg-[#151518] py-0 shadow-none">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="h-9 min-w-57.5 px-4 text-[9px] font-normal text-white/35">
                      Job Title
                    </TableHead>

                    <TableHead className="h-9 min-w-37.5 text-[9px] font-normal text-white/35">
                      Company
                    </TableHead>

                    <TableHead className="h-9 min-w-27.5 text-[9px] font-normal text-white/35">
                      Applied
                    </TableHead>

                    <TableHead className="h-9 min-w-25 text-[9px] font-normal text-white/35">
                      Status
                    </TableHead>

                    <TableHead className="h-9 w-20 text-right text-[9px] font-normal text-white/35">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {applications.map((application) => (
                    <TableRow
                      key={application.id}
                      className="border-white/10 hover:bg-white/2"
                    >
                      {/* Job */}
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <ApplicationIcon icon={application.icon} />

                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-medium text-white">
                              {application.jobTitle}
                            </p>

                            <p className="mt-0.5 text-[9px] text-white/35">
                              {application.jobType} • {application.location}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Company */}
                      <TableCell className="text-[9px] text-white/65">
                        {application.company}
                      </TableCell>

                      {/* Applied */}
                      <TableCell className="text-[9px] text-white/45">
                        {application.appliedAt}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <ApplicationStatusBadge
                          status={application.status}
                        />
                      </TableCell>

                      {/* Action */}
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          className="h-7 px-2 text-[9px] text-white/60 hover:bg-white/5 hover:text-white"
                          onClick={() => {
                            // Add your application details logic here.
                            console.log(
                              "View application:",
                              application.id,
                            );
                          }}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Footer / Pagination */}
            <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[9px] text-white/40">
                Showing 1-5 of 24 applications
              </p>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-7 border-white/10 bg-transparent text-white/50 hover:bg-white/5 hover:text-white"
                >
                  <ChevronLeft className="size-3" />
                </Button>

                <Button
                  variant="outline"
                  className="size-7 border-white/10 bg-white px-0 text-[9px] text-black hover:bg-white/90"
                >
                  1
                </Button>

                <Button
                  variant="outline"
                  className="size-7 border-white/10 bg-transparent px-0 text-[9px] text-white/50 hover:bg-white/5 hover:text-white"
                >
                  2
                </Button>

                <Button
                  variant="outline"
                  className="size-7 border-white/10 bg-transparent px-0 text-[9px] text-white/50 hover:bg-white/5 hover:text-white"
                >
                  3
                </Button>

                <Button
                  variant="outline"
                  size="icon"
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

export default SeekerApplicationPage;