import { unstable_noStore as noStore } from "next/cache";
import { client, hasSanityConfig, urgentClient } from "@/lib/sanity/client";
import {
  fallbackAnnouncements,
  fallbackEvents,
  fallbackStatus,
  fallbackVideos
} from "@/lib/fallback-data";
import type { AcademyEvent, Announcement, SiteStatus, Video } from "@/lib/types";

const imageProjection = `"image": image.asset->url`;
const thumbProjection = `"thumbnail": thumbnail.asset->url`;
const exceptionStatusTypes = ["Closed", "Modified Schedule", "Event Day", "Holiday Closure"];

export const sanityCacheTags = {
  announcements: "sanity-announcements",
  events: "sanity-events",
  videos: "sanity-videos"
} as const;

export async function getSiteStatus(): Promise<SiteStatus> {
  noStore();
  if (!hasSanityConfig) return fallbackStatus;
  const data = await urgentClient.fetch<SiteStatus | null>(
    `*[_type == "siteStatus" && updatedAt <= now() && statusType in $exceptionStatusTypes] | order(updatedAt desc)[0]{
      title, statusType, message, updatedAt
    }`,
    { exceptionStatusTypes },
    { cache: "no-store" }
  );
  return data || fallbackStatus;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  if (!hasSanityConfig) return fallbackAnnouncements;
  const data = await client.fetch<Announcement[]>(
    `*[_type == "announcement" && (!defined(expiresAt) || expiresAt > now())] | order(coalesce(isPinned, false) desc, publishedAt desc){
      title, "slug": slug.current, publishedAt, category, body, isFeatured, isPinned, expiresAt, ctaLabel, ctaUrl, ${imageProjection}
    }`,
    {},
    { next: { revalidate: 60, tags: [sanityCacheTags.announcements] } }
  );
  return data || fallbackAnnouncements;
}

export async function getEvents(): Promise<AcademyEvent[]> {
  if (!hasSanityConfig) return fallbackEvents;
  const data = await client.fetch<AcademyEvent[]>(
    `*[_type == "event"] | order(startDate asc){
      title, "slug": slug.current, startDate, endDate, time, location, eventType, description, isFeatured, statusBadge, registrationUrl, ctaLabel, ctaUrl, audience, ${imageProjection}
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
      title, "slug": slug.current, description, category, level, videoUrl, isFeatured, publishedAt, ctaLabel, ctaUrl, ${thumbProjection}
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
