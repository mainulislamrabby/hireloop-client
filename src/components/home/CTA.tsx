import Image from "next/image";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/cta-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/20" />

      {/* Content */}
      <div className="container mx-auto flex min-h-95 items-center justify-center px-4 py-20 sm:min-h-105 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Heading */}
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Your next role is
            <br />
            already looking for you
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-white/50 sm:text-sm">
            Build a profile in three minutes. The matches start arriving
            tomorrow morning.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* Create Account */}
            <Link
              href="/sign-up"
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-5 text-xs font-medium text-black transition-colors hover:bg-white/90"
            >
              Create a free account
            </Link>

            {/* View Pricing */}
            <Link
              href="/pricing"
              className="inline-flex h-10 w-full items-center justify-center rounded-md border border-white/10 bg-[#111111]/80 px-5 text-xs font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
