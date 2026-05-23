import type { AcademyEvent, Announcement, SiteStatus, Video } from "@/lib/types";

export const fallbackStatus: SiteStatus = {
  title: "Open - Regular Schedule",
  statusType: "Open",
  message: "Regular classes are running today. Check today’s schedule and we’ll see you on the mat.",
  updatedAt: new Date().toISOString(),
  isDefault: true
};

export const fallbackAnnouncements: Announcement[] = [];

export const fallbackEvents: AcademyEvent[] = [];

export const fallbackVideos: Video[] = [];
