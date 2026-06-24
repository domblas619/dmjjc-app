import { AnnouncementCard } from "@/components/announcement-card";
import { EmptyState } from "@/components/empty-state";
import { EventCard } from "@/components/event-card";
import { Hero } from "@/components/hero";
import { PageSection } from "@/components/page-section";
import { PushNotificationCard } from "@/components/push-notification-card";
import { TodayStatusBanner } from "@/components/today-status-banner";
import { TodayScheduleSection } from "@/components/today-schedule";
import { UrgentNoticeTicker } from "@/components/urgent-notice-ticker";
import { VideoCard } from "@/components/video-card";
import { getTodayAnnouncements, getUpcomingEvents } from "@/lib/content-filters";
import { getTodaySchedule } from "@/lib/schedule";
import { getAnnouncements, getEvents, getSiteStatus, getVideos } from "@/lib/sanity/queries";
import type { SiteStatus } from "@/lib/types";

export const revalidate = 30;

export default async function HomePage() {
  const [status, todaySchedule, announcements, events, videos] = await Promise.all([
    getSiteStatus(),
    getTodaySchedule(),
    getAnnouncements(),
    getEvents(),
    getVideos()
  ]);
  const upcomingEvents = getUpcomingEvents(events);
  const todayAnnouncements = getTodayAnnouncements(announcements);
  const featuredVideo = videos.find((video) => video.isFeatured) || videos[0];
  const closureNotice = todaySchedule.notices.find((notice) => notice.type === "Closure");
  const effectiveStatus: SiteStatus =
    status.isDefault && closureNotice
      ? {
          title: closureNotice.title,
          statusType: "Closed",
          message: closureNotice.description || "The academy is closed today. Regular status will return automatically tomorrow unless another closure is scheduled.",
          updatedAt: new Date().toISOString()
        }
      : status;

  return (
    <>
      <UrgentNoticeTicker announcements={todayAnnouncements} />
      <TodayStatusBanner status={effectiveStatus} schedule={todaySchedule} />
      <PageSection
        id="today-classes"
        eyebrow="Today / Classes"
        title="Today's Schedule"
        description={`${todaySchedule.dateLabel}. Pulled from the live Google Calendars on the Del Mar Jiu-Jitsu Club schedule.`}
        tone="dark"
      >
        <TodayScheduleSection schedule={todaySchedule} />
      </PageSection>
      <Hero />
      <PageSection tone="warm">
        <PushNotificationCard />
      </PageSection>
      <PageSection
        id="important-dates"
        eyebrow="Schedule / Events"
        title="Important Dates"
        description="Upcoming closures and events."
        tone="dark"
      >
        {upcomingEvents.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {upcomingEvents.slice(0, 3).map((event) => <EventCard key={event.slug} event={event} />)}
          </div>
        ) : (
          <EmptyState
            title="No important dates posted"
            message="Upcoming closures and events will appear here once they are published by the academy."
          />
        )}
      </PageSection>
      <PageSection
        eyebrow="Member Notices"
        title="Academy Notes"
        description="The latest from Del Mar Jiu-Jitsu Club."
        tone="warm"
      >
        {announcements.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {announcements.slice(0, 3).map((announcement) => <AnnouncementCard key={announcement.slug} announcement={announcement} />)}
          </div>
        ) : (
          <EmptyState
            title="No academy notes posted"
            message="Announcements and member notices will appear here once they are published by the academy."
          />
        )}
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
