"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { authClient } from "@/lib/auth-client";

const navLinks = [
  {
    label: "Browse Jobs",
    href: "/browse-jobs",
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

type ProfileDropdownProps = {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
  };
  onSignOut: () => void;
};

const ProfileDropdown = ({ user, onSignOut }: ProfileDropdownProps) => (
  <Popover>
    <PopoverTrigger
      className="rounded-full outline-none transition-opacity hover:opacity-80"
      aria-label="Open profile menu"
    >
      <Avatar className="size-10 border border-white/10">
        <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
        <AvatarFallback className="bg-[#635bff] text-white">
          {user.name?.charAt(0).toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
    </PopoverTrigger>

    <PopoverContent
      align="end"
      className="w-64 border-white/10 bg-[#181818] p-0 text-white"
    >
      <div className="border-b border-white/10 p-4">
        <p className="truncate text-sm font-semibold">{user.name || "User"}</p>
        <p className="truncate text-xs text-white/50">{user.email}</p>
      </div>

      <div className="p-2">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <UserRound className="size-4" />
          My Profile
        </Link>

        <button
          type="button"
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-400 transition-colors hover:bg-white/10"
        >
          <LogOut className="size-4" />
          Sign Out
        </button>
      </div>
    </PopoverContent>
  </Popover>
);

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const user = session?.user;

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Failed to sign out.");
        return;
      }

      toast.success("Signed out successfully.");
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    }
  };

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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-white/80 transition-colors hover:text-white sm:text-sm"
            >
              {link.label}
            </Link>
          ))}

          <div className="h-5 w-px bg-white/20" />

          {/* Authentication */}
          {!isPending &&
            (user ? (
              <ProfileDropdown user={user} onSignOut={handleSignOut} />
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-xs text-[#8b7cff] transition-colors hover:text-[#a99fff] sm:text-sm"
                >
                  Sign In
                </Link>

                <Link href="/sign-up">
                  <Button className="h-9 cursor-pointer rounded-md bg-[#635bff] px-4 text-xs font-medium text-white hover:bg-[#554df0] sm:px-5 sm:text-sm">
                    Get Started
                  </Button>
                </Link>
              </>
            ))}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-3 md:hidden">
          {!isPending && user && (
            <ProfileDropdown user={user} onSignOut={handleSignOut} />
          )}

          <Sheet>
            <SheetTrigger className="inline-flex size-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10">
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
                {/* Navigation Links */}
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

                {/* Mobile Authentication */}
                {!isPending &&
                  (user ? (
                    <>
                      <div>
                        <p className="text-sm font-semibold">{user.name}</p>

                        <p className="mt-1 text-xs text-white/50">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        className="text-sm text-white/80 hover:text-white"
                      >
                        My Profile
                      </Link>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-left text-sm text-red-400"
                      >
                        <LogOut className="size-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/sign-in"
                        className="text-sm text-[#8b7cff] hover:text-[#a99fff]"
                      >
                        Sign In
                      </Link>

                      <Link href="/sign-up" className="w-full">
                        <Button className="w-full rounded-md bg-[#635bff] text-sm text-white hover:bg-[#554df0]">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
