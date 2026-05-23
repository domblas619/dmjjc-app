import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/badge";
import { formatDate } from "@/lib/format";
import type { Announcement } from "@/lib/types";

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <article className="group border border-academy-line/10 bg-academy-panel p-5 transition hover:border-academy-blue/60">
      <div className="flex flex-wrap items-center gap-3">
        <Badge tone={announcement.category === "Closure" ? "red" : "blue"}>{announcement.category}</Badge>
        {announcement.isPinned && <Badge tone="amber">Pinned</Badge>}
        <span className="text-xs font-black uppercase tracking-[.14em] text-academy-muted/80">{formatDate(announcement.publishedAt)}</span>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-[.9fr_1.1fr]">
        <h3 className="font-display text-2xl font-black uppercase leading-[.95] text-academy-foreground transition group-hover:text-academy-blue sm:text-3xl">{announcement.title}</h3>
        <div>
          <p className="text-base font-medium leading-7 text-academy-mist">{announcement.body}</p>
          {announcement.ctaLabel && announcement.ctaUrl && (
            <Link
              href={announcement.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 border-b-2 border-academy-blue text-sm font-black uppercase tracking-[.14em] text-academy-blue transition hover:text-academy-foreground"
            >
              {announcement.ctaLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
