"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import type { JobWithMetaTypes } from "@/types/jobDataTypes";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type EditJobActionProps = {
  job: JobWithMetaTypes;
  onSave: (job: JobWithMetaTypes) => Promise<void>;
  onClose: () => void;
};

const EditJobAction = ({ job, onSave, onClose }: EditJobActionProps) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: job.title,
    company: job.company,
    category: job.category,
    jobType: job.jobType,
    remoteAllowed: job.remoteAllowed,
    location: job.location,
    deadline: job.deadline?.slice(0, 10) || "",
    minSalary: String(job.minSalary ?? 0),
    maxSalary: String(job.maxSalary ?? 0),
    frequency: job.frequency ?? "per-month",
    responsibilities: job.responsibilities,
    requirements: job.requirements,
  });

  const handleChange = (
    field: keyof typeof formData,
    value: string | boolean | null,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedJob: JobWithMetaTypes = {
      ...job,
      ...formData,
      minSalary: Number(formData.minSalary) || 0,
      maxSalary: Number(formData.maxSalary) || 0,
    };

    setLoading(true);

    try {
      await onSave(updatedJob);
      onClose();
    } catch {
      toast.error("Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog
        open={true}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) onClose();
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#111113] text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              <Pencil /> Edit Job Post
            </DialogTitle>
            <DialogDescription>
              Update your job information and save your changes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="space-y-4">
              <h3 className="font-semibold text-[#a99fff]">
                Basic Information
              </h3>

              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Job Type</Label>
                <Select
                  value={formData.jobType ?? ""}
                  onValueChange={(value) => handleChange("jobType", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-semibold text-[#a99fff]">
                Location & Deadline
              </h3>

              <div className="flex items-center justify-between rounded-lg border border-white/10 p-3">
                <div>
                  <Label>Remote Work Allowed</Label>
                  <p className="text-xs text-white/50">
                    Allow candidates to work remotely.
                  </p>
                </div>

                <Switch
                  checked={formData.remoteAllowed}
                  onCheckedChange={(value) =>
                    handleChange("remoteAllowed", value)
                  }
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    required={!formData.remoteAllowed}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Application Deadline</Label>
                  <Input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleChange("deadline", e.target.value)}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-semibold text-[#a99fff]">Compensation</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Minimum Salary</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.minSalary}
                    onChange={(e) => handleChange("minSalary", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Maximum Salary</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.maxSalary}
                    onChange={(e) => handleChange("maxSalary", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Salary Frequency</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) => handleChange("frequency", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per-hour">Per Hour</SelectItem>
                    <SelectItem value="per-day">Per Day</SelectItem>
                    <SelectItem value="per-week">Per Week</SelectItem>
                    <SelectItem value="per-month">Per Month</SelectItem>
                    <SelectItem value="per-year">Per Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-semibold text-[#a99fff]">Job Description</h3>

              <div className="space-y-2">
                <Label>Responsibilities</Label>
                <Textarea
                  value={formData.responsibilities}
                  onChange={(e) =>
                    handleChange("responsibilities", e.target.value)
                  }
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Requirements</Label>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => handleChange("requirements", e.target.value)}
                  rows={5}
                  required
                />
              </div>
            </section>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditJobAction;
