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
