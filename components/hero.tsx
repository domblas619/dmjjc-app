import { CtaButton } from "@/components/cta-button";
import { Badge } from "@/components/badge";

export function Hero() {
  return (
    <section className="coastal-drift border-b border-white/10 bg-[var(--ink)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,174,239,.20),transparent_26rem),linear-gradient(135deg,rgba(255,255,255,.04),transparent_45%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-20">
        <div className="grid min-h-[560px] overflow-hidden border border-white/10 bg-[rgba(255,255,255,.025)] md:grid-cols-[1.18fr_.82fr]">
          <div className="relative flex items-end p-6 md:p-12">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,19,31,.96),rgba(5,8,12,.92)_58%,rgba(0,174,239,.14))]" />
            <div className="relative max-w-4xl pb-2">
            <Badge tone="blue">The Club / Community First</Badge>
            <h1 className="mt-7 font-display text-[2.65rem] font-black uppercase leading-[.82] text-[var(--warm-white)] sm:text-6xl md:text-8xl">
              Del Mar Jiu-Jitsu Club
            </h1>
            <p className="mt-3 font-display text-[1.75rem] font-black uppercase leading-none text-academy-blue sm:text-5xl md:text-7xl">
              Community Hub
            </p>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-[#d7e1e8] md:text-xl">
              Academy updates, important dates, training resources, and member information — all in one place.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaButton href="/updates">View Updates</CtaButton>
              <CtaButton href="/events" variant="secondary">Important Dates</CtaButton>
              <CtaButton href="/videos" variant="secondary">Training Videos</CtaButton>
            </div>
            <p className="mt-9 max-w-xl border-t border-white/15 pt-5 text-sm font-black uppercase tracking-[.18em] text-[#9ca7b0]">
              Built for The Club. On and off the mat.
            </p>
            </div>
          </div>
          <div className="relative min-h-80 border-t border-white/10 bg-[linear-gradient(180deg,#0b1a27,#07131f)] md:border-l md:border-t-0">
            <div className="absolute inset-x-8 top-8 h-48 border border-academy-blue/25" />
            <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-[linear-gradient(180deg,transparent,rgba(0,174,239,.12)),repeating-linear-gradient(135deg,rgba(255,255,255,.08)_0_1px,transparent_1px_18px)]" />
            <div className="absolute bottom-6 left-6 right-6 border-l-2 border-academy-blue bg-black/20 p-5 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[.24em] text-academy-blue">Del Mar, California</p>
              <p className="mt-2 font-display text-2xl font-black uppercase leading-none text-[var(--warm-white)]">Just blocks from the surf</p>
              <p className="mt-3 text-sm font-medium leading-6 text-[#c8d4dc]">
                Serving Del Mar, Solana Beach, Carmel Valley, Encinitas, and nearby communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
