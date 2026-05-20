import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/badge";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AcademyEvent } from "@/lib/types";

const urgentTypes = new Set(["Closure", "Holiday", "Special Schedule"]);

export function EventCard({ event }: { event: AcademyEvent }) {
  const urgent = urgentTypes.has(event.eventType);
  return (
    <article className={cn("rounded-3xl border p-5 transition", urgent ? "border-amber-300/40 bg-amber-300/[.09]" : "border-white/10 bg-white/[.055] hover:border-academy-blue/40")}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={urgent ? "amber" : "blue"}>{event.eventType}</Badge>
        {urgent && <Badge tone="red">Check before class</Badge>}
      </div>
      <h3 className="mt-4 text-2xl font-black leading-tight text-white">{event.title}</h3>
      <div className="mt-4 space-y-2 text-sm font-bold text-white/70">
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
    </article>
  );
}
