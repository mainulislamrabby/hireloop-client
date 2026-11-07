"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UserRole = "seeker" | "recruiter" | "admin";

type Provider = "google" | "github" | "linkedin";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState<UserRole>("seeker");
  const router = useRouter();

  // Sign Up Form Handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      toast.error("Please agree to the Terms of Service.");
      return;
    }

    const signUpData: SignUpData = {
      name,
      email,
      password,
    };

    setIsSubmitting(true);

    try {
      // TODO: Connect your authentication provider here.
      // signUpData contains the collected form data.
      // Never log or store passwords in localStorage.
      const { data, error } = await authClient.signUp.email({
        name: signUpData.name, // required, The name of the user.
        email: signUpData.email, // required, The email address of the user.
        password: signUpData.password,
        role,
        callbackURL: "/", // An optional URL to redirect to after the user signs up.
      });
      if (error) {
        toast.error(error.message || "Failed to create account.");
        return;
      }

      if (data) {
        toast.success("Account created successfully!");

        router.push("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social Signup Handler
  const handleSocialSignUp = (provider: Provider) => {
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

      {/* Signup Card */}
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
              Create your account
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Start your career journey with HireLoop.
            </p>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-1 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialSignUp("google")}
              className="h-11 border-white/10 bg-[#181818] text-white hover:bg-white/5 hover:text-white"
            >
              <FcGoogle className="mr-2 size-5" />
              Continue with Google
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignUp("github")}
                className="h-11 border-white/10 bg-[#181818] text-white hover:bg-white/5 hover:text-white"
              >
                <FaGithub className="mr-2 size-4" />
                GitHub
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignUp("linkedin")}
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

            <span className="text-xs text-white/40">OR SIGN UP WITH EMAIL</span>

            <Separator className="flex-1 bg-white/10" />
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs text-white/80">
                Full name
              </Label>

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                required
                className="h-11 border-white/10 bg-[#181818] text-white placeholder:text-white/30 focus-visible:ring-[#635bff]"
              />
            </div>

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

            {/* Account Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-xs text-white/80">
                Account Type
              </Label>

              <select
                id="role"
                name="role"
                value={role}
                onChange={(event) => setRole(event.target.value as UserRole)}
                required
                className="h-11 w-full rounded-md border border-white/10 bg-[#181818] px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#635bff]"
              >
                <option value="seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs text-white/80">
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="h-11 border-white/10 bg-[#181818] pr-11 text-white placeholder:text-white/30 focus-visible:ring-[#635bff]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              <p className="text-[11px] text-white/30">
                Password must contain at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-xs text-white/80"
              >
                Confirm password
              </Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="h-11 border-white/10 bg-[#181818] pr-11 text-white placeholder:text-white/30 focus-visible:ring-[#635bff]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                className="mt-0.5 border-white/20 data-[state=checked]:border-[#635bff] data-[state=checked]:bg-[#635bff]"
              />

              <Label
                htmlFor="terms"
                className="cursor-pointer text-xs font-normal leading-5 text-white/50"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#8b7cff] hover:text-[#a99fff]"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#8b7cff] hover:text-[#a99fff]"
                >
                  Privacy Policy
                </Link>
                .
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting || !agreeToTerms}
              className="h-11 w-full rounded-md bg-[#635bff] text-sm font-medium text-white hover:bg-[#554df0]"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          {/* Sign In */}
          <p className="mt-6 text-center text-xs text-white/50">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-[#8b7cff] transition-colors hover:text-[#a99fff]"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignUpPage;
