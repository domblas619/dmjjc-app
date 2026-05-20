import { CtaButton } from "@/components/cta-button";
import { Badge } from "@/components/badge";

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-8 pt-8 md:px-8 md:pb-12 md:pt-16">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.04] shadow-glow">
        <div className="media-frame relative px-5 py-10 md:px-10 md:py-16">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(5,7,10,.95),rgba(5,7,10,.72),rgba(0,174,239,.18))]" />
          <div className="relative max-w-3xl">
            <Badge tone="blue">Driven by Community</Badge>
            <h1 className="mt-5 text-4xl font-black leading-[.95] text-white md:text-7xl">
              Del Mar Jiu-Jitsu Club Community Hub
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-academy-mist md:text-xl">
              Your home base for academy updates, important dates, closures, events, and training resources.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CtaButton href="/updates">View Updates</CtaButton>
              <CtaButton href="/events" variant="secondary">View Events</CtaButton>
              <CtaButton href="/videos" variant="secondary">Watch Videos</CtaButton>
            </div>
            <p className="mt-7 text-sm font-bold text-white/70">
              Built for the Del Mar Jiu-Jitsu Club community - on and off the mat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
