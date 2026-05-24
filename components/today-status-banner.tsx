import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/badge";
import { CtaButton } from "@/components/cta-button";
import type { TodaySchedule } from "@/lib/schedule";
import type { SiteStatus } from "@/lib/types";

const statusTone = {
  Open: "green",
  Closed: "red",
  "Modified Schedule": "amber",
  "Event Day": "blue",
  "Holiday Closure": "red"
} as const;

function statusDisplayTitle(title: string) {
  return title.replace(" - ", " — ");
}

export function TodayStatusBanner({ status, schedule }: { status: SiteStatus; schedule: TodaySchedule }) {
  return (
    <section className="border-b border-white/10 bg-[var(--ink)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-7 md:px-8 md:py-10">
        <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-black uppercase tracking-[.24em] text-academy-blue">Today at Del Mar Jiu-Jitsu Club</p>
              <Badge tone={statusTone[status.statusType]}>{status.statusType}</Badge>
            </div>
            <h1 className="mt-4 font-display text-[2.45rem] font-black uppercase leading-[.88] text-[var(--warm-white)] sm:text-6xl md:text-7xl">
              {statusDisplayTitle(status.title)}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-black uppercase tracking-[.14em] text-[#cbd6de]">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={17} aria-hidden="true" />
                {schedule.dateLabel}
              </span>
              {schedule.items.length > 0 && <span>{schedule.items.length} classes listed today</span>}
            </div>
            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-[#d7e1e8]">{status.message}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <CtaButton href="#today-classes">View Today's Classes</CtaButton>
            <CtaButton href="#important-dates" variant="secondary">View Upcoming Closures</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
