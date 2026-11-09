"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import type { JobDataTypes } from "@/types/jobDataTypes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type EditJobActionProps = {
  job: JobDataTypes & { _id: string };
  onSave: (job: JobDataTypes & { _id: string }) => Promise<void>;
};

const EditJobAction = ({ job, onSave }: EditJobActionProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const updatedJob = {
      ...job,
      title: String(formData.get("title")),
      company: String(formData.get("company")),
      category: String(formData.get("category")),
      location: String(formData.get("location")),
    };

    try {
      await onSave(updatedJob);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={() => setOpen(true)}
      >
        <Pencil className="mr-2 size-4" />
        Edit Job
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>
              Update your job posting details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={job.title}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                defaultValue={job.company}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                defaultValue={job.category}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue={job.location}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditJobAction;
