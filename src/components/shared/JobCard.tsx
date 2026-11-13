import Link from "next/link";
import { MapPin, BriefcaseBusiness, DollarSign } from "lucide-react";

import type { BrowseJobTypes } from "@/types/jobDataTypes";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ApplyNow from "./ApplyNow";

type JobCardProps = {
  job: BrowseJobTypes;
};

const JobCard = ({ job }: JobCardProps) => {
  const formatSalary = (amount: number) => `$${amount.toLocaleString("en-US")}`;
  const isRemote = job.remoteAllowed ?? job.isRemote ?? false;

  return (
    <Card className="border-white/10 bg-[#151518] text-white transition-colors hover:border-white/20">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
        {/* Company Icon */}
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#222226]">
          <BriefcaseBusiness className="size-5 text-gray-400" />
        </div>

        {/* Job Information */}
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-white">
            {job.jobTitle || job.title || "Untitled Job"}
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            {job.companyName || job.company || "Company"} • {job.location}
            {isRemote ? " (Remote)" : ""}
          </p>

          {/* Job Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-white/10 text-gray-300">
              <DollarSign className="mr-1 size-3" />
              {formatSalary(job.minSalary)} - {formatSalary(job.maxSalary)}
            </Badge>

            <Badge variant="outline" className="border-white/10 text-gray-300">
              {job.jobType}
            </Badge>

            <Badge variant="outline" className="border-white/10 text-gray-300">
              <MapPin className="mr-1 size-3" />
              {job.category}
            </Badge>

            {isRemote && (
              <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                Remote
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href={`/jobs/${job._id}`}
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              View Details
            </Link>

            <ApplyNow jobId={job._id.toString()} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
