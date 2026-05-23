import Link from "next/link";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import type { TodaySchedule } from "@/lib/schedule";

const categoryLabels = {
  "adult-gi": "Adults",
  toddlers: "Toddlers",
  kids: "Kids",
  teens: "Teens",
  "open-mat": "Open Mat"
};

export function TodayScheduleSection({ schedule }: { schedule: TodaySchedule }) {
  return (
    <div className="space-y-6">
      {schedule.notices.length > 0 && (
        <div className="border border-academy-blue bg-academy-blue/[.08] p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 shrink-0 text-academy-blue" size={20} aria-hidden="true" />
            <div>
              <p className="text-xs font-black uppercase tracking-[.22em] text-academy-blue">Schedule Notice</p>
              <div className="mt-3 space-y-3">
                {schedule.notices.map((notice) => (
                  <div key={notice.id}>
                    <h3 className="font-display text-2xl font-black uppercase leading-none text-academy-foreground">{notice.title}</h3>
                    {notice.description && <p className="mt-2 max-w-3xl text-base font-medium leading-7 text-academy-mist">{notice.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-y border-academy-line/10">
        {schedule.items.length > 0 ? (
          schedule.items.map((item) => (
            <article key={item.id} className="grid gap-3 border-b border-academy-line/10 py-5 last:border-b-0 md:grid-cols-[9rem_1fr_auto] md:items-center">
              <div>
                <p className="font-display text-3xl font-black uppercase leading-none text-academy-foreground">{item.startLabel}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[.18em] text-academy-mist">{item.endLabel} End</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[.22em] text-academy-blue">{categoryLabels[item.calendar]}</p>
                <h3 className="mt-2 font-display text-2xl font-black uppercase leading-none text-academy-foreground md:text-3xl">{item.title}</h3>
              </div>
              <p className="text-sm font-black uppercase tracking-[.14em] text-academy-muted md:text-right">{item.timeLabel}</p>
            </article>
          ))
        ) : (
          <div className="py-8">
            <p className="font-display text-2xl font-black uppercase text-academy-foreground">No classes listed for today</p>
            <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-academy-mist">
              Today’s Google Calendar feed does not currently show classes. Check the full schedule or contact the academy before heading in.
            </p>
          </div>
        )}
      </div>

      <Link
        href={schedule.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-12 items-center gap-2 border-b-2 border-academy-blue text-sm font-black uppercase tracking-[.16em] text-academy-blue transition hover:text-academy-foreground"
      >
        Full Schedule
        <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </div>
  );
}
