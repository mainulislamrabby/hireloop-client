import { ApplicationDataTypes } from "@/types/jobDataTypes";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function applyToJob(data: ApplicationDataTypes) {
  const response = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit application");
  }

  return result;
}

export const getApplications = async (query = "") => {
  const url = query
    ? `${BASE_URL}/applications?${query}`
    : `${BASE_URL}/applications`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }

  return res.json();
};

export const getApplicationsCount = async (query = "") => {
  const url = query
    ? `${BASE_URL}/applications/count?${query}`
    : `${BASE_URL}/applications/count`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }

  return res.json();
};
