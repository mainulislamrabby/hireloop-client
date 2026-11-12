import Link from "next/link";

import { getJobs } from "@/lib/actions/jobs";
import type { BrowseJobTypes } from "@/types/jobDataTypes";

import { Button } from "@/components/ui/button";

import JobCard from "@/components/shared/JobCard";
import JobSearchForm from "@/components/shared/JobSearchForm";
import JobFilters from "@/components/shared/JobFilters";

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

  const jobTypes = ["full-time", "part-time", "contract", "internship"];

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
        <JobSearchForm
          search={typeof params.search === "string" ? params.search : ""}
          hiddenParams={Array.from(queryParams.entries())}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
          {/* Filters */}
          <JobFilters
            jobTypes={jobTypes}
            categories={categories}
            search={typeof params.search === "string" ? params.search : ""}
            jobType={typeof params.jobType === "string" ? params.jobType : ""}
            remoteAllowed={
              typeof params.remoteAllowed === "string"
                ? params.remoteAllowed
                : ""
            }
            category={
              typeof params.category === "string" ? params.category : ""
            }
          />

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
                paginatedJobs.map((job) => <JobCard key={job._id} job={job} />)
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
