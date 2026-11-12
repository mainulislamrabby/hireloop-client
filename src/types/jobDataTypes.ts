export interface JobDataTypes {
  title: string;
  company: string;
  category: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
  remoteAllowed: boolean;
  location: string;
  deadline: string;
  minSalary: number;
  maxSalary: number;
  frequency:
    | "per-hour"
    | "per-day"
    | "per-week"
    | "per-month"
    | "per-year"
    | null;
  responsibilities: string;
  requirements: string;
}

export type JobWithMetaTypes = JobDataTypes & {
  _id: string;
  applicants?: number;
  status?: "active" | "expired";
  createdAt?: string;
};

export interface BrowseJobTypes {
  _id: string;
  jobTitle: string;
  companyName: string;
  category: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
  isRemote: boolean;
  location: string;
  minSalary: number;
  maxSalary: number;
  frequency: string | null;
  responsibilities: string;
  qualifications: string;
  createdAt?: string;
}
