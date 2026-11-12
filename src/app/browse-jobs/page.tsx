import Link from "next/link";

import { getJobs } from "@/lib/actions/jobs";
import type { BrowseJobTypes } from "@/types/jobDataTypes";

import { Search, MapPin, BriefcaseBusiness, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

const BrowseJobs = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;

  // Build API query parameters
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string" && key !== "page" && key !== "sort") {
      queryParams.set(key, value);
    }
  });

  const query = queryParams.toString();

  // Fetch filtered jobs and all jobs for category options
  const [jobs, allJobs]: [BrowseJobTypes[], BrowseJobTypes[]] =
    await Promise.all([getJobs(query), getJobs()]);

  // Pagination and sorting
  const page = Math.max(1, Number(params.page) || 1);

  const sort = typeof params.sort === "string" ? params.sort : "recent";

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

  // Get all available categories
  const categories = [
    ...new Set(allJobs.map((job) => job.category).filter(Boolean)),
  ];

  // Sort jobs
  const sortedJobs = [...jobs].sort((a, b) => {
    if (sort === "salary-high") {
      return b.maxSalary - a.maxSalary;
    }

    if (sort === "salary-low") {
      return a.minSalary - b.minSalary;
    }

    return (
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
    );
  });

  // Pagination
  const jobsPerPage = 4;
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

  const currentPage = Math.min(page, Math.max(totalPages, 1));

  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage,
  );

  // Format salary
  const formatSalary = (amount: number) => `$${amount.toLocaleString("en-US")}`;

  // Generate pagination URL
  const createPageUrl = (pageNumber: number) => {
    const urlParams = new URLSearchParams(queryParams);

    urlParams.set("page", String(pageNumber));

    if (sort !== "recent") {
      urlParams.set("sort", sort);
    }

    return `?${urlParams.toString()}`;
  };

  // Preserve filters when sorting
  const sortingParams = new URLSearchParams(queryParams);

  if (sort !== "recent") {
    sortingParams.set("sort", sort);
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Search */}
        <form
          action="/browse-jobs"
          method="GET"
          className="mb-6 flex flex-col gap-3 rounded-xl border border-white/10 bg-[#151518] p-4 sm:flex-row"
        >
          {/* Preserve existing filters */}
          {Array.from(queryParams.entries())
            .filter(([key]) => key !== "search")
            .map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}

          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-500" />

            <Input
              name="search"
              defaultValue={
                typeof params.search === "string" ? params.search : ""
              }
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
          {/* Filters */}
          <aside className="h-fit rounded-xl border border-white/10 bg-[#151518] p-5">
            <h2 className="mb-5 text-lg font-semibold">Filters</h2>

            <form action="/browse-jobs" method="GET" className="space-y-6">
              {/* Preserve search */}
              {typeof params.search === "string" && (
                <input type="hidden" name="search" value={params.search} />
              )}

              {/* Job Type */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Job Type</h3>

                <div className="space-y-3">
                  {jobTypes.map((type) => (
                    <label
                      key={type}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-400"
                    >
                      <input
                        type="radio"
                        name="jobType"
                        value={type}
                        defaultChecked={params.jobType === type}
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
                        defaultChecked={params.remoteAllowed === option.value}
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
                  defaultValue={
                    typeof params.category === "string" ? params.category : ""
                  }
                  className="h-10 w-full rounded-md border border-white/10 bg-[#202024] px-3 text-sm text-white outline-none"
                >
                  <option value="">All Categories</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
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
                className="flex h-9 w-full items-center justify-center rounded-md border border-white/10 bg-transparent px-4 text-sm font-medium text-white hover:bg-white/10"
              >
                Clear Filters
              </Link>
            </form>
          </aside>

          {/* Job Listings */}
          <section>
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <h2 className="text-lg font-semibold">
                Found {sortedJobs.length.toLocaleString()} Professional Jobs
              </h2>

              {/* Sorting */}
              <form
                action="/browse-jobs"
                method="GET"
                className="flex items-center gap-2"
              >
                {Array.from(queryParams.entries()).map(([key, value]) => (
                  <input key={key} type="hidden" name={key} value={value} />
                ))}

                <select
                  name="sort"
                  defaultValue={sort}
                  className="h-9 rounded-md border border-white/10 bg-[#151518] px-3 text-sm text-white outline-none"
                >
                  <option value="recent">Most Recent</option>
                  <option value="salary-high">Highest Salary</option>
                  <option value="salary-low">Lowest Salary</option>
                </select>

                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="border-white/10 bg-transparent text-white hover:bg-white/10"
                >
                  Sort
                </Button>
              </form>
            </div>

            {/* Job Cards */}
            <div className="space-y-3">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <Card
                    key={job._id}
                    className="border-white/10 bg-[#151518] text-white transition-colors hover:border-white/20"
                  >
                    <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
                      {/* Company Icon */}
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#222226]">
                        <BriefcaseBusiness className="size-5 text-gray-400" />
                      </div>

                      {/* Job Information */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold">
                          {job.jobTitle}
                        </h3>

                        <p className="mt-1 text-sm text-gray-400">
                          {job.companyName} • {job.location}
                          {job.isRemote ? " (Remote)" : ""}
                        </p>

                        {/* Job Badges */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className="border-white/10 text-gray-300"
                          >
                            <DollarSign className="mr-1 size-3" />
                            {formatSalary(job.minSalary)} -{" "}
                            {formatSalary(job.maxSalary)}
                          </Badge>

                          <Badge
                            variant="outline"
                            className="border-white/10 text-gray-300"
                          >
                            {job.jobType}
                          </Badge>

                          <Badge
                            variant="outline"
                            className="border-white/10 text-gray-300"
                          >
                            <MapPin className="mr-1 size-3" />

                            {job.category}
                          </Badge>

                          {job.isRemote && (
                            <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                              Remote
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* View Details */}
                      <Link
                        href={`/jobs/${job._id}`}
                        className="flex h-9 items-center justify-center rounded-md border border-white/10 bg-transparent px-4 text-sm font-medium text-white hover:bg-white/10"
                      >
                        View Details
                      </Link>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="rounded-xl border border-white/10 bg-[#151518] py-16 text-center">
                  <h3 className="text-lg font-semibold">No jobs found</h3>

                  <p className="mt-2 text-sm text-gray-400">
                    Try changing your search or filters.
                  </p>

                  <Link
                    href="/browse-jobs"
                    className="mt-5 inline-flex h-9 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-black hover:bg-gray-200"
                  >
                    Clear Filters
                  </Link>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {currentPage > 1 && (
                  <Link
                    href={createPageUrl(currentPage - 1)}
                    className="rounded-md border border-white/10 px-3 py-2 text-sm text-white hover:bg-white/10"
                  >
                    Previous
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <Link
                      key={number}
                      href={createPageUrl(number)}
                      className={`rounded-md px-3 py-2 text-sm ${
                        currentPage === number
                          ? "bg-white text-black"
                          : "border border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      {number}
                    </Link>
                  ),
                )}

                {currentPage < totalPages && (
                  <Link
                    href={createPageUrl(currentPage + 1)}
                    className="rounded-md border border-white/10 px-3 py-2 text-sm text-white hover:bg-white/10"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default BrowseJobs;
