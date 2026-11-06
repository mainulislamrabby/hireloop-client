"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Building2,
  Users,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const popularSearches = [
  "Product Designer",
  "AI Engineering",
  "DevOps Engineer",
];

const stats = [
  {
    icon: BriefcaseBusiness,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: Building2,
    value: "12K",
    label: "Companies",
  },
  {
    icon: Users,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

const Hero = () => {
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (jobTitle.trim()) {
      params.set("search", jobTitle.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    router.push(`/browes-jobs?${params.toString()}`);
  };

  const handlePopularSearch = (search: string) => {
    router.push(`/browes-jobs?search=${search}`);
  };

  return (
    <section className="relative isolate min-h-162.5 overflow-hidden bg-[#050505] text-white sm:min-h-187.5">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-100 bg-linear-to-b from-[#252525] via-[#101010] to-transparent" />

      {/* Hero Content */}
      <div className="container relative z-10 mx-auto px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-1.5 text-[10px] text-white/60 sm:text-xs">
            <span>📦</span>

            <span className="font-semibold text-white">50,000+</span>

            <span>NEW JOBS THIS MONTH</span>
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Find Your Dream Job Today
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-xl text-xs leading-6 text-white/50 sm:text-sm">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex w-full max-w-3xl flex-col gap-2 rounded-xl border border-white/10 bg-[#151515] p-2 sm:flex-row sm:items-center"
          >
            {/* Job Search */}
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-3 size-4 text-white/40" />

              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job title, skill or company"
                className="h-10 border-0 bg-transparent pl-10 text-xs text-white shadow-none placeholder:text-white/40 focus-visible:ring-0"
              />
            </div>

            {/* Divider */}
            <div className="hidden h-6 w-px bg-white/10 sm:block" />

            {/* Location */}
            <div className="relative flex flex-1 items-center">
              <MapPin className="absolute left-3 size-4 text-white/40" />

              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location or Remote"
                className="h-10 border-0 bg-transparent pl-10 text-xs text-white shadow-none placeholder:text-white/40 focus-visible:ring-0"
              />
            </div>

            {/* Search Button */}
            <Button
              type="submit"
              size="icon"
              aria-label="Search jobs"
              className="h-10 w-full shrink-0 bg-[#635bff] text-white hover:bg-[#554df0] sm:w-10"
            >
              <Search className="size-4" />
            </Button>
          </form>

          {/* Popular Searches */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[10px] text-white/40">Trending Position</span>

            {popularSearches.map((search) => (
              <button
                key={search}
                type="button"
                onClick={() => handlePopularSearch(search)}
                className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[10px] text-white/70 transition-colors hover:border-[#635bff]/50 hover:text-white"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Globe Background */}
      <div className="pointer-events-none absolute -bottom-25 left-1/2 -z-10 w-175 max-w-none -translate-x-1/2 sm:-bottom-40 sm:w-237.5 md:-bottom-50 md:w-275">
        {/* Purple Glow */}
        <div className="absolute inset-x-[10%] top-[5%] h-75 rounded-full bg-[#635bff]/40 blur-[100px]" />

        <Image
          src="/images/globe.png"
          alt=""
          width={1200}
          height={800}
          priority
          className="relative h-auto w-full object-contain"
        />
      </div>

      {/* Globe Text */}
      <div className="pointer-events-none absolute bottom-42.5 left-1/2 z-10 w-full -translate-x-1/2 px-4 text-center sm:bottom-52.5 md:bottom-60">
        <p className="mx-auto max-w-md text-lg font-medium text-white/70 sm:text-2xl">
          Assisting over <span className="text-white">15,000</span> job seekers
          <br />
          find their dream positions.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="absolute bottom-6 left-0 z-20 w-full px-4 sm:bottom-8 sm:px-6 lg:px-8">
        <div className="container mx-auto grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex min-h-27.5 flex-col justify-between rounded-xl border border-white/10 bg-[#101010]/90 p-3 backdrop-blur-md sm:min-h-35 sm:p-5"
              >
                <Icon className="size-4 text-white/70 sm:size-5" />

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {stat.value}
                  </h2>

                  <p className="mt-1 text-[10px] text-white/50 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
