import type { Announcement } from "@/lib/types";

export type AnnouncementTimeZone = "America/Los_Angeles" | "Pacific/Honolulu";

function timeZoneOffsetMs(date: Date, timeZone: AnnouncementTimeZone) {
  const offsetName = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset"
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;
  const match = offsetName?.match(/GMT([+-])?(\d{1,2})?(?::(\d{2}))?/);
  const sign = match?.[1] === "-" ? -1 : 1;
  const hours = Number(match?.[2] || 0);
  const minutes = Number(match?.[3] || 0);

  return sign * (hours * 60 + minutes) * 60 * 1000;
}

export function scheduledDateToUtc(
  dateKey: string,
  time: string,
  timeZone: AnnouncementTimeZone
) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  let result = new Date(utcGuess.getTime() - timeZoneOffsetMs(utcGuess, timeZone));

  // Recheck after conversion because Pacific Time can cross a DST boundary.
  result = new Date(utcGuess.getTime() - timeZoneOffsetMs(result, timeZone));
  return result;
}

export function announcementPublishDate(announcement: Pick<
  Announcement,
  "publishedAt" | "scheduleForLater" | "scheduleDate" | "scheduleTime" | "scheduleTimeZone"
>) {
  if (
    announcement.scheduleForLater &&
    announcement.scheduleDate &&
    announcement.scheduleTime &&
    announcement.scheduleTimeZone
  ) {
    return scheduledDateToUtc(
      announcement.scheduleDate,
      announcement.scheduleTime,
      announcement.scheduleTimeZone
    );
  }

  return new Date(announcement.publishedAt);
}
