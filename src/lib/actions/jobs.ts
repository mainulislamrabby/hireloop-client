import { JobDataTypes } from "@/types/jobDataTypes";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getJobs = async (query: string = "") => {
  const res = await fetch(`${BASE_URL}/jobs${query ? `?${query}` : ""}`);

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
};

export const getJobById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error("Failed to fetch job details");
  }

  return res.json();
};

export const createJob = async (data: JobDataTypes) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteJobs = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete job");
  }

  return res.json();
};

export const updateJob = async (id: string, updatedJob: JobDataTypes) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedJob),
  });

  if (!res.ok) {
    throw new Error("Failed to update job");
  }

  return res.json();
};
