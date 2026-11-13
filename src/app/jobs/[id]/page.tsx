import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  ExternalLink,
  MapPin,
  Users,
} from "lucide-react";

import { getJobById } from "@/lib/actions/jobs";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import ApplyNow from "@/components/shared/ApplyNow";

type JobDetailsProps = {
  params: Promise<{ id: string }>;
};

const JobDetailes = async ({ params }: JobDetailsProps) => {
  const { id } = await params;

  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  const title = job.jobTitle || job.title || "Untitled Job";
  const company = job.companyName || job.company || "Company";
  const isRemote = job.remoteAllowed ?? job.isRemote ?? false;

  const formatSalary = (amount: number) =>
    `$${Number(amount || 0).toLocaleString("en-US")}`;

  const formatList = (value?: string) =>
    (value || "")
      .split(/\n|•/)
      .map((item) => item.trim())
      .filter(Boolean);

  const benefits = Array.isArray(job.benefits)
    ? job.benefits
    : formatList(job.benefits);

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl space-y-5">
        {/* Back */}
        <Link
          href="/browse-jobs"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to Jobs
        </Link>

        {/* Header */}
        <Card className="border-white/10 bg-[#151518] text-white">
          <CardContent className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-xl border border-white/10 bg-[#222226]">
                <BriefcaseBusiness className="size-7 text-white/60" />
              </div>

              <div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <Badge variant="outline">{job.category}</Badge>
                  <Badge className="bg-green-500/10 text-green-400">
                    Active
                  </Badge>
                </div>

                <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>

                <p className="mt-1 text-sm text-white/50">
                  {company} • {job.jobType.replaceAll("-", " ")}
                </p>
              </div>
            </div>

            <ApplyNow jobId={job._id.toString()} />
          </CardContent>
        </Card>

        {/* Overview */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <OverviewCard
            icon={<DollarSign />}
            title="Salary Range"
            value={`${formatSalary(job.minSalary)} - ${formatSalary(job.maxSalary)}`}
            description={job.frequency || "Salary"}
          />

          <OverviewCard
            icon={<MapPin />}
            title="Location"
            value={isRemote ? "Remote" : job.location}
            description={job.location}
          />

          <OverviewCard
            icon={<BriefcaseBusiness />}
            title="Job Type"
            value={job.jobType.replaceAll("-", " ")}
            description="Employment Type"
          />

          <OverviewCard
            icon={<Clock3 />}
            title="Experience"
            value={job.experience || "Not specified"}
            description="Experience Level"
          />
        </div>

        {/* Details and Company */}
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Job Information */}
          <div className="space-y-5">
            <ContentCard title="Job Description">
              <p className="whitespace-pre-line text-sm leading-7 text-white/60">
                {job.description || "No job description provided."}
              </p>
            </ContentCard>

            <ContentCard title="Responsibilities">
              <ContentList items={formatList(job.responsibilities)} />
            </ContentCard>

            <ContentCard title="Requirements">
              <ContentList
                items={formatList(job.requirements || job.qualifications)}
              />
            </ContentCard>

            <ContentCard title="Benefits">
              {benefits.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit: string, index: string) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm text-white/70"
                    >
                      <CheckCircle2 className="size-5 text-green-400" />
                      {benefit}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/40">
                  No benefits information provided.
                </p>
              )}
            </ContentCard>
          </div>

          {/* Company Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-6">
            <Card className="border-white/10 bg-[#151518] text-white">
              <CardHeader>
                <CardTitle className="text-base">Company Overview</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex h-36 items-center justify-center rounded-lg bg-linear-to-br from-[#26343b] to-[#101012]">
                  <Building2 className="size-16 text-white/20" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">{company}</h3>
                  <p className="mt-1 text-sm text-white/40">{job.category}</p>
                </div>

                <Separator className="bg-white/10" />

                <CompanyInfo
                  icon={<Users />}
                  label="Company Size"
                  value={job.companySize || "Not specified"}
                />

                <CompanyInfo
                  icon={<BriefcaseBusiness />}
                  label="Industry"
                  value={job.industry || job.category}
                />

                <CompanyInfo
                  icon={<MapPin />}
                  label="Location"
                  value={job.location}
                />

                {job.deadline && (
                  <CompanyInfo
                    icon={<CalendarDays />}
                    label="Deadline"
                    value={job.deadline}
                  />
                )}

                {job.companyWebsite && (
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-[#202024] text-sm hover:bg-white/10"
                  >
                    Visit Website
                    <ExternalLink className="size-4" />
                  </a>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
};

/* Overview Card */
const OverviewCard = ({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) => (
  <Card className="border-white/10 bg-[#151518] text-white">
    <CardContent className="space-y-3 p-4">
      <div className="flex items-center gap-2 text-white/40">
        {icon}
        <span className="text-xs">{title}</span>
      </div>

      <div>
        <p className="wrap-break-word text-sm font-semibold capitalize">
          {value}
        </p>
        <p className="mt-1 text-xs text-white/40">{description}</p>
      </div>
    </CardContent>
  </Card>
);

/* Content Card */
const ContentCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="border-white/10 bg-[#151518] text-white">
    <CardHeader>
      <CardTitle className="text-base">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

/* Content List */
const ContentList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.length > 0 ? (
      items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3 text-sm leading-6 text-white/60"
        >
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/40" />
          {item}
        </li>
      ))
    ) : (
      <li className="text-sm text-white/40">No information provided.</li>
    )}
  </ul>
);

/* Company Information */
const CompanyInfo = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start justify-between gap-3">
    <div className="flex items-center gap-2 text-white/40">
      {icon}
      <span className="text-xs">{label}</span>
    </div>

    <span className="max-w-[55%] text-right text-xs text-white/80">
      {value}
    </span>
  </div>
);

export default JobDetailes;
