"use client";
import Link from "next/link";

import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { toast } from "sonner";

const PLAN_PRICE = 499;

type CheckoutProps = {
  canceled?: string;
  plan?: string;
};

const Checkout = ({ canceled }: CheckoutProps) => {
  useEffect(() => {
    if (canceled) {
      toast.error("Your payment was canceled. Please try again.");
    }
  }, [canceled]);
  // Your existing checkout JSX goes here.
  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-10 text-white sm:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/payment"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to Plans
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="mt-2 text-sm text-white/50">
            Complete your payment to unlock HireLoop Pro.
          </p>
        </div>

        <div>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Checkout Form */}
            <div className="space-y-6">
              <Card className="border-white/10 bg-[#151518] text-white">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Customer Information
                  </CardTitle>
                  <CardDescription className="text-white/50">
                    Enter your billing information.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      required
                      className="border-white/10 bg-[#09090b]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="border-white/10 bg-[#09090b]"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-[#151518] text-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Payment Method</CardTitle>
                      <CardDescription className="mt-1 text-white/50">
                        Secure payment powered by Stripe.
                      </CardDescription>
                    </div>

                    <CreditCard className="size-5 text-[#817aff]" />
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Mount Stripe PaymentElement here later. */}
                  <div className="rounded-lg border border-dashed border-white/20 bg-[#09090b] p-6 text-center">
                    <CreditCard className="mx-auto mb-3 size-8 text-white/40" />

                    <p className="text-sm font-medium">
                      Stripe Payment Element
                    </p>

                    <p className="mt-2 text-xs leading-5 text-white/40">
                      Your Stripe card payment fields will appear here after
                      Stripe integration.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                    <LockKeyhole className="size-3.5" />
                    Payment details will be securely handled by Stripe.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="border-white/10 bg-[#151518] text-white lg:sticky lg:top-8">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                  <CardDescription className="text-white/50">
                    Review your purchase.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">HireLoop Pro</p>
                      <p className="mt-1 text-xs text-white/40">
                        Premium access
                      </p>
                    </div>

                    <p className="font-semibold">৳{PLAN_PRICE}</p>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="flex justify-between text-sm text-white/50">
                    <span>Subtotal</span>
                    <span>৳{PLAN_PRICE}</span>
                  </div>

                  <div className="flex justify-between text-sm text-white/50">
                    <span>Tax</span>
                    <span>৳0</span>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold">৳{PLAN_PRICE}</span>
                  </div>

                  <form action="/api/checkout_sessions" method="POST">
                    <section>
                      <Button
                        type="submit"
                        role="link"
                        className="cursor-pointer h-11 w-full bg-[#635bff] text-white hover:bg-[#5148e5]"
                      >
                        Pay ৳{PLAN_PRICE}
                      </Button>
                    </section>
                  </form>

                  <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                    <ShieldCheck className="size-4" />
                    Secure checkout
                  </div>

                  <p className="text-center text-xs leading-5 text-white/40">
                    By continuing, you agree to HireLoop&apos;s payment terms.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/40">
          <CheckCircle2 className="size-4" />
          Your payment information will be handled securely.
        </div>
      </div>
    </main>
  );
};

export default Checkout;
