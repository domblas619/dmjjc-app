import { AnnouncementCard } from "@/components/announcement-card";
import { EventCard } from "@/components/event-card";
import { Hero } from "@/components/hero";
import { PageSection } from "@/components/page-section";
import { StatusCard } from "@/components/status-card";
import { VideoCard } from "@/components/video-card";
import { getAnnouncements, getEvents, getSiteStatus, getVideos } from "@/lib/sanity/queries";

export default async function HomePage() {
  const [status, announcements, events, videos] = await Promise.all([
    getSiteStatus(),
    getAnnouncements(),
    getEvents(),
    getVideos()
  ]);
  const featuredVideo = videos.find((video) => video.isFeatured) || videos[0];

  return (
    <>
      <Hero />
      <PageSection tone="warm">
        <StatusCard status={status} />
      </PageSection>
      <PageSection
        eyebrow="Schedule / Events"
        title="Important Dates"
        description="Upcoming closures, events, and schedule changes."
        tone="dark"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {events.slice(0, 3).map((event) => <EventCard key={event.slug} event={event} />)}
        </div>
      </PageSection>
      <PageSection
        eyebrow="Member Notices"
        title="Academy Notes"
        description="The latest from Del Mar Jiu-Jitsu Club."
        tone="warm"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {announcements.slice(0, 3).map((announcement) => <AnnouncementCard key={announcement.slug} announcement={announcement} />)}
        </div>
      </PageSection>
      {featuredVideo && (
        <PageSection
          eyebrow="Study / Movement"
          title="Training Resource"
          description="Featured movement, drills, and study material for students."
          tone="dark"
        >
          <div className="max-w-3xl">
            <VideoCard video={featuredVideo} />
          </div>
        </PageSection>
      )}
    </>
  );
}
