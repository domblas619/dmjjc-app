export type AnnouncementCategory =
  | "General"
  | "Schedule"
  | "Closure"
  | "Event"
  | "Kids Program"
  | "Adults Program";

export type EventType =
  | "Closure"
  | "Holiday"
  | "Tournament"
  | "In-House Event"
  | "Seminar"
  | "Special Schedule";

export type VideoCategory =
  | "Kids"
  | "Adults"
  | "Fundamentals"
  | "Drills"
  | "At-Home Training"
  | "No-Gi";

export type VideoLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export type SiteStatusType =
  | "Open"
  | "Closed"
  | "Modified Schedule"
  | "Event Day"
  | "Holiday Closure";

export type Announcement = {
  title: string;
  slug: string;
  publishedAt: string;
  category: AnnouncementCategory;
  body: string;
  image?: string;
  isFeatured?: boolean;
  isPinned?: boolean;
  expiresAt?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export type AcademyEvent = {
  title: string;
  slug: string;
  startDate: string;
  endDate?: string;
  time?: string;
  location: string;
  eventType: EventType;
  description: string;
  image?: string;
  isFeatured?: boolean;
  statusBadge?: string;
  registrationUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  audience?: string;
};

export type Video = {
  title: string;
  slug: string;
  description: string;
  category: VideoCategory;
  level: VideoLevel;
  thumbnail?: string;
  videoUrl: string;
  isFeatured?: boolean;
  publishedAt: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export type SiteStatus = {
  title: string;
  statusType: SiteStatusType;
  message: string;
  updatedAt: string;
  isDefault?: boolean;
};
