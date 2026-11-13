"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";

type ApplyNowProps = {
  jobId: string;
};

const ApplyNow = ({ jobId }: ApplyNowProps) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleApply = () => {
    if (!user) {
      router.push(
        `/sign-in?redirectTo=${encodeURIComponent(`/jobs/${jobId}`)}`,
      );
      return;
    } else {
      // save application to database
      console.log("Save the application to the database");
      const application = {
        jobId: jobId,
        userId: user.id,
        email: user.email,
        name: user.name,
      };
    }

    router.push(`/jobs/${jobId}/apply`);
  };

  return (
    <Button
      onClick={handleApply}
      disabled={isPending}
      className="cursor-pointer h-11 w-full rounded-lg bg-white px-6 text-sm font-semibold text-black shadow-lg shadow-white/5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-white/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
    >
      {isPending ? "Loading..." : "Apply Now"}
    </Button>
  );
};

export default ApplyNow;
