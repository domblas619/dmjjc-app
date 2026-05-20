import type { Metadata } from "next";
import { EventCard } from "@/components/event-card";
import { PageSection } from "@/components/page-section";
import { getEvents } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Events"
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageSection eyebrow="Calendar" title="Events & Closures">
      <p className="mb-6 max-w-2xl text-lg font-medium leading-8 text-academy-mist">
        Upcoming academy dates, holidays, special schedules, tournaments, seminars, and in-house community events.
      </p>
      <div>
        {events.map((event) => <EventCard key={event.slug} event={event} />)}
      </div>
    </PageSection>
  );
}
