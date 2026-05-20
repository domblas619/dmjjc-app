import { CtaButton } from "@/components/cta-button";
import { Badge } from "@/components/badge";

export function Hero() {
  return (
    <section className="border-b border-academy-line/10">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-16">
        <div className="grid min-h-[520px] overflow-hidden border border-academy-line/10 md:grid-cols-[1.25fr_.75fr]">
          <div className="relative flex items-end p-5 md:p-10">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,174,239,.12),transparent_40%),linear-gradient(135deg,rgb(var(--academy-black)),rgb(var(--academy-charcoal)))]" />
            <div className="relative max-w-3xl pb-4">
            <Badge tone="blue">Driven by Community</Badge>
            <h1 className="mt-6 font-display text-[2.7rem] font-black uppercase leading-[.86] text-academy-foreground sm:text-5xl md:text-8xl">
              Del Mar Jiu-Jitsu Club Community Hub
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-academy-mist md:text-xl">
              Your home base for academy updates, important dates, closures, events, and training resources.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaButton href="/updates">View Updates</CtaButton>
              <CtaButton href="/events" variant="secondary">View Events</CtaButton>
              <CtaButton href="/videos" variant="secondary">Watch Videos</CtaButton>
            </div>
            <p className="mt-8 max-w-xl border-t border-academy-line/15 pt-5 text-sm font-bold uppercase tracking-[.14em] text-academy-muted">
              Built for the Del Mar Jiu-Jitsu Club community - on and off the mat.
            </p>
            </div>
          </div>
          <div className="media-frame relative min-h-72 border-t border-academy-line/10 md:border-l md:border-t-0">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.18))]" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-black uppercase tracking-[.22em] text-academy-blue">Del Mar, California</p>
              <p className="mt-2 font-display text-xl font-black uppercase leading-none text-academy-foreground sm:text-2xl">Just blocks from the surf</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
