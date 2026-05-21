"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/badge";
import { EventCard } from "@/components/event-card";
import { formatDate } from "@/lib/format";
import type { AcademyEvent, EventType } from "@/lib/types";

const eventFilters: Array<EventType | "All"> = [
  "All",
  "Closure",
  "Holiday",
  "Special Schedule",
  "Tournament",
  "In-House Event",
  "Seminar"
];

const urgentTypes = new Set<EventType>(["Closure", "Holiday", "Special Schedule"]);

function isWithinNextWeek(dateValue: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const date = new Date(`${dateValue}T12:00:00`);
  return date >= today && date <= nextWeek;
}

export function EventsBoard({ events }: { events: AcademyEvent[] }) {
  const [activeFilter, setActiveFilter] = useState<EventType | "All">("All");

  const thisWeekEvents = useMemo(
    () => events.filter((event) => isWithinNextWeek(event.startDate)).slice(0, 3),
    [events]
  );
  const filteredEvents = activeFilter === "All" ? events : events.filter((event) => event.eventType === activeFilter);
  const nextUrgentEvent = events.find((event) => urgentTypes.has(event.eventType));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
        <section className="border border-academy-line/10 bg-academy-panel p-5">
          <p className="text-xs font-black uppercase tracking-[.22em] text-academy-blue">This Week</p>
          <div className="mt-5 space-y-4">
            {thisWeekEvents.length ? (
              thisWeekEvents.map((event) => (
                <div key={event.slug} className="border-t border-academy-line/10 pt-4 first:border-t-0 first:pt-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={urgentTypes.has(event.eventType) ? "red" : "blue"}>{event.eventType}</Badge>
                    <span className="text-xs font-black uppercase tracking-[.14em] text-academy-muted">{formatDate(event.startDate)}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-black uppercase leading-none text-academy-foreground">{event.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-academy-mist">{event.time || event.location}</p>
                </div>
              ))
            ) : (
              <p className="text-base font-medium leading-7 text-academy-mist">No special events or closures are listed for the next seven days.</p>
            )}
          </div>
        </section>
        <section className="border border-academy-blue/40 bg-academy-blue/[.08] p-5">
          <p className="text-xs font-black uppercase tracking-[.22em] text-academy-blue">Quick Check</p>
          {nextUrgentEvent ? (
            <>
              <h3 className="mt-5 font-display text-3xl font-black uppercase leading-none text-academy-foreground">{nextUrgentEvent.title}</h3>
              <p className="mt-3 text-base font-bold leading-7 text-academy-mist">
                {formatDate(nextUrgentEvent.startDate)}
                {nextUrgentEvent.time ? `, ${nextUrgentEvent.time}` : ""} · {nextUrgentEvent.eventType}
              </p>
              <p className="mt-3 text-base font-medium leading-7 text-academy-mist">{nextUrgentEvent.description}</p>
            </>
          ) : (
            <p className="mt-5 text-base font-medium leading-7 text-academy-mist">No closures or modified schedules are currently listed.</p>
          )}
        </section>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {eventFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 border px-4 py-3 text-xs font-black uppercase tracking-[.16em] transition ${
              activeFilter === filter
                ? "border-academy-blue bg-academy-blue text-[#05080c]"
                : "border-academy-line/15 bg-transparent text-academy-foreground hover:border-academy-blue hover:text-academy-blue"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredEvents.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredEvents.map((event) => <EventCard key={event.slug} event={event} />)}
        </div>
      ) : (
        <div className="border border-academy-line/10 bg-academy-panel p-5">
          <p className="text-base font-bold leading-7 text-academy-mist">No events match this filter yet.</p>
        </div>
      )}
    </div>
  );
}
