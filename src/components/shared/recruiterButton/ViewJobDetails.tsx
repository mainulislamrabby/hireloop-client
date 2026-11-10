"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

type ViewJobDetailsProps = {
  jobId: string;
};

const ViewJobDetails = ({ jobId }: ViewJobDetailsProps) => {
  return (
    <Link href={`/dashboard/recruiter/jobs/${jobId}`}>
      <Button variant="outline" size="sm">
        <Eye className="mr-2 size-4" />
        View Details
      </Button>
    </Link>
  );
};

export default ViewJobDetails;