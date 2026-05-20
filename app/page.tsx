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
      <PageSection>
        <StatusCard status={status} />
      </PageSection>
      <PageSection eyebrow="Important Dates" title="Upcoming Events">
        <div>
          {events.slice(0, 3).map((event) => <EventCard key={event.slug} event={event} />)}
        </div>
      </PageSection>
      <PageSection eyebrow="Academy Updates" title="Latest Announcements">
        <div>
          {announcements.slice(0, 3).map((announcement) => <AnnouncementCard key={announcement.slug} announcement={announcement} />)}
        </div>
      </PageSection>
      {featuredVideo && (
        <PageSection eyebrow="Training Resource" title="Featured Video">
          <div className="max-w-3xl">
            <VideoCard video={featuredVideo} />
          </div>
        </PageSection>
      )}
    </>
  );
}
