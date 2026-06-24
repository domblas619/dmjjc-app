import { unstable_noStore as noStore } from "next/cache";
import { client, hasSanityConfig, urgentClient } from "@/lib/sanity/client";
import {
  fallbackAnnouncements,
  fallbackEvents,
  fallbackStatus,
  fallbackVideos
} from "@/lib/fallback-data";
import { isAnnouncementPublishedToday } from "@/lib/content-filters";
import type { AcademyEvent, Announcement, SiteStatus, Video } from "@/lib/types";

const imageProjection = `"image": image.asset->url`;
const thumbProjection = `"thumbnail": thumbnail.asset->url`;
const exceptionStatusTypes = ["Closed", "Modified Schedule", "Event Day", "Holiday Closure"];
const statusEventTypes = ["Closure", "Holiday", "Special Schedule"];
const timeZone = "America/Los_Angeles";

export const sanityCacheTags = {
  announcements: "sanity-announcements",
  events: "sanity-events",
  videos: "sanity-videos"
} as const;

function todayInTimeZone() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(now);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value || "";
  const dateKey = `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
  const todayStart = zonedDayStart(dateKey);
  const tomorrowDate = new Date(`${dateKey}T12:00:00Z`);
  tomorrowDate.setUTCDate(tomorrowDate.getUTCDate() + 1);
  const tomorrowKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(tomorrowDate);
  const tomorrowStart = zonedDayStart(tomorrowKey);

  return {
    dateKey,
    todayStart: todayStart.toISOString(),
    tomorrowStart: tomorrowStart.toISOString()
  };
}

function zonedDayStart(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const utcGuess = new Date(Date.UTC(year, month - 1, day));
  const offsetName = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset"
  })
    .formatToParts(utcGuess)
    .find((part) => part.type === "timeZoneName")?.value;
  const match = offsetName?.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  const sign = match?.[1] === "-" ? -1 : 1;
  const hours = Number(match?.[2] || 0);
  const minutes = Number(match?.[3] || 0);
  const offsetMs = sign * (hours * 60 + minutes) * 60 * 1000;

  return new Date(utcGuess.getTime() - offsetMs);
}

function statusTypeFromEventType(eventType: string): SiteStatus["statusType"] {
  if (eventType === "Holiday") return "Holiday Closure";
  if (eventType === "Special Schedule") return "Modified Schedule";
  return "Closed";
}

export async function getSiteStatus(): Promise<SiteStatus> {
  noStore();
  if (!hasSanityConfig) return fallbackStatus;
  const today = todayInTimeZone();
  const data = await urgentClient.fetch<SiteStatus | null>(
    `*[
      _type == "siteStatus" &&
      updatedAt <= now() &&
      statusType in $exceptionStatusTypes &&
      (
        (defined(expiresAt) && expiresAt > now()) ||
        (!defined(expiresAt) && updatedAt >= $todayStart && updatedAt < $tomorrowStart)
      )
    ] | order(updatedAt desc)[0]{
      title, statusType, message, updatedAt, expiresAt
    }`,
    { exceptionStatusTypes, todayStart: today.todayStart, tomorrowStart: today.tomorrowStart },
    { cache: "no-store" }
  );

  if (data) return data;

  const statusEvent = await urgentClient.fetch<Pick<AcademyEvent, "title" | "description" | "eventType" | "startDate"> | null>(
    `*[
      _type == "event" &&
      eventType in $statusEventTypes &&
      startDate <= $today &&
      coalesce(endDate, startDate) >= $today
    ] | order(startDate asc)[0]{
      title, description, eventType, startDate
    }`,
    { statusEventTypes, today: today.dateKey },
    { cache: "no-store" }
  );

  if (statusEvent) {
    return {
      title: statusEvent.title,
      statusType: statusTypeFromEventType(statusEvent.eventType),
      message: statusEvent.description,
      updatedAt: new Date().toISOString()
    };
  }

  return fallbackStatus;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  if (!hasSanityConfig) return fallbackAnnouncements;
  const data = await client.fetch<Announcement[]>(
    `*[_type == "announcement" && (!defined(expiresAt) || expiresAt > now())] | order(coalesce(isPinned, false) desc, publishedAt desc){
      title, "slug": slug.current, publishedAt, category, body, isFeatured, isPinned, expiresAt, showCta, ctaLabel, ctaUrl, ${imageProjection}
    }`,
    {},
    { next: { revalidate: 60, tags: [sanityCacheTags.announcements] } }
  );
  return [...(data || fallbackAnnouncements)].sort((a, b) => {
    const todayPriority = Number(isAnnouncementPublishedToday(b)) - Number(isAnnouncementPublishedToday(a));
    if (todayPriority !== 0) return todayPriority;

    const pinnedPriority = Number(Boolean(b.isPinned)) - Number(Boolean(a.isPinned));
    if (pinnedPriority !== 0) return pinnedPriority;

    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export async function getEvents(): Promise<AcademyEvent[]> {
  if (!hasSanityConfig) return fallbackEvents;
  const data = await client.fetch<AcademyEvent[]>(
    `*[_type == "event"] | order(startDate asc){
      title, "slug": slug.current, startDate, endDate, time, location, eventType, description, isFeatured, statusBadge, registrationUrl, showCta, ctaLabel, ctaUrl, audience, ${imageProjection}
    }`,
    {},
    { next: { revalidate: 60, tags: [sanityCacheTags.events] } }
  );
  return data || fallbackEvents;
}

export async function getVideos(): Promise<Video[]> {
  if (!hasSanityConfig) return fallbackVideos;
  const data = await client.fetch<Video[]>(
    `*[_type == "video"] | order(publishedAt desc){
      title, "slug": slug.current, description, category, level, videoUrl, isFeatured, publishedAt, showCta, ctaLabel, ctaUrl, ${thumbProjection}
    }`,
    {},
    { next: { revalidate: 60, tags: [sanityCacheTags.videos] } }
  );
  return data || fallbackVideos;
}

export async function getVideoBySlug(slug: string): Promise<Video | undefined> {
  const videos = await getVideos();
  return videos.find((video) => video.slug === slug);
}
