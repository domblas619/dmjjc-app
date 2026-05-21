import type { Metadata } from "next";
import { AnnouncementCard } from "@/components/announcement-card";
import { PageSection } from "@/components/page-section";
import { getAnnouncements } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Updates"
};

export const revalidate = 60;

export default async function UpdatesPage() {
  const announcements = await getAnnouncements();

  return (
    <PageSection
      eyebrow="Member Notices"
      title="Academy Notes"
      description="Fast, scannable updates for schedule notes, closures, kids program reminders, adult program news, and community announcements."
      tone="warm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {announcements.map((announcement) => <AnnouncementCard key={announcement.slug} announcement={announcement} />)}
      </div>
    </PageSection>
  );
}
