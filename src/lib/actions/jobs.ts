import { JobDataTypes } from "@/types/jobDataTypes";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
