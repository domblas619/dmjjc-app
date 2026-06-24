import { EmptyState } from "@/components/empty-state";
import { HomeSection } from "@/components/home-section";
import { AnnouncementPreviewList, EventPreviewList, FeaturedVideoPreview } from "@/components/home-previews";
import { TodayStatusBanner } from "@/components/today-status-banner";
import { TodayScheduleSection } from "@/components/today-schedule";
import { UrgentNoticeTicker } from "@/components/urgent-notice-ticker";
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
      <HomeSection
        id="today-classes"
        title="Today's Classes"
        description={todaySchedule.dateLabel}
        actionHref={todaySchedule.sourceUrl}
        actionLabel="Full Schedule"
        tone="dark"
      >
        <TodayScheduleSection schedule={todaySchedule} compact showFullScheduleLink={false} />
      </HomeSection>
      <HomeSection
        id="important-dates"
        title="Important Dates"
        actionHref="/events"
        actionLabel="All Events"
        tone="dark"
      >
        {upcomingEvents.length > 0 ? (
          <EventPreviewList events={upcomingEvents.slice(0, 3)} />
        ) : (
          <EmptyState
            title="No important dates posted"
            message="Upcoming closures and events will appear here once they are published by the academy."
          />
        )}
      </HomeSection>
      <HomeSection
        title="Member Notices"
        actionHref="/updates"
        actionLabel="All Updates"
        tone="warm"
      >
        {announcements.length > 0 ? (
          <AnnouncementPreviewList announcements={announcements.slice(0, 3)} />
        ) : (
          <EmptyState
            title="No academy notes posted"
            message="Announcements and member notices will appear here once they are published by the academy."
          />
        )}
      </HomeSection>
      {featuredVideo && (
        <HomeSection
          title="Training Resource"
          actionHref="/videos"
          actionLabel="All Videos"
          tone="dark"
        >
          <FeaturedVideoPreview video={featuredVideo} />
        </HomeSection>
      )}
    </>
  );
}
