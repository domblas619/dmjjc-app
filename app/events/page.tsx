import type { Metadata } from "next";
import { EventCard } from "@/components/event-card";
import { PageSection } from "@/components/page-section";
import { getEvents } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Events"
};

export const revalidate = 60;

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageSection
      eyebrow="Schedule / Events"
      title="Important Dates"
      description="Upcoming academy dates, holidays, special schedules, tournaments, seminars, and in-house community events."
      tone="dark"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {events.map((event) => <EventCard key={event.slug} event={event} />)}
      </div>
    </PageSection>
  );
}
