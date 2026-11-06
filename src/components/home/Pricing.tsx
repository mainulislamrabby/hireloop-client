"use client";

import { useState } from "react";
import {Plus, Crown, Building2, Zap, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";

const plans = [
  {
    name: "Starter",
    icon: Crown,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    icon: Building2,
    monthlyPrice: 17,
    yearlyPrice: 14,
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    icon: Zap,
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="bg-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="size-1 rounded-full bg-[#635bff]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
              Pricing
            </p>

            <span className="size-1 rounded-full bg-[#635bff]" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </div>

        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-[#1b1b1b] p-1">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs transition-colors ${
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Yearly
              <Badge className="border-0 bg-[#e000c7] px-1.5 py-0 text-[9px] text-white hover:bg-[#e000c7]">
                25%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            const price =
              billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

            return (
              <Card
                key={plan.name}
                className={`relative rounded-xl border text-white transition-all ${
                  plan.highlighted
                    ? "border-white/20 bg-[#181818] shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                    : "border-white/10 bg-black"
                }`}
              >
                <CardContent className="flex h-full flex-col p-4 sm:p-5">
                  {/* Plan Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-md border border-white/10 bg-[#111111]">
                        <Icon className="size-3.5 text-[#e5a0ff]" />
                      </div>

                      <h3 className="text-sm font-medium">{plan.name}</h3>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-semibold tracking-tight">
                        ${price}
                      </span>

                      <span className="text-[9px] text-white/50">/month</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-5 text-xs text-white/80">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-[10px] text-white/50 sm:text-xs"
                      >
                        <span className="flex size-3.5 shrink-0 items-center justify-center rounded-sm bg-[#292929]">
                          <Plus className="size-2.5 text-white/70" />
                        </span>

                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Plan Button */}
                  <div className="mt-auto pt-8">
                    <Link
                      href={`/sign-up?plan=${plan.name.toLowerCase()}&billing=${billing}`}
                      className={`flex h-9 w-full items-center justify-between rounded-md px-3 text-[10px] transition-colors ${
                        plan.highlighted
                          ? "bg-white text-black hover:bg-white/90"
                          : "bg-[#252525] text-white hover:bg-[#333333]"
                      }`}
                    >
                      Choose This Plan
                      <ArrowRight className="size-3" />
                    </Link>
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

export default Pricing;
