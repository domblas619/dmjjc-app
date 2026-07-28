import { client, hasSanityConfig } from "@/lib/sanity/client";
import { claimReminderSend } from "@/lib/push/store";
import { sendPushToAll } from "@/lib/push/send";
import { announcementPublishDate } from "@/lib/announcement-schedule";
import type { Announcement } from "@/lib/types";

const schedulerLaunch = "2026-07-03T00:00:00-10:00";

type ScheduledAnnouncement = Pick<
  Announcement,
  | "title"
  | "body"
  | "publishedAt"
  | "scheduleForLater"
  | "scheduleDate"
  | "scheduleTime"
  | "scheduleTimeZone"
> & {
  _id: string;
};

export function announcementReminderId(announcementId: string, effectivePublishDate: Date) {
  return `announcement-publish:${announcementId}:${effectivePublishDate.toISOString()}`;
}

async function getDueAnnouncements(date: Date) {
  if (!hasSanityConfig) return [];

  return client.fetch<ScheduledAnnouncement[]>(
    `*[
      _type == "announcement" &&
      (sendPushAlert == true || isPinned == true || category == "Closure")
    ]{
      _id,
      title,
      body,
      publishedAt,
      scheduleForLater,
      scheduleDate,
      scheduleTime,
      scheduleTimeZone
    }`,
    {},
    { cache: "no-store" }
  );
}

export async function sendDueAnnouncementAlerts(date = new Date()) {
  const schedulerStart = new Date(schedulerLaunch);
  const catchUpAfter = new Date(date.getTime() - 24 * 60 * 60 * 1000);
  const announcements = (await getDueAnnouncements(date))
    .map((announcement) => ({
      ...announcement,
      effectivePublishDate: announcementPublishDate(announcement)
    }))
    .filter(({ effectivePublishDate }) =>
      effectivePublishDate >= schedulerStart &&
      effectivePublishDate > catchUpAfter &&
      effectivePublishDate <= date
    )
    .sort((a, b) => a.effectivePublishDate.getTime() - b.effectivePublishDate.getTime());
  let sent = 0;
  let failed = 0;
  let alreadySent = 0;
  const results = [];

  for (const announcement of announcements) {
    const claim = await claimReminderSend(announcementReminderId(announcement._id, announcement.effectivePublishDate));

    if (!claim.claimed) {
      alreadySent += claim.reason ? 0 : 1;
      results.push({ announcement: announcement.title, skipped: true, reason: claim.reason || "Alert already sent." });
      continue;
    }

    const result = await sendPushToAll({
      title: announcement.title || "Academy Update",
      body: announcement.body || "There is a new important academy update.",
      url: "/updates",
      tag: `announcement-${announcement._id}`
    });

    sent += result.sent;
    failed += result.failed;
    results.push({ announcement: announcement.title, ...result });
  }

  return { ok: true, matched: announcements.length, alreadySent, sent, failed, results };
}
