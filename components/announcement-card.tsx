import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/badge";
import { formatDate } from "@/lib/format";
import type { Announcement } from "@/lib/types";

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const showCta = announcement.showCta ?? Boolean(announcement.ctaLabel && announcement.ctaUrl);

  return (
    <article className="group border border-academy-line/10 bg-academy-panel p-5 transition hover:border-academy-blue/60">
      <div className="flex flex-wrap items-center gap-3">
        <Badge tone={announcement.category === "Closure" ? "red" : "blue"}>{announcement.category}</Badge>
        {announcement.isPinned && <Badge tone="amber">Pinned</Badge>}
        <span className="text-xs font-black uppercase tracking-[.14em] text-academy-muted/80">{formatDate(announcement.publishedAt)}</span>
      </div>
      <div className={`mt-5 grid gap-5 ${announcement.image ? "md:grid-cols-[.8fr_1.2fr]" : "md:grid-cols-[.9fr_1.1fr]"}`}>
        {announcement.image && (
          <div className="relative aspect-[16/10] overflow-hidden border border-academy-line/10 bg-academy-charcoal">
            <Image
              src={announcement.image}
              alt=""
              fill
              sizes="(min-width: 768px) 32vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <div className={announcement.image ? "" : "contents"}>
          <h3 className="font-display text-2xl font-black uppercase leading-[.95] text-academy-foreground transition group-hover:text-academy-blue sm:text-3xl">{announcement.title}</h3>
          <div className={announcement.image ? "mt-4" : ""}>
          <p className="text-base font-medium leading-7 text-academy-mist">{announcement.body}</p>
          {showCta && announcement.ctaLabel && announcement.ctaUrl && (
            <Link
              href={announcement.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="tap-spring mt-5 inline-flex min-h-11 items-center gap-2 border-b-2 border-academy-blue text-sm font-black uppercase tracking-[.14em] text-academy-blue hover:text-academy-foreground"
            >
              {announcement.ctaLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
          </div>
        </div>
      </div>
    </article>
  );
}
