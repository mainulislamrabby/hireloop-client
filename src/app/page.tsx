import CTA from "@/components/home/CTA";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";


export default function Home() {
  return (
    <div>
      <Hero/>
      <FeaturedJobs/>
      <Features/>
      <Pricing/>
      <CTA/>
    </div>
  );
}
