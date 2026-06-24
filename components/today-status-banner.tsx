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
    <section className="coastal-drift relative border-b border-white/10 bg-[var(--ink)]">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 px-5 py-3 md:px-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-[.68rem] font-black uppercase tracking-[.22em] text-academy-blue">Today</p>
          <Badge tone={statusTone[status.statusType]}>{status.statusType}</Badge>
          <p className="font-display text-lg font-black uppercase leading-none text-[var(--warm-white)] sm:text-xl">
            {statusDisplayTitle(status.title)}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[.12em] text-[#cbd6de]">
            <CalendarDays size={14} aria-hidden="true" />
            {schedule.dateLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
