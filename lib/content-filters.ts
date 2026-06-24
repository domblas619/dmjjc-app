import type { AcademyEvent, Announcement } from "@/lib/types";

const timeZone = "America/Los_Angeles";

function todayDateKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function dateKey(value: string) {
  const date = value.includes("T") ? new Date(value) : new Date(`${value}T12:00:00`);

  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export function isAnnouncementPublishedToday(announcement: Announcement) {
  return dateKey(announcement.publishedAt) === todayDateKey();
}

export function getTodayAnnouncements(announcements: Announcement[]) {
  return announcements.filter(isAnnouncementPublishedToday);
}

export function getUpcomingEvents(events: AcademyEvent[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return events.filter((event) => {
    const finalDate = event.endDate || event.startDate;
    return new Date(`${finalDate}T12:00:00`) >= today;
  });
}
