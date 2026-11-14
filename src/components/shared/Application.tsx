"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness, Send } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { applyToJob } from "@/lib/actions/application";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ApplicationProps = {
  jobId: string;
  jobTitle: string;
  company: string;
};

const Application = ({ jobId, jobTitle, company }: ApplicationProps) => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      router.push(
        `/sign-in?redirectTo=${encodeURIComponent(`/jobs/${jobId}/apply`)}`,
      );
      return;
    }

    if (user.role !== "seeker") {
      toast.error("Only job seekers can apply for jobs.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const application = {
      jobId,
      userId: user.id,
      name: user.name,
      email: user.email,
      phone: String(formData.get("phone") || ""),
      resumeUrl: String(formData.get("resumeUrl") || ""),
      coverLetter: String(formData.get("coverLetter") || ""),
    };

    setIsSubmitting(true);

    try {
      const result = await applyToJob(application);

      if (result.insertedId) {
        toast.success("Your application has been submitted!");
        router.push("/browse-jobs");
        router.refresh();
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit your application.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-white/50">
        Checking your account...
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="mx-auto max-w-lg border-white/10 bg-[#151518] text-white">
        <CardContent className="space-y-4 p-8 text-center">
          <h2 className="text-xl font-semibold">Sign in to apply</h2>

          <p className="text-sm text-white/50">
            Please sign in to your HireLoop account before submitting your
            application.
          </p>

          <Link
            href={`/sign-in?redirectTo=${encodeURIComponent(`/jobs/${jobId}/apply`)}`}
            className="flex h-10 w-full items-center justify-center rounded-md bg-white text-sm font-medium text-black hover:bg-gray-200"
          >
            Sign In
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (user.role !== "seeker") {
    return (
      <Card className="mx-auto max-w-lg border-white/10 bg-[#151518] text-white">
        <CardContent className="space-y-4 p-8 text-center">
          <h2 className="text-xl font-semibold">
            You cannot apply for this job
          </h2>

          <p className="text-sm text-white/50">
            Only job seekers can submit job applications.
          </p>

          <Link
            href={`/jobs/${jobId}`}
            className="inline-flex h-10 items-center justify-center rounded-md border border-white/10 px-4 text-sm font-medium transition-colors hover:bg-white/5"
          >
            Back to Job Details
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={`/jobs/${jobId}`}
        className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to Job Details
      </Link>

      {/* Job Information */}
      <Card className="border-white/10 bg-[#151518] text-white">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/5">
            <BriefcaseBusiness className="size-6 text-white/60" />
          </div>

          <div className="min-w-0">
            <Badge variant="outline" className="mb-2">
              Job Application
            </Badge>

            <h1 className="text-lg font-semibold">{jobTitle}</h1>

            <p className="text-sm text-white/50">{company}</p>
          </div>
        </CardContent>
      </Card>

      {/* Application Form */}
      <Card className="border-white/10 bg-[#151518] text-white">
        <CardHeader>
          <CardTitle className="text-xl">Submit Your Application</CardTitle>

          <p className="text-sm text-white/50">
            Complete the information below to apply for this position.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleApplication} className="space-y-6">
            {/* Applicant Information */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-white/80">
                Applicant Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>

                  <Input
                    id="name"
                    value={user.name}
                    readOnly
                    className="border-white/10 bg-[#202024] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>

                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    readOnly
                    className="border-white/10 bg-[#202024] text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>

                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  className="border-white/10 bg-[#202024] text-white placeholder:text-white/30"
                />
              </div>
            </div>

            <div className="h-px bg-white/10" />

            {/* Resume */}
            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL</Label>

              <Input
                id="resumeUrl"
                name="resumeUrl"
                type="url"
                placeholder="https://example.com/your-resume.pdf"
                required
                className="border-white/10 bg-[#202024] text-white placeholder:text-white/30"
              />

              <p className="text-xs text-white/40">
                Provide a publicly accessible link to your resume.
              </p>
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter</Label>

              <Textarea
                id="coverLetter"
                name="coverLetter"
                placeholder="Tell the employer why you are interested in this position..."
                required
                rows={7}
                className="resize-none border-white/10 bg-[#202024] text-white placeholder:text-white/30"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href={`/jobs/${jobId}`}
                className="flex h-10 items-center justify-center rounded-md border border-white/10 px-4 text-sm font-medium hover:bg-white/5"
              >
                Cancel
              </Link>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black hover:bg-gray-200"
              >
                <Send className="mr-2 size-4" />
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Application;
