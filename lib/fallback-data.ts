import type { AcademyEvent, Announcement, SiteStatus, Video } from "@/lib/types";

export const fallbackStatus: SiteStatus = {
  title: "Status Not Posted",
  statusType: "Not Posted",
  message: "No current academy status has been posted yet. For urgent schedule questions, contact the academy directly.",
  updatedAt: new Date(0).toISOString()
};

export const fallbackAnnouncements: Announcement[] = [];

export const fallbackEvents: AcademyEvent[] = [];

export const fallbackVideos: Video[] = [];
