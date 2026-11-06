
import {
  Search,
  ChartNoAxesCombined,
  ChartColumn,
  Bookmark,
  Sparkles,
  FileText,
  Hexagon,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Salary Insights",
    description:
      "Get real salary data to negotiate confidently.",
  },
  {
    icon: ChartColumn,
    title: "Top Companies",
    description:
      "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description:
      "Manage apps & favorites on your dashboard.",
  },
  {
    icon: Sparkles,
    title: "One-Click Apply",
    description:
      "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description:
      "Create professional resumes with modern templates.",
  },
  {
    icon: Hexagon,
    title: "Skill-Based Matching",
    description:
      "Discover jobs that match your skills and experience.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Resources",
    description:
      "Boost your career with quick interview tips.",
  },
];

const Features = () => {
  return (
    <section className="border-y border-white/4 bg-[#151515] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
      <div className="container mx-auto max-w-6xl">

        {/* Section Heading */}
        <div className="mb-10 text-center sm:mb-14">

          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="size-1 rounded-full bg-[#635bff]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
              Features Job
            </p>

            <span className="size-1 rounded-full bg-[#635bff]" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Everything you need
            <br />
            to succeed
          </h2>

        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-6">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group border-0 bg-transparent shadow-none"
              >
                <CardContent className="flex items-start gap-3 p-0">

                  {/* Icon Container */}
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-white/6 bg-[#080808] transition-colors group-hover:border-[#635bff]/40 sm:size-14">
                    <Icon className="size-5 text-[#d8a5ff] transition-transform group-hover:scale-110" />
                  </div>

                  {/* Feature Content */}
                  <div className="min-w-0 flex-1 pt-0.5">

                    <h3 className="text-xs font-medium text-white sm:text-sm">
                      {feature.title}
                    </h3>

                    <p className="mt-1.5 text-[10px] leading-4 text-white/45 sm:text-xs sm:leading-5">
                      {feature.description}
                    </p>

                  </div>

                </CardContent>
              </Card>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Features;
