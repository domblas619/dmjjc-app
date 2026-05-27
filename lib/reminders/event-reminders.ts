import { client, hasSanityConfig } from "@/lib/sanity/client";
import { claimReminderSend } from "@/lib/push/store";
import { sendPushToAll } from "@/lib/push/send";
import type { EventType } from "@/lib/types";

const timeZone = "America/Los_Angeles";
const reminderHours = new Set([7, 12]);

type ReminderEvent = {
  _id: string;
  title: string;
  slug?: string;
  startDate: string;
  endDate?: string;
  time?: string;
  location?: string;
  eventType: EventType;
  description?: string;
};

type ReminderWindow = {
  type: "day-before" | "morning-of";
  targetDate: string;
  hour: 7 | 12;
};

function zonedParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value || "";

  return {
    dateKey: `${getPart("year")}-${getPart("month")}-${getPart("day")}`,
    hour: Number(getPart("hour")),
    minute: Number(getPart("minute"))
  };
}

function addDays(dateKey: string, days: number) {
  const date = new Date(`${dateKey}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function currentReminderWindow(date = new Date()): ReminderWindow | null {
  const now = zonedParts(date);

  if (!reminderHours.has(now.hour)) return null;

  if (now.hour === 12) {
    return {
      type: "day-before",
      targetDate: addDays(now.dateKey, 1),
      hour: 12
    };
  }

  return {
    type: "morning-of",
    targetDate: now.dateKey,
    hour: 7
  };
}

function reminderTitle(event: ReminderEvent, window: ReminderWindow) {
  if (event.eventType === "Closure" || event.eventType === "Holiday") {
    return window.type === "day-before" ? "Closure Reminder" : "Closure Today";
  }

  if (event.eventType === "Special Schedule") {
    return window.type === "day-before" ? "Schedule Reminder" : "Special Schedule Today";
  }

  return window.type === "day-before" ? "Event Reminder" : "Event Today";
}

function reminderBody(event: ReminderEvent, window: ReminderWindow) {
  const timing = event.time ? ` ${event.time}.` : "";
  const location = event.location ? ` Location: ${event.location}.` : "";

  if (window.type === "day-before") {
    return `${event.title} is scheduled for tomorrow.${timing}${location}`;
  }

  return `${event.title} is scheduled for today.${timing}${location}`;
}

function reminderId(event: ReminderEvent, window: ReminderWindow) {
  return `${event._id}:${event.startDate}:${window.type}`;
}

async function getEventsForReminderDate(dateKey: string) {
  if (!hasSanityConfig) return [];

  return client.fetch<ReminderEvent[]>(
    `*[
      _type == "event" &&
      startDate == $dateKey &&
      eventType in ["Closure", "Holiday", "Tournament", "In-House Event", "Seminar", "Special Schedule"]
    ] | order(startDate asc, title asc){
      _id,
      title,
      "slug": slug.current,
      startDate,
      endDate,
      time,
      location,
      eventType,
      description
    }`,
    { dateKey },
    { cache: "no-store" }
  );
}

export async function sendDueEventReminders(date = new Date()) {
  const window = currentReminderWindow(date);

  if (!window) {
    return {
      ok: true,
      skipped: true,
      reason: "Not a reminder hour in Del Mar.",
      sent: 0,
      failed: 0,
      matched: 0
    };
  }

  const events = await getEventsForReminderDate(window.targetDate);
  let sent = 0;
  let failed = 0;
  let alreadySent = 0;
  const results = [];

  for (const event of events) {
    const id = reminderId(event, window);
    const claim = await claimReminderSend(id);

    if (!claim.claimed) {
      alreadySent += claim.reason ? 0 : 1;
      results.push({ event: event.title, skipped: true, reason: claim.reason || "Already sent." });
      continue;
    }

    const result = await sendPushToAll({
      title: reminderTitle(event, window),
      body: reminderBody(event, window),
      url: "/events",
      tag: `event-reminder-${event._id}-${window.type}`
    });

    sent += result.sent;
    failed += result.failed;
    results.push({ event: event.title, ...result });
  }

  return {
    ok: true,
    skipped: false,
    window,
    matched: events.length,
    alreadySent,
    sent,
    failed,
    results
  };
}
