import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/badge";
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
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-[.68rem] font-black uppercase tracking-[.22em] text-academy-blue">Today's Status</p>
          <Badge tone={statusTone[status.statusType]}>{status.statusType}</Badge>
          <p className="font-display text-xl font-black uppercase leading-none text-[var(--warm-white)] sm:text-2xl">
            {statusDisplayTitle(status.title)}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[.12em] text-[#cbd6de]">
            <CalendarDays size={14} aria-hidden="true" />
            {schedule.dateLabel}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-black uppercase tracking-[.14em]">
          <Link href="#today-classes" className="text-academy-blue transition hover:text-[var(--warm-white)]">
            Today's Classes
          </Link>
          <Link href="#important-dates" className="text-[#cbd6de] transition hover:text-academy-blue">
            Closures
          </Link>
        </div>
      </div>
    </section>
  );
}
