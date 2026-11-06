"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const navLinks = [
  {
    label: "Browse Jobs",
    href: "/browes-jobs",
  },
  {
    label: "Company",
    href: "/company",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

const Navbar = () => {
  return (
    <nav className="border-b border-white/10 bg-[#181818]">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Hire Loop Logo"
            width={100}
            height={40}
            className="h-auto w-24 sm:w-25"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-4 md:flex lg:gap-6">
          {/* Navigation Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-white/80 transition-colors hover:text-white sm:text-sm"
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-5 w-px bg-white/20" />

          {/* Auth */}
          <Link
            href="/sign-in"
            className="text-xs text-[#8b7cff] transition-colors hover:text-[#a99fff] sm:text-sm"
          >
            Sign In
          </Link>

          <Link href="/sign-up">
            <Button className="cursor-pointer h-9 rounded-md bg-[#635bff] px-4 text-xs font-medium text-white hover:bg-[#554df0] sm:px-5 sm:text-sm">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex size-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 md:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-70 border-white/10 bg-[#181818] text-white sm:w-[320px]"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-white">
                  Hire Loop
                </SheetTitle>
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-5 px-4">
                {/* Mobile Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="h-px w-full bg-white/10" />

                {/* Auth */}
                <Link
                  href="/sign-in"
                  className="text-sm text-[#8b7cff] transition-colors hover:text-[#a99fff]"
                >
                  Sign In
                </Link>

                <Link href="/sign-up" className="w-full">
                  <Button className="w-full rounded-md bg-[#635bff] text-sm text-white hover:bg-[#554df0]">
                    Get Started
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
