import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type JobFiltersProps = {
  jobTypes: string[];
  categories: string[];
  search?: string;
  jobType?: string;
  remoteAllowed?: string;
  category?: string;
};

const JobFilters = ({
  jobTypes,
  categories,
  search,
  jobType,
  remoteAllowed,
  category,
}: JobFiltersProps) => {
  return (
    <aside className="h-fit rounded-xl border border-white/10 bg-[#151518] p-5">
      <h2 className="mb-5 text-lg font-semibold">Filters</h2>

      <form action="/browse-jobs" method="GET" className="space-y-6">
        {/* Preserve search */}
        {search && <input type="hidden" name="search" value={search} />}

        {/* Job Type */}
        <div>
          <h3 className="mb-3 text-sm font-medium">Job Type</h3>

          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-400">
              <input
                type="radio"
                name="jobType"
                value=""
                defaultChecked={!jobType}
                className="size-4 accent-white"
              />
              All
            </label>

            {jobTypes.map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-400"
              >
                <input
                  type="radio"
                  name="jobType"
                  value={type}
                  defaultChecked={jobType === type}
                  className="size-4 accent-white"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Work Location */}
        <div>
          <h3 className="mb-3 text-sm font-medium">Work Location</h3>

          <div className="space-y-3">
            {[
              { label: "All", value: "" },
              { label: "Remote", value: "true" },
              { label: "On-site", value: "false" },
            ].map((option) => (
              <label
                key={option.label}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-400"
              >
                <input
                  type="radio"
                  name="remoteAllowed"
                  value={option.value}
                  defaultChecked={
                    option.value === ""
                      ? !remoteAllowed
                      : remoteAllowed === option.value
                  }
                  className="size-4 accent-white"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Category */}
        <div>
          <h3 className="mb-3 text-sm font-medium">Category</h3>

          <select
            name="category"
            defaultValue={category || ""}
            className="h-10 w-full rounded-md border border-white/10 bg-[#202024] px-3 text-sm text-white outline-none"
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-gray-200"
        >
          Apply Filters
        </Button>

        <Link
          href="/browse-jobs"
          className="flex h-10 w-full items-center justify-center rounded-md border border-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
        >
          Clear Filters
        </Link>
      </form>
    </aside>
  );
};

export default JobFilters;
