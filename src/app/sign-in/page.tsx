"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Image from "next/image";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Provider = "google" | "github" | "linkedin";

interface SignInData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Email and password submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const credentials: SignInData = {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      rememberMe,
    };

    setIsSubmitting(true);

    try {
      // TODO: Connect your authentication provider here.
      // credentials contains the collected form data.
      // Never log passwords or store them in localStorage.
      const { data, error } = await authClient.signIn.email({
        email: credentials.email, // required, The email address of the user.
        password: credentials.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
        rememberMe: credentials.rememberMe, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
        callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
      });

      if (error) {
        toast.error(error.message || "Failed to sign in.");
        return;
      }

      if (data) {
        toast.success("Login successful!");

        router.push("/");
      }
    } catch (error) {
      console.error("Sign-in error:", error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social sign-in handler
  const handleSocialSignIn = (provider: Provider) => {
    // TODO: Connect Google, GitHub, or LinkedIn authentication.
    console.log("Selected provider:", provider);
  };

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#050505] px-4 py-12 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#635bff]/10 blur-[150px]" />

      {/* Back to Home */}
      <Link
        href="/"
        className="absolute left-5 top-6 inline-flex items-center gap-2 text-xs text-white/50 transition-colors hover:text-white sm:left-8"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>

      <Card className="relative z-10 w-full max-w-md border-white/10 bg-[#111111] text-white shadow-2xl">
        <CardContent className="p-6 sm:p-8">
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="HireLoop"
              width={150}
              height={60}
              priority
              className="h-auto w-32 object-contain"
            />
          </Link>

          {/* Heading */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Sign in to continue your career journey.
            </p>
          </div>

          {/* Social Sign In */}
          <div className="grid grid-cols-1 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialSignIn("google")}
              className="h-11 border-white/10 bg-[#181818] text-white hover:bg-white/5 hover:text-white"
            >
              <FcGoogle className="mr-2 size-5" />
              Continue with Google
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignIn("github")}
                className="h-11 border-white/10 bg-[#181818] text-white hover:bg-white/5 hover:text-white"
              >
                <FaGithub className="mr-2 size-4" />
                GitHub
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignIn("linkedin")}
                className="h-11 border-white/10 bg-[#181818] text-white hover:bg-white/5 hover:text-white"
              >
                <FaLinkedinIn className="mr-2 size-4 text-[#0A66C2]" />
                LinkedIn
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1 bg-white/10" />

            <span className="text-xs text-white/40">
              OR CONTINUE WITH EMAIL
            </span>

            <Separator className="flex-1 bg-white/10" />
          </div>

          {/* Email Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs text-white/80">
                Email address
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-11 border-white/10 bg-[#181818] text-white placeholder:text-white/30 focus-visible:ring-[#635bff]"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs text-white/80">
                  Password
                </Label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-[#8b7cff] transition-colors hover:text-[#a99fff]"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-11 border-white/10 bg-[#181818] pr-11 text-white placeholder:text-white/30 focus-visible:ring-[#635bff]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="border-white/20 data-[state=checked]:border-[#635bff] data-[state=checked]:bg-[#635bff]"
              />

              <Label
                htmlFor="remember"
                className="cursor-pointer text-xs font-normal text-white/50"
              >
                Remember me
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-md bg-[#635bff] text-sm font-medium text-white hover:bg-[#554df0]"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Sign Up */}
          <p className="mt-6 text-center text-xs text-white/50">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-[#8b7cff] transition-colors hover:text-[#a99fff]"
            >
              Create an account
            </Link>
          </p>

          {/* Terms */}
          <p className="mt-6 text-center text-[10px] leading-5 text-white/30">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-white/60">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-white/60">
              Privacy Policy
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignInPage;
