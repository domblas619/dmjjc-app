import Link from "next/link";
import { ArrowRight, ExternalLink, PlayCircle } from "lucide-react";
import { Badge } from "@/components/badge";
import { formatDate } from "@/lib/format";
import { truncateText } from "@/lib/video-embed";
import type { AcademyEvent, Announcement, Video } from "@/lib/types";

const urgentTypes = new Set(["Closure", "Holiday", "Special Schedule"]);

export function EventPreviewList({ events }: { events: AcademyEvent[] }) {
  return (
    <div className="divide-y divide-academy-line/10 border-y border-academy-line/10">
      {events.map((event) => {
        const urgent = urgentTypes.has(event.eventType);
        const showEndDate = Boolean(event.endDate && event.endDate !== event.startDate);

        return (
          <article key={event.slug} className="grid gap-3 py-4 sm:grid-cols-[5rem_1fr] sm:gap-5">
            <div className="font-display text-lg font-black uppercase leading-tight text-academy-blue">
              {formatDate(event.startDate).replace(", 2026", "")}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-xl font-black uppercase leading-none text-academy-foreground md:text-2xl">{event.title}</h3>
                {urgent && <Badge tone="red" className="px-2 py-0.5 text-[10px] tracking-[.12em]">Check first</Badge>}
              </div>
              <p className="mt-2 text-sm font-black uppercase tracking-[.1em] text-academy-muted">
                {event.eventType}
                {event.time ? ` · ${event.time}` : ""}
                {showEndDate ? ` · through ${formatDate(event.endDate as string).replace(", 2026", "")}` : ""}
                {event.location ? ` · ${event.location}` : ""}
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-academy-mist">{truncateText(event.description, 130)}</p>
              {(event.showCta ?? Boolean(event.ctaUrl || event.registrationUrl)) && (event.ctaUrl || event.registrationUrl) && (
                <Link
                  href={(event.ctaUrl || event.registrationUrl) as string}
                  target="_blank"
                  rel="noreferrer"
                  className="tap-spring mt-3 inline-flex min-h-9 items-center gap-2 border-b border-academy-blue text-xs font-black uppercase tracking-[.14em] text-academy-blue hover:text-academy-foreground"
                >
                  {event.ctaLabel || "Details / RSVP"}
                  <ExternalLink size={14} aria-hidden="true" />
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function AnnouncementPreviewList({ announcements }: { announcements: Announcement[] }) {
  return (
    <div className="divide-y divide-academy-line/10 border-y border-academy-line/10">
      {announcements.map((announcement) => (
        <article key={announcement.slug} className="py-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-xl font-black uppercase leading-none text-academy-foreground md:text-2xl">{announcement.title}</h3>
            {announcement.isPinned && <Badge tone="amber" className="px-2 py-0.5 text-[10px] tracking-[.12em]">Pinned</Badge>}
          </div>
          <p className="mt-2 text-xs font-black uppercase tracking-[.12em] text-academy-muted">
            {announcement.category} · {formatDate(announcement.publishedAt)}
          </p>
          <p className="mt-2 text-sm font-medium leading-6 text-academy-mist">{truncateText(announcement.body, 150)}</p>
          {(announcement.showCta ?? Boolean(announcement.ctaLabel && announcement.ctaUrl)) && announcement.ctaLabel && announcement.ctaUrl && (
            <Link
              href={announcement.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="tap-spring mt-3 inline-flex min-h-9 items-center gap-2 border-b border-academy-blue text-xs font-black uppercase tracking-[.14em] text-academy-blue hover:text-academy-foreground"
            >
              {announcement.ctaLabel}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}

export function FeaturedVideoPreview({ video }: { video: Video }) {
  return (
    <Link
      href={`/videos/${video.slug}`}
      className="tap-spring group grid gap-4 border-y border-academy-line/10 py-4 sm:grid-cols-[auto_1fr] sm:items-center"
    >
      <span className="grid size-14 place-items-center border border-academy-blue text-academy-blue transition group-hover:bg-academy-blue group-hover:text-[#05080c]">
        <PlayCircle size={28} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-xs font-black uppercase tracking-[.14em] text-academy-muted">
          {video.category} · {video.level}
        </span>
        <span className="mt-1 block font-display text-xl font-black uppercase leading-tight text-academy-foreground transition group-hover:text-academy-blue md:text-2xl">
          {video.title}
        </span>
        <span className="mt-2 block text-sm font-medium leading-6 text-academy-mist">{truncateText(video.description, 150)}</span>
      </span>
    </Link>
  );
}
