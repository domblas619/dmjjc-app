import { Clock3 } from "lucide-react";
import { Badge } from "@/components/badge";
import { formatStatusDate } from "@/lib/format";
import type { SiteStatus } from "@/lib/types";

const statusTone = {
  Open: "green",
  Closed: "red",
  "Modified Schedule": "amber",
  "Event Day": "blue",
  "Holiday Closure": "red"
} as const;

export function StatusCard({ status }: { status: SiteStatus }) {
  return (
    <article className="border-y border-academy-blue/40 bg-academy-blue/[.08] px-5 py-6 md:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[.16em] text-academy-blue">Today's Status</p>
          <h2 className="mt-2 text-4xl font-black uppercase leading-none text-academy-foreground">{status.title}</h2>
        </div>
        <Badge tone={statusTone[status.statusType]}>{status.statusType}</Badge>
      </div>
      <p className="mt-4 text-lg font-medium leading-8 text-academy-mist">{status.message}</p>
      <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-academy-muted">
        <Clock3 size={16} aria-hidden="true" />
        Updated {formatStatusDate(status.updatedAt)}
      </p>
    </article>
  );
}
