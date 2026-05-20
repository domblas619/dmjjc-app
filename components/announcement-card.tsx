import { Badge } from "@/components/badge";
import { formatDate } from "@/lib/format";
import type { Announcement } from "@/lib/types";

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <article className="group rounded-[1.5rem] border border-academy-line/10 bg-academy-panel p-5 transition hover:-translate-y-1 hover:border-academy-blue/60 hover:shadow-[0_18px_50px_rgba(0,0,0,.14)]">
      <div className="flex flex-wrap items-center gap-3">
        <Badge tone={announcement.category === "Closure" ? "red" : "blue"}>{announcement.category}</Badge>
        <span className="text-xs font-black uppercase tracking-[.14em] text-academy-muted/80">{formatDate(announcement.publishedAt)}</span>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-[.9fr_1.1fr]">
        <h3 className="font-display text-2xl font-black uppercase leading-[.95] text-academy-foreground transition group-hover:text-academy-blue sm:text-3xl">{announcement.title}</h3>
        <p className="text-base font-medium leading-7 text-academy-mist">{announcement.body}</p>
      </div>
    </article>
  );
}
