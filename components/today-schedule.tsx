import Link from "next/link";
import type { CSSProperties } from "react";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import type { TodaySchedule } from "@/lib/schedule";

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
        {schedule.hasClosure ? (
          <div className="py-8">
            <p className="font-display text-2xl font-black uppercase text-academy-foreground">Academy closed today</p>
            <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-academy-mist">
              Today's class schedule is hidden because a closure is scheduled for today. Check the closure notice above before heading to the academy.
            </p>
          </div>
        ) : schedule.items.length > 0 ? (
          schedule.items.map((item, index) => (
            <article
              key={item.id}
              className="schedule-reveal border-b border-academy-line/10 py-4 last:border-b-0"
              style={{ "--row-index": index } as CSSProperties}
            >
              <p className="font-display text-xl font-black uppercase leading-tight tracking-[.02em] text-academy-foreground sm:text-2xl">
                <span className="text-academy-blue">{item.timeLabel}</span>
                <span className="mx-2 text-academy-muted">|</span>
                <span>{item.displayTitle}</span>
              </p>
            </article>
          ))
        ) : (
          <div className="py-8">
            <p className="font-display text-2xl font-black uppercase text-academy-foreground">No more classes listed for today</p>
            <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-academy-mist">
              Today’s remaining Google Calendar feed does not currently show classes. Check the full schedule or contact the academy before heading in.
            </p>
          </div>
        )}
      </div>

      <Link
        href={schedule.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="tap-spring inline-flex min-h-12 items-center gap-2 border-b-2 border-academy-blue text-sm font-black uppercase tracking-[.16em] text-academy-blue hover:text-academy-foreground"
      >
        Full Schedule
        <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </div>
  );
}
