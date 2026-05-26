export type ScheduleCalendarKey = "adult-gi" | "toddlers" | "kids" | "teens" | "open-mat";

export type TodayScheduleItem = {
  id: string;
  title: string;
  displayTitle: string;
  calendar: ScheduleCalendarKey;
  startLabel: string;
  endLabel: string;
  timeLabel: string;
  location?: string;
  startMinutes: number;
  endMinutes: number;
};

export type TodayScheduleNotice = {
  id: string;
  title: string;
  type: "Event" | "Closure";
  dateLabel: string;
  description?: string;
};

export type TodaySchedule = {
  dateLabel: string;
  items: TodayScheduleItem[];
  notices: TodayScheduleNotice[];
  hasClosure: boolean;
  sourceUrl: string;
};

const scheduleSourceUrl = "https://www.delmarjiujitsuclub.com/schedule";
const timeZone = "America/Los_Angeles";

const classCalendars: Record<ScheduleCalendarKey, string> = {
  "adult-gi":
    "https://calendar.google.com/calendar/ical/8d9a4f664cc0ae5423507f17105412fdc8c16fefb37af6832fa864670e44c8b3%40group.calendar.google.com/public/basic.ics",
  toddlers:
    "https://calendar.google.com/calendar/ical/b176c1f5b8c3877de0ad55da0305bf94a4a35b230a00dba28e2e2d00f9151c36%40group.calendar.google.com/public/basic.ics",
  kids:
    "https://calendar.google.com/calendar/ical/ebbafc92da0fd201b6a5b63c250ebb1e20ffb34eb23f4a980d3b49534c570c85%40group.calendar.google.com/public/basic.ics",
  teens:
    "https://calendar.google.com/calendar/ical/f220ac1d8fc4bbd6da4936034043be2259a9626445d8f2043eaa9ad150b12820%40group.calendar.google.com/public/basic.ics",
  "open-mat":
    "https://calendar.google.com/calendar/ical/db1b7ab9064fd44c153ac31971978383ee17326a7318de7d17dcaba5949a80a3%40group.calendar.google.com/public/basic.ics"
};

const noticeCalendars = {
  events:
    "https://calendar.google.com/calendar/ical/4806487a7f37c42da892f8ebb53debd446007ed82b58f710c5e2ec5e7e307318%40group.calendar.google.com/public/basic.ics",
  closures:
    "https://calendar.google.com/calendar/ical/a587db7d41146019075f7a1ca7ad77dce30efd38bd0c748be913c7761a0685e8%40group.calendar.google.com/public/basic.ics"
};

const dayCodes = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const;

type ParsedEvent = {
  uid?: string;
  summary?: string;
  description?: string;
  location?: string;
  dtstart?: string;
  dtend?: string;
  rrule?: string;
};

type IcsProperty = {
  name: string;
  value: string;
};

