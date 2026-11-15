import SeekerApplications from "@/components/dashboard/SeekerApplications";
import { getApplications } from "@/lib/actions/application";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const SeekerApplicationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const applications = await getApplications(`applicantId=${session?.user.id}`);
  return <SeekerApplications applications={applications} />;
};

export default SeekerApplicationPage;
