import { Badge } from "@/components/badge";
import { formatDate } from "@/lib/format";
import type { Announcement } from "@/lib/types";

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <article className="rounded-3xl border border-academy-line/10 bg-academy-card/[.055] p-5 transition hover:border-academy-blue/40 hover:bg-academy-card/[.08]">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={announcement.category === "Closure" ? "red" : "blue"}>{announcement.category}</Badge>
        <span className="text-sm font-bold text-academy-muted/80">{formatDate(announcement.publishedAt)}</span>
      </div>
      <h3 className="mt-4 text-2xl font-black leading-tight text-academy-foreground">{announcement.title}</h3>
      <p className="mt-3 text-base font-medium leading-7 text-academy-mist">{announcement.body}</p>
    </article>
  );
}
