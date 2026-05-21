import type { Metadata } from "next";
import { EventsBoard } from "@/components/events-board";
import { PageSection } from "@/components/page-section";
import { getUpcomingEvents } from "@/lib/content-filters";
import { getEvents } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Events"
};

export const revalidate = 60;

export default async function EventsPage() {
  const events = await getEvents();
  const upcomingEvents = getUpcomingEvents(events);

  return (
    <PageSection
      eyebrow="Schedule / Events"
      title="Important Dates"
      description="Upcoming academy dates, holidays, special schedules, tournaments, seminars, and in-house community events."
      tone="dark"
    >
      <EventsBoard events={upcomingEvents} />
    </PageSection>
  );
}
