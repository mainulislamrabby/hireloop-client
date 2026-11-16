import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Zap } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  "Apply to additional job opportunities",
  "Access to all available job listings",
  "Track your job applications",
  "Priority application experience",
];

const pricePlan = 2500;

const PaymentPage = () => {
  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#635bff]/15 text-[#817aff]">
            <Zap className="size-7" />
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Unlock More Opportunities
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm text-white/50 sm:text-base">
            Upgrade your HireLoop experience and continue applying for the jobs
            that match your career goals.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="border-white/10 bg-[#151518] text-white">
            <CardHeader className="border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">HireLoop Pro</CardTitle>
                  <CardDescription className="mt-2 text-white/50">
                    More opportunities. More possibilities.
                  </CardDescription>
                </div>

                <span className="rounded-full bg-[#635bff]/15 px-3 py-1 text-xs font-medium text-[#a49fff]">
                  Premium
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              <div>
                <p className="text-sm text-white/50">One-time payment</p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">৳{pricePlan}</span>
                  <span className="text-sm text-white/40">/ one-time</span>
                </div>

                <p className="mt-2 text-xs text-white/40">
                  Sample price — change this to your actual plan price.
                </p>
              </div>

              <div className="space-y-4">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-white/75"
                  >
                    <Check className="size-4 shrink-0 text-green-400" />
                    {feature}
                  </div>
                ))}
              </div>

              <Link
                href="/payment/checkout"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#635bff] text-sm font-semibold text-white transition hover:bg-[#5148e5]"
              >
                Continue to Checkout
                <ArrowRight className="size-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                <ShieldCheck className="size-4" />
                Secure payment experience
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default PaymentPage;
