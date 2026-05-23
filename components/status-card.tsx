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
    <article className="border border-academy-line/10 bg-academy-panel">
      <div className="h-1 bg-academy-blue" />
      <div className="p-5 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.24em] text-academy-blue">Today's Status</p>
          <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none text-academy-foreground sm:text-5xl">{status.title}</h2>
        </div>
        <Badge tone={statusTone[status.statusType]}>{status.statusType}</Badge>
      </div>
      <p className="mt-4 text-lg font-medium leading-8 text-academy-mist">{status.message}</p>
      {!status.isDefault && (
        <p className="mt-6 inline-flex border-t border-academy-line/10 pt-4 items-center gap-2 text-sm font-bold text-academy-muted">
          <Clock3 size={16} aria-hidden="true" />
          Updated {formatStatusDate(status.updatedAt)}
        </p>
      )}
      </div>
    </article>
  );
}
