"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Globe,
  CalendarDays,
  Building2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AddNewJobs = () => {
  const router = useRouter();

  const [jobType, setJobType] = useState("full-time");
  const [remoteAllowed, setRemoteAllowed] = useState(false);
  const [frequency, setFrequency] = useState<string | null>("per-hour");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const jobData = Object.fromEntries(formData.entries());

    console.log("Job Form Data:", jobData);

    toast.success("Job details saved successfully!");

    // Connect your job creation API here.
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-white/50">
              <button
                type="button"
                onClick={() => router.back()}
                className="transition-colors hover:text-white"
              >
                Manage Jobs
              </button>

              <span>/</span>
              <span className="text-[#8b7cff]">Create New Listing</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Post a New Job
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>

          <Button
            type="submit"
            form="job-form"
            className="bg-[#635bff] text-white hover:bg-[#554df0] cursor-pointer"
          >
            Publish Job <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>

        <form id="job-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Information */}
          <section className="space-y-5 rounded-xl border border-white/10 bg-[#111113] p-5 sm:p-6">
            <SectionHeading number="1" title="Basic Information" />

            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title *</Label>
              <Input
                id="job-title"
                name="title"
                placeholder="e.g. Frontend Developer"
                required
                className="border-white/10 bg-[#1c1c1f] text-white placeholder:text-white/30"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>

                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />

                  <Input
                    id="company"
                    name="company"
                    placeholder="HirePulse Network"
                    required
                    className="border-white/10 bg-[#1c1c1f] pl-9 text-white placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Job Category *</Label>

                <Select name="category" required>
                  <SelectTrigger className="w-full border-white/10 bg-[#1c1c1f] text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="engineering">
                      Engineering & Tech
                    </SelectItem>
                    <SelectItem value="design">Design & Creative</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Job Type *</Label>

              <RadioGroup
                value={jobType}
                onValueChange={setJobType}
                className="grid grid-cols-2 gap-2 sm:grid-cols-4"
              >
                {[
                  { value: "full-time", label: "Full-time" },
                  { value: "part-time", label: "Part-time" },
                  { value: "contract", label: "Contract" },
                  { value: "internship", label: "Internship" },
                ].map((type) => (
                  <Label
                    key={type.value}
                    htmlFor={type.value}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm transition-colors ${
                      jobType === type.value
                        ? "border-[#635bff] bg-[#635bff]/10 text-white"
                        : "border-white/10 bg-[#1c1c1f] text-white/60 hover:border-white/30"
                    }`}
                  >
                    <RadioGroupItem
                      value={type.value}
                      id={type.value}
                      className="sr-only"
                    />
                    {type.label}
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </section>

          {/* Section 2: Location, Compensation & Timeline */}
          <section className="space-y-5 rounded-xl border border-white/10 bg-[#111113] p-5 sm:p-6">
            <SectionHeading
              number="2"
              title="Location, Compensation & Timeline"
            />

            {/* Remote Work */}
            <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#1c1c1f] p-4">
              <div className="flex items-start gap-3">
                <Globe className="mt-1 size-4 text-[#8b7cff]" />

                <div>
                  <p className="text-sm font-medium">
                    Remote Work Allowed (IsRemote)
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Enable worldwide or distributed candidate applications.
                  </p>
                </div>
              </div>

              <Switch
                checked={remoteAllowed}
                onCheckedChange={setRemoteAllowed}
                aria-label="Allow remote work"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="location">Job Location *</Label>
                  <span className="text-xs text-white/40">Required</span>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />

                  <Input
                    id="location"
                    name="location"
                    placeholder="New York, USA"
                    required
                    className="border-white/10 bg-[#1c1c1f] pl-9 text-white placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline *</Label>

                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />

                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    required
                    className="border-white/10 bg-[#1c1c1f] pl-9 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="min-salary">Min Salary / Rate</Label>
                <Input
                  id="min-salary"
                  name="minSalary"
                  type="number"
                  min="0"
                  placeholder="$25"
                  className="border-white/10 bg-[#1c1c1f] text-white placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-salary">Max Salary / Rate</Label>
                <Input
                  id="max-salary"
                  name="maxSalary"
                  type="number"
                  min="0"
                  placeholder="$40"
                  className="border-white/10 bg-[#1c1c1f] text-white placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label>Frequency</Label>

                <Select
                  value={frequency}
                  onValueChange={(value) => setFrequency(value)}
                  name="frequency"
                >
                  <SelectTrigger className="w-full border-white/10 bg-[#1c1c1f] text-white">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="per-hour">Per hour</SelectItem>
                    <SelectItem value="per-day">Per day</SelectItem>
                    <SelectItem value="per-week">Per week</SelectItem>
                    <SelectItem value="per-month">Per month</SelectItem>
                    <SelectItem value="per-year">Per year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Section 3: Responsibilities & Requirements */}
          <section className="space-y-5 rounded-xl border border-white/10 bg-[#111113] p-5 sm:p-6">
            <SectionHeading
              number="3"
              title="Responsibilities & Requirements"
            />

            <div className="space-y-2">
              <Label htmlFor="responsibilities">Key Responsibilities *</Label>

              <Textarea
                id="responsibilities"
                name="responsibilities"
                required
                rows={5}
                placeholder="Describe the main responsibilities of this position..."
                className="resize-y border-white/10 bg-[#1c1c1f] text-white placeholder:text-white/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">
                Qualifications & Requirements *
              </Label>

              <Textarea
                id="requirements"
                name="requirements"
                required
                rows={5}
                placeholder="• 3+ years of experience...&#10;• Strong understanding of...&#10;• Excellent communication skills..."
                className="resize-y border-white/10 bg-[#1c1c1f] text-white placeholder:text-white/30"
              />
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-white/10 bg-transparent text-white hover:bg-white/5"
            >
              <ArrowLeft className="mr-2 size-4" />
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-[#635bff] text-white hover:bg-[#554df0] cursor-pointer"
            >
              Publish Job <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
      <span className="size-2 rounded-full bg-[#635bff]" />
      {number}. {title}
    </h2>
  );
}

export default AddNewJobs;
