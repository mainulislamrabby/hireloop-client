"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock,
  DollarSign,
  Globe,
  MapPin,
  Users,
} from "lucide-react";

import { getJobs } from "@/lib/api/jobs";
import type { JobWithMetaTypes } from "@/types/jobDataTypes";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const JobDetails = () => {
  const params = useParams<{ id: string }>();

  const [job, setJob] = useState<JobWithMetaTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobs();

        const jobs: JobWithMetaTypes[] = Array.isArray(data)
          ? data
          : data.jobs || [];

        const selectedJob = jobs.find(
          (item) => item._id === params.id,
        );

        if (!selectedJob) {
          setError("Job not found.");
          return;
        }

        setJob(selectedJob);
      } catch {
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const formatSalary = () => {
    if (!job || (!job.minSalary && !job.maxSalary)) {
      return "Not specified";
    }

    const frequency = job.frequency?.replace("per-", "") || "";

    return `${job.minSalary.toLocaleString()} – ${job.maxSalary.toLocaleString()} / ${frequency}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-white">
        Loading job details...
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#09090b] px-4 text-white">
        <BriefcaseBusiness className="size-12 text-white/30" />

        <h2 className="text-xl font-semibold">
          {error || "Job not found."}
        </h2>

        <Link href="/dashboard/recruiter/jobs">
          <Button variant="outline">
            <ArrowLeft className="mr-2 size-4" />
            Back to Manage Jobs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div>
          <Link
            href="/dashboard/recruiter/jobs"
            className="mb-5 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to Manage Jobs
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge className="bg-[#635bff]/15 text-[#a99fff]">
                  {job.category}
                </Badge>

                <Badge
                  className={
                    job.status === "expired"
                      ? "bg-white/10 text-white/50"
                      : "bg-green-500/10 text-green-400"
                  }
                >
                  {job.status ?? "Active"}
                </Badge>
              </div>

              <h1 className="text-2xl font-semibold sm:text-3xl">
                {job.title}
              </h1>

              <p className="mt-2 flex items-center gap-2 text-sm text-white/50">
                <Building2 className="size-4" />
                {job.company}
              </p>
            </div>

            <Badge className="w-fit bg-white/5 px-3 py-2 text-white/70">
              {job.jobType}
            </Badge>
          </div>
        </div>

        {/* Overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            icon={<MapPin className="size-5" />}
            title="Location"
            value={job.remoteAllowed ? "Remote" : job.location}
          />

          <OverviewCard
            icon={<DollarSign className="size-5" />}
            title="Salary"
            value={formatSalary()}
          />

          <OverviewCard
            icon={<Users className="size-5" />}
            title="Applicants"
            value={String(job.applicants ?? 0)}
          />

          <OverviewCard
            icon={<CalendarDays className="size-5" />}
            title="Deadline"
            value={
              job.deadline
                ? new Date(job.deadline).toLocaleDateString()
                : "Not specified"
            }
          />
        </div>

        {/* Job Information */}
        <Card className="border-white/10 bg-[#111113] text-white">
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-5 sm:grid-cols-2">
            <InfoItem
              icon={<BriefcaseBusiness className="size-4" />}
              label="Job Type"
              value={job.jobType}
            />

            <InfoItem
              icon={<Globe className="size-4" />}
              label="Work Arrangement"
              value={job.remoteAllowed ? "Remote" : "On-site"}
            />

            <InfoItem
              icon={<MapPin className="size-4" />}
              label="Location"
              value={job.location || "Not specified"}
            />

            <InfoItem
              icon={<Clock className="size-4" />}
              label="Salary Frequency"
              value={job.frequency?.replace("per-", "Per ") || "Not specified"}
            />
          </CardContent>
        </Card>

        {/* Responsibilities */}
        <Card className="border-white/10 bg-[#111113] text-white">
          <CardHeader>
            <CardTitle>Responsibilities</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="whitespace-pre-line text-sm leading-7 text-white/60">
              {job.responsibilities || "No responsibilities provided."}
            </p>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="border-white/10 bg-[#111113] text-white">
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="whitespace-pre-line text-sm leading-7 text-white/60">
              {job.requirements || "No requirements provided."}
            </p>
          </CardContent>
        </Card>

        <Separator className="bg-white/10" />

        <div className="flex justify-end">
          <Link href="/dashboard/recruiter/jobs">
            <Button variant="outline">
              <ArrowLeft className="mr-2 size-4" />
              Back to Manage Jobs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

type OverviewCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

const OverviewCard = ({ icon, title, value }: OverviewCardProps) => (
  <Card className="border-white/10 bg-[#111113] text-white">
    <CardContent className="flex items-start gap-3 p-4">
      <div className="rounded-lg bg-[#635bff]/10 p-2 text-[#a99fff]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-white/40">{title}</p>
        <p className="mt-1 wrap-break-word text-sm font-medium">{value}</p>
      </div>
    </CardContent>
  </Card>
);

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 text-[#a99fff]">{icon}</div>

    <div>
      <p className="text-xs text-white/40">{label}</p>
      <p className="mt-1 text-sm font-medium capitalize">{value}</p>
    </div>
  </div>
);

export default JobDetails;