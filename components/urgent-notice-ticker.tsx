import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/badge";
import type { Announcement } from "@/lib/types";

function excerpt(value: string) {
  return value.length > 132 ? `${value.slice(0, 129).trim()}...` : value;
}

export function UrgentNoticeTicker({ announcements }: { announcements: Announcement[] }) {
  if (!announcements.length) return null;

  const primary = announcements[0];
  const extraCount = announcements.length - 1;
  const showCta = primary.showCta ?? Boolean(primary.ctaLabel && primary.ctaUrl);

  return (
    <section className="border-b border-academy-blue/25 bg-academy-blue/[.09]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[.68rem] font-black uppercase tracking-[.22em] text-academy-blue">Today's Notice</p>
            <Badge tone={primary.category === "Closure" ? "red" : "amber"}>{primary.category}</Badge>
            {extraCount > 0 && <Badge>{extraCount + 1} notices</Badge>}
          </div>
          <p className="mt-2 font-display text-lg font-black uppercase leading-tight text-academy-foreground md:text-xl">
            {primary.title}
          </p>
          <p className="mt-1 max-w-4xl text-sm font-semibold leading-6 text-academy-mist">
            {excerpt(primary.body)}
          </p>
        </div>
        <Link
          href={showCta && primary.ctaUrl ? primary.ctaUrl : "/updates"}
          target={showCta && primary.ctaUrl ? "_blank" : undefined}
          rel={showCta && primary.ctaUrl ? "noreferrer" : undefined}
          className="tap-spring inline-flex min-h-10 shrink-0 items-center gap-2 border-b-2 border-academy-blue text-xs font-black uppercase tracking-[.14em] text-academy-blue hover:text-academy-foreground"
        >
          {showCta && primary.ctaLabel ? primary.ctaLabel : "View Notices"}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
