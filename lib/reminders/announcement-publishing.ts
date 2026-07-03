import { client, hasSanityConfig } from "@/lib/sanity/client";
import { claimReminderSend } from "@/lib/push/store";
import { sendPushToAll } from "@/lib/push/send";

const schedulerLaunch = "2026-07-03T00:00:00-10:00";

type ScheduledAnnouncement = {
  _id: string;
  title: string;
  body: string;
  publishedAt: string;
};

async function getDueAnnouncements(date: Date) {
  if (!hasSanityConfig) return [];

  const dueBefore = date.toISOString();
  const catchUpAfter = new Date(date.getTime() - 24 * 60 * 60 * 1000).toISOString();

  return client.fetch<ScheduledAnnouncement[]>(
    `*[
      _type == "announcement" &&
      publishedAt >= $schedulerLaunch &&
      publishedAt > $catchUpAfter &&
      publishedAt <= $dueBefore &&
      (sendPushAlert == true || isPinned == true || category == "Closure")
    ] | order(publishedAt asc){
      _id,
      title,
      body,
      publishedAt
    }`,
    { schedulerLaunch, catchUpAfter, dueBefore },
    { cache: "no-store" }
  );
}

export async function sendDueAnnouncementAlerts(date = new Date()) {
  const announcements = await getDueAnnouncements(date);
  let sent = 0;
  let failed = 0;
  let alreadySent = 0;
  const results = [];

  for (const announcement of announcements) {
    const claim = await claimReminderSend(
      `announcement-publish:${announcement._id}:${announcement.publishedAt}`
    );

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
