import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/badge";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AcademyEvent } from "@/lib/types";

const urgentTypes = new Set(["Closure", "Holiday", "Special Schedule"]);

export function EventCard({ event }: { event: AcademyEvent }) {
  const urgent = urgentTypes.has(event.eventType);
  const date = new Date(`${event.startDate}T12:00:00`);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date);

  return (
    <article className={cn("grid gap-5 border p-5 transition hover:border-academy-blue/70 md:grid-cols-[6.5rem_1fr]", urgent ? "border-academy-blue bg-academy-blue/[.07]" : "border-academy-line/10 bg-academy-panel")}>
      <div className="flex size-24 shrink-0 flex-col items-center justify-center border border-academy-line/10 bg-academy-card/[.045] text-center">
        <span className="text-xs font-black uppercase tracking-[.18em] text-academy-blue">{month}</span>
        <span className="font-display text-5xl font-black leading-none text-academy-foreground">{day}</span>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={urgent ? "amber" : "blue"}>{event.eventType}</Badge>
          {urgent && <Badge tone="red">Check before class</Badge>}
        </div>
        <h3 className="mt-4 font-display text-2xl font-black uppercase leading-[.95] text-academy-foreground sm:text-3xl">{event.title}</h3>
        <div className="mt-4 space-y-2 text-sm font-black uppercase tracking-[.12em] text-academy-muted">
          <p className="flex items-center gap-2">
            <CalendarDays size={17} className="text-academy-blue" aria-hidden="true" />
            {formatDate(event.startDate)}
            {event.endDate ? ` - ${formatDate(event.endDate)}` : ""}
            {event.time ? `, ${event.time}` : ""}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={17} className="text-academy-blue" aria-hidden="true" />
            {event.location}
          </p>
        </div>
        <p className="mt-4 text-base font-medium leading-7 text-academy-mist">{event.description}</p>
      </div>
    </article>
  );
}
