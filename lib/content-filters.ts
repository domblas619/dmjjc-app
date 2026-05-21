import type { AcademyEvent } from "@/lib/types";

export function getUpcomingEvents(events: AcademyEvent[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return events.filter((event) => {
    const finalDate = event.endDate || event.startDate;
    return new Date(`${finalDate}T12:00:00`) >= today;
  });
}
