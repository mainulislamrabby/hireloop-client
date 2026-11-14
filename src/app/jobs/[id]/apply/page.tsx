import { notFound } from "next/navigation";

import { getJobById } from "@/lib/actions/jobs";
import Application from "@/components/shared/Application";

type ApplyPageProps = {
  params: Promise<{ id: string }>;
};

const ApplyPage = async ({ params }: ApplyPageProps) => {
  const { id } = await params;

  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  const jobTitle = job.jobTitle || job.title || "Untitled Job";
  const company = job.companyName || job.company || "Company";

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-10 text-white sm:px-6">
      <Application
        jobId={job._id.toString()}
        jobTitle={jobTitle}
        company={company}
      />
    </main>
  );
};

export default ApplyPage;
