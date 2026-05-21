import type { AcademyEvent, Announcement, SiteStatus, Video } from "@/lib/types";

export const fallbackStatus: SiteStatus = {
  title: "Academy Open",
  statusType: "Open",
  message: "Regular classes are running today. Check the schedule and we'll see you on the mat.",
  updatedAt: "2026-05-20T08:00:00-07:00"
};

export const fallbackAnnouncements: Announcement[] = [
  {
    title: "Welcome to the Del Mar Jiu-Jitsu Club Community Hub",
    slug: "welcome-to-the-community-hub",
    publishedAt: "2026-05-20",
    category: "General",
    body: "This hub will help our members and families stay updated on academy news, important dates, and training resources.",
    isFeatured: true,
    isPinned: true
  },
  {
    title: "Kids No-Gi Reminder",
    slug: "kids-no-gi-reminder",
    publishedAt: "2026-05-18",
    category: "Kids Program",
    body: "Kids No-Gi classes are a great way to build movement, confidence, and mat awareness. Please make sure students bring the correct No-Gi gear on No-Gi days."
  },
  {
    title: "Adult Training Resource Library",
    slug: "adult-training-resource-library",
    publishedAt: "2026-05-16",
    category: "Adults Program",
    body: "We're beginning to organize training videos and drilling resources to help students keep learning outside of class."
  }
];

export const fallbackEvents: AcademyEvent[] = [
  {
    title: "Holiday Closure",
    slug: "holiday-closure",
    startDate: "2026-05-25",
    location: "Del Mar Jiu-Jitsu Club",
    eventType: "Holiday",
    description: "The academy will be closed for the holiday. Regular classes resume the following day.",
    isFeatured: true,
    statusBadge: "Check Before Class",
    audience: "All Students"
  },
  {
    title: "In-House Training Day",
    slug: "in-house-training-day",
    startDate: "2026-06-06",
    time: "10:00 AM",
    location: "Del Mar Jiu-Jitsu Club",
    eventType: "In-House Event",
    description: "A community training day for students and families. More details coming soon.",
    audience: "Students and Families"
  },
  {
    title: "Special Schedule",
    slug: "special-schedule",
    startDate: "2026-06-14",
    time: "Morning classes only",
    location: "Del Mar Jiu-Jitsu Club",
    eventType: "Special Schedule",
    description: "Modified class schedule for the day. Please check details before heading to the academy.",
    statusBadge: "Check Before Class",
    audience: "All Students"
  }
];

export const fallbackVideos: Video[] = [
  {
    title: "At-Home Shrimp Drill",
    slug: "at-home-shrimp-drill",
    category: "At-Home Training",
    level: "Beginner",
    description: "A simple movement drill students can practice at home to improve hip movement and guard retention.",
    videoUrl: "/video-placeholder.html",
    thumbnail: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    publishedAt: "2026-05-20"
  },
  {
    title: "Technical Stand-Up",
    slug: "technical-stand-up",
    category: "Fundamentals",
    level: "Beginner",
    description: "A foundational movement for getting up safely while protecting yourself.",
    videoUrl: "/video-placeholder.html",
    thumbnail: "https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-19"
  },
  {
    title: "Bridge and Roll Movement",
    slug: "bridge-and-roll-movement",
    category: "Drills",
    level: "Beginner",
    description: "A basic movement pattern that helps students understand hip power and escape mechanics.",
    videoUrl: "/video-placeholder.html",
    thumbnail: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-18"
  },
  {
    title: "Guard Retention Movement",
    slug: "guard-retention-movement",
    category: "Adults",
    level: "All Levels",
    description: "A simple drill to help students improve frames, hip movement, and recovery.",
    videoUrl: "/video-placeholder.html",
    thumbnail: "https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-17"
  },
  {
    title: "Kids Balance Drill",
    slug: "kids-balance-drill",
    category: "Kids",
    level: "All Levels",
    description: "A fun movement drill for young students to build coordination and body awareness.",
    videoUrl: "/video-placeholder.html",
    thumbnail: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-16"
  },
  {
    title: "No-Gi Grip Fighting Basics",
    slug: "no-gi-grip-fighting-basics",
    category: "No-Gi",
    level: "Beginner",
    description: "An intro to basic No-Gi hand fighting and positioning.",
    videoUrl: "/video-placeholder.html",
    thumbnail: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-15"
  }
];
