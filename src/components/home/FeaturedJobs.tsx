import Link from "next/link";
import { ArrowRight, MapPin, BriefcaseBusiness } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";


const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "£25–£40/hour",
  },
  {
    id: 2,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "£25–£40/hour",
  },
  {
    id: 3,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "£25–£40/hour",
  },
  {
    id: 4,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "£25–£40/hour",
  },
  {
    id: 5,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "£25–£40/hour",
  },
  {
    id: 6,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "£25–£40/hour",
  },
];

const FeaturedJobs = () => {
  return (
    <section className="bg-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-1 w-1 bg-[#635bff]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
              Smart Job Discovery
            </p>

            <span className="h-1 w-1 bg-[#635bff]" />
          </div>

          <h2 className="mx-auto max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The roles you&apos;ll never
            <br className="hidden sm:block" /> find by searching
          </h2>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="group border-white/6 bg-[#151515] text-white transition-colors hover:border-[#635bff]/40"
            >
              <CardContent className="flex min-h-50 flex-col p-4 sm:p-5">
                {/* Job Title */}
                <h3 className="text-base font-medium tracking-tight">
                  {job.title}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/40">
                  {job.description}
                </p>

                {/* Job Details */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Badge
                    variant="secondary"
                    className="gap-1.5 rounded-full border border-white/5 bg-[#222222] px-2 py-1 text-[10px] font-normal text-white/80"
                  >
                    <MapPin className="size-3 text-[#d58aff]" />
                    {job.location}
                  </Badge>

                  <Badge
                    variant="secondary"
                    className="gap-1.5 rounded-full border border-white/5 bg-[#222222] px-2 py-1 text-[10px] font-normal text-white/80"
                  >
                    <BriefcaseBusiness className="size-3 text-[#d58aff]" />
                    {job.type}
                  </Badge>

                  <Badge
                    variant="secondary"
                    className="gap-1.5 rounded-full border border-white/5 bg-[#222222] px-2 py-1 text-[10px] font-normal text-white/80"
                  >
                    <span className="size-1.5 rounded-full bg-[#d58aff]" />
                    {job.salary}
                  </Badge>
                </div>

                {/* Apply Link */}
                <Link
                  href={`/browes-jobs/${job.id}`}
                  className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-xs text-white transition-colors hover:text-[#a99fff]"
                >
                  Apply Now
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Jobs */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/browes-jobs"
            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-5 text-xs font-medium text-black transition-colors hover:bg-white/90"
          >
            View all jobs
            <ArrowRight className="ml-2 size-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