function todayParts() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    weekday: "short"
  }).formatToParts(now);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value || "";
  const dateKey = `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
  const date = new Date(`${dateKey}T12:00:00`);
  const currentMinutes = Number(getPart("hour")) * 60 + Number(getPart("minute"));

  return {
    dateKey,
    dayCode: dayCodes[date.getDay()],
    currentMinutes,
    dateLabel: new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "long",
      month: "long",
      day: "numeric"
    }).format(now)
  };
}

function unfoldIcs(value: string) {
  return value.replace(/\r?\n[ \t]/g, "");
}

function parseProperty(line: string): IcsProperty {
  const separatorIndex = line.indexOf(":");
  const rawName = separatorIndex >= 0 ? line.slice(0, separatorIndex) : line;
  const value = separatorIndex >= 0 ? line.slice(separatorIndex + 1) : "";

  return {
    name: rawName.split(";")[0].toUpperCase(),
    value: decodeIcsText(value)
  };
}

function decodeIcsText(value: string) {
  return value
    .replace(/\\n/g, " ")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

function parseIcsEvents(ics: string): ParsedEvent[] {
  const lines = unfoldIcs(ics).split(/\r?\n/);
  const events: ParsedEvent[] = [];
  let current: ParsedEvent | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      current = {};
      continue;
    }

    if (line === "END:VEVENT") {
      if (current) {
        events.push(current);
      }
      current = null;
      continue;
    }

    if (!current) {
      continue;
    }

    const property = parseProperty(line);

    if (property.name === "UID") current.uid = property.value;
    if (property.name === "SUMMARY") current.summary = property.value;
    if (property.name === "DESCRIPTION") current.description = property.value;
    if (property.name === "LOCATION") current.location = property.value;
    if (property.name === "DTSTART") current.dtstart = property.value;
    if (property.name === "DTEND") current.dtend = property.value;
    if (property.name === "RRULE") current.rrule = property.value;
  }

  return events;
}

function dateKeyFromIcs(value?: string) {
  if (!value) return "";

  if (/^\d{8}$/.test(value)) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }

  if (/^\d{8}T/.test(value)) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function minutesFromIcs(value?: string) {
  if (!value || !/^\d{8}T\d{6}/.test(value)) return 0;

  return Number(value.slice(9, 11)) * 60 + Number(value.slice(11, 13));
}

function timeLabelFromMinutes(minutes: number) {
  const date = new Date(Date.UTC(2020, 0, 1, Math.floor(minutes / 60), minutes % 60));

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: minutes % 60 === 0 ? undefined : "2-digit",
    timeZone: "UTC"
  }).format(date);
}

function timeRangeLabel(startMinutes: number, endMinutes: number) {
  const format = (minutes: number) => {
    const date = new Date(Date.UTC(2020, 0, 1, Math.floor(minutes / 60), minutes % 60));

    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC"
    }).format(date);
  };
  const start = format(startMinutes);
  const end = format(endMinutes);
  const startIsAm = start.toLowerCase().endsWith("am");
  const startIsPm = start.toLowerCase().endsWith("pm");
  const endIsAm = end.toLowerCase().endsWith("am");
  const endIsPm = end.toLowerCase().endsWith("pm");

  if ((startIsAm && endIsAm) || (startIsPm && endIsPm)) {
    return `${start.replace(/\s?(AM|PM)/i, "")}-${end}`;
  }

  return `${start}-${end}`;
}

function classDisplayTitle(title: string) {
  return title
    .replace(/\((\d+)-(\d+)yo\)/gi, "— Ages $1–$2")
    .replace(/\((\d+)yo\+\)/gi, "— Ages $1+")
    .replace(/\s+—\s+/g, " — ")
    .trim();
}

function happensToday(event: ParsedEvent, dateKey: string, dayCode: string) {
  const startKey = dateKeyFromIcs(event.dtstart);

  if (event.rrule?.includes("FREQ=WEEKLY")) {
    const byDay = event.rrule.match(/BYDAY=([^;]+)/)?.[1]?.split(",") || [];
    return startKey <= dateKey && byDay.includes(dayCode);
  }

  const endKey = dateKeyFromIcs(event.dtend);

  return startKey === dateKey || Boolean(endKey && startKey <= dateKey && dateKey < endKey);
}

async function fetchIcs(url: string) {
  const response = await fetch(url, {
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`Unable to load schedule calendar: ${response.status}`);
  }

  return response.text();
}

async function getCalendarEvents(url: string) {
  try {
    return parseIcsEvents(await fetchIcs(url));
  } catch {
    return [];
  }
}

export async function getTodaySchedule(): Promise<TodaySchedule> {
  const today = todayParts();

  const [classResults, eventNotices, closureNotices] = await Promise.all([
    Promise.all(
      Object.entries(classCalendars).map(async ([calendar, url]) => ({
        calendar: calendar as ScheduleCalendarKey,
        events: await getCalendarEvents(url)
      }))
    ),
    getCalendarEvents(noticeCalendars.events),
    getCalendarEvents(noticeCalendars.closures)
  ]);

  const closureItems = closureNotices
    .filter((event) => happensToday(event, today.dateKey, today.dayCode))
    .map((event) => ({
      id: event.uid || event.summary || "closure",
      title: event.summary || "Academy Closure",
      type: "Closure" as const,
      dateLabel: today.dateLabel,
      description: event.description
    }));

  const hasClosure = closureItems.length > 0;

  const items = hasClosure
    ? []
    : classResults
        .flatMap(({ calendar, events }) =>
          events
            .filter((event) => happensToday(event, today.dateKey, today.dayCode))
            .map((event) => {
              const startMinutes = minutesFromIcs(event.dtstart);
              const endMinutes = minutesFromIcs(event.dtend);

              return {
                id: `${calendar}-${event.uid || event.summary || startMinutes}`,
                title: event.summary || "Class",
                displayTitle: classDisplayTitle(event.summary || "Class"),
                calendar,
                startLabel: timeLabelFromMinutes(startMinutes),
                endLabel: timeLabelFromMinutes(endMinutes),
                timeLabel: timeRangeLabel(startMinutes, endMinutes),
                location: event.location,
                startMinutes,
                endMinutes
              };
            })
        )
        .filter((item) => item.endMinutes > today.currentMinutes)
        .sort((a, b) => a.startMinutes - b.startMinutes || a.title.localeCompare(b.title));

  const notices = [
    ...eventNotices
      .filter((event) => happensToday(event, today.dateKey, today.dayCode))
      .map((event) => ({
        id: event.uid || event.summary || "event",
        title: event.summary || "Academy Event",
        type: "Event" as const,
        dateLabel: today.dateLabel,
        description: event.description
      })),
    ...closureItems
  ];

  return {
    dateLabel: today.dateLabel,
    items,
    notices,
    hasClosure,
    sourceUrl: scheduleSourceUrl
  };
}
