"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type JobSearchFormProps = {
  search?: string;
  hiddenParams: [string, string][];
};

const JobSearchForm = ({ search = "", hiddenParams }: JobSearchFormProps) => {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchValue = String(formData.get("search") || "").trim();

    const params = new URLSearchParams();

    // Preserve existing filters
    hiddenParams.forEach(([key, value]) => {
      if (key !== "search") {
        params.set(key, value);
      }
    });

    // Add search keyword
    if (searchValue) {
      params.set("search", searchValue);
    }

    // Reset pagination
    params.delete("page");

    const query = params.toString();

    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs");
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-3 rounded-xl border border-white/10 bg-[#151518] p-4 sm:flex-row"
    >
      {hiddenParams
        .filter(([key]) => key !== "search")
        .map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}

      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-500" />

        <Input
          name="search"
          defaultValue={search}
          placeholder="Search by job title, keywords..."
          className="h-12 border-white/10 bg-[#202024] pl-11 text-white placeholder:text-gray-500"
        />
      </div>

      <Button
        type="submit"
        className="h-12 bg-white text-black hover:bg-gray-200"
      >
        Search Jobs
      </Button>
    </form>
  );
};

export default JobSearchForm;
