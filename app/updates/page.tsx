import type { Metadata } from "next";
import { AnnouncementCard } from "@/components/announcement-card";
import { PageSection } from "@/components/page-section";
import { getAnnouncements } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Updates"
};

export default async function UpdatesPage() {
  const announcements = await getAnnouncements();

  return (
    <PageSection eyebrow="Academy Updates" title="Announcements">
      <p className="mb-6 max-w-2xl text-lg font-medium leading-8 text-academy-mist">
        Fast, scannable updates for schedule notes, closures, kids program reminders, adult program news, and community announcements.
      </p>
      <div>
        {announcements.map((announcement) => <AnnouncementCard key={announcement.slug} announcement={announcement} />)}
      </div>
    </PageSection>
  );
}
