import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/badge";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AcademyEvent } from "@/lib/types";

const urgentTypes = new Set(["Closure", "Holiday", "Special Schedule"]);

export function EventCard({ event }: { event: AcademyEvent }) {
  const urgent = urgentTypes.has(event.eventType);
  return (
    <article className={cn("grid gap-4 border-t py-5 transition last:border-b md:grid-cols-[.85fr_1.15fr]", urgent ? "border-academy-blue bg-academy-blue/[.07] px-4" : "border-academy-line/15 hover:border-academy-blue/60")}>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={urgent ? "amber" : "blue"}>{event.eventType}</Badge>
          {urgent && <Badge tone="red">Check before class</Badge>}
        </div>
        <h3 className="mt-4 text-3xl font-black uppercase leading-[.95] text-academy-foreground">{event.title}</h3>
      </div>
      <div>
        <div className="space-y-2 text-sm font-black uppercase tracking-[.12em] text-academy-muted">
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
