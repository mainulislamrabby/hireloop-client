"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Plus,
  Search,
  MapPin,
  Users,
  Pencil,
  Trash2,
  MoreVertical,
  BriefcaseBusiness,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { JobDataTypes } from "@/types/jobDataTypes";
import { useRouter } from "next/navigation";
import { getJobs } from "@/lib/api/jobs";

type Job = JobDataTypes & {
  _id: string;
  applicants?: number;
  status?: "active" | "expired";
  createdAt?: string;
};

const ManageJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Fetch recruiter jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();

        setJobs(Array.isArray(data) ? data : data.jobs || []);
      } catch {
        toast.error("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Delete job
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete job");
      }

      setJobs((prev) => prev.filter((job) => job._id !== id));

      toast.success("Job deleted successfully.");
    } catch {
      toast.error("Failed to delete job.");
    }
  };

  // Search jobs
  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#09090b] p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs text-white/40">
              Manage Jobs &gt; Job Listings & Postings
            </p>

            <h1 className="text-2xl font-semibold sm:text-3xl">
              Manage Job Posts
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Review live listings, monitor applicants, and update job details.
            </p>
          </div>

          <Link href="/dashboard/recruiter/jobs/new">
            <Button className="bg-[#635bff] text-white hover:bg-[#554df0]">
              <Plus className="mr-2 size-4" />
              New Job Post
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job title, company, category..."
              className="border-white/10 bg-[#111113] pl-9 text-white placeholder:text-white/40"
            />
          </div>

          <Badge className="flex h-10 items-center border border-white/10 bg-[#111113] px-4 text-white">
            {jobs.length} Job Posts
          </Badge>
        </div>

        {/* Job Table */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111113]">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/50">
                  Job Title & Dept
                </TableHead>
                <TableHead className="text-white/50">
                  Company & Location
                </TableHead>
                <TableHead className="text-white/50">Type</TableHead>
                <TableHead className="text-white/50">Compensation</TableHead>
                <TableHead className="text-white/50">Applicants</TableHead>
                <TableHead className="text-white/50">Status</TableHead>
                <TableHead className="text-white/50">Deadline</TableHead>
                <TableHead className="text-right text-white/50">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-white/50"
                  >
                    Loading jobs...
                  </TableCell>
                </TableRow>
              ) : filteredJobs.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-40 text-center text-white/50"
                  >
                    <BriefcaseBusiness className="mx-auto mb-3 size-8" />

                    {search
                      ? "No jobs found."
                      : "You haven't posted any jobs yet."}

                    {!search && (
                      <div className="mt-3">
                        <Link href="/dashboard/recruiter/jobs/new">
                          <Button size="sm" variant="outline">
                            Create your first job
                          </Button>
                        </Link>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs.map((job) => (
                  <TableRow
                    key={job._id}
                    className="border-white/10 hover:bg-white/3"
                  >
                    {/* Job title */}
                    <TableCell>
                      <div className="font-medium">{job.title}</div>

                      <p className="mt-1 text-xs text-[#8b7cff]">
                        {job.category}
                      </p>
                    </TableCell>

                    {/* Company */}
                    <TableCell>
                      <div className="text-sm">{job.company}</div>

                      <p className="mt-1 flex items-center gap-1 text-xs text-white/40">
                        <MapPin className="size-3" />
                        {job.remoteAllowed ? "Remote" : job.location}
                      </p>
                    </TableCell>

                    {/* Job type */}
                    <TableCell>
                      <Badge className="bg-white/5 text-xs text-white/70">
                        {job.jobType}
                      </Badge>
                    </TableCell>

                    {/* Compensation */}
                    <TableCell className="text-sm">
                      {job.minSalary || job.maxSalary
                        ? `${job.minSalary} – ${job.maxSalary} / ${job.frequency?.replace("per-", "") || ""}`
                        : "Not specified"}
                    </TableCell>

                    {/* Applicants */}
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-[#a99fff]">
                        <Users className="size-3" />
                        {job.applicants ?? 0}
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        className={
                          job.status === "expired"
                            ? "bg-white/10 text-white/50"
                            : "bg-green-500/10 text-green-400"
                        }
                      >
                        {job.status ?? "Active"}
                      </Badge>
                    </TableCell>

                    {/* Deadline */}
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <CalendarDays className="size-3" />

                        {job.deadline
                          ? new Date(job.deadline).toLocaleDateString()
                          : "Not specified"}
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/60 hover:bg-white/10 hover:text-white"
                          >
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="border-white/10 bg-[#181818] text-white"
                        >
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/dashboard/recruiter/jobs/${job._id}/edit`,
                              )
                            }
                          >
                            <Pencil className="mr-2 size-4" />
                            Edit Job
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleDelete(job._id)}
                            className="text-red-400 focus:text-red-400"
                          >
                            <Trash2 className="mr-2 size-4" />
                            Delete Job
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
