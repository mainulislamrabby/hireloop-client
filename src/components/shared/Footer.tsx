import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

import { Separator } from "@/components/ui/separator";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/browes-jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/company" },
      { label: "Salary data", href: "/salary-data" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/career-library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand-guideline" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
];

const legalLinks = [
  { label: "Terms & Policy", href: "/terms" },
  { label: "Privacy Guideline", href: "/privacy" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    icon: FaPinterestP,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/6 bg-[#050505] text-white">
      <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-12">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="inline-flex">
              <Image
                src="/images/logo.png"
                alt="HireLoop"
                width={120}
                height={45}
                className="h-auto w-24 sm:w-28"
              />
            </Link>

            <p className="mt-4 max-w-65 text-xs leading-6 text-white/40">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Footer Navigation */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-5 text-xs font-medium text-[#8b7cff]">
                {section.title}
              </h3>

              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Divider */}
        <Separator className="bg-white/6" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex size-9 items-center justify-center rounded-md transition-colors ${
                    social.label === "Pinterest"
                      ? "bg-[#635bff] text-white hover:bg-[#554df0]"
                      : "bg-[#151515] text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="size-4" />
                </Link>
              );
            })}
          </div>

          {/* Copyright & Legal */}
          <div className="flex flex-col gap-3 text-xs text-white/40 sm:flex-row sm:items-center sm:gap-5">
            <p>Copyright 2026 — Programming Hero</p>

            <div className="flex flex-wrap items-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
